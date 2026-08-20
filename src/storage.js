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
  const value = localStorage.getItem(key);
  return value == null ? undefined : { value };
}

async function set(key, value) {
  if (isNative()) {
    await Preferences.set({ key, value });
    return;
  }
  localStorage.setItem(key, value);
}

export { get, set };