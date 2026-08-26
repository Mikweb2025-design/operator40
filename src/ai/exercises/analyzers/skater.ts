import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, clamp, torsoLength } from '../../pose/Geometry';
export class SkaterAnalyzer extends ExerciseAnalyzer{
  readonly id='skater'; readonly requiredLandmarks=[23,24,25,26,27,28];
  private lastX: number|null=null; private velX=0;
  analyze(lm: PoseLandmarks, ts:number, dtMs:number, q:PoseQualityResult){
    const cx=((lm[LM.left_hip]?.x??0.5)+(lm[LM.right_hip]?.x??0.5))/2;
    const dt=dtMs||16; const rawV = this.lastX===null?0:(cx - this.lastX)/(dt/1000); this.velX=this.velX*0.7 + rawV*0.3;
    const rawSpread=Math.hypot((lm[LM.left_ankle]?.x??0.4)-(lm[LM.right_ankle]?.x??0.6), 0);
    const tl=torsoLength(lm); const spread= tl>1e-6 ? rawSpread / tl : rawSpread;
    const knee=this.bilateralJointAngle('knee', lm, [LM.left_hip,LM.left_knee,LM.left_ankle], [LM.right_hip,LM.right_knee,LM.right_ankle]);
    const bent=knee<128; const wide=spread>0.58;
    let repInc=false, repConf=0;
    // Detect lateral hop: bent + wide -> landed side (normalized)
    if (this.phase==='READY' && bent && wide){
      this.phase='LANDED';
      this.lastTransitionAt=ts;
    } else if (this.phase==='LANDED' && spread<0.42){
      // returned to center -> need next landing on opposite side to count
      (this as any)._hops = ((this as any)._hops||0)+1;
      if ((this as any)._hops %2===0){
        repConf=clamp(70 + (Math.abs(this.velX)>0.3?10:0),0,100);
        if(repConf>58 && q.exerciseConfidence>38 && this.shouldCountRep(ts,repConf,58)){ repInc=true; this.lastRepAt=ts; }
      }
      this.phase='CENTER';
    } else if (this.phase==='CENTER' && bent && wide && this.canTransition(ts, 120)){
      this.phase='LANDED';
    }
    this.lastX=cx;
    return { phase:this.phase, enginePhase: this.phase==='LANDED'?'bottom':'ready' as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(88,0,100), poseQuality:q, cues:[], primaryAngle: spread*100, secondaryAngles:{ knee, spread, velX: this.velX }, velocity:this.velX*100, direction: Math.abs(this.velX)<0.2?'hold': this.velX>0?'up':'down' as any };
  }
}
