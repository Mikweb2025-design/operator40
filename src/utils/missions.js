import { PROGRAMS, BELLY_IDS } from '../data/programs.js';
import { getConsistencyScore } from './progress.js';
import { isBellyProgram, getBellyCount } from './belly.js';

// Ritorna le "altre missioni" ordinate per rilevanza smart (consistenza, RPE, uso)
export function getRecommendedMissions({ sessions, profile, others }) {
  const cons = (() => { try { return getConsistencyScore(sessions, 4); } catch { return 50; } })();
  const counts = {};
  (sessions || []).forEach(s => { counts[s.programId] = (counts[s.programId] || 0) + 1; });
  const lastRpe = sessions?.length ? sessions[sessions.length - 1].rpe : null;

  return [...others].sort((a, b) => {
    // priorità: se RPE ultima alta, favorisci recupero (D, H, I)
    if (lastRpe >= 4) {
      const rec = ['D', 'H', 'I'];
      const ai = rec.indexOf(a.id), bi = rec.indexOf(b.id);
      if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    }
    // se consistenza bassa, favorisci difficoltà 1-2
    if (cons < 40) return (a.difficulty || 2) - (b.difficulty || 2);
    // altrimenti favorisci meno usate
    const ca = counts[a.id] || 0, cb = counts[b.id] || 0;
    if (ca !== cb) return ca - cb;
    // poi difficoltà media
    return (a.difficulty || 2) - (b.difficulty || 2);
  });
}

export function getDailyChallenge({ sessions, profile }) {
  const day = new Date().getDate() % PROGRAMS.length;
  const base = PROGRAMS[day];
  const cons = (() => { try { return getConsistencyScore(sessions, 4); } catch { return 50; } })();
  const streak = (() => {
    const set = new Set((sessions || []).map(s => s.date.slice(0, 10)));
    let cur = new Date(); if (!set.has(cur.toISOString().slice(0, 10))) cur.setDate(cur.getDate() - 1);
    let n = 0; while (set.has(cur.toISOString().slice(0, 10))) { n++; cur.setDate(cur.getDate() - 1); }
    return n;
  })();
  let bonus = '';
  if (cons > 70) bonus = 'Bonus costanza: +1 round';
  else if (streak >= 3) bonus = `Streak ${streak} — mantieni!`;
  else if (sessions?.length === 0) bonus = 'Prima missione: inizia leggero';
  return { program: base, bonus, cons, streak };
}

export function formatMissionDifficulty(d) {
  if (d === 1) return 'Facile';
  if (d === 2) return 'Medio';
  if (d === 3) return 'Intenso';
  return 'Medio';
}

// ── Pancia: missioni dedicate + boost se girovita fermo / poche pancia ──
export function getBellyMissions({ sessions, profile, waistHistory }) {
  const belly = PROGRAMS.filter(p => BELLY_IDS.includes(p.id));
  const counts = {};
  (sessions || []).forEach(s => { counts[s.programId] = (counts[s.programId] || 0) + 1; });
  const bellyCount = getBellyCount(sessions, 4);
  const waist = waistHistory?.length ? waistHistory[waistHistory.length - 1] : null;
  const first = waistHistory?.length ? waistHistory[0] : null;
  const delta = waist && first && waistHistory.length > 1 ? waist.cm - first.cm : null;
  const needsBelly = bellyCount < 6 || (delta != null && delta > -1);

  // se serve spinta pancia, metti N/O/P in testa, altrimenti ordina per meno usate
  return [...belly].sort((a, b) => {
    if (needsBelly) return (counts[a.id] || 0) - (counts[b.id] || 0);
    return (counts[a.id] || 0) - (counts[b.id] || 0);
  }).map(p => ({ ...p, _needsBelly: needsBelly }));
}

export function getBellyBooster({ sessions, waistHistory }) {
  const c = getBellyCount(sessions, 2);
  if (c >= 3) return null;
  return c === 0 ? 'Pancia ferma da 2 sett. — riparti con OMBELICO PIATTO' : `Solo ${c} pancia / 2 sett. — aggiungi una missione pancia`;
}
