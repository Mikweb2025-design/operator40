import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
export class GinocchiaAlteAnalyzer extends ExerciseAnalyzer{
  readonly id='ginocchiaalte'; readonly requiredLandmarks=[11,12,23,24,25,26];
  private lastSwitch=0; private cycle: 'left'|'right'|null=null; private alt=0;
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const l=angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
    const r=angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
    const driving=Math.min(l,r);
    const trunk=(angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_ankle)+angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_ankle))/2;
    const nowCycle = l<r ? 'left':'right';
    const kneeUp = driving < 85;
    let repInc=false, repConf=0;
    if (kneeUp && nowCycle!==this.cycle && ts - this.lastSwitch > 180){
      if (this.cycle){
        this.alt++;
        if (this.alt %2===0){
          repConf=clamp(70 + (trunk>152?10:0),0,100);
          if(repConf>58 && q.exerciseConfidence>38 && this.shouldCountRep(ts,repConf,58)){ repInc=true; this.lastRepAt=ts; }
        }
      }
      this.cycle=nowCycle as any; this.lastSwitch=ts;
      this.phase = nowCycle==='left'?'LEFT_UP':'RIGHT_UP';
    } else if (!kneeUp){
      this.phase='READY';
    }
    let form=87; if(trunk<152) form-=10;
    return { phase:this.phase, enginePhase: kneeUp?'down':'ready' as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality:q, cues: form<72?['kneesToChest']:[], primaryAngle: driving, secondaryAngles:{ l, r, trunk }, velocity:0, direction:'hold' as any };
  }
}
