/**
 * Huawei Health Kit — REST API client 100% locale
 * Docs: https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides/healthkit-introduction-0000001050148879
 * Flusso: OAuth2 code → token → Health Kit REST (sampleSet, workout)
 * Tutto salvato in window.storage (Capacitor Preferences / localStorage) — niente backend.
 */

const STORAGE_KEY = 'o40_huawei_api';
const HUAWEI_AUTH_URL = 'https://oauth-login.cloud.huawei.com/oauth2/v3/authorize';
const HUAWEI_TOKEN_URL = 'https://oauth-login.cloud.huawei.com/oauth2/v3/token';
const HUAWEI_HEALTH_BASE = 'https://health-api.cloud.huawei.com/healthkit/v1';

// Scopes Health Kit rilevanti per Operator40 (calorie, workout, peso, HR)
export const HUAWEI_SCOPES = [
  'https://www.huawei.com/healthkit/activity.write',
  'https://www.huawei.com/healthkit/activity.read',
  'https://www.huawei.com/healthkit/heartrate.read',
  'https://www.huawei.com/healthkit/weight.read',
].join(' ');

function loadConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveConfig(cfg) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    // mirror anche su Capacitor se disponibile
    if (window.storage?.set) window.storage.set(STORAGE_KEY, JSON.stringify(cfg), false).catch(()=>{});
  } catch {}
}

export function getHuaweiApiConfig() {
  return loadConfig();
}

export function setHuaweiApiConfig({ clientId, clientSecret, redirectUri, accessToken, refreshToken, expiresAt, lastSync }) {
  const cur = loadConfig();
  const next = { ...cur };
  if (clientId !== undefined) next.clientId = clientId.trim();
  if (clientSecret !== undefined) next.clientSecret = clientSecret.trim();
  if (redirectUri !== undefined) next.redirectUri = redirectUri.trim();
  if (accessToken !== undefined) next.accessToken = accessToken;
  if (refreshToken !== undefined) next.refreshToken = refreshToken;
  if (expiresAt !== undefined) next.expiresAt = expiresAt;
  if (lastSync !== undefined) next.lastSync = lastSync;
  saveConfig(next);
  return next;
}

export function clearHuaweiApiConfig() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
  if (window.storage?.remove) window.storage.remove(STORAGE_KEY).catch(()=>{});
}

export function isHuaweiApiConfigured() {
  const c = loadConfig();
  return !!(c.clientId && c.clientSecret);
}

export function isHuaweiApiConnected() {
  const c = loadConfig();
  return !!(c.accessToken && c.expiresAt && Date.now() < c.expiresAt - 60000);
}

export function buildHuaweiAuthUrl({ clientId, redirectUri, state = 'o40', scope = HUAWEI_SCOPES } = {}) {
  const cfg = loadConfig();
  const cid = clientId || cfg.clientId;
  const ruri = redirectUri || cfg.redirectUri || `${window.location.origin}${window.location.pathname}`;
  if (!cid) throw new Error('clientId mancante — inserisci AppGallery Client ID');
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: cid,
    redirect_uri: ruri,
    scope,
    access_type: 'offline',
    state,
  });
  return `${HUAWEI_AUTH_URL}?${params.toString()}`;
}

// Scambia code → token (chiamata diretta da browser — Huawei deve abilitare CORS per il tuo redirect_uri;
// se CORS blocca, l'utente deve usare il backend proxy o incollare manualmente il token)
export async function exchangeHuaweiCodeForToken(code, { clientId, clientSecret, redirectUri } = {}) {
  const cfg = loadConfig();
  const cid = clientId || cfg.clientId;
  const csec = clientSecret || cfg.clientSecret;
  const ruri = redirectUri || cfg.redirectUri || `${window.location.origin}${window.location.pathname}`;
  if (!cid || !csec) throw new Error('clientId/clientSecret mancanti');
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: cid,
    client_secret: csec,
    code,
    redirect_uri: ruri,
  });
  const res = await fetch(HUAWEI_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) {
    const txt = await res.text().catch(()=> '');
    throw new Error(`Token exchange fallito ${res.status}: ${txt.slice(0,300)}`);
  }
  const data = await res.json();
  // data: { access_token, refresh_token, expires_in, scope }
  const expiresAt = Date.now() + (data.expires_in || 3600) * 1000;
  setHuaweiApiConfig({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt,
  });
  return data;
}

