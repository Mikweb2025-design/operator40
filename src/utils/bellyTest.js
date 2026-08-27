/**
 * Piano Pancia 2.0 — Test iniziale e progressione
 * Test: plank max (sec) + crunch in 30s → livello belly
 * Progressione: ogni 7gg se 3/3 pancia → suggerisci livello successivo
 */

export const BELLY_LEVELS = [
  {
    key: 'recluta',
    label: { it: 'RECLUTA', en: 'RECRUIT', de: 'REKRUT' },
    minPlank: 0,
    minCrunch: 0,
    work: 30,
    rest: 20,
    desc: { it: 'Base — core sicuro', en: 'Base — safe core', de: 'Basis — sicher' },
  },
  {
    key: 'combattente',
    label: { it: 'COMBATTENTE', en: 'FIGHTER', de: 'KÄMPFER' },
    minPlank: 30,
    minCrunch: 10,
    work: 40,
    rest: 20,
    desc: { it: 'Standard — 40″/20″', en: 'Standard — 40s/20s', de: 'Standard — 40s/20s' },
  },
  {
    key: 'elite',
    label: { it: 'ELITE', en: 'ELITE', de: 'ELITE' },
    minPlank: 60,
    minCrunch: 20,
    work: 45,
    rest: 15,
    desc: { it: 'Avanzato — 45″/15″', en: 'Advanced — 45s/15s', de: 'Fortgeschritten — 45s/15s' },
  },
];

export function getBellyLevelForTest({ plankSec = 0, crunchReps = 0 } = {}) {
  const p = Math.max(0, parseInt(plankSec, 10) || 0);
  const c = Math.max(0, parseInt(crunchReps, 10) || 0);
  // prendi il livello più basso tra i due test (sicurezza over-40)
  const levelByPlank = p >= 60 ? 'elite' : p >= 30 ? 'combattente' : 'recluta';
  const levelByCrunch = c >= 20 ? 'elite' : c >= 10 ? 'combattente' : 'recluta';
  const order = { recluta: 0, combattente: 1, elite: 2 };
  const chosen = order[levelByPlank] < order[levelByCrunch] ? levelByPlank : levelByCrunch;
  return BELLY_LEVELS.find((l) => l.key === chosen) || BELLY_LEVELS[0];
}

export function getBellyTestSuggestion(sessions, waistHistory) {
  // se test non fatto, suggerisci test
  return null;
}

export function shouldProgressBellyLevel({
  sessions,
  currentLevelKey = 'recluta',
  waistHistory,
  profile,
}) {
  // ogni 7gg dall'ultimo cambio livello, se 3/3 pancia nella settimana → suggerisci +1
  const levelOrder = ['recluta', 'combattente', 'elite'];
  const idx = levelOrder.indexOf(currentLevelKey);
  if (idx >= levelOrder.length - 1) return null;
  const lastChange = profile?.bellyLevelUpdated ? new Date(profile.bellyLevelUpdated) : null;
  if (lastChange) {
    const diff = (Date.now() - lastChange.getTime()) / 86400000;
    if (diff < 7) return null;
  }
  // check 3/3 nell'ultima settimana
  const weekAgo = Date.now() - 7 * 86400000;
  const bellySessions = (sessions || []).filter(
    (s) =>
      ['N', 'O', 'P', 'A', 'E', 'F', 'M'].includes(s.programId) &&
      new Date(s.date).getTime() > weekAgo
  );
  if (bellySessions.length < 3) return null;
  // se girovita sta scendendo o stabile, ok progredire
  return levelOrder[idx + 1];
}

export function formatBellyTestResult({ plankSec, crunchReps, lang = 'it' }) {
  const lvl = getBellyLevelForTest({ plankSec, crunchReps });
  const labels = {
    recluta: { it: 'RECLUTA', en: 'RECRUIT', de: 'REKRUT' },
    combattente: { it: 'COMBATTENTE', en: 'FIGHTER', de: 'KÄMPFER' },
    elite: { it: 'ELITE', en: 'ELITE', de: 'ELITE' },
  };
  return {
    level: lvl,
    label: labels[lvl.key][lang] || labels[lvl.key].it,
  };
}
