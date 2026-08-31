import React, { useState, useEffect } from 'react';
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
import { EXERCISES, EXERCISE_GROUPS } from '../data/exercises.js';
import { PROGRAMS } from '../data/programs.js';
import { tr } from '../i18n.js';
import { loadFavorites, toggleFavorite } from '../utils/favorites.js';
import { ExerciseFigure } from '../components/ExerciseFigure.jsx';
import { hasClip } from '../clips.js';
import { getConsistencyScore, getStreakRisk } from '../utils/progress.js';
import { speak } from '../utils/audio.js';
import { Star, X, Search, Wind, Sparkles } from 'lucide-react';
let _mediaPromise = null;
function getMediaMap() {
  if (!_mediaPromise)
    _mediaPromise = import('../media.js').then((m) => ({ b64: m.VIDEO_B64, files: m.VIDEO_FILES }));
  return _mediaPromise;
}
function ExerciseMedia({ exerciseId, pose, color = BLAZE, size = '100%', rounded = 10 }) {
  const [src, setSrc] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let c = false;
    setSrc(null);
    setVideoSrc(null);
    setFailed(false);
    getMediaMap()
      .then(({ b64, files }) => {
        if (c) return;
        const clip = files[exerciseId] || files[pose] || null;
        setVideoSrc(clip);
        if (!clip) setSrc(b64[exerciseId] || b64[pose] || null);
      })
      .catch(() => {
        if (!c) setFailed(true);
      });
    return () => {
      c = true;
    };
  }, [exerciseId]);
  if (videoSrc && !failed)
    return (
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
        style={{
          width: size,
          height: size,
          objectFit: 'cover',
          borderRadius: rounded,
          display: 'block',
          background: INK,
        }}
      />
    );
  if (src && !failed)
    return (
      <img
        src={src}
        alt=""
        onError={() => setFailed(true)}
        style={{
          width: size,
          height: size,
          objectFit: 'cover',
          borderRadius: rounded,
          display: 'block',
          background: INK,
        }}
      />
    );
  return <ExerciseFigure pose={pose} color={color} size={size} />;
}

