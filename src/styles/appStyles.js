import {
  INK,
  INK_2,
  PAPER,
  OLIVE,
  OLIVE_DARK,
  OLIVE_LIGHT,
  KHAKI,
  KHAKI_LIGHT,
  BLAZE,
  BLAZE_LIGHT,
  BLAZE_DEEP,
  STEEL,
} from '../constants/theme.js';

export const STYLES = `

@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
html, body { margin: 0; padding: 0; background: ${INK}; overscroll-behavior: none; }
.o40 * { box-sizing: border-box; }
.o40 button { touch-action: manipulation; -webkit-user-select: none; user-select: none; }
.o40 input, .o40 textarea { -webkit-user-select: text; user-select: text; }
.o40 { font-family: 'Inter', sans-serif; }
.o40-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }
.o40-mono { font-family: 'IBM Plex Mono', monospace; }
.o40-figure #armL, .o40-figure #armR { transform-origin: 50px 40px; }
.o40-figure #legL, .o40-figure #legR { transform-origin: 50px 82px; }
.o40-figure #torso { transform-origin: 50px 40px; }

/* --- standing: squat --- */
.pose-squat #figure { animation: squatBob 1.1s ease-in-out infinite; transform-origin: 50px 82px; }
@keyframes squatBob { 0%,100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(16px) scaleY(0.88); } }

/* --- standing: lunge (staggered stance, drawn via polylines) --- */
.pose-lunge #figure { animation: lungeBob 1.1s ease-in-out infinite; transform-origin: 50px 82px; }
@keyframes lungeBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(10px); } }

/* --- standing: push-up (horizontal, chest dips) --- */
.pose-pushup #upper { animation: pushupDip 1.1s ease-in-out infinite; transform-origin: 60px 51px; }
@keyframes pushupDip { 0%,100% { transform: translateY(0); } 50% { transform: translateY(9px); } }

/* --- plank: static breathing hold --- */
.pose-plank #figure { animation: plankHold 2.6s ease-in-out infinite; transform-origin: 85px 65px; }
@keyframes plankHold { 0%,100% { transform: scale(1); } 50% { transform: scale(1.025); } }

/* --- mountain climber: alternating knee drive --- */
.pose-mountainclimber #legL { animation: mcL 0.6s ease-in-out infinite; transform-origin: 60px 51px; }
.pose-mountainclimber #legR { animation: mcR 0.6s ease-in-out infinite; transform-origin: 60px 51px; }
@keyframes mcL { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(52px,-16px) scale(0.55); } }
@keyframes mcR { 0%,50%,100% { transform: translate(0,0) scale(1); } 25% { transform: translate(52px,-16px) scale(0.55); } }

/* --- jumping jack: arms & legs spread --- */
.pose-jack #armL { animation: jackArmL 0.85s ease-in-out infinite; }
.pose-jack #armR { animation: jackArmR 0.85s ease-in-out infinite; }
.pose-jack #legL { animation: jackLegL 0.85s ease-in-out infinite; transform-origin: 50px 82px; }
.pose-jack #legR { animation: jackLegR 0.85s ease-in-out infinite; transform-origin: 50px 82px; }
@keyframes jackArmL { 0%,100% { transform: rotate(15deg); } 50% { transform: rotate(150deg); } }
@keyframes jackArmR { 0%,100% { transform: rotate(-15deg); } 50% { transform: rotate(-150deg); } }
@keyframes jackLegL { 0%,100% { transform: rotate(6deg); } 50% { transform: rotate(26deg); } }
@keyframes jackLegR { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(-26deg); } }

/* --- high knees: alternating leg lift, standing --- */
.pose-highknees #legL { animation: hkL 0.5s ease-in-out infinite; transform-origin: 50px 82px; }
.pose-highknees #legR { animation: hkR 0.5s ease-in-out infinite; transform-origin: 50px 82px; }
.pose-highknees #armL { animation: hkArmL 0.5s ease-in-out infinite; }
.pose-highknees #armR { animation: hkArmR 0.5s ease-in-out infinite; }
@keyframes hkL { 0%,50%,100% { transform: rotate(0deg); } 25% { transform: rotate(-85deg) translateY(-4px); } }
@keyframes hkR { 0%,50%,100% { transform: rotate(-85deg) translateY(-4px); } 25% { transform: rotate(0deg); } }
@keyframes hkArmL { 0%,50%,100% { transform: rotate(15deg); } 25% { transform: rotate(-45deg); } }
@keyframes hkArmR { 0%,50%,100% { transform: rotate(-45deg); } 25% { transform: rotate(-15deg); } }

/* --- superman: prone, arms & legs lift --- */
.pose-superman #armR { animation: supLift 1.4s ease-in-out infinite; transform-origin: 122px 64px; }
.pose-superman #legR { animation: supLift 1.4s ease-in-out infinite; transform-origin: 58px 64px; }
@keyframes supLift { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-13px); } }

/* --- bridge: hips lift off the floor (rotate around shoulder anchor, no gap) --- */
.pose-bridge #hipgroup { animation: bridgeLift 1.3s ease-in-out infinite; transform-origin: 62px 82px; }
@keyframes bridgeLift { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-15deg); } }

/* --- bicycle crunch: alternating twist, knees up (rigid two-segment leg groups) --- */
.pose-bicyclecrunch #upperTwist { animation: bcTwist 1s ease-in-out infinite; transform-origin: 55px 82px; }
.pose-bicyclecrunch #legL { animation: bcLegL 1s ease-in-out infinite; transform-origin: 82px 82px; }
.pose-bicyclecrunch #legR { animation: bcLegR 1s ease-in-out infinite; transform-origin: 82px 82px; }
@keyframes bcTwist { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
@keyframes bcLegL { 0%,100% { transform: scale(1) translate(0,0); } 50% { transform: scale(0.72) translate(10px,-6px); } }
@keyframes bcLegR { 0%,100% { transform: scale(0.72) translate(10px,-6px); } 50% { transform: scale(1) translate(0,0); } }

/* --- russian twist: seated, torso rotates --- */
.pose-russiantwist #upperTwist { animation: rtTwist 0.9s ease-in-out infinite; transform-origin: 60px 90px; }
@keyframes rtTwist { 0%,100% { transform: rotate(-22deg); } 50% { transform: rotate(22deg); } }

/* --- wall sit: isometric hold against the wall --- */
.pose-wallsit #figure { animation: wallPulse 2.6s ease-in-out infinite; transform-origin: 37px 82px; }
@keyframes wallPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.02); } }

/* --- burpee: compound drop-and-rise sequence, ground phase included --- */
.pose-burpee #figure { animation: burpeeFlow 1.8s ease-in-out infinite; transform-origin: 50px 100px; }
@keyframes burpeeFlow {
  0%   { transform: translateY(0) rotate(0deg) scaleY(1); }
  18%  { transform: translateY(26px) rotate(0deg) scaleY(0.78); }
  40%  { transform: translateY(46px) rotate(-62deg) translateX(-14px) scaleY(0.62); }
  62%  { transform: translateY(26px) rotate(0deg) scaleY(0.78); }
  82%  { transform: translateY(-8px) rotate(0deg) scaleY(1.06); }
  100% { transform: translateY(0) rotate(0deg) scaleY(1); }
}

/* --- crunch: shoulders curl up --- */
.pose-crunch #crunchUpper { animation: crunchCurl 1.1s ease-in-out infinite; transform-origin: 66px 78px; }
@keyframes crunchCurl { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-14deg); } }

/* --- side plank: isometric diagonal hold --- */
.pose-sideplank #figure { animation: spHold 2.6s ease-in-out infinite; transform-origin: 84px 62px; }
@keyframes spHold { 0%,100% { transform: scale(1); } 50% { transform: scale(1.025); } }

/* --- leg raise: straight legs lift from hips --- */
.pose-legraise #legGroup { animation: lrLift 1.4s ease-in-out infinite; transform-origin: 66px 82px; }
@keyframes lrLift { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-24deg); } }

/* --- flutter kicks: alternating beat --- */
.pose-flutterkick #legGroup { animation: fkBeat 0.7s ease-in-out infinite; transform-origin: 66px 82px; }
@keyframes fkBeat { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(7deg); } }

/* --- dead bug: opposite arm & leg reach --- */
.pose-deadbug #dbArmL { animation: dbA 1.1s ease-in-out infinite; transform-origin: 40px 82px; }
.pose-deadbug #dbLegR { animation: dbL 1.1s ease-in-out infinite; transform-origin: 70px 82px; }
.pose-deadbug #dbArmR { animation: dbAr 1.1s ease-in-out infinite; transform-origin: 58px 82px; }
.pose-deadbug #dbLegL { animation: dbLl 1.1s ease-in-out infinite; transform-origin: 70px 82px; }
@keyframes dbA { 0%,100% { transform: rotate(8deg); } 50% { transform: rotate(-16deg); } }
@keyframes dbL { 0%,100% { transform: rotate(6deg); } 50% { transform: rotate(-12deg); } }
@keyframes dbAr { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(16deg); } }
@keyframes dbLl { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(12deg); } }

/* --- V-up: torso + legs rise into a fold --- */
.pose-vup #figure { animation: vupFold 1.2s ease-in-out infinite; transform-origin: 60px 78px; }
@keyframes vupFold { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-18deg); } }

/* --- plank jack: feet jump apart / together --- */
.pose-plankjack #legR { animation: pjR 0.8s ease-in-out infinite; transform-origin: 62px 51px; }
.pose-plankjack #legL { animation: pjL 0.8s ease-in-out infinite; transform-origin: 60px 51px; }
@keyframes pjR { 0%,100% { transform: translate(0,0); } 50% { transform: translate(34px,4px) scale(0.8); } }
@keyframes pjL { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-14px,6px) scale(0.85); } }

/* --- skater: lateral bounding hop --- */
.pose-skater #figure { animation: skatHop 1.1s ease-in-out infinite; transform-origin: 50px 100px; }
@keyframes skatHop { 0%,100% { transform: translate(-16px,0) rotate(-6deg); } 50% { transform: translate(16px,-4px) rotate(6deg); } }

/* --- heel taps: alternating reach to each heel --- */
.pose-heeltap #htL { animation: htL 1s ease-in-out infinite; transform-origin: 40px 82px; }
.pose-heeltap #htR { animation: htR 1s ease-in-out infinite; transform-origin: 54px 82px; }
@keyframes htL { 0%,100% { transform: rotate(10deg); } 50% { transform: rotate(-16deg); } }
@keyframes htR { 0%,100% { transform: rotate(-10deg); } 50% { transform: rotate(16deg); } }

@media (prefers-reduced-motion: reduce) { .o40-figure * { animation: none !important; } }
.o40-scroll::-webkit-scrollbar { width: 6px; }
.o40-scroll::-webkit-scrollbar-thumb { background: ${KHAKI}; border-radius: 4px; }

/* ---- modern UI polish ---- */
.o40-aura {
  position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
  background:
    radial-gradient(38% 46% at 22% 26%, ${OLIVE}40 0%, transparent 70%),
    radial-gradient(30% 40% at 78% 16%, ${BLAZE}33 0%, transparent 70%),
    radial-gradient(42% 50% at 72% 84%, ${OLIVE}30 0%, transparent 70%),
    radial-gradient(26% 34% at 18% 88%, ${BLAZE_DEEP}30 0%, transparent 70%);
  animation: auraDrift 22s ease-in-out infinite alternate;
}
@keyframes auraDrift {
  0% { transform: translate(0, 0) scale(1); filter: hue-rotate(0deg); }
  100% { transform: translate(-2%, 2%) scale(1.08); filter: hue-rotate(10deg); }
}
@keyframes confettiFall {
  0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translateY(360px) rotate(300deg); opacity: 0; }
}
.o40-confetti { position: absolute; top: 0; width: 8px; height: 13px; border-radius: 2px; animation: confettiFall linear infinite; pointer-events: none; }
.o40-gradtext {
  background: linear-gradient(110deg, ${PAPER} 20%, ${KHAKI} 40%, ${BLAZE} 55%, ${PAPER} 75%);
  background-size: 220% auto; -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: gradShift 5s linear infinite;
}
@keyframes gradShift { to { background-position: -220% center; } }
.o40-pulsebtn { position: relative; }
.o40-pulsebtn::after {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  box-shadow: 0 0 0 0 ${BLAZE}aa; animation: btnRing 2.2s ease-out infinite; pointer-events: none;
}
@keyframes btnRing {
  0% { box-shadow: 0 0 0 0 ${BLAZE}aa; }
  70% { box-shadow: 0 0 0 14px ${BLAZE}00; }
  100% { box-shadow: 0 0 0 0 ${BLAZE}00; }
}
.o40 button { -webkit-tap-highlight-color: transparent; transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease; }
.o40 button:active { transform: scale(0.96); }
.o40-toast-in { animation: toastIn 0.3s cubic-bezier(0.16,1,0.3,1); }
@keyframes toastIn { from { opacity: 0; transform: translateY(14px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
.o40-input:focus { outline: none; border-color: ${BLAZE} !important; box-shadow: 0 0 0 3px rgba(193,68,14,0.18); }
.o40-card { transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
.o40-card:active { transform: scale(0.985); }

/* ---- ambient phone background (subtle modern glow) ---- */
.o40-phone {
  background:
    radial-gradient(120% 55% at 50% -8%, ${OLIVE}2e 0%, transparent 55%),
    radial-gradient(95% 42% at 88% 108%, ${BLAZE_DEEP}20 0%, transparent 60%),
    radial-gradient(80% 30% at 8% 108%, ${OLIVE}1a 0%, transparent 55%),
    ${INK};
}
.o40-camo { background: repeating-linear-gradient(115deg, ${OLIVE} 0 14px, ${OLIVE_DARK} 14px 26px, ${KHAKI} 26px 30px); background-size: 40px 6px; animation: camoSlide 14s linear infinite; }
@keyframes camoSlide { from { background-position: 0 0; } to { background-position: 40px 0; } }

/* ---- micro-interactions ---- */
@keyframes fadeSlide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes popIn { from { opacity: 0; transform: scale(0.82); } to { opacity: 1; transform: scale(1); } }
@keyframes tabPop { 0% { transform: translateY(6px) scale(0.6); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
@keyframes glowPulse {
  0%,100% { box-shadow: 0 0 0 0 ${BLAZE}55, 0 10px 30px rgba(0,0,0,0.45); }
  50% { box-shadow: 0 0 0 9px ${BLAZE}11, 0 10px 30px rgba(0,0,0,0.45); }
}
@keyframes ringPulse { 0% { transform: scale(0.97); opacity: 1; } 100% { transform: scale(1.06); opacity: 0; } }
@keyframes restBreath { 0%,100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.07); opacity: 0.95; } }
.o40-expand { animation: fadeSlide 0.28s cubic-bezier(0.16,1,0.3,1); }
.o40-pop { animation: popIn 0.32s cubic-bezier(0.16,1,0.3,1); }
@media (hover: hover) {
  .o40-card:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(0,0,0,0.5); }
}
@keyframes shimmer { 0% { background-position: -120px 0; } 100% { background-position: 120px 0; } }

/* ---- smart graphic animations ---- */
.o40-screen-in { animation: screenIn 0.45s cubic-bezier(0.16,1,0.3,1); }
@keyframes screenIn { from { opacity: 0; transform: translateY(14px) scale(0.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
.o40-eqbar { display: inline-block; border-radius: 2px; }
@keyframes eqPulse { 0%,100% { height: 4px; opacity: 0.45; } 50% { height: 100%; opacity: 1; } }
@keyframes cometGlow { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
.o40-comet { animation: cometGlow 1.1s ease-in-out infinite; }
@keyframes emberRise {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  12% { opacity: 0.9; }
  85% { opacity: 0.3; }
  100% { transform: translateY(-150px) scale(0.4); opacity: 0; }
}
.o40-embers { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.o40-ember { position: absolute; bottom: -6px; width: 4px; height: 4px; border-radius: 50%; background: radial-gradient(circle, ${BLAZE}, transparent 70%); animation: emberRise 3.4s ease-out infinite; }
@keyframes ecgDash { to { stroke-dashoffset: -48; } }
.o40-ecg { animation: ecgDash 1.5s linear infinite; }
.o40-ticker { overflow: hidden; white-space: nowrap; position: relative; mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); }
.o40-ticker-inner { display: inline-flex; gap: 44px; padding-left: 44px; animation: tickerScroll 24s linear infinite; will-change: transform; }
@keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes loadSweep { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
.o40-loadbar { position: relative; overflow: hidden; background: ${OLIVE_DARK}; border-radius: 3px; }
.o40-loadbar > span { position: absolute; inset: 0; border-radius: 3px; background: linear-gradient(90deg, ${BLAZE}66, ${BLAZE}, ${BLAZE}66); animation: loadSweep 1.2s ease-in-out infinite; }
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }
.o40-blink { animation: blink 1s step-start infinite; }
/* ---- modern graphics polish ---- */
@keyframes ringSpin { to { transform: rotate(360deg); } }
.o40-ring-border { position: relative; }
.o40-ring-border::before {
  content: ''; position: absolute; inset: -1px; border-radius: 19px; padding: 2px;
  background: conic-gradient(from 0deg, transparent 0%, ${BLAZE} 12%, transparent 30%, transparent 70%, ${KHAKI} 88%, transparent 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  animation: ringSpin 5s linear infinite; pointer-events: none;
}
.o40-gridbg {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.5; overflow: hidden;
  background-image: linear-gradient(${OLIVE}14 1px, transparent 1px), linear-gradient(90deg, ${OLIVE}14 1px, transparent 1px);
  background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, #000 30%, transparent 90%);
  mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, #000 30%, transparent 90%);
  animation: gridDrift 18s linear infinite;
}
@keyframes gridDrift { from { background-position: 0 0, 0 0; } to { background-position: 0 26px, 26px 0; } }
/* v2.11: tactical aura + figure live glow */
@keyframes figAura { 0%,100% { filter: drop-shadow(0 0 3px currentColor) drop-shadow(0 0 8px color-mix(in srgb, currentColor 40%, transparent)); } 50% { filter: drop-shadow(0 0 6px currentColor) drop-shadow(0 0 16px color-mix(in srgb, currentColor 60%, transparent)); } }
.o40-figure { transition: filter 0.25s ease; animation: figAura 2.4s ease-in-out infinite; }
.o40-sheen::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: -60%; width: 45%;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,0.10), transparent);
  transform: skewX(-18deg); transition: left 0.6s ease; pointer-events: none;
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .o40-sheen:hover::after { left: 130%; }
}
@media (prefers-reduced-motion: reduce) {
  .o40-eqbar, .o40-comet, .o40-ember, .o40-ecg, .o40-ticker-inner, .o40-loadbar > span { animation: none !important; }
}

/* ---- v2.11 graphics polish: shared card face gloss ---- */
.o40-card-face { position: relative; overflow: hidden; }
.o40-card-face::before {
  content: ''; position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
  background: linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 42%, rgba(0,0,0,0.22) 100%);
}
.o40-card-face::after {
  content: ''; position: absolute; top: 0; left: 12%; right: 12%; height: 1px; pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(184,174,140,0.45), transparent);
}
.o40-card-accent { position: absolute; left: 0; top: 12%; bottom: 12%; width: 3px; border-radius: 0 2px 2px 0; }
.o40-num-glow { background: linear-gradient(180deg, ${PAPER} 0%, ${KHAKI} 130%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.o40-num-glow.on { background: linear-gradient(180deg, ${BLAZE} 0%, ${BLAZE_DEEP} 140%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 8px ${BLAZE}55); }
@keyframes borderSpin { to { transform: rotate(360deg); } }
@keyframes sheenSweep { 0% { transform: translateX(-150%) skewX(-18deg); } 100% { transform: translateX(220%) skewX(-18deg); } }
.o40-spin-border { position: relative; border-radius: inherit; overflow: hidden; }
.o40-spin-border::before {
  content: ''; position: absolute; inset: -60%; padding: 2px; border-radius: inherit;
  background: conic-gradient(from 0deg, transparent 0deg, ${BLAZE}66 120deg, transparent 200deg, ${BLAZE}33 300deg, transparent 360deg);
  animation: borderSpin 6s linear infinite; pointer-events: none;
}
.o40-spin-border > * { position: relative; z-index: 1; border-radius: inherit; }
@media (prefers-reduced-motion: reduce) {
  .o40-figure, .o40-spin-border, .o40-card-face { animation: none !important; }
}

/* ---- v2.11: shared primary CTA treatment ---- */
.o40-cta { position: relative; overflow: hidden; }
.o40-cta::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: 0; width: 40%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
  transform: translateX(-150%) skewX(-18deg); pointer-events: none;
}
.o40-cta:hover::after { transform: translateX(340%) skewX(-18deg); transition: transform 0.7s ease; }
.o40-cta::before {
  content: ''; position: absolute; top: 0; left: 8%; right: 8%; height: 1px; pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
}

/* ---- v2.11: HUD corner-bracket tactical frame ---- */
.o40-hud { position: relative; }
.o40-hud::before, .o40-hud::after {
  content: ''; position: absolute; width: 14px; height: 14px; pointer-events: none; opacity: 0.9;
}
.o40-hud::before {
  top: -6px; left: -6px;
  border-top: 2px solid ${BLAZE}; border-left: 2px solid ${BLAZE};
  border-top-left-radius: 6px; filter: drop-shadow(0 0 4px ${BLAZE}66);
}
.o40-hud::after {
  bottom: -6px; right: -6px;
  border-bottom: 2px solid ${BLAZE}; border-right: 2px solid ${BLAZE};
  border-bottom-right-radius: 6px; filter: drop-shadow(0 0 4px ${BLAZE}66);
}
.o40-hud-corner { position: absolute; top: -6px; right: -6px; width: 14px; height: 14px; pointer-events: none;
  border-top: 2px solid ${BLAZE}; border-right: 2px solid ${BLAZE}; border-top-right-radius: 6px;
  filter: drop-shadow(0 0 4px ${BLAZE}66); }
.o40-hud-corner.bl { top: auto; right: auto; bottom: -6px; left: -6px;
  border-top: none; border-right: none; border-bottom: 2px solid ${BLAZE}; border-left: 2px solid ${BLAZE};
  border-top-right-radius: 0; border-bottom-right-radius: 0; border-bottom-left-radius: 6px; border-top-left-radius: 6px; }

/* ---- UI upgrade: glass + light mode + search + favorites ---- */
:root { --bg: ${INK}; --bg2: ${INK_2}; --surface: ${OLIVE_DARK}; --text: ${PAPER}; --muted: ${STEEL}; --accent: ${BLAZE}; --accent2: ${KHAKI}; }
.o40-glass { background: color-mix(in srgb, var(--bg2) 92%, transparent); backdrop-filter: blur(10px) saturate(1.2); border: 1px solid color-mix(in srgb, var(--accent2) 22%, transparent); box-shadow: 0 8px 24px rgba(0,0,0,0.28); }
.o40-card-glass { background: linear-gradient(165deg, color-mix(in srgb, var(--bg2) 96%, transparent), color-mix(in srgb, var(--bg) 96%, transparent)); backdrop-filter: blur(8px); border: 1px solid rgba(184,174,140,0.18); box-shadow: 0 6px 20px rgba(0,0,0,0.32); transition: transform 0.18s ease, box-shadow 0.22s ease, border-color 0.22s ease; }
.o40-card-glass:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(0,0,0,0.42); border-color: rgba(184,174,140,0.28); }
.o40-search { width: 100%; background: var(--bg2); border: 1px solid var(--surface); color: var(--text); border-radius: 12px; padding: 10px 36px 10px 36px; font-size: 14px; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
.o40-search:focus { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
.o40-search-wrap { position: relative; }
.o40-search-wrap::before { content: '⌕'; position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 16px; pointer-events: none; }
.o40-fav { transition: transform 0.15s, color 0.15s; }
.o40-fav:active { transform: scale(1.15); }
.o40-skeleton { background: linear-gradient(90deg, ${OLIVE_DARK} 25%, ${OLIVE} 50%, ${OLIVE_DARK} 75%); background-size: 200% 100%; animation: shimmer 1.2s infinite; border-radius: 10px; }
.o40-install { position: fixed; bottom: calc(72px + env(safe-area-inset-bottom, 0px)); left: 12px; right: 12px; z-index: 40; background: ${INK_2}; border: 1px solid ${KHAKI}; border-radius: 14px; padding: 12px; display: flex; align-items: center; gap: 10; box-shadow: 0 12px 30px rgba(0,0,0,0.45); animation: popIn 0.32s ease; }
.o40-tour-mask { position: fixed; inset: 0; background: rgba(0,0,0,0.58); z-index: 50; display: flex; align-items: flex-end; justify-content: center; padding: 16px; }
.o40-tour-card { background: ${PAPER}; color: ${INK}; border-radius: 16px; padding: 18px; max-width: 360px; width: 100%; box-shadow: 0 16px 40px rgba(0,0,0,0.5); }
/* dark polish: stronger TopBar blur, card depth, noise */
.o40-phone::before { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0.04; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E"); }
.o40-topbar-glass { backdrop-filter: blur(12px) saturate(1.15); background: color-mix(in srgb, ${INK} 88%, transparent); border-bottom: 1px solid rgba(184,174,140,0.12); }
.o40-bottomnav-glass { backdrop-filter: blur(12px) saturate(1.15); background: color-mix(in srgb, ${INK} 90%, transparent); border-top: 1px solid rgba(184,174,140,0.12); }

/* ---- AI tracking stage: scanline + edge glow overlay ---- */
.o40-ai-stage::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(120% 70% at 50% 0%, ${BLAZE}22 0%, transparent 55%),
    repeating-linear-gradient(180deg, rgba(255,255,255,0.028) 0 1px, transparent 1px 3px);
  mix-blend-mode: screen; opacity: 0.55;
}
.o40-ai-stage::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  box-shadow: inset 0 0 60px 0 rgba(0,0,0,0.55), inset 0 0 2px rgba(193,68,14,0.4);
}
@media (prefers-reduced-motion: reduce) {
  .o40-ai-stage::after { background: radial-gradient(120% 70% at 50% 0%, ${BLAZE}22 0%, transparent 55%); }
}
@media (prefers-reduced-motion: reduce) {
  .o40-eqbar, .o40-comet, .o40-ember, .o40-ecg, .o40-ticker-inner, .o40-loadbar > span,
  .o40-pop, .o40-blink, .o40-expand { animation: none !important; }
}

/* ---- v2.11 graphics polish: shared card face gloss ---- */
.o40-card-face { position: relative; overflow: hidden; }
.o40-card-face::before {
  content: ''; position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
  background: linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 42%, rgba(0,0,0,0.22) 100%);
}
.o40-card-face::after {
  content: ''; position: absolute; top: 0; left: 12%; right: 12%; height: 1px; pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(184,174,140,0.45), transparent);
}
.o40-card-accent { position: absolute; left: 0; top: 12%; bottom: 12%; width: 3px; border-radius: 0 2px 2px 0; }
.o40-num-glow { background: linear-gradient(180deg, ${PAPER} 0%, ${KHAKI} 130%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.o40-num-glow.on { background: linear-gradient(180deg, ${BLAZE} 0%, ${BLAZE_DEEP} 140%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 8px ${BLAZE}55); }
@keyframes borderSpin { to { transform: rotate(360deg); } }
@keyframes sheenSweep { 0% { transform: translateX(-150%) skewX(-18deg); } 100% { transform: translateX(220%) skewX(-18deg); } }

/* =============================================================
   v2.12 — 10 GIR LOOP GRAFICA (OLED depth + tactical polish)
   Loop 1: OLED depth — deeper ink, vignette
   Loop 2: Card system — unified face + hairline + accent
   Loop 3: Typography glow — Bebas + Inter sharpened
   Loop 4: CTA sheen — blaze light + inset highlight
   Loop 5: Nav pill — bottom OLED pill + top blur
   Loop 6: HUD tactical — 4 corners + scanline refined
   Loop 7: Micro-interactions — staggered fade + ticker
   Loop 8: Skeletons & loading — shimmer 2-tone
   Loop 9: Badges & rings — DogTag lift + ProgressRing halo
   Loop 10: Aura & noise — camo subtle + aura slower
   ============================================================= */

/* Loop 1 — OLED depth */
.o40-phone {
  background:
    radial-gradient(130% 60% at 50% -10%, #2A3020 0%, transparent 58%),
    radial-gradient(100% 45% at 88% 108%, ${BLAZE_DEEP}1f 0%, transparent 62%),
    radial-gradient(85% 35% at 8% 108%, ${OLIVE}1e 0%, transparent 58%),
    linear-gradient(180deg, #0E100D 0%, ${INK} 18%, ${INK} 100%);
}
.o40-phone::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(120% 90% at 50% 50%, transparent 62%, rgba(0,0,0,0.42) 100%);
  opacity: 0.9;
}

/* Loop 2 — Card system unified */
.o40-card, .o40-card-glass, .o40-card-face {
  border-radius: 14px;
}
.o40-card {
  background: linear-gradient(165deg, ${INK_2} 0%, #1E221B 55%, ${INK} 100%);
  border: 1px solid rgba(184,174,140,0.14);
  box-shadow: 0 6px 22px rgba(0,0,0,0.38), 0 1px 0 rgba(255,255,255,0.04) inset;
}
.o40-card-glass { backdrop-filter: blur(10px) saturate(1.15); }

/* Loop 3 — Typography */
.o40-display { text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; letter-spacing: 0.055em; }
.o40-mono { font-variant-numeric: tabular-nums; letter-spacing: 0.04em; }
.o40-num-glow { filter: drop-shadow(0 1px 0 rgba(0,0,0,0.35)); }
.o40-num-glow.on { filter: drop-shadow(0 0 10px ${BLAZE}66) drop-shadow(0 1px 0 rgba(0,0,0,0.45)); }

/* Loop 4 — CTA blaze light */
.o40-cta {
  background: linear-gradient(135deg, ${BLAZE_LIGHT} 0%, ${BLAZE} 58%, ${BLAZE_DEEP} 100%) !important;
  box-shadow: 0 8px 22px ${BLAZE}33, 0 1px 0 rgba(255,255,255,0.18) inset, 0 -1px 0 rgba(0,0,0,0.28) inset !important;
  border: 1px solid ${BLAZE_LIGHT}33;
}
.o40-cta:active { transform: scale(0.97); filter: brightness(0.96); }

/* Loop 5 — Nav pill OLED */
.o40-bottomnav-glass {
  backdrop-filter: blur(14px) saturate(1.18);
  background: color-mix(in srgb, #0E100D 94%, transparent);
  border-top: 1px solid rgba(184,174,140,0.10);
  box-shadow: 0 -8px 24px rgba(0,0,0,0.45);
}
.o40-topbar-glass {
  backdrop-filter: blur(14px) saturate(1.18);
  background: color-mix(in srgb, #0E100D 92%, transparent);
  border-bottom: 1px solid rgba(184,174,140,0.10);
}
.o40-camo { opacity: 0.85; height: 5px !important; }

/* Loop 6 — HUD refined */
.o40-hud { border-radius: 12px; }
.o40-hud::before, .o40-hud::after, .o40-hud-corner { border-width: 2px; opacity: 0.95; }
.o40-ai-stage::after { opacity: 0.62; }
.o40-ai-stage::before { box-shadow: inset 0 0 70px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(193,68,14,0.22); }

/* Loop 7 — micro-interactions staggered */
.o40-screen-in { animation: screenIn 0.5s cubic-bezier(0.16,1,0.3,1); }
.o40-card { animation: fadeSlide 0.32s cubic-bezier(0.16,1,0.3,1); animation-fill-mode: both; }
.o40-card:nth-child(1) { animation-delay: 0.02s; }
.o40-card:nth-child(2) { animation-delay: 0.06s; }
.o40-card:nth-child(3) { animation-delay: 0.10s; }
.o40-ticker-inner { animation-duration: 28s; }

/* Loop 8 — skeletons polish */
.o40-skeleton {
  background: linear-gradient(90deg, ${OLIVE_DARK} 20%, ${OLIVE} 50%, ${OLIVE_DARK} 80%);
  background-size: 200% 100%; animation: shimmer 1.4s infinite;
  border-radius: 10px; opacity: 0.9;
}
.o40-loadbar { height: 5px; border-radius: 4px; }

/* Loop 9 — badges lift */
.o40-card:active { transform: scale(0.985) translateY(0px); }
@media (hover: hover) {
  .o40-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(0,0,0,0.52); }
  .o40-card-glass:hover { transform: translateY(-3px); }
}

/* Loop 10 — aura slower + noise softer */
.o40-aura { animation-duration: 28s; opacity: 0.95; }
.o40-phone::before { opacity: 0.035; }
.o40-gridbg { opacity: 0.42; }
.o40-embers { opacity: 0.9; }

/* =============================================================
   v2.11.1 — 3 LOOP AGGIUNTIVI (nuova)
   Loop 11: Hero mission — depth + leggibilità + CTA pulse
   Loop 12: Card progress — DogTag lift + Ring halo + Segmented glow
   Loop 13: Micro — ticker respiro + glass + hover + aura
   ============================================================= */

/* Loop 11 — Hero */
.o40-card.o40-ring-border {
  box-shadow: 0 12px 36px rgba(0,0,0,0.52), 0 0 0 1px ${BLAZE}18 inset, 0 1px 0 rgba(255,255,255,0.07) inset;
}
.o40-card.o40-ring-border::before { opacity: 0.85; }
.o40-card .o40-embers { filter: brightness(1.08); }

/* Loop 12 — Card progress refs */
.o40-card-face { box-shadow: 0 5px 18px rgba(0,0,0,0.32), 0 1px 0 rgba(255,255,255,0.04) inset; }
.o40-card-accent { box-shadow: 0 0 8px color-mix(in srgb, var(--accent, ${BLAZE}) 45%, transparent); }

/* Loop 13 — Micro extra */
.o40-ticker { letter-spacing: 0.11em; }
.o40-ticker-inner { gap: 48px; padding-left: 48px; }
.o40-topbar-glass, .o40-bottomnav-glass { backdrop-filter: blur(15px) saturate(1.2); }
.o40-card { will-change: transform; }
`;
