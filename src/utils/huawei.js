/**
 * Huawei Health — parser 100% locale (niente cloud)
 * Supporta:
 *  - HiHealth JSON export (Huawei Health → Richiedi i tuoi dati → ZIP → JSON)
 *  - TCX (Huawei Watch GT esporta TCX standard)
 *  - CSV semplice (start_time,end_time,exercise_type,calories,duration)
 * Ritorna { weightKg, weightDate, workouts[] } compatibile con importAppleHealth
 */

// Tipi Huawei rilevanti → mapping come Apple Health
export const HUAWEI_ACTIVITY_MAP = {
  // codici numerici string + nomi
  '258': { it: 'Forza funzionale (Huawei Health)', en: 'Functional strength (Huawei)', de: 'Funktionelles Krafttraining (Huawei)' },
  '259': { it: 'Core training (Huawei Health)', en: 'Core training (Huawei)', de: 'Core-Training (Huawei)' },
  '260': { it: 'Allenamento forza (Huawei Health)', en: 'Strength training (Huawei)', de: 'Krafttraining (Huawei)' },
  '264': { it: 'HIIT (Huawei Health)', en: 'HIIT (Huawei)', de: 'HIIT (Huawei)' },
  '19':  { it: 'Cross training (Huawei Health)', en: 'Cross training (Huawei)', de: 'Cross-Training (Huawei)' },
  '0':   { it: 'Corsa (Huawei Health)', en: 'Running (Huawei)', de: 'Laufen (Huawei)' },
  '1':   { it: 'Camminata (Huawei Health)', en: 'Walking (Huawei)', de: 'Gehen (Huawei)' },
  // nomi testuali che Huawei usa in alcuni export
  'functional': { it: 'Forza funzionale (Huawei Health)', en: 'Functional strength (Huawei)', de: 'Funktionelles Krafttraining (Huawei)' },
  'strength': { it: 'Allenamento forza (Huawei Health)', en: 'Strength training (Huawei)', de: 'Krafttraining (Huawei)' },
  'hiit': { it: 'HIIT (Huawei Health)', en: 'HIIT (Huawei)', de: 'HIIT (Huawei)' },
  'cross': { it: 'Cross training (Huawei Health)', en: 'Cross training (Huawei)', de: 'Cross-Training (Huawei)' },
};
export const HUAWEI_FALLBACK = { it: 'Allenamento (Huawei Health)', en: 'Workout (Huawei)', de: 'Training (Huawei)' };
const HUAWEI_RELEVANT = new Set(Object.keys(HUAWEI_ACTIVITY_MAP));

function toHuaweiTypeKey(raw) {
  if (raw == null) return null;
  const s = String(raw).toLowerCase().trim();
  // numerico diretto
  if (HUAWEI_RELEVANT.has(s)) return s;
  // cerca sottostringa
  for (const k of HUAWEI_RELEVANT) {
    if (s.includes(k)) return k;
  }
  // prova mapping sportType numerico comune Huawei
  const num = String(parseInt(s, 10));
  if (HUAWEI_RELEVANT.has(num)) return num;
  return null;
}

