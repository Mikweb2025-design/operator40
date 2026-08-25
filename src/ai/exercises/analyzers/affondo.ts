import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
export class AffondoAnalyzer extends ExerciseAnalyzer{
  readonly id='affondo'; readonly requiredLandmarks=[23,24,25,26,27,28,11,12];
  private velFilt=0; private lastA=160;
  analyze(lm: PoseLandmarks, ts:number, dtMs:number, q:PoseQualityResult){
    const al=angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle);
    const ar=angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle);
    // pick most flexed leg as active
    const knee=Math.min(al,ar);
    const dt=dtMs||16; const rawV=(knee-this.lastA)/(dt/1000); this.velFilt=this.velFilt*0.75+rawV*0.25;
    const dir=Math.abs(this.velFilt)<18?'hold':this.velFilt<0?'down':'up';
    this.trough=Math.min(this.trough,knee); this.peak=Math.max(this.peak,knee);
    let next=this.phase;
    if (this.phase==='READY' && knee<115) next='DESCENDING';
    else if (this.phase==='DESCENDING' && knee<92) next='BOTTOM';
    else if (this.phase==='BOTTOM' && knee>145) next='ASCENDING';
    else if (this.phase==='ASCENDING' && knee>150) next='STANDING';
    let repInc=false, repConf=0;
    if (next==='STANDING' && (this.phase==='ASCENDING'||this.phase==='BOTTOM')){
      const depthOk=this.trough<92; const extOk=knee>150;
      repConf=clamp(depthOk&&extOk? 70 + (Math.abs(al-ar)<20?10:0) : 20,0,100);
      if(depthOk&&extOk&&repConf>70 && q.exerciseConfidence>45 && this.shouldCountRep(ts,repConf,70)){ repInc=true; this.lastRepAt=ts; this.trough=knee; this.peak=knee; next='READY'; }
    }
    if(repInc){ this.phase='READY'; this.lastTransitionAt=ts; } else if(next!==this.phase){ this.phase=next; this.lastTransitionAt=ts; }
    this.lastA=knee;
    const trunk=(angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_ankle)+angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_ankle))/2;
    let form=90; const cues:string[]=[];
    if(trunk<150){ form-=14; cues.push('backStraight'); }
    if(this.phase==='DESCENDING' && knee>108 && knee<138 && dir==='down') cues.push('scendiAncora');
    return { phase:this.phase, enginePhase: this.phase==='BOTTOM'?'bottom': this.phase==='DESCENDING'?'down': this.phase==='ASCENDING'?'up':'ready' as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle:knee, secondaryAngles:{ al, ar, trunk }, velocity:this.velFilt, direction: dir as any };
  }
}
