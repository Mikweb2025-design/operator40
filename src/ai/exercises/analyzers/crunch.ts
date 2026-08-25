import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
export class CrunchAnalyzer extends ExerciseAnalyzer{
  readonly id='crunch'; readonly requiredLandmarks=[11,12,23,24,25,26,7,8];
  private velFilt=0; private lastA=120;
  analyze(lm: PoseLandmarks, ts:number, dtMs:number, q:PoseQualityResult){
    const hipFlex = (()=>{ const al=angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee); const ar=angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee); return (al+ar)/2; })();
    const dt=dtMs||16; const rawV=(hipFlex-this.lastA)/(dt/1000); this.velFilt=this.velFilt*0.75+rawV*0.25;
    const dir=Math.abs(this.velFilt)<18?'hold':this.velFilt<0?'down':'up';
    this.trough=Math.min(this.trough, hipFlex); this.peak=Math.max(this.peak, hipFlex);
    let next=this.phase;
    // EXTENDED (120) -> FLEXING -> CONTRACTED (95) -> RETURNING -> EXTENDED
    if (this.phase==='READY' && hipFlex<108) next='FLEXING';
    else if (this.phase==='FLEXING' && hipFlex<95) next='CONTRACTED';
    else if (this.phase==='CONTRACTED' && hipFlex>110) next='RETURNING';
    else if (this.phase==='RETURNING' && hipFlex>122) next='EXTENDED';
    let repInc=false, repConf=0;
    if (next==='EXTENDED' && (this.phase==='RETURNING' || this.phase==='CONTRACTED')){
      const rom=this.peak - this.trough; const contractOk=this.trough<95; const extOk=hipFlex>122;
      const neck=angleFromLandmarks(lm, LM.left_hip, LM.left_shoulder, LM.left_ear);
      const neckOk=neck>60 && neck<120;
      repConf=clamp(contractOk&&extOk? 60 + (neckOk?20:5) + (rom>25?15:0) + (Math.abs(this.velFilt)<380?5:0) : 20,0,100);
      if (contractOk && extOk && repConf>70 && q.exerciseConfidence>45){ if(this.shouldCountRep(ts,repConf,70)){ repInc=true; this.lastRepAt=ts; this.trough=hipFlex; this.peak=hipFlex; next='READY'; } }
    }
    if (repInc){ this.phase='READY'; this.lastTransitionAt=ts; } else if (next!==this.phase){ this.phase=next; this.lastTransitionAt=ts; }
    let form=88, cues:string[]=[]; const neckA=angleFromLandmarks(lm, LM.left_hip, LM.left_shoulder, LM.left_ear);
    if (neckA<60 || neckA>120){ form-=10; cues.push('backStraight'); }
    if (Math.abs(this.velFilt)>380){ form-=8; cues.push('control'); }
    this.lastA=hipFlex;
    const eng = this.phase==='CONTRACTED'?'bottom': this.phase==='FLEXING'?'down': this.phase==='RETURNING'?'up':'ready';
    return { phase:this.phase, enginePhase: eng as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle: hipFlex, secondaryAngles:{ neck: neckA }, velocity:this.velFilt, direction: dir as any };
  }
}