/* ================= LIBRARY SCREEN (browse all exercises) ================= */
function LibraryScreen({ sessions, profile }) {
  const { lang, t } = useT();
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 180);
    return () => clearTimeout(id);
  }, [query]);
  const [showFavs, setShowFavs] = useState(false);
  const [favs, setFavs] = useState(() => loadFavorites());
  function highlight(text, q) {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: `${BLAZE}33`, color: PAPER, padding: '0 2px', borderRadius: 3 }}>{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    );
  }
  const visibleIds = Object.keys(EXERCISES).filter((id) => {
    const ex = EXERCISES[id];
    const byGroup = filter === 'all' ? true : EXERCISE_GROUPS[filter].includes(id);
    const byFav = showFavs ? favs.includes(id) : true;
    const q = debouncedQuery.trim().toLowerCase();
    const byQuery =
      !q ||
      tr(ex.name, lang).toLowerCase().includes(q) ||
      id.toLowerCase().includes(q) ||
      tr(ex.cue, lang).toLowerCase().includes(q);
    return byGroup && byFav && byQuery;
  });

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 16px 4px' }}>
        <div className="o40-display" style={{ color: PAPER, fontSize: 26 }}>
          {t('lib.title')}
        </div>
        <div style={{ color: KHAKI, fontSize: 13 }}>{t('lib.sub')}</div>
      </div>
      <div style={{ padding: '10px 16px 0' }}>
        <div className="o40-search-wrap">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'it'
                ? 'Cerca esercizio…'
                : lang === 'de'
                  ? 'Übung suchen…'
                  : 'Search exercise…'
            }
            className="o40-search"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: STEEL,
                cursor: 'pointer',
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px 4px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setShowFavs((v) => !v)}
          style={{
            padding: '6px 12px',
            borderRadius: 20,
            cursor: 'pointer',
            background: showFavs ? BLAZE : 'transparent',
            border: `1px solid ${showFavs ? BLAZE : OLIVE}`,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Star size={12} color={showFavs ? PAPER : KHAKI} fill={showFavs ? PAPER : 'none'} />
          <span className="o40-mono" style={{ color: showFavs ? PAPER : STEEL, fontSize: 11 }}>
            {showFavs ? '★' : '☆'} {favs.length || ''}
          </span>
        </button>
        {[
          ['all', t('lib.all')],
          ['standing', t('lib.standing')],
          ['ground', t('lib.ground')],
          ['core', t('lib.core')],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              padding: '6px 12px',
              borderRadius: 20,
              cursor: 'pointer',
              background: filter === key ? BLAZE : 'transparent',
              border: `1px solid ${filter === key ? BLAZE : OLIVE}`,
            }}
          >
            <span
              className="o40-mono"
              style={{ color: filter === key ? PAPER : STEEL, fontSize: 11 }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
      {(() => {
        const lastProg =
          sessions && sessions.length ? sessions[sessions.length - 1].programId : null;
        const recIds =
          lastProg && EXERCISES[lastProg]
            ? []
            : profile
              ? PROGRAMS.find((pr) => pr.id === 'A').exercises.slice(0, 3)
              : [];
        let rec = recIds.length
          ? recIds
          : ['plank', 'squat', 'jumpingjack'].filter((id) => !favs.includes(id)).slice(0, 3);
        // Personalizza in base a consistenza e streak risk (nuova funzione progresso)
        const cons = getConsistencyScore(sessions);
        const risk = getStreakRisk(sessions);
        if (risk === 'at-risk' && !query && !showFavs) {
          rec = ['wallsit', 'ponte', 'superman'].filter((id) => !favs.includes(id)).slice(0, 3);
        } else if (cons < 30 && !query && !showFavs) {
          rec = ['jumpingjack', 'squat', 'crunch'].filter((id) => !favs.includes(id)).slice(0, 3);
        }
        const label =
          risk === 'at-risk'
            ? lang === 'it'
              ? 'Recupero consigliato'
              : 'Recovery pick'
            : cons < 30
              ? lang === 'it'
                ? 'Partenza facile'
                : 'Easy start'
              : lang === 'it'
                ? 'Consigliati per te'
                : 'Recommended for you';
        if (!query && !showFavs && rec.length)
          return (
            <div style={{ padding: '8px 16px 0' }}>
              <div
                className="o40-mono"
                style={{
                  color: KHAKI,
                  fontSize: 10,
                  letterSpacing: '0.06em',
                  marginBottom: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Sparkles size={10} /> {label}{' '}
                {cons ? (
                  <span style={{ color: STEEL, marginLeft: 6 }}>· {cons}% aderenza</span>
                ) : null}
              </div>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
                {rec.map((rid) => {
                  const ex = EXERCISES[rid];
                  return (
                    <button
                      key={`rec-${rid}`}
                      onClick={() => setSelectedId(rid)}
                      style={{
                        minWidth: 110,
                        background: `linear-gradient(135deg, ${INK_2}, ${INK})`,
                        border: `1px solid ${favs.includes(rid) ? BLAZE : OLIVE}`,
                        borderRadius: 12,
                        padding: 10,
                        cursor: 'pointer',
                        textAlign: 'center',
                        boxShadow: favs.includes(rid) ? `0 0 0 1px ${BLAZE}22` : 'none',
                      }}
                    >
                      <div style={{ width: 44, height: 44, margin: '0 auto 6px' }}>
                        <ExerciseFigure pose={ex.pose} color={favs.includes(rid) ? BLAZE : KHAKI} />
                      </div>
                      <div style={{ color: PAPER, fontSize: 11, fontWeight: 700 }}>
                        {tr(ex.name, lang)}
                      </div>
                      <div style={{ color: favs.includes(rid) ? BLAZE : STEEL, fontSize: 9 }}>
                        {favs.includes(rid) ? '★ preferito' : 'tap per aprire'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        return null;
      })()}
      <div className="o40-scroll" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visibleIds.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', color: STEEL }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🔍</div>
              <div style={{ color: PAPER, fontWeight: 700, fontSize: 14 }}>{t('lib.notFound')}</div>
              <div style={{ color: STEEL, fontSize: 12, marginTop: 4 }}>
                {t('lib.empty')}
              </div>
              <button onClick={() => { setQuery(''); setFilter('all'); setShowFavs(false); }} style={{ marginTop: 12, padding: '8px 14px', borderRadius: 20, border: `1px solid ${BLAZE}`, background: BLAZE, color: PAPER, cursor: 'pointer', fontSize: 12 }}>
                {t('lib.resetFilters')}
              </button>
            </div>
          ) : visibleIds.map((id) => {
            const ex = EXERCISES[id];
            const isOpen = selectedId === id;
            return (
              <button
                key={id}
                className="o40-card o40-card-face"
                onClick={() => {
                  const opening = !isOpen;
                  setSelectedId(opening ? id : null);
                  if (opening) speak(tr(ex.name, lang));
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  position: 'relative',
                  background: INK_2,
                  border: `1px solid ${isOpen ? BLAZE : OLIVE}`,
                  borderRadius: 14,
                  padding: 12,
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                {isOpen && (
                  <div
                    className="o40-expand"
                    style={{
                      width: '100%',
                      aspectRatio: hasClip(id, ex.pose) ? '9 / 16' : '1 / 1',
                      maxHeight: hasClip(id, ex.pose) ? 320 : 260,
                      background: INK,
                      borderRadius: 10,
                      border: `1px solid ${OLIVE}`,
                      overflow: 'hidden',
                    }}
                  >
                    <ExerciseMedia exerciseId={id} pose={ex.pose} color={BLAZE} rounded={10} />
                  </div>
                )}
                <div style={{ display: 'flex', gap: 12 }}>
                  {!isOpen && (
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        flexShrink: 0,
                        background: INK,
                        borderRadius: 8,
                        border: `1px solid ${OLIVE}`,
                        overflow: 'hidden',
                      }}
                    >
                      <ExerciseMedia exerciseId={id} pose={ex.pose} color={BLAZE} rounded={8} />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ color: PAPER, fontWeight: 700, fontSize: 14.5, flex: 1 }}>
                        {highlight(tr(ex.name, lang), debouncedQuery)}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const next = toggleFavorite(favs, id);
                          setFavs(next);
                        }}
                        className="o40-fav"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 4,
                        }}
                        aria-label="favorite"
                      >
                        <Star
                          size={16}
                          color={favs.includes(id) ? BLAZE : STEEL}
                          fill={favs.includes(id) ? BLAZE : 'none'}
                        />
                      </button>
                    </div>
                    <div style={{ color: KHAKI, fontSize: 12 }}>{tr(ex.repGuide, lang)}</div>
                    {isOpen ? (
                      <>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            marginTop: 5,
                            textAlign: 'left',
                          }}
                        >
                          {ex.steps.map((s, i) => (
                            <div
                              key={i}
                              style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}
                            >
                              <span
                                className="o40-mono"
                                style={{ color: KHAKI, fontSize: 10, minWidth: 13 }}
                              >
                                {i + 1}.
                              </span>
                              <span style={{ color: STEEL, fontSize: 11.5, lineHeight: 1.4 }}>
                                {tr(s, lang)}
                              </span>
                            </div>
                          ))}
                        </div>
                        {ex.breath && (
                          <div
                            style={{
                              display: 'flex',
                              gap: 6,
                              alignItems: 'center',
                              marginTop: 6,
                              color: OLIVE,
                            }}
                          >
                            <Wind size={12} style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: 11, fontStyle: 'italic', lineHeight: 1.4 }}>
                              {tr(ex.breath, lang)}
                            </span>
                          </div>
                        )}
                        <div
                          style={{
                            color: STEEL,
                            fontSize: 11.5,
                            marginTop: 6,
                            lineHeight: 1.4,
                            fontStyle: 'italic',
                          }}
                        >
                          {tr(ex.tip40, lang)}
                        </div>
                      </>
                    ) : (
                      <div style={{ color: STEEL, fontSize: 11.5, marginTop: 3, lineHeight: 1.4 }}>
                        {tr(ex.cue, lang)}
                      </div>
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

export default LibraryScreen;
