import { computeBestStreak } from './stats.js';
import { getConsistencyScore } from './progress.js';
import { getGoalHistory } from './goals.js';

// Sfida personale — vs te stesso, non vs altri (sostituisce competizione)
export function getPersonalChallenge(sessions, profile) {
  const n = sessions?.length || 0;
  const bestStreak = computeBestStreak(sessions || []);
  const cons = (() => {
    try {
      return getConsistencyScore(sessions, 8);
    } catch {
      return 0;
    }
  })();
  const weeklyGoal = profile?.weeklyGoal || 3;

  // 1. Prima sfida: completa 3 sessioni
  if (n < 3)
    return {
      id: 'first3',
      title: 'Prime 3',
      desc: 'Completa le prime 3 sessioni',
      target: 3,
      current: n,
      progress: n / 3,
      icon: '🌱',
      color: '#7FB069',
    };
  // 2. Streak 7
  if (bestStreak < 7)
    return {
      id: 'streak7',
      title: 'Settimana perfetta',
      desc: '7 giorni consecutivi',
      target: 7,
      current: bestStreak,
      progress: bestStreak / 7,
      icon: '🔥',
      color: '#C1440E',
    };
  // 3. Consistenza 70%
  if (cons < 70)
    return {
      id: 'cons70',
      title: 'Costanza 70%',
      desc: 'Aderenza 8 settimane al 70%',
      target: 70,
      current: cons,
      progress: cons / 70,
      icon: '◎',
      color: '#7FB069',
    };
  // 4. 10 sessioni
  if (n < 10)
    return {
      id: 's10',
      title: '10 Sessioni',
      desc: 'Raggiungi 10 allenamenti',
      target: 10,
      current: n,
      progress: n / 10,
      icon: '⚡',
      color: '#B8AE8C',
    };
  // 5. 4 settimane perfette
  const hist = getGoalHistory(sessions, weeklyGoal, 8);
  const perfect = hist.filter((h) => h.isDone).length;
  if (perfect < 4)
    return {
      id: 'perfect4',
      title: '4 Sett. Perfette',
      desc: `${weeklyGoal} sess/sett ×4`,
      target: 4,
      current: perfect,
      progress: perfect / 4,
      icon: '★',
      color: '#D9B34C',
    };
  // 6. 25 sessioni / veterano
  if (n < 25)
    return {
      id: 's25',
      title: '25 Sessioni',
      desc: 'Costruisci abitudine',
      target: 25,
      current: n,
      progress: n / 25,
      icon: '🏆',
      color: '#C1440E',
    };
  return {
    id: 'veterano',
    title: 'Veterano',
    desc: '100 sessioni — leggenda',
    target: 100,
    current: n,
    progress: Math.min(1, n / 100),
    icon: '👑',
    color: '#B8AE8C',
  };
}

export function getPersonalChallengeText(ch, lang = 'it') {
  const pct = Math.round(ch.progress * 100);
  if (lang === 'de') return `${ch.icon} ${ch.title}: ${ch.current}/${ch.target} (${pct}%)`;
  if (lang === 'en') return `${ch.icon} ${ch.title}: ${ch.current}/${ch.target} (${pct}%)`;
  return `${ch.icon} ${ch.title}: ${ch.current}/${ch.target} (${pct}%)`;
}

export function getRecoveryTip(sessions, lang = 'it') {
  const last = sessions?.length ? sessions[sessions.length - 1] : null;
  if (!last)
    return lang === 'it'
      ? 'Inizia con 2 sessioni leggere a settimana.'
      : 'Start with 2 light sessions/week.';
  const rpe = last.rpe;
  if (rpe >= 4)
    return lang === 'it'
      ? 'Ultima dura — oggi fai mobilità + camminata, non forzare.'
      : 'Last was hard — mobility + walk today.';
  if (rpe <= 2)
    return lang === 'it'
      ? 'Eri leggero — puoi spingere oggi.'
      : 'You were light — you can push today.';
  return lang === 'it' ? 'Mantieni ritmo, ascolta il corpo.' : 'Keep rhythm, listen to body.';
}
