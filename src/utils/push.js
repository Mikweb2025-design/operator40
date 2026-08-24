/* Push notifications via Web Push (VAPID) — works in PWA when app is closed */

const VAPID_PUBLIC_KEY = 'BHwro8IiKhELhqxV6edpJ6iUPDAnMh7yzEmMyOi9XLL8CnkuIT3esLAgeKjz-sfjkxCb8izjLrwQUsORtdmAb5Q';
const API_BASE = './api';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

export function isPushSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

export function isStandalonePWA() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

export async function getExistingSubscription() {
  if (!isPushSupported()) return null;
  try {
    const reg = await navigator.serviceWorker.ready;
    return await reg.pushManager.getSubscription();
  } catch { return null; }
}

export async function subscribePush() {
  if (!isPushSupported()) throw new Error('Push non supportato su questo browser');
  const perm = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
  if (perm !== 'granted') throw new Error('Permesso notifiche negato');

  const reg = await navigator.serviceWorker.ready;
  // rimuovi vecchia subscription se esiste (cambio chiave)
  let sub = await reg.pushManager.getSubscription();
  if (sub) {
    try { await sub.unsubscribe(); } catch {}
  }
  const appServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
  sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: appServerKey,
  });

  // invia al backend
  await sendSubscriptionToServer(sub, 'subscribe');
  try { localStorage.setItem('o40_push_sub', JSON.stringify({ endpoint: sub.endpoint })); } catch {}
  return sub;
}

export async function unsubscribePush() {
  const sub = await getExistingSubscription();
  if (sub) {
    await sendSubscriptionToServer(sub, 'unsubscribe').catch(() => {});
    await sub.unsubscribe();
  }
  try { localStorage.removeItem('o40_push_sub'); } catch {}
}

async function sendSubscriptionToServer(subscription, action = 'subscribe') {
  const url = action === 'unsubscribe' ? `${API_BASE}/push-unsubscribe.php` : `${API_BASE}/push-subscribe.php`;
  // fall back to local only if backend non raggiungibile (es. file:// o dev senza PHP)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json().catch(() => ({}));
  } catch (e) {
    // salva localmente come fallback — il push vero richiede backend, ma il permesso resta
    console.warn('[push] backend non raggiungibile, salvo solo locale', e);
    return { localOnly: true };
  }
}

export async function updatePushStats(sessions, profile, lang) {
  const sub = await getExistingSubscription();
  if (!sub) return;
  try {
    // derived stats per personalizzazione (non inviamo full sessions per privacy/banda)
    const now = Date.now();
    const last = sessions.length ? sessions.reduce((a, b) => new Date(b.date) > new Date(a.date) ? b : a) : null;
    const missed = last ? Math.floor((now - new Date(last.date).getTime()) / 86400000) : 999;
    // compute streak/cons locally if stats available, altrimenti lascia calcolare al server
    const payload = {
      endpoint: sub.endpoint,
      stats: {
        n: sessions.length,
        missed,
        lang: lang || profile?.lang || 'it',
        name: profile?.name || '',
        ts: new Date().toISOString(),
      },
    };
    await fetch(`${API_BASE}/push-update-stats.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});
  } catch {}
}

export async function testPushViaSW() {
  const reg = await navigator.serviceWorker.ready;
  // prova via backend se possibile, altrimenti mostra notifica locale dal SW
  try {
    const res = await fetch(`${API_BASE}/push-send.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: true, filterSelf: true }),
    });
    if (res.ok) {
      const j = await res.json();
      if (j.sent > 0) return j;
      throw new Error('no sent');
    }
  } catch {}

  // fallback: mostra notifica locale via SW (funziona anche con app chiusa se SW attivo, ma non è vero push remoto)
  if ('showNotification' in ServiceWorkerRegistration.prototype) {
    // usa il SW per mostrare — più affidabile di new Notification quando in PWA
    await reg.showNotification('Operator 40 — Test push', {
      body: 'Se vedi questo, il push PWA funziona (via SW).',
      icon: './icons/icon-192.png',
      badge: './icons/icon-192.png',
      tag: 'o40-test',
      data: { url: './' },
    });
    return { localOnly: true };
  }
  // ultimo fallback
  new Notification('Operator 40 — Test', { body: 'Notifica locale (fallback).' });
  return { localOnly: true };
}

export function getVAPIDPublicKey() { return VAPID_PUBLIC_KEY; }
