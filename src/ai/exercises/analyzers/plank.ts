import { ExerciseAnalyzer } from '../ExerciseAnalyzer';
import type { PoseLandmarks } from '../../../engine/types';
import type { PoseQualityResult } from '../../pose/PoseQuality';
import { LM, angleFromLandmarks, clamp } from '../../pose/Geometry';
function trunk(lm: PoseLandmarks){ const al=angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_ankle); const ar=angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_ankle); return (al+ar)/2; }
export class PlankAnalyzer extends ExerciseAnalyzer{
  readonly id='plank'; readonly requiredLandmarks=[11,12,23,24,25,26,27,28];
  private goodSince: number|null=null; private graceMs=600;
  analyze(lm: PoseLandmarks, ts:number, _dt:number, q:PoseQualityResult){
    const line=trunk(lm);
    const hip=(():number=>{ const al=angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee); const ar=angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee); return (al+ar)/2; })();
    const valid = line>155 && hip>150 && q.exerciseConfidence>50;
    if (valid){ if (this.goodSince==null) this.goodSince=ts; this.phase='HOLD_GOOD'; }
    else {
      // grace period before marking bad
      if (this.goodSince!=null && ts - this.goodSince < this.graceMs){ this.phase='HOLD_GOOD'; }
      else { this.phase='HOLD_BAD'; this.goodSince=null; }
    }
    const form = line<155?55 : line<165?83 : 95 - (hip<150?10:0);
    const cues:string[] = line<155?['hipsUp'] : line<165?['coreTight'] : [];
    // Plank is time-based, never rep
    return { phase:this.phase, enginePhase:'ready' as any, repIncrement:false, repConfidence:0, formScore: clamp(form,0,100), poseQuality:q, cues, primaryAngle: line, secondaryAngles:{ hip, line }, velocity:0, direction:'hold' as any };
  }
}
