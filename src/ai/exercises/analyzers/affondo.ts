import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
export class AffondoAnalyzer extends ExerciseAnalyzer{
  readonly id='affondo'; readonly requiredLandmarks=[23,24,25,26,27,28,11,12];
  protected minRepIntervalMs = 350;
  protected minPhaseMs = 70;
  private velFilt=0; private lastA=160;
  analyze(lm: PoseLandmarks, ts:number, dtMs:number, q:PoseQualityResult){
    const al=angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle);
    const ar=angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle);
    // pick most flexed leg as active
    const knee=Math.min(al,ar);
    const dt=dtMs||16; const rawV=(knee-this.lastA)/(dt/1000); this.velFilt=this.velFilt*0.70+rawV*0.30;
    const dir=Math.abs(this.velFilt)<18?'hold':this.velFilt<0?'down':'up';
    this.trough=Math.min(this.trough,knee); this.peak=Math.max(this.peak,knee);
    let next=this.phase;
    // Over-40: depth 105 not 92, ext 142 not 150, OR hipY helper via trunk lean
    if (this.phase==='READY' && knee<122) next='DESCENDING';
    else if (this.phase==='DESCENDING' && knee<105) next='BOTTOM';
    else if (this.phase==='BOTTOM' && knee>135) next='ASCENDING';
    else if (this.phase==='ASCENDING' && knee>142) next='STANDING';
    // shallow bounce: DESCENDING directly to ASCENDING if goes up early with trough already <122
    else if (this.phase==='DESCENDING' && knee>138 && this.trough<122) next='ASCENDING';
    let repInc=false, repConf=0;
    if (next==='STANDING' && (this.phase==='ASCENDING'||this.phase==='BOTTOM'||this.phase==='DESCENDING')){
      const depthOk=this.trough<105; const extOk=knee>142;
      const symScore = Math.abs(al-ar)<20?10: Math.abs(al-ar)<30?6:3;
      const rom=this.peak - this.trough;
      const romScore = rom>28?18: rom>18?10:6;
      if (depthOk&&extOk){
        repConf=clamp(62 + symScore + romScore + (q.exerciseConfidence>60?6:0),0,100);
      } else { repConf=clamp(18,0,100); }
      if(depthOk&&extOk&&repConf>60 && q.exerciseConfidence>38 && this.shouldCountRep(ts,repConf,60)){ repInc=true; this.lastRepAt=ts; this.trough=knee; this.peak=knee; next='READY'; }
    }
    if(repInc){ this.phase='READY'; this.lastTransitionAt=ts; } else if(next!==this.phase){ this.phase=next; this.lastTransitionAt=ts; }
    this.lastA=knee;
    const trunk=this.bilateralJointAngle('trunk', lm, [LM.left_shoulder,LM.left_hip,LM.left_ankle], [LM.right_shoulder,LM.right_hip,LM.right_ankle]);
    let form=90; const cues:string[]=[];
    if(trunk<150){ form-=14; cues.push('backStraight'); }
    if(this.phase==='DESCENDING' && knee>108 && knee<138 && dir==='down') cues.push('scendiAncora');
    return { phase:this.phase, enginePhase: this.phase==='BOTTOM'?'bottom': this.phase==='DESCENDING'?'down': this.phase==='ASCENDING'?'up':'ready' as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle:knee, secondaryAngles:{ al, ar, trunk }, velocity:this.velFilt, direction: dir as any };
  }
}
