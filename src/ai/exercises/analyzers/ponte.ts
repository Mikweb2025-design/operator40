import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
export class PonteAnalyzer extends ExerciseAnalyzer{
  readonly id='ponte'; readonly requiredLandmarks=[11,12,23,24,25,26,27,28];
  private velFilt=0; private lastA=100;
  analyze(lm: PoseLandmarks, ts:number, dtMs:number, q:PoseQualityResult){
    const hip=(angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee)+angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee))/2;
    const dt=dtMs||16; const rawV=(hip-this.lastA)/(dt/1000); this.velFilt=this.velFilt*0.75+rawV*0.25;
    const dir=Math.abs(this.velFilt)<18?'hold':this.velFilt>0?'up':'down';
    this.trough=Math.min(this.trough,hip); this.peak=Math.max(this.peak,hip);
    let next=this.phase;
    if (this.phase==='READY' && hip>130) next='RISING';
    else if (this.phase==='RISING' && hip>158) next='TOP';
    else if (this.phase==='TOP' && hip<135) next='LOWERING';
    else if (this.phase==='LOWERING' && hip<102) next='DOWN';
    let repInc=false, repConf=0;
    if (next==='DOWN' && (this.phase==='LOWERING'||this.phase==='TOP')){
      const rom=this.peak - this.trough; const topOk=this.peak>158; const downOk=hip<102;
      repConf=clamp(topOk&&downOk? 65 + (rom>55?15:5): 15,0,100);
      if(topOk&&downOk&&repConf>68 && q.exerciseConfidence>45 && this.shouldCountRep(ts,repConf,68)){ repInc=true; this.lastRepAt=ts; this.trough=hip; this.peak=hip; next='READY'; }
    }
    if(repInc){ this.phase='READY'; this.lastTransitionAt=ts; } else if(next!==this.phase){ this.phase=next; this.lastTransitionAt=ts; }
    this.lastA=hip;
    let form=90; const cues:string[]=[]; const trunk=(angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_ankle)+angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_ankle))/2;
    if(trunk<150){ form-=12; cues.push('coreTight'); }
    const eng = this.phase==='TOP'?'bottom': this.phase==='RISING'?'down': this.phase==='LOWERING'?'up':'ready';
    return { phase:this.phase, enginePhase: eng as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle:hip, secondaryAngles:{ trunk }, velocity:this.velFilt, direction: dir as any };
  }
}
