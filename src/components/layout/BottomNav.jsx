import React from 'react';
import { Home as HomeIcon, BookOpen, History as HistoryIcon, Settings } from 'lucide-react';
import { useT } from '../../context/LangContext.jsx';
import { BLAZE, STEEL } from '../../constants/theme.js';

export default function BottomNav({ active, onNavigate }) {
  const { t } = useT();
  const tabs = [
    { key: 'home', label: t('nav.home'), icon: HomeIcon },
    { key: 'library', label: t('nav.library'), icon: BookOpen },
    { key: 'history', label: t('nav.history'), icon: HistoryIcon },
    { key: 'setup', label: t('nav.setup'), icon: Settings },
  ];
  return (
    <div
      className="o40-bottomnav-glass"
      style={{
        display: 'flex',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {tabs.map((tab) => {
        const on = active === tab.key;
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            onClick={() => onNavigate(tab.key)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 4px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              position: 'relative',
            }}
          >
            {on && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '26%',
                  right: '26%',
                  height: 2,
                  borderRadius: 2,
                  background: BLAZE,
                  boxShadow: `0 0 8px ${BLAZE}`,
                }}
              />
            )}
            <div
              style={{
                width: 40,
                height: 26,
                borderRadius: 13,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: on ? `${BLAZE}22` : 'transparent',
                transition: 'background 0.2s ease',
                animation: on ? 'tabPop 0.28s cubic-bezier(0.16,1,0.3,1)' : 'none',
              }}
            >
              <Icon
                size={20}
                color={on ? BLAZE : STEEL}
                style={{ transition: 'color 0.2s ease' }}
              />
            </div>
            <span
              className="o40-mono"
              style={{ color: on ? BLAZE : STEEL, fontSize: 9.5, letterSpacing: '0.03em' }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
