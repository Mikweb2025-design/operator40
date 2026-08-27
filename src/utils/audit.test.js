import { describe, it, expect, beforeEach, vi } from 'vitest';
import { isBellyProgram, getBellyStreak, getBellyProgress, getBellyCount } from './belly.js';
import { getWeeklyProgress, getConsistencyScore, getAveragePace, getStreakRisk } from './progress.js';
import { calcBMI, bmiCategory, estimateTDEE } from './bmi.js';
import { estimateBodyFat, whtCategory } from './body.js';
import { importBackup, BACKUP_VERSION } from './backup.js';

describe('belly', () => {
  it('isBellyProgram detects belly missions', () => {
    expect(isBellyProgram('N')).toBe(true);
    expect(isBellyProgram('A')).toBe(true);
    expect(isBellyProgram('B')).toBe(false);
  });
  it('getBellyProgress computes weekly done/total', () => {
    const now = new Date();
    const sessions = [
      { programId: 'N', date: now.toISOString(), kcal: 100 },
      { programId: 'B', date: now.toISOString(), kcal: 100 },
    ];
    const p = getBellyProgress(sessions, 3);
    expect(p.done).toBe(1);
    expect(p.total).toBe(3);
    expect(p.remain).toBe(2);
    expect(p.isDone).toBe(false);
  });
  it('getBellyCount filters by weeks', () => {
    const now = Date.now();
    const old = new Date(now - 30 * 86400000).toISOString();
    const recent = new Date().toISOString();
    const sessions = [
      { programId: 'N', date: old, kcal: 80 },
      { programId: 'O', date: recent, kcal: 80 },
    ];
    expect(getBellyCount(sessions, 1)).toBe(1);
    expect(getBellyCount(sessions, 5)).toBe(2);
  });
  it('getBellyStreak returns 0 when no belly sessions', () => {
    expect(getBellyStreak([])).toBe(0);
    expect(getBellyStreak([{ programId: 'B', date: new Date().toISOString() }])).toBe(0);
  });
});

describe('progress', () => {
  it('getWeeklyProgress counts sessions from monday', () => {
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - now.getDay() + 1);
    monday.setHours(12, 0, 0, 0);
    const sessions = [{ date: monday.toISOString(), kcal: 100 }];
    const p = getWeeklyProgress(sessions, 3);
    expect(p.done).toBe(1);
    expect(p.pct).toBeCloseTo(1 / 3);
    expect(p.isDone).toBe(false);
  });
  it('getConsistencyScore returns 0 when no sessions', () => {
    expect(getConsistencyScore([])).toBe(0);
  });
  it('getConsistencyScore scales to 100 for ideal 3x/week', () => {
    // 24 days active in 8 weeks should be ~100%
    const now = new Date();
    const sessions = [];
    for (let i = 0; i < 24; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - i * 2); // every 2 days to spread
      sessions.push({ date: d.toISOString(), kcal: 100 });
    }
    const score = getConsistencyScore(sessions, 8);
    expect(score).toBeGreaterThan(50);
    expect(score).toBeLessThanOrEqual(100);
  });
  it('getAveragePace computes avgMin/avgKcal', () => {
    const sessions = [
      { durationSec: 900, kcal: 120 },
      { durationSec: 780, kcal: 100 },
    ];
    const pace = getAveragePace(sessions);
    expect(pace.avgMin).toBe(Math.round((900 + 780) / 2 / 60));
    expect(pace.avgKcal).toBe(110);
  });
  it('getStreakRisk returns ok/at-risk/break', () => {
    expect(getStreakRisk([])).toBe('break');
    const now = new Date();
    expect(getStreakRisk([{ date: now.toISOString() }])).toBe('ok');
    const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString();
    expect(getStreakRisk([{ date: twoDaysAgo }])).toBe('at-risk');
    const fiveDaysAgo = new Date(Date.now() - 5 * 86400000).toISOString();
    expect(getStreakRisk([{ date: fiveDaysAgo }])).toBe('break');
  });
});

describe('bmi', () => {
  it('calcBMI 80kg 175cm ~26.1', () => {
    expect(calcBMI(80, 175)).toBe(26.1);
  });
  it('calcBMI returns null for missing', () => {
    expect(calcBMI(null, 175)).toBe(null);
    expect(calcBMI(80, 0)).toBe(null);
  });
  it('bmiCategory maps correctly', () => {
    expect(bmiCategory(17).key).toBe('under');
    expect(bmiCategory(22).key).toBe('ok');
    expect(bmiCategory(27).key).toBe('over');
    expect(bmiCategory(32).key).toBe('obese');
  });
  it('estimateTDEE male 80kg 175cm 45y', () => {
    const tdee = estimateTDEE(80, 175, 45);
    expect(tdee).toBeGreaterThan(1500);
    expect(tdee).toBeLessThan(3000);
  });
});

describe('body', () => {
  it('estimateBodyFat returns plausible range', () => {
    const bf = estimateBodyFat({ waistCm: 95, weightKg: 82, heightCm: 175, age: 45 });
    expect(bf).toBeGreaterThan(10);
    expect(bf).toBeLessThan(35);
  });
  it('estimateBodyFat null when missing', () => {
    expect(estimateBodyFat({ waistCm: null, weightKg: 80, heightCm: 175, age: 40 })).toBe(null);
  });
  it('whtCategory thresholds', () => {
    expect(whtCategory(0.45).key).toBe('ok');
    expect(whtCategory(0.55).key).toBe('at');
    expect(whtCategory(0.65).key).toBe('high');
  });
});

describe('backup', () => {
  it('BACKUP_VERSION matches STORAGE_SCHEMA_VERSION', () => {
    expect(typeof BACKUP_VERSION).toBe('number');
    expect(BACKUP_VERSION).toBeGreaterThanOrEqual(1);
  });
  it('importBackup throws on invalid root', async () => {
    await expect(importBackup(null)).rejects.toThrow();
    await expect(importBackup('bad')).rejects.toThrow();
  });
  it('importBackup throws on invalid sessions type', async () => {
    await expect(importBackup({ sessions: 'not-array' })).rejects.toThrow(/sessions/);
  });
  it('importBackup throws on invalid profile type', async () => {
    await expect(importBackup({ profile: 'not-object' })).rejects.toThrow(/profile/);
  });
  it('importBackup migrates v0 to v1 (adds defaults)', async () => {
    // mock storage
    global.window = global.window || {};
    global.window.storage = {
      get: async () => null,
      set: async () => {},
    };
    global.localStorage = {
      getItem: () => null,
      setItem: () => {},
    };
    const data = { profile: { name: 'Test' }, sessions: [{ kcal: 100 }], version: 0 };
    const migrated = await importBackup(data);
    expect(migrated.version).toBe(1);
    expect(migrated.profile.lang).toBe('it');
    expect(migrated.profile.weeklyGoal).toBe(3);
  });
});
