import { INK, INK_2, PAPER, OLIVE, OLIVE_LIGHT, KHAKI, BLAZE, BLAZE_LIGHT, BLAZE_DEEP } from '../../constants/theme.js';

/**
 * UI condivisi — stili deduplicati (audit/3-dedup-ui)
 * Prima duplicati in 6+ screen (Setup, Builder, Preview, Summary, History, Session, TopBar, App)
 */

export const inputStyle = {
  width: '100%',
  background: `linear-gradient(180deg, ${INK_2} 0%, #1E221B 100%)`,
  border: `1px solid ${OLIVE}`,
  borderRadius: 14,
  padding: '12px 14px',
  color: PAPER,
  fontSize: 16,
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  boxShadow: '0 2px 8px rgba(0,0,0,0.22) inset',
};

export const primaryBtn = {
  background: `linear-gradient(135deg, ${BLAZE_LIGHT} 0%, ${BLAZE} 55%, ${BLAZE_DEEP} 100%)`,
  color: PAPER,
  border: `1px solid ${BLAZE_LIGHT}33`,
  borderRadius: 14,
  padding: '12px 16px',
  fontFamily: "'Bebas Neue',sans-serif",
  fontSize: 16,
  letterSpacing: '0.05em',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  width: '100%',
  boxShadow: `0 8px 20px ${BLAZE}33, 0 1px 0 rgba(255,255,255,0.14) inset, 0 -1px 0 rgba(0,0,0,0.22) inset`,
};

export const primaryBtnLarge = {
  ...primaryBtn,
  padding: '15px 18px',
  fontSize: 18,
  letterSpacing: '0.06em',
  boxShadow: `0 10px 28px ${BLAZE}44, 0 1px 0 rgba(255,255,255,0.16) inset, 0 -1px 0 rgba(0,0,0,0.25) inset`,
};

export const secondaryBtn = {
  background: `linear-gradient(180deg, ${INK_2} 0%, #1C1F18 100%)`,
  border: `1px solid ${KHAKI}88`,
  color: PAPER,
  borderRadius: 14,
  padding: '12px 16px',
  fontFamily: "'Bebas Neue',sans-serif",
  fontSize: 16,
  letterSpacing: '0.05em',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0,0,0,0.28), 0 1px 0 rgba(255,255,255,0.06) inset',
};

export const btnIcon = {
  background: 'transparent',
  border: 'none',
  padding: 6,
  cursor: 'pointer',
  display: 'flex',
  borderRadius: 10,
};

export const iconCircle = {
  borderRadius: '50%',
  border: `1px solid ${OLIVE_LIGHT}55`,
  background: `linear-gradient(160deg, ${INK_2} 0%, ${INK} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.06) inset',
};

export const pillBtn = {
  flex: 1,
  background: INK_2,
  border: `1px solid ${OLIVE}`,
  color: PAPER,
  borderRadius: 10,
  padding: '10px 0',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 12,
  letterSpacing: '0.08em',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
};
