import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useT } from '../../context/LangContext.jsx';
import { PAPER } from '../../constants/theme.js';
import { btnIcon } from '../ui/styles.js';

export default function TopBar({ title, onBack, right }) {
  const { t } = useT();
  return (
    <div
      className="o40-topbar-glass"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'max(14px, env(safe-area-inset-top, 0px)) 16px',
        position: 'sticky',
        top: 0,
        zIndex: 5,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 32 }}>
        {onBack && (
          <button onClick={onBack} aria-label={t('app.back')} style={btnIcon}>
            <ChevronLeft size={20} color={PAPER} />
          </button>
        )}
      </div>
      <div className="o40-display" style={{ color: PAPER, fontSize: 22 }}>
        {title}
      </div>
      <div style={{ minWidth: 32, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
    </div>
  );
}
export { btnIcon };
