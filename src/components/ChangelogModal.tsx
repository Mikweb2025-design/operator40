/**
 * Operator40 — Changelog Modal (v2.7 · AI Fitness Engine)
 * Popup that shows all new features added in this release.
 * - Auto-opens once per version (localStorage o40_changelog_<version>)
 * - Manual open via VersionBadge click
 * - iOS Safari / PWA friendly, military dark theme
 */
import React from 'react';
import { INK, INK_2, PAPER, OLIVE, OLIVE_DARK, KHAKI, BLAZE, BLAZE_DEEP, STEEL } from '../constants/theme.js';
import { Sparkles, X, Zap, Eye, Mic, Timer, Target, Activity, Layers, Cpu, Smartphone } from 'lucide-react';

export const CHANGELOG_VERSION = '2.10.0';
export const CHANGELOG_STORAGE_KEY = `o40_changelog_${CHANGELOG_VERSION}`;

type Lang = 'it' | 'en' | 'de';

interface Props {
  lang?: Lang;
  onClose: () => void;
  onTry?: () => void;
}

const COPY: Record<Lang, any> = {
  it: {
    badge: 'NUOVO v2.10.x',
    title: 'Tracking 2.0 — Fase 1 + 2 (2.10)',
    subtitle: 'v2.10 · 28 Agosto 2026 · Conteggio rep + pose — 100% offline',
    intro: 'Fase 1 (heavy auto + worldLandmarks + MotionFusion) + Fase 2 (buffer 30 frame + classificatore temporale). Fix ai falsi conteggi su squat/pushup/crunch e jitter laterale.',
    groups: [
      {
        icon: '🎯',
        title: '1. Fase 1 — Heavy auto + worldLandmarks',
        items: [
          'PoseLandmarker auto: heavy su device ≥4GB/4core, lite fallback — override localStorage o40_modelVariant',
          'Smoother ricalibrato per heavy (1.05/0.006) + worldLandmarks smoothed per profondità',
          'FitnessEngine usa worldLandmarks per correggere angoli compressi da prospettiva',
        ],
      },
      {
        icon: '📳',
        title: '2. Fase 1 — MotionFusion riabilitato',
        items: [
          'Capacitor Motion per jumpingJack/burpee/ginocchiaAlte/mountainClimber/skater',
          'Boost repConfidence +12 se ritmo IMU 0.8-2.5Hz — secondario, PWA funziona senza',
          'PWA fallback DeviceMotionEvent già coperto',
        ],
      },
      {
        icon: '🧠',
        title: '3. Fase 2 — Classificatore temporale (30 frame)',
        items: [
          'Nuovo src/ai/classifier/: FeatureExtractor + TemporalBuffer + TemporalClassifier',
          'Blend classic*0.55 + temporal*0.45, gate ROM + pattern down-up — evita rep fantasma',
          'Integrato in squat/pushup/crunch/jumpingJack/burpee/affondo',
        ],
      },
      {
        icon: '📐',
        title: '4. Tuning — debounce + soglie',
        items: [
          'squat 340→380ms / 70→90ms, pushup 320→360ms / 65→85ms — meno jitter laterale',
          'Gate 62→58 con validazione temporale — preferisce contare incerto con bassa confidenza',
          'Form cues invariati, solo repConfidence più stabile',
        ],
      },
      {
        icon: '⚡',
        title: '5. Velocità segnale-aware (2.10.x)',
        items: [
          'La velocità ROM (deg/s) ora segue il segnale primario di ogni esercizio (elbowRaw per pushup, ecc.), non più il ginocchio statico',
          'Pushup/crunch: il voto di velocità e il gate temporale usano il ROM giusto → conteggi più sincronizzati col movimento reale',
          'Nuovi test di regressione: buffer 101 → 103 test verdi',
        ],
      },
    ],
    cta: 'PROVA ORA',
    ctaHint: 'Home → Missione → Avvia · verifica su https://mikweb.eu/operator40/ con iPhone frontale',
    dismiss: 'Non mostrare più',
    close: 'Chiudi',
    footer: 'Tutto on-device (IndexedDB, MediaPipe mai su server). Per replay: ◯ REC durante sessione → ↓ JSON → test analyzer. Docs in src/ai/classifier/',
  },
  en: {
    badge: 'NEW v2.10.x',
    title: 'Tracking 2.0 — Phase 1 + 2 (2.10)',
    subtitle: 'v2.10 · Aug 28 2026 · Rep counting + pose — 100% offline',
    intro: 'Phase 1 (heavy auto + worldLandmarks + MotionFusion) + Phase 2 (30-frame temporal classifier). Fixes false counts on squat/pushup/crunch and side-view jitter.',
    groups: [
      {
        icon: '🎯',
        title: '1. Phase 1 — Heavy auto + worldLandmarks',
        items: [
          'Auto PoseLandmarker: heavy on device ≥4GB/4core, lite fallback — override via localStorage o40_modelVariant',
          'Smoother recalibrated for heavy (1.05/0.006) + smoothed worldLandmarks for depth',
          'FitnessEngine uses worldLandmarks to correct perspective-compressed angles',
        ],
      },
      {
        icon: '📳',
        title: '2. Phase 1 — MotionFusion re-enabled',
        items: [
          'Capacitor Motion for jumpingJack/burpee/highKnees/mountainClimber/skater',
          '+12 repConfidence boost if IMU rhythm 0.8-2.5Hz — secondary, PWA works without it',
          'PWA DeviceMotionEvent fallback already covered',
        ],
      },
      {
        icon: '🧠',
        title: '3. Phase 2 — Temporal classifier (30 frames)',
        items: [
          'New src/ai/classifier/: FeatureExtractor + TemporalBuffer + TemporalClassifier',
          'Blend classic*0.55 + temporal*0.45, ROM gate + down-up pattern — avoids phantom reps',
          'Wired into squat/pushup/crunch/jumpingJack/burpee/affondo',
        ],
      },
      {
        icon: '📐',
        title: '4. Tuning — debounce + thresholds',
        items: [
          'squat 340→380ms / 70→90ms, pushup 320→360ms / 65→85ms — less side jitter',
          'Gate 62→58 with temporal validation — prefers counting with low confidence over missing',
          'Form cues unchanged, only more stable repConfidence',
        ],
      },
      {
        icon: '⚡',
        title: '5. Signal-aware velocity (2.10.x)',
        items: [
          'ROM velocity (deg/s) now follows each exercise primary signal (elbowRaw for pushup, etc.), no longer the static knee',
          'Pushup/crunch: velocity score + temporal gate use the right ROM → counts stay in sync with the real movement',
          'New regression tests: buffer suite 101 → 103 green',
        ],
      },
    ],
    cta: 'TRY IT',
    ctaHint: 'Home → Mission → Start · https://mikweb.eu/operator40/',
    dismiss: "Don't show again",
    close: 'Close',
    footer: 'Everything on-device. For replay: ◯ REC → ↓ JSON → analyzer test.',
  },
  de: {
    badge: 'NEU v2.10.x',
    title: 'Tracking 2.0 — Phase 1 + 2 (2.10)',
    subtitle: 'v2.10 · 28. Aug 2026 · Rep-Zählung + Pose — 100% offline',
    intro: 'Phase 1 (heavy auto + worldLandmarks + MotionFusion) + Phase 2 (30-Frame Temporal Classifier). Behebt Fehlzählungen bei squat/pushup/crunch und Seitansicht-Jitter.',
    groups: [
      {
        icon: '🎯',
        title: '1. Phase 1 — Heavy auto + worldLandmarks',
        items: [
          'Auto PoseLandmarker: heavy auf Gerät ≥4GB/4core, lite Fallback — Override via localStorage o40_modelVariant',
          'Smoother neu kalibriert für heavy (1.05/0.006) + geglättete worldLandmarks für Tiefe',
          'FitnessEngine nutzt worldLandmarks zur Korrektur perspektivisch komprimierter Winkel',
        ],
      },
      {
        icon: '📳',
        title: '2. Phase 1 — MotionFusion reaktiviert',
        items: [
          'Capacitor Motion für jumpingJack/burpee/highKnees/mountainClimber/skater',
          '+12 repConfidence-Boost bei IMU-Rhythmus 0.8-2.5Hz — sekundär, PWA funktioniert auch ohne',
          'PWA DeviceMotionEvent-Fallback vorhanden',
        ],
      },
      {
        icon: '🧠',
        title: '3. Phase 2 — Temporal Classifier (30 Frames)',
        items: [
          'Neu src/ai/classifier/: FeatureExtractor + TemporalBuffer + TemporalClassifier',
          'Blend classic*0.55 + temporal*0.45, ROM-Gate + down-up-Muster — verhindert Phantom-Reps',
          'Eingebunden in squat/pushup/crunch/jumpingJack/burpee/affondo',
        ],
      },
      {
        icon: '📐',
        title: '4. Tuning — Debounce + Schwellen',
        items: [
          'squat 340→380ms / 70→90ms, pushup 320→360ms / 65→85ms — weniger seitliche Jitter',
          'Gate 62→58 mit temporaler Validierung — zählt lieber unsicher als verpasst',
          'Form-Cues unverändert, nur stabilere repConfidence',
        ],
      },
      {
        icon: '⚡',
        title: '5. Signal-abhängige Geschwindigkeit (2.10.x)',
        items: [
          'ROM-Geschwindigkeit (deg/s) folgt nun dem primären Signal jeder Übung (elbowRaw für pushup etc.), nicht mehr dem statischen Knie',
          'Pushup/crunch: Geschwindigkeits-Score + temporal Gate nutzen das richtige ROM → Zählungen im Einklang mit der echten Bewegung',
          'Neue Regressionstests: Buffer-Suite 101 → 103 grün',
        ],
      },
    ],
    cta: 'TESTEN',
    ctaHint: 'Home → Mission → Start',
    dismiss: 'Nicht mehr anzeigen',
    close: 'Schließen',
    footer: 'Alles on-device. Für Replay: ◯ REC → ↓ JSON → analyzer test.',
  },
};

