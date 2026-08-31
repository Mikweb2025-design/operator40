import React, { useState } from 'react';
import { useT } from '../context/LangContext.jsx';
import { parseHuaweiHealthExport } from '../utils/huawei.js';
import { connectHuaweiWatch, isBluetoothAvailable } from '../utils/huaweiWatch.js';
import { getLevel, INTERVAL_PRESETS, LEVELS } from '../data/programs.js';
import { TRACKS } from '../music.js';
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
} from '../constants/theme.js';
import { LANGS, tr } from '../i18n.js';
import TopBar from '../components/layout/TopBar.jsx';
import {
  Volume2,
  VolumeX,
  Vibrate,
  SkipForward,
  Music,
  Music2,
  HeadphoneOff,
  Check,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Bell,
  BellOff,
  Send,
  HeartPulse,
  Crown,
  Medal,
  Activity,
  Timer,
  ChevronRight as ChevronRightIcon,
  Download,
  Upload,
  Sparkles,
} from 'lucide-react';
import { isStandalonePWA } from '../utils/push.js';
import {
  inputStyle,
  primaryBtnLarge as primaryBtn,
  secondaryBtn,
} from '../components/ui/styles.js';

function ToggleRow({ label, icon: Icon, on, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 8px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
        <Icon size={18} color={on ? BLAZE : STEEL} style={{ flexShrink: 0 }} />
        <span style={{ color: PAPER, fontSize: 13.5, lineHeight: 1.3 }}>{label}</span>
      </div>
      <div
        style={{
          width: 40,
          height: 22,
          borderRadius: 11,
          background: on ? BLAZE : OLIVE_DARK,
          position: 'relative',
          transition: 'background 0.2s',
          flexShrink: 0,
          marginLeft: 10,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: on ? 20 : 2,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: PAPER,
            transition: 'left 0.2s',
          }}
        />
      </div>
    </button>
  );
}
function Field({ label, children }) {
  return (
    <div>
      <div
        className="o40-mono"
        style={{
          color: KHAKI,
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

/**
 * SetupScreen — estratto da App.jsx:1371 (~305 righe)
 * Props: tutti i form + toggles + push/music/level (controlled via App.jsx)
 */
export default function SetupScreen({
  formName,
  setFormName,
  formAge,
  setFormAge,
  formWeight,
  setFormWeight,
  formWaist,
  setFormWaist,
  formHeight,
  setFormHeight,
  formCustomWork,
  setFormCustomWork,
  formCustomRest,
  setFormCustomRest,
  reminderHour,
  setReminderHour,
  reminderMinute,
  setReminderMinute,
  onSave,
  canCancel,
  onCancel,
  soundOn,
  onToggleSound,
  vibrationOn,
  onToggleVibration,
  musicOn,
  onToggleMusic,
  musicTrack,
  onSelectTrack,
  musicVolume,
  onChangeMusicVolume,
  musicAutoPlay,
  onToggleAutoPlay,
  musicShuffle,
  onToggleShuffle,
  onNextTrack,
  onPrevTrack,
  skipWarmup,
  onToggleSkipWarmup,
  voiceCountdown,
  onToggleVoiceCountdown,
  vocalMotivation,
  onToggleVocalMotivation,
  motionFusion,
  onToggleMotionFusion,
  tempoEnabled,
  onToggleTempo,
  tempoBpm,
  onSetTempoBpm,
  level,
  onSetLevel,
  intervalPreset,
  onSetIntervalPreset,
  executionMode,
  onSetExecutionMode,
  onImportHealth,
  healthImportStatus,
  healthWeightSuggestion,
  onApplyHealthWeight,
  showToast,
  largeText,
  setLargeText,
  pushEnabled,
  pushSupported,
  pushBusy,
  onTogglePush,
  onTestPush,
  onExportBackup,
  onImportBackup,
}) {
  const { lang, t, setLang } = useT();
  const curLevel = getLevel(level || 'combattente');
  const [huaweiStatus, setHuaweiStatus] = useState('idle');
  const [huaweiWatchStatus, setHuaweiWatchStatus] = useState('idle');
  const [huaweiWatchHr, setHuaweiWatchHr] = useState(null);
  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar title={t('setup.title')} onBack={canCancel ? onCancel : null} />
      <div
        className="o40-scroll"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                flex: 1,
                padding: '9px 0',
                borderRadius: 10,
                cursor: 'pointer',
                textAlign: 'center',
                background: lang === l ? OLIVE_DARK : INK,
                border: `1px solid ${lang === l ? BLAZE : OLIVE}`,
                color: lang === l ? BLAZE : KHAKI,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              {l === 'it' ? 'ITALIANO' : l === 'en' ? 'ENGLISH' : 'DEUTSCH'}
            </button>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: INK_2,
            border: `1px solid ${OLIVE}`,
            borderRadius: 10,
            padding: '8px 12px',
          }}
        >
          <span
            className="o40-mono"
            style={{ color: KHAKI, fontSize: 10, letterSpacing: '0.06em' }}
          >
            A11Y · Testo grande
          </span>
          <button
            onClick={() => setLargeText((v) => !v)}
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              border: `1px solid ${largeText ? BLAZE : OLIVE}`,
              background: largeText ? `${BLAZE}22` : 'transparent',
              color: largeText ? BLAZE : STEEL,
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {largeText ? 'A Grande ✓' : 'A Normale'}
          </button>
        </div>
        <p
          style={{ color: STEEL, fontSize: 14, lineHeight: 1.5 }}
          dangerouslySetInnerHTML={{ __html: t('setup.intro') }}
        />
        <Field label={t('setup.name')}>
          <input
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder={t('setup.name.ph')}
            className="o40-input"
            style={inputStyle}
          />
        </Field>
        <Field label={t('setup.age')}>
          <input
            value={formAge}
            onChange={(e) => setFormAge(e.target.value.replace(/\D/g, ''))}
            inputMode="numeric"
            placeholder="40"
            className="o40-input"
            style={inputStyle}
          />
        </Field>
        <Field label={t('setup.weight')}>
          <input
            value={formWeight}
            onChange={(e) => setFormWeight(e.target.value.replace(/\D/g, ''))}
            inputMode="numeric"
            placeholder="82"
            className="o40-input"
            style={inputStyle}
          />
        </Field>
        <Field label={t('setup.waist')}>
          <input
            value={formWaist}
            onChange={(e) => setFormWaist(e.target.value.replace(/\D/g, ''))}
            inputMode="numeric"
            placeholder={t('setup.waist.ph')}
            className="o40-input"
            style={inputStyle}
          />
        </Field>
        <Field label={t('setup.height')}>
          <input
            value={formHeight}
            onChange={(e) => setFormHeight(e.target.value.replace(/\D/g, ''))}
            inputMode="numeric"
            placeholder={t('setup.height.ph')}
            className="o40-input"
            style={inputStyle}
          />
        </Field>

        {canCancel && (
          <div
            style={{
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: 4,
            }}
          >
            <ToggleRow
              label={t('setup.sounds')}
              icon={soundOn ? Volume2 : VolumeX}
              on={soundOn}
              onClick={onToggleSound}
            />
            <div style={{ height: 1, background: OLIVE_DARK, margin: '0 12px' }} />
            <ToggleRow
              label={t('setup.vibration')}
              icon={Vibrate}
              on={vibrationOn}
              onClick={onToggleVibration}
            />
            <div style={{ height: 1, background: OLIVE_DARK, margin: '0 12px' }} />
            <ToggleRow
              label={t('setup.skip')}
              icon={SkipForward}
              on={skipWarmup}
              onClick={onToggleSkipWarmup}
            />
            <div style={{ height: 1, background: OLIVE_DARK, margin: '0 12px' }} />
            <ToggleRow
              label={
                lang === 'it'
                  ? 'Conto vocale'
                  : lang === 'de'
                    ? 'Sprach-Countdown'
                    : 'Voice countdown'
              }
              icon={Music}
              on={voiceCountdown}
              onClick={onToggleVoiceCountdown}
            />
            <div style={{ height: 1, background: OLIVE_DARK, margin: '0 12px' }} />
            <ToggleRow
              label={
                lang === 'it'
                  ? 'Motivazioni vocali'
                  : lang === 'de'
                    ? 'Sprach-Motivation'
                    : 'Voice motivation'
              }
              icon={Sparkles}
              on={vocalMotivation}
              onClick={onToggleVocalMotivation}
            />
            <div style={{ height: 1, background: OLIVE_DARK, margin: '0 12px' }} />
            <ToggleRow
              label={
                lang === 'it'
                  ? 'IMU Motion — jumpingJack/burpee'
                  : lang === 'de'
                    ? 'IMU Motion — jumpingJack/burpee'
                    : 'IMU Motion — jumpingJack/burpee'
              }
              icon={Activity}
              on={motionFusion}
              onClick={onToggleMotionFusion}
            />
            <div style={{ height: 1, background: OLIVE_DARK, margin: '0 12px' }} />
            <ToggleRow
              label={lang==='it' ? `TEMPO metronomo ${tempoBpm} BPM` : `TEMPO metronome ${tempoBpm} BPM`}
              icon={Timer}
              on={tempoEnabled}
              onClick={onToggleTempo}
            />
            {tempoEnabled && (
              <div style={{ padding: '6px 12px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="o40-mono" style={{ color: STEEL, fontSize: 11 }}>40</span>
                <input type="range" min={40} max={60} value={tempoBpm} onChange={(e)=> onSetTempoBpm(e.target.value)} style={{ flex: 1, accentColor: BLAZE }} />
                <span className="o40-mono" style={{ color: BLAZE, fontSize: 11 }}>{tempoBpm} BPM</span>
              </div>
            )}
          </div>
        )}

        {canCancel && (
          <div
            className="o40-sheen"
            style={{
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: 4,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <ToggleRow
              label={t('setup.music')}
              icon={musicOn ? Music2 : HeadphoneOff}
              on={musicOn}
              onClick={onToggleMusic}
            />
            {musicOn && (
              <div style={{ padding: '8px 10px 12px' }}>
                <div
                  style={{
                    background: INK,
                    border: `1px solid ${OLIVE}`,
                    borderRadius: 10,
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <button
                    onClick={onPrevTrack}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: OLIVE_DARK,
                      border: `1px solid ${OLIVE}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    aria-label="Prev"
                  >
                    <ChevronLeft size={16} color={KHAKI} />
                  </button>
                  <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
                    <div
                      className="o40-mono"
                      style={{ color: BLAZE, fontSize: 9, letterSpacing: '0.08em' }}
                    >
                      {musicAutoPlay
                        ? musicShuffle
                          ? 'SHUFFLE • AUTOPLAY'
                          : 'AUTOPLAY • TUTTE'
                        : 'SINGOLA'}
                    </div>
                    <div
                      style={{
                        color: PAPER,
                        fontSize: 12,
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {(TRACKS.find((t) => t.id === musicTrack) || TRACKS[0]).name}
                    </div>
                    <div style={{ color: STEEL, fontSize: 10 }}>
                      {(TRACKS.find((t) => t.id === musicTrack) || TRACKS[0]).artist}
                    </div>
                  </div>
                  <button
                    onClick={onNextTrack}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: BLAZE,
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    aria-label="Next"
                  >
                    <SkipForward size={16} color={PAPER} />
                  </button>
                </div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                  <button
                    onClick={onToggleAutoPlay}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      padding: '7px 8px',
                      borderRadius: 8,
                      border: `1px solid ${musicAutoPlay ? BLAZE : OLIVE}`,
                      background: musicAutoPlay ? `${BLAZE}22` : 'transparent',
                      color: musicAutoPlay ? BLAZE : STEEL,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <RefreshCw size={12} /> {musicAutoPlay ? 'Auto • Tutte' : 'Singola'}
                  </button>
                  <button
                    onClick={onToggleShuffle}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      padding: '7px 8px',
                      borderRadius: 8,
                      border: `1px solid ${musicShuffle ? BLAZE : OLIVE}`,
                      background: musicShuffle ? `${BLAZE}22` : 'transparent',
                      color: musicShuffle ? BLAZE : STEEL,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <RefreshCw
                      size={12}
                      style={{ transform: musicShuffle ? 'rotate(180deg)' : 'none' }}
                    />{' '}
                    {musicShuffle ? 'Shuffle ON' : 'Shuffle OFF'}
                  </button>
                </div>
                <div
                  style={{
                    color: STEEL,
                    fontSize: 11.5,
                    marginBottom: 8,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{t('setup.music.pick')}</span>
                  <span style={{ color: KHAKI, fontSize: 10 }}>
                    {TRACKS.length} brani • {musicAutoPlay ? 'auto' : 'loop singolo'}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    maxHeight: 220,
                    overflowY: 'auto',
                  }}
                >
                  {TRACKS.map((track) => {
                    const on = musicTrack === track.id;
                    return (
                      <button
                        key={track.id}
                        onClick={() => onSelectTrack(track.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '9px 12px',
                          borderRadius: 10,
                          cursor: 'pointer',
                          textAlign: 'left',
                          background: on ? OLIVE_DARK : INK,
                          border: `1px solid ${on ? BLAZE : OLIVE}`,
                        }}
                      >
                        {on ? (
                          <Music2 size={15} color={BLAZE} />
                        ) : (
                          <Music size={15} color={STEEL} />
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span className="o40-mono" style={{ color: PAPER, fontSize: 12 }}>
                              {track.name}
                            </span>
                            <span
                              className="o40-mono"
                              style={{
                                fontSize: 9,
                                color:
                                  track.lang === 'IT'
                                    ? '#7FB069'
                                    : track.lang === 'DE'
                                      ? '#D9B34C'
                                      : STEEL,
                                border: `1px solid ${track.lang === 'IT' ? '#7FB06966' : track.lang === 'DE' ? '#D9B34C66' : `${STEEL}44`}`,
                                borderRadius: 4,
                                padding: '0 4px',
                              }}
                            >
                              {track.lang}
                            </span>
                          </div>
                          <div style={{ color: STEEL, fontSize: 10.5 }}>
                            {track.artist} · {track.tag} · 2:00 {on && musicOn ? '• ora' : ''}
                          </div>
                        </div>
                        <span
                          className="o40-mono"
                          style={{ color: on ? BLAZE : KHAKI, fontSize: 10 }}
                        >
                          {on
                            ? musicOn
                              ? '▶'
                              : t('setup.music.playing')
                            : t('setup.music.listen')}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Volume2 size={15} color={KHAKI} />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(musicVolume * 100)}
                    onChange={(e) => onChangeMusicVolume(e.target.value / 100)}
                    style={{ flex: 1, accentColor: BLAZE }}
                  />
                  <span className="o40-mono" style={{ color: STEEL, fontSize: 10 }}>
                    {Math.round(musicVolume * 100)}%
                  </span>
                </div>
                <div style={{ marginTop: 8, color: STEEL, fontSize: 10, lineHeight: 1.4 }}>
                  {musicAutoPlay
                    ? lang === 'it'
                      ? '▶ Tutte le canzoni in sequenza automatica. Shuffle per ordine casuale.'
                      : 'All songs autoplay in sequence. Shuffle for random.'
                    : t('setup.music.note')}
                </div>
              </div>
            )}
          </div>
        )}

        {canCancel && (
          <div
            style={{
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: 14,
            }}
          >
            <div
              className="o40-mono"
              style={{
                color: KHAKI,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 4,
              }}
            >
              {t('setup.level')}
            </div>
            <div style={{ color: STEEL, fontSize: 11.5, marginBottom: 10 }}>
              {t('setup.level.hint')}
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              {INTERVAL_PRESETS.map((pr) => (
                <button
                  key={pr.key}
                  onClick={() => {
                    onSetIntervalPreset(pr.key);
                    if (pr.key !== 'custom') {
                      setFormCustomWork(String(pr.work));
                      setFormCustomRest(String(pr.rest));
                    }
                  }}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 8,
                    border: `1px solid ${intervalPreset === pr.key ? BLAZE : OLIVE}`,
                    background: intervalPreset === pr.key ? `${BLAZE}22` : 'transparent',
                    color: intervalPreset === pr.key ? BLAZE : STEEL,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {pr.label}
                </button>
              ))}
            </div>
            {intervalPreset === 'custom' || formCustomWork !== '40' || formCustomRest !== '20' ? (
              <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <Field label={t('setup.custom.work')}>
                  <input
                    value={formCustomWork}
                    onChange={(e) => setFormCustomWork(e.target.value)}
                    type="number"
                    inputMode="numeric"
                    className="o40-input"
                    style={inputStyle}
                  />
                </Field>
                <Field label={t('setup.custom.rest')}>
                  <input
                    value={formCustomRest}
                    onChange={(e) => setFormCustomRest(e.target.value)}
                    type="number"
                    inputMode="numeric"
                    className="o40-input"
                    style={inputStyle}
                  />
                </Field>
              </div>
            ) : null}
            <div
              style={{
                background: INK,
                border: `1px solid ${OLIVE}`,
                borderRadius: 10,
                padding: 10,
                marginBottom: 12,
              }}
            >
              <div
                className="o40-mono"
                style={{ color: KHAKI, fontSize: 10, letterSpacing: '0.07em', marginBottom: 6 }}
              >
                {t('setup.executionMode')}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => onSetExecutionMode('time')}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    padding: '10px 8px',
                    borderRadius: 8,
                    border: `1px solid ${executionMode === 'time' ? BLAZE : OLIVE}`,
                    background: executionMode === 'time' ? `${BLAZE}22` : 'transparent',
                    color: executionMode === 'time' ? BLAZE : STEEL,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700 }}>{t('setup.mode.time')}</span>
                  <span style={{ fontSize: 9, color: STEEL, textAlign: 'center', lineHeight: 1.3 }}>
                    {t('setup.mode.time.hint')}
                  </span>
                </button>
                <button
                  onClick={() => onSetExecutionMode('reps')}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    padding: '10px 8px',
                    borderRadius: 8,
                    border: `1px solid ${executionMode === 'reps' ? BLAZE : OLIVE}`,
                    background: executionMode === 'reps' ? `${BLAZE}22` : 'transparent',
                    color: executionMode === 'reps' ? BLAZE : STEEL,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700 }}>{t('setup.mode.reps')}</span>
                  <span style={{ fontSize: 9, color: STEEL, textAlign: 'center', lineHeight: 1.3 }}>
                    {t('setup.mode.reps.hint')}
                  </span>
                </button>
              </div>
              <div style={{ color: KHAKI, fontSize: 10, marginTop: 6, textAlign: 'center' }}>
                {executionMode === 'reps'
                  ? 'Es: 12× squat → FATTO → recupero 20″ (auto)'
                  : 'Standard tempo — adatto a dimagrimento'}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {LEVELS.map((l) => (
                <button
                  key={l.key}
                  onClick={() => onSetLevel(l.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    borderRadius: 10,
                    cursor: 'pointer',
                    textAlign: 'left',
                    background: curLevel.key === l.key ? OLIVE_DARK : INK,
                    border: `1px solid ${curLevel.key === l.key ? BLAZE : OLIVE}`,
                  }}
                >
                  {curLevel.key === l.key ? (
                    <Crown size={15} color={BLAZE} />
                  ) : (
                    <Medal size={15} color={STEEL} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="o40-mono" style={{ color: PAPER, fontSize: 12.5 }}>
                      {tr(l.label, lang)}
                    </div>
                    <div style={{ color: STEEL, fontSize: 11 }}>{tr(l.desc, lang)}</div>
                  </div>
                  <span
                    className="o40-mono"
                    style={{ color: curLevel.key === l.key ? BLAZE : KHAKI, fontSize: 11 }}
                  >
                    {l.work}″/{l.rest}″
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {canCancel && (
          <div
            style={{
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: 14,
            }}
          >
            <div
              className="o40-mono"
              style={{
                color: KHAKI,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 8,
              }}
            >
              {t('setup.health')}
            </div>
            <div
              style={{ color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}
              dangerouslySetInnerHTML={{ __html: t('setup.health.body') }}
            />
            <label
              style={{
                ...secondaryBtn,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {healthImportStatus === 'reading' || healthImportStatus === 'parsing'
                ? t('setup.health.processing')
                : t('setup.health.upload')}
              <input
                type="file"
                accept=".xml"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const f = e.target.files && e.target.files[0];
                  if (f) onImportHealth(f);
                  e.target.value = '';
                }}
              />
            </label>
            {healthImportStatus === 'error' && (
              <div style={{ color: BLAZE, fontSize: 11.5, marginTop: 8 }}>
                {t('setup.health.error')}
              </div>
            )}
            {healthWeightSuggestion && (
              <div
                style={{
                  marginTop: 12,
                  background: INK,
                  border: `1px solid ${BLAZE}`,
                  borderRadius: 10,
                  padding: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div style={{ flex: 1, color: PAPER, fontSize: 12.5 }}>
                  {t('setup.health.weight')} <strong>{healthWeightSuggestion.kg} kg</strong>
                </div>
                <button
                  onClick={onApplyHealthWeight}
                  style={{ ...primaryBtn, width: 'auto', padding: '8px 14px', fontSize: 13 }}
                >
                  {t('setup.health.apply')}
                </button>
              </div>
            )}
          </div>
        )}

        {canCancel && (
          <div
            style={{
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: 14,
            }}
          >
            <div
              className="o40-mono"
              style={{
                color: KHAKI,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <HeartPulse size={14} color={BLAZE} /> Huawei Health
            </div>
            <div style={{ color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>
              {lang === 'it'
                ? 'Importa da Huawei Health: esporta da Huawei Health → Richiedi i tuoi dati → JSON/TCX/CSV. Lettura 100% locale, come Apple Health.'
                : lang === 'de'
                  ? 'Aus Huawei Health importieren: JSON/TCX/CSV — 100% lokal.'
                  : 'Import from Huawei Health: JSON/TCX/CSV — 100% on-device.'}
            </div>
            <label
              style={{
                ...secondaryBtn,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {huaweiStatus === 'parsing' ? t('setup.health.processing') : 'Carica Huawei JSON/TCX/CSV'}
              <input
                type="file"
                accept=".json,.tcx,.csv"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const f = e.target.files && e.target.files[0];
                  if (!f) return;
                  setHuaweiStatus('parsing');
                  try {
                    const text = await f.text();
                    const parsed = parseHuaweiHealthExport(text, f.name);
                    if (!parsed.workouts.length && !parsed.weightKg) throw new Error('empty');
                    // reuse same storage as Apple Health: push to sessions via window.storage
                    const r = await window.storage.get('o40_sessions', false);
                    const cur = r ? JSON.parse(r.value) : [];
                    const existing = new Set(cur.map(s=>s.date));
                    let added = 0;
                    for (const w of parsed.workouts) {
                      const d = w.startDate ? new Date(w.startDate) : null;
                      if (!d || isNaN(d)) continue;
                      const iso = d.toISOString();
                      if (existing.has(iso)) continue;
                      cur.push({ date: iso, programId: 'health-import', programName: w.type || 'Huawei', kcal: w.kcal || 120, peakHR: null, rpe: null, notes: null, imported: true });
                      existing.add(iso); added++;
                    }
                    cur.sort((a,b)=> new Date(a.date)-new Date(b.date));
                    await window.storage.set('o40_sessions', JSON.stringify(cur), false);
                    if (parsed.weightKg) {
                      showToast && showToast(`Huawei: ${added} allenamenti + peso ${parsed.weightKg}kg`);
                    } else {
                      showToast && showToast(`Huawei: ${added} allenamenti importati`);
                    }
                    setHuaweiStatus('done');
                    setTimeout(()=> setHuaweiStatus('idle'), 2000);
                  } catch (err) {
                    setHuaweiStatus('error');
                    setTimeout(()=> setHuaweiStatus('idle'), 2500);
                  }
                  e.target.value = '';
                }}
              />
            </label>
            {huaweiStatus === 'error' && <div style={{ color: BLAZE, fontSize: 11.5, marginTop: 8 }}>{t('setup.huawei.fileError')}</div>}
            {huaweiStatus === 'done' && <div style={{ color: '#7FB069', fontSize: 11.5, marginTop: 8 }}>{t('setup.huawei.importOk')}</div>}

            <div style={{ height: 1, background: OLIVE_DARK, margin: '12px 0' }} />

            <div className="o40-mono" style={{ color: KHAKI, fontSize: 10, letterSpacing: '0.06em', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Activity size={14} color={BLAZE} /> Watch HR Live
              {huaweiWatchHr && <span style={{ marginLeft: 'auto', color: BLAZE, fontSize: 14 }}>{huaweiWatchHr} bpm ❤️</span>}
            </div>
            <div style={{ color: STEEL, fontSize: 11.5, marginBottom: 8 }}>
              {t('setup.huawei.watchLive')}
            </div>
            <button
              onClick={async ()=>{
                setHuaweiWatchStatus('searching');
                try {
                  await connectHuaweiWatch({
                    onHeartRate: (hr)=> setHuaweiWatchHr(hr),
                    onStatus: (s)=> setHuaweiWatchStatus(s),
                  });
                  setHuaweiWatchStatus('connected');
                } catch (err) {
                  setHuaweiWatchStatus('error');
                  showToast && showToast(err.message || 'Bluetooth fallito');
                  setTimeout(()=> setHuaweiWatchStatus('idle'), 2000);
                }
              }}
              disabled={huaweiWatchStatus==='searching' || huaweiWatchStatus==='connected'}
              style={{ ...secondaryBtn, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: huaweiWatchStatus==='searching'?0.6:1 }}
            >
              <HeartPulse size={14} /> {huaweiWatchStatus==='connected' ? t('setup.huawei.connected') : huaweiWatchStatus==='searching' ? t('setup.huawei.searching') : t('setup.huawei.connect')}
            </button>
            {huaweiWatchStatus==='error' && <div style={{ color: BLAZE, fontSize: 11, marginTop: 6 }}>{t('setup.huawei.bluetoothFail')}</div>}
          </div>
        )}

        <div
          style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Download size={16} color={KHAKI} />
            <div
              className="o40-mono"
              style={{
                color: KHAKI,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                flex: 1,
              }}
            >
              {t('setup.backup.title')}
            </div>
            <span
              className="o40-mono"
              style={{
                fontSize: 9,
                color: STEEL,
                border: `1px solid ${OLIVE}`,
                borderRadius: 6,
                padding: '2px 6px',
              }}
            >
              v1
            </span>
          </div>
          <div style={{ color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>
            {t('setup.backup.hint2')}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={onExportBackup}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '10px 12px',
                borderRadius: 10,
                cursor: 'pointer',
                background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`,
                color: PAPER,
                border: `1px solid ${BLAZE}`,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              <Download size={14} /> {t('setup.backup.export')}
            </button>
            <label
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '10px 12px',
                borderRadius: 10,
                cursor: 'pointer',
                background: INK,
                border: `1px solid ${OLIVE}`,
                color: KHAKI,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              <Upload size={14} /> {t('setup.backup.restore')}
              <input
                type="file"
                accept=".json"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const f = e.target.files && e.target.files[0];
                  if (f) onImportBackup(f);
                  e.target.value = '';
                }}
              />
            </label>
          </div>
          <div style={{ color: STEEL, fontSize: 10, marginTop: 8, lineHeight: 1.4, opacity: 0.8 }}>
            {t('setup.backup.hint')}
          </div>
        </div>

        <div
          style={{
            background: INK_2,
            border: `1px solid ${pushEnabled ? BLAZE : OLIVE}`,
            borderRadius: 14,
            padding: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            {pushEnabled ? <Bell size={16} color={BLAZE} /> : <BellOff size={16} color={STEEL} />}
            <div
              className="o40-mono"
              style={{
                color: pushEnabled ? BLAZE : KHAKI,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                flex: 1,
              }}
            >
              {lang === 'it'
                ? 'Push PWA — anche con app chiusa'
                : lang === 'de'
                  ? 'Push PWA — auch geschlossen'
                  : 'PWA Push — works when closed'}
            </div>
            <span
              className="o40-mono"
              style={{
                fontSize: 9,
                color: pushEnabled ? BLAZE : STEEL,
                border: `1px solid ${pushEnabled ? BLAZE : OLIVE}`,
                borderRadius: 6,
                padding: '2px 6px',
                background: pushEnabled ? `${BLAZE}18` : 'transparent',
              }}
            >
              {pushEnabled ? 'ON' : 'OFF'}
            </span>
          </div>
          {!pushSupported ? (
            <div style={{ color: STEEL, fontSize: 12, lineHeight: 1.5 }}>
              {lang === 'it'
                ? 'Push non supportato su questo browser (usa Chrome/Android o Safari iOS 16.4+ con PWA installata).'
                : 'Push not supported in this browser.'}
            </div>
          ) : (
            <>
              <div style={{ color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>
                {lang === 'it'
                  ? 'Ricevi la missione giornaliera anche con PWA chiusa. Su iPhone: installa con “Aggiungi a Home” poi attiva.'
                  : lang === 'de'
                    ? 'Tägliche Mission auch bei geschlossener PWA erhalten.'
                    : 'Get daily mission even when PWA is closed. On iPhone: Add to Home Screen first.'}
                {!isStandalonePWA?.() && pushSupported && (
                  <span style={{ color: KHAKI, display: 'block', marginTop: 4 }}>
                    ⚠️{' '}
                    {lang === 'it'
                      ? 'Apri come PWA installata per push in background su iOS.'
                      : 'Open as installed PWA for background push on iOS.'}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={onTogglePush}
                  disabled={pushBusy}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: '10px 12px',
                    borderRadius: 10,
                    cursor: pushBusy ? 'wait' : 'pointer',
                    background: pushEnabled
                      ? INK
                      : `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`,
                    color: pushEnabled ? KHAKI : PAPER,
                    border: `1px solid ${pushEnabled ? OLIVE : BLAZE}`,
                    fontSize: 12,
                    fontWeight: 700,
                    opacity: pushBusy ? 0.6 : 1,
                  }}
                >
                  {pushBusy ? (
                    <RefreshCw size={14} className="o40-spin" />
                  ) : pushEnabled ? (
                    <BellOff size={14} />
                  ) : (
                    <Bell size={14} />
                  )}
                  {pushBusy
                    ? '...'
                    : pushEnabled
                      ? lang === 'it'
                        ? 'Disattiva push'
                        : 'Disable push'
                      : lang === 'it'
                        ? 'Attiva push'
                        : 'Enable push'}
                </button>
                <button
                  onClick={onTestPush}
                  disabled={pushBusy}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 10,
                    cursor: pushBusy ? 'wait' : 'pointer',
                    background: INK,
                    border: `1px solid ${OLIVE}`,
                    color: KHAKI,
                    fontSize: 12,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    opacity: pushBusy ? 0.6 : 1,
                  }}
                >
                  <Send size={14} /> Test
                </button>
              </div>
              <div style={{ color: STEEL, fontSize: 10, marginTop: 8, lineHeight: 1.4 }}>
                {lang === 'it'
                  ? 'Privacy: subscription salvata solo su mikweb.eu, nessun tracking.'
                  : 'Privacy: subscription stored only on mikweb.eu'}
              </div>
            </>
          )}
        </div>

        <div
          style={{
            background: INK_2,
            border: `1px solid ${OLIVE}`,
            borderRadius: 14,
            padding: 12,
            display: 'flex',
            gap: 10,
          }}
        >
          <HeartPulse size={20} color={BLAZE} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ color: KHAKI, fontSize: 12.5, lineHeight: 1.5 }}>
            {t('setup.tech.note')}
          </div>
        </div>

        <button
          onClick={onSave}
          disabled={!formAge || !formWeight}
          className="o40-cta"
          style={{
            ...primaryBtn,
            opacity: !formAge || !formWeight ? 0.5 : 1,
            marginTop: 4,
          }}
        >
          {t('setup.enlist')} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
