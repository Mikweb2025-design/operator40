import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import {
  Play, Pause, SkipForward, Flame, HeartPulse, Trophy, ChevronRight,
  ChevronLeft, RotateCcw, Settings, X, Check, Volume2, VolumeX, Vibrate, History as HistoryIcon, Info, Dog, Plus, Trash2,
  Home as HomeIcon, BookOpen, Zap, RefreshCw, TrendingUp, TrendingDown, Ruler, Target, Medal, Crown,
  Music, Music2, HeadphoneOff, Lightbulb, Scale, Wind, Globe
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TRACKS, DEFAULT_TRACK, musicPlay, musicPause, musicLoad, musicSetVolume, musicSetShouldPlay } from './music';
import { LANGS, LOCALES, detectLang, tr, translate } from './i18n';
import { hasClip } from './clips.js';
import { INK, INK_2, PAPER, OLIVE, OLIVE_DARK, KHAKI, BLAZE, BLAZE_DEEP, STEEL } from './constants/theme.js';
import { EXERCISES, EXERCISE_GROUPS } from './data/exercises.js';
import { PROGRAMS, QUICK_PROGRAM, WORK_SEC, REST_SEC, WARM_SEC, COOL_SEC, INTERVAL_PRESETS, LEVELS, CAMP_DAYS, DAY_CYCLE, getIntervalPreset, getLevel, levelPreset, campDayIndex, programById, pickNextProgram } from './data/programs.js';
import { buildSequence, kcalForSeconds, estimateProgramKcal, totalSeqSeconds } from './utils/workout.js';
import { formatTime, dayKey, sessionDayKey } from './utils/date.js';
import { hrZone, computeBestStreak, computeStreak, WEEKLY_GOAL, STREAK_BADGES, SESSION_BADGES, RPE_LABELS, RPE_COLORS, RANKS, getRank, nextBadge, greeting, buildHeatmap } from './utils/stats.js';
import { getAudioCtx, unlockAudio, playBeep, playClick, vibrate, speak } from './utils/audio.js';
import { STYLES } from './styles/appStyles.js';
import { ExerciseFigure } from './components/ExerciseFigure.jsx';

