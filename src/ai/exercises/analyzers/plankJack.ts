import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, clamp } from '../../pose/Geometry';
export class PlankJackAnalyzer extends ExerciseAnalyzer{
  readonly id='plankjack'; readonly requiredLandmarks=[11,12,23,24,25,26,27,28];
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const spread=(()=>{ const a=lm[LM.left_ankle], b=lm[LM.right_ankle]; if(!a||!b) return 0; return Math.hypot(a.x-b.x, a.y-b.y); })();
    const line=this.bilateralJointAngle('trunk', lm, [LM.left_shoulder,LM.left_hip,LM.left_ankle], [LM.right_shoulder,LM.right_hip,LM.right_ankle]);
    const plankOk=line>153;
    const closed=spread<0.12; const open=spread>0.30;
    let repInc=false, repConf=0;
    if (!plankOk){
      this.phase='BAD_PLANK';
    } else {
      if (this.phase==='READY' && closed) this.phase='FEET_TOGETHER';
      else if (this.phase==='FEET_TOGETHER' && open) this.phase='FEET_APART';
      else if (this.phase==='FEET_APART' && closed){
        repConf=clamp(70 + (q.exerciseConfidence>60?10:0),0,100);
        if(repConf>58 && q.exerciseConfidence>38 && this.shouldCountRep(ts,repConf,58)){ repInc=true; this.lastRepAt=ts; this.phase='FEET_TOGETHER'; }
        else this.phase='FEET_TOGETHER';
      }
      if (this.phase==='READY' && closed) this.phase='FEET_TOGETHER';
    }
    const form = plankOk?88:55;
    return { phase:this.phase, enginePhase: this.phase==='FEET_APART'?'bottom':'down' as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality:q, cues: plankOk?[]:['coreTight'], primaryAngle: spread*100, secondaryAngles:{ line, spread }, velocity:0, direction:'hold' as any };
  }
}
