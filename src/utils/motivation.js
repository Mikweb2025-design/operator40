import { computeStreak, computeBestStreak } from './stats.js';
import { getConsistencyScore, getStreakRisk } from './progress.js';
import { sessionDayKey, dayKey } from './date.js';

function daysSinceLastSession(sessions) {
  if (!sessions.length) return 999;
  const last = sessions.reduce((a, b) => new Date(b.date) > new Date(a.date) ? b : a);
  const diff = Math.floor((Date.now() - new Date(last.date).getTime()) / 86400000);
  return diff;
}

const STRESS_TIPS = {
  it: [
    'Tip anti-stress: 4s inspira, 4s trattieni, 4s espira — 3 volte e riparti.',
    'Stress? 2 min di plank + 10 respiri profondi. Bastano.',
    'Pausa 60s: spalle giù, collo lungo, 5 respiri lenti. Poi missione.',
    'Tip: cammina 10 min a pranzo — abbassa cortisolo più di un caffè.',
    'Sotto pressione? Fai 20 squat lenti — scarichi tensione, non la accumuli.',
    'Tip: bevi un bicchiere d’acqua e fai 30″ di superman. Ricarica lampo.',
  ],
  en: [
    'Stress tip: 4s in, 4s hold, 4s out — 3 rounds and go.',
    'Stressed? 2 min plank + 10 deep breaths. Enough.',
    '60s reset: shoulders down, neck long, 5 slow breaths. Then mission.',
    'Tip: 10 min walk at lunch — lowers cortisol more than coffee.',
    'Under pressure? 20 slow squats — release tension.',
  ],
  de: [
    'Anti-Stress-Tipp: 4s ein, 4s halten, 4s aus — 3 Runden.',
    'Gestresst? 2 Min Plank + 10 tiefe Atemzüge.',
    '60s Reset: Schultern runter, Nacken lang, 5 Atemzüge.',
  ],
};

const MOTIVATIONAL_GENERIC = {
  it: [
    'Ogni ripetizione è un investimento sui tuoi 40+.',
    '15 minuti oggi valgono più di un’ora mai fatta.',
    'Costanza > intensità. Un passo alla volta.',
    'Il tuo corpo ricorda ogni missione. Continua.',
    'Non serve essere perfetti, serve non fermarsi.',
  ],
  en: [
    'Every rep is an investment in your 40+.',
    '15 minutes today beats an hour never done.',
    'Consistency > intensity. One step at a time.',
  ],
  de: [
    'Jede Wiederholung ist eine Investition.',
    '15 Minuten heute schlagen eine nie gemachte Stunde.',
  ],
};

