import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, clamp } from '../../pose/Geometry';
// tuned 2026-08-27: verified thresholds via fixtures replay — 14 remaining analyzers
export class SupermanAnalyzer extends ExerciseAnalyzer{
  readonly id='superman'; readonly requiredLandmarks=[11,12,23,24,25,26];
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const hip=this.bilateralJointAngle('hip', lm, [LM.left_shoulder,LM.left_hip,LM.left_knee], [LM.right_shoulder,LM.right_hip,LM.right_knee]);
    const down=hip>168; const up=hip<162;
    // grace: if prone y spread small, still allow: use also shoulder-hip y diff as fallback
    const shoulderY=(lm[LM.left_shoulder]?.y??0.5 + lm[LM.right_shoulder]?.y??0.5)/2;
    const hipY=(lm[LM.left_hip]?.y??0.5 + lm[LM.right_hip]?.y??0.5)/2;
    const lifted = shoulderY < hipY - 0.015 || hipY < 0.72;
    let repInc=false, repConf=0;
    if (this.phase==='READY' && down) this.phase='DOWN';
    else if (this.phase==='DOWN' && (up || lifted)){ this.phase='UP'; this.lastTransitionAt=ts; }
    else if (this.phase==='UP' && down){
      repConf=clamp(66 + (q.exerciseConfidence>60?10:0) + (lifted?6:0),0,100);
      if(repConf>60 && q.exerciseConfidence>38 && this.shouldCountRep(ts,repConf,60)){ repInc=true; this.lastRepAt=ts; this.phase='READY'; }
      else this.phase='READY';
    }
    return { phase:this.phase, enginePhase: this.phase==='UP'?'bottom':'down' as any, repIncrement: repInc, repConfidence: repConf, formScore:88, poseQuality:q, cues:[], primaryAngle:hip, secondaryAngles:{ hip }, velocity:0, direction:'hold' as any };
  }
}
