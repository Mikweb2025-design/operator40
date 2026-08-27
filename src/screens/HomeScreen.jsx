import React, { useState } from 'react';
import { useT } from '../context/LangContext.jsx';
import { INK, INK_2, PAPER, OLIVE, OLIVE_DARK, KHAKI, BLAZE, BLAZE_DEEP, STEEL } from '../constants/theme.js';
import { PROGRAMS, QUICK_PROGRAM, LEVELS, CAMP_DAYS, getLevel } from '../data/programs.js';
import { EXERCISES } from '../data/exercises.js';
import { tr } from '../i18n.js';
import { computeStreakWithFreeze, WEEKLY_GOAL, getRank, nextBadge } from '../utils/stats.js';
import { getRecommendedMissions, getDailyChallenge, getBellyMissions } from '../utils/missions.js';
import { getBellyProgress, getBellyStreak, getBellyInsight } from '../utils/belly.js';
import { getWeeklyProgress, getConsistencyScore, getAveragePace, getStreakRisk } from '../utils/progress.js';
import { getGoalProgress, getGoalHistory, suggestNextGoal, formatGoal, estimateWeeklyCalories } from '../utils/goals.js';
import { GoalRing, MiniGoalBar } from '../components/GoalRing.jsx';
import { getSmartInsight, getSmartRecommendation } from '../utils/smart.js';
import { getPersonalChallenge, getRecoveryTip } from '../utils/personalChallenge.js';
import { getAchievementsProgress, getNextAchievements } from '../utils/achievements.js';
import { getDailyInsight, getWeeklyInsight } from '../utils/insights.js';
import { shouldProgressBellyLevel } from '../utils/bellyTest.js';
import { campDayDisplay } from '../data/programs.js';
import { getNextMedals, getMedalProgress } from '../utils/stats.js';
import { greeting } from '../utils/stats.js';
import { ExerciseFigure } from '../components/ExerciseFigure.jsx';
import { vibrate } from '../utils/audio.js';
import { Flame, Info, X, Star, BookOpen, ChevronRight, RotateCcw, Zap, TrendingUp, TrendingDown, Ruler, Scale, Trophy, Medal, Crown, Target, Eye, Lightbulb, Settings, Trash2, Check, Plus } from 'lucide-react';

const btnIcon = { background: 'transparent', border: 'none', padding: 6, cursor: 'pointer', display: 'flex', borderRadius: 10 };

function DogTag({ label, value, sub }) {
  const numeric = typeof value === 'number';
  return (
    <div className="o40-card" style={{
      background: `linear-gradient(160deg, ${INK_2}, ${INK})`, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '12px 13px',
      position: 'relative', flex: 1, minWidth: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
    }}>
      <div style={{ position: 'absolute', top: 9, left: -5, width: 10, height: 10, borderRadius: '50%', background: INK, border: `2px solid ${KHAKI}` }} />
      <div className="o40-mono" style={{ color: KHAKI, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
      <div className="o40-display" style={{ color: PAPER, fontSize: 26, lineHeight: 1.1 }}>{numeric ? value : value}</div>
      {sub && <div style={{ color: STEEL, fontSize: 11 }}>{sub}</div>}
    </div>
  );
}
function ProgressRing({ progress, size = 240, stroke = 12, color, comet = true }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(1, progress)));
  const gradId = `ring-grad-${color.replace('#', '')}`;
  const angle = Math.max(0.001, Math.min(0.999, progress)) * 2 * Math.PI;
  const dotX = size / 2 + radius * Math.sin(angle);
  const dotY = size / 2 - radius * Math.cos(angle);
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', filter: `drop-shadow(0 0 10px ${color}55)` }}>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.65" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={radius} stroke={OLIVE_DARK} strokeWidth={stroke} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={radius} stroke={`url(#${gradId})`} strokeWidth={stroke} fill="none"
        strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s linear' }} />
      {comet && progress > 0 && (<>
        <circle cx={dotX} cy={dotY} r={stroke * 2} fill={color} opacity="0.15" />
        <circle className="o40-comet" cx={dotX} cy={dotY} r={stroke * 0.8} fill={PAPER} />
      </>)}
    </svg>
  );
}
function SegmentedProgress({ total, current, currentProgress, color }) {
  return (
    <div style={{ display: 'flex', gap: 4, width: '100%' }}>
      {Array.from({ length: total }).map((_, i) => {
        const isDone = i < current;
        const isActive = i === current;
        return (
          <div key={i} style={{
            flex: 1, height: 6, borderRadius: 3, background: isDone || isActive ? color : OLIVE_DARK,
            opacity: isActive ? 0.5 + 0.5 * currentProgress : 1, transition: 'opacity 0.3s linear, background 0.3s ease',
            boxShadow: isDone || isActive ? `0 0 8px ${color}66` : 'none',
          }} />
        );
      })}
    </div>
  );
}

