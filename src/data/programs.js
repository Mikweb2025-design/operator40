/* Programs, levels, intervals, Camp logic */

export const WORK_SEC = 40;
export const REST_SEC = 20;
export const WARM_SEC = 90;
export const COOL_SEC = 90;

export const INTERVAL_PRESETS = [
  { key: 'tabata', work: 20, rest: 10, label: '20″ / 10″ · Tabata' },
  { key: 'breve', work: 30, rest: 15, label: '30″ / 15″' },
  { key: 'standard', work: 40, rest: 20, label: '40″ / 20″' },
  { key: 'lungo', work: 45, rest: 15, label: '45″ / 15″' },
  { key: 'custom', work: 40, rest: 20, label: 'Custom', isCustom: true },
];

export function getCustomPreset(profile) {
  if (profile && profile.customWork && profile.customRest) {
    const w = Math.max(10, Math.min(90, parseInt(profile.customWork, 10) || 40));
    const r = Math.max(5, Math.min(60, parseInt(profile.customRest, 10) || 20));
    return { key: 'custom', work: w, rest: r, label: `${w}″ / ${r}″` };
  }
  return null;
}

export function getIntervalPreset(key) {
  return INTERVAL_PRESETS.find(p => p.key === key) || INTERVAL_PRESETS[1];
}

export const LEVELS = [
  { key: 'recluta', label: { it: 'RECLUTA', en: 'RECRUIT', de: 'REKRUT' }, preset: 'breve', work: 30, rest: 15, desc: { it: 'Ritmo iniziale: recupero pieno', en: 'Starting pace: full rest', de: 'Starttempo: volle Pause' } },
  { key: 'combattente', label: { it: 'COMBATTENTE', en: 'FIGHTER', de: 'KÄMPFER' }, preset: 'standard', work: 40, rest: 20, desc: { it: 'Ritmo standard 40″/20″', en: 'Standard pace 40s/20s', de: 'Standardtempo 40s/20s' } },
  { key: 'elite', label: { it: 'ELITE', en: 'ELITE', de: 'ELITE' }, preset: 'lungo', work: 45, rest: 15, desc: { it: 'Ritmo sostenuto 45″/15″', en: 'Brisk pace 45s/15s', de: 'Zügiges Tempo 45s/15s' } },
];

export const HOLD_EXERCISES = new Set(['plank', 'wallsit', 'sideplank']);
export const REPS_BASE = {
  squat: 12, affondo: 10, flessioni: 8, jumpingjack: 20, mountainclimber: 20,
  superman: 10, ponte: 12, crunchbici: 12, russiantwist: 12, ginocchiaalte: 20, burpeetattico: 6,
  crunch: 15, legraise: 12, flutterkick: 20, deadbug: 10, vup: 10, plankjack: 15, skater: 10, heeltap: 14,
};
export function getReps(exId, levelKey) {
  if (HOLD_EXERCISES.has(exId)) return null;
  const base = REPS_BASE[exId] || 10;
  const factor = levelKey === 'recluta' ? 0.75 : levelKey === 'elite' ? 1.35 : 1;
  const v = Math.round(base * factor);
  // per gamba → arrotonda pari
  if (exId === 'affondo' || exId === 'skater') return v % 2 ? v+1 : v;
  return v;
}

export function getLevel(key) { return LEVELS.find(l => l.key === key) || LEVELS[1]; }

export function levelPreset(profile) {
  if (profile && profile.intervalPreset === 'custom') {
    const c = getCustomPreset(profile);
    if (c) return c;
  }
  const lvl = profile && profile.level ? getLevel(profile.level) : null;
  return lvl ? getIntervalPreset(lvl.preset) : getIntervalPreset((profile && profile.intervalPreset) || 'standard');
}

