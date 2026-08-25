import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
export class BurpeeAnalyzer extends ExerciseAnalyzer{
  readonly id='burpee'; readonly requiredLandmarks=[23,24,25,26,27,28,11,12,13,14];
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const knee=(angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle)+angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle))/2;
    const elbow=(angleFromLandmarks(lm, LM.left_shoulder, LM.left_elbow, LM.left_wrist)+angleFromLandmarks(lm, LM.right_shoulder, LM.right_elbow, LM.right_wrist))/2;
    const hipY=((lm[LM.left_hip]?.y??0.5)+(lm[LM.right_hip]?.y??0.5))/2;
    let repInc=false, repConf=0;
    const standing=knee>150 && hipY<0.55;
    const squat=knee<95;
    const handsDown= hipY>0.62 && Math.min(lm[LM.left_wrist]?.y??1, lm[LM.right_wrist]?.y??1) > 0.7;
    const plank=elbow>150 && knee>140;
    const jump= hipY<0.45 && knee>155;

    // State machine: READY->SQUAT->HANDS_DOWN->PLANK->RETURN->STANDING->JUMP->REP
    if (this.phase==='READY' && squat) this.phase='SQUAT';
    else if (this.phase==='SQUAT' && handsDown) this.phase='HANDS_DOWN';
    else if (this.phase==='HANDS_DOWN' && plank) this.phase='PLANK';
    else if (this.phase==='PLANK' && squat) this.phase='RETURN';
    else if (this.phase==='RETURN' && standing) this.phase='STANDING';
    else if (this.phase==='STANDING' && jump){
      repConf=clamp(75 + (q.exerciseConfidence>60?10:0),0,100);
      if(repConf>70 && q.exerciseConfidence>45 && this.shouldCountRep(ts,repConf,70)){ repInc=true; this.lastRepAt=ts; this.phase='READY'; }
    }
    // Allow partial reset if lost
    if (!standing && !squat && this.phase==='STANDING') this.phase='READY';
    return { phase:this.phase, enginePhase: this.phase==='PLANK'?'bottom': this.phase==='SQUAT'?'down': this.phase==='STANDING'?'up':'ready' as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(86,0,100), poseQuality:q, cues:[], primaryAngle:knee, secondaryAngles:{ elbow, hipY }, velocity:0, direction:'hold' as any };
  }
}