export function getMotivationalMessage({ sessions = [], profile = null, lang = 'it', date = new Date() } = {}) {
  const n = sessions.length;
  const streak = computeStreak(sessions);
  const best = computeBestStreak(sessions);
  const missed = daysSinceLastSession(sessions);
  const cons = (() => { try { return getConsistencyScore(sessions, 8); } catch { return 0; } })();
  const risk = getStreakRisk(sessions);
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);

  // 1) comeback se manchi da 2+ giorni
  if (n > 0 && missed >= 2) {
    const titles = {
      it: `Manchi da ${missed} giorni — torna in base! 💪`,
      en: `Away for ${missed} days — come back! 💪`,
      de: `Seit ${missed} Tagen weg — komm zurück! 💪`,
    };
    const bodies = {
      it: missed >= 4
        ? `La serie si è interrotta, ma bastano 15′ di Recupero Attivo per riprendere. Andiamo?`
        : `La tua striscia ti aspetta. Anche 15′ oggi salvano il ritmo.`,
      en: `Your streak awaits. Even 15′ today keeps rhythm.`,
      de: `Deine Serie wartet. Schon 15′ heute halten den Rhythmus.`,
    };
    return {
      title: titles[lang] || titles.it,
      body: bodies[lang] || bodies.it,
      tag: 'o40-comeback',
      type: 'comeback',
    };
  }

  // 2) streak celebration
  if (streak >= 7) {
    const titles = { it: `Sei inarrestabile! 🔥 ${streak} giorni`, en: `Unstoppable! 🔥 ${streak} days`, de: `Unaufhaltsam! 🔥 ${streak} Tage` };
    const bodies = {
      it: `Costanza al ${cons}% — continua così, stai andando alla grande!`,
      en: `Consistency ${cons}% — keep going, you're doing great!`,
      de: `Konstanz ${cons}% — weiter so, du machst es großartig!`,
    };
    return {
      title: titles[lang] || titles.it,
      body: bodies[lang] || bodies.it,
      tag: 'o40-streak',
      type: 'streak',
    };
  }
  if (streak >= 3) {
    const titles = { it: `Continua così! 🔥 ${streak} giorni di fila`, en: `Keep it up! 🔥 ${streak} days`, de: `Weiter so! 🔥 ${streak} Tage` };
    const bodies = {
      it: `Stai andando bene — mantieni il ritmo, il risultato arriva.`,
      en: `You're doing well — keep rhythm.`,
      de: `Du machst es gut — halte den Rhythmus.`,
    };
    return {
      title: titles[lang] || titles.it,
      body: bodies[lang] || bodies.it,
      tag: 'o40-streak',
      type: 'streak',
    };
  }

  // 3) at-risk
  if (risk === 'at-risk') {
    const titles = { it: 'Streak a rischio ⏰', en: 'Streak at risk ⏰', de: 'Serie in Gefahr ⏰' };
    const bodies = {
      it: 'Un giorno al break — 15′ di Recupero Attivo oggi salvano la serie.',
      en: 'One day to break — 15′ Active Recovery saves the streak.',
      de: 'Ein Tag bis zum Bruch — 15′ Aktive Erholung retten die Serie.',
    };
    return {
      title: titles[lang] || titles.it,
      body: bodies[lang] || bodies.it,
      tag: 'o40-risk',
      type: 'risk',
    };
  }

  // 4) prima sessione
  if (n === 0) {
    const titles = { it: 'Inizia oggi 🌱', en: 'Start today 🌱', de: 'Starte heute 🌱' };
    const bodies = {
      it: '15′ bastano per la prima missione. Pancia piatta inizia da qui.',
      en: '15′ is enough for your first mission.',
      de: '15′ reichen für die erste Mission.',
    };
    return {
      title: titles[lang] || titles.it,
      body: bodies[lang] || bodies.it,
      tag: 'o40-start',
      type: 'start',
    };
  }

  // 5) stress tip (1/3 dei giorni)
  if (dayOfYear % 3 === 0) {
    const tips = STRESS_TIPS[lang] || STRESS_TIPS.it;
    const tip = tips[dayOfYear % tips.length];
    const titles = { it: 'Tip anti-stress 🧘', en: 'Anti-stress tip 🧘', de: 'Anti-Stress Tipp 🧘' };
    return {
      title: titles[lang] || titles.it,
      body: tip,
      tag: 'o40-stress',
      type: 'stress',
    };
  }

  // 6) generic motivational
  const generics = MOTIVATIONAL_GENERIC[lang] || MOTIVATIONAL_GENERIC.it;
  const g = generics[dayOfYear % generics.length];
  return {
    title: lang === 'it' ? 'Continua così — stai andando bene 💪' : lang === 'de' ? 'Weiter so — du machst es gut 💪' : 'Keep going — you\'re doing great 💪',
    body: g,
    tag: 'o40-motivation',
    type: 'motivation',
  };
}

// Per cron server: genera payload per Web Push
export function buildPushPayload({ sessions, profile, lang }) {
  const msg = getMotivationalMessage({ sessions, profile, lang });
  return {
    title: msg.title,
    body: msg.body,
    tag: msg.tag,
    url: './',
    data: { type: msg.type },
  };
}
