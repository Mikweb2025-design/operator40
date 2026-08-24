export async function loadFavoritesAsync() {
  try {
    const r = await window.storage.get('o40_favs');
    if (!r?.value) return [];
    return JSON.parse(r.value);
  } catch { return []; }
}

export function loadFavorites() {
  try {
    const v = localStorage.getItem('o40_favs');
    return v ? JSON.parse(v) : [];
  } catch { return []; }
}

export async function saveFavoritesAsync(list) {
  try { await window.storage.set('o40_favs', JSON.stringify(list)); } catch {}
}

export function saveFavorites(list) {
  try { localStorage.setItem('o40_favs', JSON.stringify(list)); } catch {}
  saveFavoritesAsync(list).catch(() => {});
}

export function toggleFavorite(list, id) {
  const next = list.includes(id) ? list.filter(x => x !== id) : [...list, id];
  saveFavorites(next);
  return next;
}

export function isFav(list, id) { return list.includes(id); }
