/**
 * Operator40 — Configurable State Machine with Hysteresis
 * Prevents double counts near thresholds via top/bottom hysteresis bands
 * and minimum phase dwell times. Fully deterministic.
 *
 * Phases: idle → ready → down → bottom → up → rep_completed → ready ...
 * For hold exercises (plank) we stay in ready/down = holdGood/holdBad.
 */
import type { EnginePhase, StateMachineConfig } from './types';

export interface SMState {
  phase: EnginePhase;
  lastTransitionAt: number; // ms
  lastAngle: number;
  minAngleInRep: number; // trough
  maxAngleInRep: number; // peak
}

export class HysteresisStateMachine {
  private state: SMState;
  private cfg: Required<StateMachineConfig>;

  constructor(cfg: StateMachineConfig) {
    this.cfg = {
      downThreshold: cfg.downThreshold,
      upThreshold: cfg.upThreshold,
      hysteresis: cfg.hysteresis ?? 6,
      minDownMs: cfg.minDownMs ?? 180,
      minUpMs: cfg.minUpMs ?? 120,
      minRepsIntervalMs: cfg.minRepsIntervalMs ?? 300,
    };
    this.state = {
      phase: 'idle',
      lastTransitionAt: 0,
      lastAngle: 180,
      minAngleInRep: 180,
      maxAngleInRep: 0,
    };
  }

  reset(): void {
    this.state = { phase: 'idle', lastTransitionAt: 0, lastAngle: 180, minAngleInRep: 180, maxAngleInRep: 0 };
  }

  updateConfig(patch: Partial<StateMachineConfig>): void {
    this.cfg = { ...this.cfg, ...patch } as Required<StateMachineConfig>;
  }

  get phase(): EnginePhase { return this.state.phase; }
  get minAngle(): number { return this.state.minAngleInRep; }
  get maxAngle(): number { return this.state.maxAngleInRep; }

  /**
   * Feed one angle sample (primary joint). Returns { nextPhase, didRep }.
   * Hysteresis: down = angle < downThreshold, up = angle > upThreshold.
   * Band between thresholds = no transition (sticky).
   */
  step(angle: number, timestampMs: number, visibility: number): { nextPhase: EnginePhase; didRep: boolean } {
    const { downThreshold, upThreshold, minDownMs, minRepsIntervalMs } = this.cfg;
    const visOk = visibility >= 0.35;
    let p = this.state.phase;
    let didRep = false;

    // Track ROM
    this.state.minAngleInRep = Math.min(this.state.minAngleInRep, angle);
    this.state.maxAngleInRep = Math.max(this.state.maxAngleInRep, angle);
    const dtSince = timestampMs - this.state.lastTransitionAt;

    // idle → ready when visible and angle roughly in up position
    if (p === 'idle') {
      if (visOk && angle > (upThreshold - 10)) {
        p = 'ready';
        this.transition(p, timestampMs, angle);
      } else if (visOk) {
        // still idle but we have a person
        p = 'ready';
        this.transition(p, timestampMs, angle);
      }
      this.state.lastAngle = angle;
      return { nextPhase: p, didRep };
    }

    const isDownBand = angle <= downThreshold;
    const isUpBand = angle >= upThreshold;

    switch (p) {
      case 'ready':
        if (isDownBand) {
          p = 'down';
          this.transition(p, timestampMs, angle);
        }
        break;
      case 'down':
        if (dtSince >= minDownMs && angle <= (downThreshold - 2)) {
          // settle into bottom if very deep
          p = 'bottom';
          this.transition(p, timestampMs, angle);
        } else if (isUpBand && dtSince >= minDownMs) {
          // quick rep without distinct bottom (short ROM)
          p = 'up';
          this.transition(p, timestampMs, angle);
        }
        break;
      case 'bottom':
        if (isUpBand && dtSince >= minDownMs) {
          p = 'up';
          this.transition(p, timestampMs, angle);
        }
        break;
      case 'up':
        // stay up until we count rep on return to ready zone with timing guard
        // we count rep when we are solidly in up band
        if (isUpBand && dtSince >= (this.cfg.minUpMs ?? 100)) {
          // did rep if we had a valid down excursion
          const hasValidRom = this.state.minAngleInRep <= (downThreshold + 8);
          const timeOk = dtSince >= minRepsIntervalMs || this.state.lastTransitionAt === 0;
          // allow rep completion via explicit gate: we were down/bottom before
          if (hasValidRom && timeOk) {
            didRep = true;
            p = 'rep_completed';
            // prepare next rep tracking reset, but keep phase for caller
            // caller will handle transition to ready after collecting rep
          }
        }
        break;
      case 'rep_completed':
        // transient: immediately go to ready for next rep
        p = 'ready';
        this.transition(p, timestampMs, angle);
        // reset ROM trackers for next rep
        this.state.minAngleInRep = angle;
        this.state.maxAngleInRep = angle;
        break;
    }

    // After rep_completed handling, normal flow continues next step call

    // Also allow down again from ready-like up state if angle drops again before rep (for fast reps)
    if (!didRep && this.state.phase === 'up' && isDownBand && dtSince >= (this.cfg.minUpMs ?? 100)) {
      // already counted? don't double
      // this path is for next rep's down without explicit rep_completed phase
    }

    if (p !== this.state.phase && !didRep) {
      this.transition(p, timestampMs, angle);
    } else if (didRep) {
      // didRep means we transition to rep_completed then on next step to ready
      // Save state as rep_completed briefly
      this.state.phase = 'rep_completed';
      this.state.lastTransitionAt = timestampMs;
      // Don't reset ROM until next ready step consumes it — caller reads min/max before reset
    }

    this.state.lastAngle = angle;
    // If didRep, caller expects nextPhase = rep_completed, but after that it becomes ready
    // We return rep_completed now; next invocation will auto-move to ready
    if (didRep) return { nextPhase: 'rep_completed', didRep: true };

    // Auto-consume rep_completed → ready on following call if still up
    if (this.state.phase === 'rep_completed') {
      // will be consumed next step, but for metrics we already reported
    }

    return { nextPhase: this.state.phase, didRep };
  }

  /** Call after handling a rep to reset ROM and go to ready. */
  consumeRep(timestampMs: number, currentAngle: number): void {
    this.state.phase = 'ready';
    this.state.lastTransitionAt = timestampMs;
    this.state.minAngleInRep = currentAngle;
    this.state.maxAngleInRep = currentAngle;
  }

  private transition(next: EnginePhase, ts: number, angle: number): void {
    this.state.phase = next;
    this.state.lastTransitionAt = ts;
    // keep ROM rolling; don't reset on every phase
  }

  /** Visibility lost — go idle if not visible for a threshold (caller decides). */
  markIdle(timestampMs: number, angle: number): void {
    this.state.phase = 'idle';
    this.state.lastTransitionAt = timestampMs;
    this.state.lastAngle = angle;
    this.state.minAngleInRep = angle;
    this.state.maxAngleInRep = angle;
  }
}
