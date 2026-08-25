/**
 * Operator40 — ExerciseRegistry (spec §4)
 * Mission supplies exerciseId → registry loads correct Analyzer.
 * Keeps backward compat with old definitions: if analyzer missing → trackingSupported false.
 */
import { normalizeExerciseId } from '../../engine/exercises/definitions';
import type { ExerciseAnalyzer } from './ExerciseAnalyzer';

// Lazy imports for 8 priority + rest
import { PushupAnalyzer } from './analyzers/pushup';
import { SquatAnalyzer } from './analyzers/squat';
import { CrunchAnalyzer } from './analyzers/crunch';
import { PlankAnalyzer } from './analyzers/plank';
import { LegRaiseAnalyzer } from './analyzers/legRaise';
import { FlutterKickAnalyzer } from './analyzers/flutterKick';
import { DeadBugAnalyzer } from './analyzers/deadBug';
import { VUpAnalyzer } from './analyzers/vUp';

const REGISTRY: Record<string, new () => ExerciseAnalyzer> = {
  pushup: PushupAnalyzer,
  squat: SquatAnalyzer,
  crunch: CrunchAnalyzer,
  plank: PlankAnalyzer,
  legraise: LegRaiseAnalyzer,
  flutterkick: FlutterKickAnalyzer,
  deadbug: DeadBugAnalyzer,
  vup: VUpAnalyzer,
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
