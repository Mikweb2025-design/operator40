/**
 * Cross-platform storage adapter — optimized.
 *
 * - iOS / native builds (Capacitor): uses @capacitor/preferences
 * - Web / PWA: uses IndexedDB (via idb) for large data (sessions, photos, etc.)
 *   with localStorage fallback + migration. Small keys (reminder, largeText) stay
 *   in localStorage for sync access where needed, but all o40_* keys go via IDB.
 *
 * Interface: get(key) -> Promise<{ value: string } | undefined>, set(key, value) -> Promise<void>
 */

import { Preferences } from '@capacitor/preferences';
import { openDB } from 'idb';

const isNative = () =>
  typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform();

// --- IndexedDB for web — versionato ---
export const STORAGE_SCHEMA_VERSION = 2;
let dbPromise = null;
function getDB() {
  if (dbPromise) return dbPromise;
  if (typeof indexedDB === 'undefined') return null;
  try {
    dbPromise = openDB('operator40', STORAGE_SCHEMA_VERSION, {
      upgrade(db, oldVersion) {
        if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv');
        // future migrations: if (oldVersion < 2) { /* migrate kv shapes */ }
      },
    });
    return dbPromise;
  } catch {
    return null;
  }
}
function getStoredVersion() {
  try {
    return parseInt(localStorage.getItem('o40_schemaVersion') || '0', 10) || 0;
  } catch {
    return 0;
  }
}
function setStoredVersion(v) {
  try {
    localStorage.setItem('o40_schemaVersion', String(v));
  } catch {}
}

// Keys that are large and benefit most from IDB
const IDB_KEYS = new Set([
  'o40_profile',
  'o40_sessions',
  'o40_custom_programs',
  'o40_waist',
  'o40_weight',
  'o40_photos',
  'o40_favs',
  'o40_favorites',
]);

async function get(key) {
  if (isNative()) {
    const r = await Preferences.get({ key });
    return r.value == null ? undefined : { value: r.value };
  }
  // Web: try IDB first for o40_* keys
  if (IDB_KEYS.has(key)) {
    try {
      const db = await getDB();
      if (db) {
        const v = await db.get('kv', key);
        if (v !== undefined) return { value: v };
        // migration: check localStorage
        const ls = localStorage.getItem(key);
        if (ls != null) {
          // migrate to IDB (fire-and-forget)
          db.put('kv', ls, key).catch(() => {});
          return { value: ls };
        }
        return undefined;
      }
    } catch {}
  }
  // fallback: localStorage (small keys or IDB unavailable)
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
  if (IDB_KEYS.has(key)) {
    try {
      const db = await getDB();
      if (db) {
        await db.put('kv', value, key);
        // remove from localStorage to free quota (keep small backup for 1 version)
        try {
          localStorage.removeItem(key);
        } catch {}
        return;
      }
    } catch (e) {
      console.warn('[storage] IDB set failed, fallback to localStorage', key, e);
    }
  }
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn('[storage] set failed', key, e);
    // quota exceeded? try to clear old IDB/ls and retry once
    if (e && e.name === 'QuotaExceededError') {
      try {
        localStorage.removeItem(key);
        localStorage.setItem(key, value);
      } catch {}
    }
  }
}

async function remove(key) {
  if (isNative()) {
    await Preferences.remove({ key });
    return;
  }
  try {
    const db = await getDB();
    if (db) await db.delete('kv', key).catch(() => {});
  } catch {}
  try {
    localStorage.removeItem(key);
  } catch {}
}

async function clear() {
  if (isNative()) {
    await Preferences.clear();
    return;
  }
  try {
    const db = await getDB();
    if (db) await db.clear('kv').catch(() => {});
  } catch {}
  try {
    localStorage.clear();
  } catch {}
}

// Optional: expose migration helper for debugging
async function migrateFromLocalStorage() {
  if (isNative()) return;
  try {
    const db = await getDB();
    if (!db) return;
    for (const key of IDB_KEYS) {
      const ls = localStorage.getItem(key);
      if (ls != null) {
        const existing = await db.get('kv', key);
        if (existing === undefined) await db.put('kv', ls, key);
      }
    }
  } catch {}
}

async function migrateStoredDataIfNeeded() {
  const cur = getStoredVersion();
  if (cur >= STORAGE_SCHEMA_VERSION) return;
  // v0 -> v1: normalizza profile/sessions come in backup.js
  // v1 -> v2: assicurati che o40_profile abbia schemaVersion e campi base
  try {
    const r = await get('o40_profile');
    if (r && r.value) {
      const p = JSON.parse(r.value);
      if (!p.schemaVersion || p.schemaVersion < STORAGE_SCHEMA_VERSION) {
        p.schemaVersion = STORAGE_SCHEMA_VERSION;
        if (!p.lang) p.lang = 'it';
        if (!p.weeklyGoal) p.weeklyGoal = 3;
        if (!p.level) p.level = 'combattente';
        await set('o40_profile', JSON.stringify(p));
      }
    }
    setStoredVersion(STORAGE_SCHEMA_VERSION);
  } catch {}
}

export {
  get,
  set,
  remove,
  clear,
  migrateFromLocalStorage,
  migrateStoredDataIfNeeded,
  getStoredVersion,
  setStoredVersion,
};
