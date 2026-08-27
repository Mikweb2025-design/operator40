/**
 * Backup/restore + schema versioning per Operator40
 * - export: JSON.stringify({ profile, sessions, waistHistory, weightHistory, customPrograms, photos, version })
 * - import: valida, migra se necessario, sovrascrive storage
 * - version: 1 (iniziale), incrementa ad ogni breaking change di forma dati
 */
export const BACKUP_VERSION = 1;

function validateBackup(data) {
  if (!data || typeof data !== 'object') throw new Error('Backup non valido: root non è oggetto');
  if (data.version != null && typeof data.version !== 'number') throw new Error('Backup non valido: version deve essere numero');
  // profile è opzionale ma se presente deve essere oggetto
  if (data.profile != null && typeof data.profile !== 'object') throw new Error('Backup non valido: profile non è oggetto');
  if (data.sessions != null && !Array.isArray(data.sessions)) throw new Error('Backup non valido: sessions non è array');
  if (data.waistHistory != null && !Array.isArray(data.waistHistory)) throw new Error('Backup non valido: waistHistory non è array');
  if (data.weightHistory != null && !Array.isArray(data.weightHistory)) throw new Error('Backup non valido: weightHistory non è array');
  if (data.customPrograms != null && !Array.isArray(data.customPrograms)) throw new Error('Backup non valido: customPrograms non è array');
  return true;
}

function migrate(data) {
  // v0 -> v1: nessuna breaking change storica, ma normalizza campi
  // Assicura che profile abbia campi base, sessions siano array, ecc.
  const v = data.version || 0;
  if (v < 1) {
    // normalizza profile
    if (data.profile) {
      if (!data.profile.lang) data.profile.lang = 'it';
      if (!data.profile.weeklyGoal) data.profile.weeklyGoal = 3;
      if (!data.profile.level) data.profile.level = 'combattente';
    }
    // sessions: assicurati che ogni session abbia date ISO e kcal number
    if (Array.isArray(data.sessions)) {
      data.sessions = data.sessions.map(s => ({
        ...s,
        date: s.date || new Date().toISOString(),
        kcal: typeof s.kcal === 'number' ? s.kcal : 0,
      }));
    }
    data.version = 1;
  }
  return data;
}

export async function exportBackup() {
  const keys = ['o40_profile', 'o40_sessions', 'o40_waist', 'o40_weight', 'o40_custom_programs', 'o40_photos'];
  const out = { version: BACKUP_VERSION, exportedAt: new Date().toISOString() };
  for (const k of keys) {
    try {
      const r = await window.storage.get(k, false);
      if (r && r.value) {
        const parsed = JSON.parse(r.value);
        // mappa chiavi storage -> chiavi backup
        if (k === 'o40_profile') out.profile = parsed;
        else if (k === 'o40_sessions') out.sessions = parsed;
        else if (k === 'o40_waist') out.waistHistory = parsed;
        else if (k === 'o40_weight') out.weightHistory = parsed;
        else if (k === 'o40_custom_programs') out.customPrograms = parsed;
        else if (k === 'o40_photos') out.photos = parsed;
      }
    } catch {}
  }
  // fallback per chiavi piccole in localStorage
  try {
    const fav = localStorage.getItem('o40_favs') || localStorage.getItem('o40_favorites');
    if (fav) out.favs = JSON.parse(fav);
  } catch {}
  return out;
}

export function downloadBackup(data) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `operator40-backup-${new Date().toISOString().slice(0, 10)}-v${data.version || BACKUP_VERSION}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function importBackup(data) {
  validateBackup(data);
  const migrated = migrate({ ...data });
  // scrivi su storage
  const toWrite = [
    ['o40_profile', migrated.profile],
    ['o40_sessions', migrated.sessions],
    ['o40_waist', migrated.waistHistory],
    ['o40_weight', migrated.weightHistory],
    ['o40_custom_programs', migrated.customPrograms],
    ['o40_photos', migrated.photos],
  ];
  for (const [k, v] of toWrite) {
    if (v !== undefined) {
      try { await window.storage.set(k, JSON.stringify(v), false); } catch (e) { throw new Error(`Scrittura ${k} fallita: ${e.message}`); }
    }
  }
  if (migrated.favs !== undefined) {
    try { localStorage.setItem('o40_favs', JSON.stringify(migrated.favs)); } catch {}
  }
  // aggiorna version marker
  try { localStorage.setItem('o40_schemaVersion', String(migrated.version)); } catch {}
  return migrated;
}

export function getStoredSchemaVersion() {
  try { return parseInt(localStorage.getItem('o40_schemaVersion') || '0', 10) || 0; } catch { return 0; }
}
