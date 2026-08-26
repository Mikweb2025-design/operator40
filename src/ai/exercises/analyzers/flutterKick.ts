import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
export class FlutterKickAnalyzer extends ExerciseAnalyzer{
  readonly id='flutterkick'; readonly requiredLandmarks=[11,12,23,24,25,26,27,28];
  private cycle: 'leftUp'|'rightUp'|'center'='center'; private lastSwitch=0;
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const lHip=angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
    const rHip=angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
    const asym=Math.abs(lHip - rHip); const mean=(lHip+rHip)/2;
    // Detect alternating: one leg flexed ~140 other extended 175
    let repInc=false, repConf=0;
    if (this.phase==='READY' && asym>12 && mean<170){
      this.phase='LEFT_UP'; this.lastTransitionAt=ts;
    } else if (this.phase==='LEFT_UP' && asym>12 && mean<170 && ((lHip<rHip && this.cycle!=='leftUp') || (rHip<lHip && this.cycle!=='rightUp'))){
      // alternate
      const nowCycle = lHip<rHip ? 'leftUp':'rightUp';
      if (nowCycle!==this.cycle && ts - this.lastSwitch > 250){
        this.cycle=nowCycle; this.lastSwitch=ts;
        // count one rep every 2 alternations (full cycle left+right)
        // Use phase toggle: count when returns to leftUp after rightUp
        // Simplified: count on every second switch
        // We'll count using a counter
        (this as any)._alt = ((this as any)._alt||0)+1;
        if ((this as any)._alt %2===0){
          repConf= clamp(70 + (asym>16?10:0) + (q.exerciseConfidence>60?10:0),0,100);
          if (repConf>60 && q.exerciseConfidence>38 && this.shouldCountRep(ts,repConf,60)){ repInc=true; this.lastRepAt=ts; }
        }
      }
    } else if (asym<8){
      this.phase='READY';
    }
    // form: hip stability
    let form=88; const cues:string[]=[];
    if ((lHip+rHip)/2 > 185){ form-=10; cues.push('coreTight'); }
    return { phase:this.phase, enginePhase: this.phase==='LEFT_UP'?'down':'ready' as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle: mean, secondaryAngles:{ lHip, rHip, asym }, velocity:0, direction:'hold' as any };
  }
}
