/**
 * Operator40 — TemporalClassifier (Fase 2)
 * Classificatore temporale leggero che imita GRU/DTW senza dipendenze TensorFlow.
 * Usa finestra 30 frame per validare rep con pattern temporale + ROM + velocità + simmetria.
 * Sostituisce soglie fragili single-frame con scoring su sequenza.
 */
import { TemporalBuffer } from './TemporalBuffer';
import type { ExerciseFeatures } from './FeatureExtractor';
import { clamp } from '../pose/Geometry';

export interface ClassifierConfig {
  minROM: number; // gradi minimi per considerare rep valida
  minConfidence: number; // 0-100 gate per contare
  exercise: string;
  primaryKey: 'kneeRaw' | 'hipFlexRaw' | 'elbowNorm' | 'trunkNorm';
}

export interface ClassifierResult {
  confidence: number; // 0-100
  shouldCount: boolean;
  rom: number;
  patternConfidence: number;
  velocityScore: number;
  symmetryScore: number;
  reason: string;
}

const DEFAULTS: Record<string, Partial<ClassifierConfig>> = {
  squat: { minROM: 18, minConfidence: 58, primaryKey: 'kneeRaw' },
  pushup: { minROM: 22, minConfidence: 60, primaryKey: 'kneeRaw' }, // pushup usa elbow ma mappato su kneeRaw via bilateral
  crunch: { minROM: 14, minConfidence: 58, primaryKey: 'hipFlexRaw' },
  affondo: { minROM: 20, minConfidence: 60, primaryKey: 'kneeRaw' },
  ponte: { minROM: 15, minConfidence: 58, primaryKey: 'hipFlexRaw' },
};

export class TemporalClassifier {
  private cfg: ClassifierConfig;
  private lastCountAt = 0;

  constructor(exercise: string, overrides?: Partial<ClassifierConfig>) {
    const def = DEFAULTS[exercise] ?? { minROM: 16, minConfidence: 60, primaryKey: 'kneeRaw' as const };
    this.cfg = {
      exercise,
      minROM: overrides?.minROM ?? def.minROM ?? 16,
      minConfidence: overrides?.minConfidence ?? def.minConfidence ?? 60,
      primaryKey: overrides?.primaryKey ?? (def.primaryKey as any) ?? 'kneeRaw',
      ...overrides,
    } as ClassifierConfig;
  }

  evaluate(buffer: TemporalBuffer, currentFeatures: ExerciseFeatures, dwellMs: number, now: number): ClassifierResult {
    if (!buffer.isReady) {
      return { confidence: 0, shouldCount: false, rom: 0, patternConfidence: 0, velocityScore: 0, symmetryScore: 0, reason: 'buffer warming' };
    }

    const { hasPattern, confidence: patternConf, rom } = this.detectPattern(buffer);
    const vel = buffer.getVelocityProfile();
    const sym = buffer.getSymmetryAvg();

    // Velocity score: penalizza troppo veloce (>500 deg/s) o troppo lento (<20 deg/s medio = fermo)
    const velocityScore = clamp(100 - Math.abs(vel.mean - 120) * 0.28 - Math.max(0, vel.max - 520) * 0.12, 0, 100);
    const symmetryScore = clamp(sym, 0, 100);

    // Dwell bonus: breve pausa a fondo rip = più sicuro
    const dwellBonus = dwellMs > 55 ? 6 : dwellMs > 30 ? 3 : 0;

    // ROM score graduato
    const romScore = rom > this.cfg.minROM + 12 ? 30 : rom > this.cfg.minROM + 5 ? 22 : rom > this.cfg.minROM ? 14 : 0;

    let confidence = 0;
    if (rom < this.cfg.minROM) {
      confidence = clamp(patternConf * 0.25, 0, 40);
    } else {
      confidence = clamp(
        patternConf * 0.45 +
        velocityScore * 0.22 +
        symmetryScore * 0.12 +
        romScore +
        dwellBonus,
        0, 100
      );
    }

    // Anti-double count: minimo intervallo 320-380ms
    const minInterval = 340;
    const timeOk = now - this.lastCountAt > minInterval;
    const shouldCount = confidence >= this.cfg.minConfidence && hasPattern && rom >= this.cfg.minROM && timeOk;

    const reason = !hasPattern ? 'no pattern' : rom < this.cfg.minROM ? `rom ${Math.round(rom)}<${this.cfg.minROM}` : !timeOk ? 'debounce' : confidence < this.cfg.minConfidence ? `conf ${Math.round(confidence)}<${this.cfg.minConfidence}` : 'ok';

    return { confidence: Math.round(confidence), shouldCount, rom: Math.round(rom), patternConfidence: Math.round(patternConf), velocityScore: Math.round(velocityScore), symmetryScore: Math.round(symmetryScore), reason };
  }

  private detectPattern(buffer: TemporalBuffer) {
    if (this.cfg.primaryKey === 'hipFlexRaw') {
      return buffer.detectFlexExtendPattern('hipFlexRaw');
    }
    return buffer.detectDownUpPattern();
  }

  markCounted(now: number) { this.lastCountAt = now; }
  reset() { this.lastCountAt = 0; }

  updateConfig(patch: Partial<ClassifierConfig>) { this.cfg = { ...this.cfg, ...patch }; }
}