export async function refreshHuaweiToken() {
  const cfg = loadConfig();
  if (!cfg.refreshToken || !cfg.clientId || !cfg.clientSecret) throw new Error('refreshToken/client mancante');
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: cfg.clientId,
    client_secret: cfg.clientSecret,
    refresh_token: cfg.refreshToken,
  });
  const res = await fetch(HUAWEI_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) throw new Error(`Refresh fallito ${res.status}`);
  const data = await res.json();
  const expiresAt = Date.now() + (data.expires_in || 3600) * 1000;
  setHuaweiApiConfig({
    accessToken: data.access_token,
    refreshToken: data.refresh_token || cfg.refreshToken,
    expiresAt,
  });
  return data;
}

async function ensureValidToken() {
  const cfg = loadConfig();
  if (!cfg.accessToken) throw new Error('Non connesso — fai OAuth prima');
  if (cfg.expiresAt && Date.now() > cfg.expiresAt - 60000) {
    if (cfg.refreshToken) await refreshHuaweiToken();
    else throw new Error('Token scaduto — ricollega Huawei Health');
  }
  return loadConfig().accessToken;
}

// Fetch workout da Health Kit — usa sampleSet per activity
// Huawei Health Kit: POST /healthkit/v1/sampleSet con dataTypeName=com.huawei.continuous.activity
export async function fetchHuaweiWorkoutsViaApi({ from, to } = {}) {
  const token = await ensureValidToken();
  const start = from ? new Date(from).getTime() : Date.now() - 30 * 86400000;
  const end = to ? new Date(to).getTime() : Date.now();
  // Prova endpoint activity — se Huawei cambia path, l'errore viene mostrato in UI
  const url = `${HUAWEI_HEALTH_BASE}/sampleSet:query`;
  const body = {
    dataTypeName: 'com.huawei.continuous.activity',
    startTime: start,
    endTime: end,
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-client-id': loadConfig().clientId || '',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text().catch(()=> '');
    throw new Error(`Health Kit ${res.status}: ${txt.slice(0,400) || res.statusText}`);
  }
  const data = await res.json();
  // Normalizza a formato nostro workouts[]
  const samples = data.sampleSet?.[0]?.samplePoints || data.samplePoints || data.workouts || [];
  const workouts = samples.map(s => {
    const st = s.startTime || s.start_time || s.beginTime;
    const et = s.endTime || s.end_time;
    const durMin = et && st ? Math.round((Number(et) - Number(st)) / 60000) : (s.duration ? Math.round(Number(s.duration)/60) : 15);
    const kcal = s.calories || s.calorie || s.energy || Math.round(durMin * 6);
    return {
      type: String(s.sportType || s.exerciseType || s.type || '258'),
      startDate: new Date(Number(st)).toISOString(),
      durationMin: durMin || 15,
      kcal: Math.round(Number(kcal) || durMin*6),
    };
  });
  // Peso opzionale
  let weightKg = null, weightDate = null;
  try {
    const wRes = await fetch(`${HUAWEI_HEALTH_BASE}/sampleSet:query`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataTypeName: 'com.huawei.instantaneous.body_weight', startTime: start, endTime: end }),
    });
    if (wRes.ok) {
      const wData = await wRes.json();
      const wPoints = wData.sampleSet?.[0]?.samplePoints || wData.samplePoints || [];
      if (wPoints.length) {
        const last = wPoints[wPoints.length - 1];
        const v = last.value?.[0]?.value || last.value;
        const n = parseFloat(v);
        if (!isNaN(n) && n > 20 && n < 300) { weightKg = Math.round(n*10)/10; weightDate = new Date(Number(last.startTime)).toISOString(); }
      }
    }
  } catch {}
  setHuaweiApiConfig({ lastSync: new Date().toISOString() });
  return { weightKg, weightDate, workouts };
}

// Mock per demo senza credenziali reali
export function mockHuaweiApiWorkouts({ days = 7 } = {}) {
  const now = Date.now();
  const workouts = [];
  for (let i = 0; i < days; i++) {
    if (Math.random() > 0.4) {
      const d = new Date(now - i * 86400000 - Math.floor(Math.random()*3600000));
      workouts.push({
        type: ['258','260','264'][Math.floor(Math.random()*3)],
        startDate: d.toISOString(),
        durationMin: 15 + Math.floor(Math.random()*10),
        kcal: 140 + Math.floor(Math.random()*80),
      });
    }
  }
  return { weightKg: 81.8 + Math.round((Math.random()-0.5)*4*10)/10, weightDate: new Date().toISOString(), workouts: workouts.reverse() };
}
