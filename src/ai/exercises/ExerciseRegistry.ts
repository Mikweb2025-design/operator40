/**
 * Operator40 — ExerciseRegistry (spec §4)
 * Mission supplies exerciseId → registry loads correct Analyzer.
 * Keeps backward compat with old definitions: if analyzer missing → trackingSupported false.
 */
import { normalizeExerciseId } from '../../engine/exercises/definitions';
import type { ExerciseAnalyzer } from './ExerciseAnalyzer';

// Imports for all 22 exercises (spec §10)
import { PushupAnalyzer } from './analyzers/pushup';
import { SquatAnalyzer } from './analyzers/squat';
import { CrunchAnalyzer } from './analyzers/crunch';
import { PlankAnalyzer } from './analyzers/plank';
import { LegRaiseAnalyzer } from './analyzers/legRaise';
import { FlutterKickAnalyzer } from './analyzers/flutterKick';
import { DeadBugAnalyzer } from './analyzers/deadBug';
import { VUpAnalyzer } from './analyzers/vUp';
import { MountainClimberAnalyzer } from './analyzers/mountainClimber';
import { JumpingJackAnalyzer } from './analyzers/jumpingJack';
import { BicycleCrunchAnalyzer } from './analyzers/bicycleCrunch';
import { HeelTapAnalyzer } from './analyzers/heelTap';
import { BurpeeAnalyzer } from './analyzers/burpee';
import { AffondoAnalyzer } from './analyzers/affondo';
import { SkaterAnalyzer } from './analyzers/skater';
import { GinocchiaAlteAnalyzer } from './analyzers/ginocchiaAlte';
import { SupermanAnalyzer } from './analyzers/superman';
import { PonteAnalyzer } from './analyzers/ponte';
import { RussianTwistAnalyzer } from './analyzers/russianTwist';
import { WallsitAnalyzer } from './analyzers/wallsit';
import { SideplankAnalyzer } from './analyzers/sideplank';
import { PlankJackAnalyzer } from './analyzers/plankJack';

const REGISTRY: Record<string, new () => ExerciseAnalyzer> = {
  pushup: PushupAnalyzer,
  squat: SquatAnalyzer,
  crunch: CrunchAnalyzer,
  plank: PlankAnalyzer,
  legraise: LegRaiseAnalyzer,
  flutterkick: FlutterKickAnalyzer,
  deadbug: DeadBugAnalyzer,
  vup: VUpAnalyzer,
  mountainclimber: MountainClimberAnalyzer,
  jumpingjack: JumpingJackAnalyzer,
  bicyclecrunch: BicycleCrunchAnalyzer,
  heeltap: HeelTapAnalyzer,
  burpee: BurpeeAnalyzer,
  affondo: AffondoAnalyzer,
  skater: SkaterAnalyzer,
  ginocchiaalte: GinocchiaAlteAnalyzer,
  superman: SupermanAnalyzer,
  ponte: PonteAnalyzer,
  russiantwist: RussianTwistAnalyzer,
  wallsit: WallsitAnalyzer,
  sideplank: SideplankAnalyzer,
  plankjack: PlankJackAnalyzer,
};

export function getAnalyzer(exerciseId: string): ExerciseAnalyzer | null {
  const nid = normalizeExerciseId(exerciseId);
  const Cls = REGISTRY[nid];
  if (!Cls) return null;
  return new Cls();
}

export function isTrackingSupported(exerciseId: string): boolean {
  return getAnalyzer(exerciseId) !== null;
}

export function listSupported(): string[] { return Object.keys(REGISTRY); }
