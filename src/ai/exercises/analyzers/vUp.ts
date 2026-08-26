import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
export class VUpAnalyzer extends ExerciseAnalyzer{
  readonly id='vup'; readonly requiredLandmarks=[11,12,23,24,25,26,27,28,15,16];
  private velFilt=0; private lastA=160;
  analyze(lm: PoseLandmarks, ts:number, dtMs:number, q:PoseQualityResult){
    const pike=(angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee)+angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee))/2;
    const dt=dtMs||16; const rawV=(pike - this.lastA)/(dt/1000); this.velFilt=this.velFilt*0.75+rawV*0.25;
    const dir=Math.abs(this.velFilt)<18?'hold':this.velFilt<0?'down':'up';
    this.trough=Math.min(this.trough,pike); this.peak=Math.max(this.peak,pike);
    let next=this.phase;
    // EXTENDED (160) -> FOLDING -> V_POSITION (75) -> EXTENDING -> EXTENDED (145) — permissivo
    if (this.phase==='READY' && pike<=135) next='FOLDING';
    else if (this.phase==='FOLDING' && pike<=80) next='V_POSITION';
    else if (this.phase==='V_POSITION' && pike>=95) next='EXTENDING';
    else if (this.phase==='EXTENDING' && pike>=145) next='EXTENDED';
    let repInc=false, repConf=0;
    if (next==='EXTENDED' && (this.phase==='EXTENDING' || this.phase==='V_POSITION')){
      const rom=this.peak - this.trough; const foldOk=this.trough<=80; const extOk=pike>=145;
      const lk=(angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle)+angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle))/2;
      const legsStraight=lk>150;
      const legScore = lk>155?12: lk>145?6:2;
      if (foldOk&&extOk){
        repConf=clamp(54 + legScore + (rom>75?14: rom>55?8:4) + (Math.abs(this.velFilt)<600?8:0),0,100);
      } else { repConf=clamp(14,0,100); }
      if (foldOk&&extOk&&repConf>60 && q.exerciseConfidence>38){ if(this.shouldCountRep(ts,repConf,60)){ repInc=true; this.lastRepAt=ts; this.trough=pike; this.peak=pike; next='READY'; } }
    }
    if (repInc){ this.phase='READY'; this.lastTransitionAt=ts; } else if (next!==this.phase){ this.phase=next; this.lastTransitionAt=ts; }
    this.lastA=pike;
    let form=88; const cues:string[]=[]; const lk=(angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle)+angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle))/2;
    if (lk<150){ form-=10; cues.push('control'); }
    if (this.phase==='FOLDING' && pike>80 && pike<120 && dir==='down') cues.push('chiudiPiu');
    if (this.phase==='EXTENDING' && pike>110 && pike<145 && dir==='up') cues.push('distendiPiu');
    const eng = this.phase==='V_POSITION'?'bottom': this.phase==='FOLDING'?'down': this.phase==='EXTENDING'?'up':'ready';
    return { phase:this.phase, enginePhase: eng as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle: pike, secondaryAngles:{ kneeExt: lk }, velocity:this.velFilt, direction: dir as any };
  }
}
