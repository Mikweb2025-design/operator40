import { sessionDayKey } from './date.js';
import { WEEKLY_GOAL } from './stats.js';
import { getConsistencyScore } from './progress.js';

// Calcola progresso goal settimanale (lunedì-domenica)
export function getGoalProgress(sessions, weeklyGoal = WEEKLY_GOAL) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + 1);
  start.setHours(0, 0, 0, 0);
  const done = (sessions || []).filter((s) => new Date(s.date) >= start).length;
  const pct = Math.min(1, done / weeklyGoal);
  const remain = Math.max(0, weeklyGoal - done);
  const isDone = done >= weeklyGoal;
  return { done, total: weeklyGoal, pct, remain, isDone };
}

// Storico 8 settimane per grafico aderenza goal
export function getGoalHistory(sessions, weeklyGoal = WEEKLY_GOAL, weeks = 8) {
  const now = new Date();
  const byWeek = [];
  for (let w = weeks - 1; w >= 0; w--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + 1 - w * 7);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    const done = (sessions || []).filter((s) => {
      const d = new Date(s.date);
      return d >= weekStart && d < weekEnd;
    }).length;
    const label = weekStart.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' });
    byWeek.push({
      label,
      done,
      goal: weeklyGoal,
      pct: Math.min(1, done / weeklyGoal),
      isDone: done >= weeklyGoal,
    });
  }
  return byWeek;
}

// Suggerisce prossimo goal basato su consistenza
export function suggestNextGoal(sessions, currentGoal = WEEKLY_GOAL) {
  const cons = getConsistencyScore(sessions, 4); // ultime 4 settimane
  const recent = getGoalHistory(sessions, currentGoal, 4);
  const avgDone = recent.reduce((a, w) => a + w.done, 0) / 4;
  if (cons >= 80 && avgDone >= currentGoal) return Math.min(7, currentGoal + 1);
  if (cons < 35 && avgDone < currentGoal * 0.6) return Math.max(1, currentGoal - 1);
  return currentGoal;
}

export function formatGoal(goal) {
  return `${goal} ${goal === 1 ? 'sessione' : 'sessioni'}/sett.`;
}

export function estimateWeeklyCalories(sessions, weeklyGoal = WEEKLY_GOAL) {
  if (!sessions?.length) return weeklyGoal * 180;
  const avgKcal = Math.round(sessions.reduce((a, s) => a + (s.kcal || 0), 0) / sessions.length);
  return weeklyGoal * avgKcal;
}

export function getStreakWeeks(sessions) {
  // settimane consecutive con goal raggiunto
  const history = getGoalHistory(sessions, WEEKLY_GOAL, 12);
  let streak = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].isDone) streak++;
    else break;
  }
  return streak;
}
