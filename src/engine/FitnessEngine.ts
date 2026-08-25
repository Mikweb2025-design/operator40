/**
 * Operator40 — FitnessEngine
 * Core loop: rAF + throttled MediaPipe inference → angles → velocity/direction → hysteresis FSM → rep + timer + quality 0..100 + cues
 * Optimized for low CPU/battery on Safari iOS & Android PWA (targetFps throttle, early exits, OneEuro smoothing).
 */
import type { EngineConfig, EngineMetrics, EnginePhase, FormMetrics, PoseLandmarks, PoseResult, RepEvent } from './types';
import { HysteresisStateMachine } from './stateMachine';
import { getDefinition, normalizeExerciseId } from './exercises/definitions';
import { PoseLandmarkerManager } from './PoseLandmarkerManager';
import { LM, angleFromLandmarks, bilateralAngle, clamp } from './math';

export class FitnessEngine {
  private cfg: EngineConfig;
  private def: ReturnType<typeof getDefinition>;
  private sm: HysteresisStateMachine;
  private landmarker: PoseLandmarkerManager;

  // runtime
  private video: HTMLVideoElement | null = null;
  private running = false;
  private rafId: number | null = null;
  private lastInferenceAt = 0;
  private lastAngle = 180;
  private lastTs = 0;
  private velocity = 0;
  private velocityFiltered = 0;
  private lastRepAt = 0;
  private reps = 0;
  private startedAt: number | null = null; // motion start (first down)
  private elapsedActiveMs = 0;
  private lastTickAt = 0;
  private qualityWindow: number[] = [];
  private avgQuality = 0;
  private lastRepQuality: number | null = null;
  private currentPhase: EnginePhase = 'idle';
  private currentForm: FormMetrics | null = null;
  private troughInRep = 180;
  private peakInRep = 0;
  private fpsEma = 0;
  private frameCount = 0;
  private onRep: EngineConfig['onRep'];
  private onPhaseChange: EngineConfig['onPhaseChange'];
  private onMetrics: EngineConfig['onMetrics'];
  private angleHistory: Array<{ angle: number; ts: number }> = [];

  constructor(cfg: EngineConfig) {
    const nid = normalizeExerciseId(cfg.exerciseId) as any;
    const def = getDefinition(nid);
    if (!def) throw new Error(`Unknown exercise: ${cfg.exerciseId}`);
    this.cfg = { targetFps: 30, enableFiltering: true, ...cfg, exerciseId: nid as any };
    this.def = def;
    const thresholds = { ...def.thresholds, ...(cfg.thresholdsOverride ?? {}) };
    this.sm = new HysteresisStateMachine(thresholds);
    this.landmarker = new PoseLandmarkerManager({}, cfg.enableFiltering !== false);
    this.onRep = cfg.onRep;
    this.onPhaseChange = cfg.onPhaseChange;
    this.onMetrics = cfg.onMetrics;
  }

  get metrics(): EngineMetrics {
    const now = performance.now();
    const elapsedMs = this.startedAt ? now - this.startedAt : 0;
    return {
      reps: this.reps,
      elapsedMs,
      elapsedActiveMs: this.elapsedActiveMs,
      avgQuality: this.avgQuality,
      lastRepQuality: this.lastRepQuality,
      currentPhase: this.currentPhase,
      currentForm: this.currentForm,
      fps: Math.round(this.fpsEma),
    };
  }

  async init(video: HTMLVideoElement, onProgress?: (s: string) => void): Promise<void> {
    this.video = video;
    await this.landmarker.init(onProgress);
  }

  /** Attach a different video element (e.g. after remount) without re-init model. */
  attachVideo(video: HTMLVideoElement): void { this.video = video; }

  updateExercise(exerciseId: string): void {
    const nid = normalizeExerciseId(exerciseId) as any;
    const def = getDefinition(nid);
    if (!def) return;
    this.def = def;
    this.cfg.exerciseId = nid as any;
    const thresholds = { ...def.thresholds, ...(this.cfg.thresholdsOverride ?? {}) };
    this.sm = new HysteresisStateMachine(thresholds);
    this.resetCounters();
  }

  updateConfig(patch: Partial<EngineConfig>): void {
    this.cfg = { ...this.cfg, ...patch };
    if (patch.thresholdsOverride) {
      this.sm.updateConfig(patch.thresholdsOverride);
    }
    if (patch.onRep !== undefined) this.onRep = patch.onRep;
    if (patch.onPhaseChange !== undefined) this.onPhaseChange = patch.onPhaseChange;
    if (patch.onMetrics !== undefined) this.onMetrics = patch.onMetrics;
  }

  private resetCounters(): void {
    this.reps = 0; this.startedAt = null; this.elapsedActiveMs = 0; this.lastRepAt = 0;
    this.qualityWindow = []; this.avgQuality = 0; this.lastRepQuality = null;
    this.currentPhase = 'idle'; this.currentForm = null;
    this.troughInRep = 180; this.peakInRep = 0;
    this.sm.reset(); this.landmarker.resetSmoother();
    this.lastAngle = 180; this.velocity = 0; this.velocityFiltered = 0;
    this.angleHistory = [];
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTickAt = performance.now();
    this.lastInferenceAt = 0;
    this.loop(performance.now());
  }

