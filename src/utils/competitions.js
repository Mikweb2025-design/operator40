import { sessionDayKey } from './date.js';
import { WEEKLY_GOAL, computeBestStreak } from './stats.js';
import { getConsistencyScore } from './progress.js';

// Mock classifica competizione settimanale — 100% locale, niente backend
// In futuro si può sostituire con fetch verso classifica reale

const MOCK_RIVALS = [
  { name: 'Luca', avatar: '🦁', sessions: 5, kcal: 2100, streak: 12, level: 'Tenente' },
  { name: 'Giulia', avatar: '⚡', sessions: 4, kcal: 1850, streak: 9, level: 'Sergente' },
  { name: 'Marco', avatar: '🔥', sessions: 0, kcal: 0, streak: 0, level: 'Recluta' }, // placeholder per utente, sovrascritto
  { name: 'Sara', avatar: '🌟', sessions: 6, kcal: 2400, streak: 18, level: 'Capitano' },
  { name: 'Andrea', avatar: '💪', sessions: 3, kcal: 1650, streak: 5, level: 'Soldato' },
  { name: 'Vale', avatar: '🚀', sessions: 4, kcal: 1950, streak: 7, level: 'Sergente' },
];

export const COMPETITIONS = [
  { id: 'weekly_sessions', title: { it: 'Sprint Settimanale', en: 'Weekly Sprint', de: 'Wochen-Sprint' }, desc: { it: 'Chi fa più sessioni questa settimana?', en: 'Most sessions this week?', de: 'Meiste Sessions diese Woche?' }, icon: '⚡', color: '#C1440E' },
  { id: 'weekly_kcal', title: { it: 'Maratona KCAL', en: 'KCAL Marathon', de: 'KCAL-Marathon' }, desc: { it: 'Più kcal bruciate in 7 giorni', en: 'Most kcal in 7 days', de: 'Meiste KCAL in 7 Tagen' }, icon: '🔥', color: '#E84B2A' },
  { id: 'streak', title: { it: 'Serie d’acciaio', en: 'Streak Steel', de: 'Serie Stahl' }, desc: { it: 'Streak più lunga in corso', en: 'Longest current streak', de: 'Längste aktuelle Serie' }, icon: '🔥', color: '#D9B34C' },
  { id: 'consistency', title: { it: 'Costanza 8W', en: 'Consistency 8W', de: 'Konstanz 8W' }, desc: { it: 'Aderenza 8 settimane', en: '8-week adherence', de: '8-Wochen Konstanz' }, icon: '◎', color: '#7FB069' },
];

function getWeeklyStats(sessions) {
  const now = new Date();
  const start = new Date(now); start.setDate(now.getDate() - now.getDay() + 1); start.setHours(0,0,0,0);
  const weekSessions = (sessions || []).filter(s => new Date(s.date) >= start);
  const kcal = weekSessions.reduce((a,s)=>a+(s.kcal||0),0);
  const bestStreak = computeBestStreak(sessions || []);
  const curStreak = (()=>{ const set=new Set((sessions||[]).map(sessionDayKey)); let cur=new Date(); if(!set.has(cur.toISOString().slice(0,10))) cur.setDate(cur.getDate()-1); let n=0; while(set.has(cur.toISOString().slice(0,10))){n++; cur.setDate(cur.getDate()-1);} return n; })();
  const cons = (()=>{ try{ return getConsistencyScore(sessions,8);}catch{return 0}})();
  return { weekSessions: weekSessions.length, kcal, bestStreak, curStreak, cons };
}

export function getMockLeaderboard(sessions, profile, type = 'weekly_sessions') {
  const stats = getWeeklyStats(sessions);
  const me = {
    name: profile?.name || 'Tu',
    avatar: '👑',
    sessions: stats.weekSessions,
    kcal: stats.kcal,
    streak: stats.curStreak,
    cons: stats.cons,
    level: profile?.level ? profile.level.toUpperCase() : 'RECLUTA',
    isMe: true,
  };
  const rivals = MOCK_RIVALS.filter(r => r.name !== 'Marco').map(r => ({ ...r }));
  const board = [...rivals, me];
  // ordina per tipo
  board.sort((a,b)=>{
    if (type === 'weekly_kcal') return b.kcal - a.kcal;
    if (type === 'streak') return b.streak - a.streak;
    if (type === 'consistency') return (b.cons||0) - (a.cons||0);
    return b.sessions - a.sessions;
  });
  // aggiungi rank e distanza
  board.forEach((u,i)=> u.rank = i+1);
  const myRank = board.find(u=>u.isMe)?.rank || board.length;
  return { board, myRank, me, stats };
}

export function getCurrentCompetition(sessions, profile) {
  // ruota competizione in base alla settimana dell'anno
  const weekNum = Math.floor((Date.now() / 86400000 / 7) % COMPETITIONS.length);
  const comp = COMPETITIONS[weekNum];
  const { board, myRank, me } = getMockLeaderboard(sessions, profile, comp.id);
  const total = board.length;
  const nextRival = board[myRank - 2]; // chi è sopra
  const need = nextRival ? (comp.id === 'weekly_kcal' ? nextRival.kcal - me.kcal + 50 : comp.id === 'streak' ? nextRival.streak - me.streak + 1 : nextRival.sessions - me.sessions + 1) : 0;
  return { competition: comp, board, myRank, total, me, nextRival, need: Math.max(0, need) };
}

export function getCompetitionShareText({ competition, myRank, total, me }, lang = 'it') {
  const title = typeof competition.title === 'object' ? (competition.title[lang] || competition.title.it) : competition.title;
  if (lang === 'de') return `Operator40 — ${title}: Platz ${myRank}/${total} mit ${me.sessions} Sessions! Schaffst du mehr? mikweb.eu/operator40`;
  if (lang === 'en') return `Operator40 — ${title}: Rank ${myRank}/${total} with ${me.sessions} sessions! Can you beat me? mikweb.eu/operator40`;
  return `Operator40 — ${title}: ${myRank}° su ${total} con ${me.sessions} sessioni! Mi batti? mikweb.eu/operator40`;
}
