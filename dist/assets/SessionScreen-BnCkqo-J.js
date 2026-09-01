const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./media-BXv9Yzv2.js","./clips-BUPhiWww.js"])))=>i.map(i=>d[i]);
import { a2 as detectLang, L as LANGS, a3 as localizedCue, a4 as getDefinition, a1 as HOLD_EXERCISES, a0 as getReps, J as EXERCISES, a5 as normalizeExerciseId, j as jsxRuntimeExports, O as OLIVE, I as INK, K as KHAKI, P as PAPER, S as STEEL, b as INK_2, B as BLAZE, a6 as PositioningMask, a7 as FitnessEngine, a8 as drawSkeleton, a9 as alignmentScore, a as OLIVE_DARK, u as useT, p as playBeep, V as speak, t as tr, aa as getVocalMotivation, ab as LOCALES, G as vibrate, R as btnIcon, ac as formatTime, $ as primaryBtn, ad as iconCircle, ae as pillBtn, s as secondaryBtn, _ as __vitePreload } from "./index-BbonTWJl.js";
import { r as reactExports, E as Eye, m as Music2, n as HeadphoneOff, V as Volume2, j as VolumeX, Q as Play, W as Wind, G as Lightbulb, Y as Pause, i as ChevronLeft, l as SkipForward, C as Check } from "./icons-Cu976FrU.js";
import { E as ExerciseFigure } from "./ExerciseFigure-BON2E8Tg.js";
import { T as TopBar } from "./TopBar-BAwVgnQn.js";
import { P as ProgressRing } from "./ProgressRing-CUXQpRN6.js";
import "./charts-Cp2TOHCu.js";
const FALLBACK = "en";
function normalizeLang(input) {
  if (!input) return detectLang() || FALLBACK;
  const base = input.split("-")[0].toLowerCase();
  if (LANGS.includes(base)) return base;
  if (["fr", "de", "it", "en"].includes(base)) return base;
  return FALLBACK;
}
const COACH_I18N = {
  // Form corrections
  "coach.backStraight": { it: "Tieni la schiena dritta!", en: "Keep your back straight!", de: "Halte deinen Rücken gerade!", fr: "Tiens le dos droit !" },
  "coach.goLower": { it: "Scendi ancora!", en: "Go lower!", de: "Geh tiefer!", fr: "Descends plus bas !" },
  "coach.extendArms": { it: "Braccia completamente distese!", en: "Fully extend your arms!", de: "Arme ganz strecken!", fr: "Tends complètement les bras !" },
  "coach.extendLegs": { it: "Distendi le gambe!", en: "Fully extend your legs!", de: "Beine ganz strecken!", fr: "Tends complètement les jambes !" },
  "coach.control": { it: "Controlla il movimento.", en: "Control the movement.", de: "Kontrolliere die Bewegung.", fr: "Contrôle le mouvement." },
  "coach.hipsStable": { it: "Tieni il bacino stabile.", en: "Keep your hips stable.", de: "Halte die Hüften stabil.", fr: "Garde les hanches stables." },
  "coach.kneesOverToes": { it: "Ginocchia sopra le punte.", en: "Knees over toes.", de: "Knie über den Zehen.", fr: "Genoux au-dessus des orteils." },
  "coach.coreTight": { it: "Addome contratto!", en: "Tighten your core!", de: "Core anspannen!", fr: "Gaine les abdos !" },
  "coach.steady": { it: "Ritmo costante.", en: "Steady rhythm.", de: "Gleichmäßiges Tempo.", fr: "Rythme régulier." },
  "coach.slowDown": { it: "Rallenta un po’.", en: "Slow down.", de: "Langsamer.", fr: "Ralentis." },
  "coach.breathe": { it: "Respira!", en: "Breathe!", de: "Atmen!", fr: "Respire !" },
  // Rep / quality praise
  "coach.good": { it: "Bene!", en: "Good!", de: "Gut!", fr: "Bien !" },
  "coach.perfect": { it: "Perfetto!", en: "Perfect!", de: "Perfekt!", fr: "Parfait !" },
  "coach.excellentRep": { it: "Ripetizione eccellente!", en: "Excellent repetition!", de: "Ausgezeichnete Wiederholung!", fr: "Excellente répétition !" },
  "coach.almostThere": { it: "Ci sei quasi!", en: "Almost there!", de: "Fast geschafft!", fr: "Presque arrivé !" },
  // Motivation
  "coach.greatJob": { it: "Grande lavoro! Continua così!", en: "Great job! Keep going!", de: "Großartige Arbeit! Weiter so!", fr: "Excellent travail ! Continue !" },
  "coach.threeMore": { it: "Ancora tre!", en: "Only three more!", de: "Nur noch drei!", fr: "Encore trois !" },
  "coach.twoMore": { it: "Dai! Ancora due!", en: "Come on! Two more!", de: "Komm schon! Noch zwei!", fr: "Allez ! Encore deux !" },
  "coach.oneMore": { it: "ULTIMO! Dai tutto!", en: "ONE MORE! Give it everything!", de: "LETZTE! Gib alles!", fr: "DERNIÈRE ! Donne tout !" },
  "coach.missionComplete": { it: "Missione compiuta! Lavoro eccellente!", en: "Mission complete! Excellent work!", de: "Mission abgeschlossen! Ausgezeichnet!", fr: "Mission accomplie ! Excellent travail !" },
  "coach.ready": { it: "Pronto? Inizia quando vuoi.", en: "Ready? Start when you are.", de: "Bereit? Starte wenn du willst.", fr: "Prêt ? Démarre quand tu veux." },
  "coach.holdPosition": { it: "Mantieni la posizione...", en: "Hold the position...", de: "Position halten...", fr: "Garde la position..." },
  "coach.moveIntoFrame": { it: "Entra nell’inquadratura.", en: "Move into frame.", de: "Komm ins Bild.", fr: "Place-toi dans le cadre." },
  "coach.poseQuality": { it: "Qualità posa", en: "Pose quality", de: "Pose-Qualität", fr: "Qualité pose" },
  "coach.moveBack": { it: "Allontanati così vedo tutto il corpo.", en: "Move back so I can see your whole body.", de: "Geh zurück, damit ich deinen ganzen Körper sehe.", fr: "Recule pour que je voie tout le corps." },
  "coach.feetOutside": { it: "Piedi fuori dall’inquadratura.", en: "Your feet are outside the camera.", de: "Füße außerhalb des Bildes.", fr: "Pieds hors du cadre." },
  "coach.turnSideways": { it: "Girati di lato.", en: "Turn sideways.", de: "Dreh dich seitlich.", fr: "Tourne-toi de côté." },
  "coach.upperBodyHidden": { it: "Non vedo la parte superiore del corpo.", en: "I can't see your upper body.", de: "Oberkörper nicht sichtbar.", fr: "Je ne vois pas le haut du corps." },
  // Misc
  "coach.rep": { it: "Ripetizione", en: "Rep", de: "Wdh", fr: "Rép" },
  "coach.time": { it: "Tempo", en: "Time", de: "Zeit", fr: "Temps" },
  "coach.form": { it: "Forma", en: "Form", de: "Form", fr: "Forme" },
  "coach.status.good": { it: "Buona forma", en: "Good form", de: "Gute Form", fr: "Bonne forme" },
  "coach.status.fix": { it: "Correggi", en: "Fix form", de: "Korrigieren", fr: "Corrige" },
  "coach.perRep": { it: "Qualità per ripetizione", en: "Quality per rep", de: "Qualität pro Wdh", fr: "Qualité par rép" },
  "coach.trend": { it: "andamento", en: "trend", de: "Trend", fr: "tendance" },
  "coach.correct": { it: "CORREZIONE", en: "CORRECT", de: "KORREKTUR", fr: "CORRECTION" }
};
function tCoach(key, lang) {
  const l = normalizeLang(lang);
  const entry = COACH_I18N[key];
  if (!entry) return key;
  return entry[l] ?? entry.en ?? key;
}
class CoachEngine {
  constructor(opts = {}) {
    this.lastSpokeByKey = /* @__PURE__ */ new Map();
    this.lastGeneralSpeak = 0;
    this.queue = [];
    this.lang = normalizeLang(opts.lang);
    this.enableVoice = !!opts.enableVoice;
    this.cooldownMs = opts.cooldownMs ?? 2800;
  }
  setLang(lang) {
    this.lang = normalizeLang(lang);
  }
  setVoiceEnabled(v) {
    this.enableVoice = v;
    if (!v) this.cancelSpeech();
  }
  /** Decide feedback based on priority. Called each frame where form is available. */
  decideFeedback(params) {
    const { formQuality, cues, reps, targetReps, isHold } = params;
    if (formQuality < 58 && cues[0]) {
      const cue = cues[0];
      const key = cueToCoachKey(cue);
      if (key && this.canSpeakKey(key)) {
        return { text: key ? tCoach(key, this.lang) : localizedCue(cue, this.lang), priority: 1, cueKey: key ?? cue };
      }
      if (cues.length) return { text: localizedCue(cue, this.lang), priority: 1, cueKey: cue };
    }
    if (cues.includes("scendiAncora") || cues.includes("distendiBraccia") || cues.includes("distendiGambe")) {
      const k = cues.find((c) => ["scendiAncora", "distendiBraccia", "distendiGambe"].includes(c));
      if (k && this.canSpeakKey(k)) {
        return { text: localizedCue(k, this.lang), priority: 2, cueKey: k };
      }
    }
    if (targetReps && reps >= 0) {
      const remaining = targetReps - reps;
      if (remaining === 0 && reps > 0) ;
      else if (remaining === 1) {
        if (this.canSpeakKey("oneMore")) return { text: tCoach("coach.oneMore", this.lang), priority: 3, cueKey: "oneMore" };
      } else if (remaining === 2) {
        if (this.canSpeakKey("twoMore")) return { text: tCoach("coach.twoMore", this.lang), priority: 3, cueKey: "twoMore" };
      } else if (remaining === 3) {
        if (this.canSpeakKey("threeMore")) return { text: tCoach("coach.threeMore", this.lang), priority: 3, cueKey: "threeMore" };
      }
    }
    if (formQuality > 75 && reps > 0 && reps % 5 === 0) {
      if (this.canSpeakKey("greatJob")) return { text: tCoach("coach.greatJob", this.lang), priority: 4, cueKey: "greatJob" };
    }
    return { text: null, priority: 99 };
  }
  /** Motivation tick outside per-frame: call when reps increment or timer milestones */
  motivationForRep(reps, targetReps, quality) {
    if (!targetReps) {
      if (reps > 0 && reps % 6 === 0 && (quality ?? 100) > 65) return tCoach("coach.greatJob", this.lang);
      return null;
    }
    const remaining = targetReps - reps;
    if (remaining === 3) return tCoach("coach.threeMore", this.lang);
    if (remaining === 2) return tCoach("coach.twoMore", this.lang);
    if (remaining === 1) return tCoach("coach.oneMore", this.lang);
    if (remaining === 0) return tCoach("coach.missionComplete", this.lang);
    if (reps > 0 && reps % 5 === 0 && (quality ?? 70) > 72) return tCoach("coach.greatJob", this.lang);
    if (reps === 1 && (quality ?? 0) > 80) return tCoach("coach.good", this.lang);
    return null;
  }
  canSpeakKey(key) {
    const last = this.lastSpokeByKey.get(key) ?? 0;
    return performance.now() - last > this.cooldownMs;
  }
  markSpoken(key) {
    this.lastSpokeByKey.set(key, performance.now());
    this.lastGeneralSpeak = performance.now();
  }
  // ---- SpeechManager (Web Speech API) ----
  speak(text, opts = {}) {
    if (!text) return;
    if (!this.enableVoice) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (!opts.force && opts.key && !this.canSpeakKey(opts.key)) return;
    if (!opts.force && performance.now() - this.lastGeneralSpeak < 1100) {
      if (this.queue.length < 2) this.queue.push(text);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = this.lang === "de" ? "de-DE" : this.lang === "fr" ? "fr-FR" : this.lang === "it" ? "it-IT" : "en-US";
      u.rate = opts.rate ?? 1;
      u.volume = 0.95;
      u.onend = () => {
        if (opts.key) this.markSpoken(opts.key);
        this.lastGeneralSpeak = performance.now();
        const nxt = this.queue.shift();
        if (nxt) setTimeout(() => this.speak(nxt, { force: true }), 250);
      };
      u.onerror = () => {
        if (opts.key) this.markSpoken(opts.key);
      };
      window.speechSynthesis.speak(u);
      if (opts.key) this.markSpoken(opts.key);
      this.lastGeneralSpeak = performance.now();
    } catch {
    }
  }
  speakKey(coachKey, fallbackCue) {
    const text = COACH_KEY_EXISTS(coachKey) ? tCoach(coachKey, this.lang) : fallbackCue ? localizedCue(fallbackCue, this.lang) : coachKey;
    this.speak(text, { key: coachKey });
  }
  cancelSpeech() {
    var _a;
    try {
      (_a = window.speechSynthesis) == null ? void 0 : _a.cancel();
    } catch {
    }
    this.queue = [];
  }
}
function cueToCoachKey(cue) {
  const map = {
    backStraight: "coach.backStraight",
    scendiAncora: "coach.goLower",
    distendiBraccia: "coach.extendArms",
    distendiGambe: "coach.extendLegs",
    coreTight: "coach.coreTight",
    control: "coach.control",
    steady: "coach.steady",
    kneesOverToes: "coach.kneesOverToes",
    elbows45: "coach.extendArms",
    hipsUp: "coach.hipsStable"
  };
  return map[cue] ?? null;
}
function COACH_KEY_EXISTS(k) {
  return k.startsWith("coach.");
}
function exerciseFromPhase(phase, lang = "it", levelKey = "combattente") {
  var _a, _b;
  if (!phase || !phase.exerciseId) return null;
  const rawId = phase.exerciseId;
  const nid = normalizeExerciseId(rawId);
  const def = getDefinition(nid) ?? null;
  const trackingSupported = !!def && def.trackingSupported !== false;
  const hold = HOLD_EXERCISES.has(rawId) || !!(def == null ? void 0 : def.isHold);
  const reps = phase.reps ?? (!hold ? getReps(rawId, levelKey) : null);
  return {
    exerciseId: nid,
    originalId: rawId,
    definition: def,
    trackingSupported,
    targetReps: reps,
    targetDurationMs: hold ? phase.duration != null ? phase.duration * 1e3 : 40 * 1e3 : null,
    isTimeBased: hold || reps == null,
    isHold: hold,
    label: ((_b = (_a = EXERCISES[rawId]) == null ? void 0 : _a.name) == null ? void 0 : _b[lang]) ?? nid
  };
}
function fmtMs(ms) {
  const s = Math.floor(ms / 1e3);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
function qColor(q) {
  return q > 70 ? "#7FB069" : q > 50 ? "#D4A017" : BLAZE;
}
function SessionAIOverlay({ phase, lang = "it", levelKey = "combattente", onRep, onCompletePhase, onFormUpdate, aiEnabled = true, enableMotionFusion = false, compact = false }) {
  var _a, _b, _c, _d, _e, _f, _g;
  const videoRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const engineRef = reactExports.useRef(null);
  const coachRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const [status, setStatus] = reactExports.useState("idle");
  const [error, setError] = reactExports.useState(null);
  const [metrics, setMetrics] = reactExports.useState(null);
  const [coachingText, setCoachingText] = reactExports.useState("");
  const [reps, setReps] = reactExports.useState(0);
  const [alignOkSince, setAlignOkSince] = reactExports.useState(null);
  const missionEx = exerciseFromPhase(phase, lang, levelKey);
  const trackingSupported = (missionEx == null ? void 0 : missionEx.trackingSupported) !== false && ((_a = missionEx == null ? void 0 : missionEx.definition) == null ? void 0 : _a.trackingSupported) !== false;
  const targetReps = (missionEx == null ? void 0 : missionEx.targetReps) ?? (phase == null ? void 0 : phase.reps) ?? null;
  const isHold = !!(missionEx == null ? void 0 : missionEx.isHold);
  const exerciseId = (missionEx == null ? void 0 : missionEx.exerciseId) ?? (phase == null ? void 0 : phase.exerciseId) ?? "squat";
  if (!coachRef.current) coachRef.current = new CoachEngine({ lang, enableVoice: true, cooldownMs: 2600 });
  reactExports.useEffect(() => {
    var _a2;
    (_a2 = coachRef.current) == null ? void 0 : _a2.setLang(lang);
  }, [lang]);
  reactExports.useEffect(() => {
    let cancelled = false;
    async function start() {
      if (!aiEnabled) return;
      setStatus("camera");
      setError(null);
      setReps(0);
      setMetrics(null);
      setCoachingText("");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640, max: 640 }, height: { ideal: 480, max: 480 }, frameRate: { ideal: 30, max: 30 } },
          audio: false
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {
          });
        }
        if (cancelled) return;
        setStatus("loading");
        const eng = new FitnessEngine({
          exerciseId,
          lang,
          targetFps: 28,
          enableFiltering: true,
          enableSpeech: false,
          // we handle speech via CoachEngine
          enableMotionFusion,
          onRep: (evt) => {
            var _a2, _b2, _c2;
            setReps(evt.repIndex);
            onRep == null ? void 0 : onRep(evt.repIndex, evt);
            const mot = (_a2 = coachRef.current) == null ? void 0 : _a2.motivationForRep(evt.repIndex, targetReps, evt.quality);
            if (mot) {
              setCoachingText(mot);
              (_b2 = coachRef.current) == null ? void 0 : _b2.speak(mot, { key: `mot-${evt.repIndex}`, rate: 1.05 });
            } else if (evt.quality > 80) {
              const praise = tCoach("coach.good", lang);
              setCoachingText(praise);
            }
            if (targetReps && evt.repIndex >= targetReps) {
              const m = eng.metrics;
              setTimeout(() => onCompletePhase == null ? void 0 : onCompletePhase({ reps: evt.repIndex, elapsedMs: m.elapsedMs, avgQuality: m.avgQuality }), 650);
              (_c2 = coachRef.current) == null ? void 0 : _c2.speak(tCoach("coach.missionComplete", lang), { key: "missionComplete", rate: 0.95 });
            }
          },
          onPhaseChange: (ph, form) => {
            var _a2, _b2;
            if (!form) return;
            onFormUpdate == null ? void 0 : onFormUpdate(form.quality, form.quality > 68 ? tCoach("coach.status.good", lang) : tCoach("coach.status.fix", lang));
            const fb = (_a2 = coachRef.current) == null ? void 0 : _a2.decideFeedback({
              phase: ph,
              formQuality: form.quality,
              cues: form.cues,
              velocity: form.velocity,
              reps,
              targetReps,
              elapsedMs: eng.metrics.elapsedMs,
              isHold
            });
            if (fb == null ? void 0 : fb.text) {
              setCoachingText(fb.text);
              if (fb.priority <= 2) (_b2 = coachRef.current) == null ? void 0 : _b2.speak(fb.text, { key: fb.cueKey ?? "form", rate: 1 });
            }
          },
          onMetrics: (m) => {
            setMetrics(m);
            if (isHold && targetReps == null && (phase == null ? void 0 : phase.duration)) {
              const targetMs = phase.duration * 1e3;
              if (m.elapsedMs >= targetMs && m.elapsedMs > 0) {
                onCompletePhase == null ? void 0 : onCompletePhase({ reps: 0, elapsedMs: m.elapsedMs, avgQuality: m.avgQuality });
              }
            }
          }
        });
        if (cancelled) {
          eng.destroy();
          return;
        }
        engineRef.current = eng;
        await eng.init(videoRef.current, () => {
        });
        if (cancelled) {
          eng.destroy();
          return;
        }
        eng.start();
        setStatus("running");
      } catch (e) {
        const raw = (e == null ? void 0 : e.message) ?? String(e);
        const isChunkErr = /Failed to fetch|module script failed|ChunkLoadError|dynamically imported|WASM|PoseLandmarker|tasks-vision/i.test(raw);
        const friendly = isChunkErr ? lang === "it" ? `AI non caricata: ${raw.slice(0, 180)} — Ricarica la pagina (aggiornamento in corso o rete lenta). Se offline, serve aver eseguito npm run fetch:mediapipe prima del build.` : lang === "de" ? `KI nicht geladen: ${raw.slice(0, 180)} — Seite neu laden (Update läuft oder langsames Netz).` : `AI failed to load: ${raw.slice(0, 180)} — Reload page (update in progress or slow network).` : raw.includes("NotAllowedError") || raw.includes("Permission") || raw.includes("Permission denied") ? lang === "it" ? "Permesso camera negato — consenti la camera e riprova (serve HTTPS)." : lang === "de" ? "Kamera-Berechtigung verweigert — erlaube Kamera und versuche erneut (HTTPS erforderlich)." : "Camera permission denied — allow camera and retry (HTTPS required)." : raw.includes("NotFoundError") || raw.includes("Overconstrained") ? lang === "it" ? "Camera non trovata — nessun dispositivo video disponibile." : lang === "de" ? "Keine Kamera gefunden." : "No camera found." : raw;
        setError(friendly);
        setStatus("error");
        if (isChunkErr && /Failed to fetch|module script failed|ChunkLoadError|dynamically imported/i.test(raw)) {
          try {
            const k = "o40_ai_chunk_retry";
            const last = Number(sessionStorage.getItem(k) || 0);
            if (Date.now() - last > 8e3) {
              sessionStorage.setItem(k, String(Date.now()));
              setTimeout(() => window.location.reload(), 900);
            }
          } catch {
          }
        }
      }
    }
    start();
    return () => {
      var _a2, _b2;
      cancelled = true;
      try {
        (_a2 = engineRef.current) == null ? void 0 : _a2.destroy();
      } catch {
      }
      engineRef.current = null;
      if (streamRef.current) {
        try {
          streamRef.current.getTracks().forEach((t) => t.stop());
        } catch {
        }
        streamRef.current = null;
      }
      (_b2 = coachRef.current) == null ? void 0 : _b2.cancelSpeech();
    };
  }, [exerciseId, phase == null ? void 0 : phase.exerciseId, phase == null ? void 0 : phase.reps, phase == null ? void 0 : phase.duration, aiEnabled, enableMotionFusion, lang, levelKey, isHold]);
  reactExports.useEffect(() => {
    let raf = 0;
    const draw = () => {
      var _a2;
      raf = requestAnimationFrame(draw);
      const canvas = canvasRef.current, video = videoRef.current, eng = engineRef.current;
      if (!canvas || !video || !eng) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      try {
        if (video.readyState >= 2) ctx.drawImage(video, 0, 0, W, H);
      } catch {
      }
      const res = (_a2 = eng.getLastResult()) == null ? void 0 : _a2.landmarks;
      if (res) drawSkeleton(ctx, res, W, H, { mirror: true, color: BLAZE, jointColor: PAPER });
      if (res && reps === 0 && ((metrics == null ? void 0 : metrics.currentPhase) === "ready" || (metrics == null ? void 0 : metrics.currentPhase) === "idle")) {
        const s = alignmentScore(res, exerciseId);
        if (s > 0.68) {
          if (alignOkSince == null) setAlignOkSince(performance.now());
        } else {
          if (alignOkSince != null) setAlignOkSince(null);
        }
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [reps, metrics == null ? void 0 : metrics.currentPhase, exerciseId, alignOkSince]);
  const normLang = normalizeLang(lang);
  const formVal = Math.round((metrics == null ? void 0 : metrics.avgQuality) ?? ((_b = metrics == null ? void 0 : metrics.currentForm) == null ? void 0 : _b.quality) ?? 0);
  const poseQuality = Math.round((metrics == null ? void 0 : metrics.poseQuality) ?? ((_c = metrics == null ? void 0 : metrics.currentForm) == null ? void 0 : _c.poseQuality) ?? 0);
  const activeCues = (((_d = metrics == null ? void 0 : metrics.currentForm) == null ? void 0 : _d.cues) ?? []).slice(0, 2);
  const repDurs = (metrics == null ? void 0 : metrics.repDurationsMs) ?? [];
  const avgRepSec = repDurs.length ? repDurs.reduce((a, b) => a + b, 0) / repDurs.length / 1e3 : null;
  const statusText = !metrics ? tCoach("coach.moveIntoFrame", normLang) : formVal > 68 ? tCoach("coach.status.good", normLang) : tCoach("coach.status.fix", normLang);
  if (!aiEnabled) return null;
  if (!trackingSupported) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", background: INK, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14, textAlign: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10 }, children: "AI TRACKING" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 13, marginTop: 6 }, children: lang === "it" ? "Tracciamento AI non ancora calibrato per questo esercizio — usa timer standard." : lang === "de" ? "KI-Tracking für diese Übung noch nicht kalibriert — Standard-Timer wird verwendet." : "AI tracking not yet calibrated for this exercise — using standard timer." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11, marginTop: 8 }, children: exerciseId })
    ] });
  }
  const progressPct = targetReps ? Math.min(1, reps / targetReps) : (metrics == null ? void 0 : metrics.elapsedMs) && (phase == null ? void 0 : phase.duration) ? Math.min(1, metrics.elapsedMs / (phase.duration * 1e3)) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", background: INK, border: `1px solid ${OLIVE}`, borderRadius: 14, overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, padding: 8, background: `linear-gradient(180deg, ${INK_2} 0%, ${INK} 100%)`, borderBottom: `1px solid ${OLIVE}33` }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-glass", style: { borderRadius: 10, padding: "6px 8px", textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 8 }, children: tCoach("coach.time", normLang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 16, lineHeight: 1 }, children: fmtMs((metrics == null ? void 0 : metrics.elapsedMs) ?? 0) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-glass", style: { borderRadius: 10, padding: "6px 8px", textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 8 }, children: tCoach("coach.rep", normLang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-display o40-pop", style: { color: BLAZE, fontSize: 16, lineHeight: 1 }, children: [
          reps,
          targetReps ? ` / ${targetReps}` : ""
        ] }, reps),
        targetReps ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 2, marginTop: 4, height: 5 }, children: Array.from({ length: targetReps }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, borderRadius: 2, overflow: "hidden", background: OLIVE + "55" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "100%", height: "100%", background: i < reps ? BLAZE : "transparent", transition: "background 0.25s ease" } }) }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 4, background: OLIVE + "55", borderRadius: 2, marginTop: 4, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: `${Math.round(progressPct * 100)}%`, height: "100%", background: BLAZE, transition: "width 0.3s" } }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-glass", style: { borderRadius: 10, padding: "6px 8px", textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 8 }, children: tCoach("coach.form", normLang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", width: 40, height: 40, margin: "2px auto 0" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 40 40", width: 40, height: 40, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20", cy: "20", r: "16", fill: "none", stroke: OLIVE, strokeOpacity: "0.4", strokeWidth: "3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: "20",
                cy: "20",
                r: "16",
                fill: "none",
                stroke: qColor(formVal),
                strokeWidth: "3.5",
                strokeLinecap: "round",
                strokeDasharray: `${formVal / 100 * (2 * Math.PI * 16)} ${2 * Math.PI * 16}`,
                transform: "rotate(-90 20 20)",
                style: { transition: "stroke-dasharray 0.4s ease, stroke 0.3s ease" }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-display", style: { color: qColor(formVal), fontSize: 13, lineHeight: 1 }, children: formVal }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: formVal > 68 ? "#7FB069" : BLAZE, fontSize: 7 }, children: statusText })
      ] })
    ] }),
    !isHold && (((_e = metrics == null ? void 0 : metrics.repQualityHistory) == null ? void 0 : _e.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "6px 8px", borderBottom: `1px solid ${OLIVE}22`, background: `${INK_2}88` }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: STEEL, fontSize: 8 }, children: tCoach("coach.perRep", normLang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 8 }, children: tCoach("coach.trend", normLang) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 2, alignItems: "flex-end", height: 22 }, children: metrics.repQualityHistory.slice(-14).map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          title: `${q}%`,
          className: "o40-eqbar",
          style: { height: `${Math.max(14, q / 100 * 100)}%`, backgroundColor: qColor(q), opacity: 0.85, flex: 1, boxShadow: i === metrics.repQualityHistory.length - 1 ? `0 0 6px ${qColor(q)}88` : "none" }
        },
        `${reps}-${i}`
      )) })
    ] }),
    metrics && poseQuality < 42 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { margin: "8px 8px 0", padding: "6px 8px", borderRadius: 8, background: `${BLAZE}1A`, border: `1px solid ${BLAZE}55`, color: PAPER, fontSize: 11, textAlign: "center" }, children: lang === "it" ? "Allontanati così vedo tutto il corpo." : lang === "de" ? "Geh zurück, damit ich deinen ganzen Körper sehe." : "Move back so I can see your whole body." }),
    metrics && activeCues.length > 0 && formVal < 68 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "8px 8px 0", padding: "6px 8px", borderRadius: 8, background: `${BLAZE}10`, border: `1px solid ${BLAZE}44` }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: BLAZE, fontSize: 8, marginBottom: 4 }, children: tCoach("coach.correct", normLang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 4 }, children: activeCues.map((cue) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { background: `${BLAZE}22`, color: PAPER, fontSize: 9, padding: "3px 7px", borderRadius: 20, border: `1px solid ${BLAZE}55` }, children: localizedCue(cue, normLang) }, cue)) })
    ] }),
    coachingText && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-pop", style: { margin: "8px 8px 0", padding: "8px 10px", borderRadius: 10, background: `${BLAZE}14`, border: `1px solid ${BLAZE}55`, color: PAPER, fontSize: 12, textAlign: "center" }, children: coachingText }, coachingText),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-ai-stage", style: { position: "relative", width: "100%", aspectRatio: "4/3", background: "#050608", marginTop: coachingText ? 8 : 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: videoRef, autoPlay: true, muted: true, playsInline: true, "webkit-playsinline": "true", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)", background: "#000" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, width: 640, height: 480, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)", pointerEvents: "none" } }),
      reps === 0 && status === "running" && ((metrics == null ? void 0 : metrics.currentPhase) === "ready" || (metrics == null ? void 0 : metrics.currentPhase) === "idle" || !metrics) && /* @__PURE__ */ jsxRuntimeExports.jsx(PositioningMask, { exerciseId, landmarks: ((_g = (_f = engineRef.current) == null ? void 0 : _f.getLastResult()) == null ? void 0 : _g.landmarks) ?? null, lang, width: 640, height: 480 }),
      status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(0,0,0,0.45)", color: PAPER }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { fontSize: 10, color: KHAKI }, children: "AI Coach loading…" }) }),
      status === "error" && error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(0,0,0,0.82)", padding: 16, textAlign: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: 300 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: BLAZE, fontSize: 12, lineHeight: 1.4 }, children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => window.location.reload(), style: { background: BLAZE, color: PAPER, border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }, children: lang === "it" ? "Ricarica" : lang === "de" ? "Neu laden" : "Reload" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setError(null);
            setStatus("idle");
            if (streamRef.current) {
              try {
                streamRef.current.getTracks().forEach((t) => t.stop());
              } catch {
              }
              streamRef.current = null;
            }
          }, style: { background: "transparent", color: KHAKI, border: `1px solid ${KHAKI}`, borderRadius: 8, padding: "6px 12px", fontSize: 11, cursor: "pointer" }, children: lang === "it" ? "Riprova camera" : lang === "de" ? "Erneut versuchen" : "Retry" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 9, marginTop: 8 }, children: lang === "it" ? "Suggerimento: disattiva AI con 👁️ per usare timer standard senza camera." : lang === "de" ? "Tipp: KI mit 👁️ deaktivieren für Timer ohne Kamera." : "Tip: disable AI with 👁️ to use timer without camera." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", bottom: 6, left: 6, right: 6, display: "flex", justifyContent: "space-between", pointerEvents: "none" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { background: `${INK}DD`, color: KHAKI, fontSize: 9, padding: "3px 7px", borderRadius: 20, border: `1px solid ${OLIVE}55` }, children: [
          exerciseId,
          " · ",
          status === "running" ? "AI" : status
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { background: `${INK}DD`, color: poseQuality > 60 ? "#7FB069" : poseQuality > 40 ? "#D4A017" : BLAZE, fontSize: 9, padding: "3px 7px", borderRadius: 20, border: `1px solid ${OLIVE}55` }, children: [
          "POSE ",
          poseQuality,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `o40-mono ${status === "running" && ((metrics == null ? void 0 : metrics.currentPhase) === "idle" || (metrics == null ? void 0 : metrics.currentPhase) === "ready") ? "o40-blink" : ""}`, style: { background: formVal > 68 ? "#7FB069DD" : `${BLAZE}DD`, color: PAPER, fontSize: 9, padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.04em" }, children: (metrics == null ? void 0 : metrics.currentPhase) ?? "idle" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "6px 8px", background: INK_2, borderTop: `1px solid ${OLIVE}22`, display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: isHold ? tCoach("coach.holdPosition", normLang) : `${tCoach("coach.rep", normLang)} ${reps}${targetReps ? `/${targetReps}` : ""} · ${formVal}/100` }),
      !isHold && avgRepSec != null && reps > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 8 }, title: "Ritmo medio per ripetizione", children: [
        "⌁ ",
        avgRepSec < 10 ? avgRepSec.toFixed(1) : Math.round(avgRepSec),
        "s"
      ] }),
      !isHold && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", title: "Confidenza dell'ultimo movimento rilevato — sotto ~62 la rep non viene contata", style: { color: ((metrics == null ? void 0 : metrics.liveRepConfidence) ?? 0) > 62 ? "#7FB069" : STEEL, fontSize: 8 }, children: [
        "CONF ",
        (metrics == null ? void 0 : metrics.liveRepConfidence) ?? 0
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 8 }, children: [
        "AI · ",
        exerciseId,
        " · ",
        fmtMs((metrics == null ? void 0 : metrics.elapsedActiveMs) ?? 0),
        " active"
      ] })
    ] })
  ] });
}
let lock = null;
async function requestWakeLock() {
  if (!("wakeLock" in navigator)) return null;
  try {
    lock = await navigator.wakeLock.request("screen");
    lock.addEventListener("release", () => {
      lock = null;
    });
    return lock;
  } catch {
    return null;
  }
}
async function releaseWakeLock() {
  try {
    if (lock) await lock.release();
    lock = null;
  } catch {
  }
}
function SegmentedProgress({ total, current, currentProgress, color }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 4, width: "100%" }, children: Array.from({ length: total }).map((_, i) => {
    const isDone = i < current;
    const isActive = i === current;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          flex: 1,
          height: 6,
          borderRadius: 3,
          background: isDone || isActive ? color : OLIVE_DARK,
          opacity: isActive ? 0.5 + 0.5 * currentProgress : 1,
          transition: "opacity 0.3s linear, background 0.3s ease",
          boxShadow: isDone || isActive ? `0 0 8px ${color}66` : "none"
        }
      },
      i
    );
  }) });
}
let _mediaPromise = null;
function getMediaMap() {
  if (!_mediaPromise)
    _mediaPromise = __vitePreload(() => import("./media-BXv9Yzv2.js"), true ? __vite__mapDeps([0,1]) : void 0, import.meta.url).then((m) => ({ b64: m.VIDEO_B64, files: m.VIDEO_FILES }));
  return _mediaPromise;
}
function ExerciseMedia({ exerciseId, pose, color = BLAZE, size = "100%", rounded = 10 }) {
  const [src, setSrc] = reactExports.useState(null);
  const [videoSrc, setVideoSrc] = reactExports.useState(null);
  const [failed, setFailed] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    setSrc(null);
    setVideoSrc(null);
    setFailed(false);
    getMediaMap().then(({ b64, files }) => {
      if (cancelled) return;
      const clip = files[exerciseId] || files[pose] || null;
      setVideoSrc(clip);
      if (!clip) setSrc(b64[exerciseId] || b64[pose] || null);
    }).catch(() => {
      if (!cancelled) setFailed(true);
    });
    return () => {
      cancelled = true;
    };
  }, [exerciseId]);
  if (videoSrc && !failed)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        src: videoSrc,
        autoPlay: true,
        muted: true,
        loop: true,
        playsInline: true,
        preload: "metadata",
        onError: () => setFailed(true),
        style: {
          width: size,
          height: size,
          objectFit: "cover",
          borderRadius: rounded,
          display: "block",
          background: INK
        }
      }
    );
  if (src && !failed)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src,
        alt: "",
        onError: () => setFailed(true),
        style: {
          width: size,
          height: size,
          objectFit: "cover",
          borderRadius: rounded,
          display: "block",
          background: INK
        }
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseFigure, { pose, color, size });
}
function EqBars({ tone = BLAZE, bars = 5, speed = 1, style }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: { display: "flex", alignItems: "flex-end", gap: 3, height: 14, ...style },
      "aria-hidden": "true",
      children: Array.from({ length: bars }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "o40-eqbar",
          style: {
            width: 3,
            background: tone,
            height: 8,
            animation: `eqPulse ${(0.55 + i % 3 * 0.18) / speed}s ease-in-out ${i * 0.08}s infinite`
          }
        },
        i
      ))
    }
  );
}
function SessionScreen({
  program,
  profile,
  seq,
  phaseIdx,
  secondsLeft,
  paused,
  setPaused,
  soundOn,
  setSoundOn,
  musicOn,
  onToggleMusic,
  aiEnabled,
  onToggleAi,
  vocalMotivation,
  lang: langProp,
  onSkip,
  onPrev,
  onAiPhaseComplete,
  exitConfirm,
  setExitConfirm,
  onExit
}) {
  const { lang: ctxLang, t } = useT();
  const lang = langProp ?? ctxLang;
  const phase = seq[phaseIdx];
  const next = seq[phaseIdx + 1];
  const ex = phase.exerciseId ? EXERCISES[phase.exerciseId] : null;
  const nextEx = next && next.exerciseId ? EXERCISES[next.exerciseId] : null;
  const isRepsWork = phase.type === "work" && phase.mode === "reps";
  const isAiWork = aiEnabled && phase.type === "work" && !!phase.exerciseId;
  const progress = isRepsWork ? 1 : phase.duration ? 1 - secondsLeft / phase.duration : 0;
  const [previewSec, setPreviewSec] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (phase.type !== "work" || !ex) {
      setPreviewSec(null);
      return;
    }
    setPreviewSec(5);
    setPaused(true);
  }, [phaseIdx]);
  reactExports.useEffect(() => {
    if (previewSec === null) return;
    if (previewSec <= 0) {
      setPreviewSec(null);
      setPaused(false);
      if (soundOn) {
        try {
          playBeep(880, 0.15);
        } catch {
        }
        try {
          if (ex) speak(tr(ex.name, lang));
        } catch {
        }
      }
      return;
    }
    const id = setTimeout(() => setPreviewSec((s) => s !== null ? s - 1 : s), 1e3);
    return () => clearTimeout(id);
  }, [previewSec, soundOn, ex, lang, setPaused]);
  function skipPreview() {
    setPreviewSec(null);
    setPaused(false);
  }
  reactExports.useEffect(() => {
    if (soundOn && profile && profile.voiceCountdown && secondsLeft <= 3 && secondsLeft > 0 && phase.type === "work" && !isRepsWork)
      speak(String(secondsLeft), lang, LOCALES);
  }, [secondsLeft, phase.type, soundOn, profile, isRepsWork]);
  reactExports.useEffect(() => {
    if (!soundOn || !vocalMotivation || paused || phase.type !== "work" || previewSec !== null)
      return;
    const duration = phase.duration || (isRepsWork ? 30 : 40);
    if (duration < 12) return;
    const ms = isRepsWork ? 15e3 : Math.round(duration / 2) * 1e3;
    const interval = setInterval(() => {
      if (document.hidden) return;
      try {
        speak(getVocalMotivation(lang), lang, LOCALES);
      } catch {
      }
    }, ms);
    return () => clearInterval(interval);
  }, [soundOn, vocalMotivation, paused, phase.type, phase.duration, isRepsWork, previewSec, lang]);
  reactExports.useEffect(() => {
    if (!(profile == null ? void 0 : profile.tempoEnabled) || paused || phase.type !== "work") return;
    const bpm = Math.max(40, Math.min(60, profile.tempoBpm || 50));
    const ms = Math.round(6e4 / bpm);
    const id = setInterval(() => {
      if (document.hidden) return;
      try {
        playBeep(900, 0.06);
      } catch {
      }
      if ((profile == null ? void 0 : profile.vibrationOn) !== false) try {
        vibrate(12);
      } catch {
      }
    }, ms);
    return () => clearInterval(id);
  }, [profile == null ? void 0 : profile.tempoEnabled, profile == null ? void 0 : profile.tempoBpm, profile == null ? void 0 : profile.vibrationOn, paused, phase.type, phaseIdx]);
  reactExports.useEffect(() => {
    requestWakeLock();
    function onVis() {
      if (!document.hidden) requestWakeLock();
    }
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      releaseWakeLock();
    };
  }, []);
  const phaseLabel = phase.type === "warmup" ? t("ses.warmup") : phase.type === "cooldown" ? t("ses.cooldown") : phase.type === "rest" ? t("ses.rest") : t("ses.round", { r: phase.round, name: tr(ex.name, lang).toUpperCase() });
  const ringColor = phase.type === "rest" ? OLIVE : phase.type === "work" ? BLAZE : KHAKI;
  const doneWork = seq.slice(0, phaseIdx).filter((p) => p.type === "work").length;
  const totalWork = seq.filter((p) => p.type === "work").length;
  const elapsedSec = seq.slice(0, phaseIdx).reduce((a, p) => a + (p.duration || (p.reps ? p.reps * 3 : 0)), 0) + (phase.duration ? phase.duration - secondsLeft : 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-screen-in", style: { flex: 1, display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TopBar,
      {
        title: tr(program.name, lang),
        onBack: () => setExitConfirm(true),
        right: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 2 }, children: [
          musicOn && /* @__PURE__ */ jsxRuntimeExports.jsx(
            EqBars,
            {
              tone: ringColor,
              bars: 4,
              speed: phase.type === "work" ? 1.4 : phase.type === "rest" ? 0.5 : 0.8,
              style: { marginRight: 6, height: 12 }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onToggleAi,
              title: aiEnabled ? "AI Coach ON" : "AI Coach OFF",
              style: {
                ...btnIcon,
                border: `1px solid ${aiEnabled ? BLAZE : "transparent"}`,
                borderRadius: 8,
                background: aiEnabled ? `${BLAZE}22` : "transparent"
              },
              children: aiEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16, color: STEEL })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onToggleMusic, style: btnIcon, "aria-label": t("ses.music"), children: musicOn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { size: 18, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(HeadphoneOff, { size: 18, color: STEEL }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSoundOn(!soundOn), style: btnIcon, children: soundOn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { size: 18, color: PAPER }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { size: 18, color: STEEL }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px 16px 0" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SegmentedProgress,
        {
          total: seq.length,
          current: phaseIdx,
          currentProgress: progress,
          color: ringColor
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: { display: "flex", justifyContent: "space-between", marginTop: 8 },
          className: "o40-mono",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 11 }, children: t("ses.elapsed", { t: formatTime(elapsedSec) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 11 }, children: t("ses.ex", { a: doneWork, b: totalWork }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: 16
        },
        children: previewSec !== null && phase.type === "work" && ex ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, letterSpacing: "0.12em" }, children: t("ses.preview") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 20, textAlign: "center", lineHeight: 1.1 }, children: tr(ex.name, lang).toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "100%", aspectRatio: "9 / 12", maxHeight: 360, background: INK, borderRadius: 14, overflow: "hidden", border: `1px solid ${OLIVE}` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseMedia, { exerciseId: phase.exerciseId, pose: ex.pose, color: BLAZE, size: "100%", rounded: 14 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 12, textAlign: "center" }, children: tr(ex.repGuide, lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: BLAZE, fontSize: 56, lineHeight: 1 }, children: previewSec > 0 ? previewSec : "VIA!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: skipPreview, style: { ...primaryBtn, background: BLAZE, borderRadius: 12, padding: "10px 18px" }, children: [
            t("ses.preview.skip"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 14 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 10, textAlign: "center" }, children: isAiWork ? t("ses.ai.active") : t("ses.preview.hint") })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `o40-mono o40-expand ${phase.type === "work" ? "o40-gradtext" : ""}`,
              style: { color: ringColor, fontSize: 13, letterSpacing: "0.1em" },
              children: phaseLabel
            },
            phaseIdx
          ),
          isAiWork ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", maxWidth: 420 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SessionAIOverlay,
              {
                phase,
                lang,
                levelKey: (profile == null ? void 0 : profile.level) ?? "combattente",
                aiEnabled,
                enableMotionFusion: !!(profile == null ? void 0 : profile.motionFusion),
                onCompletePhase: ({ reps, avgQuality }) => {
                  if (soundOn) playBeep(880);
                  if (vibrate) vibrate([30]);
                  onAiPhaseComplete == null ? void 0 : onAiPhaseComplete({ exerciseId: phase.exerciseId, reps, avgQuality });
                  onSkip();
                },
                onRep: () => {
                }
              },
              `${phase.exerciseId}-${phaseIdx}`
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "o40-mono",
                style: { color: STEEL, fontSize: 9, textAlign: "center", marginTop: 6 },
                children: aiEnabled ? t("ses.ai.active") : ""
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-hud", style: { position: "relative", width: 240, height: 240 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-hud-corner" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-hud-corner bl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    inset: -18,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${ringColor}30 0%, transparent 70%)`,
                    transition: "background 0.3s ease",
                    animation: phase.type === "rest" ? "restBreath 2.4s ease-in-out infinite" : "none"
                  }
                }
              ),
              phase.type === "work" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    inset: -10,
                    borderRadius: "50%",
                    border: `2px solid ${ringColor}44`,
                    animation: "ringPulse 1.5s ease-out infinite"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressRing, { progress, color: ringColor }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  },
                  children: ex ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 150, height: 150 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ExerciseMedia,
                    {
                      exerciseId: phase.exerciseId,
                      pose: ex.pose,
                      color: PAPER,
                      rounded: 14
                    }
                  ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 44 }, children: formatTime(secondsLeft) })
                }
              )
            ] }),
            ex && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center" }, children: isRepsWork ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "o40-display",
                  style: { color: PAPER, fontSize: 48, lineHeight: 1 },
                  children: [
                    "×",
                    phase.reps
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "o40-mono",
                  style: { color: KHAKI, fontSize: 11, letterSpacing: "0.08em" },
                  children: t("ses.reps")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 8, color: BLAZE, fontSize: 11, fontWeight: 600 }, children: t("ses.reps.hint") })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 40 }, children: formatTime(secondsLeft) }) })
          ] }),
          ex && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", maxWidth: 330 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 13 }, children: isRepsWork ? `${phase.reps}× ${tr(ex.name, lang)} — ${tr(ex.repGuide, lang)}` : tr(ex.repGuide, lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  marginTop: 8,
                  textAlign: "left"
                },
                children: ex.steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 7, alignItems: "flex-start" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 10.5, minWidth: 15 }, children: [
                    i + 1,
                    "."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 12, lineHeight: 1.4 }, children: tr(s, lang) })
                ] }, i))
              }
            ),
            ex.breath && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  gap: 7,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 9,
                  color: OLIVE
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { size: 13, style: { flexShrink: 0 } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11.5, fontStyle: "italic", lineHeight: 1.4 }, children: tr(ex.breath, lang) })
                ]
              }
            ),
            ex.tip40 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                  marginTop: 10,
                  textAlign: "left",
                  background: `${KHAKI}10`,
                  border: `1px solid ${KHAKI}44`,
                  borderRadius: 10,
                  padding: "8px 10px"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { size: 14, color: KHAKI, style: { flexShrink: 0, marginTop: 1 } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 11.5, lineHeight: 1.45 }, children: tr(ex.tip40, lang) })
                ]
              }
            )
          ] }),
          phase.type === "rest" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                marginTop: 4
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: OLIVE,
                      opacity: 0.9,
                      animation: "restBreath 3.2s ease-in-out infinite",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { size: 16, color: PAPER })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "o40-mono",
                    style: { color: KHAKI, fontSize: 10, letterSpacing: "0.08em" },
                    children: t("ses.breathe")
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "o40-card-glass",
              style: {
                color: STEEL,
                fontSize: 12,
                marginTop: 6,
                display: "flex",
                alignItems: "center",
                gap: 8,
                borderRadius: 10,
                padding: "7px 12px"
              },
              children: next ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                next.exerciseId && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 26, height: 26, flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ExerciseFigure,
                  {
                    pose: EXERCISES[next.exerciseId].pose,
                    color: KHAKI,
                    size: "100%"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("ses.next", {
                  name: next.type === "work" ? tr(nextEx.name, lang) : next.type === "rest" ? t("ses.next.rest") : t("ses.next.cooldown")
                }) })
              ] }) : t("ses.last")
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          display: "flex",
          gap: 12,
          padding: "10px 20px 8px",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setPaused(!paused),
            style: {
              ...iconCircle,
              width: 74,
              height: 74,
              background: BLAZE,
              animation: paused ? "glowPulse 1.6s ease-in-out infinite" : "none"
            },
            "aria-label": paused ? t("ses.resume") : t("ses.pause"),
            children: paused ? /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 30, color: PAPER }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { size: 30, color: PAPER })
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, padding: "0 20px 20px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onPrev,
          disabled: phaseIdx === 0,
          style: { ...pillBtn, opacity: phaseIdx === 0 ? 0.4 : 1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 15 }),
            " ",
            t("ses.prev")
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onSkip,
          style: {
            ...pillBtn,
            background: isAiWork ? `${OLIVE}88` : isRepsWork ? BLAZE : pillBtn.background,
            color: isAiWork ? KHAKI : isRepsWork ? PAPER : void 0,
            fontWeight: isRepsWork || isAiWork ? 700 : void 0,
            flex: isRepsWork || isAiWork ? 1.6 : 1,
            opacity: isAiWork ? 0.9 : 1
          },
          title: isAiWork ? t("ses.ai.hint") : void 0,
          children: [
            isAiWork ? t("ses.skip") : isRepsWork ? t("ses.reps.done") : t("ses.next"),
            " ",
            isAiWork ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { size: 15 }) : isRepsWork ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { size: 15 })
          ]
        }
      )
    ] }),
    isAiWork && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "o40-mono",
        style: { color: STEEL, fontSize: 9, textAlign: "center", paddingBottom: 8 },
        children: t("ses.ai.autoAdvance")
      }
    ),
    exitConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          position: "absolute",
          inset: 0,
          background: "rgba(27,29,22,0.92)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: 22,
              maxWidth: 320,
              textAlign: "center"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 22, marginBottom: 8 }, children: t("ses.quit.title") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 13, marginBottom: 18 }, children: t("ses.quit.body") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setExitConfirm(false), style: { ...secondaryBtn, flex: 1 }, children: t("ses.quit.continue") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onExit, className: "o40-cta", style: { ...primaryBtn, flex: 1 }, children: t("ses.quit.exit") })
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  SessionScreen as default
};
