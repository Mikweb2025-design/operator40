import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
export class MountainClimberAnalyzer extends ExerciseAnalyzer{
  readonly id='mountainclimber'; readonly requiredLandmarks=[11,12,23,24,25,26,27,28];
  private lastSwitch=0; private cycle: 'left'|'right'|null=null; private alt=0;
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const lHip=angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
    const rHip=angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
    const driving=Math.min(lHip,rHip); // flexed knee-to-chest
    const trunk=this.bilateralJointAngle('trunk', lm, [LM.left_shoulder,LM.left_hip,LM.left_ankle], [LM.right_shoulder,LM.right_hip,LM.right_ankle]);
    let repInc=false, repConf=0;
    const leftForward = lHip < 78, rightForward = rHip < 78;
    const nowCycle = leftForward ? 'left' : rightForward ? 'right' : null;
    if (nowCycle && nowCycle!==this.cycle && ts - this.lastSwitch > 180){
      if (this.cycle){
        this.alt++;
        if (this.alt %2===0){
          repConf=clamp(65 + (trunk>155?15:0) + (q.exerciseConfidence>60?10:0),0,100);
          if (repConf>58 && q.exerciseConfidence>38 && this.shouldCountRep(ts,repConf,58)){ repInc=true; this.lastRepAt=ts; }
        }
      }
      this.cycle=nowCycle as any; this.lastSwitch=ts;
      this.phase = nowCycle==='left'?'LEFT_FORWARD':'RIGHT_FORWARD';
    }
    if (!nowCycle) this.phase='HOLD_PLANK';
    let form=88; const cues:string[]=[];
    if (trunk<152){ form-=13; cues.push('coreTight'); }
    return { phase:this.phase, enginePhase: repInc?'up':'down' as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle: driving, secondaryAngles:{ lHip, rHip, trunk }, velocity:0, direction:'hold' as any };
  }
}
