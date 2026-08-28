import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, clamp } from '../../pose/Geometry';
// tuned 2026-08-27: verified thresholds via fixtures replay — 14 remaining analyzers
export class SideplankAnalyzer extends ExerciseAnalyzer{
  readonly id='sideplank'; readonly requiredLandmarks=[11,12,23,24,27,28];
  private goodSince:number|null=null; private graceMs=500;
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const feats = this.pushTemporalFrame(lm, ts, ((arguments as any)[2] ?? 16) || 16);
    const _temporal = this.getTemporalClassifier('sideplank');
    const line=this.bilateralJointAngle('trunk', lm, [LM.left_shoulder,LM.left_hip,LM.left_ankle], [LM.right_shoulder,LM.right_hip,LM.right_ankle]);
    const valid= line>158 && q.exerciseConfidence>38;
    if (valid){ if(this.goodSince==null) this.goodSince=ts; this.phase='HOLD_GOOD'; }
    else { if(this.goodSince!=null && ts - this.goodSince < this.graceMs) this.phase='HOLD_GOOD'; else { this.phase='HOLD_BAD'; this.goodSince=null; } }
    let form=94; const cues:string[]=[];
    if(line<148){ form=52; cues.push('hipsUp'); } else if(line<158){ form-=12; cues.push('coreTight'); }
    return { phase:this.phase, enginePhase:'ready' as any, repIncrement:false, repConfidence:0, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle:line, secondaryAngles:{ temporalROM: Math.round(this.temporalBuffer.getROM('kneeRaw')),  line }, velocity:0, direction:'hold' as any };
  }
  reset(){ super.reset(); }
}
