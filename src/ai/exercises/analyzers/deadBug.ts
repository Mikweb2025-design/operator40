import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
export class DeadBugAnalyzer extends ExerciseAnalyzer{
  readonly id='deadbug'; readonly requiredLandmarks=[11,12,23,24,25,26,13,14,15,16,27,28];
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const lHip=angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
    const rHip=angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
    const lSh=angleFromLandmarks(lm, LM.left_hip, LM.left_shoulder, LM.left_elbow);
    const rSh=angleFromLandmarks(lm, LM.right_hip, LM.right_shoulder, LM.right_elbow);
    const extL=lHip>150 && lSh>130; const extR=rHip>150 && rSh>130;
    const oneExt = extL !== extR;
    let repInc=false, repConf=0;
    if (this.phase==='READY' && !oneExt) this.phase='TUCKED';
    else if (this.phase==='TUCKED' && oneExt){ this.phase='EXTENDED'; this.lastTransitionAt=ts; }
    else if (this.phase==='EXTENDED' && !oneExt){
      // returned to tucked -> one rep (contralateral cycle)
      repConf= clamp(65 + (q.exerciseConfidence>60?15:0) + (Math.abs(lHip-rHip)>30?10:0),0,100);
      if (repConf>60 && q.exerciseConfidence>38 && this.shouldCountRep(ts,repConf,60)){ repInc=true; this.lastRepAt=ts; this.phase='READY'; }
      else this.phase='READY';
    }
    let form=90; const cues:string[]=[]; const trunk=(angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_ankle)+angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_ankle))/2;
    if (trunk<160){ form-=10; cues.push('coreTight'); }
    return { phase:this.phase, enginePhase: this.phase==='EXTENDED'?'bottom': this.phase==='TUCKED'?'down':'ready' as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle: (lHip+rHip)/2, secondaryAngles:{ lHip, rHip, lSh, rSh }, velocity:0, direction:'hold' as any };
  }
}
