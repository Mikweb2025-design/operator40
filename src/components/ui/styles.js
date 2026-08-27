import { INK, INK_2, PAPER, OLIVE, KHAKI, BLAZE, BLAZE_DEEP } from '../../constants/theme.js';

/**
 * UI condivisi — stili deduplicati (audit/3-dedup-ui)
 * Prima duplicati in 6+ screen (Setup, Builder, Preview, Summary, History, Session, TopBar, App)
 */

export const inputStyle = {
  width: '100%',
  background: INK_2,
  border: `1px solid ${OLIVE}`,
  borderRadius: 12,
  padding: '12px 14px',
  color: PAPER,
  fontSize: 16,
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
};

export const primaryBtn = {
  background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`,
  color: PAPER,
  border: 'none',
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
};

export const primaryBtnLarge = {
  ...primaryBtn,
  padding: '15px 18px',
  fontSize: 18,
  letterSpacing: '0.06em',
  boxShadow: `0 6px 20px ${BLAZE}4d`,
};

export const secondaryBtn = {
  background: INK_2,
  border: `1px solid ${KHAKI}`,
  color: PAPER,
  borderRadius: 14,
  padding: '12px 16px',
  fontFamily: "'Bebas Neue',sans-serif",
  fontSize: 16,
  letterSpacing: '0.05em',
  cursor: 'pointer',
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
  border: `1px solid ${OLIVE}`,
  background: `linear-gradient(160deg, ${INK_2}, ${INK})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
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
