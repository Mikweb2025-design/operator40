import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
export class SkaterAnalyzer extends ExerciseAnalyzer{
  readonly id='skater'; readonly requiredLandmarks=[23,24,25,26,27,28];
  private lastX: number|null=null; private velX=0;
  analyze(lm: PoseLandmarks, ts:number, dtMs:number, q:PoseQualityResult){
    const cx=((lm[LM.left_hip]?.x??0.5)+(lm[LM.right_hip]?.x??0.5))/2;
    const dt=dtMs||16; const rawV = this.lastX===null?0:(cx - this.lastX)/(dt/1000); this.velX=this.velX*0.7 + rawV*0.3;
    const spread=Math.hypot((lm[LM.left_ankle]?.x??0.4)-(lm[LM.right_ankle]?.x??0.6), 0);
    const knee=(angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle)+angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle))/2;
    const bent=knee<125; const wide=spread>0.28;
    let repInc=false, repConf=0;
    // Detect lateral hop: bent + wide -> landed side
    if (this.phase==='READY' && bent && wide){
      this.phase='LANDED';
      this.lastTransitionAt=ts;
    } else if (this.phase==='LANDED' && spread<0.14){
      // returned to center -> need next landing on opposite side to count
      (this as any)._hops = ((this as any)._hops||0)+1;
      if ((this as any)._hops %2===0){
        repConf=clamp(70 + (Math.abs(this.velX)>0.3?10:0),0,100);
        if(repConf>65 && q.exerciseConfidence>45 && this.shouldCountRep(ts,repConf,65)){ repInc=true; this.lastRepAt=ts; }
      }
      this.phase='CENTER';
    } else if (this.phase==='CENTER' && bent && wide){
      this.phase='LANDED';
    }
    this.lastX=cx;
    return { phase:this.phase, enginePhase: this.phase==='LANDED'?'bottom':'ready' as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(88,0,100), poseQuality:q, cues:[], primaryAngle: spread*100, secondaryAngles:{ knee, spread, velX: this.velX }, velocity:this.velX*100, direction: Math.abs(this.velX)<0.2?'hold': this.velX>0?'up':'down' as any };
  }
}
