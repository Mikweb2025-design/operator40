import React, { useState } from 'react';
import { useT } from '../context/LangContext.jsx';
import { INK, INK_2, PAPER, OLIVE, OLIVE_DARK, KHAKI, BLAZE, BLAZE_DEEP, STEEL } from '../constants/theme.js';
import { EXERCISES, EXERCISE_GROUPS } from '../data/exercises.js';
import { levelPreset } from '../data/programs.js';
import { estimateProgramKcal, totalSeqSeconds } from '../utils/workout.js';
import { tr } from '../i18n.js';
import { X, Check, Plus, Trash2 } from 'lucide-react';
import TopBar from '../components/layout/TopBar.jsx';
import { ExerciseFigure } from '../components/ExerciseFigure.jsx';
import { inputStyle, primaryBtn } from '../components/ui/styles.js';
function Field({ label, children }) { return (<div><div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</div>{children}</div>); }

/* ================= BUILDER SCREEN (custom mission) ================= */
function BuilderScreen({ profile, initial, onCancel, onCreate, onUpdate }) {
  const { lang, t } = useT();
  const [selected, setSelected] = useState(initial ? initial.exercises : []);
  const [rounds, setRounds] = useState(initial ? initial.rounds : 2);
  const [name, setName] = useState(initial ? initial.name : '');
  const [filter, setFilter] = useState('all');

  function toggleEx(id) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : (s.length < 10 ? [...s, id] : s));
  }

  const isEdit = !!initial;
  const canCreate = selected.length >= 3;
  const draft = { id: initial ? initial.id : `custom-${Date.now()}`, name: name.trim() || t('bld.draft.name'), tagline: t('bld.draft.tagline'), rounds, exercises: selected };
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
        {selected.length > 0 && (
          <div style={{ marginBottom: 12, background: INK_2, border: `1px solid ${BLAZE}`, borderRadius: 10, padding: 10 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 10, letterSpacing: '0.06em', marginBottom: 6 }}>Ordine selezionati · trascina su/giù</div>
            {selected.map((sid, idx) => (
              <div key={sid} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: idx < selected.length - 1 ? `1px solid ${OLIVE_DARK}` : 'none' }}>
                <span className="o40-mono" style={{ color: STEEL, fontSize: 10 }}>{idx + 1}.</span>
                <span style={{ flex: 1, color: PAPER, fontSize: 12 }}>{EXERCISES[sid] ? EXERCISES[sid].name.it : sid}</span>
                <button disabled={idx === 0} onClick={() => setSelected(s => { const a=[...s]; [a[idx-1],a[idx]]=[a[idx],a[idx-1]]; return a; })} style={{ background: 'transparent', border: `1px solid ${OLIVE}`, borderRadius: 6, padding: '2px 6px', color: PAPER, opacity: idx===0?0.3:1, cursor: idx===0?'default':'pointer' }}>↑</button>
                <button disabled={idx === selected.length-1} onClick={() => setSelected(s => { const a=[...s]; [a[idx],a[idx+1]]=[a[idx+1],a[idx]]; return a; })} style={{ background: 'transparent', border: `1px solid ${OLIVE}`, borderRadius: 6, padding: '2px 6px', color: PAPER, opacity: idx===selected.length-1?0.3:1, cursor: idx===selected.length-1?'default':'pointer' }}>↓</button>
                <button onClick={() => setSelected(s => s.filter(x=>x!==sid))} style={{ background: 'transparent', border: 'none', color: STEEL, cursor: 'pointer', padding: 4 }}><X size={12} /></button>
              </div>
            ))}
          </div>
        )}
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
            <button onClick={() => isEdit ? onUpdate(draft) : onCreate(draft)} style={primaryBtn}><Check size={18} /> {isEdit ? 'AGGIORNA' : t('bld.create.go')}</button>
          </>
        ) : (
          <div style={{ color: STEEL, fontSize: 13, textAlign: 'center' }}>{t('bld.hint')}</div>
        )}
      </div>
    </div>
  );
}

export default BuilderScreen;
