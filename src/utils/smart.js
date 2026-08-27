import { computeBestStreak, getRank } from './stats.js';
import { getConsistencyScore, getStreakRisk } from './progress.js';
import { getGoalHistory } from './goals.js';
import { tr } from '../i18n.js';

// Smart insights — 100% locale, niente AI cloud, regole + euristica
export function getSmartInsight({ sessions, profile, waistHistory, weightHistory, lang = 'it' }) {
  const n = sessions?.length || 0;
  if (n === 0) {
    return {
      icon: '🌱',
      title: lang === 'it' ? 'Inizia leggero' : lang === 'de' ? 'Leicht starten' : 'Start light',
      body:
        lang === 'it'
          ? '2–3 sessioni a settimana bastano per i primi 14 giorni. Costanza batte intensità.'
          : '2–3 sessions/week for first 14 days. Consistency beats intensity.',
      color: '#7FB069',
    };
  }
  const streak = (() => {
    const s = new Set(sessions.map((v) => v.date.slice(0, 10)));
    let cur = new Date();
    if (!s.has(cur.toISOString().slice(0, 10))) cur.setDate(cur.getDate() - 1);
    let n = 0;
    while (s.has(cur.toISOString().slice(0, 10))) {
      n++;
      cur.setDate(cur.getDate() - 1);
    }
    return n;
  })();
  const cons = getConsistencyScore(sessions, 8);
  const risk = getStreakRisk(sessions);
  const waist = waistHistory?.length ? waistHistory[waistHistory.length - 1] : null;
  const waistPrev = waistHistory?.length > 1 ? waistHistory[0] : null;
  const wDelta = waist && waistPrev ? waist.cm - waistPrev.cm : null;

  if (risk === 'at-risk') {
    return {
      icon: '⚠️',
      title: lang === 'it' ? 'Rischio streak' : 'Streak at risk',
      body:
        lang === 'it'
          ? 'Sei a 1 giorno dal break — 15′ oggi salvano la serie.'
          : '1 day from break — 15′ today saves the streak.',
      color: '#D9B34C',
    };
  }
  if (cons < 40) {
    return {
      icon: '🧭',
      title: lang === 'it' ? 'Costanza bassa' : 'Low consistency',
      body:
        lang === 'it'
          ? `Sei al ${cons}% su 8 settimane. Prova a fissare 3 slot fissi e usa “Recupero Attivo” nei giorni no.`
          : `You’re at ${cons}% over 8 weeks. Fix 3 slots and use Active Recovery on off days.`,
      color: '#C1440E',
    };
  }
  if (wDelta != null && wDelta > 0) {
    return {
      icon: '📏',
      title: lang === 'it' ? 'Girovita +' + wDelta + 'cm' : `Waist +${wDelta}cm`,
      body:
        lang === 'it'
          ? 'Controlla kcal e sonno. Le sessioni brucia-grassi (B/E/G) + 8k passi aiutano.'
          : 'Check kcal and sleep. Fat-burn sessions + 8k steps help.',
      color: '#B8AE8C',
    };
  }
  if (streak >= 7) {
    return {
      icon: '🔥',
      title: lang === 'it' ? `Fuoco! ${streak} giorni` : `On fire! ${streak} days`,
      body:
        lang === 'it'
          ? 'Streak solida — mantieni con 1 sessione leggera se sei stanco.'
          : 'Solid streak — keep with 1 light session if tired.',
      color: '#C1440E',
    };
  }
  const recentRpe = sessions
    .slice(-3)
    .map((s) => s.rpe)
    .filter((v) => v != null);
  if (recentRpe.length >= 2 && recentRpe.every((v) => v >= 4)) {
    return {
      icon: '🧘',
      title: lang === 'it' ? 'Intensità alta' : 'High intensity',
      body:
        lang === 'it'
          ? '2 sessioni dure di fila — domani fai Recupero Attivo o camminata.'
          : '2 hard sessions in a row — do Active Recovery tomorrow.',
      color: '#7FB069',
    };
  }
  return {
    icon: '💡',
    title: lang === 'it' ? 'Continua così' : 'Keep going',
    body:
      lang === 'it'
        ? `Hai ${n} sessioni, streak ${streak}. Prossimo livello: ${getRank(n).next ? getRank(n).next.min - n + ' sessioni' : 'veterano!'}`
        : `You have ${n} sessions, streak ${streak}.`,
    color: '#B8AE8C',
  };
}

export function getSmartRecommendation({ sessions, profile, lang = 'it' }) {
  const n = sessions?.length || 0;
  const last = n ? sessions[n - 1] : null;
  if (!last)
    return {
      programId: 'A',
      reason:
        lang === 'it' ? 'Parti con Assalto Pancia, tecnico ma dolce.' : 'Start with Belly Assault.',
    };
  // se ultima RPE alta, consiglia recupero
  if (last.rpe >= 4)
    return {
      programId: 'D',
      reason:
        lang === 'it'
          ? 'Ultima dura — oggi Recupero Attivo.'
          : 'Last was hard — Active Recovery today.',
    };
  // se streak a rischio, consiglia breve
  const risk = getStreakRisk(sessions);
  if (risk === 'at-risk')
    return {
      programId: 'I',
      reason:
        lang === 'it'
          ? 'Streak a rischio — Cardio Leggero per non rompere.'
          : 'Streak at risk — Light Cardio to keep it.',
    };
  // altrimenti ruota in base a consistenza
  const cons = getConsistencyScore(sessions, 4);
  if (cons > 75)
    return {
      programId: 'L',
      reason:
        lang === 'it'
          ? 'Costanza top — prova Potenza Esplosiva.'
          : 'Top consistency — try Explosive Power.',
    };
  if (cons < 40)
    return {
      programId: 'H',
      reason: lang === 'it' ? 'Riparti con Schiena di Ferro, dolce.' : 'Restart with Iron Back.',
    };
  // default: programma meno usato
  const counts = {};
  sessions.forEach((s) => (counts[s.programId] = (counts[s.programId] || 0) + 1));
  const least = Object.entries(counts).sort((a, b) => a[1] - b[1])[0]?.[0];
  if (least)
    return {
      programId: least,
      reason:
        lang === 'it'
          ? 'Varia lo stimolo — tocca il meno usato.'
          : 'Vary stimulus — hit the least used.',
    };
  return {
    programId: 'B',
    reason: lang === 'it' ? 'Brucia Grassi per ritmo.' : 'Fat Burn for pace.',
  };
}

export function getSmartWeeklyPlan({ sessions, profile, lang = 'it' }) {
  const hist = getGoalHistory(sessions, profile?.weeklyGoal || 3, 4);
  const avgDone = hist.reduce((a, w) => a + w.done, 0) / 4;
  const cons = getConsistencyScore(sessions, 4);
  let plan = [];
  if (avgDone < 2) plan = ['A', 'H', 'D'];
  else if (cons > 70) plan = ['B', 'C', 'E', 'D'];
  else plan = ['A', 'B', 'D'];
  return { plan, avgDone: Math.round(avgDone * 10) / 10, cons };
}
