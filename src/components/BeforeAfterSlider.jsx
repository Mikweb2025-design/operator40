import React, { useState, useRef } from 'react';
import { INK, OLIVE, KHAKI, PAPER, STEEL, BLAZE } from '../constants/theme.js';
import { vibrate } from '../utils/audio.js';

export default function BeforeAfterSlider({ before, after }) {
  const [pos, setPos] = useState(50);
  const [scale, setScale] = useState(1);
  const lastDist = useRef(null);
  const lastPos = useRef(50);
  if (!before || !after) return null;
  function handleTouchStart(e) {
    if (e.touches.length === 2) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      lastDist.current = d;
    }
  }
  function handleTouchMove(e) {
    if (e.touches.length === 2 && lastDist.current) {
      e.preventDefault();
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const factor = d / lastDist.current;
      setScale((s) => Math.min(3, Math.max(1, s * factor)));
      lastDist.current = d;
    }
  }
  function handleTouchEnd() {
    lastDist.current = null;
    try { vibrate(10); } catch {}
  }
  function handleWheel(e) {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.92 : 1.08;
      setScale((s) => Math.min(3, Math.max(1, s * delta)));
    }
  }
  function handlePosChange(v) {
    if (Math.abs(v - lastPos.current) > 8) { try { vibrate(8); } catch {} }
    lastPos.current = v;
    setPos(v);
  }
  return (
    <div
      style={{
        background: INK,
        border: `1px solid ${OLIVE}`,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        className="o40-mono"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '6px 10px',
          color: KHAKI,
          fontSize: 9,
          letterSpacing: '0.06em',
          background: INK,
        }}
      >
        <span>PRIMA</span>
        <span>DOPO</span>
      </div>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        onDoubleClick={() => setScale(1)}
        style={{
          position: 'relative',
          width: '100%',
          height: 280,
          overflow: 'hidden',
          background: '#000',
          touchAction: 'none',
        }}
      >
        <img
          src={after.url}
          alt="dopo"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${scale})`,
            transformOrigin: 'center',
            transition: lastDist.current ? 'none' : 'transform 0.2s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: `${pos}%`,
            overflow: 'hidden',
            borderRight: `2px solid ${BLAZE}`,
          }}
        >
          <img
            src={before.url}
            alt="prima"
            style={{
              width: '100%',
              height: 280,
              objectFit: 'cover',
              maxWidth: 'none',
              display: 'block',
              transform: `scale(${scale})`,
              transformOrigin: 'center',
              transition: lastDist.current ? 'none' : 'transform 0.2s ease',
            }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => handlePosChange(parseInt(e.target.value, 10))}
          style={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            accentColor: BLAZE,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: `${pos}%`,
            top: 0,
            bottom: 0,
            width: 2,
            background: BLAZE,
            pointerEvents: 'none',
            transform: 'translateX(-1px)',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '6px 10px',
          color: STEEL,
          fontSize: 10,
        }}
      >
        <span>{new Date(before.date).toLocaleDateString('it-IT')}</span>
        <span>
          {new Date(after.date).toLocaleDateString('it-IT')} · Δ{' '}
          {Math.round((new Date(after.date) - new Date(before.date)) / 86400000)} gg
        </span>
      </div>
    </div>
  );
}
