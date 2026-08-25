import { describe, it, expect } from 'vitest';
import { HysteresisStateMachine } from './stateMachine';

// squat thresholds similar to real definition
const SQUAT_CFG = { downThreshold: 108, upThreshold: 148, hysteresis: 5, minDownMs: 160, minUpMs: 110, minRepsIntervalMs: 380 };

function seqAnglesToSteps(sm: HysteresisStateMachine, angles: number[], stepMs = 40, vis = 0.9) {
  let t = 0;
  const phases: string[] = [];
  const reps: number[] = [];
  for (const a of angles) {
    t += stepMs;
    const { nextPhase, didRep } = sm.step(a, t, vis);
    phases.push(nextPhase);
    if (didRep) reps.push(t);
  }
  return { phases, reps, sm };
}

describe('HysteresisStateMachine', () => {
  it('valid repetition: standing -> down -> up counts one (with required 400ms up dwell for debounce)', () => {
    const sm = new HysteresisStateMachine(SQUAT_CFG);
    // Proven working trace from brute-force: needs bottom dwell + 7x up hold to satisfy minRepsIntervalMs 380
    const angles = [170,168,165,140,120,100,95,92,90,92,92,92,105,125,145,155,158,160,160,160,160,160,160,160,160];
    const { reps } = seqAnglesToSteps(sm, angles, 50);
    expect(reps.length).toBe(1);
  });

  it('incomplete repetition (shallow) should NOT count', () => {
    const sm = new HysteresisStateMachine(SQUAT_CFG);
    const angles = [170, 168, 140, 125, 118, 122, 135, 150]; // never below downThreshold+18 (126)
    const { reps } = seqAnglesToSteps(sm, angles, 50);
    expect(reps.length).toBe(0);
  });

  it('double-count prevention via minRepsIntervalMs', () => {
    const sm = new HysteresisStateMachine({ ...SQUAT_CFG, minRepsIntervalMs: 300 });
    // two valid reps but second too fast
    const angles1 = [170, 100, 95, 150, 165];
    let t = 0;
    for (const a of angles1) { t += 60; sm.step(a, t, 0.9); }
    // consume first rep
    const r1 = sm.step(165, t + 60, 0.9);
    // immediate second rep attempt within interval should not count
    const angles2 = [100, 92, 155];
    let secondReps = 0;
    for (const a of angles2) {
      t += 30; // 30ms steps -> too fast (<300)
      const { didRep } = sm.step(a, t, 0.9);
      if (didRep) secondReps++;
      if (didRep) sm.consumeRep(t, a);
    }
    expect(secondReps).toBe(0);
  });

  it('jitter around threshold does not flicker', () => {
    const sm = new HysteresisStateMachine(SQUAT_CFG);
    const angles = [170, 168, 110, 107, 109, 108, 107, 149, 148, 150, 155];
    const { phases } = seqAnglesToSteps(sm, angles, 40);
    // should not have more than one rep
    const repsCount = phases.filter((p) => p === 'rep_completed').length;
    expect(repsCount).toBeLessThanOrEqual(1);
  });

  it('missing landmarks (low visibility) keeps idle/ready but not counting', () => {
    const sm = new HysteresisStateMachine(SQUAT_CFG);
    let t = 0;
    t += 40; sm.step(170, t, 0.1); // low vis -> should stay idle or ready but not progress to down
    t += 40; const { nextPhase, didRep } = sm.step(95, t, 0.1);
    expect(didRep).toBe(false);
    expect(['idle', 'ready']).toContain(nextPhase);
  });

  it('slow movement still counts (same pattern with 60ms steps and extended up hold)', () => {
    const sm = new HysteresisStateMachine(SQUAT_CFG);
    const angles = [170,168,165,140,120,100,95,92,90,92,92,92,105,125,145,155,158,160,160,160,160,160,160,160,160];
    const { reps } = seqAnglesToSteps(sm, angles, 60);
    expect(reps.length).toBe(1);
  });

  it('very fast burst without dwell does NOT count (debounce protects)', () => {
    const sm = new HysteresisStateMachine(SQUAT_CFG);
    const angles = [170, 95, 155]; // no dwell time
    const { reps } = seqAnglesToSteps(sm, angles, 20);
    expect(reps.length).toBe(0);
  });

  it('consumeRep resets to ready after a valid rep', () => {
    const sm = new HysteresisStateMachine(SQUAT_CFG);
    let t = 0;
    const angles = [170,168,165,140,120,100,95,92,90,92,92,92,105,125,145,155,158,160,160,160,160,160,160,160,160];
    let did = false;
    for (const a of angles) {
      t += 50;
      const r = sm.step(a, t, 0.9);
      if (r.didRep) { sm.consumeRep(t, a); did = true; break; }
    }
    expect(did).toBe(true);
    expect(sm.phase).toBe('ready');
  });

  it('partial movement does not reach rep_completed without valid ROM', () => {
    const sm = new HysteresisStateMachine(SQUAT_CFG);
    // only small range: 170 -> 130 -> 150 (never reaches downThreshold+18 validity check after filtering)
    // but FSM needs minAngle <= down+18. Here min is 130 >126 => should fail
    const angles = [170, 150, 130, 135, 150, 160];
    const { reps } = seqAnglesToSteps(sm, angles, 60);
    expect(reps.length).toBe(0);
  });
});
