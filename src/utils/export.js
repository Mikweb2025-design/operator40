/* CSV export + calendar helpers */

function csvEscape(v) {
  const s = String(v ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n')) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function exportCSV(sessions, waistHistory, weightHistory) {
  const rows = [
    ['date', 'program', 'kcal', 'duration_min', 'hr_peak', 'rpe', 'waist_cm', 'weight_kg', 'notes'],
  ];
  // Build lookup for waist/weight by day
  const waistByDay = {};
  (waistHistory || []).forEach((w) => {
    const d = new Date(w.date).toISOString().slice(0, 10);
    waistByDay[d] = w.cm;
  });
  const weightByDay = {};
  (weightHistory || []).forEach((w) => {
    const d = new Date(w.date).toISOString().slice(0, 10);
    weightByDay[d] = w.kg;
  });
  (sessions || []).forEach((s) => {
    const day = new Date(s.date).toISOString().slice(0, 10);
    rows.push([
      s.date,
      s.programId || s.programName || '',
      s.kcal ?? '',
      s.durationSec ? Math.round(s.durationSec / 60) : '',
      s.hr ?? '',
      s.rpe ?? '',
      waistByDay[day] ?? '',
      weightByDay[day] ?? '',
      (s.notes || '').replace(/\n/g, ' '),
    ]);
  });
  const csv = rows.map((r) => r.map(csvEscape).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `operator40-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function buildCalendarGrid(sessions, year, monthIndex) {
  // monthIndex 0-11, returns array of { day, sessions: [] } for that month
  const first = new Date(year, monthIndex, 1);
  const last = new Date(year, monthIndex + 1, 0);
  const days = [];
  const byDay = {};
  (sessions || []).forEach((s) => {
    const d = new Date(s.date).toISOString().slice(0, 10);
    if (!byDay[d]) byDay[d] = [];
    byDay[d].push(s);
  });
  for (let d = 1; d <= last.getDate(); d++) {
    const key = new Date(year, monthIndex, d).toISOString().slice(0, 10);
    days.push({
      day: d,
      key,
      sessions: byDay[key] || [],
      isToday: key === new Date().toISOString().slice(0, 10),
    });
  }
  const pad = (first.getDay() + 6) % 7; // Monday = 0
  return { pad, days, year, monthIndex };
}
