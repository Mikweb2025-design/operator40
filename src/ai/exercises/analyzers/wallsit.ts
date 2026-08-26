import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, clamp } from '../../pose/Geometry';
export class WallsitAnalyzer extends ExerciseAnalyzer{
  readonly id='wallsit'; readonly requiredLandmarks=[23,24,25,26,27,28,11,12];
  private goodSince:number|null=null; private graceMs=500;
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const k=this.bilateralJointAngle('knee', lm, [LM.left_hip,LM.left_knee,LM.left_ankle], [LM.right_hip,LM.right_knee,LM.right_ankle]);
    const trunk=this.bilateralJointAngle('trunk', lm, [LM.left_shoulder,LM.left_hip,LM.left_ankle], [LM.right_shoulder,LM.right_hip,LM.right_ankle]);
    const valid = k>78 && k<108 && trunk>152 && q.exerciseConfidence>38;
    if (valid){ if(this.goodSince==null) this.goodSince=ts; this.phase='HOLD_GOOD'; }
    else { if(this.goodSince!=null && ts - this.goodSince < this.graceMs) this.phase='HOLD_GOOD'; else { this.phase='HOLD_BAD'; this.goodSince=null; } }
    let form=95; const cues:string[]=[];
    if(k<78||k>108){ form-=22; cues.push('control'); } else if(k<82||k>105){ form-=10; cues.push('control'); }
    if(trunk<152){ form-=10; cues.push('backStraight'); }
    return { phase:this.phase, enginePhase:'ready' as any, repIncrement:false, repConfidence:0, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle:k, secondaryAngles:{ trunk }, velocity:0, direction:'hold' as any };
  }
}
