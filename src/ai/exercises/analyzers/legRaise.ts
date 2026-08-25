import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
export class LegRaiseAnalyzer extends ExerciseAnalyzer{
  readonly id='legraise'; readonly requiredLandmarks=[11,12,23,24,25,26,27,28];
  private velFilt=0; private lastA=170;
  analyze(lm: PoseLandmarks, ts:number, dtMs:number, q:PoseQualityResult){
    const hipFlex = (angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee)+angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee))/2;
    const dt=dtMs||16; const rawV=(hipFlex-this.lastA)/(dt/1000); this.velFilt=this.velFilt*0.75+rawV*0.25;
    const dir=Math.abs(this.velFilt)<18?'hold':this.velFilt<0?'down':'up';
    this.trough=Math.min(this.trough, hipFlex); this.peak=Math.max(this.peak, hipFlex);
    let next=this.phase;
    // DOWN (170) -> RAISING -> TOP (90) -> LOWERING -> DOWN
    if (this.phase==='READY' && hipFlex<140) next='RAISING';
    else if (this.phase==='RAISING' && hipFlex<95) next='TOP';
    else if (this.phase==='TOP' && hipFlex>120) next='LOWERING';
    else if (this.phase==='LOWERING' && hipFlex>155) next='DOWN';
    let repInc=false, repConf=0;
    if (next==='DOWN' && (this.phase==='LOWERING' || this.phase==='TOP')){
      const rom=this.peak - this.trough; const topOk=this.trough<95; const downOk=hipFlex>155;
      const lk=(angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle)+angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle))/2;
      const kneeOk=lk>155;
      repConf=clamp(topOk&&downOk? 50 + (kneeOk?20:0) + (rom>55?15:5) + (Math.abs(this.velFilt)<300?10:0) : 15,0,100);
      if (topOk&&downOk&&kneeOk&&repConf>72 && q.exerciseConfidence>45){ if(this.shouldCountRep(ts,repConf,72)){ repInc=true; this.lastRepAt=ts; this.trough=hipFlex; this.peak=hipFlex; next='READY'; } }
    }
    if (repInc){ this.phase='READY'; this.lastTransitionAt=ts; } else if (next!==this.phase){ this.phase=next; this.lastTransitionAt=ts; }
    let form=90, cues:string[]=[]; const lk=(angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle)+angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle))/2;
    if (lk<155){ form-=12; cues.push('control'); }
    this.lastA=hipFlex;
    const eng = this.phase==='TOP'?'bottom': this.phase==='RAISING'?'down': this.phase==='LOWERING'?'up':'ready';
    return { phase:this.phase, enginePhase: eng as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle: hipFlex, secondaryAngles:{ kneeExt: lk }, velocity:this.velFilt, direction: dir as any };
  }
}
