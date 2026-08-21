import { sessionDayKey, dayKey } from './date.js';
import { INK, OLIVE, BLAZE, BLAZE_DEEP, STEEL } from '../constants/theme.js';
import { tr } from '../i18n.js';

export function hrZone(bpm, age, lang) {
  const max = 220 - age;
  const pct = (bpm / max) * 100;
  if (pct < 60) return { label: tr({ it: 'Recupero', en: 'Recovery', de: 'Erholung' }, lang), color: STEEL };
  if (pct < 70) return { label: tr({ it: 'Brucia grassi', en: 'Fat burn', de: 'Fett verbrennen' }, lang), color: OLIVE };
  if (pct < 85) return { label: tr({ it: 'Cardio', en: 'Cardio', de: 'Cardio' }, lang), color: BLAZE };
  return { label: tr({ it: 'Massimale', en: 'Max', de: 'Maximal' }, lang), color: BLAZE_DEEP };
}

export function computeBestStreak(sessions) {
  const dates = [...new Set(sessions.map(sessionDayKey))].sort();
  if (!dates.length) return 0;
  let best = 1, cur = 1;
  for (let i = 1; i < dates.length; i++) {
    const diff = Math.round((new Date(dates[i]) - new Date(dates[i - 1])) / 86400000);
    if (diff === 1) { cur++; best = Math.max(best, cur); } else if (diff > 1) { cur = 1; }
  }
  return best;
}

export function computeStreak(sessions) {
  const dateSet = new Set(sessions.map(sessionDayKey));
  let cursor = new Date();
  if (!dateSet.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (dateSet.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
export function computeStreakWithFreeze(sessions) {
  const dateSet = new Set(sessions.map(sessionDayKey));
  let cursor = new Date();
  if (!dateSet.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  let freezes = 1; // one freeze per streak
  while (true) {
    const k = dayKey(cursor);
    if (dateSet.has(k)) { streak++; cursor.setDate(cursor.getDate() - 1); continue; }
    if (freezes > 0) { freezes--; cursor.setDate(cursor.getDate() - 1); continue; }
    break;
  }
  return { streak, usedFreeze: freezes === 0 };
}

export const WEEKLY_GOAL = 3;
export const STREAK_BADGES = [3, 7, 14, 30, 60, 90];
export const SESSION_BADGES = [5, 10, 25, 50, 75, 100, 150];

export const RPE_LABELS = [
  { it: 'Facile', en: 'Easy', de: 'Leicht' },
  { it: 'Leggero', en: 'Light', de: 'Mäßig' },
  { it: 'Medio', en: 'Medium', de: 'Mittel' },
  { it: 'Duro', en: 'Hard', de: 'Hart' },
  { it: 'Al limite', en: 'Max effort', de: 'Am Limit' },
];
export const RPE_COLORS = ['#6FA75F', '#9DB85A', '#D9B34C', '#E0843D', '#C1440E'];
export const RANKS = [
  { min: 0, name: { it: 'RECLUTA', en: 'RECRUIT', de: 'REKRUT' } },
  { min: 5, name: { it: 'SOLDATO', en: 'SOLDIER', de: 'SOLDAT' } },
  { min: 15, name: { it: 'SERGENTE', en: 'SERGEANT', de: 'SERGEANT' } },
  { min: 30, name: { it: 'TENENTE', en: 'LIEUTENANT', de: 'LEUTNANT' } },
  { min: 60, name: { it: 'CAPITANO', en: 'CAPTAIN', de: 'KAPITÄN' } },
  { min: 100, name: { it: 'VETERANO', en: 'VETERAN', de: 'VETERAN' } },
];

export function getRank(sessionsCount) {
  let current = RANKS[0];
  for (const r of RANKS) if (sessionsCount >= r.min) current = r;
  const idx = RANKS.indexOf(current);
  return { current, next: RANKS[idx + 1] || null };
}

export function nextBadge(sessions) {
  const bestStreak = computeBestStreak(sessions);
  const candidates = [
    ...STREAK_BADGES.filter(n => bestStreak < n).map(n => ({ kind: 'serie', n, remaining: n - bestStreak })),
    ...SESSION_BADGES.filter(n => sessions.length < n).map(n => ({ kind: 'sessioni', n, remaining: n - sessions.length })),
  ];
  if (!candidates.length) return null;
  candidates.sort((a, b) => a.remaining - b.remaining);
  return candidates[0];
}

export function greeting(lang) {
  const h = new Date().getHours();
  if (h < 6) return tr({ it: 'Ancora sveglio,', en: 'Still awake,', de: 'Noch wach,' }, lang);
  if (h < 12) return tr({ it: 'Buongiorno,', en: 'Good morning,', de: 'Guten Morgen,' }, lang);
  if (h < 18) return tr({ it: 'Buon pomeriggio,', en: 'Good afternoon,', de: 'Guten Nachmittag,' }, lang);
  return tr({ it: 'Buonasera,', en: 'Good evening,', de: 'Guten Abend,' }, lang);
}

export function buildHeatmap(sessions, days = 35) {
  const dateSet = new Set(sessions.map(sessionDayKey));
  const cells = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    cells.push({ key: dayKey(d), active: dateSet.has(dayKey(d)) });
  }
  return cells;
}
export function buildYearHeatmap(sessions) {
  const byDay = new Map();
  sessions.forEach(s => { const k = sessionDayKey(s); byDay.set(k, (byDay.get(k) || 0) + 1); });
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const days = [];
  for (let d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
    const k = dayKey(d);
    const c = byDay.get(k) || 0;
    days.push({ key: k, date: new Date(d), count: c, active: c > 0 });
  }
  return days;
}
export function getPersonalRecords(sessions) {
  if (!sessions.length) return null;
  const maxKcal = Math.max(...sessions.map(s => s.kcal || 0));
  const maxStreak = computeBestStreak(sessions);
  const totalMin = Math.round(sessions.reduce((a,s)=>a+(s.durationSec||0),0)/60);
  const favCounts = {};
  sessions.forEach(s => { favCounts[s.programId] = (favCounts[s.programId]||0)+1; });
  const favId = Object.entries(favCounts).sort((a,b)=>b[1]-a[1])[0]?.[0] || null;
  return { maxKcal, maxStreak, totalMin, totalSessions: sessions.length, favId };
}
export function getMonthlyTrend(sessions) {
  const now = new Date();
  const months = [];
  for (let i=5;i>=0;i--) {
    const d = new Date(now.getFullYear(), now.getMonth()-i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    const label = d.toLocaleDateString('it-IT', { month: 'short' });
    const kcal = sessions.filter(s => s.date.slice(0,7) === key).reduce((a,s)=>a+(s.kcal||0),0);
    months.push({ key, label, kcal });
  }
  return months;
}
