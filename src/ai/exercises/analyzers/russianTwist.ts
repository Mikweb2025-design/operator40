import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, clamp } from '../../pose/Geometry';
export class RussianTwistAnalyzer extends ExerciseAnalyzer{
  readonly id='russiantwist'; readonly requiredLandmarks=[11,12,23,24,15,16,25,26];
  private lastSide: 'left'|'right'|null=null;
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const lw=lm[LM.left_wrist], rw=lm[LM.right_wrist];
    if (!lw||!rw) return { phase:this.phase, enginePhase:'ready' as any, repIncrement:false, repConfidence:0, formScore:70, poseQuality:q, cues:[], primaryAngle:0, secondaryAngles:{}, velocity:0, direction:'hold' as any };
    const midHip={ x:(lm[LM.left_hip].x + lm[LM.right_hip].x)/2, y:(lm[LM.left_hip].y+lm[LM.right_hip].y)/2 } as any;
    const left=Math.abs(lw.x - midHip.x), right=Math.abs(rw.x - midHip.x);
    const maxL=Math.max(left,right);
    const centered=maxL<0.20; const twisted=maxL>0.30;
    let repInc=false, repConf=0;
    if (this.phase==='READY' && centered) this.phase='CENTER';
    else if (this.phase==='CENTER' && twisted){
      const side = left>right ? 'left':'right';
      if (this.lastSide && this.lastSide!==side){
        repConf=clamp(70,0,100);
        if(repConf>65 && q.exerciseConfidence>45 && this.shouldCountRep(ts,repConf,65)){ repInc=true; this.lastRepAt=ts; }
      }
      this.lastSide=side as any;
      this.phase=side==='left'?'LEFT':'RIGHT';
    } else if ((this.phase==='LEFT'||this.phase==='RIGHT') && centered){
      this.phase='CENTER';
    }
    if (repInc){ this.phase='CENTER'; this.lastTransitionAt=ts; }
    return { phase:this.phase, enginePhase: (this.phase==='LEFT'||this.phase==='RIGHT')?'bottom':'down' as any, repIncrement: repInc, repConfidence: repConf, formScore:86, poseQuality:q, cues:[], primaryAngle:maxL*100, secondaryAngles:{ left, right }, velocity:0, direction:'hold' as any };
  }
}
