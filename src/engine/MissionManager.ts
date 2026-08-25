/**
 * Operator40 — MissionManager + ExerciseRecognizer + WorkoutSessionManager
 * Turns a PROGRAMS mission (e.g. "Complete 20 push-ups" / 6-exercise camp day) into
 * per-exercise AI sessions with automatic ExerciseDefinition lookup.
 *
 * Flow: START MISSION -> read program.exercises -> for each work phase:
 *   - normalize exerciseId (flessioni->pushup etc)
 *   - getDefinition() -> structured ExerciseDefinition (landmarks, thresholds, formRules)
 *   - init FitnessEngine with that definition + lang + targetReps/duration
 *   - reset rep counter, timer, state, quality; start in READY
 *
 * Architecture mirrors spec:
 *   Program (id, exercises[]) -> MissionManager.exercises -> ExerciseRecognizer -> ExerciseEngine (FitnessEngine)
 */
import { getDefinition, normalizeExerciseId } from './exercises/definitions';
import type { ExerciseDefinition, NormalizedExerciseId } from './types';
import { getReps, HOLD_EXERCISES } from '../data/programs.js';
import { EXERCISES } from '../data/exercises.js';

export interface MissionExercise {
  exerciseId: NormalizedExerciseId;
  originalId: string;
  definition: ExerciseDefinition | null; // null when trackingSupported===false
  trackingSupported: boolean;
  targetReps: number | null; // null for time-based (plank) or repMode off
  targetDurationMs: number | null; // for time-based
  isTimeBased: boolean;
  isHold: boolean;
  label: string;
}

export interface MissionPlan {
  programId: string;
  programName: string;
  rounds: number;
  exercises: MissionExercise[];
  totalWorkPhases: number;
}

export function buildMissionPlan(program: any, lang: string = 'it', levelKey: string = 'combattente', workSec: number = 40): MissionPlan | null {
  if (!program || !Array.isArray(program.exercises)) return null;
  const exercises: MissionExercise[] = program.exercises.map((rawId: string) => {
    const nid = normalizeExerciseId(rawId) as NormalizedExerciseId;
    const def = getDefinition(nid);
    // Prompt §36: do NOT fake tracking with generic fallback — return trackingSupported=false explicitly
    const trackingSupported = !!def && def.trackingSupported !== false;
    const definition = def ?? null;
    const hold = HOLD_EXERCISES.has(rawId) || !!definition?.isHold;
    const reps = !hold ? getReps(rawId, levelKey) : null;
    const isTimeBased = hold || reps == null;
    return {
      exerciseId: nid,
      originalId: rawId,
      definition,
      trackingSupported,
      targetReps: reps,
      targetDurationMs: isTimeBased ? workSec * 1000 : null,
      isTimeBased,
      isHold: hold,
      label: (EXERCISES as any)[rawId]?.name?.[lang] ?? nid,
    };
  });
  return {
    programId: program.id,
    programName: program.name?.[lang] ?? program.id,
    rounds: program.rounds ?? 1,
    exercises,
    totalWorkPhases: exercises.length * (program.rounds ?? 1),
  };
}

export function exerciseFromPhase(phase: any, lang: string = 'it', levelKey: string = 'combattente'): MissionExercise | null {
  if (!phase || !phase.exerciseId) return null;
  const rawId = phase.exerciseId;
  const nid = normalizeExerciseId(rawId) as NormalizedExerciseId;
  const def = getDefinition(nid) ?? null;
  const trackingSupported = !!def && def.trackingSupported !== false;
  const hold = HOLD_EXERCISES.has(rawId) || !!def?.isHold;
  const reps = phase.reps ?? (!hold ? getReps(rawId, levelKey) : null);
  return {
    exerciseId: nid,
    originalId: rawId,
    definition: def,
    trackingSupported,
    targetReps: reps,
    targetDurationMs: hold ? (phase.duration != null ? phase.duration * 1000 : 40 * 1000) : null,
    isTimeBased: hold || reps == null,
    isHold: hold,
    label: (EXERCISES as any)[rawId]?.name?.[lang] ?? nid,
  };
}

// Lightweight WorkoutSessionManager — tracks active exercise index, progress, completion
export class WorkoutSessionManager {
  private plan: MissionPlan;
  private currentExerciseIdx = 0; // 0..exercises.length-1 per round, but rounds flatten
  private repsCompleted = 0;
  private elapsedMs = 0;

  constructor(plan: MissionPlan) {
    this.plan = plan;
  }

  get currentExercise(): MissionExercise | null {
    return this.plan.exercises[this.currentExerciseIdx] ?? null;
  }
  get progress(): { current: number; total: number; pct: number } {
    const total = this.plan.totalWorkPhases;
    // current flat index = round * perRound + idx
    return { current: this.currentExerciseIdx + 1, total, pct: (this.currentExerciseIdx + 1) / total };
  }
  advance(): boolean {
    if (this.currentExerciseIdx + 1 >= this.plan.exercises.length) return false; // completed
    this.currentExerciseIdx++;
    this.repsCompleted = 0;
    return true;
  }
  setExerciseById(exerciseId: string): boolean {
    const nid = normalizeExerciseId(exerciseId);
    const idx = this.plan.exercises.findIndex(e => e.exerciseId === nid || e.originalId === exerciseId);
    if (idx >= 0) { this.currentExerciseIdx = idx; return true; }
    return false;
  }
}
