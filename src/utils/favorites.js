export function loadFavorites() {
  try {
    const v = localStorage.getItem('o40_favs');
    return v ? JSON.parse(v) : [];
  } catch { return []; }
}
export function saveFavorites(list) {
  try { localStorage.setItem('o40_favs', JSON.stringify(list)); } catch {}
}
export function toggleFavorite(list, id) {
  const next = list.includes(id) ? list.filter(x => x !== id) : [...list, id];
  saveFavorites(next);
  return next;
}
export function isFav(list, id) { return list.includes(id); }
