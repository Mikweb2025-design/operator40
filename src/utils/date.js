export function formatTime(s) {
  const m = Math.floor(s / 60),
    sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export function dayKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function sessionDayKey(s) {
  return dayKey(new Date(s.date));
}
