export function loadPhotos() {
  try { const v = localStorage.getItem('o40_photos'); return v ? JSON.parse(v) : []; } catch { return []; }
}
export function savePhotos(list) {
  try { localStorage.setItem('o40_photos', JSON.stringify(list.slice(-12))); } catch {}
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
