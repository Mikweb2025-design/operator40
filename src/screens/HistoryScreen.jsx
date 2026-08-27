import React, { useState } from 'react';
import { useT } from '../context/LangContext.jsx';
import { INK, INK_2, PAPER, OLIVE, OLIVE_DARK, KHAKI, BLAZE, BLAZE_DEEP, STEEL } from '../constants/theme.js';
import { tr } from '../i18n.js';
import { LOCALES } from '../i18n.js';
import { EXERCISES } from '../data/exercises.js';
import { PROGRAMS } from '../data/programs.js';
import { computeStreak, computeBestStreak, WEEKLY_GOAL, RPE_LABELS, RPE_COLORS, getRank, nextBadge, getMedalProgress, getNextMedals, getPersonalRecords, getMonthlyTrend, buildHeatmap, buildYearHeatmap } from '../utils/stats.js';
import { exportCSV, buildCalendarGrid } from '../utils/export.js';
import { calcBMI, bmiCategory, estimateTDEE, simpleMealHint } from '../utils/bmi.js';
import { estimateBodyFat, whtCategory } from '../utils/body.js';
import { getWeeklyProgress, getConsistencyScore, getAveragePace, getStreakRisk } from '../utils/progress.js';
import { getGoalProgress, getGoalHistory, suggestNextGoal, formatGoal, estimateWeeklyCalories, getStreakWeeks } from '../utils/goals.js';
import { GoalRing, MiniGoalBar } from '../components/GoalRing.jsx';
import { getDailyInsight, getWeeklyInsight } from '../utils/insights.js';
import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx';
import { shareStatsImage } from '../utils/shareImage.js';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Flame, HeartPulse, Zap, Star, Target, Medal, Crown, TrendingUp, TrendingDown, Ruler, Scale, Lightbulb, X, Check, RotateCcw, Sparkles } from 'lucide-react';
import TopBar from '../components/layout/TopBar.jsx';
const secondaryBtn = { background: INK_2, border: `1px solid ${KHAKI}`, color: PAPER, borderRadius: 14, padding: '12px 16px', fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: '0.05em', cursor: 'pointer' };
const primaryBtn = { background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, color: PAPER, border: 'none', borderRadius: 14, padding: '12px 16px', fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: '0.05em', cursor: 'pointer' };
const btnIcon = { background: 'transparent', border: 'none', padding: 6, cursor: 'pointer', display: 'flex', borderRadius: 10 };
const inputStyle = { width: '100%', background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: '12px 14px', color: PAPER, fontSize: 16, fontFamily: 'Inter, sans-serif', outline: 'none' };
function DogTag({ label, value, sub }) { const numeric = typeof value === 'number'; return (<div className="o40-card" style={{ background: `linear-gradient(160deg, ${INK_2}, ${INK})`, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '12px 13px', position: 'relative', flex: 1, minWidth: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.35)' }}><div style={{ position: 'absolute', top: 9, left: -5, width: 10, height: 10, borderRadius: '50%', background: INK, border: `2px solid ${KHAKI}` }} /><div className="o40-mono" style={{ color: KHAKI, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div><div className="o40-display" style={{ color: PAPER, fontSize: 26, lineHeight: 1.1 }}>{numeric ? value : value}</div>{sub && <div style={{ color: STEEL, fontSize: 11 }}>{sub}</div>}</div>); }
// last7DaysKcal, missionCounts, Badge, MedalGrid, formatTime, dayKey, sessionDayKey defined in block below — don't duplicate

/* ================= HISTORY / STATS SCREEN ================= */
function last7DaysKcal(sessions, locale) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = dayKey(d);
    const label = d.toLocaleDateString(locale || 'it-IT', { weekday: 'short' }).slice(0, 3);
    const kcal = Math.round(sessions.filter(s => sessionDayKey(s) === key).reduce((a, s) => a + s.kcal, 0));
    days.push({ label, kcal });
  }
  return days;
}
function missionCounts(sessions) {
  const counts = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 };
  sessions.forEach(s => { if (counts[s.programId] !== undefined) counts[s.programId]++; });
  return counts;
}
function Badge({ label, unlocked, value, color = BLAZE, icon = 'trophy', progress = 1 }) {
  const Icon = icon === 'fire' ? Flame : icon === 'zap' ? Zap : icon === 'star' ? Star : icon === 'target' ? Target : Trophy;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1, minWidth: 52,
      opacity: unlocked ? 1 : 0.55,
      transform: unlocked ? 'scale(1)' : 'scale(0.96)',
      transition: 'all 0.2s ease',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: unlocked ? `radial-gradient(circle at 30% 30%, ${color}, ${INK})` : INK_2,
        border: `1px solid ${unlocked ? color : OLIVE}`,
        boxShadow: unlocked ? `0 0 12px ${color}66, inset 0 1px 1px rgba(255,255,255,0.15)` : 'none',
        position: 'relative', overflow: 'hidden',
      }}>
        <Icon size={18} color={unlocked ? PAPER : STEEL} style={{ filter: unlocked ? `drop-shadow(0 1px 2px rgba(0,0,0,0.4))` : 'none' }} />
        {!unlocked && progress > 0 && progress < 1 && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: OLIVE_DARK }}>
            <div style={{ width: `${Math.round(progress * 100)}%`, height: '100%', background: color, transition: 'width 0.4s ease' }} />
          </div>
        )}
        {unlocked && <div style={{ position: 'absolute', inset: -2, borderRadius: '50%', border: `1px solid ${color}44`, animation: 'badgePulse 1.6s ease-in-out infinite' }} />}
      </div>
      <div className="o40-mono" style={{ color: unlocked ? PAPER : STEEL, fontSize: 10, fontWeight: unlocked ? 700 : 400 }}>{value}</div>
      <div style={{ color: unlocked ? KHAKI : STEEL, fontSize: 8.5, textAlign: 'center', lineHeight: 1.2, minHeight: 20 }}>{label}</div>
    </div>
  );
}

