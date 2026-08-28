import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, clamp } from '../../pose/Geometry';
export class LegRaiseAnalyzer extends ExerciseAnalyzer{
  // Ankles (27,28) not required for gating — only feed the secondary kneeExt form check, not the
  // hipFlex rep signal. See squat.ts comment (narrow phone FOV, feet/lower legs often cropped).
  readonly id='legraise'; readonly requiredLandmarks=[11,12,23,24,25,26];
  private velFilt=0; private lastA=170;
  analyze(lm: PoseLandmarks, ts:number, dtMs:number, q:PoseQualityResult){
    const feats = this.pushTemporalFrame(lm, ts, ((arguments as any)[2] ?? 16) || 16);
    const _temporal = this.getTemporalClassifier('legraise');
    const hipFlex = this.bilateralJointAngle('hipFlex', lm, [LM.left_shoulder,LM.left_hip,LM.left_knee], [LM.right_shoulder,LM.right_hip,LM.right_knee]);
    const lk = this.bilateralJointAngle('kneeExt', lm, [LM.left_hip,LM.left_knee,LM.left_ankle], [LM.right_hip,LM.right_knee,LM.right_ankle]);
    const dt=dtMs||16; const rawV=(hipFlex-this.lastA)/(dt/1000); this.velFilt=this.velFilt*0.75+rawV*0.25;
    const dir=Math.abs(this.velFilt)<18?'hold':this.velFilt<0?'down':'up';
    this.trough=Math.min(this.trough, hipFlex); this.peak=Math.max(this.peak, hipFlex);
    let next=this.phase;
    // DOWN (170) -> RAISING -> TOP (105) -> LOWERING -> DOWN (148) — over-40 permissivo
    if (this.phase==='READY' && hipFlex<145) next='RAISING';
    else if (this.phase==='RAISING' && hipFlex<105) next='TOP';
    else if (this.phase==='TOP' && hipFlex>118) next='LOWERING';
    else if (this.phase==='LOWERING' && hipFlex>148) next='DOWN';
    let repInc=false, repConf=0;
    if (next==='DOWN' && (this.phase==='LOWERING' || this.phase==='TOP')){
      const rom=this.peak - this.trough; const topOk=this.trough<108; const downOk=hipFlex>148;
      const kneeOk=lk>145;
      const kneeScore = lk>155?18: lk>145?10: 2;
      if (topOk&&downOk){
        repConf=clamp(52 + kneeScore + (rom>45?14: rom>30?8:4) + (Math.abs(this.velFilt)<350?8:0),0,100);
      } else { repConf=clamp(14,0,100); }
      // kneeOk not blocking rep, only lowers repConf
      if (topOk&&downOk&&repConf>60 && q.exerciseConfidence>38){ if(this.shouldCountRep(ts,repConf,60)){ repInc=true; this.lastRepAt=ts; } }
      // Always cycle back to READY — DOWN has no other exit transition, so a single
      // low-confidence attempt would otherwise lock tracking forever.
      this.trough=hipFlex; this.peak=hipFlex; next='READY';
    }
    if (repInc){ this.phase='READY'; this.lastTransitionAt=ts; } else if (next!==this.phase){ this.phase=next; this.lastTransitionAt=ts; }
    let form=90, cues:string[]=[];
    if (lk<145){ form-=14; cues.push('control'); } else if (lk<155){ form-=5; cues.push('control'); }
    if (this.phase==='RAISING' && hipFlex>105 && hipFlex<135 && dir==='down') cues.push('sollevaPiu');
    if (this.phase==='LOWERING' && hipFlex>120 && hipFlex<150 && dir==='up') cues.push('abbassaControllo');
    this.lastA=hipFlex;
    const eng = this.phase==='TOP'?'bottom': this.phase==='RAISING'?'down': this.phase==='LOWERING'?'up':'ready';
    return { phase:this.phase, enginePhase: eng as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle: hipFlex, secondaryAngles:{ temporalROM: Math.round(this.temporalBuffer.getROM('kneeRaw')),  kneeExt: lk }, velocity:this.velFilt, direction: dir as any };
  }
  reset(){ super.reset(); }
}
