import { sessionDayKey, dayKey } from './date.js';
import { computeBestStreak } from './stats.js';
import { getConsistencyScore } from './progress.js';

export const ACHIEVEMENTS = [
  { id: 'first', title: { it: 'Primo passo', en: 'First Step', de: 'Erster Schritt' }, desc: { it: 'Completa la prima sessione', en: 'Complete first session', de: 'Erste Session' }, icon: '🌱', color: '#7FB069', check: (s) => s.length >= 1, progress: (s) => Math.min(1, s.length / 1) },
  { id: 'streak3', title: { it: 'Scintilla', en: 'Spark', de: 'Funke' }, desc: { it: '3 giorni di fila', en: '3 days streak', de: '3 Tage Serie' }, icon: '✨', color: '#D9B34C', check: (s) => computeBestStreak(s) >= 3, progress: (s) => Math.min(1, computeBestStreak(s) / 3) },
  { id: 'streak7', title: { it: 'Settimana di fuoco', en: 'Fire Week', de: 'Feuerwoche' }, desc: { it: '7 giorni di fila', en: '7 days streak', de: '7 Tage Serie' }, icon: '🔥', color: '#C1440E', check: (s) => computeBestStreak(s) >= 7, progress: (s) => Math.min(1, computeBestStreak(s) / 7) },
  { id: 's5', title: { it: 'Ingranaggio', en: 'Gear Up', de: 'Auf Touren' }, desc: { it: '5 sessioni totali', en: '5 sessions', de: '5 Sessions' }, icon: '⚙️', color: '#B8AE8C', check: (s) => s.length >= 5, progress: (s) => Math.min(1, s.length / 5) },
  { id: 's25', title: { it: 'Costruttore', en: 'Builder', de: 'Erbauer' }, desc: { it: '25 sessioni', en: '25 sessions', de: '25 Sessions' }, icon: '🏗️', color: '#8A8578', check: (s) => s.length >= 25, progress: (s) => Math.min(1, s.length / 25) },
  { id: 'k5000', title: { it: 'Fornace', en: 'Furnace', de: 'Ofen' }, desc: { it: '5.000 kcal bruciate', en: '5k kcal burned', de: '5k kcal' }, icon: '🔥', color: '#E84B2A', check: (s) => s.reduce((a,v)=>a+(v.kcal||0),0) >= 5000, progress: (s) => Math.min(1, s.reduce((a,v)=>a+(v.kcal||0),0)/5000) },
  { id: 'cons70', title: { it: 'Metronomo', en: 'Metronome', de: 'Metronom' }, desc: { it: '70% costanza 8 sett.', en: '70% consistency 8w', de: '70% Konstanz 8W' }, icon: '◎', color: '#7FB069', check: (s) => { try{ return getConsistencyScore(s,8) >= 70; }catch{return false}}, progress: (s) => { try{ return Math.min(1, getConsistencyScore(s,8)/70);}catch{return 0}} },
  { id: 'perfect4', title: { it: 'Quadrifoglio', en: 'Clover', de: 'Klee' }, desc: { it: '4 settimane perfette', en: '4 perfect weeks', de: '4 perfekte Wochen' }, icon: '🍀', color: '#D9B34C', check: (s) => { const hist = getGoalHistoryMock(s); return hist.filter(h=>h.isDone).length >=4; }, progress: (s) => { const hist = getGoalHistoryMock(s); return Math.min(1, hist.filter(h=>h.isDone).length/4); } },
];

function getGoalHistoryMock(sessions) {
  // replica leggera per achievements senza import circolare
  const now = new Date();
  const hist = [];
  for (let w = 0; w < 8; w++) {
    const ws = new Date(now); ws.setDate(now.getDate() - now.getDay() + 1 - w*7); ws.setHours(0,0,0,0);
    const we = new Date(ws); we.setDate(ws.getDate()+7);
    const done = (sessions||[]).filter(x=>{ const d=new Date(x.date); return d>=ws && d<we; }).length;
    hist.push({ isDone: done >= 3 });
  }
  return hist;
}

export function getAchievementsProgress(sessions) {
  return ACHIEVEMENTS.map(a => ({
    ...a,
    unlocked: !!a.check(sessions || []),
    progress: a.progress(sessions || []),
  }));
}

export function getUnlockedAchievements(sessions) {
  return getAchievementsProgress(sessions).filter(a => a.unlocked);
}

export function getNextAchievements(sessions, limit = 3) {
  return getAchievementsProgress(sessions).filter(a => !a.unlocked).sort((a,b)=>b.progress - a.progress).slice(0, limit);
}
