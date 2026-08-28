import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, clamp, torsoLength } from '../../pose/Geometry';
// tuned 2026-08-27: verified thresholds via fixtures replay — 14 remaining analyzers
export class HeelTapAnalyzer extends ExerciseAnalyzer{
  readonly id='heeltap'; readonly requiredLandmarks=[11,12,23,24,25,26,15,16,29,30];
  private lastSide: 'left'|'right'|null=null;
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const feats = this.pushTemporalFrame(lm, ts, ((arguments as any)[2] ?? 16) || 16);
    const _temporal = this.getTemporalClassifier('heeltap');
    const lw=lm[LM.left_wrist], lh=lm[LM.left_heel], rw=lm[LM.right_wrist], rh=lm[LM.right_heel];
    if (!lw||!lh||!rw||!rh) return { phase:this.phase, enginePhase:'ready' as any, repIncrement:false, repConfidence:0, formScore:70, poseQuality:q, cues:[], primaryAngle:0, secondaryAngles:{ temporalROM: Math.round(this.temporalBuffer.getROM('kneeRaw')), }, velocity:0, direction:'hold' as any };
    const tl=torsoLength(lm); const n = tl>1e-6 ? 1/tl : 1;
    const dL=Math.hypot(lw.x-lh.x, lw.y-lh.y)*n;
    const dR=Math.hypot(rw.x-rh.x, rw.y-rh.y)*n;
    const best=Math.min(dL,dR);
    const tap=best<0.42; const centered=best>0.62;
    let repInc=false, repConf=0;
    if (this.phase==='READY' && centered) this.phase='CENTER';
    else if (this.phase==='CENTER' && tap){
      const side = dL<dR ? 'left':'right';
      if (this.lastSide && this.lastSide!==side){
        repConf=clamp(70 + (q.exerciseConfidence>60?10:0),0,100);
        if(repConf>58 && q.exerciseConfidence>38 && this.shouldCountRep(ts,repConf,58)){ repInc=true; this.lastRepAt=ts; }
      }
      this.lastSide=side as any;
      this.phase=side==='left'?'LEFT':'RIGHT';
    } else if ((this.phase==='LEFT' || this.phase==='RIGHT') && centered){
      this.phase='CENTER';
    }
    if (repInc){ this.phase='CENTER'; this.lastTransitionAt=ts; }
    return { phase:this.phase, enginePhase: (this.phase==='LEFT'||this.phase==='RIGHT')?'bottom':'down' as any, repIncrement: repInc, repConfidence: repConf, formScore:88, poseQuality:q, cues:[], primaryAngle:best, secondaryAngles:{ temporalROM: Math.round(this.temporalBuffer.getROM('kneeRaw')),  dL,dR }, velocity:0, direction:'hold' as any };
  }
  reset(){ super.reset(); }
}
