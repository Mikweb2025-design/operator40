let lock = null;
export async function requestWakeLock() {
  if (!('wakeLock' in navigator)) return null;
  try {
    lock = await navigator.wakeLock.request('screen');
    lock.addEventListener('release', () => {
      lock = null;
    });
    return lock;
  } catch {
    return null;
  }
}
export async function releaseWakeLock() {
  try {
    if (lock) await lock.release();
    lock = null;
  } catch {}
}
export function isWakeLockSupported() {
  return 'wakeLock' in navigator;
}