function exportData(profile, sessions) {
  try {
    const payload = JSON.stringify({ profile, sessions }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `operator40-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) { /* best effort, ignore */ }
}

/* ---- Apple Health export.xml import (parsed 100% locally, regex-based to stay safe on huge files) ---- */
const HK_ACTIVITY_MAP = {
  HKWorkoutActivityTypeFunctionalStrengthTraining: { it: 'Forza funzionale (Apple Health)', en: 'Functional strength (Apple Health)', de: 'Funktionelles Krafttraining (Apple Health)' },
  HKWorkoutActivityTypeTraditionalStrengthTraining: { it: 'Allenamento forza (Apple Health)', en: 'Strength training (Apple Health)', de: 'Krafttraining (Apple Health)' },
  HKWorkoutActivityTypeCoreTraining: { it: 'Core training (Apple Health)', en: 'Core training (Apple Health)', de: 'Core-Training (Apple Health)' },
  HKWorkoutActivityTypeHighIntensityIntervalTraining: { it: 'HIIT (Apple Health)', en: 'HIIT (Apple Health)', de: 'HIIT (Apple Health)' },
  HKWorkoutActivityTypeCrossTraining: { it: 'Cross training (Apple Health)', en: 'Cross training (Apple Health)', de: 'Cross-Training (Apple Health)' },
  HKWorkoutActivityTypeFlexibility: { it: 'Mobilità (Apple Health)', en: 'Flexibility (Apple Health)', de: 'Mobilität (Apple Health)' },
  HKWorkoutActivityTypeCooldown: { it: 'Defaticamento (Apple Health)', en: 'Cooldown (Apple Health)', de: 'Abkühlen (Apple Health)' },
};
const HK_FALLBACK = { it: 'Allenamento (Apple Health)', en: 'Workout (Apple Health)', de: 'Training (Apple Health)' };
const HK_RELEVANT_TYPES = Object.keys(HK_ACTIVITY_MAP);
function getXmlAttr(tag, name) {
  const m = tag.match(new RegExp(name + '="([^"]*)"'));
  return m ? m[1] : null;
}
function parseAppleDate(s) {
  if (!s) return null;
  const m = s.match(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) ([+-]\d{2})(\d{2})$/);
  const d = m ? new Date(`${m[1]}T${m[2]}${m[3]}:${m[4]}`) : new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
function parseAppleHealthExport(xmlText) {
  const result = { weightKg: null, weightDate: null, workouts: [] };

  const massRegex = /<Record[^>]*type="HKQuantityTypeIdentifierBodyMass"[^>]*\/?>/g;
  let m, count = 0, latestDate = null, latestVal = null, latestUnit = null;
  while ((m = massRegex.exec(xmlText)) && count < 30000) {
    count++;
    const date = getXmlAttr(m[0], 'startDate');
    const val = getXmlAttr(m[0], 'value');
    const unit = getXmlAttr(m[0], 'unit');
    if (date && val && (!latestDate || date > latestDate)) {
      latestDate = date; latestVal = parseFloat(val); latestUnit = unit;
    }
  }
  if (latestVal != null) {
    result.weightKg = latestUnit && latestUnit.toLowerCase().includes('lb') ? Math.round(latestVal * 0.453592 * 10) / 10 : latestVal;
    result.weightDate = latestDate;
  }

  const workoutRegex = /<Workout[^>]*>/g;
  let wcount = 0;
  while ((m = workoutRegex.exec(xmlText)) && wcount < 5000) {
    const tag = m[0];
    const type = getXmlAttr(tag, 'workoutActivityType');
    if (!type || !HK_RELEVANT_TYPES.includes(type)) continue;
    const startDate = getXmlAttr(tag, 'startDate');
    if (!startDate) continue;
    const durationRaw = parseFloat(getXmlAttr(tag, 'duration') || '0');
    const durationUnit = getXmlAttr(tag, 'durationUnit') || 'min';
    const durationMin = durationUnit === 'min' ? durationRaw : durationRaw / 60;
    const kcalStr = getXmlAttr(tag, 'totalEnergyBurned');
    const kcal = kcalStr ? Math.round(parseFloat(kcalStr)) : Math.round(durationMin * 6);
    result.workouts.push({ type, durationMin: Math.round(durationMin), kcal, startDate });
    wcount++;
  }
  return result;
}

/* ================= LANGUAGE CONTEXT ================= */
const LangContext = createContext({ lang: 'it', t: (k, v) => translate(k, 'it', v), setLang: () => {} });
function useT() { return useContext(LangContext); }

/* ================= EXERCISE FIGURE (pose-specific drawings) ================= */
/* ================= EXERCISE MEDIA (real clip when available, else drawn pictogram) ================= */
let _mediaPromise = null;
function getMediaMap() {
  if (!_mediaPromise) _mediaPromise = import('./media.js').then(m => ({ b64: m.VIDEO_B64, files: m.VIDEO_FILES }));
  return _mediaPromise;
}
function ExerciseMedia({ exerciseId, pose, color = BLAZE, size = '100%', rounded = 10 }) {
  const [src, setSrc] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setSrc(null);
    setVideoSrc(null);
    setFailed(false);
    getMediaMap()
      .then(({ b64, files }) => {
        if (cancelled) return;
        const clip = files[exerciseId] || files[pose] || null;
        setVideoSrc(clip);
        if (!clip) setSrc(b64[exerciseId] || b64[pose] || null);
      })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [exerciseId]);

  if (videoSrc && !failed) {
    return (
      <video src={videoSrc} autoPlay muted loop playsInline preload="metadata"
        onError={() => setFailed(true)}
        style={{ width: size, height: size, objectFit: 'cover', borderRadius: rounded, display: 'block', background: INK }} />
    );
  }
  if (src && !failed) {
    return (
      <img src={src} alt="" onError={() => setFailed(true)}
        style={{ width: size, height: size, objectFit: 'cover', borderRadius: rounded, display: 'block', background: INK }} />
    );
  }
  return <ExerciseFigure pose={pose} color={color} size={size} />;
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

function EqBars({ tone = BLAZE, bars = 5, speed = 1, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 14, ...style }} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span key={i} className="o40-eqbar" style={{
          width: 3, background: tone, height: 8,
          animation: `eqPulse ${(0.55 + (i % 3) * 0.18) / speed}s ease-in-out ${i * 0.08}s infinite`,
        }} />
      ))}
    </div>
  );
}

function CountUp({ value, duration = 600 }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    if (from === to) return;
    prevRef.current = to;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <>{display}</>;
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

/* ================= SMALL UI PIECES ================= */
function DogTag({ label, value, sub }) {
  const numeric = typeof value === 'number';
  return (
    <div className="o40-card" style={{
      background: `linear-gradient(160deg, ${INK_2}, ${INK})`, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '12px 13px',
      position: 'relative', flex: 1, minWidth: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
    }}>
      <div style={{ position: 'absolute', top: 9, left: -5, width: 10, height: 10, borderRadius: '50%', background: INK, border: `2px solid ${KHAKI}` }} />
      <div className="o40-mono" style={{ color: KHAKI, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
      <div className="o40-display" style={{ color: PAPER, fontSize: 26, lineHeight: 1.1 }}>{numeric ? <CountUp value={value} /> : value}</div>
      {sub && <div style={{ color: STEEL, fontSize: 11 }}>{sub}</div>}
    </div>
  );
}

function TopBar({ title, onBack, right }) {
  const { t } = useT();
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'max(14px, env(safe-area-inset-top, 0px)) 16px',
      borderBottom: `1px solid ${OLIVE_DARK}`, background: `${INK}ee`, backdropFilter: 'blur(6px)',
      position: 'sticky', top: 0, zIndex: 5,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 32 }}>
        {onBack && (
          <button onClick={onBack} aria-label={t('app.back')} style={btnIcon}>
            <ChevronLeft size={20} color={PAPER} />
          </button>
        )}
      </div>
      <div className="o40-display" style={{ color: PAPER, fontSize: 22 }}>{title}</div>
      <div style={{ minWidth: 32, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
    </div>
  );
}

const btnIcon = { background: 'transparent', border: 'none', padding: 6, cursor: 'pointer', display: 'flex', borderRadius: 10 };

function BottomNav({ active, onNavigate }) {
  const { t } = useT();
  const tabs = [
    { key: 'home', label: t('nav.home'), icon: HomeIcon },
    { key: 'library', label: t('nav.library'), icon: BookOpen },
    { key: 'history', label: t('nav.history'), icon: HistoryIcon },
    { key: 'setup', label: t('nav.setup'), icon: Settings },
  ];
  return (
    <div style={{
      display: 'flex', borderTop: `1px solid ${OLIVE_DARK}`, background: `${INK}ee`, backdropFilter: 'blur(6px)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    }}>
      {tabs.map(t => {
        const on = active === t.key;
        const Icon = t.icon;
        return (
          <button key={t.key} onClick={() => onNavigate(t.key)} style={{
            flex: 1, background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px 4px 6px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, position: 'relative',
          }}>
            {on && <div style={{ position: 'absolute', top: 0, left: '26%', right: '26%', height: 2, borderRadius: 2, background: BLAZE, boxShadow: `0 0 8px ${BLAZE}` }} />}
            <div style={{
              width: 40, height: 26, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: on ? `${BLAZE}22` : 'transparent', transition: 'background 0.2s ease',
              animation: on ? 'tabPop 0.28s cubic-bezier(0.16,1,0.3,1)' : 'none',
            }}>
              <Icon size={20} color={on ? BLAZE : STEEL} style={{ transition: 'color 0.2s ease' }} />
            </div>
            <span className="o40-mono" style={{ color: on ? BLAZE : STEEL, fontSize: 9.5, letterSpacing: '0.03em' }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ================= MAIN APP ================= */
export default function App() {
  const [screen, setScreen] = useState('loading');
  const [profile, setProfile] = useState(null);
  const [lang, setLang] = useState(detectLang());
  const t = useCallback((key, vars) => translate(key, lang, vars), [lang]);
  async function handleSetLang(l) {
    if (!LANGS.includes(l)) return;
    setLang(l);
    if (profile) {
      const p = { ...profile, lang: l };
      setProfile(p);
      try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
    }
  }
  const [sessions, setSessions] = useState([]);
  const [formName, setFormName] = useState('');
  const [formAge, setFormAge] = useState('');
  const [formWeight, setFormWeight] = useState('');
  const [formWaist, setFormWaist] = useState('');
  const [previewProgram, setPreviewProgram] = useState(null);

  const [activeProgram, setActiveProgram] = useState(null);
  const [seq, setSeq] = useState([]);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [paused, setPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [vibrationOn, setVibrationOn] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [musicTrack, setMusicTrack] = useState(DEFAULT_TRACK);
  const [musicVolume, setMusicVolume] = useState(0.55);
  const [exitConfirm, setExitConfirm] = useState(false);
  const [customPrograms, setCustomPrograms] = useState([]);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);
  const [healthWeightSuggestion, setHealthWeightSuggestion] = useState(null);
  const [healthImportStatus, setHealthImportStatus] = useState('idle');

  const [lastStats, setLastStats] = useState(null);
  const [hrInput, setHrInput] = useState('');
  const [waistInput, setWaistInput] = useState('');
  const [rpe, setRpe] = useState(null);
  const [notes, setNotes] = useState('');
  const [waistHistory, setWaistHistory] = useState([]);
  const [weightHistory, setWeightHistory] = useState([]);
  const [weightInput, setWeightInput] = useState('');
  const soundRef = useRef(true);
  soundRef.current = soundOn;
  const vibrationRef = useRef(true);
  vibrationRef.current = vibrationOn;

  function showToast(message) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = setTimeout(() => setToast(null), 2600);
  }

  // ---- load persisted data ----
  useEffect(() => {
    (async () => {
      let p = null, s = [], cp = [], wh = [];
      try {
        const r = await window.storage.get('o40_profile', false);
        if (r) p = JSON.parse(r.value);
      } catch (e) { /* not set yet */ }
      try {
        const r = await window.storage.get('o40_sessions', false);
        if (r) s = JSON.parse(r.value);
      } catch (e) { /* not set yet */ }
      try {
        const r = await window.storage.get('o40_custom_programs', false);
        if (r) cp = JSON.parse(r.value);
      } catch (e) { /* not set yet */ }
      try {
        const r = await window.storage.get('o40_waist', false);
        if (r) wh = JSON.parse(r.value);
      } catch (e) { /* not set yet */ }
      let wt = null;
      try {
        const r = await window.storage.get('o40_weight', false);
        if (r) wt = JSON.parse(r.value);
      } catch (e) { /* not set yet */ }
      setProfile(p);
      setSessions(s || []);
      setCustomPrograms(cp || []);
      setWaistHistory(wh || []);
      setWeightHistory(wt || []);
      if (p) {
        setLang((p.lang && LANGS.includes(p.lang) && p.lang) || detectLang());
        setFormName(p.name); setFormAge(String(p.age)); setFormWeight(String(p.weight));
        setSoundOn(p.soundOn !== false);
        setVibrationOn(p.vibrationOn !== false);
        setMusicOn(p.musicOn === true);
        setMusicTrack(p.musicTrack || DEFAULT_TRACK);
        if (typeof p.musicVolume === 'number') setMusicVolume(p.musicVolume);
      }
      setScreen(p ? 'home' : 'setup');
    })();
  }, []);

  // ---- tap sound on every button, app-wide ----
  useEffect(() => {
    function handleClick(e) {
      if (e.target.closest('button') && soundRef.current) playClick();
    }
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  // ---- PWA: flag busy periods (mid-workout) so the SW-update reload defers ----
  useEffect(() => {
    window.__o40Busy = screen === 'session';
    if (screen !== 'session' && window.__o40ReloadAfter) {
      window.__o40ReloadAfter = false;
      window.location.reload();
    }
  }, [screen]);

  // ---- auto-pause the session if the app is backgrounded ----
  useEffect(() => {
    function onVisibility() {
      if (document.hidden && screen === 'session') setPaused(true);
    }
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [screen]);

  // ---- motivational music: plays while on, adapts volume to the phase ----
  useEffect(() => {
    musicSetShouldPlay(!!musicOn);
    if (!musicOn) { musicPause(); return; }
    musicLoad(trackSrc(musicTrack));
    let vol = musicVolume;
    if (screen === 'session') {
      const ph = seq[phaseIdx];
      if (ph) {
        if (ph.type === 'rest' || ph.type === 'cooldown') vol *= 0.45;
        else if (ph.type === 'warmup') vol *= 0.75;
      }
      if (paused) vol *= 0.25;
    } else {
      vol *= 0.45;
    }
    musicSetVolume(vol);
    musicPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicOn, screen, musicTrack, phaseIdx, paused, musicVolume, seq]);

  // ---- session countdown ----
  useEffect(() => {
    if (screen !== 'session' || paused) return;
    if (secondsLeft <= 0) {
      advancePhase();
      return;
    }
    const t = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [screen, paused, secondsLeft]);

  function announcePhase(phase) {
    if (!soundRef.current) return;
    if (phase.type === 'work') speak(tr(EXERCISES[phase.exerciseId].name, lang));
    else if (phase.type === 'rest') speak(t('ses.rest'));
    else if (phase.type === 'cooldown') speak(t('ses.cooldown'));
  }

  function advancePhase() {
    const nextIdx = phaseIdx + 1;
    if (nextIdx >= seq.length) {
      finishSession();
      return;
    }
    if (soundRef.current) playBeep(seq[nextIdx].type === 'work' ? 880 : 440);
    if (vibrationRef.current) vibrate(seq[nextIdx].type === 'work' ? [60] : [30, 40, 30]);
    announcePhase(seq[nextIdx]);
    setPhaseIdx(nextIdx);
    setSecondsLeft(seq[nextIdx].duration);
  }

  function goPrev() {
    if (phaseIdx <= 0) return;
    const idx = phaseIdx - 1;
    if (soundRef.current) playBeep(440);
    announcePhase(seq[idx]);
    setPhaseIdx(idx);
    setSecondsLeft(seq[idx].duration);
  }

  function startSession(program) {
    const skip = !!profile.skipWarmup;
    const preset = levelPreset(profile);
    const s = buildSequence(program, skip, preset.work, preset.rest);
    setActiveProgram(program);
    setSeq(s);
    setPhaseIdx(0);
    setSecondsLeft(s[0].duration);
    setPaused(false);
    setRpe(null);
    if (soundRef.current) { playBeep(660); announcePhase(s[0]); }
    setScreen('session');
  }

  function finishSession() {
    const skip = !!profile.skipWarmup;
    const preset = levelPreset(profile);
    const kcal = Math.round(estimateProgramKcal(activeProgram, profile.weight, skip, preset.work, preset.rest));
    if (soundRef.current) playBeep(1000, 0.25);
    if (vibrationRef.current) vibrate([80, 60, 80, 60, 150]);
    setLastStats({ program: activeProgram, kcal, durationSec: totalSeqSeconds(activeProgram, skip, preset.work, preset.rest) });
    setScreen('summary');
  }

  async function saveProfile() {
    const prevLevel = profile && (profile.level || (profile.intervalPreset === 'breve' ? 'recluta' : profile.intervalPreset === 'lungo' ? 'elite' : 'combattente'));
    const p = {
      name: formName.trim() || 'Operatore',
      age: Math.max(18, Math.min(90, parseInt(formAge, 10) || 40)),
      weight: Math.max(40, Math.min(180, parseInt(formWeight, 10) || 80)),
      weeklyGoal: (profile && profile.weeklyGoal) || WEEKLY_GOAL,
      soundOn: profile ? profile.soundOn !== false : true,
      vibrationOn: profile ? profile.vibrationOn !== false : true,
      musicOn: profile ? profile.musicOn === true : false,
      musicTrack: (profile && profile.musicTrack) || DEFAULT_TRACK,
      musicVolume: typeof (profile && profile.musicVolume) === 'number' ? profile.musicVolume : 0.55,
      skipWarmup: profile ? !!profile.skipWarmup : false,
      seenIntro: profile ? !!profile.seenIntro : false,
      intervalPreset: (profile && profile.intervalPreset) || 'standard',
      level: prevLevel || 'combattente',
      lang: lang,
      campStart: profile && profile.campStart ? profile.campStart : new Date().toISOString(),
    };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
    if (formWaist) {
      const cm = Math.max(40, Math.min(200, parseInt(formWaist, 10)));
      if (!isNaN(cm)) await recordWaist(cm);
    }
    setScreen('home');
  }

  async function recordWaist(cm) {
    const latest = waistHistory.length ? waistHistory[waistHistory.length - 1] : null;
    if (latest && latest.cm === cm && dayKey(new Date(latest.date)) === dayKey(new Date())) return;
    const updated = [...waistHistory, { date: new Date().toISOString(), cm }];
    setWaistHistory(updated);
    try { await window.storage.set('o40_waist', JSON.stringify(updated), false); } catch (e) { /* best effort */ }
  }

  async function recordWeight(kg) {
    const latest = weightHistory.length ? weightHistory[weightHistory.length - 1] : null;
    if (latest && latest.kg === kg && dayKey(new Date(latest.date)) === dayKey(new Date())) return;
    const updated = [...weightHistory, { date: new Date().toISOString(), kg }];
    setWeightHistory(updated);
    try { await window.storage.set('o40_weight', JSON.stringify(updated), false); } catch (e) { /* best effort */ }
  }

  async function applyLevel(key) {
    const next = getLevel(key);
    const p = { ...profile, level: next.key, intervalPreset: next.preset };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  async function promoteLevel() {
    const cur = getLevel(profile.level || 'combattente');
    const idx = LEVELS.indexOf(cur);
    if (idx >= LEVELS.length - 1) return;
    const next = LEVELS[idx + 1];
    await applyLevel(next.key);
    showToast(t('toast.level.up', { label: tr(next.label, lang) }));
  }

  async function toggleSkipWarmup() {
    const p = { ...profile, skipWarmup: !profile.skipWarmup };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  async function setIntervalPreset(key) {
    const p = { ...profile, intervalPreset: key };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  async function dismissIntro() {
    const p = { ...profile, seenIntro: true };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  async function updateWeeklyGoal(n) {
    const p = { ...profile, weeklyGoal: Math.max(1, Math.min(7, n)) };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  async function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    const p = { ...profile, soundOn: next };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  async function toggleVibration() {
    const next = !vibrationOn;
    setVibrationOn(next);
    if (next) vibrate([40]);
    const p = { ...profile, vibrationOn: next };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  function trackSrc(id) {
    const t = TRACKS.find(x => x.id === id);
    return (t || TRACKS[0]).src;
  }

  async function toggleMusic() {
    const next = !musicOn;
    setMusicOn(next);
    const p = { ...profile, musicOn: next };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
    musicSetShouldPlay(next);
    if (next) {
      musicLoad(trackSrc(musicTrack));
      musicSetVolume(musicVolume);
      musicPlay();
    } else {
      musicPause();
    }
  }

  async function selectMusicTrack(id) {
    setMusicTrack(id);
    const p = { ...profile, musicTrack: id };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
    if (musicOn) {
      musicLoad(trackSrc(id));
      musicSetVolume(musicVolume);
      musicPlay();
    }
  }

  async function changeMusicVolume(v) {
    setMusicVolume(v);
    musicSetVolume(v);
    const p = { ...profile, musicVolume: v };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  async function saveSession() {
    const prevBest = computeBestStreak(sessions);
    const prevCount = sessions.length;
    const weekAgo = Date.now() - 7 * 86400000;
    const prevWeekCount = sessions.filter(s => new Date(s.date).getTime() > weekAgo).length;
    const goal = profile.weeklyGoal || WEEKLY_GOAL;

    const record = {
      date: new Date().toISOString(),
      programId: activeProgram.id,
      programName: tr(activeProgram.name, lang),
      kcal: lastStats.kcal,
      durationSec: lastStats.durationSec,
      peakHR: hrInput ? parseInt(hrInput, 10) : null,
      rpe: rpe,
      notes: notes.trim() || null,
    };
    const updated = [...sessions, record];
    setSessions(updated);
    try { await window.storage.set('o40_sessions', JSON.stringify(updated), false); } catch (e) { /* best effort */ }
    if (waistInput) {
      const cm = Math.max(40, Math.min(200, parseInt(waistInput, 10)));
      if (!isNaN(cm)) await recordWaist(cm);
    }
    if (weightInput) {
      const kg = Math.round(parseFloat(weightInput.replace(',', '.')) * 10) / 10;
      if (!isNaN(kg)) await recordWeight(Math.max(35, Math.min(250, kg)));
    }
    setHrInput('');
    setWaistInput('');
    setWeightInput('');
    setRpe(null);
    setNotes('');
    setScreen('home');

    const newBest = computeBestStreak(updated);
    const newCount = updated.length;
    const newWeekCount = updated.filter(s => new Date(s.date).getTime() > weekAgo).length;
    const newStreakBadge = STREAK_BADGES.find(n => newBest >= n && prevBest < n);
    const newSessionBadge = SESSION_BADGES.find(n => newCount >= n && prevCount < n);
    const rank = getRank(newCount);
    const prevRank = getRank(prevCount);
    if (rank.current.name !== prevRank.current.name) {
      showToast(t('toast.promoted', { rank: tr(rank.current.name, lang) }));
    } else if (newStreakBadge) {
      showToast(t('toast.milestone.streak', { n: newStreakBadge }));
    } else if (newSessionBadge) {
      showToast(t('toast.milestone.sessions', { n: newSessionBadge }));
    } else if (newWeekCount >= goal && prevWeekCount < goal) {
      showToast(t('toast.goal'));
    } else {
      showToast(t('toast.saved'));
    }
  }

  async function clearHistory() {
    setSessions([]);
    try { await window.storage.set('o40_sessions', JSON.stringify([]), false); } catch (e) { /* best effort */ }
    showToast(t('toast.history'));
  }

  async function deleteSession(date) {
    const updated = sessions.filter(s => s.date !== date);
    setSessions(updated);
    try { await window.storage.set('o40_sessions', JSON.stringify(updated), false); } catch (e) { /* best effort */ }
    showToast(t('toast.removed'));
  }

  async function createCustomProgram(program) {
    const updated = [...customPrograms, program];
    setCustomPrograms(updated);
    try { await window.storage.set('o40_custom_programs', JSON.stringify(updated), false); } catch (e) { /* best effort */ }
    setPreviewProgram(program);
    setScreen('preview');
    showToast(t('toast.created'));
  }

  async function deleteCustomProgram(id) {
    const updated = customPrograms.filter(p => p.id !== id);
    setCustomPrograms(updated);
    try { await window.storage.set('o40_custom_programs', JSON.stringify(updated), false); } catch (e) { /* best effort */ }
  }

  async function importAppleHealth(file) {
    setHealthImportStatus('reading');
    try {
      const text = await file.text();
      setHealthImportStatus('parsing');
      const parsed = parseAppleHealthExport(text);

      const existingImportDates = new Set(sessions.filter(s => s.imported).map(s => s.date));
      const newRecords = [];
      for (const w of parsed.workouts) {
        const d = parseAppleDate(w.startDate);
        if (!d) continue;
        const iso = d.toISOString();
        if (existingImportDates.has(iso)) continue;
        existingImportDates.add(iso);
        newRecords.push({
          date: iso,
          programId: 'health-import',
          programName: tr(HK_ACTIVITY_MAP[w.type] || HK_FALLBACK, lang),
          kcal: w.kcal,
          peakHR: null,
          rpe: null,
          notes: null,
          imported: true,
        });
      }

      if (newRecords.length) {
        const updated = [...sessions, ...newRecords].sort((a, b) => new Date(a.date) - new Date(b.date));
        setSessions(updated);
        try { await window.storage.set('o40_sessions', JSON.stringify(updated), false); } catch (e) { /* best effort */ }
      }

      if (parsed.weightKg) {
        setHealthWeightSuggestion({ kg: Math.round(parsed.weightKg * 10) / 10, date: parsed.weightDate });
      }

      setHealthImportStatus('done');
      showToast(newRecords.length ? t('toast.imported', { n: newRecords.length }) : t('toast.imported.none'));
    } catch (e) {
      setHealthImportStatus('error');
      showToast(t('toast.import.fail'));
    }
  }

  async function applyHealthWeight() {
    if (!healthWeightSuggestion) return;
    const p = { ...profile, weight: Math.round(healthWeightSuggestion.kg) };
    setProfile(p);
    setFormWeight(String(p.weight));
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
    setHealthWeightSuggestion(null);
    showToast(t('toast.weight'));
  }


  /* ---------------- RENDER ---------------- */
  const shell = { minHeight: '100dvh', background: INK, display: 'flex', justifyContent: 'center' };
  const phone = { width: '100%', maxWidth: 460, minHeight: '100dvh', display: 'flex', flexDirection: 'column', position: 'relative' };

  if (screen === 'loading') {
    return (
      <LangContext.Provider value={{ lang, t, setLang: handleSetLang }}>
        <div className="o40" style={{ ...shell, alignItems: 'center', justifyContent: 'center' }}>
          <style>{STYLES}</style>
          <div style={{ textAlign: 'center', width: 'min(320px, 82vw)' }}>
            <div className="o40-display" style={{ color: KHAKI, fontSize: 26 }}>{t('app.loading')} <span className="o40-blink" style={{ color: BLAZE }}>{t('app.loading.operativo')}</span>…</div>
            <div className="o40-loadbar" style={{ height: 6, marginTop: 16 }}><span /></div>
          </div>
        </div>
      </LangContext.Provider>
    );
  }

  return (
    <LangContext.Provider value={{ lang, t, setLang: handleSetLang }}>
      <div className="o40" style={{ ...shell, position: 'relative' }}>
      <style>{STYLES}</style>
      <div className="o40-aura" />
      <div className="o40-phone" style={phone}>
        <div className="o40-gridbg" />
        <div className="o40-camo" style={{ height: 6 }} />

        {screen === 'setup' && (
          <SetupScreen
            formName={formName} setFormName={setFormName}
            formAge={formAge} setFormAge={setFormAge}
            formWeight={formWeight} setFormWeight={setFormWeight}
            formWaist={formWaist} setFormWaist={setFormWaist}
            onSave={saveProfile}
            canCancel={!!profile}
            onCancel={() => setScreen('home')}
            soundOn={soundOn} onToggleSound={toggleSound}
            vibrationOn={vibrationOn} onToggleVibration={toggleVibration}
            musicOn={musicOn} onToggleMusic={toggleMusic}
            musicTrack={musicTrack} onSelectTrack={selectMusicTrack}
            musicVolume={musicVolume} onChangeMusicVolume={changeMusicVolume}
            skipWarmup={!!(profile && profile.skipWarmup)} onToggleSkipWarmup={toggleSkipWarmup}
            level={(profile && (profile.level || (profile.intervalPreset === 'breve' ? 'recluta' : profile.intervalPreset === 'lungo' ? 'elite' : 'combattente'))) || 'combattente'}
            onSetLevel={applyLevel}
            intervalPreset={(profile && profile.intervalPreset) || 'standard'} onSetIntervalPreset={setIntervalPreset}
            onImportHealth={importAppleHealth} healthImportStatus={healthImportStatus}
            healthWeightSuggestion={healthWeightSuggestion} onApplyHealthWeight={applyHealthWeight}
          />
        )}

        {screen === 'home' && profile && (
          <HomeScreen
            profile={profile} sessions={sessions} customPrograms={customPrograms}
            waistHistory={waistHistory} weightHistory={weightHistory}
            onOpenProgram={(p) => { setPreviewProgram(p); setScreen('preview'); }}
            onBuild={() => setScreen('builder')}
            onDeleteCustom={deleteCustomProgram}
            onDismissIntro={dismissIntro}
            onPromote={promoteLevel}
          />
        )}

        {screen === 'library' && (
          <LibraryScreen />
        )}

        {screen === 'builder' && (
          <BuilderScreen
            profile={profile}
            onCancel={() => setScreen('home')}
            onCreate={createCustomProgram}
          />
        )}

        {screen === 'preview' && previewProgram && (
          <PreviewScreen
            program={previewProgram} profile={profile} soundOn={soundOn}
            onBack={() => setScreen('home')}
            onStart={() => setScreen('countdown')}
          />
        )}

        {screen === 'countdown' && previewProgram && (
          <CountdownScreen program={previewProgram} onDone={() => startSession(previewProgram)} />
        )}

        {screen === 'session' && seq.length > 0 && (
          <SessionScreen
            program={activeProgram} seq={seq} phaseIdx={phaseIdx} secondsLeft={secondsLeft}
            paused={paused} setPaused={setPaused} soundOn={soundOn} setSoundOn={setSoundOn}
            musicOn={musicOn} onToggleMusic={toggleMusic}
            onSkip={advancePhase} onPrev={goPrev} exitConfirm={exitConfirm} setExitConfirm={setExitConfirm}
            onExit={() => { setExitConfirm(false); setScreen('home'); }}
          />
        )}

        {screen === 'summary' && lastStats && (
          <SummaryScreen
            stats={lastStats} profile={profile} hrInput={hrInput} setHrInput={setHrInput}
            waistInput={waistInput} setWaistInput={setWaistInput}
            weightInput={weightInput} setWeightInput={setWeightInput}
            rpe={rpe} setRpe={setRpe} notes={notes} setNotes={setNotes}
            onSave={saveSession}
          />
        )}

        {screen === 'history' && (
          <HistoryScreen
            sessions={sessions} profile={profile} waistHistory={waistHistory} weightHistory={weightHistory}
            onBack={() => setScreen('home')}
            onClear={clearHistory}
            onUpdateGoal={updateWeeklyGoal}
            onDeleteSession={deleteSession}
          />
        )}

        {['home', 'library', 'history', 'setup'].includes(screen) && (
          <BottomNav active={screen} onNavigate={setScreen} />
        )}

        {toast && (
          <div style={{
            position: 'absolute', left: 16, right: 16, bottom: 20, zIndex: 20,
            display: 'flex', justifyContent: 'center', pointerEvents: 'none',
          }}>
            <div className="o40-toast-in" style={{
              background: `linear-gradient(135deg, ${OLIVE}, ${OLIVE_DARK})`, border: `1px solid ${BLAZE}`,
              borderRadius: 12, padding: '10px 18px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              color: PAPER, fontSize: 13, fontWeight: 600, textAlign: 'center', maxWidth: '100%',
            }}>
              {toast}
            </div>
          </div>
        )}
      </div>
      </div>
    </LangContext.Provider>
  );
}

/* ================= COUNTDOWN SCREEN (3-2-1 before the mission starts) ================= */
function CountdownScreen({ program, onDone }) {
  const { lang, t } = useT();
  const [n, setN] = useState(3);
  useEffect(() => {
    if (n <= 0) { onDone(); return; }
    playBeep(n === 1 ? 880 : 550, 0.15);
    const t = setTimeout(() => setN(v => v - 1), 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [n]);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <div className="o40-mono" style={{ color: KHAKI, fontSize: 13, letterSpacing: '0.15em' }}>{tr(program.name, lang)}</div>
      <div className="o40-display" style={{ color: BLAZE, fontSize: 110, lineHeight: 1 }}>{n > 0 ? n : t('countdown.go')}</div>
      <div style={{ color: STEEL, fontSize: 13 }}>{t('countdown.getReady')}</div>
    </div>
  );
}

/* ================= SETUP SCREEN ================= */
function SetupScreen({ formName, setFormName, formAge, setFormAge, formWeight, setFormWeight, formWaist, setFormWaist, onSave, canCancel, onCancel, soundOn, onToggleSound, vibrationOn, onToggleVibration, musicOn, onToggleMusic, musicTrack, onSelectTrack, musicVolume, onChangeMusicVolume, skipWarmup, onToggleSkipWarmup, level, onSetLevel, intervalPreset, onSetIntervalPreset, onImportHealth, healthImportStatus, healthWeightSuggestion, onApplyHealthWeight }) {
  const { lang, t, setLang } = useT();
  const curLevel = getLevel(level || 'combattente');
  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar title={t('setup.title')} onBack={canCancel ? onCancel : null} />
      <div className="o40-scroll" style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {LANGS.map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              flex: 1, padding: '9px 0', borderRadius: 10, cursor: 'pointer', textAlign: 'center',
              background: lang === l ? OLIVE_DARK : INK, border: `1px solid ${lang === l ? BLAZE : OLIVE}`,
              color: lang === l ? BLAZE : KHAKI, fontSize: 12, fontWeight: 700, letterSpacing: '0.05em',
            }}>
              {l === 'it' ? 'ITALIANO' : l === 'en' ? 'ENGLISH' : 'DEUTSCH'}
            </button>
          ))}
        </div>
        <p style={{ color: STEEL, fontSize: 14, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: t('setup.intro') }} />
        <Field label={t('setup.name')}>
          <input value={formName} onChange={e => setFormName(e.target.value)} placeholder={t('setup.name.ph')}
            className="o40-input" style={inputStyle} />
        </Field>
        <Field label={t('setup.age')}>
          <input value={formAge} onChange={e => setFormAge(e.target.value.replace(/\D/g, ''))} inputMode="numeric"
            placeholder="40" className="o40-input" style={inputStyle} />
        </Field>
        <Field label={t('setup.weight')}>
          <input value={formWeight} onChange={e => setFormWeight(e.target.value.replace(/\D/g, ''))} inputMode="numeric"
            placeholder="82" className="o40-input" style={inputStyle} />
        </Field>
        <Field label={t('setup.waist')}>
          <input value={formWaist} onChange={e => setFormWaist(e.target.value.replace(/\D/g, ''))} inputMode="numeric"
            placeholder={t('setup.waist.ph')} className="o40-input" style={inputStyle} />
        </Field>

        {canCancel && (
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 4 }}>
            <ToggleRow label={t('setup.sounds')} icon={soundOn ? Volume2 : VolumeX} on={soundOn} onClick={onToggleSound} />
            <div style={{ height: 1, background: OLIVE_DARK, margin: '0 12px' }} />
            <ToggleRow label={t('setup.vibration')} icon={Vibrate} on={vibrationOn} onClick={onToggleVibration} />
            <div style={{ height: 1, background: OLIVE_DARK, margin: '0 12px' }} />
            <ToggleRow label={t('setup.skip')} icon={SkipForward} on={skipWarmup} onClick={onToggleSkipWarmup} />
          </div>
        )}

        {canCancel && (
          <div className="o40-sheen" style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 4, position: 'relative', overflow: 'hidden' }}>
            <ToggleRow label={t('setup.music')} icon={musicOn ? Music2 : HeadphoneOff} on={musicOn} onClick={onToggleMusic} />
            {musicOn && (
              <div style={{ padding: '8px 10px 12px' }}>
                <div style={{ color: STEEL, fontSize: 11.5, marginBottom: 8 }}>{t('setup.music.pick')}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {TRACKS.map(track => {
                    const on = musicTrack === track.id;
                    return (
                      <button key={track.id} onClick={() => onSelectTrack(track.id)} style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, cursor: 'pointer',
                        textAlign: 'left', background: on ? OLIVE_DARK : INK, border: `1px solid ${on ? BLAZE : OLIVE}`,
                      }}>
                        {on ? <Music2 size={15} color={BLAZE} /> : <Music size={15} color={STEEL} />}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span className="o40-mono" style={{ color: PAPER, fontSize: 12 }}>{track.name}</span>
                            <span className="o40-mono" style={{ fontSize: 9, color: track.lang === 'IT' ? '#7FB069' : track.lang === 'DE' ? '#D9B34C' : STEEL, border: `1px solid ${track.lang === 'IT' ? '#7FB06966' : track.lang === 'DE' ? '#D9B34C66' : `${STEEL}44`}`, borderRadius: 4, padding: '0 4px' }}>{track.lang}</span>
                          </div>
                          <div style={{ color: STEEL, fontSize: 10.5 }}>{track.artist} · {track.tag} · 2:00</div>
                        </div>
                        <span className="o40-mono" style={{ color: on ? BLAZE : KHAKI, fontSize: 10 }}>{on ? t('setup.music.playing') : t('setup.music.listen')}</span>
                      </button>
                    );
                  })}
                </div>
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Volume2 size={15} color={KHAKI} />
                  <input type="range" min={0} max={100} value={Math.round(musicVolume * 100)}
                    onChange={e => onChangeMusicVolume(e.target.value / 100)}
                    style={{ flex: 1, accentColor: BLAZE }} />
                </div>
                <div style={{ marginTop: 8, color: STEEL, fontSize: 10, lineHeight: 1.4 }}>
                  {t('setup.music.note')}
                </div>
              </div>
            )}
          </div>
        )}

        {canCancel && (
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              {t('setup.level')}
            </div>
            <div style={{ color: STEEL, fontSize: 11.5, marginBottom: 10 }}>{t('setup.level.hint')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {LEVELS.map(l => (
                <button key={l.key} onClick={() => onSetLevel(l.key)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, cursor: 'pointer', textAlign: 'left',
                  background: curLevel.key === l.key ? OLIVE_DARK : INK, border: `1px solid ${curLevel.key === l.key ? BLAZE : OLIVE}`,
                }}>
                  {curLevel.key === l.key ? <Crown size={15} color={BLAZE} /> : <Medal size={15} color={STEEL} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="o40-mono" style={{ color: PAPER, fontSize: 12.5 }}>{tr(l.label, lang)}</div>
                    <div style={{ color: STEEL, fontSize: 11 }}>{tr(l.desc, lang)}</div>
                  </div>
                  <span className="o40-mono" style={{ color: curLevel.key === l.key ? BLAZE : KHAKI, fontSize: 11 }}>{l.work}\u2033/{l.rest}\u2033</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {canCancel && (
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              {t('setup.health')}
            </div>
            <div style={{ color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: t('setup.health.body') }} />
            <label style={{
              ...secondaryBtn, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', width: '100%',
            }}>
              {healthImportStatus === 'reading' || healthImportStatus === 'parsing' ? t('setup.health.processing') : t('setup.health.upload')}
              <input type="file" accept=".xml" style={{ display: 'none' }}
                onChange={e => { const f = e.target.files && e.target.files[0]; if (f) onImportHealth(f); e.target.value = ''; }} />
            </label>
            {healthImportStatus === 'error' && (
              <div style={{ color: BLAZE, fontSize: 11.5, marginTop: 8 }}>{t('setup.health.error')}</div>
            )}
            {healthWeightSuggestion && (
              <div style={{ marginTop: 12, background: INK, border: `1px solid ${BLAZE}`, borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, color: PAPER, fontSize: 12.5 }}>
                  {t('setup.health.weight')} <strong>{healthWeightSuggestion.kg} kg</strong>
                </div>
                <button onClick={onApplyHealthWeight} style={{ ...primaryBtn, width: 'auto', padding: '8px 14px', fontSize: 13 }}>{t('setup.health.apply')}</button>
              </div>
            )}
          </div>
        )}

        <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12, display: 'flex', gap: 10 }}>
          <HeartPulse size={20} color={BLAZE} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ color: KHAKI, fontSize: 12.5, lineHeight: 1.5 }}>
            {t('setup.tech.note')}
          </div>
        </div>

        <button onClick={onSave} disabled={!formAge || !formWeight} style={{
          ...primaryBtn, opacity: (!formAge || !formWeight) ? 0.5 : 1, marginTop: 4,
        }}>
          {t('setup.enlist')} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
function ToggleRow({ label, icon: Icon, on, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', background: 'transparent', border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 8px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
        <Icon size={18} color={on ? BLAZE : STEEL} style={{ flexShrink: 0 }} />
        <span style={{ color: PAPER, fontSize: 13.5, lineHeight: 1.3 }}>{label}</span>
      </div>
      <div style={{ width: 40, height: 22, borderRadius: 11, background: on ? BLAZE : OLIVE_DARK, position: 'relative', transition: 'background 0.2s', flexShrink: 0, marginLeft: 10 }}>
        <div style={{
          position: 'absolute', top: 2, left: on ? 20 : 2, width: 18, height: 18, borderRadius: '50%',
          background: PAPER, transition: 'left 0.2s',
        }} />
      </div>
    </button>
  );
}
function Field({ label, children }) {
  return (
    <div>
      <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}
const inputStyle = {
  width: '100%', background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: '12px 14px',
  color: PAPER, fontSize: 16, fontFamily: 'Inter, sans-serif', outline: 'none',
};
const primaryBtn = {
  background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, color: PAPER, border: 'none', borderRadius: 14, padding: '15px 18px',
  fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: '0.06em', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%',
  boxShadow: `0 6px 20px ${BLAZE}4d`,
};

/* ================= HOME SCREEN ================= */
function HomeScreen({ profile, sessions, customPrograms, waistHistory, weightHistory, onOpenProgram, onBuild, onDeleteCustom, onDismissIntro, onPromote }) {
  const { lang, t } = useT();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [showOthers, setShowOthers] = useState(false);
  const streak = computeStreak(sessions);
  const weekAgo = Date.now() - 7 * 86400000;
  const kcalWeek = Math.round(sessions.filter(s => new Date(s.date).getTime() > weekAgo).reduce((a, s) => a + s.kcal, 0));
  const sessionsThisWeek = sessions.filter(s => new Date(s.date).getTime() > weekAgo).length;
  const weeklyGoal = profile.weeklyGoal || WEEKLY_GOAL;
  const { program: todayProgram, adaptive } = pickNextProgram(sessions, profile);
  const others = PROGRAMS.filter(p => p.id !== todayProgram.id);
  const { current: rank, next: nextRank } = getRank(sessions.length);
  const upcoming = nextBadge(sessions);
  const lastSession = sessions.length ? sessions[sessions.length - 1] : null;
  const lastProgram = lastSession && lastSession.programId !== 'health-import'
    ? [...PROGRAMS, ...customPrograms].find(p => p.id === lastSession.programId)
    : null;
  const campDay = campDayIndex(profile);
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
        <DogTag label={t('dt.streak')} value={streak} sub={streak === 1 ? t('dt.day') : t('dt.days')} />
        <DogTag label={t('dt.sessions')} value={sessions.length} sub={t('dt.total')} />
        <DogTag label={t('dt.kcal')} value={kcalWeek} sub={t('dt.7d')} />
      </div>

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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }} className="o40-mono">
          <span style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('home.goal.title')}</span>
          <span style={{ color: sessionsThisWeek >= weeklyGoal ? BLAZE : STEEL, fontSize: 11 }}>{sessionsThisWeek}/{weeklyGoal}</span>
        </div>
        <SegmentedProgress total={weeklyGoal} current={Math.min(sessionsThisWeek, weeklyGoal)} currentProgress={1} color={BLAZE} />
        {upcoming && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <Trophy size={12} color={KHAKI} />
            <span style={{ color: STEEL, fontSize: 11 }}>
              {t('home.next.title', { n: upcoming.remaining, unit: upcoming.kind === 'serie' ? (upcoming.remaining === 1 ? t('home.unit.streak1') : t('home.unit.streakN')) : (upcoming.remaining === 1 ? t('home.unit.session1') : t('home.unit.sessionN')) })}
            </span>
          </div>
        )}
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
          <div style={{ position: 'absolute', right: -10, top: -10, opacity: 0.15 }}>
            <ExerciseFigure pose={EXERCISES[todayProgram.exercises[0]].pose} color={PAPER} size={130} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="o40-mono" style={{ color: BLAZE, fontSize: 11, letterSpacing: '0.1em' }}>{t('home.mission.tag', { id: todayProgram.id })}</div>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 9.5, letterSpacing: '0.08em', background: `${KHAKI}18`, border: `1px solid ${KHAKI}44`, borderRadius: 6, padding: '2px 7px' }}>
              {tr(todayProgram.focus, lang)}
            </div>
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

        <button onClick={() => setShowOthers(v => !v)} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
          background: 'transparent', border: 'none', cursor: 'pointer', margin: '20px 0 8px', padding: 0,
        }}>
          <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('home.other')}</span>
          <ChevronRight size={16} color={STEEL} style={{ transform: showOthers ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
        {showOthers && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {others.map(p => (
              <button key={p.id} onClick={() => onOpenProgram(p)} style={{
                display: 'flex', alignItems: 'center', gap: 12, background: INK_2, border: `1px solid ${OLIVE}`,
                borderRadius: 10, padding: 12, cursor: 'pointer', textAlign: 'left',
              }}>
                <div style={{ width: 40, height: 40, flexShrink: 0 }}>
                  <ExerciseFigure pose={EXERCISES[p.exercises[0]].pose} color={KHAKI} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: PAPER, fontSize: 14.5, fontWeight: 600 }}>{tr(p.name, lang)}</div>
                  <div style={{ color: STEEL, fontSize: 12 }}>{tr(p.tagline, lang)}</div>
                </div>
                <ChevronRight size={18} color={STEEL} />
              </button>
            ))}
          </div>
        )}

        <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '20px 0 8px' }}>{t('home.yours')}</div>
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

/* ================= LIBRARY SCREEN (browse all exercises) ================= */
function LibraryScreen() {
  const { lang, t } = useT();
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const visibleIds = Object.keys(EXERCISES).filter(id =>
    filter === 'all' ? true : EXERCISE_GROUPS[filter].includes(id)
  );

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 16px 4px' }}>
        <div className="o40-display" style={{ color: PAPER, fontSize: 26 }}>{t('lib.title')}</div>
        <div style={{ color: KHAKI, fontSize: 13 }}>{t('lib.sub')}</div>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px 4px' }}>
        {[['all', t('lib.all')], ['standing', t('lib.standing')], ['ground', t('lib.ground')], ['core', t('lib.core')]].map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)} style={{
            padding: '6px 12px', borderRadius: 20, cursor: 'pointer',
            background: filter === key ? BLAZE : 'transparent', border: `1px solid ${filter === key ? BLAZE : OLIVE}`,
          }}>
            <span className="o40-mono" style={{ color: filter === key ? PAPER : STEEL, fontSize: 11 }}>{label}</span>
          </button>
        ))}
      </div>
      <div className="o40-scroll" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visibleIds.map(id => {
            const ex = EXERCISES[id];
            const isOpen = selectedId === id;
            return (
              <button key={id} className="o40-card" onClick={() => { const opening = !isOpen; setSelectedId(opening ? id : null); if (opening) speak(tr(ex.name, lang)); }} style={{
                display: 'flex', flexDirection: 'column', gap: 12, background: INK_2,
                border: `1px solid ${isOpen ? BLAZE : OLIVE}`, borderRadius: 14, padding: 12,
                cursor: 'pointer', textAlign: 'left', width: '100%',
              }}>
                {isOpen && (
                  <div className="o40-expand" style={{ width: '100%', aspectRatio: hasClip(id, ex.pose) ? '9 / 16' : '1 / 1', maxHeight: hasClip(id, ex.pose) ? 320 : 260, background: INK, borderRadius: 10, border: `1px solid ${OLIVE}`, overflow: 'hidden' }}>
                    <ExerciseMedia exerciseId={id} pose={ex.pose} color={BLAZE} rounded={10} />
                  </div>
                )}
                <div style={{ display: 'flex', gap: 12 }}>
                  {!isOpen && (
                    <div style={{ width: 52, height: 52, flexShrink: 0, background: INK, borderRadius: 8, border: `1px solid ${OLIVE}`, overflow: 'hidden' }}>
                      <ExerciseMedia exerciseId={id} pose={ex.pose} color={BLAZE} rounded={8} />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: PAPER, fontWeight: 700, fontSize: 14.5 }}>{tr(ex.name, lang)}</div>
                    <div style={{ color: KHAKI, fontSize: 12 }}>{tr(ex.repGuide, lang)}</div>
                    {isOpen ? (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 5, textAlign: 'left' }}>
                          {ex.steps.map((s, i) => (
                            <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                              <span className="o40-mono" style={{ color: KHAKI, fontSize: 10, minWidth: 13 }}>{i + 1}.</span>
                              <span style={{ color: STEEL, fontSize: 11.5, lineHeight: 1.4 }}>{tr(s, lang)}</span>
                            </div>
                          ))}
                        </div>
                        {ex.breath && (
                          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 6, color: OLIVE }}>
                            <Wind size={12} style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: 11, fontStyle: 'italic', lineHeight: 1.4 }}>{tr(ex.breath, lang)}</span>
                          </div>
                        )}
                        <div style={{ color: STEEL, fontSize: 11.5, marginTop: 6, lineHeight: 1.4, fontStyle: 'italic' }}>{tr(ex.tip40, lang)}</div>
                      </>
                    ) : (
                      <div style={{ color: STEEL, fontSize: 11.5, marginTop: 3, lineHeight: 1.4 }}>{tr(ex.cue, lang)}</div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ================= BUILDER SCREEN (custom mission) ================= */
function BuilderScreen({ profile, onCancel, onCreate }) {
  const { lang, t } = useT();
  const [selected, setSelected] = useState([]);
  const [rounds, setRounds] = useState(2);
  const [name, setName] = useState('');
  const [filter, setFilter] = useState('all');

  function toggleEx(id) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : (s.length < 10 ? [...s, id] : s));
  }

  const canCreate = selected.length >= 3;
  const draft = { id: `custom-${Date.now()}`, name: name.trim() || t('bld.draft.name'), tagline: t('bld.draft.tagline'), rounds, exercises: selected };
  const preset = levelPreset(profile);
  const kcal = canCreate ? Math.round(estimateProgramKcal(draft, profile.weight, !!profile.skipWarmup, preset.work, preset.rest)) : 0;
  const mins = canCreate ? Math.round(totalSeqSeconds(draft, !!profile.skipWarmup, preset.work, preset.rest) / 60) : 0;
  const visibleIds = Object.keys(EXERCISES).filter(id =>
    filter === 'all' ? true : EXERCISE_GROUPS[filter].includes(id)
  );

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar title={t('bld.title')} onBack={onCancel} />
      <div className="o40-scroll" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <Field label={t('bld.name')}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder={t('bld.name.ph')}
            className="o40-input" style={inputStyle} />
        </Field>

        <div style={{ marginTop: 16 }}>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{t('bld.rounds')}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3].map(r => (
              <button key={r} onClick={() => setRounds(r)} style={{
                flex: 1, padding: '10px 0', borderRadius: 10, cursor: 'pointer', textAlign: 'center',
                background: rounds === r ? BLAZE : INK_2, border: `1px solid ${rounds === r ? BLAZE : OLIVE}`,
              }}>
                <span className="o40-display" style={{ color: PAPER, fontSize: 18 }}>{r}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '18px 0 8px' }}>
          {t('bld.exercises', { sel: selected.length })}
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {[['all', t('lib.all')], ['standing', t('lib.standing')], ['ground', t('lib.ground')], ['core', t('lib.core')]].map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)} style={{
              padding: '6px 12px', borderRadius: 20, cursor: 'pointer',
              background: filter === key ? BLAZE : 'transparent', border: `1px solid ${filter === key ? BLAZE : OLIVE}`,
            }}>
              <span className="o40-mono" style={{ color: filter === key ? PAPER : STEEL, fontSize: 11 }}>{label}</span>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {visibleIds.map(id => {
            const ex = EXERCISES[id];
            const on = selected.includes(id);
            return (
              <button key={id} onClick={() => toggleEx(id)} style={{
                display: 'flex', alignItems: 'center', gap: 12, background: on ? OLIVE_DARK : INK_2,
                border: `1px solid ${on ? BLAZE : OLIVE}`, borderRadius: 10, padding: 10, cursor: 'pointer', textAlign: 'left',
              }}>
                <div style={{ width: 36, height: 36, flexShrink: 0 }}>
                  <ExerciseFigure pose={ex.pose} color={on ? BLAZE : STEEL} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: PAPER, fontSize: 13.5, fontWeight: 600 }}>{tr(ex.name, lang)}</div>
                  <div style={{ color: STEEL, fontSize: 11 }}>{tr(ex.repGuide, lang)}</div>
                </div>
                <div style={{
                  width: 20, height: 20, borderRadius: 5, border: `1px solid ${on ? BLAZE : OLIVE}`,
                  background: on ? BLAZE : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {on && <Check size={13} color={PAPER} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ padding: 16, borderTop: `1px solid ${OLIVE_DARK}` }}>
        {canCreate ? (
          <>
            <div style={{ display: 'flex', gap: 14, marginBottom: 10, color: STEEL, fontSize: 12.5, justifyContent: 'center' }}>
              <span>{t('bld.min', { m: mins })}</span><span>·</span><span>{t('bld.kcal', { k: kcal })}</span>
            </div>
            <button onClick={() => onCreate(draft)} style={primaryBtn}><Check size={18} /> {t('bld.create.go')}</button>
          </>
        ) : (
          <div style={{ color: STEEL, fontSize: 13, textAlign: 'center' }}>{t('bld.hint')}</div>
        )}
      </div>
    </div>
  );
}

/* ================= PREVIEW SCREEN ================= */
function groupOf(id) {
  return EXERCISE_GROUPS.standing.includes(id) ? 'standing' : 'ground';
}

function PreviewScreen({ program, profile, soundOn, onBack, onStart }) {
  const { lang, t } = useT();
  const [selectedId, setSelectedId] = useState(null);
  const [subs, setSubs] = useState({});
  const [swapOpenId, setSwapOpenId] = useState(null);

  const effectiveExercises = program.exercises.map(id => subs[id] || id);
  const effectiveProgram = { ...program, exercises: effectiveExercises };
  const preset = levelPreset(profile);
  const kcal = Math.round(estimateProgramKcal(effectiveProgram, profile.weight, !!profile.skipWarmup, preset.work, preset.rest));
  const mins = Math.round(totalSeqSeconds(effectiveProgram, !!profile.skipWarmup, preset.work, preset.rest) / 60);

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar title={t('prev.title', { id: program.id })} onBack={onBack} />
      <div className="o40-scroll" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <div className="o40-display" style={{ color: PAPER, fontSize: 26 }}>{tr(program.name, lang)}</div>
        <div style={{ color: KHAKI, fontSize: 14, marginBottom: 14 }}>{tr(program.tagline, lang)}</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          <DogTag label={t('dt.duration')} value={`${mins}′`} />
          <DogTag label={t('dt.estkcal')} value={kcal} />
          <DogTag label={t('dt.rounds')} value={program.rounds} />
        </div>

        <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '4px 0 10px' }}>
          {t('prev.sub', { n: program.exercises.length, r: program.rounds, p: tr(preset.label, lang) })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {program.exercises.map((originalId, i) => {
            const currentId = subs[originalId] || originalId;
            const ex = EXERCISES[currentId];
            const isOpen = selectedId === originalId;
            const isSwapping = swapOpenId === originalId;
            const isSubbed = !!subs[originalId];
            const usedElsewhere = effectiveExercises.filter((_, idx) => program.exercises[idx] !== originalId);
            const alternatives = EXERCISE_GROUPS[groupOf(originalId)].filter(aid => aid !== currentId && !usedElsewhere.includes(aid));
            return (
              <div key={originalId} style={{
                display: 'flex', flexDirection: 'column', gap: 12, background: INK_2,
                border: `1px solid ${isOpen ? BLAZE : OLIVE}`, borderRadius: 10, padding: 12,
              }}>
                {isOpen && (
                  <div className="o40-expand" style={{ width: '100%', aspectRatio: hasClip(currentId, ex.pose) ? '9 / 16' : '1 / 1', maxHeight: hasClip(currentId, ex.pose) ? 320 : 260, background: INK, borderRadius: 10, border: `1px solid ${OLIVE}`, overflow: 'hidden' }}>
                    <ExerciseMedia exerciseId={currentId} pose={ex.pose} color={BLAZE} rounded={10} />
                  </div>
                )}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => { const opening = !isOpen; setSelectedId(opening ? originalId : null); if (opening && soundOn) speak(tr(ex.name, lang)); }} style={{
                    display: 'flex', gap: 12, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, flex: 1, minWidth: 0,
                  }}>
                    {!isOpen && (
                      <div style={{ width: 52, height: 52, flexShrink: 0, background: INK, borderRadius: 8, border: `1px solid ${OLIVE}`, overflow: 'hidden' }}>
                        <ExerciseMedia exerciseId={currentId} pose={ex.pose} color={BLAZE} rounded={8} />
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                        <span className="o40-mono" style={{ color: STEEL, fontSize: 11 }}>{i + 1}.</span>
                        <span style={{ color: PAPER, fontWeight: 700, fontSize: 14.5 }}>{tr(ex.name, lang)}</span>
                        {isSubbed && <span className="o40-mono" style={{ color: KHAKI, fontSize: 9, border: `1px solid ${OLIVE}`, borderRadius: 4, padding: '1px 4px' }}>{t('prev.swapped')}</span>}
                      </div>
                      <div style={{ color: KHAKI, fontSize: 12 }}>{tr(ex.repGuide, lang)}</div>
                      {isOpen && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 5, textAlign: 'left' }}>
                          {ex.steps.map((s, k) => (
                            <div key={k} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                              <span className="o40-mono" style={{ color: KHAKI, fontSize: 10, minWidth: 13 }}>{k + 1}.</span>
                              <span style={{ color: STEEL, fontSize: 11.5, lineHeight: 1.4 }}>{tr(s, lang)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {isOpen && ex.breath && (
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 6, color: OLIVE }}>
                          <Wind size={12} style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: 11, fontStyle: 'italic', lineHeight: 1.4 }}>{tr(ex.breath, lang)}</span>
                        </div>
                      )}
                      <div style={{ color: STEEL, fontSize: 11.5, marginTop: 3, lineHeight: 1.4, fontStyle: 'italic' }}>{tr(ex.tip40, lang)}</div>
                    </div>
                  </button>
                  <button onClick={() => setSwapOpenId(isSwapping ? null : originalId)} style={{ ...btnIcon, flexShrink: 0, alignSelf: 'flex-start' }} aria-label={t('prev.swap')}>
                    <RefreshCw size={16} color={isSwapping ? BLAZE : STEEL} />
                  </button>
                </div>
                {isSwapping && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 4, borderTop: `1px solid ${OLIVE_DARK}` }}>
                    {isSubbed && (
                      <button onClick={() => { setSubs(s => { const n = { ...s }; delete n[originalId]; return n; }); setSwapOpenId(null); }} style={{
                        padding: '6px 10px', borderRadius: 20, background: 'transparent', border: `1px solid ${KHAKI}`, cursor: 'pointer',
                      }}>
                        <span className="o40-mono" style={{ color: KHAKI, fontSize: 10.5 }}>{t('prev.restore', { name: tr(EXERCISES[originalId].name, lang) })}</span>
                      </button>
                    )}
                    {alternatives.map(aid => (
                      <button key={aid} onClick={() => { setSubs(s => ({ ...s, [originalId]: aid })); setSwapOpenId(null); }} style={{
                        padding: '6px 10px', borderRadius: 20, background: INK, border: `1px solid ${OLIVE}`, cursor: 'pointer',
                      }}>
                        <span className="o40-mono" style={{ color: PAPER, fontSize: 10.5 }}>{tr(EXERCISES[aid].name, lang)}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ padding: 16, borderTop: `1px solid ${OLIVE_DARK}` }}>
        <button onClick={() => onStart(effectiveProgram)} className="o40-pulsebtn" style={{ ...primaryBtn, borderRadius: 14 }}><Play size={18} /> {t('prev.go')}</button>
      </div>
    </div>
  );
}

/* ================= SESSION SCREEN ================= */
function SessionScreen({ program, seq, phaseIdx, secondsLeft, paused, setPaused, soundOn, setSoundOn, musicOn, onToggleMusic, onSkip, onPrev, exitConfirm, setExitConfirm, onExit }) {
  const { lang, t } = useT();
  const phase = seq[phaseIdx];
  const next = seq[phaseIdx + 1];
  const ex = phase.exerciseId ? EXERCISES[phase.exerciseId] : null;
  const nextEx = next && next.exerciseId ? EXERCISES[next.exerciseId] : null;
  const progress = 1 - secondsLeft / phase.duration;

  const phaseLabel = phase.type === 'warmup' ? t('ses.warmup')
    : phase.type === 'cooldown' ? t('ses.cooldown')
    : phase.type === 'rest' ? t('ses.rest')
    : t('ses.round', { r: phase.round, name: tr(ex.name, lang).toUpperCase() });

  const ringColor = phase.type === 'rest' ? OLIVE : phase.type === 'work' ? BLAZE : KHAKI;
  const doneWork = seq.slice(0, phaseIdx).filter(p => p.type === 'work').length;
  const totalWork = seq.filter(p => p.type === 'work').length;
  const elapsedSec = seq.slice(0, phaseIdx).reduce((a, p) => a + p.duration, 0) + (phase.duration - secondsLeft);

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar title={tr(program.name, lang)}
        onBack={() => setExitConfirm(true)}
        right={<div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {musicOn && <EqBars tone={ringColor} bars={4} speed={phase.type === 'work' ? 1.4 : phase.type === 'rest' ? 0.5 : 0.8} style={{ marginRight: 6, height: 12 }} />}
          <button onClick={onToggleMusic} style={btnIcon} aria-label={t('ses.music')}>{musicOn ? <Music2 size={18} color={BLAZE} /> : <HeadphoneOff size={18} color={STEEL} />}</button>
          <button onClick={() => setSoundOn(!soundOn)} style={btnIcon}>{soundOn ? <Volume2 size={18} color={PAPER} /> : <VolumeX size={18} color={STEEL} />}</button>
        </div>}
      />

      <div style={{ padding: '10px 16px 0' }}>
        <SegmentedProgress total={seq.length} current={phaseIdx} currentProgress={progress} color={ringColor} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }} className="o40-mono">
          <span style={{ color: STEEL, fontSize: 11 }}>{t('ses.elapsed', { t: formatTime(elapsedSec) })}</span>
          <span style={{ color: STEEL, fontSize: 11 }}>{t('ses.ex', { a: doneWork, b: totalWork })}</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 16 }}>
        <div key={phaseIdx} className={`o40-mono o40-expand ${phase.type === 'work' ? 'o40-gradtext' : ''}`} style={{ color: ringColor, fontSize: 13, letterSpacing: '0.1em' }}>{phaseLabel}</div>

        <div style={{ position: 'relative', width: 240, height: 240 }}>
          <div style={{
            position: 'absolute', inset: -18, borderRadius: '50%',
            background: `radial-gradient(circle, ${ringColor}30 0%, transparent 70%)`,
            transition: 'background 0.3s ease',
            animation: phase.type === 'rest' ? 'restBreath 2.4s ease-in-out infinite' : 'none',
          }} />
          {phase.type === 'work' && (
            <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: `2px solid ${ringColor}44`, animation: 'ringPulse 1.5s ease-out infinite' }} />
          )}
          <ProgressRing progress={progress} color={ringColor} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {ex ? (
              <div style={{ width: 150, height: 150 }}><ExerciseMedia exerciseId={phase.exerciseId} pose={ex.pose} color={PAPER} rounded={14} /></div>
            ) : (
              <div className="o40-display" style={{ color: PAPER, fontSize: 44 }}>{formatTime(secondsLeft)}</div>
            )}
          </div>
        </div>
        {ex && <div className="o40-display" style={{ color: PAPER, fontSize: 40 }}>{formatTime(secondsLeft)}</div>}

        {ex && (
          <div style={{ textAlign: 'center', maxWidth: 330 }}>
            <div style={{ color: KHAKI, fontSize: 13 }}>{tr(ex.repGuide, lang)}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8, textAlign: 'left' }}>
              {ex.steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                  <span className="o40-mono" style={{ color: KHAKI, fontSize: 10.5, minWidth: 15 }}>{i + 1}.</span>
                  <span style={{ color: STEEL, fontSize: 12, lineHeight: 1.4 }}>{tr(s, lang)}</span>
                </div>
              ))}
            </div>
            {ex.breath && (
              <div style={{ display: 'flex', gap: 7, alignItems: 'center', justifyContent: 'center', marginTop: 9, color: OLIVE }}>
                <Wind size={13} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 11.5, fontStyle: 'italic', lineHeight: 1.4 }}>{tr(ex.breath, lang)}</span>
              </div>
            )}
            {ex.tip40 && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 10, textAlign: 'left', background: `${KHAKI}10`, border: `1px solid ${KHAKI}44`, borderRadius: 10, padding: '8px 10px' }}>
                <Lightbulb size={14} color={KHAKI} style={{ flexShrink: 0, marginTop: 1 }} />
                <div style={{ color: KHAKI, fontSize: 11.5, lineHeight: 1.45 }}>{tr(ex.tip40, lang)}</div>
              </div>
            )}
          </div>
        )}

        <div style={{ color: STEEL, fontSize: 12, marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: '7px 12px' }}>
          {next ? (<>
            {next.exerciseId && <div style={{ width: 26, height: 26, flexShrink: 0 }}><ExerciseFigure pose={EXERCISES[next.exerciseId].pose} color={KHAKI} size="100%" /></div>}
            <span>{t('ses.next', { name: next.type === 'work' ? tr(nextEx.name, lang) : next.type === 'rest' ? t('ses.next.rest') : t('ses.next.cooldown') })}</span>
          </>) : t('ses.last')}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, padding: '10px 20px 8px', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={() => setPaused(!paused)} style={{ ...iconCircle, width: 74, height: 74, background: BLAZE, animation: paused ? 'glowPulse 1.6s ease-in-out infinite' : 'none' }} aria-label={paused ? t('ses.resume') : t('ses.pause')}>
          {paused ? <Play size={30} color={PAPER} /> : <Pause size={30} color={PAPER} />}
        </button>
      </div>
      <div style={{ display: 'flex', gap: 10, padding: '0 20px 20px' }}>
        <button onClick={onPrev} disabled={phaseIdx === 0} style={{ ...pillBtn, opacity: phaseIdx === 0 ? 0.4 : 1 }}>
          <ChevronLeft size={15} /> PREV
        </button>
        <button onClick={onSkip} style={pillBtn}>
          NEXT <SkipForward size={15} />
        </button>
      </div>

      {exitConfirm && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(27,29,22,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 22, maxWidth: 320, textAlign: 'center' }}>
            <div className="o40-display" style={{ color: PAPER, fontSize: 22, marginBottom: 8 }}>{t('ses.quit.title')}</div>
            <div style={{ color: STEEL, fontSize: 13, marginBottom: 18 }}>{t('ses.quit.body')}</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setExitConfirm(false)} style={{ ...secondaryBtn, flex: 1 }}>{t('ses.quit.continue')}</button>
              <button onClick={onExit} style={{ ...primaryBtn, flex: 1 }}>{t('ses.quit.exit')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const iconCircle = { borderRadius: '50%', border: `1px solid ${OLIVE}`, background: `linear-gradient(160deg, ${INK_2}, ${INK})`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.35)' };
const secondaryBtn = { background: INK_2, border: `1px solid ${KHAKI}`, color: PAPER, borderRadius: 14, padding: '12px 16px', fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: '0.05em', cursor: 'pointer' };
const pillBtn = {
  flex: 1, background: INK_2, border: `1px solid ${OLIVE}`, color: PAPER, borderRadius: 10, padding: '10px 0',
  fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: '0.08em', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
};

/* ================= SUMMARY SCREEN ================= */
function SummaryScreen({ stats, profile, hrInput, setHrInput, waistInput, setWaistInput, weightInput, setWeightInput, rpe, setRpe, notes, setNotes, onSave }) {
  const { lang, t } = useT();
  const zone = hrInput ? hrZone(parseInt(hrInput, 10), profile.age, lang) : null;
  const [shareState, setShareState] = useState('idle');

  async function handleShare() {
    const text = t('sum.share', { name: tr(stats.program.name, lang), min: Math.round(stats.durationSec / 60), kcal: stats.kcal });
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setShareState('copied');
        setTimeout(() => setShareState('idle'), 2000);
      }
    } catch (e) { /* user cancelled share, ignore */ }
  }

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {['#C1440E', '#B8AE8C', '#7FB069', '#EDE8D8', '#D9B34C'].map((c, i) => (
          <span key={i} className="o40-confetti" style={{
            background: c, left: `${8 + i * 18}%`, animationDuration: `${2.6 + (i % 3) * 0.7}s`,
            animationDelay: `${i * 0.35}s`, opacity: 0.85,
          }} />
        ))}
      </div>
      <div className="o40-scroll" style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        <div style={{ textAlign: 'center', marginTop: 10 }} className="o40-pop">
          <Trophy size={40} color={BLAZE} />
          <div className="o40-display" style={{ color: PAPER, fontSize: 30, marginTop: 8 }}>{t('sum.title')}</div>
          <div style={{ color: KHAKI, fontSize: 14 }}>{tr(stats.program.name, lang)}</div>
          <button onClick={handleShare} style={{
            marginTop: 10, background: 'transparent', border: `1px solid ${KHAKI}`, borderRadius: 20,
            padding: '6px 14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 11 }}>
              {shareState === 'copied' ? t('sum.copied') : t('sum.sharebtn')}
            </span>
          </button>
        </div>

        <div style={{ display: 'flex', gap: 10, margin: '20px 0' }}>
          <DogTag label={t('dt.duration')} value={`${Math.round(stats.durationSec / 60)}′`} />
          <DogTag label={t('dt.kcal')} value={stats.kcal} />
        </div>

        <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('sum.rpe.title')}</span>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {RPE_LABELS.map((lbl, i) => {
              const val = i + 1;
              const on = rpe === val;
              const c = RPE_COLORS[i];
              return (
                <button key={val} onClick={() => setRpe(on ? null : val)} style={{
                  flex: 1, padding: '10px 2px', borderRadius: 8, cursor: 'pointer', textAlign: 'center',
                  background: on ? c : INK, border: `1px solid ${on ? c : OLIVE}`,
                  transition: 'background 0.15s ease, border-color 0.15s ease, transform 0.1s ease',
                }}>
                  <div className="o40-display" style={{ color: PAPER, fontSize: 18 }}>{val}</div>
                  <div style={{ color: on ? PAPER : STEEL, fontSize: 8.5 }}>{tr(lbl, lang)}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('sum.notes.title')}</span>
          <textarea value={notes} onChange={e => setNotes(e.target.value.slice(0, 200))} placeholder={t('sum.notes.ph')}
            rows={2} className="o40-input" style={{ ...inputStyle, marginTop: 10, resize: 'none', fontFamily: 'Inter, sans-serif' }} />
        </div>

        <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Ruler size={18} color={BLAZE} />
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('sum.waist.title')}</span>
          </div>
          <div style={{ color: STEEL, fontSize: 12, marginBottom: 10, lineHeight: 1.4 }}>
            {t('sum.waist.body')}
          </div>
          <input value={waistInput} onChange={e => setWaistInput(e.target.value.replace(/\D/g, ''))} inputMode="numeric"
            placeholder={t('sum.waist.ph')} className="o40-input" style={inputStyle} />
        </div>

        <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Scale size={18} color={BLAZE} />
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('sum.weight.title')}</span>
          </div>
          <div style={{ color: STEEL, fontSize: 12, marginBottom: 10, lineHeight: 1.4 }}>
            {t('sum.weight.body')}
          </div>
          <input value={weightInput} onChange={e => setWeightInput(e.target.value.replace(/[^\d.,]/g, ''))} inputMode="decimal"
            placeholder={profile && profile.weight ? t('sum.weight.ph.dynamic', { v: profile.weight }) : t('sum.weight.ph')} className="o40-input" style={inputStyle} />
        </div>

        <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <HeartPulse size={18} color={BLAZE} />
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('sum.hr.title')}</span>
            {!hrInput && (
              <span className="o40-blink" style={{ marginLeft: 'auto', background: `${BLAZE}22`, border: `1px solid ${BLAZE}`, color: BLAZE, fontSize: 10, letterSpacing: '0.06em', borderRadius: 6, padding: '2px 7px' }}>
                {t('sum.hr.remind')}
              </span>
            )}
          </div>
          <div style={{ color: STEEL, fontSize: 12, marginBottom: 10, lineHeight: 1.4 }}>
            {t('sum.hr.body')}
          </div>
          <input value={hrInput} onChange={e => setHrInput(e.target.value.replace(/\D/g, ''))} inputMode="numeric"
            placeholder={t('sum.hr.ph')} className="o40-input" style={inputStyle} />
          {zone && (
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: zone.color }} />
              <span style={{ color: PAPER, fontSize: 13 }}>{t('sum.zone', { label: zone.label })}</span>
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: '12px 20px 20px', borderTop: `1px solid ${OLIVE_DARK}` }}>
        <button onClick={onSave} style={primaryBtn}><Check size={18} /> {t('sum.save')}</button>
      </div>
    </div>
  );
}

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
function Badge({ label, unlocked, value }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1,
      opacity: unlocked ? 1 : 0.35,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: unlocked ? BLAZE : INK_2, border: `1px solid ${unlocked ? BLAZE : OLIVE}`,
      }}>
        <Trophy size={18} color={unlocked ? PAPER : STEEL} />
      </div>
      <div className="o40-mono" style={{ color: unlocked ? PAPER : STEEL, fontSize: 10 }}>{value}</div>
      <div style={{ color: STEEL, fontSize: 9, textAlign: 'center' }}>{label}</div>
    </div>
  );
}

function HistoryScreen({ sessions, profile, waistHistory, weightHistory, onBack, onClear, onUpdateGoal, onDeleteSession }) {
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

        <div style={{ marginBottom: 20 }}>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t('hist.goal.title')}</div>
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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

        {sessions.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t('hist.milestones')}</div>
            <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '14px 8px', display: 'flex' }}>
              {STREAK_BADGES.map(n => <Badge key={`s${n}`} label={t('hist.miles.streak', { n })} value={n} unlocked={bestStreak >= n} />)}
              {SESSION_BADGES.map(n => <Badge key={`n${n}`} label={t('hist.miles.sessions', { n })} value={n} unlocked={sessions.length >= n} />)}
            </div>
          </div>
        )}

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
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            <button onClick={() => exportData(profile, sessions)} style={{ ...secondaryBtn, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              {t('hist.export')}
            </button>
            <button onClick={() => setConfirmClear(true)} style={{ ...secondaryBtn, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
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
