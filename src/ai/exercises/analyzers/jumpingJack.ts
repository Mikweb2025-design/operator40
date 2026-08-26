import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, clamp, dist2D, torsoLength } from '../../pose/Geometry';
export class JumpingJackAnalyzer extends ExerciseAnalyzer{
  readonly id='jumpingjack'; readonly requiredLandmarks=[11,12,13,14,15,16,23,24,25,26,27,28];
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const rawSpread = (()=>{ const a=lm[LM.left_ankle], b=lm[LM.right_ankle]; if(!a||!b) return 0; return Math.hypot(a.x-b.x, a.y-b.y); })();
    const tl=torsoLength(lm); const legSpread = tl>1e-6 ? rawSpread / tl : rawSpread;
    const shoulderAbduction = this.bilateralJointAngle('shoulderAbduction', lm, [LM.left_hip,LM.left_shoulder,LM.left_elbow], [LM.right_hip,LM.right_shoulder,LM.right_elbow]);
    const combined = shoulderAbduction*0.6 + legSpread*90;
    let next=this.phase; let repInc=false, repConf=0;
    // CLOSED -> OPEN -> CLOSED — permissivo: open 110 (era 125), close 60 (era 55), arms 110 (era 120), legs 0.22 (era 0.28)
    if (this.phase==='READY' && combined < 60) next='CLOSED';
    else if ((this.phase==='READY' || this.phase==='CLOSED') && combined > 110) next='OPEN';
    else if (this.phase==='OPEN' && combined < 60) next='CLOSED';
    if (next==='CLOSED' && this.phase==='OPEN'){
      const armsOk = shoulderAbduction>110; const legsOk = legSpread>0.55;
      const bothOk = armsOk && legsOk;
      const partialOk = armsOk || legsOk;
      if (bothOk){
        repConf=clamp(72 + (q.exerciseConfidence>60?10:0) + (legSpread>0.75?4:0),0,100);
      } else if (partialOk){
        repConf=clamp(58 + (q.exerciseConfidence>60?6:0),0,100);
      } else { repConf=clamp(18,0,100); }
      if (partialOk && repConf>58 && q.exerciseConfidence>38 && this.shouldCountRep(ts,repConf,58)){ repInc=true; this.lastRepAt=ts; next='READY'; }
    }
    if (repInc){ this.phase='READY'; this.lastTransitionAt=ts; } else if (next!==this.phase){ this.phase=next; this.lastTransitionAt=ts; }
    // init
    if (this.phase==='READY' && combined<60) this.phase='CLOSED';
    const form=90; const cues:string[]=[];
    return { phase:this.phase, enginePhase: this.phase==='OPEN'?'up':'down' as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle: combined, secondaryAngles:{ legSpread, shoulderAbduction }, velocity:0, direction:'hold' as any };
  }
}
