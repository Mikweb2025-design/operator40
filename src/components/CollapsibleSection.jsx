import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { OLIVE, KHAKI, BLAZE, STEEL, PAPER, INK } from '../constants/theme.js';

/**
 * CollapsibleSection — sezione raggruppata/collassabile per Home
 * - id: chiave localStorage `o40_home_acc_<id>` ('1' aperto, '0' chiuso)
 * - title: titolo header
 * - icon: componente lucide
 * - badge: stringa sintetica visibile anche chiuso (es. "1/8 · 42%")
 * - defaultOpen: se true, aperta di default alla prima visita
 * - children: contenuto
 */
export default function CollapsibleSection({
  id,
  title,
  icon: Icon,
  badge,
  defaultOpen = false,
  children,
}) {
  const storageKey = `o40_home_acc_${id}`;
  const [open, setOpen] = useState(() => {
    try {
      const v = localStorage.getItem(storageKey);
      if (v !== null) return v === '1';
    } catch {}
    return defaultOpen;
  });
  const contentRef = useRef(null);
  const [height, setHeight] = useState(open ? 'auto' : 0);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, open ? '1' : '0');
    } catch {}
    if (contentRef.current) {
      if (open) {
        const h = contentRef.current.scrollHeight;
        setHeight(h);
        // dopo animazione, lascia auto per adattarsi a contenuto dinamico
        const t = setTimeout(() => setHeight('auto'), 280);
        return () => clearTimeout(t);
      } else {
        // da auto a px per animare chiusura
        if (height === 'auto') {
          const h = contentRef.current.scrollHeight;
          setHeight(h);
          requestAnimationFrame(() => requestAnimationFrame(() => setHeight(0)));
        } else {
          setHeight(0);
        }
      }
    }
  }, [open]);

  // misura iniziale se aperto
  useEffect(() => {
    if (open && contentRef.current && height === 0) {
      setHeight(contentRef.current.scrollHeight);
      const t = setTimeout(() => setHeight('auto'), 280);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div
      style={{
        margin: '0 16px 12px',
        background: `linear-gradient(135deg, ${INK} 0%, #1E2318 100%)`,
        border: `1px solid ${open ? OLIVE : `${OLIVE}88`}`,
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: open ? '0 4px 16px rgba(0,0,0,0.25)' : 'none',
        transition: 'border-color 0.2s',
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 14px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {Icon && (
          <Icon
            size={16}
            color={open ? BLAZE : KHAKI}
            style={{ flexShrink: 0, transition: 'color 0.2s' }}
          />
        )}
        <span
          className="o40-mono"
          style={{
            color: open ? PAPER : KHAKI,
            fontSize: 11,
            letterSpacing: '0.08em',
            flex: 1,
            fontWeight: 600,
          }}
        >
          {title}
        </span>
        {badge && (
          <span
            className="o40-mono"
            style={{
              color: open ? KHAKI : STEEL,
              fontSize: 10,
              background: open ? `${KHAKI}18` : `${OLIVE}22`,
              border: `1px solid ${open ? `${KHAKI}44` : OLIVE}`,
              borderRadius: 20,
              padding: '2px 8px',
              flexShrink: 0,
            }}
          >
            {badge}
          </span>
        )}
        <ChevronRight
          size={16}
          color={STEEL}
          style={{
            flexShrink: 0,
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.22s ease',
          }}
        />
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: height === 'auto' ? 'none' : height,
          height: height === 'auto' ? 'auto' : height,
          overflow: 'hidden',
          opacity: open ? 1 : 0,
          transition:
            height === 'auto'
              ? 'opacity 0.22s ease'
              : 'max-height 0.28s ease, height 0.28s ease, opacity 0.22s ease',
        }}
        aria-hidden={!open}
      >
        <div
          style={{
            padding: open ? '0 14px 14px' : '0 14px',
            opacity: open ? 1 : 0,
            transition: 'opacity 0.22s ease',
            pointerEvents: open ? 'auto' : 'none',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
