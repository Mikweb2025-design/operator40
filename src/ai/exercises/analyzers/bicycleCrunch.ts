import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, clamp } from '../../pose/Geometry';
// tuned 2026-08-27: verified thresholds via fixtures replay — 14 remaining analyzers
export class BicycleCrunchAnalyzer extends ExerciseAnalyzer{
  readonly id='bicyclecrunch'; readonly requiredLandmarks=[11,12,23,24,25,26,13,14];
  private lastAlt: 'left'|'right'|null=null;
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const le=lm[LM.left_elbow], rk=lm[LM.right_knee], re=lm[LM.right_elbow], lk=lm[LM.left_knee];
    if (!le||!rk||!re||!lk) return { phase:this.phase, enginePhase:'ready' as any, repIncrement:false, repConfidence:0, formScore:70, poseQuality:q, cues:[], primaryAngle:0, secondaryAngles:{}, velocity:0, direction:'hold' as any };
    const d1=Math.hypot(le.x-rk.x, le.y-rk.y);
    const d2=Math.hypot(re.x-lk.x, re.y-lk.y);
    const best=Math.min(d1,d2);
    const contact=best<0.18; const apart=best>0.26;
    let repInc=false, repConf=0;
    if (this.phase==='READY' && apart) this.phase='EXTENDED';
    else if (this.phase==='EXTENDED' && contact){
      const nowAlt = d1<d2 ? 'left':'right';
      if (this.lastAlt && this.lastAlt!==nowAlt){
        repConf=clamp(70 + (q.exerciseConfidence>60?10:0),0,100);
        if(repConf>58 && q.exerciseConfidence>38 && this.shouldCountRep(ts,repConf,58)){ repInc=true; this.lastRepAt=ts; }
      }
      this.lastAlt=nowAlt as any;
      this.phase='CONTRACTED';
    } else if (this.phase==='CONTRACTED' && apart){
      this.phase='EXTENDED';
    }
    if (repInc){ this.phase='READY'; this.lastTransitionAt=ts; }
    return { phase:this.phase, enginePhase: this.phase==='CONTRACTED'?'bottom':'down' as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(87,0,100), poseQuality:q, cues:[], primaryAngle: best, secondaryAngles:{ d1, d2 }, velocity:0, direction:'hold' as any };
  }
}
