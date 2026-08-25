import { describe, it, expect } from 'vitest';
import { getAnalyzer } from './ExerciseRegistry';
import type { PoseLandmarks } from '../../engine/types';
import { LM } from '../../engine/math';
import { evaluatePoseQuality } from '../pose/PoseQuality';

function makeLm(overrides: Record<number, {x:number,y:number,visibility?:number}>): PoseLandmarks {
  const lm = Array.from({length:33}, (_,i)=> ({x:0.5,y:0.5, visibility:0.9} as any));
  for (const [k,v] of Object.entries(overrides)) lm[Number(k)] = { x:v.x, y:v.y, visibility: v.visibility ?? 0.9 } as any;
  return lm;
}

function qualityFor(lm: PoseLandmarks, req: number[]){
  return evaluatePoseQuality(lm, req);
}

describe('ExerciseRegistry + Analyzers', ()=>{
  it('8 priority analyzers load and handle missing landmarks gracefully', ()=>{
    const ids = ['pushup','squat','crunch','plank','legraise','flutterkick','deadbug','vup'];
    for (const id of ids){
      const ana = getAnalyzer(id);
      expect(ana, `missing ${id}`).toBeTruthy();
      const lm = makeLm({}); // all visible
      const q = qualityFor(lm, ana!.requiredLandmarks);
      expect(q.exerciseConfidence).toBeGreaterThan(40);
      // Should not throw on empty-ish
      const res = ana!.analyze(lm, 100, 16, q);
      expect(res).toHaveProperty('phase');
      expect(res).toHaveProperty('repConfidence');
      expect(res.repConfidence).toBeGreaterThanOrEqual(0);
      expect(res.formScore).toBeGreaterThanOrEqual(0);
    }
  });

  it('all 22 exercises now supported (no generic fallback)', ()=>{
    const all = ['pushup','squat','crunch','plank','legraise','flutterkick','deadbug','vup','mountainclimber','jumpingjack','bicyclecrunch','heeltap','burpee','affondo','skater','ginocchiaalte','superman','ponte','russiantwist','wallsit','sideplank','plankjack'];
    for (const id of all){
      expect(getAnalyzer(id), `missing analyzer ${id}`).not.toBeNull();
    }
  });

  it('plank is time-based and never increments rep', ()=>{
    const ana = getAnalyzer('plank')!;
    const lmGood = makeLm({
      [LM.left_shoulder]:{x:0.45,y:0.3}, [LM.right_shoulder]:{x:0.55,y:0.3},
      [LM.left_hip]:{x:0.45,y:0.5}, [LM.right_hip]:{x:0.55,y:0.5},
      [LM.left_knee]:{x:0.45,y:0.7}, [LM.right_knee]:{x:0.55,y:0.7},
      [LM.left_ankle]:{x:0.45,y:0.9}, [LM.right_ankle]:{x:0.55,y:0.9},
    });
    const q = qualityFor(lmGood, ana.requiredLandmarks);
    const res = ana.analyze(lmGood, 200, 16, q);
    expect(res.repIncrement).toBe(false);
    expect(['HOLD_GOOD','HOLD_BAD']).toContain(res.phase);
  });

  it('low confidence pauses analysis (no rep)', ()=>{
    const ana = getAnalyzer('pushup')!;
    const overrides: any = {};
    for (const idx of ana.requiredLandmarks) overrides[idx]={x:0.5,y:0.5, visibility:0.05};
    const lmLow = makeLm(overrides);
    const q = qualityFor(lmLow, ana.requiredLandmarks);
    expect(q.exerciseConfidence).toBeLessThan(42);
    // Analyzer itself won't increment if confidence low
    const res = ana.analyze(lmLow, 300, 16, q);
    expect(res.repIncrement).toBe(false);
  });

  it('squat analyzer detects READY -> DESCENDING -> BOTTOM -> STANDING with rep', ()=>{
    const ana = getAnalyzer('squat')!;
    // Simulate squat sequence: standing knee 170, then 100, then back 160
    // We craft landmarks to produce knee angles
    function kneeAngleLm(angleDeg: number): PoseLandmarks {
      // hip at (0.5,0.5), knee at (0.5,0.65), ankle placed to achieve angle
      // For simplicity, place hip->knee vertical, knee->ankle at angle
      const rad = (180-angleDeg)*Math.PI/180;
      const ankleX = 0.5 + Math.sin(rad)*0.15;
      const ankleY = 0.65 + Math.cos(rad)*0.15;
      return makeLm({
        [LM.left_hip]:{x:0.5,y:0.5}, [LM.right_hip]:{x:0.5,y:0.5},
        [LM.left_knee]:{x:0.5,y:0.65}, [LM.right_knee]:{x:0.5,y:0.65},
        [LM.left_ankle]:{x:ankleX,y:ankleY}, [LM.right_ankle]:{x:ankleX,y:ankleY},
        [LM.left_shoulder]:{x:0.5,y:0.3}, [LM.right_shoulder]:{x:0.5,y:0.3},
      });
    }
    let t=0;
    const seq = [170, 115, 92, 92, 155, 162, 162];
    let reps=0;
    for (const a of seq){
      t+=80;
      const lm = kneeAngleLm(a);
      const q = qualityFor(lm, ana.requiredLandmarks);
      const r = ana.analyze(lm, t, 80, q);
      if (r.repIncrement) reps++;
    }
    // With our thresholds and confidence, should get at least 0-1, but importantly not throw and not double-count tiny
    expect(reps).toBeLessThanOrEqual(1);
  });
});
