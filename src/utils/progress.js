import { sessionDayKey, dayKey } from './date.js';
import { WEEKLY_GOAL } from './stats.js';

// --- Nuove funzioni progresso & aderenza ---

export function getWeeklyProgress(sessions, weeklyGoal = WEEKLY_GOAL) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + 1); // lunedì
  start.setHours(0, 0, 0, 0);
  const done = (sessions || []).filter(s => new Date(s.date) >= start).length;
  const pct = Math.min(1, done / weeklyGoal);
  const remain = Math.max(0, weeklyGoal - done);
  return { done, total: weeklyGoal, pct, remain, isDone: done >= weeklyGoal };
}

export function getConsistencyScore(sessions, weeks = 8) {
  // 0..100: quanti giorni con almeno 1 sessione nelle ultime N settimane, pesato per regolarità
  if (!sessions?.length) return 0;
  const now = new Date();
  const byDay = new Set(sessions.map(sessionDayKey));
  let activeDays = 0;
  for (let i = 0; i < weeks * 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    if (byDay.has(dayKey(d))) activeDays++;
  }
  // normalizza su 3x/settimana ideale → 24 giorni su 8 settimane = 100%
  const ideal = weeks * WEEKLY_GOAL;
  return Math.round(Math.min(100, (activeDays / ideal) * 100));
}

export function getAveragePace(sessions) {
  if (!sessions?.length) return null;
  const totalSec = sessions.reduce((a, s) => a + (s.durationSec || 780), 0);
  const totalKcal = sessions.reduce((a, s) => a + (s.kcal || 0), 0);
  const avgMin = Math.round(totalSec / sessions.length / 60);
  const avgKcal = Math.round(totalKcal / sessions.length);
  return { avgMin, avgKcal, count: sessions.length };
}

export function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}′`;
  return `${m}′ ${s}″`;
}

export function estimateNextLevel(sessions, currentLevelKey) {
  // stima sessioni rimanenti per prossimo rank/level basato su aderenza attuale
  const perWeek = getWeeklyProgress(sessions).done || 1;
  const consistency = getConsistencyScore(sessions);
  const weeklyRate = Math.max(1, Math.round(perWeek * (consistency / 100 + 0.5)));
  return { weeklyRate, consistency };
}

export function getStreakRisk(sessions) {
  // ritorna 'ok' | 'at-risk' | 'break' in base a giorni dall'ultima sessione
  if (!sessions?.length) return 'break';
  const last = new Date(sessions[sessions.length - 1].date);
  const diffDays = Math.round((Date.now() - last.getTime()) / 86400000);
  if (diffDays <= 1) return 'ok';
  if (diffDays === 2) return 'at-risk';
  return 'break';
}