export const PROGRAMS = [
  { id: 'A', difficulty: 2, name: { it: 'ASSALTO PANCIA', en: 'BELLY ASSAULT', de: 'BAUCH-ANGRIFF' }, tagline: { it: 'Core e addominali — la battaglia decisiva', en: 'Core and abs — the decisive battle', de: 'Core und Bauch — die entscheidende Schlacht' }, focus: { it: 'PANCIA', en: 'BELLY', de: 'BAUCH' }, rounds: 2,
    exercises: ['plank', 'crunch', 'legraise', 'sideplank', 'flutterkick', 'vup'] },
  { id: 'B', difficulty: 3, name: { it: 'BRUCIA GRASSI', en: 'FAT BURN', de: 'FETT VERBRENNEN' }, tagline: { it: 'Circuito metabolico per dimagrire', en: 'Metabolic circuit to lose fat', de: 'Metabolischer Zirkel zum Abnehmen' }, focus: { it: 'BRUCIA', en: 'BURN', de: 'BRENNEN' }, rounds: 2,
    exercises: ['jumpingjack', 'skater', 'mountainclimber', 'plankjack', 'burpeetattico', 'ginocchiaalte'] },
  { id: 'C', difficulty: 2, name: { it: 'TOTALE FORZA', en: 'FULL STRENGTH', de: 'VOLLE KRAFT' }, tagline: { it: 'Full body — brucia e costruisci', en: 'Full body — burn and build', de: 'Ganzkörper — verbrennen und aufbauen' }, focus: { it: 'TOTALE', en: 'TOTAL', de: 'TOTAL' }, rounds: 2,
    exercises: ['squat', 'flessioni', 'affondo', 'deadbug', 'superman', 'crunch'] },
  { id: 'D', difficulty: 1, name: { it: 'RECUPERO ATTIVO', en: 'ACTIVE RECOVERY', de: 'AKTIVE ERHOLUNG' }, tagline: { it: 'Mobilità e respiro — giorno di ricarica', en: 'Mobility and breath — recharge day', de: 'Mobilität und Atmung — Auftanktag' }, focus: { it: 'RECUPERO', en: 'RECOVERY', de: 'ERHOLUNG' }, rounds: 1,
    exercises: ['wallsit', 'ponte', 'superman', 'sideplank', 'deadbug'] },
  { id: 'E', difficulty: 2, name: { it: 'PANCIA PIATTA', en: 'FLAT BELLY', de: 'FLACHER BAUCH' }, tagline: { it: 'Brucia grasso e scolpisci il girovita — la missione anti-pancetta', en: 'Burn fat and sculpt your waist — the anti-belly mission', de: 'Fett verbrennen und die Taille formen — die Anti-Bauch-Mission' }, focus: { it: 'GIROVITA', en: 'WAIST', de: 'TAILLE' }, rounds: 2,
    exercises: ['jumpingjack', 'mountainclimber', 'crunchbici', 'russiantwist', 'skater', 'heeltap'] },
  { id: 'F', difficulty: 2, name: { it: 'ADDOMINALI SCOLPITI', en: 'SCULPTED ABS', de: 'BAUCH AUS STAHL' }, tagline: { it: 'Isolamento mirato per addominali definiti come l\'acciaio', en: 'Targeted isolation for steel-defined abs', de: 'Gezieltes Training für stahlharte Bauchmuskeln' }, focus: { it: 'ADDOMINALI', en: 'ABS', de: 'BAUCH' }, rounds: 2,
    exercises: ['crunch', 'legraise', 'vup', 'deadbug', 'flutterkick', 'sideplank'] },
  { id: 'G', difficulty: 3, name: { it: 'SNAGLIATURA TOTALE', en: 'FULL SLIM', de: 'TOTALER SCHLANKHEIT' }, tagline: { it: 'Dimagrisci su tutto il corpo: metabolismo al massimo', en: 'Slim down all over — metabolism on max', de: 'Überall abnehmen — Stoffwechsel auf Maximum' }, focus: { it: 'SNAGLIATURA', en: 'SLIM', de: 'ABNEHMEN' }, rounds: 2,
    exercises: ['burpeetattico', 'ginocchiaalte', 'mountainclimber', 'squat', 'flessioni', 'skater'] },
  { id: 'H', difficulty: 1, name: { it: 'SCHIENA DI FERRO', en: 'IRON BACK', de: 'EISENRÜCKEN' }, tagline: { it: 'Postura e lombari — addio mal di schiena', en: 'Posture & lower back — goodbye back pain', de: 'Haltung & unterer Rücken — bye Rückenschmerz' }, focus: { it: 'SCHIENA', en: 'BACK', de: 'RÜCKEN' }, rounds: 2,
    exercises: ['superman', 'ponte', 'deadbug', 'wallsit', 'sideplank', 'plank'] },
  { id: 'I', difficulty: 1, name: { it: 'CARDIO LEGGERO', en: 'LIGHT CARDIO', de: 'LEICHTES CARDIO' }, tagline: { it: 'Fiato senza impatto — per ginocchia sensibili', en: 'Breath without impact — for sensitive knees', de: 'Atem ohne Impact — für empfindliche Knie' }, focus: { it: 'FIATO', en: 'BREATH', de: 'ATEM' }, rounds: 2,
    exercises: ['ginocchiaalte', 'heeltap', 'ponte', 'crunch', 'sideplank', 'superman'] },
  { id: 'J', difficulty: 2, name: { it: 'BRACCIA D\'ACCIAIO', en: 'STEEL ARMS', de: 'STAHLARME' }, tagline: { it: 'Petto e braccia — spinta a corpo libero', en: 'Chest & arms — bodyweight push', de: 'Brust & Arme — Bodyweight Push' }, focus: { it: 'BRACCIA', en: 'ARMS', de: 'ARME' }, rounds: 2,
    exercises: ['flessioni', 'plankjack', 'mountainclimber', 'deadbug', 'superman', 'crunchbici'] },
  { id: 'K', difficulty: 1, name: { it: 'EQUILIBRIO ZEN', en: 'ZEN BALANCE', de: 'ZEN-GLEICHGEWICHT' }, tagline: { it: 'Stabilità e respiro — mente e core', en: 'Stability & breath — mind and core', de: 'Stabilität & Atmung — Geist und Core' }, focus: { it: 'EQUILIBRIO', en: 'BALANCE', de: 'GLEICHGEWICHT' }, rounds: 2,
    exercises: ['sideplank', 'deadbug', 'ponte', 'wallsit', 'plank', 'superman'] },
  { id: 'L', difficulty: 3, name: { it: 'POTENZA ESPLOSIVA', en: 'EXPLOSIVE POWER', de: 'EXPLOSIVE KRAFT' }, tagline: { it: 'Sprint e salti controllati — potenza over 40', en: 'Sprints & controlled jumps — power over 40', de: 'Sprints & kontrollierte Sprünge — Kraft über 40' }, focus: { it: 'POTENZA', en: 'POWER', de: 'KRAFT' }, rounds: 2,
    exercises: ['burpeetattico', 'skater', 'ginocchiaalte', 'jumpingjack', 'mountainclimber', 'squat'] },
  { id: 'M', difficulty: 3, name: { it: 'CORE ESTREMO', en: 'EXTREME CORE', de: 'EXTREMER CORE' }, tagline: { it: 'Addome d’acciaio — 6 colpi al core', en: 'Steel abs — 6 core hits', de: 'Stahlbauch — 6 Core-Treffer' }, focus: { it: 'CORE', en: 'CORE', de: 'CORE' }, rounds: 2,
    exercises: ['vup', 'russiantwist', 'legraise', 'crunchbici', 'flutterkick', 'heeltap'] },
  // ── PANCIA DEDICATA — 3 nuove missioni over-40, tutte con clip MP4 + focus girovita ──
  { id: 'N', difficulty: 2, name: { it: 'OMBELICO PIATTO', en: 'FLAT NAVEL', de: 'FLACHER NABEL' }, tagline: { it: 'Addome basso + obliqui — pancia piatta in 15′', en: 'Lower abs + obliques — flat belly in 15′', de: 'Unterbauch + Obliques — flacher Bauch in 15 Min' }, focus: { it: 'PANCIA', en: 'BELLY', de: 'BAUCH' }, rounds: 2,
    exercises: ['legraise', 'flutterkick', 'heeltap', 'deadbug', 'crunch', 'sideplank'],
    belly: true },
  { id: 'O', difficulty: 2, name: { it: 'OBLIQUI GUERRIERO', en: 'WARRIOR OBLIQUES', de: 'KRIEGER OBLIQUES' }, tagline: { it: 'Fianchi scolpiti e girovita stretto — maniglie addio', en: 'Sculpted sides & tight waist — love handles gone', de: 'Geformte Seiten & schmale Taille — Love Handles weg' }, focus: { it: 'OBLIQUI', en: 'OBLIQUES', de: 'OBLIQUES' }, rounds: 2,
    exercises: ['russiantwist', 'sideplank', 'heeltap', 'crunchbici', 'plankjack', 'vup'],
    belly: true },
  { id: 'P', difficulty: 3, name: { it: 'CINTURA D’ACCIAIO', en: 'STEEL BELT', de: 'STAHLGÜRTEL' }, tagline: { it: 'Core 360° — cintura addominale a tutta vita', en: 'Core 360° — steel belt around your waist', de: 'Core 360° — Stahlgürtel um die Taille' }, focus: { it: 'CINTURA', en: 'BELT', de: 'GÜRTEL' }, rounds: 2,
    exercises: ['vup', 'legraise', 'russiantwist', 'flutterkick', 'deadbug', 'heeltap'],
    belly: true },
];

