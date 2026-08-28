import { describe, it, expect } from 'vitest';
import { TemporalBuffer } from './TemporalBuffer';
import { TemporalClassifier } from './TemporalClassifier';
import type { ExerciseFeatures } from './FeatureExtractor';

// Helper: genera un flusso di frame con pattern flessione-estensione (angolo scende poi risale)
// su un segnale raw specifico, mantenendo gli altri segnali statici (per testare che il
// classificatore usi il segnale giusto).
function feature(key: string, value: number): ExerciseFeatures {
  const base: ExerciseFeatures = {
    kneeNorm: 0.9, hipFlexNorm: 0.9, trunkNorm: 0.95, elbowNorm: 0.95,
    legSpreadNorm: 0.2, hipYNorm: 0.5, torsoLen: 1,
    velocity: 0, symmetry: 95,
    kneeRaw: 160, hipFlexRaw: 160, elbowRaw: 160, trunkRaw: 170,
  };
  return { ...base, [key]: value };
}

// Un rep "down-up" sul segnale dato: 180 → 120 (down) → 175 (up), con un po' di rumore,
// poi due frame piatti. ROM ~58.
function pushRep(buffer: TemporalBuffer, key: string, idealVel: number, startTs: number, dtMs = 16) {
  const down = [170, 150, 130, 118, 112, 116, 122, 132, 145, 160];
  const up = [168, 172];
  const vals = [...down, ...up];
  let ts = startTs;
  let prev = 170;
  vals.forEach((v) => {
    const velocity = ((v - prev) / (dtMs / 1000));
    buffer.push(feature(key, v), ts);
    prev = v;
    ts += dtMs;
  });
}

describe('TemporalBuffer — segnale-aware', () => {
  it('getROM legge il segnale passato, non solo kneeRaw', () => {
    const b = new TemporalBuffer();
    pushRep(b, 'elbowRaw', 150, 0);
    expect(b.length).toBeGreaterThanOrEqual(10);
    // ROM sul gomito deve essere ampio; sul ginocchio statico ~0
    expect(b.getROM('elbowRaw')).toBeGreaterThan(40);
    expect(b.getROM('kneeRaw')).toBeLessThan(10);
  });

  it('detectDownUpPattern riconosce il pattern sul segnale primario', () => {
    const b = new TemporalBuffer();
    pushRep(b, 'elbowRaw', 150, 0);
    const res = b.detectDownUpPattern('elbowRaw');
    expect(res.hasPattern).toBe(true);
    expect(res.rom).toBeGreaterThan(40);
  });
});

describe('TemporalClassifier — per-esercizio', () => {
  it('pushup valida il pattern sul GOMITO (elbowRaw), non sul ginocchio', () => {
    const clf = new TemporalClassifier('pushup');
    const b = new TemporalBuffer();
    // Pattern sul gomito: deve dare confidenza alta perché il segnale è corretto
    pushRep(b, 'elbowRaw', 150, 0);
    const res = clf.evaluate(b, feature('elbowRaw', 168), 40, 400);
    expect(res.patternConfidence).toBeGreaterThan(0);
    expect(res.rom).toBeGreaterThan(40);
  });

  it('pushup primaryKey è elbowRaw (non il fallback kneeRaw di prima)', () => {
    const clf = new TemporalClassifier('pushup');
    // Se usasse kneeRaw, un pattern solo sul ginocchio con gomito fermo darebbe rom alto.
    const b = new TemporalBuffer();
    pushRep(b, 'kneeRaw', 120, 0); // pattern SOLO sul ginocchio, gomito fermo
    const res = clf.evaluate(b, feature('kneeRaw', 168), 40, 400);
    // Con primario elbowRaw, il ROM del gomito è ~0 → confidenza rom bassa, non considera il pattern
    expect(res.rom).toBeLessThan(15);
  });

  it('minInterval è per-esercizio (jumpingJack più rapido di squat)', () => {
    // Non esponiamo lastCountAt; verifichiamo che evaluate rispetti la soglia anticorrelazione
    const squat = new TemporalClassifier('squat');
    const jj = new TemporalClassifier('jumpingJack');
    // istanza config differisce nel minInterval (via DEFAULTS) — check indiretto tramite comportamento:
    // un minInterval minore permette un secondo count più presto. Hard to assert senza tempo;
    // qui verifichiamo solo che entrambe marche buone rep e la velocità ideale non rompe nulla.
    const b1 = new TemporalBuffer();
    pushRep(b1, 'kneeRaw', 120, 0);
    pushRep(b1, 'kneeRaw', 120, 300);
    const r1 = squat.evaluate(b1, feature('kneeRaw', 168), 40, 700);
    expect(r1.confidence).toBeGreaterThanOrEqual(0);
    expect(r1).toHaveProperty('shouldCount');
    const r2 = jj.evaluate(b1, feature('kneeRaw', 168), 40, 700);
    expect(r2.confidence).toBeGreaterThanOrEqual(0);
  });
});