function parseHuaweiDate(v) {
  if (v == null) return null;
  // Huawei usa spesso timestamp ms, oppure ISO
  if (typeof v === 'number' || /^\d{12,13}$/.test(String(v))) {
    const d = new Date(Number(v));
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(String(v).replace(' ', 'T'));
  return isNaN(d.getTime()) ? null : d;
}

export function parseHuaweiHealthExport(text, fileName = '') {
  const result = { weightKg: null, weightDate: null, workouts: [] };
  const lowerName = fileName.toLowerCase();

  // 1) Prova JSON
  if (lowerName.endsWith('.json') || text.trim().startsWith('{') || text.trim().startsWith('[')) {
    try {
      const j = JSON.parse(text);
      return parseHuaweiJson(j, result);
    } catch {}
  }

  // 2) Prova TCX (XML con <TrainingCenterDatabase)
  if (text.includes('<TrainingCenterDatabase') || text.includes('<Activities>')) {
    return parseHuaweiTcx(text, result);
  }

  // 3) Prova CSV
  if (text.includes('start_time') || text.includes('startTime') || text.split('\n')[0]?.includes(',')) {
    const csvRes = parseHuaweiCsv(text, result);
    if (csvRes.workouts.length) return csvRes;
  }

  // fallback: prova comunque come JSON generico
  try {
    const j = JSON.parse(text);
    return parseHuaweiJson(j, result);
  } catch {}
  return result;
}

function parseHuaweiJson(j, result) {
  // Huawei JSON è variabile: prova più chiavi
  let arr = null;
  if (Array.isArray(j)) arr = j;
  else if (Array.isArray(j.workouts)) arr = j.workouts;
  else if (Array.isArray(j.workoutRecords)) arr = j.workoutRecords;
  else if (Array.isArray(j.exerciseRecords)) arr = j.exerciseRecords;
  else if (Array.isArray(j.sportsData)) arr = j.sportsData;
  else if (Array.isArray(j.data)) arr = j.data;
  else if (Array.isArray(j.samples)) arr = j.samples;
  else if (j.workout) arr = [j.workout];
  else {
    // cerca prima array di oggetti con startTime
    for (const v of Object.values(j)) {
      if (Array.isArray(v) && v[0] && (v[0].startTime || v[0].start_time || v[0].sportType !== undefined)) {
        arr = v; break;
      }
    }
  }
  if (!arr) {
    // prova anche wrapper HiHealth: { "hihealth": { "workouts": [...] } }
    if (j.hihealth && Array.isArray(j.hihealth.workouts)) arr = j.hihealth.workouts;
    if (!arr) return result;
  }

  // peso: cerca weight in vari punti
  const weightCandidates = [
    j.weight, j.bodyWeight, j.weightKg, j.currentWeight,
    j?.body?.weight, j?.health?.weight, j?.profile?.weight,
  ];
  for (const w of weightCandidates) {
    if (w != null) {
      const n = parseFloat(String(w).replace(',', '.'));
      if (!isNaN(n) && n > 20 && n < 300) {
        result.weightKg = Math.round(n * 10) / 10;
        result.weightDate = new Date().toISOString();
        break;
      }
    }
  }
  // cerca anche samplePoints con type weight
  if (result.weightKg == null && arr) {
    for (const s of arr) {
      if (String(s.type || s.dataType || '').toLowerCase().includes('weight') && s.value) {
        const n = parseFloat(s.value);
        if (!isNaN(n)) { result.weightKg = Math.round(n*10)/10; result.weightDate = s.startTime || s.time; break; }
      }
    }
  }

  let wcount = 0;
  for (const w of arr) {
    if (wcount >= 5000) break;
    const typeRaw = w.sportType ?? w.exerciseType ?? w.type ?? w.activityType ?? w.workoutType ?? w.sport_type;
    const key = toHuaweiTypeKey(typeRaw);
    // se non rilevante ma ha durata/calorie, includi comunque come fallback (meglio importare che scartare)
    const startRaw = w.startTime ?? w.start_time ?? w.startDate ?? w.beginTime ?? w.time;
    const d = parseHuaweiDate(startRaw);
    if (!d) continue;
    // filtro: se tipo non rilevante ma durata >0 e calorie, includi se l'utente ha pochi tipi
    const isRelevant = key && HUAWEI_RELEVANT.has(key);
    // se il tipo è sconosciuto ma sembra workout (ha duration/calorie), includilo comunque
    const hasMetrics = (w.duration ?? w.totalTime ?? w.calorie ?? w.calories) != null;
    if (!isRelevant && !hasMetrics) continue;

    const durSecRaw = w.duration ?? w.totalTime ?? w.durationSec ?? w.sportTime ?? 0;
    const durMin = durSecRaw > 300 ? Math.round(Number(durSecRaw) / 60) : Math.round(Number(durSecRaw) || 15);
    const kcalRaw = w.calorie ?? w.calories ?? w.cal ?? w.totalCalories ?? w.energy;
    const kcal = kcalRaw ? Math.round(parseFloat(kcalRaw)) : Math.round(durMin * 6);
    const typeKey = key || '258';
    result.workouts.push({ type: typeKey, durationMin: durMin || 15, kcal, startDate: d.toISOString() });
    wcount++;
  }
  return result;
}

function parseHuaweiTcx(xmlText, result) {
  // TCX: <Activity><Lap StartTime="..."><TotalTimeSeconds>...<Calories>...
  const activityRegex = /<Activity[^>]*>([\s\S]*?)<\/Activity>/g;
  const lapRegex = /<Lap[^>]*StartTime="([^"]*)"[^>]*>([\s\S]*?)<\/Lap>/g;
  let m;
  let count = 0;
  while ((m = activityRegex.exec(xmlText)) && count < 5000) {
    const activityBody = m[1];
    const sport = (m[0].match(/Sport="([^"]*)"/) || [])[1] || 'Other';
    let lapMatch;
    while ((lapMatch = lapRegex.exec(activityBody)) && count < 5000) {
      const start = lapMatch[1];
      const lapBody = lapMatch[2];
      const secStr = (lapBody.match(/<TotalTimeSeconds>([^<]*)<\/TotalTimeSeconds>/) || [])[1];
      const kcalStr = (lapBody.match(/<Calories>([^<]*)<\/Calories>/) || [])[1];
      const sec = secStr ? parseFloat(secStr) : 0;
      const kcal = kcalStr ? Math.round(parseFloat(kcalStr)) : Math.round((sec/60)*6);
      const durMin = Math.round(sec/60) || 15;
      const typeKey = toHuaweiTypeKey(sport) || '258';
      result.workouts.push({ type: typeKey, durationMin: durMin, kcal, startDate: start });
      count++;
    }
    // se non ci sono Lap, prova a cercare direttamente
    if (count === 0) {
      const secStr = (activityBody.match(/<TotalTimeSeconds>([^<]*)<\/TotalTimeSeconds>/) || [])[1];
      if (secStr) {
        const start = (activityBody.match(/StartTime="([^"]*)"/) || [])[1];
        if (start) {
          result.workouts.push({ type: toHuaweiTypeKey(sport) || '258', durationMin: Math.round(parseFloat(secStr)/60)||15, kcal: Math.round((parseFloat(secStr)/60)*6), startDate: start });
          count++;
        }
      }
    }
  }
  return result;
}

