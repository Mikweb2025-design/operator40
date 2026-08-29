/**
 * Operator40 — Social sfida settimanale (no backend)
 * Codice invito = base64(JSON) con kcal/sessions/streak, share via link + local compare.
 * Privacy: solo stats aggregate, no identità extra.
 */

function weekKey(d = new Date()) {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7; // Monday 0
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date.toISOString().slice(0, 10);
}

export function getWeeklyStats(sessions) {
  const now = Date.now();
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
  weekStart.setHours(0, 0, 0, 0);
  const wk = (sessions || []).filter((s) => new Date(s.date) >= weekStart);
  const kcal = Math.round(wk.reduce((a, s) => a + (s.kcal || 0), 0));
  const n = wk.length;
  const bestDay = wk.length ? Math.max(...wk.map((s) => s.kcal || 0)) : 0;
  return { weekKey: weekKey(), kcal, n, bestDay, from: weekStart.toISOString() };
}

export function generateInviteCode(sessions, profile) {
  const wk = getWeeklyStats(sessions);
  const payload = {
    v: 1,
    wk: wk.weekKey,
    k: wk.kcal,
    n: wk.n,
    s: wk.bestDay,
    name: (profile?.name || 'Amico').slice(0, 12),
    ts: Date.now(),
  };
  try {
    const json = JSON.stringify(payload);
    // base64url without padding for URL safety
    const b64 = btoa(unescape(encodeURIComponent(json)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    return b64;
  } catch {
    return '';
  }
}

export function parseInviteCode(code) {
  if (!code || typeof code !== 'string') return null;
  try {
    let b64 = code.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const json = decodeURIComponent(escape(atob(b64)));
    const p = JSON.parse(json);
    if (!p || p.v !== 1 || typeof p.k !== 'number') return null;
    // expire after 14 days
    if (p.ts && Date.now() - p.ts > 14 * 86400000) return { ...p, expired: true };
    return p;
  } catch {
    return null;
  }
}

export function getInviteLink(code) {
  const base = 'https://mikweb.eu/operator40/';
  return `${base}?invite=${encodeURIComponent(code)}`;
}

export function getLeaderboard(localSessions, friendPayload) {
  const me = getWeeklyStats(localSessions);
  const entries = [
    { id: 'me', name: 'Tu', kcal: me.kcal, n: me.n, isMe: true },
  ];
  if (friendPayload && !friendPayload.expired) {
    entries.push({ id: 'friend', name: friendPayload.name || 'Amico', kcal: friendPayload.k || 0, n: friendPayload.n || 0, isMe: false });
  }
  entries.sort((a, b) => b.kcal - a.kcal);
  const leader = entries[0];
  const diff = friendPayload ? me.kcal - (friendPayload.k || 0) : 0;
  return { entries, leader, diff, me, friend: friendPayload };
}

export function getSocialShareText(leaderboard, lang = 'it') {
  const { me } = leaderboard;
  if (lang === 'de') return `Operator40 Wochen-Challenge: ${me.kcal} kcal in ${me.n} Einheiten — schaffst du mehr?`;
  if (lang === 'en') return `Operator40 weekly challenge: ${me.kcal} kcal in ${me.n} sessions — beat me?`;
  return `Operator40 sfida settimanale: ${me.kcal} kcal in ${me.n} sessioni — mi batti?`;
}
