import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, clamp, torsoLength } from '../../pose/Geometry';
// tuned 2026-08-27: verified thresholds via fixtures replay — 14 remaining analyzers
export class RussianTwistAnalyzer extends ExerciseAnalyzer{
  readonly id='russiantwist'; readonly requiredLandmarks=[11,12,23,24,15,16,25,26];
  private lastSide: 'left'|'right'|null=null;
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const feats = this.pushTemporalFrame(lm, ts, ((arguments as any)[2] ?? 16) || 16);
    const _temporal = this.getTemporalClassifier('russiantwist');
    const lw=lm[LM.left_wrist], rw=lm[LM.right_wrist];
    if (!lw||!rw) return { phase:this.phase, enginePhase:'ready' as any, repIncrement:false, repConfidence:0, formScore:70, poseQuality:q, cues:[], primaryAngle:0, secondaryAngles:{ temporalROM: Math.round(this.temporalBuffer.getROM('kneeRaw')), }, velocity:0, direction:'hold' as any };
    const midHip={ x:(lm[LM.left_hip].x + lm[LM.right_hip].x)/2, y:(lm[LM.left_hip].y+lm[LM.right_hip].y)/2 } as any;
    const tl=torsoLength(lm); const n = tl>1e-6 ? 1/tl : 1;
    const left=Math.abs(lw.x - midHip.x)*n, right=Math.abs(rw.x - midHip.x)*n;
    const maxL=Math.max(left,right);
    // v2.14.2: tuned via russiantwist.json + slow/shallow — centered 0.52→0.55, twisted 0.72→0.66 (over-40 + phone FOV)
    const centered=maxL<0.55; const twisted=maxL>0.66;
    let repInc=false, repConf=0;
    if (this.phase==='READY' && centered) this.phase='CENTER';
    else if (this.phase==='CENTER' && twisted){
      const side = left>right ? 'left':'right';
      // require alternate sides; first twist after READY primes lastSide without counting
      if (this.lastSide && this.lastSide!==side){
        repConf=clamp(68 + (q.exerciseConfidence>55?6:0),0,100);
        if(repConf>55 && q.exerciseConfidence>36 && this.shouldCountRep(ts,repConf,55)){ repInc=true; this.lastRepAt=ts; }
      }
      this.lastSide=side as any;
      this.phase=side==='left'?'LEFT':'RIGHT';
    } else if ((this.phase==='LEFT'||this.phase==='RIGHT') && centered){
      this.phase='CENTER';
    }
    if (repInc){ this.phase='CENTER'; this.lastTransitionAt=ts; }
    return { phase:this.phase, enginePhase: (this.phase==='LEFT'||this.phase==='RIGHT')?'bottom':'down' as any, repIncrement: repInc, repConfidence: repConf, formScore:86, poseQuality:q, cues:[], primaryAngle:maxL*100, secondaryAngles:{ temporalROM: Math.round(this.temporalBuffer.getROM('kneeRaw')),  left, right }, velocity:0, direction:'hold' as any };
  }
  reset(){ super.reset(); }
}
