import { describe, it, expect } from 'vitest';
import { buildMissionPlan, exerciseFromPhase } from './MissionManager';

describe('MissionManager', () => {
  it('builds plan from PROGRAMS mission and resolves definitions', () => {
    const prog = { id: 'A', name: { it: 'TEST' }, rounds: 2, exercises: ['squat','flessioni','plank'] };
    const plan = buildMissionPlan(prog, 'it', 'combattente', 40);
    expect(plan).toBeTruthy();
    expect(plan!.exercises.length).toBe(3);
    expect(plan!.exercises[0].exerciseId).toBe('squat');
    expect(plan!.exercises[1].exerciseId).toBe('pushup'); // flessioni normalized
    expect(plan!.exercises[0].trackingSupported).toBe(true);
    expect(plan!.exercises[2].isHold).toBe(true);
    expect(plan!.totalWorkPhases).toBe(6); // 3 exercises * 2 rounds
  });

  it('exerciseFromPhase resolves correctly with lang', () => {
    const ex = exerciseFromPhase({ exerciseId: 'squat', reps: 12 }, 'en', 'combattente');
    expect(ex).toBeTruthy();
    expect(ex!.exerciseId).toBe('squat');
    expect(ex!.trackingSupported).toBe(true);
    expect(ex!.targetReps).toBe(12);
  });

  it('unsupported exercise returns trackingSupported false (no fake fallback)', () => {
    const prog = { id: 'X', name: { it: 'X' }, rounds: 1, exercises: ['notanexercise'] };
    const plan = buildMissionPlan(prog, 'it');
    expect(plan!.exercises[0].trackingSupported).toBe(false);
    expect(plan!.exercises[0].definition).toBeNull();
  });

  it('targetDuration for hold is set', () => {
    const prog = { id: 'H', name: { it: 'H' }, rounds: 1, exercises: ['plank'] };
    const plan = buildMissionPlan(prog, 'it', 'combattente', 40);
    expect(plan!.exercises[0].isTimeBased).toBe(true);
    expect(plan!.exercises[0].targetDurationMs).toBe(40000);
    expect(plan!.exercises[0].targetReps).toBeNull();
  });
});