export default function ChangelogModal({ lang = 'it', onClose, onTry }: Props) {
  const l = (['it', 'en', 'de'].includes(lang) ? lang : 'it') as Lang;
  const c = COPY[l];

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') handleClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function handleDismissForever() {
    try { localStorage.setItem(CHANGELOG_STORAGE_KEY, 'dismissed'); } catch {}
    onClose();
  }
  function handleClose() {
    try { localStorage.setItem(CHANGELOG_STORAGE_KEY, 'seen'); } catch {}
    onClose();
  }

  return (
    <div
      className="o40-changelog-mask"
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(5,6,8,0.78)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(560px, 96vw)', maxHeight: '90vh', overflow: 'hidden',
          background: `linear-gradient(180deg, ${INK_2} 0%, ${INK} 100%)`,
          border: `1px solid ${OLIVE}`, borderRadius: 18,
          boxShadow: '0 20px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(193,68,14,0.14) inset',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* header */}
        <div style={{ padding: '18px 18px 12px', borderBottom: `1px solid ${OLIVE}33`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.08, background: `repeating-linear-gradient(90deg, ${OLIVE} 0 1px, transparent 1px 14px)` }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, display: 'grid', placeItems: 'center', boxShadow: `0 6px 18px ${BLAZE}66`, flexShrink: 0 }}>
                <Sparkles size={22} color={PAPER} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="o40-mono" style={{ background: BLAZE, color: PAPER, fontSize: 9, fontWeight: 800, letterSpacing: '0.08em', padding: '2px 6px', borderRadius: 6 }}>{c.badge}</span>
                  <span className="o40-mono" style={{ color: STEEL, fontSize: 10 }}>{CHANGELOG_VERSION} · AI ENGINE</span>
                </div>
                <div className="o40-display" style={{ color: PAPER, fontSize: 22, lineHeight: 1, marginTop: 4 }}>{c.title}</div>
                <div className="o40-mono" style={{ color: KHAKI, fontSize: 10, letterSpacing: '0.06em', marginTop: 2 }}>{c.subtitle}</div>
              </div>
            </div>
            <button onClick={handleClose} aria-label="Close" style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${OLIVE}`, background: INK, color: STEEL, display: 'grid', placeItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <X size={16} />
            </button>
          </div>
          <div style={{ position: 'relative', marginTop: 10, color: KHAKI, fontSize: 12.5, lineHeight: 1.5, background: `${INK}AA`, border: `1px solid ${OLIVE}44`, borderRadius: 10, padding: '8px 10px' }}>
            {c.intro}
          </div>
        </div>

        {/* scrollable body */}
        <div style={{ overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {c.groups.map((g: any, i: number) => (
            <div key={i} style={{ background: INK, border: `1px solid ${OLIVE}55`, borderRadius: 12, padding: '12px 12px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 18, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>{g.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="o40-mono" style={{ color: PAPER, fontSize: 11, fontWeight: 700, letterSpacing: '0.04em' }}>{g.title}</div>
                <ul style={{ margin: '6px 0 0', paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {g.items.map((it: string, j: number) => (
                    <li key={j} style={{ color: KHAKI, fontSize: 11.5, lineHeight: 1.45 }}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div style={{ background: `${BLAZE}12`, border: `1px dashed ${BLAZE}55`, borderRadius: 10, padding: '10px 12px', color: STEEL, fontSize: 10.5, lineHeight: 1.4 }}>
            {c.footer}
          </div>
        </div>

        {/* footer CTAs */}
        <div style={{ padding: '12px 14px', borderTop: `1px solid ${OLIVE}33`, background: INK_2, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => { handleClose(); if (onTry) setTimeout(onTry, 150); }}
              style={{
                flex: 1, background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, color: PAPER, border: 'none', borderRadius: 12,
                padding: '12px 14px', fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: '0.06em', cursor: 'pointer',
                boxShadow: `0 6px 18px ${BLAZE}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <Zap size={16} /> {c.cta} <span style={{ opacity: 0.9 }}>→</span>
            </button>
          </div>
          <div className="o40-mono" style={{ color: STEEL, fontSize: 9, textAlign: 'center' }}>{c.ctaHint}</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button onClick={handleDismissForever} style={{ background: 'transparent', border: `1px solid ${OLIVE}`, color: STEEL, borderRadius: 20, padding: '6px 12px', fontSize: 11, cursor: 'pointer' }}>
              {c.dismiss}
            </button>
            <button onClick={handleClose} style={{ background: INK, border: `1px solid ${OLIVE}`, color: KHAKI, borderRadius: 20, padding: '6px 14px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
              {c.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