function MedalGrid({ sessions }) {
  const { all, unlocked } = getMedalProgress(sessions);
  const byType = {
    streak: all.filter(m => m.type === 'streak'),
    sessions: all.filter(m => m.type === 'sessions'),
    kcal: all.filter(m => m.type === 'kcal'),
    consistency: all.filter(m => m.type === 'consistency'),
    perfect: all.filter(m => m.type === 'perfect'),
  };
  const next = getNextMedals(sessions, 3);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {[
        { key: 'streak', title: 'SERIE', icon: 'fire' },
        { key: 'sessions', title: 'SESSIONI', icon: 'zap' },
        { key: 'kcal', title: 'KCAL', icon: 'target' },
        { key: 'consistency', title: 'COSTANZA', icon: 'star' },
        { key: 'perfect', title: 'SETT. PERFETTE', icon: 'star' },
      ].map(cat => (
        <div key={cat.key}>
          <div className="o40-mono" style={{ color: STEEL, fontSize: 9, letterSpacing: '0.08em', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            {cat.title} <span style={{ color: unlocked.filter(m => m.type === cat.key).length ? '#7FB069' : STEEL, fontSize: 9 }}>{unlocked.filter(m => m.type === cat.key).length}/{byType[cat.key].length}</span>
          </div>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
            {byType[cat.key].map(m => (
              <Badge key={`${m.type}-${m.n}`} label={m.label} value={m.n} unlocked={m.unlocked} color={m.color} icon={m.type === 'streak' ? 'fire' : m.type === 'kcal' ? 'target' : m.type === 'perfect' ? 'star' : 'trophy'} progress={m.progress} />
            ))}
          </div>
        </div>
      ))}
      {next.length > 0 && (
        <div style={{ background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK})`, border: `1px solid ${KHAKI}33`, borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={14} color={KHAKI} />
          <span style={{ color: KHAKI, fontSize: 11, flex: 1 }}>Prossime: {next.map(m => `${m.icon} ${m.n}${m.type === 'kcal' ? '' : m.type === 'streak' ? 'gg' : ''} (${Math.round(m.progress*100)}%)`).join(' • ')}</span>
        </div>
      )}
    </div>
  );
}

function HistoryScreen({ sessions, profile, waistHistory, weightHistory, photos, onAddPhoto, onBack, onClear, onUpdateGoal, onDeleteSession }) {
  const { lang, t } = useT();
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmDeleteDate, setConfirmDeleteDate] = useState(null);
  const ordered = [...sessions].reverse();
  const hrData = sessions.filter(s => s.peakHR).map((s, i) => ({
    idx: i + 1, hr: s.peakHR, label: new Date(s.date).toLocaleDateString(LOCALES[lang], { day: '2-digit', month: '2-digit' }),
  }));
  const waistData = [...waistHistory].sort((a, b) => new Date(a.date) - new Date(b.date)).map((w, i) => ({
    idx: i + 1, cm: w.cm, label: new Date(w.date).toLocaleDateString(LOCALES[lang], { day: '2-digit', month: '2-digit' }),
  }));
  const weightData = [...weightHistory].sort((a, b) => new Date(a.date) - new Date(b.date)).map((w, i) => ({
    idx: i + 1, kg: w.kg, label: new Date(w.date).toLocaleDateString(LOCALES[lang], { day: '2-digit', month: '2-digit' }),
  }));
  const streak = computeStreak(sessions);
  const bestStreak = computeBestStreak(sessions);
  const weekData = last7DaysKcal(sessions, LOCALES[lang]);
  const counts = missionCounts(sessions);
  const maxCount = Math.max(1, counts.A, counts.B, counts.C, counts.D, counts.E, counts.F, counts.G);
  const totalKcal = Math.round(sessions.reduce((a, s) => a + s.kcal, 0));
  const weeklyGoal = profile.weeklyGoal || WEEKLY_GOAL;
  const heatmap = buildHeatmap(sessions, 35);
  const now = Date.now();
  const thisWeekKcal = sessions.filter(s => new Date(s.date).getTime() > now - 7 * 86400000).reduce((a, s) => a + s.kcal, 0);
  const lastWeekKcal = sessions.filter(s => { const t = new Date(s.date).getTime(); return t <= now - 7 * 86400000 && t > now - 14 * 86400000; }).reduce((a, s) => a + s.kcal, 0);
  const trendPct = lastWeekKcal > 0 ? Math.round(((thisWeekKcal - lastWeekKcal) / lastWeekKcal) * 100) : null;
  const totalSec = sessions.reduce((a, s) => a + (s.durationSec || 780), 0);
  const totalMin = Math.round(totalSec / 60);
  const avgKcal = sessions.length ? Math.round(totalKcal / sessions.length) : 0;
  const pr = getPersonalRecords(sessions);
  const yearHeat = buildYearHeatmap(sessions);
  const rpeSeries = sessions.filter(s => s.rpe != null).map((s, i) => ({
    idx: i + 1, rpe: s.rpe, label: new Date(s.date).toLocaleDateString(LOCALES[lang], { day: '2-digit', month: '2-digit' }),
  }));
  const avgRpe = rpeSeries.length ? rpeSeries.reduce((a, b) => a + b.rpe, 0) / rpeSeries.length : null;
  const bestWeekKcal = (() => {
    let best = 0;
    sessions.forEach(s => {
      const t = new Date(s.date).getTime();
      const wk = sessions.filter(x => { const d = new Date(x.date).getTime(); return d >= t - 7 * 86400000 && d < t; }).reduce((a, x) => a + x.kcal, 0);
      best = Math.max(best, wk);
    });
    return Math.round(best);
  })();
  const sessionsPerWeek = sessions.length >= 2 ? (sessions.length / Math.max(1, Math.round((new Date(sessions[sessions.length - 1].date) - new Date(sessions[0].date)) / (7 * 86400000)))) : sessions.length;

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar title={t('hist.title')} onBack={onBack} />
      <div className="o40-scroll" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          <DogTag label={t('dt.streak')} value={streak} sub={streak === 1 ? t('dt.day') : t('dt.days')} />
          <DogTag label={t('dt.record')} value={bestStreak} sub={t('dt.beststreak')} />
          <DogTag label={t('dt.kcal')} value={totalKcal} sub={t('dt.total')} />
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          <DogTag label={t('dt.minutes')} value={totalMin} sub={t('dt.trained')} />
          <DogTag label={t('dt.avgkcal')} value={avgKcal} sub={t('dt.permission')} />
          <DogTag label={t('dt.weeks')} value={sessionsPerWeek.toFixed(1)} sub={t('dt.perweek')} />
        </div>

        {pr && (
          <div className="o40-card-glass" style={{ display: 'flex', gap: 10, marginBottom: 18, padding: 12, borderRadius: 12 }}>
            <div style={{ flex: 1, textAlign: 'center' }}><div className="o40-mono" style={{ color: KHAKI, fontSize: 10 }}>MAX KCAL</div><div className="o40-display" style={{ color: BLAZE, fontSize: 20 }}>{pr.maxKcal}</div></div>
            <div style={{ width: 1, background: OLIVE_DARK }} />
            <div style={{ flex: 1, textAlign: 'center' }}><div className="o40-mono" style={{ color: KHAKI, fontSize: 10 }}>MAX STREAK</div><div className="o40-display" style={{ color: PAPER, fontSize: 20 }}>{pr.maxStreak}🔥</div></div>
            <div style={{ width: 1, background: OLIVE_DARK }} />
            <div style={{ flex: 1, textAlign: 'center' }}><div className="o40-mono" style={{ color: KHAKI, fontSize: 10 }}>TOTALE</div><div className="o40-display" style={{ color: KHAKI, fontSize: 20 }}>{pr.totalMin}′</div></div>
          </div>
        )}

        {avgRpe !== null && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12 }}>
            <HeartPulse size={17} color={BLAZE} />
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('hist.avgint')}</span>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span className="o40-display" style={{ color: RPE_COLORS[Math.round(avgRpe) - 1] || BLAZE, fontSize: 24 }}>{avgRpe.toFixed(1)}</span>
              <span style={{ color: STEEL, fontSize: 11 }}>/ 6</span>
            </div>
          </div>
        )}

        {bestWeekKcal > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12 }}>
            <Trophy size={16} color={KHAKI} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: PAPER, fontSize: 13, fontWeight: 600 }}>{t('hist.bestweek.title')}</div>
              <div style={{ color: STEEL, fontSize: 11.5 }}>{t('hist.bestweek.sub')}</div>
            </div>
            <span className="o40-display" style={{ color: BLAZE, fontSize: 22 }}>{bestWeekKcal}</span>
            <span style={{ color: STEEL, fontSize: 10.5 }}>{t('hist.kcal.unit')}</span>
          </div>
        )}

        {(() => {
          const wp = getWeeklyProgress(sessions, weeklyGoal);
          const cons = getConsistencyScore(sessions);
          const pace = getAveragePace(sessions);
          const risk = getStreakRisk(sessions);
          return (
            <div style={{ marginBottom: 18, background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }}>
              <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, letterSpacing: '0.06em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Zap size={12} color={BLAZE} /> ADERENZA 8 SETTIMANE</div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <div style={{ flex: 1, background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
                  <div className="o40-display" style={{ color: cons >= 70 ? '#7FB069' : cons >= 40 ? KHAKI : BLAZE, fontSize: 22 }}>{cons}%</div>
                  <div className="o40-mono" style={{ color: STEEL, fontSize: 9 }}>CONSISTENZA</div>
                  <div style={{ height: 4, borderRadius: 2, background: OLIVE_DARK, marginTop: 6, overflow: 'hidden' }}><div style={{ width: `${cons}%`, height: '100%', background: cons >= 70 ? '#7FB069' : cons >= 40 ? KHAKI : BLAZE }} /></div>
                </div>
                <div style={{ flex: 1, background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
                  <div className="o40-display" style={{ color: wp.isDone ? '#7FB069' : BLAZE, fontSize: 22 }}>{wp.done}/{wp.total}</div>
                  <div className="o40-mono" style={{ color: STEEL, fontSize: 9 }}>SETTIMANA</div>
                  <div style={{ color: risk === 'ok' ? '#7FB069' : risk === 'at-risk' ? KHAKI : BLAZE, fontSize: 10, marginTop: 4 }}>{risk === 'ok' ? '● ok' : risk === 'at-risk' ? '◐ a rischio' : '○ break'}</div>
                </div>
                <div style={{ flex: 1, background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
                  <div className="o40-display" style={{ color: PAPER, fontSize: 18 }}>{pace ? `${pace.avgMin}′` : '—'}</div>
                  <div className="o40-mono" style={{ color: STEEL, fontSize: 9 }}>MEDIA</div>
                  <div style={{ color: KHAKI, fontSize: 10, marginTop: 4 }}>{pace ? `${pace.avgKcal} kcal` : 'n/d'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: STEEL, fontSize: 11 }}>
                <span>Goal {weeklyGoal}/sett.</span>
                <span style={{ color: wp.isDone ? '#7FB069' : KHAKI }}>{wp.isDone ? 'Completata!' : `${wp.remain} mancanti`}</span>
              </div>
            </div>
          );
        })()}

        {(() => {
          const daily = getDailyInsight({ sessions, profile, waistHistory, weightHistory, lang });
          const weekly = getWeeklyInsight({ sessions, profile, lang });
          return (
            <div style={{ marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ background: `linear-gradient(135deg, ${daily.color}18, ${INK_2})`, border: `1px solid ${daily.color}55`, borderRadius: 14, padding: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ fontSize: 22 }}>{daily.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: PAPER, fontSize: 13, fontWeight: 600 }}>{daily.title} <span style={{ color: STEEL, fontSize: 11, fontWeight: 400 }}>· {daily.tip}</span></div>
                  <div style={{ color: STEEL, fontSize: 11.5, marginTop: 2, lineHeight: 1.4 }}>{daily.body}</div>
                </div>
                <Sparkles size={16} color={daily.color} style={{ flexShrink: 0 }} />
              </div>
              <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ fontSize: 18 }}>{weekly.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: PAPER, fontSize: 13, fontWeight: 600 }}>{weekly.title}</div>
                  <div style={{ color: STEEL, fontSize: 11.5, marginTop: 2 }}>{weekly.body}</div>
                </div>
                <div style={{ color: weekly.color, fontSize: 18, fontWeight: 700 }}>{weekly.body.split('/')[0]?.trim()}</div>
              </div>
            </div>
          );
        })()}

        <div style={{ marginBottom: 20 }}>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t('hist.goal.title')}</div>
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: PAPER, fontSize: 13 }}>{t('hist.goal.label')}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <button onClick={() => onUpdateGoal(weeklyGoal - 1)} disabled={weeklyGoal <= 1} style={{ ...iconCircle, width: 30, height: 30, opacity: weeklyGoal <= 1 ? 0.4 : 1 }}>
                  <span style={{ color: PAPER, fontSize: 16, lineHeight: 1 }}>–</span>
                </button>
                <span className="o40-display" style={{ color: PAPER, fontSize: 22, minWidth: 20, textAlign: 'center' }}>{weeklyGoal}</span>
                <button onClick={() => onUpdateGoal(weeklyGoal + 1)} disabled={weeklyGoal >= 7} style={{ ...iconCircle, width: 30, height: 30, opacity: weeklyGoal >= 7 ? 0.4 : 1 }}>
                  <span style={{ color: PAPER, fontSize: 16, lineHeight: 1 }}>+</span>
                </button>
              </div>
            </div>
            {(() => {
              const hist = getGoalHistory(sessions, weeklyGoal, 8);
              const sugg = suggestNextGoal(sessions, weeklyGoal);
              const streakW = getStreakWeeks(sessions);
              return (
                <div>
                  <MiniGoalBar history={hist} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, color: STEEL, fontSize: 11 }}>
                    <span>8 sett. · {streakW} {streakW === 1 ? 'settimana' : 'settimane'} streak</span>
                    {sugg !== weeklyGoal && <span style={{ color: KHAKI }}><Lightbulb size={10} style={{ verticalAlign: 'middle', marginRight: 4 }} />Suggerito: {formatGoal(sugg)}</span>}
                  </div>
                  <div style={{ color: STEEL, fontSize: 10.5, marginTop: 4 }}>~{estimateWeeklyCalories(sessions, weeklyGoal)} kcal/sett. a goal {weeklyGoal}</div>
                </div>
              );
            })()}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t('hist.35d')}</div>
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5 }}>
              {heatmap.map(c => (
                <div key={c.key} title={c.key} style={{
                  aspectRatio: '1 / 1', borderRadius: 3,
                  background: c.active ? BLAZE : OLIVE_DARK, opacity: c.active ? 1 : 0.6,
                }} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Anno · {new Date().getFullYear()}</div>
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(26, 1fr)', gap: 2 }}>
              {yearHeat.map(c => (
                <div key={c.key} title={`${c.key} · ${c.count || 0}`} style={{ aspectRatio: '1/1', borderRadius: 2, background: c.count ? (c.count > 1 ? BLAZE : OLIVE) : OLIVE_DARK, opacity: c.count ? 1 : 0.5 }} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Medal size={12} color={KHAKI} /> {t('hist.milestones')} <span style={{ color: STEEL, fontSize: 10, marginLeft: 6 }}>{getMedalProgress(sessions).unlocked.length}/{getMedalProgress(sessions).all.length} sbloccate</span>
          </div>
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12 }}>
            <MedalGrid sessions={sessions} />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('hist.kcal7')}</div>
            {trendPct !== null && (
              <span className="o40-mono" style={{ color: STEEL, fontSize: 11 }}>
                {t('hist.vsweek', { p: (trendPct > 0 ? '+' : '') + trendPct })}
              </span>
            )}
          </div>
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '10px 6px', height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                <CartesianGrid stroke={OLIVE_DARK} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: STEEL, fontSize: 10 }} axisLine={{ stroke: OLIVE }} tickLine={false} />
                <YAxis tick={{ fill: STEEL, fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: KHAKI }} itemStyle={{ color: BLAZE }} cursor={{ fill: OLIVE_DARK }} />
                <Bar dataKey="kcal" fill={BLAZE} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {(() => {
          const months = getMonthlyTrend(sessions);
          const maxK = Math.max(1, ...months.map(m => m.kcal));
          return (
            <div style={{ marginBottom: 20 }}>
              <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Trend mensile · kcal</div>
              <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '12px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
                  {months.map(m => (
                    <div key={m.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: '100%', height: `${Math.round((m.kcal / maxK) * 60) + 4}px`, background: m.kcal ? BLAZE : OLIVE_DARK, borderRadius: 3, opacity: m.kcal ? 1 : 0.5 }} />
                      <span className="o40-mono" style={{ color: STEEL, fontSize: 9 }}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {sessions.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t('hist.fav')}</div>
            <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PROGRAMS.map(p => (
                <div key={p.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                    <span style={{ color: PAPER }}>{tr(p.name, lang)}</span>
                    <span className="o40-mono" style={{ color: STEEL }}>{counts[p.id]}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: OLIVE_DARK, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(counts[p.id] / maxCount) * 100}%`, background: BLAZE, borderRadius: 3, transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {hrData.length >= 2 && (
          <div style={{ marginBottom: 20 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t('hist.hr')}</div>
            <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '10px 6px', height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hrData} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke={OLIVE_DARK} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fill: STEEL, fontSize: 10 }} axisLine={{ stroke: OLIVE }} tickLine={false} />
                  <YAxis tick={{ fill: STEEL, fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: KHAKI }} itemStyle={{ color: BLAZE }} />
                  <Line type="monotone" dataKey="hr" stroke={BLAZE} strokeWidth={2} dot={{ r: 3, fill: BLAZE }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {waistData.length >= 2 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('hist.waist')}</div>
              <span className="o40-mono" style={{ color: waistData[0].cm <= waistData[waistData.length - 1].cm ? BLAZE : '#7FB069', fontSize: 11 }}>
                {t('hist.waist.total', { v: (waistData[waistData.length - 1].cm - waistData[0].cm > 0 ? '+' : '') + (waistData[waistData.length - 1].cm - waistData[0].cm) })}
              </span>
            </div>
            <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '10px 6px', height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={waistData} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke={OLIVE_DARK} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fill: STEEL, fontSize: 10 }} axisLine={{ stroke: OLIVE }} tickLine={false} />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={{ fill: STEEL, fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: KHAKI }} itemStyle={{ color: BLAZE }} />
                  <Line type="monotone" dataKey="cm" stroke={BLAZE} strokeWidth={2} dot={{ r: 3, fill: BLAZE }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {weightData.length >= 2 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('hist.weight')}</div>
              <span className="o40-mono" style={{ color: weightData[weightData.length - 1].kg <= weightData[0].kg ? '#7FB069' : BLAZE, fontSize: 11 }}>
                {t('hist.weight.total', { v: (weightData[weightData.length - 1].kg - weightData[0].kg > 0 ? '+' : '') + (weightData[weightData.length - 1].kg - weightData[0].kg).toFixed(1) })}
              </span>
            </div>
            <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '10px 6px', height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke={OLIVE_DARK} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fill: STEEL, fontSize: 10 }} axisLine={{ stroke: OLIVE }} tickLine={false} />
                  <YAxis domain={['dataMin - 1.5', 'dataMax + 1.5']} tick={{ fill: STEEL, fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: KHAKI }} itemStyle={{ color: '#7FB069' }} />
                  <Line type="monotone" dataKey="kg" stroke="#7FB069" strokeWidth={2} dot={{ r: 3, fill: '#7FB069' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {rpeSeries.length >= 2 && (
          <div style={{ marginBottom: 20 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t('hist.rpe')}</div>
            <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '10px 6px', height: 150 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rpeSeries} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke={OLIVE_DARK} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fill: STEEL, fontSize: 10 }} axisLine={{ stroke: OLIVE }} tickLine={false} />
                  <YAxis domain={[1, 6]} ticks={[1, 2, 3, 4, 5, 6]} tick={{ fill: STEEL, fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: KHAKI }} itemStyle={{ color: BLAZE }} />
                  <Line type="monotone" dataKey="rpe" stroke={BLAZE} strokeWidth={2} dot={{ r: 3, fill: BLAZE }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {profile && profile.heightCm && weightHistory.length > 0 && (() => {
          const latestKg = weightHistory[weightHistory.length - 1].kg;
          const bmi = calcBMI(latestKg, profile.heightCm);
          const cat = bmiCategory(bmi);
          const tdee = estimateTDEE(latestKg, profile.heightCm, profile.age);
          const waistLatest = waistHistory.length ? waistHistory[waistHistory.length - 1].cm : null;
          const bf = estimateBodyFat({ waistCm: waistLatest, weightKg: latestKg, heightCm: profile.heightCm, age: profile.age });
          const wht = waistLatest ? waistLatest / profile.heightCm : null;
          const wcat = wht != null ? whtCategory(wht) : null;
          return (
            <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 14, marginBottom: 16 }}>
              <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, letterSpacing: '0.06em', marginBottom: 6 }}>{t('bmi.title')} · {bmi} {cat && <span style={{ color: cat.color }}>· {t('bmi.' + cat.key)}</span>}</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                {tdee && <span style={{ color: STEEL, fontSize: 12 }}>{t('bmi.tdee', { v: tdee })}</span>}
                {bf != null && <span style={{ color: KHAKI, fontSize: 12 }}>· BF {bf}%</span>}
                {wht != null && <span style={{ color: wcat.color, fontSize: 12 }}>· WHtR {(wht).toFixed(2)}</span>}
              </div>
              <div style={{ color: STEEL, fontSize: 11.5, marginTop: 4, opacity: 0.8 }}>{tr(simpleMealHint(bmi > 27 ? 'cut' : 'maintain'), lang)}</div>
            </div>
          );
        })()}
        {(() => {
          const now = new Date();
          const { pad, days } = buildCalendarGrid(sessions, now.getFullYear(), now.getMonth());
          return (
            <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 14, marginBottom: 16 }}>
              <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, letterSpacing: '0.06em', marginBottom: 8 }}>{t('export.calendar')} · {now.toLocaleDateString(lang === 'it' ? 'it-IT' : lang === 'de' ? 'de-DE' : 'en-US', { month: 'long', year: 'numeric' })}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center' }}>
                {['L','M','M','G','V','S','D'].map(d => <div key={d} style={{ color: STEEL, fontSize: 10 }}>{d}</div>)}
                {Array.from({ length: pad }).map((_, i) => <div key={`p${i}`} />)}
                {days.map(d => (
                  <div key={d.key} title={d.sessions.length ? `${d.sessions.length} sessioni` : ''} style={{ width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, background: d.sessions.length ? BLAZE : 'transparent', color: d.sessions.length ? PAPER : STEEL, border: d.isToday ? `1px solid ${KHAKI}` : '1px solid transparent', fontWeight: d.sessions.length ? 700 : 400 }}>
                    {d.day}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
        <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, letterSpacing: '0.06em' }}>Foto progressi</span>
            <label style={{ background: BLAZE, color: PAPER, borderRadius: 8, padding: '6px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
              + Foto
              <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={e => { const f = e.target.files && e.target.files[0]; if (f) onAddPhoto(f); e.target.value=''; }} />
            </label>
          </div>
          {photos.length === 0 ? <div style={{ color: STEEL, fontSize: 12 }}>Nessuna foto — aggiungi la prima per vedere il prima/dopo</div> : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {photos.slice(-6).map(ph => (
                  <div key={ph.id} style={{ aspectRatio: '3/4', borderRadius: 8, overflow: 'hidden', border: `1px solid ${OLIVE}`, background: INK }}>
                    <img src={ph.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              {photos.length >= 2 && (
                <div style={{ marginTop: 12 }}>
                  <BeforeAfterSlider before={photos[0]} after={photos[photos.length - 1]} />
                </div>
              )}
            </>
          )}
        </div>
        <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t('hist.sessions.title')}</div>
        {ordered.length === 0 && <div style={{ color: STEEL, fontSize: 13 }}>{t('hist.empty')}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ordered.map((s, i) => {
            const zone = s.peakHR ? hrZone(s.peakHR, profile.age, lang) : null;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6, background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: PAPER, fontSize: 14, fontWeight: 600 }}>{s.programName}</div>
                    <div style={{ color: STEEL, fontSize: 11.5 }}>{new Date(s.date).toLocaleDateString(LOCALES[lang], { weekday: 'short', day: '2-digit', month: 'short' })}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: KHAKI, fontSize: 12.5 }}><Flame size={13} color={BLAZE} /> {s.kcal}</div>
                  {zone && <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: zone.color, fontSize: 12.5 }}><HeartPulse size={13} /> {s.peakHR}</div>}
                  {s.rpe && <div className="o40-mono" style={{ color: STEEL, fontSize: 10.5, border: `1px solid ${OLIVE}`, borderRadius: 4, padding: '2px 5px' }}>{tr(RPE_LABELS[s.rpe - 1], lang)}</div>}
                  <button onClick={() => {
                    if (confirmDeleteDate === s.date) { onDeleteSession(s.date); setConfirmDeleteDate(null); }
                    else { setConfirmDeleteDate(s.date); setTimeout(() => setConfirmDeleteDate(c => c === s.date ? null : c), 3000); }
                  }} style={{ ...btnIcon, padding: 4, background: confirmDeleteDate === s.date ? `${BLAZE}33` : 'transparent' }} aria-label={t('hist.delete')}>
                    {confirmDeleteDate === s.date ? <Check size={14} color={BLAZE} /> : <X size={14} color={STEEL} />}
                  </button>
                </div>
                {s.notes && <div style={{ color: STEEL, fontSize: 11.5, fontStyle: 'italic', lineHeight: 1.4 }}>"{s.notes}"</div>}
              </div>
            );
          })}
        </div>

        {sessions.length > 0 && (
          <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
            <button onClick={() => exportData(profile, sessions)} style={{ ...secondaryBtn, flex: 1, minWidth: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              {t('hist.export')}
            </button>
            <button onClick={() => exportCSV(sessions, waistHistory, weightHistory)} style={{ ...secondaryBtn, flex: 1, minWidth: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              {t('export.csv')}
            </button>
            <button onClick={async () => { const r = await shareStatsImage({ sessions, profile, t, tr }); showToast(r === 'share' ? 'Condiviso' : 'Immagine scaricata'); }} style={{ ...secondaryBtn, flex: 1, minWidth: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Sparkles size={14} /> {lang === 'it' ? 'Condividi PNG' : 'Share PNG'}
            </button>            <button onClick={() => setConfirmClear(true)} style={{ ...secondaryBtn, flex: 1, minWidth: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <RotateCcw size={15} /> {t('hist.clear')}
            </button>
          </div>
        )}
      </div>

      {confirmClear && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(27,29,22,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 22, maxWidth: 320, textAlign: 'center' }}>
            <div className="o40-display" style={{ color: PAPER, fontSize: 22, marginBottom: 8 }}>{t('hist.clear.title')}</div>
            <div style={{ color: STEEL, fontSize: 13, marginBottom: 18 }}>{t('hist.clear.body')}</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmClear(false)} style={{ ...secondaryBtn, flex: 1 }}>{t('hist.clear.cancel')}</button>
              <button onClick={() => { setConfirmClear(false); onClear(); }} style={{ ...primaryBtn, flex: 1 }}>{t('hist.clear.confirm')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryScreen;
