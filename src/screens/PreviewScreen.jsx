import React, { useState, useEffect } from 'react';
import { useT } from '../context/LangContext.jsx';
import { INK, INK_2, PAPER, OLIVE, OLIVE_DARK, KHAKI, BLAZE, BLAZE_DEEP, STEEL } from '../constants/theme.js';
import { EXERCISES, EXERCISE_GROUPS } from '../data/exercises.js';
import { HOLD_EXERCISES, getReps, levelPreset } from '../data/programs.js';
import { tr } from '../i18n.js';
import { buildSequence, totalSeqSeconds, estimateProgramKcal } from '../utils/workout.js';
import { hasClip } from '../clips.js';
import { speak } from '../utils/audio.js';
import { Play, ChevronRight, RefreshCw, Wind } from 'lucide-react';
import { ExerciseFigure } from '../components/ExerciseFigure.jsx';
import TopBar from '../components/layout/TopBar.jsx';
const primaryBtn = { background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, color: PAPER, border: 'none', borderRadius: 14, padding: '12px 16px', fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: '0.05em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%' };
const btnIcon = { background: 'transparent', border: 'none', padding: 6, cursor: 'pointer', display: 'flex', borderRadius: 10 };
let _mediaPromise = null;
function getMediaMap() { if (!_mediaPromise) _mediaPromise = import('../media.js').then(m => ({ b64: m.VIDEO_B64, files: m.VIDEO_FILES })); return _mediaPromise; }
function ExerciseMedia({ exerciseId, pose, color = BLAZE, size = '100%', rounded = 10 }) {
  const [src, setSrc] = useState(null); const [videoSrc, setVideoSrc] = useState(null); const [failed, setFailed] = useState(false);
  useEffect(() => { let c=false; setSrc(null); setVideoSrc(null); setFailed(false); getMediaMap().then(({b64,files})=>{ if(c) return; const clip=files[exerciseId]||files[pose]||null; setVideoSrc(clip); if(!clip) setSrc(b64[exerciseId]||b64[pose]||null); }).catch(()=>{if(!c) setFailed(true)}); return()=>{c=true}},[exerciseId]);
  if (videoSrc && !failed) return (<video src={videoSrc} autoPlay muted loop playsInline preload="metadata" onError={()=>setFailed(true)} style={{width:size,height:size,objectFit:'cover',borderRadius:rounded,display:'block',background:INK}}/>);
  if (src && !failed) return (<img src={src} alt="" onError={()=>setFailed(true)} style={{width:size,height:size,objectFit:'cover',borderRadius:rounded,display:'block',background:INK}}/>);
  return <ExerciseFigure pose={pose} color={color} size={size} />;
}
function DogTag({ label, value, sub }) { const numeric = typeof value === 'number'; return (<div className="o40-card" style={{ background: `linear-gradient(160deg, ${INK_2}, ${INK})`, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '12px 13px', position: 'relative', flex: 1, minWidth: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.35)' }}><div style={{ position: 'absolute', top: 9, left: -5, width: 10, height: 10, borderRadius: '50%', background: INK, border: `2px solid ${KHAKI}` }} /><div className="o40-mono" style={{ color: KHAKI, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div><div className="o40-display" style={{ color: PAPER, fontSize: 26, lineHeight: 1.1 }}>{numeric ? value : value}</div>{sub && <div style={{ color: STEEL, fontSize: 11 }}>{sub}</div>}</div>); }

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
  const mode = (profile && profile.executionMode) || 'time';
  const levelKey = (profile && profile.level) || 'combattente';
  const kcal = Math.round(estimateProgramKcal(effectiveProgram, profile.weight, !!profile.skipWarmup, preset.work, preset.rest, mode, levelKey));
  const mins = Math.round(totalSeqSeconds(effectiveProgram, !!profile.skipWarmup, preset.work, preset.rest, mode, levelKey) / 60);

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
          {t('prev.sub', { n: program.exercises.length, r: program.rounds, p: mode === 'reps' ? (lang==='it'?'Ripetizioni': lang==='de'?'Wiederholungen':'Reps') : tr(preset.label, lang) })}
        </div>
        {mode === 'reps' && <div style={{ color: BLAZE, fontSize: 11, marginBottom: 8, background: `${BLAZE}14`, border: `1px solid ${BLAZE}44`, borderRadius: 8, padding: '6px 10px', textAlign: 'center' }}>{lang==='it'?'Modalità ripetizioni: tocca FATTO quando hai finito ogni esercizio. Hold resta a tempo.':'Reps mode: tap DONE when finished each exercise. Holds stay timed.'}</div>}

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
                      <div style={{ color: KHAKI, fontSize: 12, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                        {(() => { const reps = mode === 'reps' ? getReps(currentId, levelKey) : null; return reps ? <span style={{ background: `${BLAZE}22`, border: `1px solid ${BLAZE}55`, color: BLAZE, padding: '1px 6px', borderRadius: 6, fontWeight: 700 }}>×{reps}</span> : null; })()}
                        <span>{tr(ex.repGuide, lang)}</span>
                        {mode === 'reps' && !HOLD_EXERCISES.has(currentId) && <span style={{ color: STEEL, fontSize: 10 }}>· {lang==='it'?'tocca FATTO':'tap DONE'}</span>}
                      </div>
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

export default PreviewScreen;