export const QUICK_PROGRAM = {
  id: 'Q', name: { it: 'RAFFICA LAMPO', en: 'QUICK BLAST', de: 'BLITZ-RUNDE' }, tagline: { it: 'Per i giorni senza tempo', en: 'For the days with no time', de: 'Für Tage ohne Zeit' }, rounds: 1,
  exercises: ['squat', 'flessioni', 'plank', 'jumpingjack'],
};

export const CAMP_DAYS = 30;
export const DAY_CYCLE = ['A', 'N', 'B', 'O', 'C', 'P', 'K', 'H', 'I', 'J', 'L', 'M', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D'];
// Missioni pancia dedicate — per filtri rapidi e sezione Home
export const BELLY_IDS = ['N', 'O', 'P'];
export const BELLY_PROGRAMS = PROGRAMS.filter(p => p.belly);

export function campDayIndex(profile) {
  const start = profile && profile.campStart ? new Date(profile.campStart) : null;
  if (!start) return 1;
  // local-midnight diff: compare date keys, not raw UTC ms
  const toKey = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const startKey = toKey(start);
  const nowKey = toKey(new Date());
  const s = new Date(startKey);
  const n = new Date(nowKey);
  const diff = Math.round((n - s) / 86400000);
  // uncapped for program rotation, UI caps via Math.min where needed
  return Math.max(1, diff + 1);
}
export function campDayDisplay(profile) {
  return Math.min(CAMP_DAYS, campDayIndex(profile));
}

export function programById(id) {
  return PROGRAMS.find(p => p.id === id) || PROGRAMS[0];
}

export function pickNextProgram(sessions, profile) {
  if (!profile || !profile.campStart || !sessions.length) {
    if (!sessions.length) return { program: PROGRAMS[0], adaptive: false };
    const order = ['A', 'B', 'C'];
    const last = sessions[sessions.length - 1];
    const rotationNextId = order[(order.indexOf(last.programId) + 1) % order.length];
    const hoursSince = (Date.now() - new Date(last.date).getTime()) / 3600000;
    if (last.rpe >= 4 && hoursSince < 20) {
      return { program: programById('D'), adaptive: true };
    }
    return { program: programById(rotationNextId), adaptive: false };
  }
  const idx = campDayIndex(profile);
  let program = programById(DAY_CYCLE[(idx - 1) % DAY_CYCLE.length]);
  const last = sessions[sessions.length - 1];
  const hoursSince = (Date.now() - new Date(last.date).getTime()) / 3600000;
  if (last && last.rpe >= 4 && hoursSince < 20 && program.id !== 'D') {
    return { program: programById('D'), adaptive: true };
  }
  return { program, adaptive: false };
}
