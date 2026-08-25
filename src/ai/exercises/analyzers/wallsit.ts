import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
export class WallsitAnalyzer extends ExerciseAnalyzer{
  readonly id='wallsit'; readonly requiredLandmarks=[23,24,25,26,27,28,11,12];
  analyze(lm: PoseLandmarks, _ts:number, _dt:number, q:PoseQualityResult){
    const k=(angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle)+angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle))/2;
    const trunk=(angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_ankle)+angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_ankle))/2;
    const valid = k>82 && k<105 && trunk>155 && q.exerciseConfidence>50;
    if (valid){ this.phase='HOLD_GOOD'; } else { this.phase='HOLD_BAD'; }
    let form=95; const cues:string[]=[];
    if(k<82||k>105){ form-=22; cues.push('control'); } else if(k<85||k>102){ form-=10; cues.push('control'); }
    if(trunk<155){ form-=10; cues.push('backStraight'); }
    return { phase:this.phase, enginePhase:'ready' as any, repIncrement:false, repConfidence:0, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle:k, secondaryAngles:{ trunk }, velocity:0, direction:'hold' as any };
  }
}