  stop(): void {
    this.running = false;
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  destroy(): void {
    this.stop();
    this.landmarker.close();
  }

  /** Expose latest PoseResult for overlay. Called via callback in loop. */
  private lastResult: PoseResult | null = null;
  getLastResult(): PoseResult | null { return this.lastResult; }

  private getPrimaryAngle(lm: PoseLandmarks): number {
    const d = this.def!;
    // If exercise has custom composite, let definition compute via heuristic angle
    // otherwise use bilateral or single angle from landmark indices
    const pa = d.primaryAngle;
    // For generic: use bilateral if both sides exist (knee/hip/elbow), else single
    // Heuristic: if name is knee/hip/elbow we bilateralize
    const name = pa.name;
    if (name === 'knee') return bilateralAngle(lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]);
    if (name === 'hipFlex' || name === 'pike' || name === 'hipLine') return bilateralAngle(lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
    if (name === 'elbow') return bilateralAngle(lm, [LM.left_shoulder, LM.left_elbow, LM.left_wrist], [LM.right_shoulder, LM.right_elbow, LM.right_wrist]);
    return angleFromLandmarks(lm, pa.a, pa.b, pa.c);
  }

  private computeSecondaryAngles(lm: PoseLandmarks): Record<string, number> {
    const out: Record<string, number> = {};
    for (const sa of this.def?.secondaryAngles ?? []) {
      out[sa.name] = angleFromLandmarks(lm, sa.a, sa.b, sa.c);
    }
    return out;
  }

  private loop = (now: number): void => {
    this.rafId = requestAnimationFrame(this.loop);
    if (!this.running || !this.video) return;

    const fpsTarget = this.cfg.targetFps ?? 30;
    const minInterval = 1000 / fpsTarget;
    if (now - this.lastInferenceAt < minInterval) {
      // still update elapsed/active timers at ~60fps even if we skip inference
      this.updateTimers(now);
      return;
    }
    // Safari: ensure video ready
    if (this.video.readyState < 2 || this.video.videoWidth === 0) {
      this.updateTimers(now);
      return;
    }

    const t0 = performance.now();
    const result = this.landmarker.detect(this.video, now);
    const dtInfer = performance.now() - t0;

    // Adaptive throttle if inference is heavy (> 40ms) — drop to 20fps to save battery
    if (dtInfer > 42 && fpsTarget > 22) {
      this.cfg.targetFps = Math.max(22, (this.cfg.targetFps ?? 30) - 2);
    }

    this.lastInferenceAt = now;
    this.lastResult = result;

    // FPS EMA
    const instFps = 1000 / Math.max(1, now - (this.lastTs || now - 16));
    this.fpsEma = this.fpsEma ? this.fpsEma * 0.9 + instFps * 0.1 : instFps;
    this.frameCount++;

    if (!result.landmarks) {
      // No person — idle, but keep timers
      if (this.currentPhase !== 'idle') {
        this.currentPhase = 'idle';
        this.currentForm = { primaryAngle: this.lastAngle, secondaryAngles: {}, velocity: 0, direction: 'idle', quality: 0, cues: ['move into frame'], visibility: 0 };
        this.onPhaseChange?.('idle', this.currentForm);
      }
      this.updateTimers(now);
      this.lastTs = now;
      this.emitMetrics();
      return;
    }

    const lm = result.landmarks;
    const vis = result.visibilityScore;

    // Visibility gate: if too low, treat as idle and don't transition
    if (vis < 0.30) {
      this.updateTimers(now);
      this.lastTs = now;
      return;
    }

    const primaryAngle = this.getPrimaryAngle(lm);
    const secondary = this.computeSecondaryAngles(lm);

    // Velocity (deg/s) with simple exponential smoothing
    const dtMs = now - (this.lastTs || now - 16);
    const rawVel = dtMs > 0 ? (primaryAngle - this.lastAngle) / (dtMs / 1000) : 0;
    this.velocity = rawVel;
    this.velocityFiltered = this.velocityFiltered * 0.75 + rawVel * 0.25;
    const direction: FormMetrics['direction'] = Math.abs(this.velocityFiltered) < 18 ? 'hold' : this.velocityFiltered < 0 ? 'down' : 'up';

    // Maintain angle history for quality (last 600ms window)
    this.angleHistory.push({ angle: primaryAngle, ts: now });
    const cutoff = now - 900;
    while (this.angleHistory.length && this.angleHistory[0].ts < cutoff) this.angleHistory.shift();

    // Track ROM within current rep
    this.troughInRep = Math.min(this.troughInRep, primaryAngle);
    this.peakInRep = Math.max(this.peakInRep, primaryAngle);

    // State machine: check custom transition first for complex exercises
    let phase: EnginePhase = this.currentPhase;
    let didRep = false;
    if (this.def?.customTransition) {
      const custom = this.def.customTransition(primaryAngle, this.velocityFiltered, phase, { landmarks: lm, timestampMs: now });
      if (custom) {
        // custom returns next phase directly (down/bottom/up/ready/idle)
        // Bridge to SM internal state to keep ROM tracking coherent when custom is used
        // For custom paths we bypass SM step but still synthesize rep detection:
        // rep occurs when custom moves from down/bottom -> up
        const wasDownLike = phase === 'down' || phase === 'bottom';
        if (wasDownLike && custom === 'up') {
          const timeOk = this.lastRepAt === 0 || (now - this.lastRepAt) > (this.def.thresholds.minRepsIntervalMs ?? 300);
          const romOk = this.troughInRep < ((this.def.thresholds.downThreshold + 8));
          if (timeOk && romOk) didRep = true;
        }
        phase = custom;
        // keep SM in sync roughly
        if (phase === 'down' || phase === 'bottom') this.sm['state'].phase = phase as any;
        else if (phase === 'up') this.sm['state'].phase = 'up' as any;
        else if (phase === 'ready') this.sm['state'].phase = 'ready' as any;
      } else {
        const step = this.sm.step(primaryAngle, now, vis);
        phase = step.nextPhase;
        didRep = step.didRep;
      }
    } else {
      const step = this.sm.step(primaryAngle, now, vis);
      phase = step.nextPhase;
      didRep = step.didRep;
    }

    // Timer: start on first down/bottom
    if (!this.startedAt && (phase === 'down' || phase === 'bottom')) {
      this.startedAt = now;
      this.lastRepAt = now;
    }

    // Form evaluation
    const formEval = this.def?.evaluateForm(lm, { ...secondary, knee: primaryAngle, primary: primaryAngle }, phase, {
      velocity: this.velocityFiltered,
      direction,
      visibility: vis,
      repCount: this.reps,
    }) ?? { quality: 75, cues: [] };

    const form: FormMetrics = {
      primaryAngle,
      secondaryAngles: secondary,
      velocity: this.velocityFiltered,
      direction,
      quality: clamp(formEval.quality, 0, 100),
      cues: formEval.cues,
      visibility: vis,
    };
    this.currentForm = form;

    // Phase change callback
    if (phase !== this.currentPhase) {
      this.currentPhase = phase;
      this.onPhaseChange?.(phase, form);
    }

    // Rep completed
    if (didRep) {
      const repDuration = this.lastRepAt ? now - this.lastRepAt : (this.startedAt ? now - this.startedAt : 0);
      // Rep quality = weighted blend of instantaneous quality + ROM completeness + velocity control
      const rom = this.peakInRep - this.troughInRep;
      const expectedRom = (this.def!.thresholds.upThreshold - this.def!.thresholds.downThreshold);
      const romScore = clamp(100 * (rom / Math.max(30, expectedRom)), 0, 100);
      const velocityScore = clamp(100 - Math.abs(this.velocityFiltered) * 0.06, 0, 100); // penalize too fast
      const repQuality = clamp(form.quality * 0.55 + romScore * 0.30 + velocityScore * 0.15, 0, 100);

      this.reps += 1;
      this.lastRepAt = now;
      this.lastRepQuality = repQuality;
      this.qualityWindow.push(repQuality);
      if (this.qualityWindow.length > (this.cfg.qualitySmoothingWindow ?? 5)) this.qualityWindow.shift();
      this.avgQuality = this.qualityWindow.reduce((a, b) => a + b, 0) / this.qualityWindow.length;

      const evt: RepEvent = {
        repIndex: this.reps,
        timestampMs: now,
        durationMs: repDuration,
        peakAngle: this.peakInRep,
        troughAngle: this.troughInRep,
        quality: repQuality,
        cues: form.cues,
        velocity: this.velocityFiltered,
      };
      this.onRep?.(evt);

      // haptics
      try { navigator.vibrate?.(28); } catch {}

      // reset per-rep ROM trackers and SM consume
      this.troughInRep = primaryAngle;
      this.peakInRep = primaryAngle;
      this.sm.consumeRep(now, primaryAngle);
      this.currentPhase = 'ready';
      this.onPhaseChange?.('ready', form);
    }

    // Hold exercise (plank) — no reps, quality is hold quality, timer is hold duration
    if (this.def?.isHold) {
      // Smooth quality into avg
      this.qualityWindow.push(form.quality);
      if (this.qualityWindow.length > 8) this.qualityWindow.shift();
      this.avgQuality = this.qualityWindow.reduce((a, b) => a + b, 0) / this.qualityWindow.length;
      if (!this.startedAt && vis >= 0.35) this.startedAt = this.startedAt ?? now;
    }

    this.lastAngle = primaryAngle;
    this.lastTs = now;
    this.updateTimers(now);
    this.emitMetrics();

    // Low-CPU guard: if avg inference > 35ms, already throttled above; also skip next frame if video element is hidden?
  };

  private updateTimers(now: number): void {
    const dt = now - (this.lastTickAt || now);
    this.lastTickAt = now;
    if (this.startedAt) {
      // count active time only when not idle
      if (this.currentPhase !== 'idle') this.elapsedActiveMs += dt;
    }
  }

  private emitMetrics(): void {
    this.onMetrics?.(this.metrics);
  }
}