/* ================= HOME SCREEN ================= */
function HomeScreen({ profile, sessions, customPrograms, waistHistory, weightHistory, onOpenProgram, onBuild, onEditCustom, onDeleteCustom, onDismissIntro, onPromote, onBellyTest, onPose }) {
  const { lang, t } = useT();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [showOthers, setShowOthers] = useState(false);
  const { streak, usedFreeze } = computeStreakWithFreeze(sessions);
  const weekAgo = Date.now() - 7 * 86400000;
  const kcalWeek = Math.round(sessions.filter(s => new Date(s.date).getTime() > weekAgo).reduce((a, s) => a + s.kcal, 0));
  const sessionsThisWeek = sessions.filter(s => new Date(s.date).getTime() > weekAgo).length;
  const weeklyGoal = profile.weeklyGoal || WEEKLY_GOAL;
  const { program: todayProgram, adaptive } = pickNextProgram(sessions, profile);
  const othersRaw = PROGRAMS.filter(p => p.id !== todayProgram.id);
  const others = getRecommendedMissions({ sessions, profile, others: othersRaw });
  const dailyChallenge = getDailyChallenge({ sessions, profile });
  const { current: rank, next: nextRank } = getRank(sessions.length);
  const upcoming = nextBadge(sessions);
  const lastSession = sessions.length ? sessions[sessions.length - 1] : null;
  const lastProgram = lastSession && lastSession.programId !== 'health-import'
    ? [...PROGRAMS, ...customPrograms].find(p => p.id === lastSession.programId)
    : null;
  const campDay = campDayDisplay(profile);
  const lvl = getLevel(profile.level || 'combattente');
  const levelIdx = LEVELS.indexOf(lvl);
  const waist = waistHistory.length ? waistHistory[waistHistory.length - 1] : null;
  const waistFirst = waistHistory.length ? waistHistory[0] : null;
  const waistDelta = waist && waistFirst && waistHistory.length > 1 ? waist.cm - waistFirst.cm : null;
  const weight = weightHistory.length ? weightHistory[weightHistory.length - 1] : null;
  const weightFirst = weightHistory.length ? weightHistory[0] : null;
  const weightDelta = weight && weightFirst && weightHistory.length > 1 ? weight.kg - weightFirst.kg : null;
  const recentRpe = sessions.slice(-3).map(s => s.rpe).filter(r => r != null);
  const canPromote = recentRpe.length >= 3 && recentRpe.every(r => r <= 2) && levelIdx < LEVELS.length - 1;
  const nextLevel = canPromote ? LEVELS[levelIdx + 1] : null;

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 16px 4px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ color: STEEL, fontSize: 12 }}>{greeting(lang)}</div>
          <div className="o40-display" style={{ color: PAPER, fontSize: 26 }}>{profile.name.toUpperCase()}</div>
          <div className="o40-mono" style={{ color: BLAZE, fontSize: 10.5, letterSpacing: '0.1em', marginTop: 1 }}>
            {tr(rank.name, lang)} · {tr(lvl.label, lang)}{nextRank && ` · ${nextRank.min - sessions.length} ${t('home.towards')} ${tr(nextRank.name, lang)}`}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, marginTop: 2, flexShrink: 0 }}>
          <div style={{ position: 'relative', width: 46, height: 46 }}>
            <ProgressRing progress={campDay / CAMP_DAYS} size={46} stroke={5} color={BLAZE} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="o40-display" style={{ color: PAPER, fontSize: 13 }}>{campDay}</span>
            </div>
          </div>
          <span className="o40-mono" style={{ color: KHAKI, fontSize: 8.5, letterSpacing: '0.06em' }}>{t('home.day')} /{CAMP_DAYS}</span>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${OLIVE}22`, border: `1px solid ${OLIVE}`, borderRadius: 20, padding: '5px 12px', marginTop: 8 }}>
          <Flame size={12} color={BLAZE} />
          <span className="o40-mono" style={{ color: KHAKI, fontSize: 10.5, letterSpacing: '0.08em' }}>
            {t('home.min15')} · {t('home.mission')} {tr(todayProgram.focus, lang)}
          </span>
        </div>
      </div>

      <div className="o40-ticker o40-mono" style={{ marginTop: 10, fontSize: 10.5, color: KHAKI, letterSpacing: '0.12em' }}>
        <div className="o40-ticker-inner">
          {[`${t('ticker.streak')} ${streak} ${t('dt.days').toUpperCase()}`, `${t('ticker.sessions')} ${sessions.length}`, `${t('ticker.kcal')} ${kcalWeek} / ${t('ticker.week7')}`, `${t('ticker.level')} ${tr(lvl.label, lang).toUpperCase()}`, `${t('ticker.mission')} ${todayProgram.id.toUpperCase()}`, `${t('ticker.goal')} ${sessionsThisWeek}/${weeklyGoal} ${t('ticker.week')}`, `${t('ticker.rank')} ${tr(rank.name, lang).toUpperCase()}`]
            .concat(`${t('ticker.streak')} ${streak} ${t('dt.days').toUpperCase()}`, `${t('ticker.sessions')} ${sessions.length}`, `${t('ticker.kcal')} ${kcalWeek} / ${t('ticker.week7')}`, `${t('ticker.level')} ${tr(lvl.label, lang).toUpperCase()}`, `${t('ticker.mission')} ${todayProgram.id.toUpperCase()}`, `${t('ticker.goal')} ${sessionsThisWeek}/${weeklyGoal} ${t('ticker.week')}`, `${t('ticker.rank')} ${tr(rank.name, lang).toUpperCase()}`)
            .map((s, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 44 }}>{s}<span style={{ color: BLAZE }}>◆</span></span>
            ))}
        </div>
      </div>

      {!profile.seenIntro && (
        <div style={{ margin: '10px 16px 0', background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`, border: `1px solid ${BLAZE}`, borderRadius: 12, padding: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Info size={16} color={BLAZE} style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ flex: 1, color: KHAKI, fontSize: 12, lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: t('home.intro') }} />
          <button onClick={onDismissIntro} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2, flexShrink: 0 }} aria-label={t('home.intro.close')}>
            <X size={16} color={STEEL} />
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, padding: '14px 16px' }}>
        <DogTag label={t('dt.streak')} value={usedFreeze ? `${streak} ❄️` : streak} sub={streak === 1 ? t('dt.day') : t('dt.days')} />
        <DogTag label={t('dt.sessions')} value={sessions.length} sub={t('dt.total')} />
        <DogTag label={t('dt.kcal')} value={kcalWeek} sub={t('dt.7d')} />
      </div>

      <div style={{ padding: '4px 16px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '12px 0 8px' }}>
          <svg width="64" height="12" viewBox="0 0 64 12" fill="none" style={{ flexShrink: 0 }}>
            <path d="M0 6 H10 L14 2 L18 10 L22 4 L26 8 L30 6 H40 L44 2 L48 10 L52 4 L56 8 L60 6 H64"
              stroke={BLAZE} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" className="o40-ecg" />
          </svg>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('home.mission.title')}</div>
        </div>
        <button className="o40-card o40-ring-border o40-sheen" onClick={() => { vibrate(10); onOpenProgram(todayProgram); }} style={{
          width: '100%', textAlign: 'left', border: `1px solid ${BLAZE}`,
          background: `linear-gradient(150deg, ${INK_2} 0%, ${OLIVE_DARK} 55%, ${OLIVE} 130%)`,
          borderRadius: 18, padding: 20, cursor: 'pointer', position: 'relative', overflow: 'hidden',
          boxShadow: `0 10px 30px rgba(0,0,0,0.45), 0 0 0 1px ${BLAZE}22 inset`,
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(music-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,12,10,0.6)' }} />
          <div style={{ position: 'relative' }}>
          <div className="o40-embers">
            {[['8%', '0s', '3.2s'], ['22%', '1.1s', '3.8s'], ['38%', '0.5s', '3.4s'], ['55%', '1.7s', '3.6s'], ['70%', '0.9s', '3.3s'], ['84%', '1.4s', '3.9s'], ['93%', '0.3s', '3.5s']].map(([l, d, du], i) => (
              <span key={i} className="o40-ember" style={{ left: l, animationDelay: d, animationDuration: du }} />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="o40-mono" style={{ color: BLAZE, fontSize: 11, letterSpacing: '0.1em' }}>{t('home.mission.tag', { id: todayProgram.id })}</div>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 9.5, letterSpacing: '0.08em', background: `${KHAKI}18`, border: `1px solid ${KHAKI}44`, borderRadius: 6, padding: '2px 7px' }}>
              {tr(todayProgram.focus, lang)}
            </div>
            <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <Star key={i} size={10} color={i < (todayProgram.difficulty || 2) ? BLAZE : STEEL} fill={i < (todayProgram.difficulty || 2) ? BLAZE : 'none'} />
              ))}
            </div>
            {['H','I','J','K','L','M','N','O','P'].includes(todayProgram.id) && (
              <div className="o40-mono" style={{ color: PAPER, fontSize: 9, letterSpacing: '0.08em', background: BLAZE, borderRadius: 6, padding: '2px 7px' }}>NEW</div>
            )}
          </div>
          <div className="o40-display" style={{ color: PAPER, fontSize: 30, marginTop: 2 }}>{tr(todayProgram.name, lang)}</div>
          <div style={{ color: KHAKI, fontSize: 13.5, marginTop: 2 }}>{tr(todayProgram.tagline, lang)}</div>
          {adaptive && (
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 10.5, marginTop: 8, background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, padding: '4px 8px', display: 'inline-block' }}>
              {t('home.mission.adaptive')}
            </div>
          )}
          <div style={{ display: 'flex', gap: 14, marginTop: 12, color: STEEL, fontSize: 12.5 }}>
            <span>{t('home.mission.min')}</span><span>·</span><span>{t('home.mission.noequip')}</span><span>·</span><span>{t('home.mission.ex', { n: todayProgram.exercises.length })}</span>
          </div>
          <div style={{
            marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 4, color: PAPER,
            fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: '0.05em',
            background: `${BLAZE}33`, border: `1px solid ${BLAZE}`, borderRadius: 10, padding: '7px 14px',
            animation: 'glowPulse 2.4s ease-in-out infinite',
          }}>
            {t('home.mission.see')} <ChevronRight size={18} />
          </div>
          </div>
        </button>

        {lastProgram && (
          <button onClick={() => onOpenProgram(lastProgram)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', marginTop: 10,
            background: 'transparent', border: `1px dashed ${OLIVE}`, borderRadius: 10, padding: 10, cursor: 'pointer',
          }}>
            <RotateCcw size={13} color={STEEL} />
            <span className="o40-mono" style={{ color: STEEL, fontSize: 11.5 }}>{t('home.repeat', { name: tr(lastProgram.name, lang) })}</span>
          </button>
        )}

        <button onClick={() => onOpenProgram(QUICK_PROGRAM)} style={{
          display: 'flex', alignItems: 'center', gap: 12, width: '100%', marginTop: 10,
          background: `linear-gradient(135deg, ${INK_2}, ${INK})`, border: `1px solid ${KHAKI}`, borderRadius: 12, padding: 12, cursor: 'pointer', textAlign: 'left',
        }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${KHAKI}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Zap size={17} color={KHAKI} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: PAPER, fontSize: 13.5, fontWeight: 600 }}>{tr(QUICK_PROGRAM.name, lang)}</div>
            <div style={{ color: STEEL, fontSize: 11.5 }}>{tr(QUICK_PROGRAM.tagline, lang)} · {t('home.quick.min')}</div>
          </div>
          <ChevronRight size={16} color={STEEL} />
        </button>

        <div style={{ margin: '12px 0 8px', background: `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
           <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${KHAKI}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
             <Star size={16} color={KHAKI} />
           </div>
           <div style={{ flex: 1, minWidth: 0 }}>
             <div className="o40-mono" style={{ color: KHAKI, fontSize: 10, letterSpacing: '0.06em' }}>SFIDA DEL GIORNO • {dailyChallenge.bonus}</div>
             <div style={{ color: PAPER, fontSize: 12.5, fontWeight: 600 }}>{tr(dailyChallenge.program.name, lang)}</div>
             <div style={{ color: STEEL, fontSize: 11 }}>{tr(dailyChallenge.program.tagline, lang)}</div>
           </div>
           <button onClick={() => onOpenProgram(dailyChallenge.program)} style={{ background: BLAZE, color: PAPER, border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Vai</button>
         </div>

         {(() => {
           const bellyMissions = getBellyMissions({ sessions, profile, waistHistory });
           const bellyProgress = getBellyProgress(sessions, 3);
           const bellyStreak = getBellyStreak(sessions);
           const bellyInsight = getBellyInsight({ sessions, waistHistory, lang });
           return (
             <div style={{ margin: '12px 0 8px', background: `linear-gradient(135deg, ${BLAZE}14, ${INK_2})`, border: `1px solid ${BLAZE}66`, borderRadius: 14, padding: 12 }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                 <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${BLAZE}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Target size={16} color={BLAZE} /></div>
                 <div style={{ flex: 1 }}>
                   <div className="o40-mono" style={{ color: BLAZE, fontSize: 11, letterSpacing: '0.08em' }}>PANCIA • 3 MISSIONI DEDICATE</div>
                   <div style={{ color: KHAKI, fontSize: 11 }}>{bellyInsight}</div>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                   <div className="o40-display" style={{ color: bellyProgress.isDone ? '#7FB069' : BLAZE, fontSize: 18 }}>{bellyProgress.done}/{bellyProgress.total}</div>
                   <div className="o40-mono" style={{ color: STEEL, fontSize: 8 }}>SETTIMANA</div>
                 </div>
               </div>
               <div style={{ height: 6, borderRadius: 3, background: OLIVE_DARK, overflow: 'hidden', marginBottom: 10 }}>
                 <div style={{ width: `${Math.round(bellyProgress.pct*100)}%`, height: '100%', background: bellyProgress.isDone ? '#7FB069' : BLAZE, transition: 'width 0.4s ease' }} />
               </div>
               <div style={{ display: 'flex', gap: 8 }}>
                 {bellyMissions.map(p => (
                   <button key={p.id} onClick={() => onOpenProgram(p)} style={{
                     flex: 1, background: INK, border: `1px solid ${p.id === 'P' ? BLAZE : OLIVE}`, borderRadius: 10, padding: '10px 8px', cursor: 'pointer', textAlign: 'center', position: 'relative'
                   }}>
                     <div className="o40-mono" style={{ color: BLAZE, fontSize: 9, letterSpacing: '0.08em' }}>{p.id} • {tr(p.focus, lang)}</div>
                     <div style={{ color: PAPER, fontSize: 11, fontWeight: 700, lineHeight: 1.2, marginTop: 2 }}>{tr(p.name, lang)}</div>
                     <div style={{ display: 'flex', gap: 1, justifyContent: 'center', marginTop: 4 }}>{Array.from({length:3}).map((_,i)=><Star key={i} size={8} color={i < (p.difficulty||2) ? BLAZE : STEEL} fill={i < (p.difficulty||2) ? BLAZE : 'none'} />)}</div>
                     <div style={{ color: STEEL, fontSize: 9, marginTop: 4 }}>{p.exercises.length} esercizi • {p.exercises.slice(0,2).map(e=>EXERCISES[e]?.name?.it || e).join(' + ')}</div>
                     {bellyStreak >= 2 && <span style={{ position:'absolute', top:4, right:4, background: BLAZE, color: PAPER, fontSize:7, fontWeight:700, borderRadius:4, padding:'1px 4px' }}>🔥{bellyStreak}</span>}
                   </button>
                 ))}
               </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:8, color: STEEL, fontSize:10 }}>
                  <span>Streak pancia: <b style={{color: KHAKI}}>{bellyStreak} gg</b></span>
                  <span>{bellyProgress.isDone ? 'Obiettivo pancia raggiunto ✓' : `${bellyProgress.remain} pancia alla meta`}</span>
                </div>
                {(() => {
                  const next = shouldProgressBellyLevel({ sessions, currentLevelKey: profile.bellyLevel || 'recluta', profile });
                  const curLevel = profile.bellyLevel || 'recluta';
                  return (
                    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                      <button onClick={onBellyTest} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 10px', borderRadius: 8, border: `1px solid ${BLAZE}`, background: profile.bellyTest ? INK : `${BLAZE}18`, color: profile.bellyTest ? KHAKI : BLAZE, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                        <Trophy size={12} /> {profile.bellyTest ? `Test: ${profile.bellyTest.level.toUpperCase()} · Rifai` : 'Test Pancia 2.0'}
                      </button>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, padding: '6px 10px', color: KHAKI, fontSize: 10, fontWeight: 600 }}>
                        Liv. {curLevel.toUpperCase()}
                      </span>
                      {next && (
                        <button onClick={async () => {
                          const p = { ...profile, bellyLevel: next, bellyLevelUpdated: new Date().toISOString() };
                          // update profile via parent handler? use direct storage for now
                          try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch {}
                          window.location.reload();
                        }} style={{ padding: '6px 10px', borderRadius: 8, border: `1px solid ${KHAKI}`, background: KHAKI, color: INK, fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>
                          → {next.toUpperCase()}?
                        </button>
                      )}
                    </div>
                  );
                })()}
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  <button onClick={() => onPose && onPose('squat')} style={{ flex: 1, padding: '6px 8px', borderRadius: 8, border: `1px solid ${OLIVE}`, background: INK, color: STEEL, fontSize: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <Eye size={12} /> Conta squat (camera)
                  </button>
                </div>
              </div>
            );
          })()}

         <button onClick={() => setShowOthers(v => !v)} style={{
          display: 'flex', alignItems: 'center', gap: 12, width: '100%',
          background: showOthers ? OLIVE_DARK : INK_2, border: `1px solid ${showOthers ? BLAZE : OLIVE}`, borderRadius: 12, padding: '12px 14px', cursor: 'pointer', margin: '20px 0 12px',
          boxShadow: showOthers ? `0 4px 12px rgba(0,0,0,0.3)` : 'none', transition: 'all 0.2s ease'
        }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: showOthers ? BLAZE : `${KHAKI}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <BookOpen size={16} color={showOthers ? PAPER : KHAKI} />
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div className="o40-mono" style={{ color: showOthers ? BLAZE : KHAKI, fontSize: 11, letterSpacing: '0.06em' }}>{t('home.other')} • {others.length} missioni</div>
            <div style={{ color: STEEL, fontSize: 11, marginTop: 2 }}>{showOthers ? 'Tocca per chiudere' : 'Esplora tutte le missioni disponibili'}</div>
          </div>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: showOthers ? BLAZE : OLIVE_DARK, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: showOthers ? 'rotate(90deg)' : 'none', transition: 'all 0.2s ease' }}>
            <ChevronRight size={14} color={showOthers ? PAPER : KHAKI} />
          </div>
        </button>
        {showOthers && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {others.map((p, idx) => (
              <button key={p.id} onClick={() => onOpenProgram(p)} style={{
                display: 'flex', alignItems: 'center', gap: 12, background: idx === 0 ? `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})` : INK_2, border: `1px solid ${idx === 0 ? KHAKI : ['H','I','J'].includes(p.id) ? BLAZE : OLIVE}`,
                borderRadius: 10, padding: 12, cursor: 'pointer', textAlign: 'left', position: 'relative',
              }}>
                {idx === 0 && <span style={{ position: 'absolute', top: 6, left: 6, background: KHAKI, color: INK, fontSize: 8, fontWeight: 700, borderRadius: 4, padding: '1px 4px' }}>★ Consigliata</span>}
                {['H','I','J','K','L','M','N','O','P'].includes(p.id) && <span style={{ position: 'absolute', top: 6, right: 6, background: BLAZE, color: PAPER, fontSize: 8, fontWeight: 700, borderRadius: 4, padding: '1px 4px' }}>NEW</span>}
                <div style={{ width: 40, height: 40, flexShrink: 0 }}>
                  <ExerciseFigure pose={EXERCISES[p.exercises[0]].pose} color={KHAKI} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: PAPER, fontSize: 14.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>{tr(p.name, lang)}<span style={{ display: 'flex', gap: 1 }}>{Array.from({ length: 3 }).map((_, i) => (<Star key={i} size={9} color={i < (p.difficulty || 2) ? KHAKI : STEEL} fill={i < (p.difficulty || 2) ? KHAKI : 'none'} />))}</span></div>
                  <div style={{ color: STEEL, fontSize: 12 }}>{tr(p.tagline, lang)}</div>
                </div>
                <ChevronRight size={18} color={STEEL} />
              </button>
            ))}
          </div>
        )}

        <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '20px 0 8px' }}>{(() => {
        const wp = getWeeklyProgress(sessions, weeklyGoal);
        const cons = getConsistencyScore(sessions);
        const risk = getStreakRisk(sessions);
        const pace = getAveragePace(sessions);
        return (
          <div style={{ margin: '0 16px 4px', background: `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})`, border: `1px solid ${risk === 'at-risk' ? KHAKI : risk === 'break' ? BLAZE : OLIVE}`, borderRadius: 12, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${BLAZE}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <TrendingUp size={16} color={risk === 'break' ? BLAZE : KHAKI} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: PAPER, fontSize: 12.5, fontWeight: 600 }}>Aderenza · {cons}% <span style={{ color: STEEL, fontWeight: 400 }}>· {wp.done}/{wp.total} questa settimana</span></div>
              <div style={{ color: STEEL, fontSize: 11.5, marginTop: 1 }}>
                {risk === 'ok' ? 'Streak al sicuro' : risk === 'at-risk' ? 'Rischio streak — allenati oggi!' : 'Streak interrotta — riparti oggi'} {pace ? `· ${pace.avgMin}′ / ${pace.avgKcal} kcal medi` : ''}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="o40-display" style={{ color: wp.isDone ? '#7FB069' : BLAZE, fontSize: 18 }}>{Math.round(wp.pct * 100)}%</div>
              <div className="o40-mono" style={{ color: STEEL, fontSize: 9 }}>SETTIMANA</div>
            </div>
          </div>
        );
      })()}

      {(() => {
        const smart = getSmartInsight({ sessions, profile, waistHistory, weightHistory, lang });
        const rec = getSmartRecommendation({ sessions, profile, lang });
        return (
          <div style={{ margin: '0 16px 4px', background: `linear-gradient(135deg, ${smart.color}18, ${INK_2})`, border: `1px solid ${smart.color}55`, borderRadius: 12, padding: '11px 13px', display: 'flex', gap: 11, alignItems: 'center' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${smart.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>{smart.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: PAPER, fontSize: 12.5, fontWeight: 600 }}>{smart.title}</div>
              <div style={{ color: STEEL, fontSize: 11.5, marginTop: 1, lineHeight: 1.4 }}>{smart.body}</div>
              <div style={{ color: KHAKI, fontSize: 10.5, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><Lightbulb size={10} /> {rec.reason}</div>
            </div>
          </div>
        );
      })()}
      {(() => {
        const ch = getPersonalChallenge(sessions, profile);
        return (
          <div style={{ margin: '0 16px 4px', background: `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})`, border: `1px solid ${ch.color}55`, borderRadius: 12, padding: '11px 13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 16 }}>{ch.icon}</span>
              <span className="o40-mono" style={{ color: KHAKI, fontSize: 10, letterSpacing: '0.06em' }}>{ch.title.toUpperCase()} • SFIDA PERSONALE</span>
              <span style={{ marginLeft: 'auto', color: ch.color, fontSize: 11, fontWeight: 700 }}>{Math.round(ch.progress*100)}%</span>
            </div>
            <div style={{ color: PAPER, fontSize: 12.5, fontWeight: 600 }}>{ch.desc}</div>
            <div style={{ height: 6, borderRadius: 3, background: OLIVE_DARK, marginTop: 8, overflow: 'hidden' }}><div style={{ width: `${Math.round(ch.progress*100)}%`, height: '100%', background: ch.color, transition: 'width 0.4s ease' }} /></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, color: STEEL, fontSize: 10.5 }}>
              <span>{ch.current}/{ch.target}</span>
              <span style={{ color: ch.progress >= 1 ? '#7FB069' : KHAKI, display: 'flex', alignItems: 'center', gap: 4 }}>{ch.progress >= 1 ? 'Completata! 🎉' : getRecoveryTip(sessions, lang)}</span>
            </div>
          </div>
        );
      })()}

      {(() => {
        const ach = getAchievementsProgress(sessions);
        const nextAch = getNextAchievements(sessions, 3);
        const unlocked = ach.filter(a => a.unlocked).length;
        return (
          <div style={{ margin: '0 16px 4px', background: `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: '11px 13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Medal size={14} color={KHAKI} />
              <span className="o40-mono" style={{ color: KHAKI, fontSize: 10, letterSpacing: '0.06em' }}>ACHIEVEMENTS • {unlocked}/{ach.length}</span>
              <span style={{ marginLeft: 'auto', color: unlocked === ach.length ? '#7FB069' : STEEL, fontSize: 10 }}>{unlocked === ach.length ? 'Tutte!' : `${ach.length - unlocked} mancanti`}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
              {ach.slice(0,6).map(a => (
                <div key={a.id} style={{ minWidth: 64, background: a.unlocked ? `${a.color}22` : INK, border: `1px solid ${a.unlocked ? a.color : OLIVE}`, borderRadius: 10, padding: '6px 8px', textAlign: 'center', flexShrink: 0, opacity: a.unlocked ? 1 : 0.6 }}>
                  <div style={{ fontSize: 16 }}>{a.icon}</div>
                  <div style={{ color: a.unlocked ? PAPER : STEEL, fontSize: 9, fontWeight: 700, lineHeight: 1.2 }}>{a.title.it}</div>
                  <div style={{ height: 3, borderRadius: 2, background: OLIVE_DARK, marginTop: 4 }}><div style={{ width: `${Math.round(a.progress*100)}%`, height: '100%', background: a.color }} /></div>
                </div>
              ))}
            </div>
            {nextAch.length > 0 && (
              <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {nextAch.map(a => (
                  <span key={a.id} style={{ background: `${a.color}22`, border: `1px solid ${a.color}55`, color: PAPER, fontSize: 10, padding: '2px 7px', borderRadius: 20 }}>{a.icon} {a.title.it} {Math.round(a.progress*100)}%</span>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      <div style={{ margin: '0 16px 4px', background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${BLAZE}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Ruler size={16} color={BLAZE} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: PAPER, fontSize: 12.5, fontWeight: 600 }}>{t('home.waist.title')} <span style={{ color: STEEL, fontWeight: 400 }}>{t('home.waist.sub')}</span></div>
          {waist ? (
            <div style={{ color: KHAKI, fontSize: 11.5, marginTop: 1 }}>
              {t('home.waist.last', { v: waist.cm })}
              {waistDelta != null && (
                <span style={{ color: waistDelta <= 0 ? '#7FB069' : BLAZE, marginLeft: 6, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  {waistDelta <= 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                  {waistDelta > 0 ? '+' : ''}{t('home.waist.delta', { v: waistDelta })}
                </span>
              )}
            </div>
          ) : (
            <div style={{ color: STEEL, fontSize: 11.5, marginTop: 1 }}>{t('home.waist.empty')}</div>
          )}
        </div>
        {waist && (
          <span className="o40-mono" style={{ color: waistDelta != null && waistDelta <= 0 ? '#7FB069' : KHAKI, fontSize: 11 }}>{waistDelta != null && waistDelta <= 0 ? t('home.trendok') : t('home.start')}</span>
        )}
      </div>

      <div style={{ margin: '0 16px 4px', background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${KHAKI}1f`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Scale size={16} color={KHAKI} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: PAPER, fontSize: 12.5, fontWeight: 600 }}>{t('home.weight.title')} <span style={{ color: STEEL, fontWeight: 400 }}>{t('home.weight.sub')}</span></div>
          {weight ? (
            <div style={{ color: KHAKI, fontSize: 11.5, marginTop: 1 }}>
              {t('home.weight.last', { v: weight.kg })}
              {weightDelta != null && (
                <span style={{ color: weightDelta <= 0 ? '#7FB069' : BLAZE, marginLeft: 6, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  {weightDelta <= 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                  {weightDelta > 0 ? '+' : ''}{t('home.weight.delta', { v: weightDelta.toFixed(1) })}
                </span>
              )}
            </div>
          ) : (
            <div style={{ color: STEEL, fontSize: 11.5, marginTop: 1 }}>{t('home.weight.empty')}</div>
          )}
        </div>
        {weight && (
          <span className="o40-mono" style={{ color: weightDelta != null && weightDelta <= 0 ? '#7FB069' : KHAKI, fontSize: 11 }}>{weightDelta != null && weightDelta <= 0 ? t('home.trendok') : t('home.start')}</span>
        )}
      </div>

      {nextLevel && (
        <div style={{ margin: '8px 16px 0', display: 'flex', alignItems: 'center', gap: 10, background: `linear-gradient(135deg, ${BLAZE_DEEP}, ${INK_2})`, border: `1px solid ${BLAZE}`, borderRadius: 12, padding: '11px 13px' }}>
          <Crown size={16} color={PAPER} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: PAPER, fontSize: 12.5, fontWeight: 600 }}>{t('home.promote.title', { lvl: tr(nextLevel.label, lang) })}</div>
            <div style={{ color: KHAKI, fontSize: 11.5, marginTop: 1 }}>{t('home.promote.body')}</div>
          </div>
          <button onClick={onPromote} style={{
            background: BLAZE, border: 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', flexShrink: 0,
          }}>
            <span className="o40-mono" style={{ color: PAPER, fontSize: 11 }}>{t('home.promote.btn')}</span>
          </button>
        </div>
      )}

      <div style={{ padding: '0 16px 4px' }}>
        {(() => {
          const gp = getGoalProgress(sessions, weeklyGoal);
          const hist = getGoalHistory(sessions, weeklyGoal, 6);
          const sugg = suggestNextGoal(sessions, weeklyGoal);
          const kcalWeekEst = estimateWeeklyCalories(sessions, weeklyGoal);
          return (
            <div style={{ background: `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})`, border: `1px solid ${gp.isDone ? '#7FB069' : OLIVE}`, borderRadius: 14, padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
              <GoalRing done={gp.done} total={gp.total} size={64} stroke={6} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, letterSpacing: '0.06em' }}>{t('home.goal.title')} · {formatGoal(weeklyGoal)} {gp.isDone && <span style={{ color: '#7FB069' }}>✓</span>}</div>
                <div style={{ color: PAPER, fontSize: 12.5, fontWeight: 600, marginTop: 2 }}>{gp.isDone ? 'Obiettivo raggiunto!' : `${gp.remain} ${gp.remain === 1 ? 'sessione' : 'sessioni'} alla meta`} <span style={{ color: STEEL, fontWeight: 400 }}>· ~{kcalWeekEst} kcal/sett.</span></div>
                <div style={{ marginTop: 8 }}><MiniGoalBar history={hist} /></div>
                {sugg !== weeklyGoal && (
                  <div style={{ color: KHAKI, fontSize: 10.5, marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}><Lightbulb size={10} /> {lang === 'it' ? `Suggerito: ${formatGoal(sugg)}` : `Suggested: ${formatGoal(sugg)}`}</div>
                )}
              </div>
            </div>
          );
        })()}
        <div style={{ marginTop: 8 }}>
          <SegmentedProgress total={weeklyGoal} current={Math.min(sessionsThisWeek, weeklyGoal)} currentProgress={1} color={sessionsThisWeek >= weeklyGoal ? '#7FB069' : BLAZE} />
        </div>
        {upcoming && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <Trophy size={12} color={KHAKI} />
            <span style={{ color: STEEL, fontSize: 11 }}>
              {t('home.next.title', { n: upcoming.remaining, unit: upcoming.kind === 'serie' ? (upcoming.remaining === 1 ? t('home.unit.streak1') : t('home.unit.streakN')) : (upcoming.remaining === 1 ? t('home.unit.session1') : t('home.unit.sessionN')) })}
            </span>
          </div>
        )}
      </div>

      {(() => {
        const next = getNextMedals(sessions, 3);
        if (!next.length) return null;
        return (
          <div style={{ padding: '0 16px 8px' }}>
            <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Medal size={16} color={KHAKI} />
              <div style={{ flex: 1 }}>
                <div className="o40-mono" style={{ color: KHAKI, fontSize: 10, letterSpacing: '0.06em' }}>PROSSIME MEDAGLIE</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                  {next.map(m => (
                    <span key={`${m.type}-${m.n}`} style={{ background: `${m.color}22`, border: `1px solid ${m.color}55`, color: PAPER, fontSize: 11, padding: '2px 7px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      {m.icon} {m.n} <span style={{ color: KHAKI, fontSize: 9 }}>{Math.round(m.progress*100)}%</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {t('home.yours')}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {customPrograms.map(p => (
            <div key={p.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, background: INK_2, border: `1px solid ${OLIVE}`,
              borderRadius: 10, padding: 12,
            }}>
              <button onClick={() => onOpenProgram(p)} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', flex: 1, padding: 0 }}>
                <div style={{ width: 40, height: 40, flexShrink: 0 }}>
                  <ExerciseFigure pose={EXERCISES[p.exercises[0]].pose} color={KHAKI} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: PAPER, fontSize: 14.5, fontWeight: 600 }}>{tr(p.name, lang)}</div>
                  <div style={{ color: STEEL, fontSize: 12 }}>{tr(p.tagline, lang)} · {t('home.custom.ex', { n: p.exercises.length })}</div>
                </div>
              </button>
              <button onClick={() => onEditCustom(p)} style={{ ...btnIcon, background: 'transparent' }} aria-label="Modifica">
                <Settings size={14} color={KHAKI} />
              </button>
              <button onClick={() => {
                if (confirmDeleteId === p.id) { onDeleteCustom(p.id); setConfirmDeleteId(null); }
                else { setConfirmDeleteId(p.id); setTimeout(() => setConfirmDeleteId(c => c === p.id ? null : c), 3000); }
              }} style={{ ...btnIcon, background: confirmDeleteId === p.id ? `${BLAZE}33` : 'transparent' }} aria-label={t('home.custom.delete')}>
                {confirmDeleteId === p.id ? <Check size={16} color={BLAZE} /> : <Trash2 size={16} color={STEEL} />}
              </button>
            </div>
          ))}
          <button onClick={onBuild} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'transparent',
            border: `1px dashed ${KHAKI}`, borderRadius: 10, padding: 14, cursor: 'pointer',
          }}>
            <Plus size={16} color={KHAKI} />
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 12.5, letterSpacing: '0.05em' }}>{t('home.custom.create')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}


export default HomeScreen;
