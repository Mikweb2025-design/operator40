import { ExerciseAnalyzer, AnalyzerResult } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';

function elbow(lm: PoseLandmarks){
  const al = angleFromLandmarks(lm, LM.left_shoulder, LM.left_elbow, LM.left_wrist);
  const ar = angleFromLandmarks(lm, LM.right_shoulder, LM.right_elbow, LM.right_wrist);
  const vl = Math.min(lm[LM.left_shoulder]?.visibility??0, lm[LM.left_elbow]?.visibility??0, lm[LM.left_wrist]?.visibility??0);
  const vr = Math.min(lm[LM.right_shoulder]?.visibility??0, lm[LM.right_elbow]?.visibility??0, lm[LM.right_wrist]?.visibility??0);
  if (vl > vr+0.12) return al; if (vr > vl+0.12) return ar; return (al+ar)/2;
}
function bodyLine(lm: PoseLandmarks){
  const al = angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_ankle);
  const ar = angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_ankle);
  return (al+ar)/2;
}

export class PushupAnalyzer extends ExerciseAnalyzer {
  readonly id = 'pushup';
  readonly requiredLandmarks = [11,12,13,14,15,16,23,24,27,28];
  private velFilt=0; private lastAngle=180; private lastT=0;
  analyze(lm: PoseLandmarks, ts: number, dtMs: number, q: PoseQualityResult): AnalyzerResult {
    const ang = elbow(lm);
    const dt = dtMs || 16;
    const rawV = (ang - this.lastAngle)/(dt/1000);
    this.velFilt = this.velFilt*0.75 + rawV*0.25;
    const dir = Math.abs(this.velFilt)<18?'hold': this.velFilt<0?'down':'up';
    const line = bodyLine(lm);
    this.trough = Math.min(this.trough, ang);
    this.peak = Math.max(this.peak, ang);

    let next = this.phase;
    // Phases: READY -> DESCENDING -> BOTTOM -> ASCENDING -> TOP -> rep
    if (this.phase==='READY' && ang < 115) next='DESCENDING';
    else if (this.phase==='DESCENDING' && ang < 102) next='BOTTOM';
    else if (this.phase==='BOTTOM' && ang > 128) next='ASCENDING';
    else if (this.phase==='ASCENDING' && ang > 145) next='TOP';

    let repInc=false, repConf=0;
    if (next==='TOP' && this.phase==='ASCENDING'){
      const rom = this.peak - this.trough;
      const depthOk = this.trough < 102;
      const extOk = ang > 145;
      const velScore = clamp(100 - Math.abs(this.velFilt)*0.06,0,100);
      const alignScore = line>152? 95 : line>164? 80 : 40;
      repConf = clamp(depthOk && extOk ? velScore*0.3 + alignScore*0.4 + (rom>35?30:10) : 25,0,100);
      if (depthOk && extOk && repConf>78 && q.exerciseConfidence>50){
        if (this.shouldCountRep(ts, repConf, 78)){ repInc=true; this.lastRepAt=ts; this.trough=ang; this.peak=ang; next='READY'; }
      } else if (!depthOk || !extOk){ next='READY'; }
    }
    if (repInc){ this.phase='READY'; this.lastTransitionAt=ts; }
    else if (next!==this.phase){ this.phase=next; this.lastTransitionAt=ts; }

    // form 0-100
    let form=90, cues:string[]=[];
    if (line < 152){ form-=20; cues.push('coreTight'); }
    else if (line < 164){ form-=8; cues.push('coreTight'); }
    if (this.phase==='DESCENDING' && ang>102 && ang<132 && dir==='down') cues.push('scendiAncora');
    if (this.phase==='ASCENDING' && ang>128 && ang<147 && dir==='up') cues.push('distendiBraccia');
    if (Math.abs(this.velFilt)>520){ form-=8; cues.push('control'); }

    this.lastAngle=ang; this.lastT=ts;
    const enginePhase = this.phase==='BOTTOM'?'bottom': this.phase==='DESCENDING'?'down': this.phase==='ASCENDING'?'up': this.phase==='TOP'?'up':'ready';
    return { phase:this.phase, enginePhase: enginePhase as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality: q, cues, primaryAngle: ang, secondaryAngles:{ line }, velocity:this.velFilt, direction: dir as any };
  }
}
