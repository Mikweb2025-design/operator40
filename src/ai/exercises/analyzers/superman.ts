import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
export class SupermanAnalyzer extends ExerciseAnalyzer{
  readonly id='superman'; readonly requiredLandmarks=[11,12,23,24,25,26];
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const hip=(angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee)+angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee))/2;
    const down=hip>170; const up=hip<162;
    let repInc=false, repConf=0;
    if (this.phase==='READY' && down) this.phase='DOWN';
    else if (this.phase==='DOWN' && up){ this.phase='UP'; this.lastTransitionAt=ts; }
    else if (this.phase==='UP' && down){
      repConf=clamp(70 + (q.exerciseConfidence>60?10:0),0,100);
      if(repConf>65 && q.exerciseConfidence>45 && this.shouldCountRep(ts,repConf,65)){ repInc=true; this.lastRepAt=ts; this.phase='READY'; }
      else this.phase='READY';
    }
    return { phase:this.phase, enginePhase: this.phase==='UP'?'bottom':'down' as any, repIncrement: repInc, repConfidence: repConf, formScore:88, poseQuality:q, cues:[], primaryAngle:hip, secondaryAngles:{ hip }, velocity:0, direction:'hold' as any };
  }
}
