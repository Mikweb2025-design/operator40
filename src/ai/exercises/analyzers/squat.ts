import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
function knee(lm: PoseLandmarks){
  const al = angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle);
  const ar = angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle);
  const vl=Math.min(lm[LM.left_hip]?.visibility??0,lm[LM.left_knee]?.visibility??0,lm[LM.left_ankle]?.visibility??0);
  const vr=Math.min(lm[LM.right_hip]?.visibility??0,lm[LM.right_knee]?.visibility??0,lm[LM.right_ankle]?.visibility??0);
  if (vl>vr+0.12) return al; if (vr>vl+0.12) return ar; return (al+ar)/2;
}
function trunk(lm: PoseLandmarks){
  const al=angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_ankle);
  const ar=angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_ankle);
  return (al+ar)/2;
}
export class SquatAnalyzer extends ExerciseAnalyzer{
  readonly id='squat'; readonly requiredLandmarks=[11,12,23,24,25,26,27,28];
  private velFilt=0; private lastA=180;
  analyze(lm: PoseLandmarks, ts:number, dtMs:number, q:PoseQualityResult){
    const ang=knee(lm);
    const hipY=((lm[LM.left_hip]?.y??0.5)+(lm[LM.right_hip]?.y??0.5))/2;
    const dt=dtMs||16; const rawV=(ang-this.lastA)/(dt/1000); this.velFilt=this.velFilt*0.75+rawV*0.25;
    const dir=Math.abs(this.velFilt)<18?'hold':this.velFilt<0?'down':'up';
    this.trough=Math.min(this.trough,ang); this.peak=Math.max(this.peak,ang);
    let next=this.phase;
    // STANDING -> DESCENDING -> BOTTOM -> ASCENDING -> STANDING
    if (this.phase==='READY' && (ang<115 || hipY>0.61)) next='DESCENDING';
    else if (this.phase==='DESCENDING' && (ang<105 || hipY>0.65)) next='BOTTOM';
    else if (this.phase==='BOTTOM' && ang>145 && hipY<0.60) next='ASCENDING';
    else if (this.phase==='ASCENDING' && ang>148) next='STANDING';

    let repInc=false, repConf=0;
    if (next==='STANDING' && (this.phase==='ASCENDING' || this.phase==='BOTTOM')){
      const rom=this.peak - this.trough;
      const depthOk=this.trough<108; const extOk=ang>148;
      const velScore=clamp(100-Math.abs(this.velFilt)*0.06,0,100);
      repConf=clamp(depthOk&&extOk? velScore*0.3 + (rom>30?30:10) + (trunk(lm)>155?40:20) : 20,0,100);
      if (depthOk && extOk && repConf>75 && q.exerciseConfidence>45){
        if (this.shouldCountRep(ts,repConf,75)){ repInc=true; this.lastRepAt=ts; this.trough=ang; this.peak=ang; next='READY'; }
      }
    }
    if (repInc){ this.phase='READY'; this.lastTransitionAt=ts; } else if (next!==this.phase){ this.phase=next; this.lastTransitionAt=ts; }

    let form=92, cues:string[]=[]; const tr=trunk(lm);
    if (tr<148){ form-=18; cues.push('backStraight'); } else if (tr<162){ form-=7; cues.push('backStraight'); }
    if (this.phase==='DESCENDING' && ang>105 && ang<135 && dir==='down') cues.push('scendiAncora');
    if (this.phase==='ASCENDING' && ang>125 && ang<148 && dir==='up') cues.push('distendiGambe');
    if (Math.abs(this.velFilt)>430){ form-=9; cues.push('control'); }
    this.lastA=ang;
    const eng = this.phase==='BOTTOM'?'bottom': this.phase==='DESCENDING'?'down': this.phase==='ASCENDING'?'up': this.phase==='STANDING'?'up':'ready';
    return { phase:this.phase, enginePhase: eng as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle:ang, secondaryAngles:{ trunk: tr, hipY }, velocity:this.velFilt, direction: dir as any };
  }
}
