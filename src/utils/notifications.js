/* Daily reminder via Web Notifications (no native plugin needed, works in PWA) */

export async function requestNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  const p = await Notification.requestPermission();
  return p;
}

export function scheduleDailyReminder(hour = 8, minute = 0) {
  // Persists the desired time; the actual firing is checked on app foreground
  try {
    localStorage.setItem('o40_reminder', JSON.stringify({ hour, minute, enabled: true }));
  } catch {}
}

export function disableReminder() {
  try {
    localStorage.removeItem('o40_reminder');
  } catch {}
}

export function getReminder() {
  try {
    const v = localStorage.getItem('o40_reminder');
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

export function checkAndFireReminder(t) {
  const r = getReminder();
  if (!r || !r.enabled) return false;
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return false;
  const now = new Date();
  if (now.getHours() !== r.hour || now.getMinutes() !== r.minute) return false;
  // Once per day guard
  const key = `o40_reminder_fired_${now.toISOString().slice(0, 10)}`;
  if (localStorage.getItem(key)) return false;
  localStorage.setItem(key, '1');
  try {
    new Notification('Operator 40 — Missione pronta', {
      body: t ? t('notif.body') : 'La tua missione di 15 min ti aspetta. Andiamo!',
      icon: './icons/icon-192.png',
      badge: './icons/icon-192.png',
      tag: 'o40-daily',
    });
  } catch {}
  return true;
}

export function fireTestNotification(t) {
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return false;
  try {
    new Notification('Operator 40 — Test', {
      body: t ? t('notif.test.body') : 'Le notifiche funzionano. A domani per la missione!',
      icon: './icons/icon-192.png',
    });
    return true;
  } catch {
    return false;
  }
}
