/**
 * Operator40 — TemporalBuffer (Fase 2)
 * Buffer circolare 30 frame (~1s @30fps) per analisi temporale.
 * Sostituisce soglie single-frame con finestra temporale → robustezza a jitter e parziali.
 */
import type { ExerciseFeatures } from './FeatureExtractor';
import { featuresToVector } from './FeatureExtractor';

export interface BufferedFrame {
  features: ExerciseFeatures;
  vector: number[];
  timestamp: number;
}

export type RomSignal = 'kneeRaw' | 'hipFlexRaw' | 'elbowRaw' | 'trunkRaw';

export class TemporalBuffer {
  private frames: BufferedFrame[] = [];
  private maxSize: number;
  private maxAgeMs: number;

  constructor(maxSize = 30, maxAgeMs = 1200) {
    this.maxSize = maxSize;
    this.maxAgeMs = maxAgeMs;
  }

  push(features: ExerciseFeatures, timestamp: number) {
    const vector = featuresToVector(features);
    this.frames.push({ features, vector, timestamp });
    if (this.frames.length > this.maxSize) this.frames.shift();
    this.evict(timestamp);
  }

  private evict(now: number) {
    const cutoff = now - this.maxAgeMs;
    while (this.frames.length && this.frames[0].timestamp < cutoff) this.frames.shift();
  }

  clear() { this.frames = []; }
  get length() { return this.frames.length; }
  get isReady() { return this.frames.length >= 8; } // minimo per decisione
  get values() { return this.frames; }

  // Statistiche temporali per classificatore
  getROM(key: RomSignal = 'kneeRaw'): number {
    if (this.frames.length < 4) return 0;
    const vals = this.frames.map(f => f.features[key] as number);
    return Math.max(...vals) - Math.min(...vals);
  }

  getVelocityProfile(): { mean: number; max: number; smoothness: number } {
    if (this.frames.length < 4) return { mean: 0, max: 0, smoothness: 100 };
    const vels = this.frames.map(f => Math.abs(f.features.velocity));
    const mean = vels.reduce((a, b) => a + b, 0) / vels.length;
    const max = Math.max(...vels);
    // smoothness = quanto è uniforme la velocità (bassa varianza = movimento controllato)
    const variance = vels.reduce((s, v) => s + (v - mean) ** 2, 0) / vels.length;
    const smoothness = Math.max(0, 100 - Math.sqrt(variance) * 0.3);
    return { mean, max, smoothness };
  }

  getSymmetryAvg(): number {
    if (!this.frames.length) return 100;
    return this.frames.reduce((s, f) => s + f.features.symmetry, 0) / this.frames.length;
  }

  // Pattern detection: down-up sinusoidale vs rumore (dalla definizione "decreasing then increasing")
  detectDownUpPattern(key: RomSignal = 'kneeRaw'): { hasPattern: boolean; confidence: number; rom: number } {
    if (this.frames.length < 10) return { hasPattern: false, confidence: 0, rom: 0 };
    const vals = this.frames.map(f => f.features[key] as number);
    const rom = Math.max(...vals) - Math.min(...vals);
    if (rom < 14) return { hasPattern: false, confidence: 0, rom };

    // Cerca minimo poi massimo (down-up): conta inversioni direzione
    let directionChanges = 0;
    let lastDir: 'up' | 'down' | null = null;
    for (let i = 1; i < vals.length; i++) {
      const diff = vals[i] - vals[i - 1];
      if (Math.abs(diff) < 1.5) continue; // rumore
      const dir = diff > 0 ? 'up' : 'down';
      if (lastDir && dir !== lastDir) directionChanges++;
      lastDir = dir;
    }
    // Un rep ideale: 1-2 inversioni (down poi up). >4 = jitter
    const hasPattern = directionChanges >= 1 && directionChanges <= 3 && rom > 18;
    const confidence = hasPattern ? Math.min(100, 55 + rom * 1.2 - directionChanges * 8) : 0;
    return { hasPattern, confidence, rom };
  }

  // Per crunch/bicycle/ponte o esercizi che usano hipFlex/trunk come primario:
  // stessa logica down-up ma sul segnale flessione (angolo diminuisce in contrazione).
  detectFlexExtendPattern(key: RomSignal = 'kneeRaw'): { hasPattern: boolean; confidence: number; rom: number } {
    if (this.frames.length < 10) return { hasPattern: false, confidence: 0, rom: 0 };
    const vals = this.frames.map(f => f.features[key] as number);
    const rom = Math.max(...vals) - Math.min(...vals);
    if (rom < 12) return { hasPattern: false, confidence: 0, rom };
    let changes = 0;
    let lastDir: string | null = null;
    for (let i = 1; i < vals.length; i++) {
      const diff = vals[i] - vals[i - 1];
      if (Math.abs(diff) < 1.2) continue;
      const dir = diff > 0 ? 'up' : 'down';
      if (lastDir && dir !== lastDir) changes++;
      lastDir = dir;
    }
    const hasPattern = changes >= 1 && changes <= 3 && rom > 14;
    const confidence = hasPattern ? Math.min(100, 50 + rom * 1.5 - changes * 8) : 0;
    return { hasPattern, confidence, rom };
  }

  getSlice(n: number): BufferedFrame[] {
    return this.frames.slice(-n);
  }
}
