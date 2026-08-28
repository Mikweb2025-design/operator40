import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { LangContext, useT } from './context/LangContext.jsx';
import {
  Play,
  Pause,
  SkipForward,
  Flame,
  HeartPulse,
  Trophy,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Settings,
  X,
  Check,
  Volume2,
  VolumeX,
  Vibrate,
  History as HistoryIcon,
  Info,
  Dog,
  Plus,
  Trash2,
  Home as HomeIcon,
  BookOpen,
  Zap,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Ruler,
  Target,
  Medal,
  Crown,
  Music,
  Music2,
  HeadphoneOff,
  Lightbulb,
  Scale,
  Wind,
  Globe,
  Search,
  Star,
  Sun,
  Moon,
  Sparkles,
  Eye,
  Watch,
  Share2,
  Bell,
  BellOff,
  Send,
} from 'lucide-react';
import {
  TRACKS,
  DEFAULT_TRACK,
  musicPlay,
  musicPause,
  musicLoad,
  musicSetVolume,
  musicSetShouldPlay,
  musicSetAutoPlay,
  musicGetAutoPlay,
  musicSetShuffle,
  musicGetShuffle,
  musicNext,
  musicPrev,
  musicSetOnTrackChange,
  musicGetCurrentId,
  musicGetQueue,
} from './music';
import { LANGS, LOCALES, detectLang, tr, translate } from './i18n';
import { hasClip } from './clips.js';
import {
  INK,
  INK_2,
  PAPER,
  OLIVE,
  OLIVE_DARK,
  KHAKI,
  BLAZE,
  BLAZE_DEEP,
  STEEL,
} from './constants/theme.js';
import { EXERCISES, EXERCISE_GROUPS } from './data/exercises.js';
import {
  PROGRAMS,
  QUICK_PROGRAM,
  WORK_SEC,
  REST_SEC,
  WARM_SEC,
  COOL_SEC,
  INTERVAL_PRESETS,
  LEVELS,
  CAMP_DAYS,
  DAY_CYCLE,
  getIntervalPreset,
  getLevel,
  levelPreset,
  campDayIndex,
  campDayDisplay,
  programById,
  pickNextProgram,
  HOLD_EXERCISES,
  getReps,
} from './data/programs.js';
import {
  buildSequence,
  kcalForSeconds,
  estimateProgramKcal,
  totalSeqSeconds,
} from './utils/workout.js';
import { formatTime, dayKey, sessionDayKey } from './utils/date.js';
import {
  hrZone,
  computeBestStreak,
  computeStreak,
  computeStreakWithFreeze,
  WEEKLY_GOAL,
  STREAK_BADGES,
  SESSION_BADGES,
  KCAL_BADGES,
  CONSISTENCY_BADGES,
  PERFECT_WEEK_BADGES,
  MEDAL_DEFS,
  RPE_LABELS,
  RPE_COLORS,
  RANKS,
  getRank,
  nextBadge,
  getMedalProgress,
  getNextMedals,
  greeting,
  buildHeatmap,
  buildYearHeatmap,
  getPersonalRecords,
  getMonthlyTrend,
} from './utils/stats.js';
import { getAudioCtx, unlockAudio, playBeep, playClick, vibrate, speak } from './utils/audio.js';
import { STYLES } from './styles/appStyles.js';
import { ExerciseFigure } from './components/ExerciseFigure.jsx';
import {
  requestNotificationPermission,
  scheduleDailyReminder,
  disableReminder,
  getReminder,
  checkAndFireReminder,
  fireTestNotification,
} from './utils/notifications.js';
import {
  isPushSupported,
  isStandalonePWA,
  getExistingSubscription,
  subscribePush,
  unsubscribePush,
  testPushViaSW,
  updatePushStats,
} from './utils/push.js';
import { getMotivationalMessage, getVocalMotivation } from './utils/motivation.js';
import BellyTest from './components/BellyTest.jsx';
import BeforeAfterSlider from './components/BeforeAfterSlider.jsx';
import FitnessEngineView from './components/FitnessEngineView.tsx';
// PoseCounter deprecated → delega a FitnessEngineView (preservato in src/components/PoseCounter.jsx per compatibilità)
import ChangelogModal, { CHANGELOG_STORAGE_KEY } from './components/ChangelogModal.tsx';
import SessionAIOverlay from './components/SessionAIOverlay.tsx';
import TopBar from './components/layout/TopBar.jsx';
import BottomNav from './components/layout/BottomNav.jsx';
import VersionBadge from './components/layout/VersionBadge.jsx';
// audit/4-lazy: screens lazy — recharts (History) + media (Session/Preview) stay in their chunks
const CountdownScreen = lazy(() => import('./screens/CountdownScreen.jsx'));
const SetupScreen = lazy(() => import('./screens/SetupScreen.jsx'));
const HomeScreen = lazy(() => import('./screens/HomeScreen.jsx'));
const LibraryScreen = lazy(() => import('./screens/LibraryScreen.jsx'));
const BuilderScreen = lazy(() => import('./screens/BuilderScreen.jsx'));
const PreviewScreen = lazy(() => import('./screens/PreviewScreen.jsx'));
const SessionScreen = lazy(() => import('./screens/SessionScreen.jsx'));
const SummaryScreen = lazy(() => import('./screens/SummaryScreen.jsx'));
const HistoryScreen = lazy(() => import('./screens/HistoryScreen.jsx'));

function ScreenFallback() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
      }}
    >
      <div className="o40-mono" style={{ color: '#EDE8D8', fontSize: 12, letterSpacing: '0.08em' }}>
        CARICAMENTO…
      </div>
    </div>
  );
}
import { getBellyLevelForTest, shouldProgressBellyLevel } from './utils/bellyTest.js';
import { exportBackup, downloadBackup, importBackup } from './utils/backup.js';
import { migrateStoredDataIfNeeded } from './storage.js';
import { shareResults } from './utils/share.js';
import { exportCSV, buildCalendarGrid } from './utils/export.js';
import { calcBMI, bmiCategory, estimateTDEE, simpleMealHint } from './utils/bmi.js';
import { loadFavorites, toggleFavorite, loadFavoritesAsync } from './utils/favorites.js';
import { WeeklyChallenge } from './components/WeeklyChallenge.jsx';
import { loadPhotos, savePhotos, fileToDataUrl, loadPhotosAsync } from './utils/photos.js';
import { requestWakeLock, releaseWakeLock } from './utils/wakeLock.js';
import { shareStatsImage } from './utils/shareImage.js';
import { estimateBodyFat, whtCategory } from './utils/body.js';
import {
  getWeeklyProgress,
  getConsistencyScore,
  getAveragePace,
  formatDuration,
  getStreakRisk,
} from './utils/progress.js';
import {
  getGoalProgress,
  getGoalHistory,
  suggestNextGoal,
  formatGoal,
  estimateWeeklyCalories,
  getStreakWeeks,
} from './utils/goals.js';
import { GoalRing, MiniGoalBar } from './components/GoalRing.jsx';
import { getSmartInsight, getSmartRecommendation } from './utils/smart.js';
import { getPersonalChallenge, getRecoveryTip } from './utils/personalChallenge.js';
import { getAchievementsProgress, getNextAchievements } from './utils/achievements.js';
import { getDailyInsight, getWeeklyInsight } from './utils/insights.js';
import { getRecommendedMissions, getDailyChallenge, getBellyMissions } from './utils/missions.js';
import { getBellyProgress, getBellyStreak, getBellyInsight } from './utils/belly.js';

