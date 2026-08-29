import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
// tuned 2026-08-27: verified thresholds via fixtures replay — 14 remaining analyzers
export class BurpeeAnalyzer extends ExerciseAnalyzer{
  readonly id='burpee'; readonly requiredLandmarks=[23,24,25,26,27,28,11,12,13,14];
  analyze(lm: PoseLandmarks, ts:number, dtMs:number, q:PoseQualityResult){
    const feats = this.pushTemporalFrame(lm, ts, dtMs || 16);
    const _temporal = this.getTemporalClassifier('burpee');
    const knee=(angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle)+angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle))/2;
    const elbow=(angleFromLandmarks(lm, LM.left_shoulder, LM.left_elbow, LM.left_wrist)+angleFromLandmarks(lm, LM.right_shoulder, LM.right_elbow, LM.right_wrist))/2;
    const hipY=((lm[LM.left_hip]?.y??0.5)+(lm[LM.right_hip]?.y??0.5))/2;
    let repInc=false, repConf=0;
    // v2.14.2: tuned via burpee.json + burpee-nojump.json replay
    // standing hipY 0.62→0.65 (far camera), squat 108→112 (over-40), handsDown 0.58→0.56, plank 135→132
    const standing=knee>138 && hipY<0.65;
    const squat=knee<112;
    const handsDown= hipY>0.56 && Math.min(lm[LM.left_wrist]?.y??1, lm[LM.right_wrist]?.y??1) > 0.60;
    const plank=elbow>142 && knee>132;
    const jump= hipY<0.54 && knee>142 && Math.abs(knee-150)<32;

    // State machine: READY->SQUAT->HANDS_DOWN->PLANK->RETURN->STANDING->JUMP->REP
    if (this.phase==='READY' && squat) this.phase='SQUAT';
    else if (this.phase==='SQUAT' && handsDown) this.phase='HANDS_DOWN';
    else if (this.phase==='HANDS_DOWN' && plank) this.phase='PLANK';
    else if (this.phase==='PLANK' && squat) this.phase='RETURN';
    else if (this.phase==='RETURN' && standing) this.phase='STANDING';
    else if (this.phase==='STANDING' && jump){
      repConf=clamp(68 + (q.exerciseConfidence>58?10:0) + (Math.abs(elbow-160)<20?6:0),0,100);
      if(repConf>58 && q.exerciseConfidence>36 && this.shouldCountRep(ts,repConf,58)){ repInc=true; this.lastRepAt=ts; this.phase='READY'; }
    } else if (this.phase==='STANDING' && standing && ts - this.lastTransitionAt > 850){
      // No jump but returned to standing after plank → count partial burpee (no-jump allowed for over-40)
      repConf=clamp(62 + (q.exerciseConfidence>58?8:0),0,100);
      if(repConf>58 && q.exerciseConfidence>36 && this.shouldCountRep(ts,repConf,58)){ repInc=true; this.lastRepAt=ts; this.phase='READY'; }
    }
    // Allow partial reset if lost
    if (!standing && !squat && this.phase==='STANDING' && ts - this.lastTransitionAt > 1200) this.phase='READY';
    return { phase:this.phase, enginePhase: this.phase==='PLANK'?'bottom': this.phase==='SQUAT'?'down': this.phase==='STANDING'?'up':'ready' as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(86,0,100), poseQuality:q, cues:[], primaryAngle:knee, secondaryAngles:{ elbow, hipY }, velocity:0, direction:'hold' as any };
  }
}
