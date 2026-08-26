import React, { useState, useEffect } from 'react';
import { playBeep } from '../utils/audio.js';
import { KHAKI, BLAZE, STEEL } from '../constants/theme.js';
import { tr } from '../i18n.js';

/**
 * Countdown 3-2-1-GO before session start.
 * Extracted from App.jsx:1427 as first step of refactor (docs/REFACTOR-App.md)
 * Props: { program, onDone }
 */
export default function CountdownScreen({ program, onDone, lang, t }) {
  const [n, setN] = useState(3);
  useEffect(() => {
    if (n <= 0) { onDone(); return; }
    playBeep(n === 1 ? 880 : 550, 0.15);
    const t = setTimeout(() => setN(v => v - 1), 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [n]);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <div className="o40-mono" style={{ color: KHAKI, fontSize: 13, letterSpacing: '0.15em' }}>{tr(program.name, lang)}</div>
      <div className="o40-display" style={{ color: BLAZE, fontSize: 110, lineHeight: 1 }}>{n > 0 ? n : t('countdown.go')}</div>
      <div style={{ color: STEEL, fontSize: 13 }}>{t('countdown.getReady')}</div>
    </div>
  );
}