async function exportData() {
  try {
    const data = await exportBackup();
    downloadBackup(data);
  } catch (e) {
    /* best effort, ignore */
  }
}
async function handleImportBackup(
  file,
  {
    setProfile,
    setSessions,
    setWaistHistory,
    setWeightHistory,
    setCustomPrograms,
    showToast,
    setScreen,
  }
) {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    await importBackup(data);
    // reload from storage to update UI
    const p = await window.storage
      .get('o40_profile', false)
      .then((r) => (r ? JSON.parse(r.value) : null))
      .catch(() => null);
    const s = await window.storage
      .get('o40_sessions', false)
      .then((r) => (r ? JSON.parse(r.value) : []))
      .catch(() => []);
    const wh = await window.storage
      .get('o40_waist', false)
      .then((r) => (r ? JSON.parse(r.value) : []))
      .catch(() => []);
    const wt = await window.storage
      .get('o40_weight', false)
      .then((r) => (r ? JSON.parse(r.value) : []))
      .catch(() => []);
    const cp = await window.storage
      .get('o40_custom_programs', false)
      .then((r) => (r ? JSON.parse(r.value) : []))
      .catch(() => []);
    setProfile(p);
    setSessions(s || []);
    setWaistHistory(wh || []);
    setWeightHistory(wt || []);
    setCustomPrograms(cp || []);
    showToast('Backup ripristinato — ricarico...');
    setTimeout(() => window.location.reload(), 800);
  } catch (e) {
    showToast('Backup non valido: ' + (e.message || 'errore'));
  }
}

