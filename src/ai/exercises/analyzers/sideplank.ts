import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
export class SideplankAnalyzer extends ExerciseAnalyzer{
  readonly id='sideplank'; readonly requiredLandmarks=[11,12,23,24,27,28];
  analyze(lm: PoseLandmarks, _ts:number, _dt:number, q:PoseQualityResult){
    const line=(angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_ankle)+angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_ankle))/2;
    const valid= line>162 && q.exerciseConfidence>50;
    if (valid) this.phase='HOLD_GOOD'; else this.phase='HOLD_BAD';
    let form=94; const cues:string[]=[];
    if(line<150){ form=52; cues.push('hipsUp'); } else if(line<162){ form-=12; cues.push('coreTight'); }
    return { phase:this.phase, enginePhase:'ready' as any, repIncrement:false, repConfidence:0, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle:line, secondaryAngles:{ line }, velocity:0, direction:'hold' as any };
  }
}
