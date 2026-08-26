import { ExerciseAnalyzer, AnalyzerResult } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, clamp } from '../../pose/Geometry';

export class PushupAnalyzer extends ExerciseAnalyzer {
  readonly id = 'pushup';
  readonly requiredLandmarks = [11,12,13,14,15,16,23,24,27,28];
  protected minRepIntervalMs = 320;
  protected minPhaseMs = 65;
  private velFilt=0; private lastAngle=180; private lastT=0;
  analyze(lm: PoseLandmarks, ts: number, dtMs: number, q: PoseQualityResult): AnalyzerResult {
    const ang = this.bilateralJointAngle('elbow', lm, [LM.left_shoulder,LM.left_elbow,LM.left_wrist], [LM.right_shoulder,LM.right_elbow,LM.right_wrist]);
    const dt = dtMs || 16;
    const rawV = (ang - this.lastAngle)/(dt/1000);
    this.velFilt = this.velFilt*0.70 + rawV*0.30;
    const dir = Math.abs(this.velFilt)<18?'hold': this.velFilt<0?'down':'up';
    const line = this.bilateralJointAngle('bodyLine', lm, [LM.left_shoulder,LM.left_hip,LM.left_ankle], [LM.right_shoulder,LM.right_hip,LM.right_ankle]);
    this.trough = Math.min(this.trough, ang);
    this.peak = Math.max(this.peak, ang);

    let next = this.phase;
    // Phases: READY -> DESCENDING -> BOTTOM -> ASCENDING -> TOP -> rep (over-40 permissivo)
    if (this.phase==='READY' && ang < 120) next='DESCENDING';
    else if (this.phase==='DESCENDING' && ang < 110) next='BOTTOM';
    else if (this.phase==='BOTTOM' && ang > 125) next='ASCENDING';
    else if (this.phase==='ASCENDING' && ang > 142) next='TOP';

    let repInc=false, repConf=0;
    if (next==='TOP' && (this.phase==='ASCENDING' || this.phase==='BOTTOM')){
      const rom = this.peak - this.trough;
      const depthOk = this.trough < 110;
      const extOk = ang > 142;
      const velScore = clamp(100 - Math.abs(this.velFilt)*0.06,0,100);
      const alignScore = line>155? 95 : line>145? 78 : 42;
      const romScore = rom>28?28: rom>18?18:10;
      const depthBonus = this.trough<92?8: this.trough<102?4:0;
      if (depthOk && extOk){
        repConf = clamp(velScore*0.32 + alignScore*0.35 + romScore + depthBonus,0,100);
      } else { repConf = clamp(velScore*0.18+8,0,100); }
      if (depthOk && extOk && repConf>62 && q.exerciseConfidence>38){
        if (this.shouldCountRep(ts, repConf, 62)){ repInc=true; this.lastRepAt=ts; this.trough=ang; this.peak=ang; next='READY'; }
      }
    }
    if (repInc){ this.phase='READY'; this.lastTransitionAt=ts; }
    else if (next!==this.phase){ this.phase=next; this.lastTransitionAt=ts; }

    // form 0-100
    let form=90, cues:string[]=[];
    if (line < 148){ form-=18; cues.push('coreTight'); }
    else if (line < 158){ form-=7; cues.push('coreTight'); }
    if (this.phase==='DESCENDING' && ang>108 && ang<135 && dir==='down') cues.push('scendiAncora');
    if (this.phase==='ASCENDING' && ang>125 && ang<144 && dir==='up') cues.push('distendiBraccia');
    if (Math.abs(this.velFilt)>560){ form-=7; cues.push('control'); }

    this.lastAngle=ang; this.lastT=ts;
    const enginePhase = this.phase==='BOTTOM'?'bottom': this.phase==='DESCENDING'?'down': this.phase==='ASCENDING'?'up': this.phase==='TOP'?'up':'ready';
    return { phase:this.phase, enginePhase: enginePhase as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality: q, cues, primaryAngle: ang, secondaryAngles:{ line }, velocity:this.velFilt, direction: dir as any };
  }
}