/* ---- Apple Health export.xml import (parsed 100% locally, regex-based to stay safe on huge files) ---- */
const HK_ACTIVITY_MAP = {
  HKWorkoutActivityTypeFunctionalStrengthTraining: {
    it: 'Forza funzionale (Apple Health)',
    en: 'Functional strength (Apple Health)',
    de: 'Funktionelles Krafttraining (Apple Health)',
  },
  HKWorkoutActivityTypeTraditionalStrengthTraining: {
    it: 'Allenamento forza (Apple Health)',
    en: 'Strength training (Apple Health)',
    de: 'Krafttraining (Apple Health)',
  },
  HKWorkoutActivityTypeCoreTraining: {
    it: 'Core training (Apple Health)',
    en: 'Core training (Apple Health)',
    de: 'Core-Training (Apple Health)',
  },
  HKWorkoutActivityTypeHighIntensityIntervalTraining: {
    it: 'HIIT (Apple Health)',
    en: 'HIIT (Apple Health)',
    de: 'HIIT (Apple Health)',
  },
  HKWorkoutActivityTypeCrossTraining: {
    it: 'Cross training (Apple Health)',
    en: 'Cross training (Apple Health)',
    de: 'Cross-Training (Apple Health)',
  },
  HKWorkoutActivityTypeFlexibility: {
    it: 'Mobilità (Apple Health)',
    en: 'Flexibility (Apple Health)',
    de: 'Mobilität (Apple Health)',
  },
  HKWorkoutActivityTypeCooldown: {
    it: 'Defaticamento (Apple Health)',
    en: 'Cooldown (Apple Health)',
    de: 'Abkühlen (Apple Health)',
  },
};
const HK_FALLBACK = {
  it: 'Allenamento (Apple Health)',
  en: 'Workout (Apple Health)',
  de: 'Training (Apple Health)',
};
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
  let m,
    count = 0,
    latestDate = null,
    latestVal = null,
    latestUnit = null;
  while ((m = massRegex.exec(xmlText)) && count < 30000) {
    count++;
    const date = getXmlAttr(m[0], 'startDate');
    const val = getXmlAttr(m[0], 'value');
    const unit = getXmlAttr(m[0], 'unit');
    if (date && val && (!latestDate || date > latestDate)) {
      latestDate = date;
      latestVal = parseFloat(val);
      latestUnit = unit;
    }
  }
  if (latestVal != null) {
    result.weightKg =
      latestUnit && latestUnit.toLowerCase().includes('lb')
        ? Math.round(latestVal * 0.453592 * 10) / 10
        : latestVal;
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
      try {
        await window.storage.set('o40_profile', JSON.stringify(p), false);
      } catch (e) {
        /* best effort */
      }
    }
  }
  const [sessions, setSessions] = useState([]);
  const [formName, setFormName] = useState('');
  const [formAge, setFormAge] = useState('');
  const [formWeight, setFormWeight] = useState('');
  const [formWaist, setFormWaist] = useState('');
  const [formHeight, setFormHeight] = useState('');
  const [formCustomWork, setFormCustomWork] = useState('40');
  const [formCustomRest, setFormCustomRest] = useState('20');
  const [reminderHour, setReminderHour] = useState('8');
  const [reminderMinute, setReminderMinute] = useState('0');
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(() => {
    try {
      return !!localStorage.getItem('o40_push_sub');
    } catch {
      return false;
    }
  });
  const [pushSupported, setPushSupported] = useState(() => isPushSupported());
  const [pushBusy, setPushBusy] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showTour, setShowTour] = useState(false);
  const [photos, setPhotos] = useState(() => loadPhotos());
  const [largeText, setLargeText] = useState(() => {
    try {
      return localStorage.getItem('o40_largeText') === '1';
    } catch {
      return false;
    }
  });
  const [previewProgram, setPreviewProgram] = useState(null);
  const [showBellyTest, setShowBellyTest] = useState(false);
  const [showPose, setShowPose] = useState(null);
  const [showChangelog, setShowChangelog] = useState(false);
  const [showReleaseBanner, setShowReleaseBanner] = useState(() => {
    try {
      return localStorage.getItem('o40_release_2.11.0') !== 'dismissed';
    } catch {
      return true;
    }
  });
  const [aiCoachEnabled, setAiCoachEnabled] = useState(() => {
    try {
      return localStorage.getItem('o40_aiCoach') !== '0';
    } catch {
      return true;
    }
  });

  // hydrate photos from IndexedDB (migration from localStorage, async)
  useEffect(() => {
    let cancelled = false;
    loadPhotosAsync()
      .then((asyncPhotos) => {
        if (cancelled) return;
        if (JSON.stringify(asyncPhotos) !== JSON.stringify(photos)) setPhotos(asyncPhotos);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line
  }, []);

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
  const [musicAutoPlay, setMusicAutoPlay] = useState(true);
  const [musicShuffle, setMusicShuffle] = useState(false);
  const [exitConfirm, setExitConfirm] = useState(false);
  const [customPrograms, setCustomPrograms] = useState([]);
  const [editingCustom, setEditingCustom] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);
  const [healthWeightSuggestion, setHealthWeightSuggestion] = useState(null);
  const [healthImportStatus, setHealthImportStatus] = useState('idle');

  const [lastStats, setLastStats] = useState(null);
  const [aiPhaseQuality, setAiPhaseQuality] = useState([]);
  const aiPhaseQualityRef = useRef([]);
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

  // ---- load persisted data + migration ----
  useEffect(() => {
    (async () => {
      try {
        await migrateStoredDataIfNeeded();
      } catch {}
      let p = null,
        s = [],
        cp = [],
        wh = [];
      try {
        const r = await window.storage.get('o40_profile', false);
        if (r) p = JSON.parse(r.value);
      } catch (e) {
        /* not set yet */
      }
      try {
        const r = await window.storage.get('o40_sessions', false);
        if (r) s = JSON.parse(r.value);
      } catch (e) {
        /* not set yet */
      }
      try {
        const r = await window.storage.get('o40_custom_programs', false);
        if (r) cp = JSON.parse(r.value);
      } catch (e) {
        /* not set yet */
      }
      try {
        const r = await window.storage.get('o40_waist', false);
        if (r) wh = JSON.parse(r.value);
      } catch (e) {
        /* not set yet */
      }
      let wt = null;
      try {
        const r = await window.storage.get('o40_weight', false);
        if (r) wt = JSON.parse(r.value);
      } catch (e) {
        /* not set yet */
      }
      setProfile(p);
      setSessions(s || []);
      setCustomPrograms(cp || []);
      setWaistHistory(wh || []);
      setWeightHistory(wt || []);
      if (p) {
        setLang((p.lang && LANGS.includes(p.lang) && p.lang) || detectLang());
        setFormName(p.name);
        setFormAge(String(p.age));
        setFormWeight(String(p.weight));
        setFormHeight(p.heightCm ? String(p.heightCm) : '');
        setFormCustomWork(p.customWork || '40');
        setFormCustomRest(p.customRest || '20');
        setSoundOn(p.soundOn !== false);
        setVibrationOn(p.vibrationOn !== false);
        setMusicOn(p.musicOn === true);
        setMusicTrack(p.musicTrack || DEFAULT_TRACK);
        if (typeof p.musicVolume === 'number') setMusicVolume(p.musicVolume);
        setMusicAutoPlay(p.musicAutoPlay !== false);
        setMusicShuffle(p.musicShuffle === true);
        musicSetAutoPlay(p.musicAutoPlay !== false);
        musicSetShuffle(p.musicShuffle === true);
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
      else if (!document.hidden) checkAndFireReminder(t);
    }
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [screen, t]);
  // ---- daily reminder check every minute ----
  useEffect(() => {
    const id = setInterval(() => checkAndFireReminder(t), 60000);
    checkAndFireReminder(t);
    return () => clearInterval(id);
  }, [t]);

  // ---- motivational local (1/giorno alle 9, se PWA aperta e push non attivo o fallback) ----
  useEffect(() => {
    function checkMotivational() {
      if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
      const now = new Date();
      // se push attivo, il server manda già il push giornaliero — evita doppio locale
      if (pushEnabled) return;
      if (now.getHours() !== 9 || now.getMinutes() !== 0) return;
      const key = `o40_motiv_fired_${now.toISOString().slice(0, 10)}`;
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, '1');
      try {
        const msg = getMotivationalMessage({ sessions, profile, lang });
        // usa SW se disponibile per coerenza PWA, altrimenti Notification diretta
        navigator.serviceWorker?.ready
          ?.then((reg) => {
            if (reg && 'showNotification' in reg) {
              reg.showNotification(msg.title, {
                body: msg.body,
                icon: './icons/icon-192.png',
                badge: './icons/icon-192.png',
                tag: msg.tag,
                data: { url: './' },
              });
            } else if (typeof Notification !== 'undefined') {
              new Notification(msg.title, {
                body: msg.body,
                icon: './icons/icon-192.png',
                tag: msg.tag,
              });
            }
          })
          .catch(() => {
            if (typeof Notification !== 'undefined') {
              try {
                new Notification(msg.title, {
                  body: msg.body,
                  icon: './icons/icon-192.png',
                  tag: msg.tag,
                });
              } catch {}
            }
          });
      } catch {}
    }
    const id = setInterval(checkMotivational, 60000);
    // prova subito se sono le 9 (per chi apre app a quell'ora)
    checkMotivational();
    function onVis() {
      if (!document.hidden) checkMotivational();
    }
    document.addEventListener('visibilitychange', onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [sessions, profile, lang, pushEnabled]);

  // ---- sync push stats per personalizzazione server (se push attivo) ----
  useEffect(() => {
    if (!pushEnabled) return;
    updatePushStats(sessions, profile, lang);
  }, [sessions, profile, lang, pushEnabled]);

  // ---- install prompt ----
  useEffect(() => {
    function onReady() {
      setInstallPrompt(window.__o40DeferPrompt);
    }
    function onInstalled() {
      setInstallPrompt(null);
    }
    window.addEventListener('o40:installReady', onReady);
    window.addEventListener('appinstalled', onInstalled);
    if (window.__o40DeferPrompt) setInstallPrompt(window.__o40DeferPrompt);
    return () => {
      window.removeEventListener('o40:installReady', onReady);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);
  // ---- onboarding tour (first visit) ----
  useEffect(() => {
    if (screen === 'home' && profile && !profile.seenTour) {
      const seen = (() => {
        try {
          return localStorage.getItem('o40_seenTour');
        } catch {
          return null;
        }
      })();
      if (!seen) setShowTour(true);
    }
  }, [screen, profile]);
  // ---- changelog (v2.9.0 Audit) — once per version, after tour dismissed or 1.2s delay ----
  useEffect(() => {
    if (screen !== 'home' || !profile) return;
    if (showTour) return;
    try {
      const seen = localStorage.getItem(CHANGELOG_STORAGE_KEY);
      if (!seen) {
        const t = setTimeout(() => setShowChangelog(true), 900);
        return () => clearTimeout(t);
      }
    } catch {}
  }, [screen, profile, showTour]);
  // ---- large text ----
  useEffect(() => {
    document.documentElement.style.fontSize = largeText ? '18px' : '';
    try {
      localStorage.setItem('o40_largeText', largeText ? '1' : '0');
    } catch {}
  }, [largeText]);
  // ---- AI Coach enabled persist ----
  useEffect(() => {
    try {
      localStorage.setItem('o40_aiCoach', aiCoachEnabled ? '1' : '0');
    } catch {}
  }, [aiCoachEnabled]);
  // ---- PWA update checker — fetch sw.js hash, confronta con lastSeen in localStorage ----
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateVersion, setUpdateVersion] = useState(null);
  useEffect(() => {
    let cancelled = false;
    async function checkSwUpdate() {
      try {
        const res = await fetch('./sw.js', { cache: 'no-store' });
        const text = await res.text();
        const remote = text.match(/o40-v[0-9a-f]{8}/)?.[0];
        if (!remote || cancelled) return;
        let lastSeen = null;
        try {
          lastSeen = localStorage.getItem('o40_lastSw');
        } catch {}
        if (!lastSeen) {
          try {
            localStorage.setItem('o40_lastSw', remote);
          } catch {}
          return;
        }
        if (remote !== lastSeen && !cancelled) {
          setUpdateVersion(remote);
          setUpdateAvailable(true);
        }
        // trigger SW update check in background (per controllerchange reload)
        if ('serviceWorker' in navigator) {
          const reg = await navigator.serviceWorker.getRegistration();
          if (reg) await reg.update().catch(() => {});
        }
      } catch {}
    }
    checkSwUpdate();
    const id = setInterval(checkSwUpdate, 30000);
    function onFocus() {
      checkSwUpdate();
    }
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') checkSwUpdate();
    });
    return () => {
      cancelled = true;
      clearInterval(id);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  // ---- motivational music: plays while on, adapts volume to the phase + autoplay playlist ----
  useEffect(() => {
    musicSetShouldPlay(!!musicOn);
    musicSetAutoPlay(!!musicAutoPlay);
    musicSetShuffle(!!musicShuffle);
    if (!musicOn) {
      musicPause();
      return;
    }
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
    // eslint-disable-next-line
  }, [
    musicOn,
    musicAutoPlay,
    musicShuffle,
    screen,
    musicTrack,
    phaseIdx,
    paused,
    musicVolume,
    seq,
  ]);

  // auto-advance: quando music.js passa alla traccia successiva, aggiorna UI + profilo
  useEffect(() => {
    musicSetOnTrackChange((nextId) => {
      setMusicTrack(nextId);
      if (profile) {
        const p = { ...profile, musicTrack: nextId };
        setProfile(p);
        window.storage.set('o40_profile', JSON.stringify(p), false).catch(() => {});
      }
    });
    return () => musicSetOnTrackChange(null);
  }, [profile]);

  // ---- session countdown (pausa su reps: avanza solo su tap FATTO) — AI Coach gestisce work quando attivo ----
  useEffect(() => {
    if (screen !== 'session' || paused) return;
    const cur = seq[phaseIdx];
    if (!cur) return;
    // AI Coach: per work phases gestisce automaticamente reps/timer — disabilita countdown manuale
    if (cur.type === 'work' && aiCoachEnabled) return;
    if (cur.mode === 'reps') return; // reps manuale senza AI
    if (secondsLeft <= 0) {
      advancePhase();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [screen, paused, secondsLeft, phaseIdx, seq, aiCoachEnabled]);

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
    setSecondsLeft(seq[nextIdx].duration ?? 0);
  }

  function goPrev() {
    if (phaseIdx <= 0) return;
    const idx = phaseIdx - 1;
    if (soundRef.current) playBeep(440);
    announcePhase(seq[idx]);
    setPhaseIdx(idx);
    setSecondsLeft(seq[idx].duration ?? 0);
  }

  function startSession(program) {
    const skip = !!profile.skipWarmup;
    const preset = levelPreset(profile);
    const mode = (profile && profile.executionMode) || 'time';
    const levelKey = (profile && profile.level) || 'combattente';
    const s = buildSequence(program, skip, preset.work, preset.rest, mode, levelKey);
    setActiveProgram(program);
    setSeq(s);
    setPhaseIdx(0);
    setSecondsLeft(s[0].duration ?? 0);
    setPaused(false);
    setRpe(null);
    setAiPhaseQuality([]);
    aiPhaseQualityRef.current = [];
    if (soundRef.current) {
      playBeep(660);
      announcePhase(s[0]);
    }
    setScreen('session');
  }

  function collectAiPhaseQuality(data) {
    if (!data || !data.exerciseId || typeof data.avgQuality !== 'number') return;
    const entry = {
      exerciseId: data.exerciseId,
      reps: data.reps ?? 0,
      quality: Math.round(data.avgQuality),
    };
    aiPhaseQualityRef.current = [...aiPhaseQualityRef.current, entry];
    setAiPhaseQuality(aiPhaseQualityRef.current);
  }

  function finishSession() {
    const skip = !!profile.skipWarmup;
    const preset = levelPreset(profile);
    const mode = (profile && profile.executionMode) || 'time';
    const levelKey = (profile && profile.level) || 'combattente';
    const kcal = Math.round(
      estimateProgramKcal(
        activeProgram,
        profile.weight,
        skip,
        preset.work,
        preset.rest,
        mode,
        levelKey
      )
    );
    if (soundRef.current) playBeep(1000, 0.25);
    if (vibrationRef.current) vibrate([80, 60, 80, 60, 150]);
    const qualityEntries = aiPhaseQualityRef.current;
    let aiQuality = null;
    if (qualityEntries.length) {
      const byExercise = {};
      qualityEntries.forEach((e) => {
        if (!byExercise[e.exerciseId]) {
          byExercise[e.exerciseId] = { name: tr(EXERCISES[e.exerciseId].name, lang), reps: 0, sum: 0, n: 0 };
        }
        const g = byExercise[e.exerciseId];
        g.reps = Math.max(g.reps, e.reps ?? 0);
        g.sum += e.quality;
        g.n += 1;
      });
      const exercises = Object.values(byExercise).map((g) => ({
        name: g.name,
        reps: g.reps,
        quality: Math.round(g.sum / g.n),
      }));
      aiQuality = {
        overall: Math.round(exercises.reduce((a, e) => a + e.quality, 0) / exercises.length),
        exercises,
      };
    }
    setLastStats({
      program: activeProgram,
      kcal,
      durationSec: totalSeqSeconds(activeProgram, skip, preset.work, preset.rest, mode, levelKey),
      aiQuality,
    });
    setScreen('summary');
  }

  async function saveProfile() {
    const prevLevel =
      profile &&
      (profile.level ||
        (profile.intervalPreset === 'breve'
          ? 'recluta'
          : profile.intervalPreset === 'lungo'
            ? 'elite'
            : 'combattente'));
    const p = {
      name: formName.trim() || 'Operatore',
      age: Math.max(18, Math.min(90, parseInt(formAge, 10) || 40)),
      weight: Math.max(40, Math.min(180, parseInt(formWeight, 10) || 80)),
      heightCm: formHeight
        ? Math.max(120, Math.min(220, parseInt(formHeight, 10) || 0))
        : (profile && profile.heightCm) || null,
      customWork: formCustomWork
        ? String(Math.max(10, Math.min(90, parseInt(formCustomWork, 10) || 40)))
        : (profile && profile.customWork) || '40',
      customRest: formCustomRest
        ? String(Math.max(5, Math.min(60, parseInt(formCustomRest, 10) || 20)))
        : (profile && profile.customRest) || '20',
      weeklyGoal: (profile && profile.weeklyGoal) || WEEKLY_GOAL,
      soundOn: profile ? profile.soundOn !== false : true,
      vibrationOn: profile ? profile.vibrationOn !== false : true,
      musicOn: profile ? profile.musicOn === true : false,
      musicTrack: (profile && profile.musicTrack) || DEFAULT_TRACK,
      musicVolume:
        typeof (profile && profile.musicVolume) === 'number' ? profile.musicVolume : 0.55,
      skipWarmup: profile ? !!profile.skipWarmup : false,
      voiceCountdown: profile ? !!profile.voiceCountdown : false,
      seenIntro: profile ? !!profile.seenIntro : false,
      intervalPreset:
        formCustomWork !== '40' || formCustomRest !== '20'
          ? 'custom'
          : (profile && profile.intervalPreset) || 'standard',
      level: prevLevel || 'combattente',
      executionMode: (profile && profile.executionMode) || 'time',
      lang: lang,
      campStart: profile && profile.campStart ? profile.campStart : new Date().toISOString(),
    };
    setProfile(p);
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
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
    try {
      await window.storage.set('o40_waist', JSON.stringify(updated), false);
    } catch (e) {
      /* best effort */
    }
  }

  async function recordWeight(kg) {
    const latest = weightHistory.length ? weightHistory[weightHistory.length - 1] : null;
    if (latest && latest.kg === kg && dayKey(new Date(latest.date)) === dayKey(new Date())) return;
    const updated = [...weightHistory, { date: new Date().toISOString(), kg }];
    setWeightHistory(updated);
    try {
      await window.storage.set('o40_weight', JSON.stringify(updated), false);
    } catch (e) {
      /* best effort */
    }
  }

  async function applyLevel(key) {
    const next = getLevel(key);
    const p = { ...profile, level: next.key, intervalPreset: next.preset };
    setProfile(p);
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
  }

  async function promoteLevel() {
    const cur = getLevel(profile.level || 'combattente');
    const idx = LEVELS.indexOf(cur);
    if (idx >= LEVELS.length - 1) return;
    const next = LEVELS[idx + 1];
    await applyLevel(next.key);
    showToast(t('toast.level.up', { label: tr(next.label, lang) }));
  }

  async function toggleVoiceCountdown() {
    const p = { ...profile, voiceCountdown: !profile.voiceCountdown };
    setProfile(p);
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch {}
  }
  async function toggleVocalMotivation() {
    const p = { ...profile, vocalMotivation: !profile.vocalMotivation };
    setProfile(p);
    if (p.vocalMotivation) speak(getVocalMotivation(lang), lang, LOCALES);
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
  }
  async function toggleSkipWarmup() {
    const p = { ...profile, skipWarmup: !profile.skipWarmup };
    setProfile(p);
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
  }

  async function setIntervalPreset(key) {
    const p = { ...profile, intervalPreset: key };
    setProfile(p);
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
  }

  async function setExecutionMode(mode) {
    const m = mode === 'reps' ? 'reps' : 'time';
    const p = { ...profile, executionMode: m };
    setProfile(p);
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
  }

  async function dismissIntro() {
    const p = { ...profile, seenIntro: true };
    setProfile(p);
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
  }

  async function updateWeeklyGoal(n) {
    const p = { ...profile, weeklyGoal: Math.max(1, Math.min(7, n)) };
    setProfile(p);
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
  }

  async function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    const p = { ...profile, soundOn: next };
    setProfile(p);
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
  }

  async function toggleVibration() {
    const next = !vibrationOn;
    setVibrationOn(next);
    if (next) vibrate([40]);
    const p = { ...profile, vibrationOn: next };
    setProfile(p);
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
  }

  async function togglePush() {
    if (pushBusy) return;
    setPushBusy(true);
    try {
      if (pushEnabled) {
        await unsubscribePush();
        setPushEnabled(false);
        showToast(lang === 'it' ? 'Push disattivato' : 'Push disabled');
      } else {
        await subscribePush();
        setPushEnabled(true);
        // sync stats subito per personalizzazione push giornaliero
        updatePushStats(sessions, profile, lang).catch(() => {});
        showToast(
          lang === 'it'
            ? 'Push attivato — anche con PWA chiusa'
            : 'Push enabled — works with PWA closed'
        );
      }
    } catch (e) {
      showToast(e.message || 'Push non disponibile');
    } finally {
      setPushBusy(false);
    }
  }

  async function saveBellyTest({ plankSec, crunchReps, level, date }) {
    const p = {
      ...profile,
      bellyTest: { plankSec, crunchReps, level, date },
      bellyLevel: level,
      bellyLevelUpdated: date,
    };
    setProfile(p);
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch {}
    setShowBellyTest(false);
    showToast(`Livello pancia: ${level.toUpperCase()} ✓`);
    updatePushStats(sessions, p, lang).catch(() => {});
  }

  async function handleTestPush() {
    if (pushBusy) return;
    setPushBusy(true);
    try {
      // se push non attivo, fallback a notifica locale
      if (pushEnabled && isPushSupported()) {
        await testPushViaSW(lang);
        showToast(
          lang === 'it'
            ? 'Test push inviato'
            : lang === 'de'
              ? 'Test-Push gesendet'
              : 'Test push sent'
        );
      } else {
        const ok = fireTestNotification(t);
        showToast(
          ok
            ? lang === 'it'
              ? 'Notifica di test inviata'
              : lang === 'de'
                ? 'Testbenachrichtigung gesendet'
                : 'Test notification sent'
            : 'Permesso negato'
        );
      }
    } catch (e) {
      showToast(e.message || 'Test fallito');
    } finally {
      setPushBusy(false);
    }
  }

  // sync push state at startup (verifica subscription reale)
  useEffect(() => {
    if (!isPushSupported()) {
      setPushSupported(false);
      return;
    }
    getExistingSubscription()
      .then((sub) => {
        const has = !!sub;
        setPushEnabled(has);
        setPushSupported(true);
        try {
          if (has) localStorage.setItem('o40_push_sub', JSON.stringify({ endpoint: sub.endpoint }));
          else localStorage.removeItem('o40_push_sub');
        } catch {}
      })
      .catch(() => {});
  }, []);

  function trackSrc(id) {
    const t = TRACKS.find((x) => x.id === id);
    return (t || TRACKS[0]).src;
  }

  async function toggleMusic() {
    const next = !musicOn;
    setMusicOn(next);
    const p = { ...profile, musicOn: next };
    setProfile(p);
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
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
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
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
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
  }

  async function toggleMusicAutoPlay() {
    const next = !musicAutoPlay;
    setMusicAutoPlay(next);
    musicSetAutoPlay(next);
    const p = { ...profile, musicAutoPlay: next };
    setProfile(p);
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
  }

  async function toggleMusicShuffle() {
    const next = !musicShuffle;
    setMusicShuffle(next);
    musicSetShuffle(next);
    const p = { ...profile, musicShuffle: next };
    setProfile(p);
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
  }

  async function nextMusicTrack() {
    const nextId = musicNext();
    if (nextId) {
      setMusicTrack(nextId);
      const p = { ...profile, musicTrack: nextId };
      setProfile(p);
      try {
        await window.storage.set('o40_profile', JSON.stringify(p), false);
      } catch (e) {
        /* best effort */
      }
    }
  }

  async function prevMusicTrack() {
    const prevId = musicPrev();
    if (prevId) {
      setMusicTrack(prevId);
      const p = { ...profile, musicTrack: prevId };
      setProfile(p);
      try {
        await window.storage.set('o40_profile', JSON.stringify(p), false);
      } catch (e) {
        /* best effort */
      }
    }
  }

  async function saveSession() {
    const prevBest = computeBestStreak(sessions);
    const prevCount = sessions.length;
    const weekAgo = Date.now() - 7 * 86400000;
    const prevWeekCount = sessions.filter((s) => new Date(s.date).getTime() > weekAgo).length;
    const goal = profile.weeklyGoal || WEEKLY_GOAL;

    const record = {
      date: new Date().toISOString(),
      programId: activeProgram.id,
      programName: tr(activeProgram.name, lang),
      kcal: lastStats.kcal,
      durationSec: lastStats.durationSec,
      aiQuality: lastStats.aiQuality || null,
      peakHR: hrInput ? parseInt(hrInput, 10) : null,
      rpe: rpe,
      notes: notes.trim() || null,
    };
    const updated = [...sessions, record];
    setSessions(updated);
    try {
      await window.storage.set('o40_sessions', JSON.stringify(updated), false);
    } catch (e) {
      /* best effort */
    }
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
    const newWeekCount = updated.filter((s) => new Date(s.date).getTime() > weekAgo).length;
    const newStreakBadge = STREAK_BADGES.find((n) => newBest >= n && prevBest < n);
    const newSessionBadge = SESSION_BADGES.find((n) => newCount >= n && prevCount < n);
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
    try {
      await window.storage.set('o40_sessions', JSON.stringify([]), false);
    } catch (e) {
      /* best effort */
    }
    showToast(t('toast.history'));
  }
  async function handleAddPhoto(file) {
    if (!file) return;
    try {
      const url = await fileToDataUrl(file);
      const next = [
        ...photos,
        { id: Date.now().toString(36), date: new Date().toISOString(), url },
      ].slice(-12);
      setPhotos(next);
      savePhotos(next);
      showToast('Foto aggiunta');
    } catch {
      showToast('File troppo grande (max 4MB)');
    }
  }

  async function deleteSession(date) {
    const updated = sessions.filter((s) => s.date !== date);
    setSessions(updated);
    try {
      await window.storage.set('o40_sessions', JSON.stringify(updated), false);
    } catch (e) {
      /* best effort */
    }
    showToast(t('toast.removed'));
  }

  async function createCustomProgram(program) {
    const updated = [...customPrograms, program];
    setCustomPrograms(updated);
    try {
      await window.storage.set('o40_custom_programs', JSON.stringify(updated), false);
    } catch (e) {
      /* best effort */
    }
    setPreviewProgram(program);
    setScreen('preview');
    showToast(t('toast.created'));
  }
  async function updateCustomProgram(program) {
    const updated = customPrograms.map((p) => (p.id === program.id ? program : p));
    setCustomPrograms(updated);
    try {
      await window.storage.set('o40_custom_programs', JSON.stringify(updated), false);
    } catch (e) {
      /* best effort */
    }
    setEditingCustom(null);
    setPreviewProgram(program);
    setScreen('preview');
    showToast('Missione aggiornata');
  }
  async function deleteCustomProgram(id) {
    const updated = customPrograms.filter((p) => p.id !== id);
    setCustomPrograms(updated);
    try {
      await window.storage.set('o40_custom_programs', JSON.stringify(updated), false);
    } catch (e) {
      /* best effort */
    }
  }

  async function importAppleHealth(file) {
    setHealthImportStatus('reading');
    try {
      const text = await file.text();
      setHealthImportStatus('parsing');
      const parsed = parseAppleHealthExport(text);

      const existingImportDates = new Set(sessions.filter((s) => s.imported).map((s) => s.date));
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
        const updated = [...sessions, ...newRecords].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setSessions(updated);
        try {
          await window.storage.set('o40_sessions', JSON.stringify(updated), false);
        } catch (e) {
          /* best effort */
        }
      }

      if (parsed.weightKg) {
        setHealthWeightSuggestion({
          kg: Math.round(parsed.weightKg * 10) / 10,
          date: parsed.weightDate,
        });
      }

      setHealthImportStatus('done');
      showToast(
        newRecords.length ? t('toast.imported', { n: newRecords.length }) : t('toast.imported.none')
      );
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
    try {
      await window.storage.set('o40_profile', JSON.stringify(p), false);
    } catch (e) {
      /* best effort */
    }
    setHealthWeightSuggestion(null);
    showToast(t('toast.weight'));
  }

  /* ---------------- RENDER ---------------- */
  const shell = { minHeight: '100dvh', background: INK, display: 'flex', justifyContent: 'center' };
  const phone = {
    width: '100%',
    maxWidth: 460,
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  };

  if (screen === 'loading') {
    return (
      <LangContext.Provider value={{ lang, t, setLang: handleSetLang }}>
        <div className="o40" style={{ ...shell, alignItems: 'center', justifyContent: 'center' }}>
          <style>{STYLES}</style>
          <div style={{ textAlign: 'center', width: 'min(320px, 82vw)' }}>
            <div className="o40-display" style={{ color: KHAKI, fontSize: 26 }}>
              {t('app.loading')}{' '}
              <span className="o40-blink" style={{ color: BLAZE }}>
                {t('app.loading.operativo')}
              </span>
              …
            </div>
            <div className="o40-loadbar" style={{ height: 6, marginTop: 16 }}>
              <span />
            </div>
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
          <Suspense fallback={<ScreenFallback />}>
            {screen === 'setup' && (
              <SetupScreen
                formName={formName}
                setFormName={setFormName}
                formAge={formAge}
                setFormAge={setFormAge}
                formWeight={formWeight}
                setFormWeight={setFormWeight}
                formWaist={formWaist}
                setFormWaist={setFormWaist}
                formHeight={formHeight}
                setFormHeight={setFormHeight}
                formCustomWork={formCustomWork}
                setFormCustomWork={setFormCustomWork}
                formCustomRest={formCustomRest}
                setFormCustomRest={setFormCustomRest}
                reminderHour={reminderHour}
                setReminderHour={setReminderHour}
                reminderMinute={reminderMinute}
                setReminderMinute={setReminderMinute}
                onSave={saveProfile}
                canCancel={!!profile}
                onCancel={() => setScreen('home')}
                soundOn={soundOn}
                onToggleSound={toggleSound}
                vibrationOn={vibrationOn}
                onToggleVibration={toggleVibration}
                musicOn={musicOn}
                onToggleMusic={toggleMusic}
                musicTrack={musicTrack}
                onSelectTrack={selectMusicTrack}
                musicVolume={musicVolume}
                onChangeMusicVolume={changeMusicVolume}
                musicAutoPlay={musicAutoPlay}
                onToggleAutoPlay={toggleMusicAutoPlay}
                musicShuffle={musicShuffle}
                onToggleShuffle={toggleMusicShuffle}
                onNextTrack={nextMusicTrack}
                onPrevTrack={prevMusicTrack}
                skipWarmup={!!(profile && profile.skipWarmup)}
                onToggleSkipWarmup={toggleSkipWarmup}
                voiceCountdown={!!(profile && profile.voiceCountdown)}
                onToggleVoiceCountdown={toggleVoiceCountdown}
                vocalMotivation={profile ? profile.vocalMotivation !== false : true}
                onToggleVocalMotivation={toggleVocalMotivation}
                level={
                  (profile &&
                    (profile.level ||
                      (profile.intervalPreset === 'breve'
                        ? 'recluta'
                        : profile.intervalPreset === 'lungo'
                          ? 'elite'
                          : 'combattente'))) ||
                  'combattente'
                }
                onSetLevel={applyLevel}
                intervalPreset={(profile && profile.intervalPreset) || 'standard'}
                onSetIntervalPreset={setIntervalPreset}
                executionMode={(profile && profile.executionMode) || 'time'}
                onSetExecutionMode={setExecutionMode}
                onImportHealth={importAppleHealth}
                healthImportStatus={healthImportStatus}
                healthWeightSuggestion={healthWeightSuggestion}
                onApplyHealthWeight={applyHealthWeight}
                showToast={showToast}
                largeText={largeText}
                setLargeText={setLargeText}
                pushEnabled={pushEnabled}
                pushSupported={pushSupported}
                pushBusy={pushBusy}
                onTogglePush={togglePush}
                onTestPush={handleTestPush}
                onExportBackup={exportData}
                onImportBackup={(file) =>
                  handleImportBackup(file, {
                    setProfile,
                    setSessions,
                    setWaistHistory,
                    setWeightHistory,
                    setCustomPrograms,
                    showToast,
                    setScreen,
                  })
                }
              />
            )}

            {screen === 'home' && profile && showReleaseBanner && (
              <div
                style={{
                  margin: '10px 16px 0',
                  padding: '12px 14px',
                  borderRadius: 14,
                  background: `linear-gradient(135deg, ${BLAZE}18, ${INK_2})`,
                  border: `1px solid ${BLAZE}55`,
                  boxShadow: `0 4px 16px rgba(0,0,0,0.35), 0 0 0 1px ${BLAZE}22 inset`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.06,
                    background: `repeating-linear-gradient(90deg, ${OLIVE} 0 1px, transparent 1px 14px)`,
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 10,
                  }}
                >
                  <div
                    style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1, minWidth: 0 }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`,
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Sparkles size={18} color={PAPER} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}
                      >
                        <span
                          className="o40-mono"
                          style={{
                            background: BLAZE,
                            color: PAPER,
                            fontSize: 9,
                            fontWeight: 800,
                            letterSpacing: '0.08em',
                            padding: '2px 6px',
                            borderRadius: 6,
                          }}
                        >
                          NUOVO v2.11.0
                        </span>
                        <span className="o40-mono" style={{ color: KHAKI, fontSize: 10 }}>
                          28 AGO 2026 · 10 LOOP GRAFICA
                        </span>
                      </div>
                      <div
                        className="o40-display"
                        style={{ color: PAPER, fontSize: 15, lineHeight: 1.1, marginTop: 3 }}
                      >
                        Grafica OLED — 10 loop: depth, card gloss, CTA blaze, HUD tactical!
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      try {
                        localStorage.setItem('o40_release_2.11.0', 'dismissed');
                      } catch {}
                      setShowReleaseBanner(false);
                    }}
                    aria-label="Chiudi"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      border: `1px solid ${OLIVE}`,
                      background: INK,
                      color: STEEL,
                      display: 'grid',
                      placeItems: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      position: 'relative',
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
                <ul
                  style={{
                    position: 'relative',
                    margin: 0,
                    paddingLeft: 18,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    listStyle: 'disc',
                  }}
                >
                  <li style={{ color: KHAKI, fontSize: 11.5, lineHeight: 1.35 }}>
                    <b style={{ color: PAPER }}>Backup</b>: export/import JSON + schema v2 — non
                    perdi più i dati cambiando device
                  </li>
                  <li style={{ color: KHAKI, fontSize: 11.5, lineHeight: 1.35 }}>
                    <b style={{ color: PAPER }}>Dedup</b>: DogTag/ProgressRing/styles centralizzati
                    — Home 65 righe → shared
                  </li>
                  <li style={{ color: KHAKI, fontSize: 11.5, lineHeight: 1.35 }}>
                    <b style={{ color: PAPER }}>i18n</b>: 15+ hardcoded IT → t() —
                    OGGI/PROGRESSI/MISSIONI + backup
                  </li>
                  <li style={{ color: KHAKI, fontSize: 11.5, lineHeight: 1.35 }}>
                    <b style={{ color: PAPER }}>Lazy+PWA</b>: 9 screen lazy (749k→444k) + SW
                    stale-while-revalidate + 51 test
                  </li>
                </ul>
                <div style={{ position: 'relative', display: 'flex', gap: 8, marginTop: 2 }}>
                  <button
                    onClick={() => setShowChangelog(true)}
                    style={{
                      flex: 1,
                      background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`,
                      color: PAPER,
                      border: 'none',
                      borderRadius: 10,
                      padding: '9px 12px',
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 14,
                      letterSpacing: '0.06em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                    }}
                  >
                    <Zap size={14} /> DETTAGLI <ChevronRight size={14} />
                  </button>
                  <button
                    onClick={() => {
                      try {
                        localStorage.setItem('o40_release_2.11.0', 'dismissed');
                      } catch {}
                      setShowReleaseBanner(false);
                    }}
                    style={{
                      background: INK,
                      border: `1px solid ${OLIVE}`,
                      color: KHAKI,
                      borderRadius: 10,
                      padding: '9px 14px',
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Chiudi
                  </button>
                </div>
              </div>
            )}
            {screen === 'home' && profile && (
              <HomeScreen
                profile={profile}
                sessions={sessions}
                customPrograms={customPrograms}
                waistHistory={waistHistory}
                weightHistory={weightHistory}
                onOpenProgram={(p) => {
                  setPreviewProgram(p);
                  setScreen('preview');
                }}
                onBuild={() => {
                  setEditingCustom(null);
                  setScreen('builder');
                }}
                onEditCustom={(p) => {
                  setEditingCustom(p);
                  setScreen('builder');
                }}
                onDeleteCustom={deleteCustomProgram}
                onDismissIntro={dismissIntro}
                onPromote={promoteLevel}
                onBellyTest={() => setShowBellyTest(true)}
                onPose={(ex) => setShowPose(ex)}
              />
            )}

            {screen === 'library' && <LibraryScreen sessions={sessions} profile={profile} />}

            {screen === 'builder' && (
              <BuilderScreen
                profile={profile}
                initial={editingCustom}
                onCancel={() => {
                  setEditingCustom(null);
                  setScreen('home');
                }}
                onCreate={createCustomProgram}
                onUpdate={updateCustomProgram}
              />
            )}

            {screen === 'preview' && previewProgram && (
              <PreviewScreen
                program={previewProgram}
                profile={profile}
                soundOn={soundOn}
                onBack={() => setScreen('home')}
                onStart={() => setScreen('countdown')}
              />
            )}

            {screen === 'countdown' && previewProgram && (
              <CountdownScreen
                program={previewProgram}
                lang={lang}
                t={t}
                onDone={() => startSession(previewProgram)}
              />
            )}

            {screen === 'session' && seq.length > 0 && (
              <SessionScreen
                program={activeProgram}
                profile={profile}
                seq={seq}
                phaseIdx={phaseIdx}
                secondsLeft={secondsLeft}
                paused={paused}
                setPaused={setPaused}
                soundOn={soundOn}
                setSoundOn={setSoundOn}
                musicOn={musicOn}
                onToggleMusic={toggleMusic}
                aiEnabled={aiCoachEnabled}
                onToggleAi={() => setAiCoachEnabled((v) => !v)}
                vocalMotivation={profile ? profile.vocalMotivation !== false : true}
                lang={lang}
                onSkip={advancePhase}
                onPrev={goPrev}
                exitConfirm={exitConfirm}
                setExitConfirm={setExitConfirm}
                onAiPhaseComplete={collectAiPhaseQuality}
                onExit={() => {
                  setExitConfirm(false);
                  setScreen('home');
                }}
              />
            )}

            {screen === 'summary' && lastStats && (
              <SummaryScreen
                stats={lastStats}
                aiQuality={lastStats.aiQuality}
                profile={profile}
                sessions={sessions}
                hrInput={hrInput}
                setHrInput={setHrInput}
                waistInput={waistInput}
                setWaistInput={setWaistInput}
                weightInput={weightInput}
                setWeightInput={setWeightInput}
                rpe={rpe}
                setRpe={setRpe}
                notes={notes}
                setNotes={setNotes}
                onSave={saveSession}
              />
            )}

            {screen === 'history' && (
              <HistoryScreen
                sessions={sessions}
                profile={profile}
                waistHistory={waistHistory}
                weightHistory={weightHistory}
                photos={photos}
                onAddPhoto={handleAddPhoto}
                onBack={() => setScreen('home')}
                onClear={clearHistory}
                onUpdateGoal={updateWeeklyGoal}
                onDeleteSession={deleteSession}
              />
            )}
          </Suspense>

          {['home', 'library', 'history', 'setup'].includes(screen) && (
            <BottomNav active={screen} onNavigate={setScreen} />
          )}

          {/* VersionBadge sempre visibile - tap riapre changelog v2.9.0 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              padding: screen === 'loading' ? '12px 0' : '6px 0 10px',
              opacity: 0.85,
            }}
          >
            <VersionBadge onClick={() => setShowChangelog(true)} />
            {updateAvailable && (
              <button
                onClick={async () => {
                  try {
                    try {
                      if (updateVersion) localStorage.setItem('o40_lastSw', updateVersion);
                    } catch {}
                    const reg = await navigator.serviceWorker.getRegistration();
                    if (reg && reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
                    await fetch('./sw.js', { cache: 'reload' });
                    window.location.href =
                      window.location.pathname +
                      '?v=' +
                      (updateVersion || Date.now()) +
                      window.location.hash;
                    setTimeout(() => window.location.reload(), 400);
                  } catch {
                    window.location.reload();
                  }
                }}
                style={{
                  background: BLAZE,
                  color: PAPER,
                  border: `1px solid ${BLAZE}`,
                  borderRadius: 20,
                  padding: '6px 14px',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: `0 4px 12px ${BLAZE}66`,
                  animation: 'glowPulse 1.8s ease-in-out infinite',
                }}
              >
                <RefreshCw size={12} /> Aggiorna app → {updateVersion || 'nuova versione'}
              </button>
            )}
          </div>
          {showChangelog && (
            <ChangelogModal
              lang={lang}
              onClose={() => setShowChangelog(false)}
              onTry={() => setShowPose('squat')}
            />
          )}

          {toast && (
            <div
              style={{
                position: 'absolute',
                left: 16,
                right: 16,
                bottom: 20,
                zIndex: 20,
                display: 'flex',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <div
                className="o40-toast-in"
                style={{
                  background: `linear-gradient(135deg, ${OLIVE}, ${OLIVE_DARK})`,
                  border: `1px solid ${BLAZE}`,
                  borderRadius: 12,
                  padding: '10px 18px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  color: PAPER,
                  fontSize: 13,
                  fontWeight: 600,
                  textAlign: 'center',
                  maxWidth: '100%',
                }}
              >
                {toast}
              </div>
            </div>
          )}

          {/* install banner */}
          {installPrompt && ['home', 'library', 'history', 'setup'].includes(screen) && (
            <div className="o40-install">
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: BLAZE,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Download size={18} color={PAPER} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: PAPER, fontWeight: 700, fontSize: 13 }}>
                  {lang === 'it'
                    ? 'Installa Operator 40'
                    : lang === 'de'
                      ? 'Operator 40 installieren'
                      : 'Install Operator 40'}
                </div>
                <div style={{ color: KHAKI, fontSize: 11 }}>
                  {lang === 'it'
                    ? 'Aggiungi alla home per l’accesso offline'
                    : 'Add to home for offline access'}
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    installPrompt.prompt();
                    const c = await installPrompt.userChoice;
                    if (c.outcome === 'accepted') setInstallPrompt(null);
                  } catch {}
                }}
                style={{
                  background: BLAZE,
                  color: PAPER,
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                OK
              </button>
              <button
                onClick={() => setInstallPrompt(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: STEEL,
                  cursor: 'pointer',
                  padding: 6,
                }}
              >
                <X size={16} />
              </button>
            </div>
          )}
          {/* tour */}
          {showTour && (
            <div
              className="o40-tour-mask"
              onClick={() => {
                setShowTour(false);
                try {
                  localStorage.setItem('o40_seenTour', '1');
                } catch {}
              }}
            >
              <div className="o40-tour-card" onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Sparkles size={18} color={BLAZE} />
                  <span className="o40-display" style={{ fontSize: 20 }}>
                    Benvenuto!
                  </span>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: '#333' }}>
                  {lang === 'it'
                    ? 'Tre tap: scegli la missione del giorno, allenati 15 minuti, traccia i progressi. Tutto offline, sulla tua privacy.'
                    : "Three taps: pick today's mission, train 15 min, track progress. Fully offline, private."}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <button
                    onClick={() => {
                      setShowTour(false);
                      try {
                        localStorage.setItem('o40_seenTour', '1');
                      } catch {}
                    }}
                    style={{
                      flex: 1,
                      background: BLAZE,
                      color: PAPER,
                      border: 'none',
                      borderRadius: 10,
                      padding: '10px 0',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    INIZIA
                  </button>
                  <button
                    onClick={() => {
                      setShowTour(false);
                      try {
                        localStorage.setItem('o40_seenTour', '1');
                      } catch {}
                    }}
                    style={{
                      background: 'transparent',
                      border: `1px solid ${OLIVE}`,
                      borderRadius: 10,
                      padding: '10px 14px',
                      cursor: 'pointer',
                    }}
                  >
                    <Eye size={16} color={OLIVE} />
                  </button>
                </div>
              </div>
            </div>
          )}
          {showBellyTest && (
            <div
              className="o40-tour-mask"
              onClick={() => setShowBellyTest(false)}
              style={{ zIndex: 20 }}
            >
              <div
                className="o40-tour-card"
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: '90vh', overflowY: 'auto', maxWidth: 440, width: '92vw' }}
              >
                <BellyTest
                  lang={lang}
                  initial={profile?.bellyTest}
                  onSave={saveBellyTest}
                  onClose={() => setShowBellyTest(false)}
                />
              </div>
            </div>
          )}
          {showPose && (
            <div className="o40-tour-mask" onClick={() => setShowPose(null)} style={{ zIndex: 25 }}>
              <div
                className="o40-tour-card"
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  maxWidth: 560,
                  width: '96vw',
                  padding: 0,
                  overflow: 'hidden',
                  border: `1px solid ${OLIVE}`,
                  borderRadius: 18,
                }}
              >
                <FitnessEngineView
                  exercise={typeof showPose === 'string' ? showPose : 'squat'}
                  lang={lang}
                  onClose={() => setShowPose(null)}
                  onDone={({ reps, elapsedMs, avgQuality }) => {
                    showToast(
                      `${reps} rep · ${Math.round(elapsedMs / 1000)}s · Q ${Math.round(avgQuality)}/100`
                    );
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </LangContext.Provider>
  );
}
