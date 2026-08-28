import { computeBestStreak, getRank, getMedalProgress } from './stats.js';
import { getConsistencyScore } from './progress.js';
import { getSmartInsight } from './smart.js';

export async function shareStatsImage({ sessions, profile, t, tr }) {
  const W = 1080,
    H = 1350;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d');

  // --- Background ---
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#0F1210');
  bg.addColorStop(0.45, '#1B1D16');
  bg.addColorStop(1, '#2A2E22');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // subtle grid
  ctx.strokeStyle = 'rgba(184,174,140,0.06)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 42) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 42) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // camo accent top bar
  ctx.fillStyle = '#333823';
  ctx.fillRect(0, 0, W, 8);
  ctx.fillStyle = '#C1440E';
  ctx.fillRect(0, 8, W, 2);

  // card
  const pad = 36;
  const cardX = pad,
    cardY = 48,
    cardW = W - pad * 2,
    cardH = H - pad * 2 - 20;
  ctx.fillStyle = 'rgba(237,232,216,0.07)';
  ctx.strokeStyle = 'rgba(184,174,140,0.22)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  const r = 28;
  ctx.roundRect(cardX, cardY, cardW, cardH, r);
  ctx.fill();
  ctx.stroke();

  // inner border blaze
  ctx.strokeStyle = 'rgba(193,68,14,0.35)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(cardX + 10, cardY + 10, cardW - 20, cardH - 20, r - 6);
  ctx.stroke();

  // --- Header ---
  ctx.fillStyle = '#B8AE8C';
  ctx.font = '600 18px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '0.18em';
  ctx.fillText('OPERATOR 40  •  OVER 40  •  15′/DAY', W / 2, cardY + 54);

  ctx.fillStyle = '#EDE8D8';
  ctx.font = '900 64px "Bebas Neue", sans-serif';
  ctx.fillText(profile?.name ? profile.name.toUpperCase() : 'OPERATORE', W / 2, cardY + 118);

  const rank = getRank(sessions?.length || 0);
  const rankLabel = rank.current?.name ? (profile ? rank.current.name.it : 'RECLUTA') : 'RECLUTA';
  // rank may be object with translations, handle both
  let rankText = 'RECLUTA';
  try {
    if (rank.current?.name?.it) rankText = rank.current.name.it;
    else if (typeof rank.current?.name === 'string') rankText = rank.current.name;
  } catch {}
  ctx.fillStyle = '#C1440E';
  ctx.font = '700 18px "IBM Plex Mono", monospace';
  ctx.fillText(
    rankText +
      (rank.next ? `  →  ${rank.next.min - (sessions?.length || 0)} AL PROSSIMO` : '  •  VETERANO'),
    W / 2,
    cardY + 148
  );

  // --- Main stats row ---
  const totalKcal = (sessions || []).reduce((a, s) => a + (s.kcal || 0), 0);
  const totalMin = Math.round(
    (sessions || []).reduce((a, s) => a + (s.durationSec || 780), 0) / 60
  );
  const streak = (() => {
    try {
      const s = new Set((sessions || []).map((v) => v.date.slice(0, 10)));
      let cur = new Date();
      if (!s.has(cur.toISOString().slice(0, 10))) cur.setDate(cur.getDate() - 1);
      let n = 0;
      while (s.has(cur.toISOString().slice(0, 10))) {
        n++;
        cur.setDate(cur.getDate() - 1);
      }
      return n;
    } catch {
      return 0;
    }
  })();
  const best = computeBestStreak(sessions || []);
  const cons = (() => {
    try {
      return getConsistencyScore(sessions, 8);
    } catch {
      return 0;
    }
  })();
  const { unlocked } = (() => {
    try {
      return getMedalProgress(sessions || []);
    } catch {
      return { unlocked: [] };
    }
  })();

  // 3 big boxes
  const boxY = cardY + 190;
  const boxW = (cardW - 48) / 3;
  const boxH = 148;
  const boxes = [
    {
      label: 'SESSIONI',
      value: String(sessions?.length || 0),
      sub: `${totalMin}′ totali`,
      color: '#EDE8D8',
    },
    {
      label: 'KCAL',
      value: String(totalKcal),
      sub: `${Math.round(totalKcal / Math.max(1, sessions?.length || 1))} avg`,
      color: '#EDE8D8',
    },
    {
      label: 'STREAK',
      value: `${streak}🔥`,
      sub: `best ${best}`,
      color: streak > 0 ? '#C1440E' : '#EDE8D8',
    },
  ];
  boxes.forEach((b, i) => {
    const x = cardX + 18 + i * (boxW + 6);
    // box bg
    ctx.fillStyle = i === 1 ? 'rgba(193,68,14,0.14)' : 'rgba(0,0,0,0.22)';
    ctx.strokeStyle = i === 1 ? 'rgba(193,68,14,0.35)' : 'rgba(184,174,140,0.14)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, boxY, boxW, boxH, 16);
    ctx.fill();
    ctx.stroke();
    // value
    ctx.fillStyle = b.color;
    ctx.font = '900 54px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(b.value, x + boxW / 2, boxY + 72);
    ctx.fillStyle = '#B8AE8C';
    ctx.font = '600 13px "IBM Plex Mono", monospace';
    ctx.fillText(b.label, x + boxW / 2, boxY + 96);
    ctx.fillStyle = 'rgba(237,232,216,0.62)';
    ctx.font = '500 12px Inter, sans-serif';
    ctx.fillText(b.sub, x + boxW / 2, boxY + 118);
  });

  // secondary row: consistenza + perfect weeks + rank
  const secY = boxY + boxH + 18;
  const secBoxes = [
    {
      label: 'CONSISTENZA 8W',
      value: `${cons}%`,
      color: cons >= 70 ? '#7FB069' : cons >= 40 ? '#B8AE8C' : '#C1440E',
    },
    {
      label: 'SETT. PERFETTE',
      value: String(unlocked.filter((m) => m.type === 'perfect').length || 0),
      sub: `su ${12}`,
      color: '#D9B34C',
    },
    {
      label: 'MEDAGLIE',
      value: String(unlocked.length),
      sub: `su ${(() => {
        try {
          return getMedalProgress(sessions || []).all.length;
        } catch {
          return 24;
        }
      })()}`,
      color: '#EDE8D8',
    },
  ];
  secBoxes.forEach((b, i) => {
    const x = cardX + 18 + i * (boxW + 6);
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.strokeStyle = 'rgba(184,174,140,0.12)';
    ctx.beginPath();
    ctx.roundRect(x, secY, boxW, 64, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = b.color;
    ctx.font = '800 26px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(b.value, x + boxW / 2, secY + 30);
    ctx.fillStyle = '#B8AE8C';
    ctx.font = '600 10px "IBM Plex Mono", monospace';
    ctx.fillText(b.label, x + boxW / 2, secY + 48);
    if (b.sub) {
      ctx.fillStyle = 'rgba(237,232,216,0.5)';
      ctx.font = '500 10px Inter, sans-serif';
      ctx.fillText(b.sub, x + boxW / 2, secY + 58);
    }
  });

  // --- Medals row ---
  const medalY = secY + 84;
  ctx.fillStyle = '#B8AE8C';
  ctx.font = '600 11px "IBM Plex Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('MEDAGLIE SBLOCCATE', cardX + 24, medalY);
  ctx.fillStyle = 'rgba(237,232,216,0.45)';
  ctx.font = '500 11px Inter, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(
    `${unlocked.length} / ${(() => {
      try {
        return getMedalProgress(sessions || []).all.length;
      } catch {
        return 24;
      }
    })()}`,
    cardX + cardW - 24,
    medalY
  );

  // medal pills
  const pillY = medalY + 14;
  const pillH = 28;
  let pillX = cardX + 24;
  const maxPills = 10;
  const toShow = unlocked.slice(0, maxPills);
  if (toShow.length === 0) {
    ctx.fillStyle = 'rgba(237,232,216,0.35)';
    ctx.font = '500 13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('— nessuna medaglia ancora —', W / 2, pillY + 18);
  } else {
    toShow.forEach((m) => {
      const label = `${m.icon} ${m.n}${m.type === 'streak' ? 'gg' : m.type === 'kcal' ? 'k' : ''}`;
      ctx.font = '700 12px Inter, sans-serif';
      const w = ctx.measureText(label).width + 18;
      if (pillX + w > cardX + cardW - 24) return;
      // bg
      ctx.fillStyle = m.unlocked ? 'rgba(193,68,14,0.22)' : 'rgba(0,0,0,0.18)';
      ctx.strokeStyle = m.unlocked ? 'rgba(193,68,14,0.35)' : 'rgba(184,174,140,0.12)';
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, w, pillH, pillH / 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = m.unlocked ? '#EDE8D8' : '#8A8578';
      ctx.textAlign = 'center';
      ctx.fillText(label, pillX + w / 2, pillY + 18);
      pillX += w + 8;
    });
    if (unlocked.length > maxPills) {
      ctx.fillStyle = 'rgba(237,232,216,0.5)';
      ctx.font = '600 11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`+${unlocked.length - maxPills} altre`, pillX + 4, pillY + 18);
    }
  }

  // --- Quote / rank progress ---
  const quoteY = pillY + 52;
  const nextBadge = (() => {
    try {
      const { locked } = getMedalProgress(sessions || []);
      locked.sort((a, b) => b.progress - a.progress);
      return locked[0];
    } catch {
      return null;
    }
  })();
  if (nextBadge) {
    // progress bar to next medal
    const barW = cardW - 48;
    const barX = cardX + 24;
    const barH = 8;
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.roundRect(barX, quoteY, barW, barH, 4);
    ctx.fill();
    ctx.fillStyle = nextBadge.color;
    ctx.beginPath();
    ctx.roundRect(barX, quoteY, barW * nextBadge.progress, barH, 4);
    ctx.fill();
    ctx.fillStyle = 'rgba(237,232,216,0.9)';
    ctx.font = '600 11px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Prossima: ${nextBadge.icon} ${nextBadge.label}`, barX, quoteY + 22);
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.round(nextBadge.progress * 100)}%`, barX + barW, quoteY + 22);
  }

  // --- Smart insight ---
  try {
    const smart = getSmartInsight({ sessions, profile, lang: 'it' });
    const sY = quoteY + 40;
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.strokeStyle = `${smart.color}33`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(cardX + 24, sY, cardW - 48, 64, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = smart.color;
    ctx.font = '800 22px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(smart.icon, cardX + 36, sY + 30);
    ctx.fillStyle = '#EDE8D8';
    ctx.font = '700 13px Inter, sans-serif';
    ctx.fillText(smart.title, cardX + 64, sY + 26);
    ctx.fillStyle = 'rgba(237,232,216,0.72)';
    ctx.font = '500 11px Inter, sans-serif';
    const body = smart.body.length > 78 ? smart.body.slice(0, 78) + '…' : smart.body;
    ctx.fillText(body, cardX + 64, sY + 44);
  } catch {}

  // --- Footer ---
  const footY = H - 92;
  // line
  ctx.strokeStyle = 'rgba(184,174,140,0.18)';
  ctx.beginPath();
  ctx.moveTo(cardX + 24, footY - 18);
  ctx.lineTo(cardX + cardW - 24, footY - 18);
  ctx.stroke();

  ctx.fillStyle = 'rgba(237,232,216,0.85)';
  ctx.font = '700 13px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('mikweb.eu/operator40  •  15′ al giorno  •  over 40', W / 2, footY);

  ctx.fillStyle = 'rgba(237,232,216,0.45)';
  ctx.font = '500 11px Inter, sans-serif';
  const dateStr = new Date().toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  ctx.fillText(
    `${dateStr}  •  Operator 40  •  v${profile?.level || 'combattente'}`,
    W / 2,
    footY + 18
  );

  // QR placeholder 80x80 bottom-right (roadmap share QR)
  const qrSize = 72, qrX = cardX + cardW - 24 - qrSize, qrY = footY - 58;
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'rgba(184,174,140,0.22)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(qrX, qrY, qrSize, qrSize, 8); ctx.fill(); ctx.stroke();
  // simple QR pattern 7x7
  const cell = qrSize / 9;
  ctx.fillStyle = '#111';
  const pattern = [
    [1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1],
  ];
  for(let r=0;r<7;r++) for(let c2=0;c2<7;c2++) if(pattern[r][c2]) ctx.fillRect(qrX+cell+ c2*cell*0.9, qrY+cell+ r*cell*0.9, cell*0.85, cell*0.85);
  // add inner dots to hint QR
  ctx.fillStyle = '#C1440E';
  ctx.fillRect(qrX+qrSize/2-3, qrY+qrSize/2-3, 6, 6);
  ctx.fillStyle = 'rgba(0,0,0,0.65)';
  ctx.font = '600 7px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('QR', qrX+qrSize/2, qrY+qrSize+10);
  // watermark blaze dot
  ctx.fillStyle = '#C1440E';
  ctx.beginPath();
  ctx.arc(W - 48, footY - 28, 3, 0, Math.PI * 2);
  ctx.fill();

  // to blob
  const blob = await new Promise((res) => c.toBlob(res, 'image/png', 0.96));
  const file = new File([blob], 'operator40-stats.png', { type: 'image/png' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title: 'Operator 40',
        text: `Operator 40 — ${sessions?.length || 0} sessioni, ${totalKcal} kcal, ${cons}% costanza`,
        files: [file],
      });
      return 'share';
    } catch {}
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `operator40-${new Date().toISOString().slice(0, 10)}.png`;
  a.click();
  URL.revokeObjectURL(url);
  return 'download';
}
