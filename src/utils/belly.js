import { PROGRAMS, BELLY_IDS } from '../data/programs.js';

// Tutte le missioni che toccano la pancia — sia le 4 storiche (A,E,F,M) che le 3 nuove (N,O,P)
const LEGACY_BELLY = new Set(['A', 'E', 'F', 'M']);
const ALL_BELLY = new Set([...LEGACY_BELLY, ...BELLY_IDS]);

export function isBellyProgram(id) {
  return ALL_BELLY.has(id);
}

export function getBellyPrograms() {
  return PROGRAMS.filter((p) => isBellyProgram(p.id));
}

export function getBellySessions(sessions) {
  return (sessions || []).filter((s) => isBellyProgram(s.programId));
}

// Quante missioni pancia nelle ultime N settimane
export function getBellyCount(sessions, weeks = 4) {
  const since = Date.now() - weeks * 7 * 86400000;
  return getBellySessions(sessions).filter((s) => new Date(s.date).getTime() > since).length;
}

// Streak pancia: giorni consecutivi con almeno una pancia
export function getBellyStreak(sessions) {
  const dates = new Set(getBellySessions(sessions).map((s) => s.date.slice(0, 10)));
  if (!dates.size) return 0;
  let cur = new Date();
  // se oggi non c'è pancia, parti da ieri
  if (!dates.has(cur.toISOString().slice(0, 10))) cur.setDate(cur.getDate() - 1);
  let n = 0;
  while (dates.has(cur.toISOString().slice(0, 10))) {
    n++;
    cur.setDate(cur.getDate() - 1);
    if (n > 60) break;
  }
  return n;
}

// Progresso verso obiettivo pancia settimanale (consigliato 3)
export function getBellyProgress(sessions, goal = 3) {
  const weekAgo = Date.now() - 7 * 86400000;
  const done = getBellySessions(sessions).filter(
    (s) => new Date(s.date).getTime() > weekAgo
  ).length;
  return {
    done,
    total: goal,
    pct: Math.min(1, done / goal),
    remain: Math.max(0, goal - done),
    isDone: done >= goal,
  };
}

// Suggerisce la prossima pancia meno usata / più adatta
export function pickBellyNext(sessions) {
  const counts = {};
  getBellySessions(sessions).forEach((s) => {
    counts[s.programId] = (counts[s.programId] || 0) + 1;
  });
  const cands = getBellyPrograms();
  return [...cands].sort((a, b) => (counts[a.id] || 0) - (counts[b.id] || 0))[0] || cands[0];
}

// Tip / insight pancia basato su girovita e frequenza
export function getBellyInsight({ sessions, waistHistory, lang = 'it' }) {
  const bellyCount = getBellyCount(sessions, 4);
  const streak = getBellyStreak(sessions);
  const waist = waistHistory?.length ? waistHistory[waistHistory.length - 1] : null;
  const first = waistHistory?.length ? waistHistory[0] : null;
  const delta = waist && first && waistHistory.length > 1 ? waist.cm - first.cm : null;

  if (delta != null && delta <= -2) {
    return lang === 'it'
      ? `Pancia in ritirata: -${Math.abs(delta)} cm dal via. Continua così — 3 pancia / sett. è il ritmo d’oro.`
      : `Belly retreating: -${Math.abs(delta)} cm since start. Keep 3 belly / week.`;
  }
  if (streak >= 3) {
    return lang === 'it'
      ? `Streak pancia ${streak} giorni — la cintura si stringe. Non mollare ora!`
      : `Belly streak ${streak} days — belt is tightening!`;
  }
  if (bellyCount < 4) {
    return lang === 'it'
      ? `Solo ${bellyCount} pancia nelle ultime 4 sett. — punta a 8-12 per vedere il girovita muoversi.`
      : `Only ${bellyCount} belly in 4 weeks — aim for 8-12 to see the waist move.`;
  }
  if (waist) {
    return lang === 'it'
      ? `Girovita ${waist.cm} cm — ${bellyCount} pancia / 4 sett. Buon ritmo, resta costante.`
      : `Waist ${waist.cm} cm — ${bellyCount} belly / 4 wks. Good pace, stay consistent.`;
  }
  return lang === 'it'
    ? `Obiettivo pancia: 3 missioni / sett. per attaccare il grasso addominale.`
    : `Belly goal: 3 missions / week to attack belly fat.`;
}
