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

export const CHANGELOG_VERSION = '2.14.1';
export const CHANGELOG_STORAGE_KEY = `o40_changelog_${CHANGELOG_VERSION}`;

type Lang = 'it' | 'en' | 'de';

interface Props {
  lang?: Lang;
  onClose: () => void;
  onTry?: () => void;
}

const COPY: Record<Lang, any> = {
  it: {
    badge: 'NUOVO v2.14.1',
    title: 'Statistiche — Grafica Premium (v2.14.1)',
    subtitle: 'v2.14.1 · 28 Agosto 2026 · DogTag accent + chart gradient + heatmap',
    intro: 'Batch statistiche: DogTag accent, PR glass, Bar gradient + tooltip blur, heatmap 6px glow, calendar 8px.',
    groups: [
      {
        icon: '🌑',
        title: '1-2. OLED Depth + Card System',
        items: [
          'INK #0E100D vignette + radial gradient 130% — phone più profondo, camo 5px',
          'o40-card unificato: linear 165° + hairline rgba(184,174,140,0.14) + gloss 07→22',
          'o40-card-face hairline top 1px + accent 3px, numeri tabular-nums glow',
        ],
      },
      {
        icon: '🔥',
        title: '3-4. Tipografia + CTA Blaze Light',
        items: [
          'Bebas + Inter sharpened, num-glow drop-shadow + on-state BLAZE 66 halo',
          'primaryBtn / o40-cta: BLAZE_LIGHT→BLAZE→DEEP + inset highlight + press 0.97',
          'primaryBtnLarge shadow 10/28, iconCircle border OLIVE_LIGHT 55',
        ],
      },
      {
        icon: '🧭',
        title: '5-6. Nav OLED + HUD Tactical',
        items: [
          'TopBar/BottomNav glass blur 14px, #0E100D 92-94%, shadow -8px 24px',
          'BottomNav pill 46×28 con top underline + bottom line BLAZE glow',
          'HUD 4 angoli + AI stage scanline 0.62 + inset 70px blur',
        ],
      },
      {
        icon: '✨',
        title: '7-8. Micro + Skeleton',
        items: [
          'screenIn 0.5s, card stagger 20/60/100ms, ticker 28s, ringSpin 5s',
          'Skeleton 20-50-80% gradient 1.4s, loadbar 5px, toast 0.3s spring',
          'Hover lift -3px 16/36px shadow (desktop), active 0.985',
        ],
      },
      {
        icon: '🎨',
        title: '9-10. Aura & Coesione',
        items: [
          'Aura 28s + phone::after vignette 62-100%, grid 0.42, embers 0.9',
          'Tokens nuovi: INK_3 #121410, PAPER_SOFT, OLIVE_LIGHT, KHAKI_LIGHT, BLAZE_LIGHT',
          'Tracking 2.0 invariato (103 test) + push/voice fix 2.10.x inclusi',
        ],
      },
      {
        icon: '💎',
        title: '11-13. Extra 3 Loop (v2.11.1)',
        items: [
          'Hero o40-ring-border shadow 12/36 + embers brightness 1.08',
          'Card-face shadow 5/18 + accent glow 45%, ticker 48px gap + glass blur 15px',
          'Fix white-screen BLAZE_LIGHT import — #root ora renderizza',
        ],
      },
      {
        icon: '🚀',
        title: '14-23. Full-App 10 Loop (v2.12)',
        items: [
          'Color OLED #0B0D0A 135% + card radius 16 + selected BLAZE glow',
          'Typo display 0.06em + mono tnum, icon halo, nav pill safe-area',
          'Hero overlay, HUD timer glow, recharts dark tooltip, input focus 3px + cohesion easing',
        ],
      },
      {
        icon: '♿',
        title: '24-27. Roadmap Batch (v2.12.1)',
        items: [
          'A11y focus-visible + aria-live reps + prefers-reduced-motion + print',
          'Library debounce 180ms + highlight BLAZE33 + empty 🔍 + LargeText fix',
          'CSV ai_quality/ai_reps + QR 72px share + ROADMAP docs',
        ],
      },
      {
        icon: '📳',
        title: '28-29. IMU + BeforeAfter (v2.12.2)',
        items: [
          'MotionFusion opt-in (IMU) per jumpingJack/burpee/skater — toggle in Impostazioni',
          'BeforeAfter pinch-zoom 1-3× + wheel + double-tap + haptics sul confronto',
          'Engine enableMotionFusion flag + wiring SessionAIOverlay/FitnessEngineView',
        ],
      },
      {
        icon: '❤️',
        title: '30-32. HR + NEFFEX + PWA (v2.12.3)',
        items: [
          'Apple Health HR avg last 20 records + toast HR bpm',
          'NEFFEX crossfade 1.2s + shuffle seed giornaliero deterministico',
          'PWA install banner solo dopo 2 sessioni + dismissed flag',
        ],
      },
      {
        icon: '🎓',
        title: '33-34. Onboarding + Clip (v2.13)',
        items: [
          'Onboarding 3 step con dots, Avanti/Salta, tourStep state',
          'Clip alias: plank→wallsit, jumpingjack→burpee, mountain→skater, affondo→squat',
          'Offline models check + hasClip fallback polish',
        ],
      },
      {
        icon: '🏕️',
        title: '35-37. Camp 2.0 + TEMPO + Coach (v2.14)',
        items: [
          'Camp 2.0: recovery ogni 7 (D) + deload week 22-28 (D/K/H/I)',
          'TEMPO metronomo 40-60 BPM con toggle + slider in Impostazioni',
          'Coach 2.0: TTS cue form<60 via SpeechCoach ogni 4s',
        ],
      },
      {
        icon: '📊',
        title: '38-40. Statistiche Premium (v2.14.1)',
        items: [
          'Hero DogTag accent + PR glass 16px con icone Flame/Crown/Ruler',
          'Bar kcal gradient + tooltip blur + monthly trend 6px glow',
          'Heatmap 6px + year 4px + calendar 8px con border/shadow',
        ],
      },
    ],
    cta: 'PROVA ORA',
    ctaHint: 'Home → Missione → Avvia · https://mikweb.eu/operator40/ — PWA + iOS',
    dismiss: 'Non mostrare più',
    close: 'Chiudi',
    footer: 'Tutto on-device. 40 iterazioni. Prossimo: v2.15 Social + Watch.',
  },
  en: {
    badge: 'NEW v2.14.1',
    title: 'Statistics — Premium Graphics (v2.14.1)',
    subtitle: 'v2.14.1 · Aug 28 2026 · DogTag accent + chart gradient + heatmap',
    intro: 'Statistics batch: DogTag accent, PR glass, Bar gradient + tooltip blur, heatmap 6px glow, calendar 8px.',
    groups: [
      { icon: '🌑', title: '1-2. OLED Depth + Card', items: ['INK #0E100D vignette + 130% radial — deeper phone, 5px camo', 'Unified card 165° + hairline + gloss', 'Card-face hairline + accent + tabular glow'] },
      { icon: '🔥', title: '3-4. Typography + CTA', items: ['Bebas/Inter sharpened, num-glow halo', 'CTA BLAZE_LIGHT→DEEP + inset highlight', 'Large btn shadow 10/28'] },
      { icon: '🧭', title: '5-6. Nav + HUD', items: ['Top/bottom glass blur 14px, OLED #0E100D', 'Pill 46×28 + BLAZE glow lines', 'HUD 4 corners + AI scanline 0.62'] },
      { icon: '✨', title: '7-8. Micro + Skeleton', items: ['screenIn 0.5s, card stagger, ticker 28s', 'Skeleton 1.4s, loadbar 5px', 'Hover -3px lift'] },
      { icon: '🎨', title: '9-10. Aura & Cohesion', items: ['Aura 28s + vignette, grid 0.42', 'New tokens INK_3, PAPER_SOFT, etc.', 'Tracking 103 tests intact'] },
      { icon: '💎', title: '11-13. Extra 3 Loops', items: ['Hero shadow 12/36 + embers 1.08', 'Card-face 5/18 + accent glow', 'White-screen fix — root now renders'] },
      { icon: '🚀', title: '14-23. Full-App 10 Loops', items: ['Color OLED #0B0D0A + card 16 + selected glow', 'Typo + icon halo + nav pill', 'HUD timer + viz tooltip + focus + cohesion'] },
      { icon: '♿', title: '24-27. Roadmap Batch', items: ['Focus-visible + aria-live reps + prefers-motion + print', 'Library debounce 180ms + highlight + empty + LargeText', 'CSV ai_quality/ai_reps + QR 72px share'] },
      { icon: '📳', title: '28-29. IMU + BeforeAfter', items: ['MotionFusion opt-in for jumpingJack/burpee', 'BeforeAfter pinch-zoom 1-3x + haptics', 'Engine enableMotionFusion wiring'] },
      { icon: '❤️', title: '30-32. HR + NEFFEX + PWA', items: ['Health HR avg last 20 + toast', 'NEFFEX crossfade 1.2s + daily seed', 'PWA banner after 2 sessions'] },
      { icon: '🎓', title: '33-34. Onboarding + Clip', items: ['Onboarding 3 step with dots, Skip/Next', 'Clip alias for 4 missing (plank/jack/mountain/affondo)', 'Offline models check'] },
      { icon: '🏕️', title: '35-37. Camp + TEMPO + Coach', items: ['Camp 2.0 recovery every 7 + deload week', 'TEMPO metronome 40-60 BPM + toggle', 'Coach 2.0 TTS cue form<60'] },
      { icon: '📊', title: '38-40. Statistics Premium', items: ['Hero DogTag accent + PR glass 16px', 'Bar gradient + tooltip blur + monthly 6px', 'Heatmap 6px + year 4px + calendar 8px'] },
    ],
    cta: 'TRY IT',
    ctaHint: 'Home → Mission → Start · https://mikweb.eu/operator40/',
    dismiss: "Don't show again",
    close: 'Close',
    footer: 'On-device. 40 iterations. Next: v2.15 Social + Watch.',
  },
  de: {
    badge: 'NEU v2.14.1',
    title: 'Statistiken — Premium Grafik (v2.14.1)',
    subtitle: 'v2.14.1 · 28. Aug 2026 · DogTag Akzent + Chart Verlauf + Heatmap',
    intro: 'Statistiken Batch: DogTag Akzent, PR Glas, Bar Verlauf + Tooltip Blur, Heatmap 6px Glow.',
    groups: [
      { icon: '🌑', title: '1-2. OLED + Card', items: ['INK #0E100D Vignette', 'Unified Card + Hairline + Gloss', 'Tabular Glow'] },
      { icon: '🔥', title: '3-4. Typo + CTA', items: ['Bebas/Inter sharpened', 'CTA Blaze Light + Inset', 'Large shadow'] },
      { icon: '🧭', title: '5-6. Nav + HUD', items: ['Glass blur 14px', 'Pill 46×28', 'HUD 4 Ecken + Scanline'] },
      { icon: '✨', title: '7-8. Micro + Skeleton', items: ['Stagger 20/60/100ms', 'Skeleton 1.4s', 'Hover -3px'] },
      { icon: '🎨', title: '9-10. Aura', items: ['Aura 28s + Vignette', 'Neue Tokens', '103 Tests grün'] },
      { icon: '💎', title: '11-13. Extra', items: ['Hero 12/36 + embers', 'Card 5/18 + glow', 'White-screen fix'] },
      { icon: '🚀', title: '14-23. Full-App', items: ['Color #0B0D0A + card 16', 'Typo + icon + nav', 'HUD + viz + forms + cohesion'] },
      { icon: '♿', title: '24-27. Roadmap', items: ['Focus + aria-live + reduced-motion + print', 'Debounce + highlight + empty + LargeText', 'CSV aiQuality + QR'] },
      { icon: '📳', title: '28-29. IMU + BeforeAfter', items: ['MotionFusion opt-in', 'BeforeAfter pinch-zoom + haptics', 'Engine wiring'] },
      { icon: '❤️', title: '30-32. HR + NEFFEX + PWA', items: ['Health HR avg + toast', 'NEFFEX crossfade 1.2s + seed', 'PWA nach 2 Sessions'] },
      { icon: '🎓', title: '33-34. Onboarding + Clip', items: ['Onboarding 3 Step mit Dots', 'Clip Alias für 4 fehlende', 'Offline Check'] },
      { icon: '🏕️', title: '35-37. Camp + TEMPO + Coach', items: ['Camp 2.0 Recovery alle 7 + Deload Woche', 'TEMPO Metronom 40-60 BPM', 'Coach 2.0 TTS bei form<60'] },
    ],
    cta: 'TESTEN',
    ctaHint: 'Home → Mission → Start',
    dismiss: 'Nicht mehr anzeigen',
    close: 'Schließen',
    footer: 'On-device. 37 Iterationen. Next: v2.15.',
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
