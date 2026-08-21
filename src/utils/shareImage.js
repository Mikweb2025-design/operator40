export async function shareStatsImage({ sessions, profile, t, tr }) {
  const W = 1080, H = 1080;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  // bg
  const g = ctx.createLinearGradient(0,0,W,H);
  g.addColorStop(0, '#1B1D16'); g.addColorStop(1, '#333823');
  ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
  // card
  ctx.fillStyle = 'rgba(237,232,216,0.08)'; ctx.strokeStyle = 'rgba(184,174,140,0.18)';
  ctx.lineWidth = 2;
  const r = 32; ctx.beginPath(); ctx.roundRect(40,40,W-80,H-80,r); ctx.fill(); ctx.stroke();
  // title
  ctx.fillStyle = '#EDE8D8'; ctx.font = '900 64px "Bebas Neue", sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('OPERATOR 40', W/2, 180);
  ctx.fillStyle = '#B8AE8C'; ctx.font = '600 24px Inter, sans-serif';
  ctx.fillText(profile ? (profile.name || 'Operatore') : 'Operatore', W/2, 220);
  // stats
  const totalKcal = sessions.reduce((a,s)=>a+(s.kcal||0),0);
  const streak = (()=>{ try{ const s=new Set(sessions.map(v=>v.date.slice(0,10))); let cur=new Date(); if(!s.has(cur.toISOString().slice(0,10))) cur.setDate(cur.getDate()-1); let n=0; while(s.has(cur.toISOString().slice(0,10))){n++; cur.setDate(cur.getDate()-1);} return n;}catch{return 0}})();
  ctx.fillStyle = '#EDE8D8'; ctx.font = '800 72px Inter, sans-serif'; ctx.fillText(String(sessions.length), W/2-180, 420);
  ctx.fillStyle = '#B8AE8C'; ctx.font = '500 20px Inter, sans-serif'; ctx.fillText('SESSIONI', W/2-180, 450);
  ctx.fillStyle = '#EDE8D8'; ctx.font = '800 72px Inter, sans-serif'; ctx.fillText(String(totalKcal), W/2+180, 420);
  ctx.fillStyle = '#B8AE8C'; ctx.font = '500 20px Inter, sans-serif'; ctx.fillText('KCAL', W/2+180, 450);
  ctx.fillStyle = '#C1440E'; ctx.font = '800 56px Inter, sans-serif'; ctx.fillText(`${streak}🔥`, W/2, 600);
  ctx.fillStyle = '#B8AE8C'; ctx.font = '500 20px Inter, sans-serif'; ctx.fillText('SERIE', W/2, 630);
  // footer
  ctx.fillStyle = 'rgba(237,232,216,0.6)'; ctx.font = '500 18px Inter, sans-serif'; ctx.fillText('mikweb.eu/operator40', W/2, H-80);
  // to blob
  const blob = await new Promise(res=>c.toBlob(res,'image/png',0.95));
  const file = new File([blob], 'operator40.png', { type: 'image/png' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ title: 'Operator 40', text: `Operator 40 — ${sessions.length} sessioni, ${totalKcal} kcal`, files: [file] }); return 'share'; } catch {}
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'operator40-stats.png'; a.click();
  URL.revokeObjectURL(url);
  return 'download';
}
