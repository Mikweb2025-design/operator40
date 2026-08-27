import { INK_2, PAPER, OLIVE, KHAKI, BLAZE, STEEL } from '../../constants/theme.js';

const BUILD_VERSION = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '2.0.0 · dev';

export default function VersionBadge({ onClick }) {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      title={onClick ? 'Novità v2.8.4 — clic per riaprire changelog' : undefined}
      className="o40-mono"
      style={{
        color: STEEL,
        fontSize: 9,
        textAlign: 'center',
        opacity: onClick ? 0.95 : 0.75,
        marginTop: 18,
        letterSpacing: '0.07em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '6px 12px',
        background: `${INK_2}88`,
        border: `1px solid ${onClick ? KHAKI + '88' : OLIVE + '44'}`,
        borderRadius: 20,
        alignSelf: 'center',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#7FB069',
          boxShadow: '0 0 6px #7FB06988',
        }}
      />
      v{BUILD_VERSION}
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: BLAZE,
          boxShadow: `0 0 6px ${BLAZE}88`,
        }}
      />
      {onClick && (
        <span
          className="o40-mono"
          style={{
            color: KHAKI,
            fontSize: 8,
            border: `1px solid ${KHAKI}66`,
            borderRadius: 6,
            padding: '1px 5px',
            marginLeft: 2,
          }}
        >
          NOVITÀ
        </span>
      )}
    </div>
  );
}
