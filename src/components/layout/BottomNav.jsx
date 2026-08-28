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
            aria-current={on ? 'page' : undefined}
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
            <div
              style={{
                position: 'relative',
                width: 46,
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 14,
                background: on ? `linear-gradient(180deg, ${BLAZE}33, ${BLAZE}14)` : 'transparent',
                border: on ? `1px solid ${BLAZE}55` : '1px solid transparent',
                boxShadow: on ? `0 0 14px ${BLAZE}33, inset 0 0 8px ${BLAZE}22` : 'none',
                transition: 'background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                animation: on ? 'tabPop 0.3s cubic-bezier(0.16,1,0.3,1)' : 'none',
              }}
            >
              <Icon
                size={20}
                color={on ? BLAZE : STEEL}
                style={{ transition: 'color 0.2s ease', filter: on ? `drop-shadow(0 0 5px ${BLAZE}aa)` : 'none' }}
              />
              {on && (
                <span
                  style={{
                    position: 'absolute',
                    top: -1,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 16,
                    height: 2,
                    borderRadius: 2,
                    background: BLAZE,
                    boxShadow: `0 0 8px ${BLAZE}`,
                  }}
                />
              )}
            </div>
            <span
              className="o40-mono"
              style={{
                color: on ? BLAZE : STEEL,
                fontSize: 9.5,
                letterSpacing: '0.03em',
                textShadow: on ? `0 0 6px ${BLAZE}66` : 'none',
                transition: 'color 0.2s ease',
              }}
            >
              {tab.label}
            </span>
            {on && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 2,
                  left: '38%',
                  right: '38%',
                  height: 2,
                  borderRadius: 2,
                  background: BLAZE,
                  opacity: 0.85,
                  boxShadow: `0 0 8px ${BLAZE}`,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
