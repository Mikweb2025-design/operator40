import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, clamp } from '../../pose/Geometry';
export class SquatAnalyzer extends ExerciseAnalyzer{
  // Ankles (27,28) intentionally NOT required: at home users often frame head-to-shin on a
  // phone (narrow selfie-camera FOV) and feet fall just outside the crop. The knee angle
  // still uses ankle coordinates when available; we just don't gate/pause on their visibility.
  readonly id='squat'; readonly requiredLandmarks=[11,12,23,24,25,26];
  protected minRepIntervalMs = 340;
  protected minPhaseMs = 70;
  private velFilt=0; private lastA=180;
  // hipY at rest depends entirely on camera distance (close phone framing → hips sit much
  // lower in the normalized 0..1 frame than the old fixed 0.55 assumption) — calibrated per
  // session from observed standing frames instead of a one-size-fits-all constant, so the
  // OR-helper below doesn't fire spuriously (phase flicker) just because someone stands close.
  private restingHipY: number | null = null;
  analyze(lm: PoseLandmarks, ts:number, dtMs:number, q:PoseQualityResult){
    const ang=this.bilateralJointAngle('knee', lm, [LM.left_hip,LM.left_knee,LM.left_ankle], [LM.right_hip,LM.right_knee,LM.right_ankle]);
    const tr=this.bilateralJointAngle('trunk', lm, [LM.left_shoulder,LM.left_hip,LM.left_ankle], [LM.right_shoulder,LM.right_hip,LM.right_ankle]);
    // hipY is framing-dependent (distance to camera). Use as helper only, not hard AND.
    const hipY=((lm[LM.left_hip]?.y??0.5)+(lm[LM.right_hip]?.y??0.5))/2;
    if (ang>160 && Math.abs(this.velFilt)<15){
      this.restingHipY = this.restingHipY==null ? hipY : this.restingHipY*0.92 + hipY*0.08;
    }
    const baseline = this.restingHipY ?? 0.55; // fallback before first calibration settles
    const hipYDelta = hipY - baseline; // >0 means hips lower than this session's standing baseline
    const dt=dtMs||16; const rawV=(ang-this.lastA)/(dt/1000); this.velFilt=this.velFilt*0.70+rawV*0.30;
    const dir=Math.abs(this.velFilt)<18?'hold':this.velFilt<0?'down':'up';
    this.trough=Math.min(this.trough,ang); this.peak=Math.max(this.peak,ang);
    let next=this.phase;
    // Over-40 permissive: count shallow squats with quality penalty, not drop.
    // READY->DESCENDING earlier (122°), BOTTOM 115°, ASCENDING needs only one of angle OR hipY (no AND deadlock)
    if (this.phase==='READY' && (ang<=122 || hipYDelta>0.05)) next='DESCENDING';
    else if (this.phase==='DESCENDING' && (ang<=113 || hipYDelta>0.09)) next='BOTTOM';
    // Direct shallow path: DESCENDING -> ASCENDING without visiting BOTTOM if user bounces shallow and goes up
    else if (this.phase==='DESCENDING' && ang>142 && hipYDelta<0.05 && this.trough<122 && this.canTransition(ts, 55)) next='ASCENDING';
    else if (this.phase==='BOTTOM' && (ang>140 || hipYDelta<0.09) && this.canTransition(ts, 70)) next='ASCENDING';
    else if (this.phase==='ASCENDING' && ang>146 && this.canTransition(ts, 55)) next='STANDING';

    let repInc=false, repConf=0;
    if (next==='STANDING' && (this.phase==='ASCENDING' || this.phase==='BOTTOM' || this.phase==='DESCENDING')){
      const rom=this.peak - this.trough;
      // Permissive depth: <122° (was 108) → shallow 115° already counts but with lower confidence
      const depthOk=this.trough<122;
      // Extension: >142° (was 148) → not requiring full lockout, over-40 friendly
      const extOk=ang>142;
      const velScore=clamp(100-Math.abs(this.velFilt)*0.06,0,100);
      // Trunk not blocking rep — only modulates repConf. 3 tiers: >155:40, >142:30, else 18
      const trunkScore = tr>155 ? 40 : tr>142 ? 30 : 18;
      const romScore = rom>28 ? 32 : rom>20 ? 22 : rom>14 ? 14 : 8;
      // Depth bonus: deepest (<95) gets extra, shallow (<122) still passes
      const depthBonus = this.trough<95 ? 10 : this.trough<108 ? 6 : 0;
      if (depthOk && extOk){
        repConf=clamp(velScore*0.32 + romScore + trunkScore + depthBonus, 0, 100);
      } else {
        repConf=clamp(velScore*0.18 + 8,0,100);
      }
      // Lower gate 62 (was 75) — prefer counting uncertain rep with lower conf over false negative
      if (depthOk && extOk && repConf>62 && q.exerciseConfidence>38){
        if (this.shouldCountRep(ts,repConf,62)){ repInc=true; this.lastRepAt=ts; }
      }
      // Always cycle back to READY once a full down-up attempt resolves, whether or not it
      // counted — STANDING has no other exit transition, so a single low-confidence attempt
      // (e.g. while still adjusting position) would otherwise lock tracking forever.
      this.trough=ang; this.peak=ang; next='READY';
    }
    if (repInc){ this.phase='READY'; this.lastTransitionAt=ts; } else if (next!==this.phase){ this.phase=next; this.lastTransitionAt=ts; }

    let form=92, cues:string[]=[];
    if (tr<142){ form-=14; cues.push('backStraight'); } else if (tr<155){ form-=6; cues.push('backStraight'); }
    if (this.phase==='DESCENDING' && ang>108 && ang<135 && dir==='down') cues.push('scendiAncora');
    if (this.phase==='ASCENDING' && ang>125 && ang<146 && dir==='up') cues.push('distendiGambe');
    if (Math.abs(this.velFilt)>480){ form-=8; cues.push('control'); }
    this.lastA=ang;
    const eng = this.phase==='BOTTOM'?'bottom': this.phase==='DESCENDING'?'down': this.phase==='ASCENDING'?'up': this.phase==='STANDING'?'up':'ready';
    return { phase:this.phase, enginePhase: eng as any, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle:ang, secondaryAngles:{ trunk: tr, hipY }, velocity:this.velFilt, direction: dir as any };
  }
}
