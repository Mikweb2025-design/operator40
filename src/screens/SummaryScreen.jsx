import React, { useState } from 'react';
import { useT } from '../context/LangContext.jsx';
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
import { tr } from '../i18n.js';
import { EXERCISES } from '../data/exercises.js';
import { hrZone, WEEKLY_GOAL, RPE_LABELS, RPE_COLORS } from '../utils/stats.js';
import { Trophy, HeartPulse, Ruler, Scale, Check, Gauge } from 'lucide-react';
import { WeeklyChallenge } from '../components/WeeklyChallenge.jsx';
import DogTag from '../components/ui/DogTag.jsx';
import { inputStyle, primaryBtn, secondaryBtn } from '../components/ui/styles.js';

/* ================= SUMMARY SCREEN ================= */
function SummaryScreen({
  stats,
  aiQuality,
  profile,
  sessions,
  hrInput,
  setHrInput,
  waistInput,
  setWaistInput,
  weightInput,
  setWeightInput,
  rpe,
  setRpe,
  notes,
  setNotes,
  onSave,
}) {
  const { lang, t } = useT();
  const zone = hrInput ? hrZone(parseInt(hrInput, 10), profile.age, lang) : null;
  const [shareState, setShareState] = useState('idle');

  async function handleShare() {
    const text = t('sum.share', {
      name: tr(stats.program.name, lang),
      min: Math.round(stats.durationSec / 60),
      kcal: stats.kcal,
    });
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setShareState('copied');
        setTimeout(() => setShareState('idle'), 2000);
      }
    } catch (e) {
      /* user cancelled share, ignore */
    }
  }

  return (
    <div
      className="o40-screen-in"
      style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {['#C1440E', '#B8AE8C', '#7FB069', '#EDE8D8', '#D9B34C'].map((c, i) => (
          <span
            key={i}
            className="o40-confetti"
            style={{
              background: c,
              left: `${8 + i * 18}%`,
              animationDuration: `${2.6 + (i % 3) * 0.7}s`,
              animationDelay: `${i * 0.35}s`,
              opacity: 0.85,
            }}
          />
        ))}
      </div>
      <div className="o40-scroll" style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        <div style={{ textAlign: 'center', marginTop: 10 }} className="o40-pop">
          <Trophy size={40} color={BLAZE} />
          <div className="o40-display" style={{ color: PAPER, fontSize: 30, marginTop: 8 }}>
            {t('sum.title')}
          </div>
          <div style={{ color: KHAKI, fontSize: 14 }}>{tr(stats.program.name, lang)}</div>
          <button
            onClick={handleShare}
            style={{
              marginTop: 10,
              background: 'transparent',
              border: `1px solid ${KHAKI}`,
              borderRadius: 20,
              padding: '6px 14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 11 }}>
              {shareState === 'copied' ? t('sum.copied') : t('sum.sharebtn')}
            </span>
          </button>
        </div>

        <div style={{ display: 'flex', gap: 10, margin: '20px 0' }}>
          <DogTag label={t('dt.duration')} value={`${Math.round(stats.durationSec / 60)}′`} />
          <DogTag label={t('dt.kcal')} value={stats.kcal} />
        </div>
        <WeeklyChallenge sessions={sessions} weeklyGoal={profile.weeklyGoal || WEEKLY_GOAL} />

        {aiQuality && aiQuality.overall != null && aiQuality.exercises?.length > 0 && (
          <div
            className="o40-pop"
            style={{
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Gauge
                size={18}
                color={aiQuality.overall > 70 ? '#7FB069' : aiQuality.overall > 50 ? '#D4A017' : BLAZE}
              />
              <span
                className="o40-mono"
                style={{
                  color: KHAKI,
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {t('sum.quality.title')}
              </span>
              <div
                style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 2,
                }}
              >
                <span
                  className="o40-display"
                  style={{
                    color:
                      aiQuality.overall > 70
                        ? '#7FB069'
                        : aiQuality.overall > 50
                          ? '#D4A017'
                          : BLAZE,
                    fontSize: 26,
                    lineHeight: 1,
                  }}
                >
                  {aiQuality.overall}
                </span>
                <span className="o40-mono" style={{ color: STEEL, fontSize: 9 }}>
                  /100
                </span>
              </div>
            </div>
            <div style={{ color: STEEL, fontSize: 12, marginBottom: 10, lineHeight: 1.4 }}>
              {t('sum.quality.body')}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {aiQuality.exercises.map((e) => (
                <span
                  key={e.name}
                  className="o40-mono"
                  style={{
                    color: PAPER,
                    fontSize: 10,
                    background: INK,
                    border: `1px solid ${e.quality > 70 ? '#7FB069' : e.quality > 50 ? '#D4A017' : OLIVE}`,
                    borderRadius: 6,
                    padding: '3px 8px',
                  }}
                >
                  {t('sum.quality.per', { name: e.name, q: e.quality })}
                </span>
              ))}
            </div>
          </div>
        )}

        <div
          style={{
            background: INK_2,
            border: `1px solid ${OLIVE}`,
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <span
            className="o40-mono"
            style={{
              color: KHAKI,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {t('sum.rpe.title')}
          </span>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {RPE_LABELS.map((lbl, i) => {
              const val = i + 1;
              const on = rpe === val;
              const c = RPE_COLORS[i];
              return (
                <button
                  key={val}
                  onClick={() => setRpe(on ? null : val)}
                  style={{
                    flex: 1,
                    padding: '10px 2px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    textAlign: 'center',
                    background: on ? c : INK,
                    border: `1px solid ${on ? c : OLIVE}`,
                    transition:
                      'background 0.15s ease, border-color 0.15s ease, transform 0.1s ease',
                  }}
                >
                  <div className="o40-display" style={{ color: PAPER, fontSize: 18 }}>
                    {val}
                  </div>
                  <div style={{ color: on ? PAPER : STEEL, fontSize: 8.5 }}>{tr(lbl, lang)}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            background: INK_2,
            border: `1px solid ${OLIVE}`,
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <span
            className="o40-mono"
            style={{
              color: KHAKI,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {t('sum.notes.title')}
          </span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value.slice(0, 200))}
            placeholder={t('sum.notes.ph')}
            rows={2}
            className="o40-input"
            style={{
              ...inputStyle,
              marginTop: 10,
              resize: 'none',
              fontFamily: 'Inter, sans-serif',
            }}
          />
        </div>

        <div
          style={{
            background: INK_2,
            border: `1px solid ${OLIVE}`,
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Ruler size={18} color={BLAZE} />
            <span
              className="o40-mono"
              style={{
                color: KHAKI,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {t('sum.waist.title')}
            </span>
          </div>
          <div style={{ color: STEEL, fontSize: 12, marginBottom: 10, lineHeight: 1.4 }}>
            {t('sum.waist.body')}
          </div>
          <input
            value={waistInput}
            onChange={(e) => setWaistInput(e.target.value.replace(/\D/g, ''))}
            inputMode="numeric"
            placeholder={t('sum.waist.ph')}
            className="o40-input"
            style={inputStyle}
          />
        </div>

        <div
          style={{
            background: INK_2,
            border: `1px solid ${OLIVE}`,
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Scale size={18} color={BLAZE} />
            <span
              className="o40-mono"
              style={{
                color: KHAKI,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {t('sum.weight.title')}
            </span>
          </div>
          <div style={{ color: STEEL, fontSize: 12, marginBottom: 10, lineHeight: 1.4 }}>
            {t('sum.weight.body')}
          </div>
          <input
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value.replace(/[^\d.,]/g, ''))}
            inputMode="decimal"
            placeholder={
              profile && profile.weight
                ? t('sum.weight.ph.dynamic', { v: profile.weight })
                : t('sum.weight.ph')
            }
            className="o40-input"
            style={inputStyle}
          />
        </div>

        <div
          style={{
            background: INK_2,
            border: `1px solid ${OLIVE}`,
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <HeartPulse size={18} color={BLAZE} />
            <span
              className="o40-mono"
              style={{
                color: KHAKI,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {t('sum.hr.title')}
            </span>
            {!hrInput && (
              <span
                className="o40-blink"
                style={{
                  marginLeft: 'auto',
                  background: `${BLAZE}22`,
                  border: `1px solid ${BLAZE}`,
                  color: BLAZE,
                  fontSize: 10,
                  letterSpacing: '0.06em',
                  borderRadius: 6,
                  padding: '2px 7px',
                }}
              >
                {t('sum.hr.remind')}
              </span>
            )}
          </div>
          <div style={{ color: STEEL, fontSize: 12, marginBottom: 10, lineHeight: 1.4 }}>
            {t('sum.hr.body')}
          </div>
          <input
            value={hrInput}
            onChange={(e) => setHrInput(e.target.value.replace(/\D/g, ''))}
            inputMode="numeric"
            placeholder={t('sum.hr.ph')}
            className="o40-input"
            style={inputStyle}
          />
          {zone && (
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: zone.color }} />
              <span style={{ color: PAPER, fontSize: 13 }}>
                {t('sum.zone', { label: zone.label })}
              </span>
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: '12px 20px 20px', borderTop: `1px solid ${OLIVE_DARK}` }}>
        <button onClick={onSave} style={primaryBtn}>
          <Check size={18} /> {t('sum.save')}
        </button>
      </div>
    </div>
  );
}

export default SummaryScreen;
