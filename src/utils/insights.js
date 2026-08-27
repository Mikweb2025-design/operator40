import { computeBestStreak } from './stats.js';
import { getConsistencyScore, getStreakRisk } from './progress.js';
import { getGoalHistory } from './goals.js';

export function getDailyInsight({ sessions, profile, waistHistory, weightHistory, lang = 'it' }) {
  const n = sessions?.length || 0;
  const cons = (() => {
    try {
      return getConsistencyScore(sessions, 8);
    } catch {
      return 0;
    }
  })();
  const risk = getStreakRisk(sessions);
  const hist = getGoalHistory(sessions, profile?.weeklyGoal || 3, 4);
  const avgDone = hist.reduce((a, w) => a + w.done, 0) / 4;

  if (n === 0)
    return {
      icon: '🌱',
      title: 'Inizia',
      body:
        lang === 'it'
          ? 'Fai la prima sessione oggi — 15′ bastano.'
          : 'Do first session today — 15′ is enough.',
      color: '#7FB069',
      tip: lang === 'it' ? 'Scegli Assalto Pancia, ritmo dolce.' : 'Pick Belly Assault, easy pace.',
    };
  if (risk === 'at-risk')
    return {
      icon: '⏰',
      title: 'Streak a rischio',
      body:
        lang === 'it'
          ? 'Un giorno al break — 15′ di Recupero Attivo salvano la serie.'
          : 'One day to break — 15′ Active Recovery saves streak.',
      color: '#D9B34C',
      tip: 'Recupero Attivo (D) oggi.',
    };
  if (cons < 35)
    return {
      icon: '🧭',
      title: 'Costanza bassa',
      body:
        lang === 'it'
          ? `Sei al ${cons}% su 8 settimane. Fissa 3 slot fissi.`
          : `You are at ${cons}% over 8 weeks. Fix 3 slots.`,
      color: '#C1440E',
      tip: 'Lun/Mer/Ven 07:30.',
    };
  if (avgDone >= (profile?.weeklyGoal || 3))
    return {
      icon: '🚀',
      title: 'In forma',
      body:
        lang === 'it'
          ? `Media ${avgDone.toFixed(1)}/sett. — alza a ${(profile?.weeklyGoal || 3) + 1} se vuoi spingere.`
          : `Avg ${avgDone.toFixed(1)}/week — raise to ${(profile?.weeklyGoal || 3) + 1} to push.`,
      color: '#7FB069',
      tip: 'Prova Potenza Esplosiva (L).',
    };
  const waist = waistHistory?.length ? waistHistory[waistHistory.length - 1] : null;
  const waistPrev = waistHistory?.length ? waistHistory[0] : null;
  const wDelta = waist && waistPrev ? waist.cm - waistPrev.cm : null;
  if (wDelta != null && wDelta > 1)
    return {
      icon: '📏',
      title: `Girovita +${wDelta}cm`,
      body:
        lang === 'it'
          ? 'Rivedi kcal e passi. Sessioni B/E/G + 8k passi.'
          : 'Check kcal and steps. B/E/G sessions + 8k steps.',
      color: '#B8AE8C',
      tip: 'Brucia Grassi (B) 2×/sett.',
    };
  return {
    icon: '💡',
    title: 'Continua così',
    body:
      lang === 'it'
        ? `Hai ${n} sessioni, streak ${computeBestStreak(sessions)} best. Mantieni ritmo.`
        : `You have ${n} sessions, best streak ${computeBestStreak(sessions)}. Keep rhythm.`,
    color: '#B8AE8C',
    tip: 'Varia stimolo ogni 3-4 giorni.',
  };
}

export function getWeeklyInsight({ sessions, profile, lang = 'it' }) {
  const hist = getGoalHistory(sessions, profile?.weeklyGoal || 3, 8);
  const perfect = hist.filter((h) => h.isDone).length;
  const total = hist.length;
  const pct = Math.round((perfect / total) * 100);
  if (pct >= 75)
    return {
      icon: '🏆',
      title: 'Settimane top',
      body: `${perfect}/${total} perfette — grande costanza!`,
      color: '#7FB069',
    };
  if (pct >= 50)
    return {
      icon: '📈',
      title: 'Buon ritmo',
      body: `${perfect}/${total} perfette — tieni così`,
      color: '#B8AE8C',
    };
  return {
    icon: '🎯',
    title: 'Obiettivo',
    body: `${perfect}/${total} perfette — punta a ${Math.ceil(total * 0.6)}`,
    color: '#D9B34C',
  };
}