function parseHuaweiCsv(text, result) {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (!lines.length) return result;
  const header = lines[0].toLowerCase().split(/[,;]/).map(s => s.trim());
  const idxStart = header.findIndex(h => h.includes('start'));
  const idxEnd = header.findIndex(h => h.includes('end'));
  const idxType = header.findIndex(h => h.includes('type') || h.includes('sport') || h.includes('exercise'));
  const idxKcal = header.findIndex(h => h.includes('kcal') || h.includes('calorie') || h.includes('cal'));
  const idxDur = header.findIndex(h => h.includes('duration') || h.includes('time') || h.includes('durata'));
  const idxWeight = header.findIndex(h => h.includes('weight') || h.includes('peso'));

  let wcount = 0;
  for (let i = 1; i < lines.length && wcount < 5000; i++) {
    const cols = lines[i].split(/[,;]/);
    if (cols.length < 2) continue;
    // peso
    if (idxWeight >= 0 && cols[idxWeight]) {
      const n = parseFloat(cols[idxWeight].replace(',', '.'));
      if (!isNaN(n) && n > 20 && n < 300 && result.weightKg == null) {
        result.weightKg = Math.round(n*10)/10;
        result.weightDate = cols[idxStart] || new Date().toISOString();
      }
    }
    const startRaw = idxStart >= 0 ? cols[idxStart] : cols[0];
    const d = parseHuaweiDate(startRaw);
    if (!d) continue;
    const typeRaw = idxType >= 0 ? cols[idxType] : '258';
    const kcalRaw = idxKcal >= 0 ? cols[idxKcal] : null;
    const durRaw = idxDur >= 0 ? cols[idxDur] : null;
    const durMin = durRaw ? Math.round(parseFloat(durRaw) / 60) || Math.round(parseFloat(durRaw)) || 15 : 15;
    const kcal = kcalRaw ? Math.round(parseFloat(kcalRaw)) : Math.round(durMin * 6);
    const key = toHuaweiTypeKey(typeRaw) || '258';
    result.workouts.push({ type: key, durationMin: durMin, kcal, startDate: d.toISOString() });
    wcount++;
  }
  return result;
}
