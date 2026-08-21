/**
 * Cross-platform storage adapter.
 *
 * - iOS / native builds (Capacitor): uses @capacitor/preferences
 *   (the same API the original app expected from `window.storage`).
 * - Web / macOS (browser or PWA): transparent fallback to localStorage,
 *   so the app runs everywhere without native wrappers.
 *
 * The interface mirrors the original bridge so the rest of the app is
 * untouched: get(key) -> Promise<{ value: string } | undefined>,
 * set(key, value) -> Promise<void>.
 */

import { Preferences } from '@capacitor/preferences';

const isNative = () =>
  typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform();

async function get(key) {
  if (isNative()) {
    const r = await Preferences.get({ key });
    return r.value == null ? undefined : { value: r.value };
  }
  try {
    const value = localStorage.getItem(key);
    return value == null ? undefined : { value };
  } catch {
    return undefined;
  }
}

async function set(key, value) {
  if (isNative()) {
    await Preferences.set({ key, value });
    return;
  }
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn('[storage] set failed', key, e);
  }
}

async function remove(key) {
  if (isNative()) {
    await Preferences.remove({ key });
    return;
  }
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}

async function clear() {
  if (isNative()) {
    await Preferences.clear();
    return;
  }
  try { localStorage.clear(); } catch { /* ignore */ }
}

export { get, set, remove, clear };