import { describe, it, expect } from 'vitest';
import { getDefinition, normalizeExerciseId, EXERCISE_DEFINITIONS } from './definitions';
import { LM } from '../math';

describe('ExerciseDefinitions', () => {
  it('22 definitions exist, all trackingSupported=true after full implementation', () => {
    const all = ['squat','pushup','crunch','plank','mountainclimber','jumpingjack','flutterkick','bicyclecrunch','legraise','deadbug','heeltap','vup','burpee','affondo','skater','ginocchiaalte','superman','ponte','russiantwist','wallsit','sideplank','plankjack'];
    for (const id of all) {
      const d = getDefinition(id);
      expect(d, `missing ${id}`).toBeTruthy();
      expect(d!.trackingSupported).toBe(true);
      expect(d!.requiredLandmarks.length).toBeGreaterThan(3);
      expect(d!.movementPattern).toBeTruthy();
      expect(d!.thresholds.downThreshold).toBeGreaterThan(20);
      expect(d!.thresholds.upThreshold).toBeGreaterThan(d!.thresholds.downThreshold);
    }
  });

  it('aliases normalize correctly', () => {
    expect(normalizeExerciseId('flessioni')).toBe('pushup');
    expect(normalizeExerciseId('crunchbici')).toBe('bicyclecrunch');
    expect(normalizeExerciseId('burpeetattico')).toBe('burpee');
    expect(normalizeExerciseId('highknees')).toBe('ginocchiaalte');
    expect(normalizeExerciseId('bridge')).toBe('ponte');
    expect(normalizeExerciseId('lunge')).toBe('affondo');
  });

  it('unknown exercise returns null, not fallback', () => {
    expect(getDefinition('notanexercise')).toBeNull();
  });

  it('each definition evaluateForm returns quality 0-100 and cues array', () => {
    // Mock landmarks: all visible at 0.9, positions forming neutral stance
    const lm = Array.from({ length: 33 }, () => ({ x: 0.5, y: 0.5, visibility: 0.9 }));
    // set specific joints for hip/knee alignment
    lm[LM.left_hip] = { x: 0.45, y: 0.5, visibility: 0.9 }; lm[LM.right_hip] = { x: 0.55, y: 0.5, visibility: 0.9 };
    lm[LM.left_knee] = { x: 0.45, y: 0.7, visibility: 0.9 }; lm[LM.right_knee] = { x: 0.55, y: 0.7, visibility: 0.9 };
    lm[LM.left_ankle] = { x: 0.45, y: 0.9, visibility: 0.9 }; lm[LM.right_ankle] = { x: 0.55, y: 0.9, visibility: 0.9 };
    lm[LM.left_shoulder] = { x: 0.45, y: 0.3, visibility: 0.9 }; lm[LM.right_shoulder] = { x: 0.55, y: 0.3, visibility: 0.9 };
    for (const d of Object.values(EXERCISE_DEFINITIONS) as any[]) {
      const res = d.evaluateForm(lm, { knee: 170, primary: 170 }, 'ready', { velocity: 0, direction: 'up', visibility: 0.9, repCount: 0 });
      expect(res.quality).toBeGreaterThanOrEqual(0);
      expect(res.quality).toBeLessThanOrEqual(100);
      expect(Array.isArray(res.cues)).toBe(true);
    }
  });

  it('isHold correctly set for plank-like exercises', () => {
    expect(getDefinition('plank')!.isHold).toBe(true);
    expect(getDefinition('wallsit')!.isHold).toBe(true);
    expect(getDefinition('sideplank')!.isHold).toBe(true);
    expect(getDefinition('squat')!.isHold).not.toBe(true);
  });

  it('normalize preserves already-normalized', () => {
    expect(normalizeExerciseId('squat')).toBe('squat');
    expect(normalizeExerciseId('plankjack')).toBe('plankjack');
  });
});
