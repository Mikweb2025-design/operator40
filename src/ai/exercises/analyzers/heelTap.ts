import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, clamp } from '../../pose/Geometry';
export class HeelTapAnalyzer extends ExerciseAnalyzer{
  readonly id='heeltap'; readonly requiredLandmarks=[11,12,23,24,25,26,15,16,29,30];
  private lastSide: 'left'|'right'|null=null;
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const lw=lm[LM.left_wrist], lh=lm[LM.left_heel], rw=lm[LM.right_wrist], rh=lm[LM.right_heel];
    if (!lw||!lh||!rw||!rh) return { phase:this.phase, enginePhase:'ready' as any, repIncrement:false, repConfidence:0, formScore:70, poseQuality:q, cues:[], primaryAngle:0, secondaryAngles:{}, velocity:0, direction:'hold' as any };
    const dL=Math.hypot(lw.x-lh.x, lw.y-lh.y);
    const dR=Math.hypot(rw.x-rh.x, rw.y-rh.y);
    const best=Math.min(dL,dR);
    const tap=best<0.14; const centered=best>0.28;
    let repInc=false, repConf=0;
    if (this.phase==='READY' && centered) this.phase='CENTER';
    else if (this.phase==='CENTER' && tap){
      const side = dL<dR ? 'left':'right';
      if (this.lastSide && this.lastSide!==side){
        repConf=clamp(70 + (q.exerciseConfidence>60?10:0),0,100);
        if(repConf>65 && q.exerciseConfidence>45 && this.shouldCountRep(ts,repConf,65)){ repInc=true; this.lastRepAt=ts; }
      }
      this.lastSide=side as any;
      this.phase=side==='left'?'LEFT':'RIGHT';
    } else if ((this.phase==='LEFT' || this.phase==='RIGHT') && centered){
      this.phase='CENTER';
    }
    if (repInc){ this.phase='CENTER'; this.lastTransitionAt=ts; }
    return { phase:this.phase, enginePhase: (this.phase==='LEFT'||this.phase==='RIGHT')?'bottom':'down' as any, repIncrement: repInc, repConfidence: repConf, formScore:88, poseQuality:q, cues:[], primaryAngle:best, secondaryAngles:{ dL,dR }, velocity:0, direction:'hold' as any };
  }
}
