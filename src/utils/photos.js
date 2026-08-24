export async function loadPhotosAsync() {
  try {
    const r = await window.storage.get('o40_photos');
    if (!r?.value) return [];
    return JSON.parse(r.value);
  } catch { return []; }
}

// sync fallback for initial render (reads from IDB cache if available, else LS)
export function loadPhotos() {
  try {
    // try to read synchronously from localStorage as fallback during migration
    // the async version will correct it on mount
    const v = localStorage.getItem('o40_photos');
    return v ? JSON.parse(v) : [];
  } catch { return []; }
}

export async function savePhotosAsync(list) {
  try {
    await window.storage.set('o40_photos', JSON.stringify(list.slice(-12)));
  } catch {}
}

// keep sync for backward compat, but also persist via IDB
export function savePhotos(list) {
  try { localStorage.setItem('o40_photos', JSON.stringify(list.slice(-12))); } catch {}
  // fire-and-forget IDB
  savePhotosAsync(list).catch(() => {});
}

export async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('no file'));
    if (file.size > 4 * 1024 * 1024) return reject(new Error('too big'));
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
