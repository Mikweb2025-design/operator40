const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-CtqCXpCe.js","./icons-D3QZqbji.js","./charts-Bi7lEBzN.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { r as reactExports, T as Trophy, a as Timer, C as Check, b as ChevronRight, R as React, S as Sparkles$1, X, Z as Zap, d as ChevronLeft$1, V as Volume2, e as VolumeX, f as Vibrate, h as SkipForward, M as Music, i as Music2, H as HeadphoneOff, j as RefreshCw$1, k as Crown, l as Medal, B as Bell, m as BellOff, n as Send, o as HeartPulse, F as Flame, I as Info, p as Star, q as RotateCcw, s as Target, E as Eye, t as BookOpen, u as TrendingUp, L as Lightbulb, v as Ruler, w as TrendingDown, x as Scale, y as Settings, z as Trash2, P as Plus, A as Play, W as Wind$1, D as Pause, G as ShieldCheck, J as House, K as History } from "./icons-D3QZqbji.js";
import { r as reactDomExports, R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, L as LineChart, b as Line } from "./charts-Bi7lEBzN.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a) m$1.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var createRoot;
var m = reactDomExports;
{
  createRoot = m.createRoot;
  m.hydrateRoot;
}
const LANGS = ["it", "en", "de"];
const LOCALES = { it: "it-IT", en: "en-US", de: "de-DE" };
function detectLang() {
  try {
    const raw = typeof navigator !== "undefined" && navigator.language || "it";
    const base = raw.split("-")[0].toLowerCase();
    return LANGS.includes(base) ? base : "en";
  } catch (e) {
    return "it";
  }
}
function tr$1(x, lang) {
  if (x && typeof x === "object" && !Array.isArray(x)) {
    if (lang && x[lang]) return x[lang];
    return x.it;
  }
  return x;
}
function translate(key, lang, vars) {
  let v = I18N[key];
  if (v && typeof v === "object" && !Array.isArray(v)) v = tr$1(v, lang);
  if (v == null) v = key;
  if (vars) {
    for (const k2 in vars) {
      v = String(v).split(`{${k2}}`).join(String(vars[k2]));
    }
  }
  return v;
}
const I18N = {
  /* ---- app shell / loading ---- */
  "app.loading": { it: "CARICAMENTO", en: "LOADING", de: "LADEN" },
  "app.loading.operativo": { it: "OPERATIVO", en: "OPERATIVE", de: "OPERATIV" },
  "app.back": { it: "Indietro", en: "Back", de: "Zurück" },
  /* ---- bottom navigation ---- */
  "nav.home": { it: "Base", en: "Home", de: "Basis" },
  "nav.library": { it: "Libreria", en: "Library", de: "Übungen" },
  "nav.history": { it: "Statistiche", en: "Stats", de: "Statistik" },
  "nav.setup": { it: "Impostazioni", en: "Settings", de: "Einstellungen" },
  /* ---- countdown ---- */
  "countdown.go": { it: "VIA!", en: "GO!", de: "LOS!" },
  "countdown.prepare": { it: "Preparati…", en: "Get ready…", de: "Mach dich bereit…" },
  /* ---- setup screen ---- */
  "setup.title": { it: "SCHEDA OPERATORE", en: "OPERATOR CARD", de: "OPERATOR-PROFIL" },
  "setup.intro": {
    it: 'Obiettivo del Campo: <b style="color:#EDE8D8">dimagrire e tonificare la pancia</b> con 15 min al giorno. I dati servono solo per calcolare calorie e zone di frequenza cardiaca. Restano su questo dispositivo.',
    en: 'Camp objective: <b style="color:#EDE8D8">slim down and tone your belly</b> in 15 minutes a day. Your data is only used to estimate calories and heart-rate zones. It stays on this device.',
    de: 'Camp-Ziel: <b style="color:#EDE8D8">Bauchfett abbauen und den Bauch straffen</b> in 15 Minuten pro Tag. Deine Daten dienen nur zur Berechnung von Kalorien und Herzfrequenzzonen. Sie bleiben auf diesem Gerät.'
  },
  "setup.language": { it: "Lingua", en: "Language", de: "Sprache" },
  "setup.name": { it: "Nominativo (opzionale)", en: "Name (optional)", de: "Name (optional)" },
  "setup.name.ph": { it: "es. Danny", en: "e.g. Danny", de: "z. B. Danny" },
  "setup.age": { it: "Età", en: "Age", de: "Alter" },
  "setup.weight": { it: "Peso (kg)", en: "Weight (kg)", de: "Gewicht (kg)" },
  "setup.waist": { it: "Girovita (cm) — la misura della pancia", en: "Waist (cm) — the belly measurement", de: "Bauchumfang (cm) — die Bauchmessung" },
  "setup.waist.ph": { it: "es. 98", en: "e.g. 98", de: "z. B. 98" },
  "setup.sounds": { it: "Suoni", en: "Sounds", de: "Töne" },
  "setup.vibration": { it: "Vibrazione", en: "Vibration", de: "Vibration" },
  "setup.skip": { it: "Salta riscaldamento/defaticamento", en: "Skip warm-up/cooldown", de: "Aufwärmen/Abkühlen überspringen" },
  "setup.music": { it: "Musica motivazionale", en: "Motivational music", de: "Motivationsmusik" },
  "setup.music.pick": { it: "Scegli la colonna sonora del tuo allenamento:", en: "Choose the soundtrack for your workout:", de: "Wähle den Soundtrack für dein Training:" },
  "setup.music.playing": { it: "IN SUONO", en: "PLAYING", de: "LÄUFT" },
  "setup.music.listen": { it: "ASCOLTA", en: "LISTEN", de: "HÖREN" },
  "setup.music.note": {
    it: "Musica royalty-free: NEFFEX · CC BY 3.0 · Marce e inni IT/DE: pubblico dominio · Bella ciao: CC BY-SA 4.0. File locali: funziona offline e non lascia mai il telefono.",
    en: "Royalty-free music: NEFFEX · CC BY 3.0 · IT/DE marches & anthems: public domain · Bella ciao: CC BY-SA 4.0. Local files: works offline and never leaves your phone.",
    de: "Lizenzfreie Musik: NEFFEX · CC BY 3.0 · IT/DE-Märsche & Hymnen: Public Domain · Bella ciao: CC BY-SA 4.0. Lokale Dateien: funktioniert offline und verlässt nie dein Handy."
  },
  "setup.level": { it: "Livello di difficoltà", en: "Difficulty level", de: "Schwierigkeitsgrad" },
  "setup.level.hint": {
    it: "Più sali, più aumenta il ritmo lavoro/recupero: la progressione è ciò che garantisce i risultati.",
    en: "The higher you go, the faster the work/rest rhythm: progression is what guarantees results.",
    de: "Je höher, desto schneller der Arbeits-/Pausentakt: Progression garantiert die Ergebnisse."
  },
  "setup.health": { it: "Importa da Apple Health", en: "Import from Apple Health", de: "Von Apple Health importieren" },
  "setup.health.body": {
    it: "Non posso collegarmi in diretta ad Apple Health (nessuna API web esiste per HealthKit). Puoi però esportare i tuoi dati dall'app Salute (foto profilo → Esporta tutti i dati sanitari) e caricare qui il file <strong>export.xml</strong>: viene letto ed elaborato interamente su questo dispositivo, non lascia mai il telefono. Importo allenamenti di forza/core/HIIT e l'ultimo peso registrato.",
    en: "I can't connect directly to Apple Health (no web API exists for HealthKit). But you can export your data from the Health app (profile photo → Export All Health Data) and upload the export.xml file here: it's read and processed entirely on this device and never leaves your phone. I import strength/core/HIIT workouts and your latest recorded weight.",
    de: "Eine direkte Verbindung zu Apple Health ist nicht möglich (für HealthKit gibt es keine Web-API). Du kannst deine Daten aber in der Health-App exportieren (Profilbild → Alle Gesundheitsdaten exportieren) und hier die Datei export.xml hochladen: Sie wird vollständig auf diesem Gerät gelesen und verarbeitet und verlässt nie dein Handy. Ich importiere Kraft-/Core-/HIIT-Workouts und das zuletzt erfasste Gewicht."
  },
  "setup.health.processing": { it: "ELABORAZIONE…", en: "PROCESSING…", de: "VERARBEITE…" },
  "setup.health.upload": { it: "CARICA export.xml", en: "UPLOAD export.xml", de: "export.xml HOCHLADEN" },
  "setup.health.error": {
    it: "File non riconosciuto: assicurati di caricare export.xml (non lo zip).",
    en: "Unrecognized file: make sure you upload export.xml (not the zip).",
    de: "Datei nicht erkannt: lade export.xml hoch (nicht die ZIP-Datei)."
  },
  "setup.health.weight": { it: "Peso più recente in Apple Health:", en: "Most recent weight in Apple Health:", de: "Neuestes Gewicht in Apple Health:" },
  "setup.health.apply": { it: "Aggiorna", en: "Update", de: "Aktualisieren" },
  "setup.tech.note": {
    it: "Nota tecnica: dal browser non posso collegarmi direttamente al tuo Huawei Watch (niente accesso Bluetooth/API Huawei Health nell'app). Dopo ogni sessione ti chiederò di leggere il picco battito dal Watch e inserirlo qui a mano — richiede 5 secondi e tengo lo storico.",
    en: "Technical note: from the browser I can't connect directly to your Huawei Watch (no Bluetooth/Huawei Health API access in the app). After each session I'll ask you to read the peak heart rate from the Watch and enter it here by hand — it takes 5 seconds and I keep the history.",
    de: "Technischer Hinweis: Vom Browser aus kann ich keine direkte Verbindung zu deiner Huawei Watch herstellen (kein Bluetooth-/Huawei-Health-API-Zugriff in der App). Nach jeder Session wirst du gebeten, die Spitzen-Herzfrequenz von der Watch abzulesen und hier manuell einzutragen — das dauert 5 Sekunden und ich speichere den Verlauf."
  },
  "setup.enlist": { it: "ARRUOLATI", en: "ENLIST", de: "EINRÜCKEN" },
  /* ---- home screen ---- */
  "home.towards": { it: "verso", en: "toward", de: "bis zu" },
  "home.day": { it: "GIORNO", en: "DAY", de: "TAG" },
  "home.min15": { it: "15 MIN AL GIORNO", en: "15 MIN A DAY", de: "15 MIN PRO TAG" },
  "home.mission": { it: "MISSIONE", en: "MISSION", de: "MISSION" },
  "home.intro": {
    it: "Obiettivo: <b>dimagrire e tonificare la pancia</b>. Il Campo di 30 giorni ti dà una missione da 15 min ogni giorno: costanza e progressione sono il risultato garantito. Misura il <b>girovita</b> ogni settimana nel riepilogo.",
    en: "Goal: <b>slim down and tone your belly</b>. The 30-day Camp gives you a 15-minute mission every day: consistency and progression are the guaranteed result. Measure your <b>waist</b> every week in the summary.",
    de: "Ziel: <b>Bauchfett abbauen und den Bauch straffen</b>. Das 30-Tage-Camp gibt dir jeden Tag eine 15-Minuten-Mission: Konstanz und Progression sind das garantierte Ergebnis. Miss deinen <b>Bauchumfang</b> jede Woche in der Zusammenfassung."
  },
  "home.intro.close": { it: "Chiudi", en: "Close", de: "Schließen" },
  /* ---- dog tags ---- */
  "dt.streak": { it: "Serie", en: "Streak", de: "Serie" },
  "dt.sessions": { it: "Sessioni", en: "Sessions", de: "Sessions" },
  "dt.kcal": { it: "Kcal", en: "kcal", de: "kcal" },
  "dt.day": { it: "giorno", en: "day", de: "Tag" },
  "dt.days": { it: "giorni", en: "days", de: "Tage" },
  "dt.total": { it: "totali", en: "total", de: "gesamt" },
  "dt.7d": { it: "7 giorni", en: "7 days", de: "7 Tage" },
  "dt.duration": { it: "Durata", en: "Duration", de: "Dauer" },
  "dt.estkcal": { it: "Kcal stimate", en: "Est. kcal", de: "Gesch. kcal" },
  "dt.rounds": { it: "Round", en: "Rounds", de: "Runden" },
  "dt.record": { it: "Record", en: "Best", de: "Rekord" },
  "dt.beststreak": { it: "miglior serie", en: "best streak", de: "beste Serie" },
  "dt.minutes": { it: "Minuti", en: "Minutes", de: "Minuten" },
  "dt.trained": { it: "allenati", en: "trained", de: "trainiert" },
  "dt.avgkcal": { it: "Media kcal", en: "Avg kcal", de: "Ø kcal" },
  "dt.permission": { it: "a missione", en: "per mission", de: "pro Mission" },
  "dt.weeks": { it: "Settimane", en: "Weeks", de: "Wochen" },
  "dt.perweek": { it: "sess./sett. media", en: "sessions/week avg", de: "Sessionen/Woche Ø" },
  /* ---- ticker ---- */
  "ticker.streak": { it: "SERIE", en: "STREAK", de: "SERIE" },
  "ticker.sessions": { it: "SESSIONI", en: "SESSIONS", de: "SESSIONS" },
  "ticker.kcal": { it: "KCAL", en: "KCAL", de: "KCAL" },
  "ticker.week7": { it: "7G", en: "7D", de: "7T" },
  "ticker.level": { it: "LIVELLO", en: "LEVEL", de: "LEVEL" },
  "ticker.mission": { it: "MISSIONE", en: "MISSION", de: "MISSION" },
  "ticker.goal": { it: "OBIETTIVO", en: "GOAL", de: "ZIEL" },
  "ticker.week": { it: "SETTIMANA", en: "WEEK", de: "WOCHE" },
  "ticker.rank": { it: "RANGO", en: "RANK", de: "RANG" },
  /* ---- home cards ---- */
  "home.waist.title": { it: "GIROVITA", en: "WAIST", de: "BAUCHUMFANG" },
  "home.waist.sub": { it: "(pancia)", en: "(belly)", de: "(Bauch)" },
  "home.waist.last": { it: "Ultima misura: {v} cm", en: "Last measurement: {v} cm", de: "Letzte Messung: {v} cm" },
  "home.waist.delta": { it: "{v} cm dalla prima", en: "{v} cm from the first", de: "{v} cm seit der ersten" },
  "home.waist.empty": {
    it: "Misuralo nel riepilogo: è l'indicatore più affidabile del dimagrimento",
    en: "Measure it in the summary: it's the most reliable fat-loss indicator",
    de: "Miss ihn in der Zusammenfassung: Der zuverlässigste Abnehm-Indikator"
  },
  "home.weight.title": { it: "PESO", en: "WEIGHT", de: "GEWICHT" },
  "home.weight.sub": { it: "(media settimanale)", en: "(weekly average)", de: "(Wochendurchschnitt)" },
  "home.weight.last": { it: "Ultima rilevazione: {v} kg", en: "Last reading: {v} kg", de: "Letzte Messung: {v} kg" },
  "home.weight.delta": { it: "{v} kg dalla prima", en: "{v} kg from the first", de: "{v} kg seit der ersten" },
  "home.weight.empty": {
    it: "Registralo nel riepilogo dopo l'allenamento",
    en: "Log it in the summary after your workout",
    de: "Trage es nach dem Training in der Zusammenfassung ein"
  },
  "home.trendok": { it: "TREND OK", en: "TREND OK", de: "TREND OK" },
  "home.start": { it: "INIZIA", en: "START", de: "START" },
  "home.promote.title": { it: "PRONTO PER {lvl}", en: "READY FOR {lvl}", de: "BEREIT FÜR {lvl}" },
  "home.promote.body": {
    it: "Ultime sessioni facili: aumenta il ritmo, i risultati crescono con la progressione.",
    en: "Recent sessions were easy: increase the pace, results grow with progression.",
    de: "Die letzten Sessions waren leicht: Erhöhe das Tempo, Ergebnisse wachsen durch Progression."
  },
  "home.promote.btn": { it: "PROMUOVI", en: "PROMOTE", de: "BEFÖRDERN" },
  "home.goal.title": { it: "Obiettivo settimanale", en: "Weekly goal", de: "Wochenziel" },
  "home.next.title": { it: "Prossimo traguardo: ancora {n} {unit}", en: "Next milestone: {n} {unit} to go", de: "Nächstes Ziel: noch {n} {unit}" },
  "home.unit.streak1": { it: "giorno di serie", en: "day of streak", de: "Tag in Serie" },
  "home.unit.streakN": { it: "giorni di serie", en: "days of streak", de: "Tage in Serie" },
  "home.unit.session1": { it: "sessione", en: "session", de: "Session" },
  "home.unit.sessionN": { it: "sessioni", en: "sessions", de: "Sessions" },
  "home.mission.title": { it: "Missione di oggi", en: "Today's mission", de: "Mission von heute" },
  "home.mission.tag": { it: "MISSIONE {id}", en: "MISSION {id}", de: "MISSION {id}" },
  "home.mission.adaptive": {
    it: "Sessione precedente intensa → oggi si punta su core e mobilità",
    en: "Previous session intense → today focuses on core and mobility",
    de: "Vorherige Session intensiv → heute Fokus auf Core und Mobilität"
  },
  "home.mission.min": { it: "~15 min", en: "~15 min", de: "~15 min" },
  "home.mission.noequip": { it: "Senza attrezzi", en: "No equipment", de: "Ohne Geräte" },
  "home.mission.ex": { it: "{n} esercizi", en: "{n} exercises", de: "{n} Übungen" },
  "home.mission.see": { it: "VEDI MISSIONE", en: "VIEW MISSION", de: "MISSION ANSEHEN" },
  "home.repeat": { it: "RIPETI L'ULTIMA: {name}", en: "REPEAT LAST: {name}", de: "LETZTE WIEDERHOLEN: {name}" },
  "home.quick.min": { it: "~5 min", en: "~5 min", de: "~5 min" },
  "home.other": { it: "Altre missioni", en: "Other missions", de: "Andere Missionen" },
  "home.yours": { it: "Le tue missioni", en: "Your missions", de: "Deine Missionen" },
  "home.custom.ex": { it: "{n} esercizi", en: "{n} exercises", de: "{n} Übungen" },
  "home.custom.create": { it: "CREA MISSIONE PERSONALIZZATA", en: "CREATE CUSTOM MISSION", de: "EIGENE MISSION ERSTELLEN" },
  "home.custom.delete": { it: "Elimina missione", en: "Delete mission", de: "Mission löschen" },
  /* ---- library ---- */
  "lib.title": { it: "LIBRERIA", en: "LIBRARY", de: "ÜBUNGEN" },
  "lib.sub": {
    it: "Tutti gli esercizi, con note tecniche per over 40",
    en: "All exercises, with over-40 technical notes",
    de: "Alle Übungen, mit technischen Hinweisen für Ü40"
  },
  "lib.all": { it: "Tutti", en: "All", de: "Alle" },
  "lib.standing": { it: "In piedi", en: "Standing", de: "Im Stehen" },
  "lib.ground": { it: "A terra", en: "On the floor", de: "Am Boden" },
  "lib.core": { it: "Addome", en: "Core", de: "Bauch" },
  /* ---- builder ---- */
  "bld.title": { it: "CREA MISSIONE", en: "CREATE MISSION", de: "MISSION ERSTELLEN" },
  "bld.name": { it: "Nome missione (opzionale)", en: "Mission name (optional)", de: "Missionsname (optional)" },
  "bld.name.ph": { it: "es. Gambe e cuore", en: "e.g. Legs & cardio", de: "z. B. Beine & Herz" },
  "bld.rounds": { it: "Round", en: "Rounds", de: "Runden" },
  "bld.exercises": { it: "Esercizi ({sel}/10, minimo 3)", en: "Exercises ({sel}/10, min 3)", de: "Übungen ({sel}/10, mind. 3)" },
  "bld.min": { it: "~{m} min", en: "~{m} min", de: "~{m} min" },
  "bld.kcal": { it: "~{k} kcal", en: "~{k} kcal", de: "~{k} kcal" },
  "bld.create.go": { it: "CREA E VAI", en: "CREATE & GO", de: "ERSTELLEN & LOS" },
  "bld.hint": { it: "Seleziona almeno 3 esercizi per continuare", en: "Select at least 3 exercises to continue", de: "Wähle mindestens 3 Übungen zum Fortfahren" },
  "bld.draft.name": { it: "Missione personalizzata", en: "Custom mission", de: "Eigene Mission" },
  "bld.draft.tagline": { it: "Creata da te", en: "Made by you", de: "Von dir erstellt" },
  /* ---- preview ---- */
  "prev.title": { it: "MISSIONE {id}", en: "MISSION {id}", de: "MISSION {id}" },
  "prev.sub": {
    it: "{n} esercizi · {r} round · {p} · tocca per ingrandire, l'icona per sostituire",
    en: "{n} exercises · {r} rounds · {p} · tap to enlarge, the icon to swap",
    de: "{n} Übungen · {r} Runden · {p} · tippen zum Vergrößern, das Symbol zum Ersetzen"
  },
  "prev.swapped": { it: "sostituito", en: "swapped", de: "ersetzt" },
  "prev.restore": { it: "ripristina {name}", en: "restore {name}", de: "{name} wiederherstellen" },
  "prev.swap": { it: "Sostituisci esercizio", en: "Swap exercise", de: "Übung ersetzen" },
  "prev.go": { it: "VIA!", en: "GO!", de: "LOS!" },
  /* ---- session ---- */
  "ses.warmup": { it: "RISCALDAMENTO", en: "WARM-UP", de: "AUFWÄRMEN" },
  "ses.cooldown": { it: "DEFATICAMENTO", en: "COOLDOWN", de: "ABKÜHLEN" },
  "ses.rest": { it: "RECUPERO", en: "REST", de: "PAUSE" },
  "ses.round": { it: "ROUND {r} · {name}", en: "ROUND {r} · {name}", de: "RUNDE {r} · {name}" },
  "ses.elapsed": { it: "TRASCORSO {t}", en: "ELAPSED {t}", de: "VERGANGEN {t}" },
  "ses.ex": { it: "ESERCIZIO {a}/{b}", en: "EXERCISE {a}/{b}", de: "ÜBUNG {a}/{b}" },
  "ses.next": { it: "Prossimo: {name}", en: "Next: {name}", de: "Als Nächstes: {name}" },
  "ses.next.rest": { it: "Recupero", en: "Rest", de: "Pause" },
  "ses.next.cooldown": { it: "Defaticamento", en: "Cooldown", de: "Abkühlen" },
  "ses.last": { it: "Ultima fase", en: "Last phase", de: "Letzte Phase" },
  "ses.music": { it: "Musica", en: "Music", de: "Musik" },
  "ses.resume": { it: "Riprendi", en: "Resume", de: "Fortsetzen" },
  "ses.pause": { it: "Pausa", en: "Pause", de: "Pause" },
  "ses.quit.title": { it: "ABBANDONARE LA MISSIONE?", en: "ABANDON THE MISSION?", de: "MISSION ABBRECHEN?" },
  "ses.quit.body": {
    it: "I progressi di questa sessione non verranno salvati.",
    en: "This session's progress won't be saved.",
    de: "Der Fortschritt dieser Session wird nicht gespeichert."
  },
  "ses.quit.continue": { it: "Continua", en: "Continue", de: "Fortsetzen" },
  "ses.quit.exit": { it: "Esci", en: "Exit", de: "Beenden" },
  /* ---- summary ---- */
  "sum.title": { it: "MISSIONE COMPIUTA", en: "MISSION COMPLETE", de: "MISSION ABGESCHLOSSEN" },
  "sum.share": {
    it: "Missione compiuta su Operator 40: {name} — {min} min, {kcal} kcal 💪",
    en: "Mission complete on Operator 40: {name} — {min} min, {kcal} kcal 💪",
    de: "Mission auf Operator 40 abgeschlossen: {name} — {min} min, {kcal} kcal 💪"
  },
  "sum.copied": { it: "COPIATO ✓", en: "COPIED ✓", de: "KOPIERT ✓" },
  "sum.sharebtn": { it: "CONDIVIDI", en: "SHARE", de: "TEILEN" },
  "sum.rpe.title": { it: "Come è andata?", en: "How did it go?", de: "Wie war es?" },
  "sum.notes.title": { it: "Note (opzionale)", en: "Notes (optional)", de: "Notizen (optional)" },
  "sum.notes.ph": { it: "es. ginocchio destro un po' rigido oggi", en: "e.g. right knee a bit stiff today", de: "z. B. rechtes Knie heute etwas steif" },
  "sum.waist.title": { it: "Girovita oggi (cm)", en: "Waist today (cm)", de: "Bauchumfang heute (cm)" },
  "sum.waist.body": {
    it: 'La misura della pancia è il dato più affidabile: registrala 1 volta a settimana (stessa ora, a stomaco vuoto). La diminuzione qui è il tuo "risultato sicuro".',
    en: 'The belly measurement is the most reliable metric: log it once a week (same time, on an empty stomach). The decrease here is your "guaranteed result".',
    de: "Der Bauchumfang ist die zuverlässigste Messung: Trage ihn 1× pro Woche ein (gleiche Uhrzeit, nüchtern). Der Rückgang hier ist dein „sicheres Ergebnis“."
  },
  "sum.waist.ph": { it: "es. 96", en: "e.g. 96", de: "z. B. 96" },
  "sum.weight.title": { it: "Peso oggi (kg)", en: "Weight today (kg)", de: "Gewicht heute (kg)" },
  "sum.weight.body": {
    it: "Pesati alla stessa ora (al mattino, a digiuno): la media settimanale è più utile del singolo valore.",
    en: "Weigh yourself at the same time (in the morning, fasting): the weekly average is more useful than a single value.",
    de: "Wiege dich zur gleichen Zeit (morgens, nüchtern): Der Wochenmittelwert ist aussagekräftiger als ein einzelner Wert."
  },
  "sum.weight.ph": { it: "es. 80.5", en: "e.g. 80.5", de: "z. B. 80.5" },
  "sum.weight.ph.dynamic": { it: "es. {v}", en: "e.g. {v}", de: "z. B. {v}" },
  "sum.hr.title": { it: "Battito di picco (Huawei Watch)", en: "Peak heart rate (Huawei Watch)", de: "Spitzen-Herzfrequenz (Huawei Watch)" },
  "sum.hr.remind": { it: "RICORDA", en: "REMEMBER", de: "ERINNERN" },
  "sum.hr.body": {
    it: "Apri l'app Huawei Health e leggi il valore massimo registrato durante l'allenamento, poi inseriscilo qui.",
    en: "Open the Huawei Health app, read the maximum value recorded during your workout, then enter it here.",
    de: "Öffne die Huawei-Health-App, lies den während des Trainings erfassten Maximalwert und trage ihn hier ein."
  },
  "sum.hr.ph": { it: "es. 142", en: "e.g. 142", de: "z. B. 142" },
  "sum.zone": { it: "Zona: {label}", en: "Zone: {label}", de: "Zone: {label}" },
  "sum.save": { it: "SALVA E TORNA ALLA BASE", en: "SAVE & RETURN TO BASE", de: "SPEICHERN & ZURÜCK ZUR BASIS" },
  /* ---- history ---- */
  "hist.title": { it: "STATISTICHE", en: "STATISTICS", de: "STATISTIK" },
  "hist.avgint": { it: "Intensità media (RPE)", en: "Average intensity (RPE)", de: "Durchschnittliche Intensität (RPE)" },
  "hist.bestweek.title": { it: "MIGLIORE SETTIMANA", en: "BEST WEEK", de: "BESTE WOCHE" },
  "hist.bestweek.sub": { it: "Il picco più alto di kcal in 7 giorni", en: "Highest kcal peak over 7 days", de: "Höchster kcal-Wert in 7 Tagen" },
  "hist.kcal.unit": { it: "kcal", en: "kcal", de: "kcal" },
  "hist.goal.title": { it: "Obiettivo settimanale", en: "Weekly goal", de: "Wochenziel" },
  "hist.goal.label": { it: "Missioni a settimana", en: "Missions per week", de: "Missionen pro Woche" },
  "hist.35d": { it: "Ultimi 35 giorni", en: "Last 35 days", de: "Letzte 35 Tage" },
  "hist.milestones": { it: "Traguardi", en: "Milestones", de: "Meilensteine" },
  "hist.miles.streak": { it: "{n}gg serie", en: "{n}d streak", de: "{n} Tage Serie" },
  "hist.miles.sessions": { it: "{n} sessioni", en: "{n} sessions", de: "{n} Sessions" },
  "hist.kcal7": { it: "Kcal, ultimi 7 giorni", en: "kcal, last 7 days", de: "kcal, letzte 7 Tage" },
  "hist.vsweek": { it: "{p}% vs sett. scorsa", en: "{p}% vs last week", de: "{p}% ggü. letzter Woche" },
  "hist.fav": { it: "Missioni preferite", en: "Favorite missions", de: "Beliebteste Missionen" },
  "hist.hr": { it: "Battito di picco nel tempo", en: "Peak heart rate over time", de: "Spitzen-Herzfrequenz im Verlauf" },
  "hist.waist": { it: "Girovita nel tempo (cm)", en: "Waist over time (cm)", de: "Bauchumfang im Verlauf (cm)" },
  "hist.waist.total": { it: "{v} cm totali", en: "{v} cm total", de: "{v} cm gesamt" },
  "hist.weight": { it: "Peso nel tempo (kg)", en: "Weight over time (kg)", de: "Gewicht im Verlauf (kg)" },
  "hist.weight.total": { it: "{v} kg totali", en: "{v} kg total", de: "{v} kg gesamt" },
  "hist.rpe": { it: "Intensità percepita nel tempo (RPE)", en: "Perceived intensity over time (RPE)", de: "Gefühlte Intensität im Verlauf (RPE)" },
  "hist.sessions.title": { it: "Sessioni", en: "Sessions", de: "Sessions" },
  "hist.empty": { it: "Nessuna missione ancora completata. Si parte quando vuoi.", en: "No mission completed yet. Start whenever you like.", de: "Noch keine Mission abgeschlossen. Starte, wann du willst." },
  "hist.export": { it: "ESPORTA DATI", en: "EXPORT DATA", de: "DATEN EXPORTIEREN" },
  "hist.clear": { it: "CANCELLA", en: "CLEAR", de: "LÖSCHEN" },
  "hist.clear.title": { it: "CANCELLARE TUTTO?", en: "DELETE EVERYTHING?", de: "ALLES LÖSCHEN?" },
  "hist.clear.body": {
    it: "Tutte le sessioni salvate andranno perse. Esporta prima un backup se vuoi conservarle.",
    en: "All saved sessions will be lost. Export a backup first if you want to keep them.",
    de: "Alle gespeicherten Sessions gehen verloren. Exportiere zuerst ein Backup, wenn du sie behalten willst."
  },
  "hist.clear.cancel": { it: "Annulla", en: "Cancel", de: "Abbrechen" },
  "hist.clear.confirm": { it: "Cancella", en: "Delete", de: "Löschen" },
  "hist.delete": { it: "Elimina sessione", en: "Delete session", de: "Session löschen" },
  /* ---- toasts ---- */
  "toast.level.up": { it: "Livello promosso: {label}", en: "Level promoted: {label}", de: "Level befördert: {label}" },
  "toast.promoted": { it: "Promosso a {rank}", en: "Promoted to {rank}", de: "Befördert zu {rank}" },
  "toast.milestone.streak": { it: "Traguardo sbloccato: {n} giorni di serie", en: "Milestone unlocked: {n}-day streak", de: "Meilenstein freigeschaltet: {n} Tage in Serie" },
  "toast.milestone.sessions": { it: "Traguardo sbloccato: {n} sessioni", en: "Milestone unlocked: {n} sessions", de: "Meilenstein freigeschaltet: {n} Sessions" },
  "toast.goal": { it: "Obiettivo settimanale raggiunto", en: "Weekly goal reached", de: "Wochenziel erreicht" },
  "toast.saved": { it: "Missione salvata", en: "Mission saved", de: "Mission gespeichert" },
  "toast.history": { it: "Cronologia cancellata", en: "History cleared", de: "Verlauf gelöscht" },
  "toast.removed": { it: "Sessione rimossa", en: "Session removed", de: "Session entfernt" },
  "toast.created": { it: "Missione creata", en: "Mission created", de: "Mission erstellt" },
  "toast.imported": { it: "Importati {n} allenamenti da Apple Health", en: "Imported {n} workouts from Apple Health", de: "{n} Workouts von Apple Health importiert" },
  "toast.imported.none": { it: "Nessun nuovo allenamento trovato", en: "No new workouts found", de: "Keine neuen Workouts gefunden" },
  "toast.import.fail": { it: "Import non riuscito: file non valido", en: "Import failed: invalid file", de: "Import fehlgeschlagen: ungültige Datei" },
  "toast.weight": { it: "Peso aggiornato", en: "Weight updated", de: "Gewicht aktualisiert" },
  /* ---- new features ---- */
  "notif.body": { it: "La tua missione di 15 min ti aspetta. Andiamo!", en: "Your 15-min mission is ready. Let’s go!", de: "Deine 15-Min-Mission wartet. Los geht’s!" },
  "notif.test.body": { it: "Le notifiche funzionano. A domani per la missione!", en: "Notifications work. See you tomorrow!", de: "Benachrichtigungen funktionieren. Bis morgen!" },
  "notif.setup.title": { it: "Promemoria giornaliero", en: "Daily reminder", de: "Tägliche Erinnerung" },
  "notif.setup.body": { it: "Ti avviso ogni giorno all’ora scelta (serve il permesso).", en: "I’ll remind you daily at the chosen time (permission required).", de: "Ich erinnere dich täglich zur gewählten Zeit (Erlaubnis erforderlich)." },
  "notif.enable": { it: "ATTIVA NOTIFICHE", en: "ENABLE NOTIFICATIONS", de: "BENACHRICHTIGUNGEN AKTIVIEREN" },
  "notif.disable": { it: "DISATTIVA", en: "DISABLE", de: "DEAKTIVIEREN" },
  "notif.test": { it: "TEST", en: "TEST", de: "TEST" },
  "share.session.title": { it: "Missione compiuta — Operator 40", en: "Mission complete — Operator 40", de: "Mission abgeschlossen — Operator 40" },
  "share.session.text": { it: "{name} — {min} min, {kcal} kcal 💪", en: "{name} — {min} min, {kcal} kcal 💪", de: "{name} — {min} min, {kcal} kcal 💪" },
  "share.copied": { it: "Link copiato", en: "Link copied", de: "Link kopiert" },
  "export.csv": { it: "ESPORTA CSV", en: "EXPORT CSV", de: "CSV EXPORTIEREN" },
  "export.calendar": { it: "Calendario", en: "Calendar", de: "Kalender" },
  "setup.height": { it: "Altezza (cm)", en: "Height (cm)", de: "Größe (cm)" },
  "setup.height.ph": { it: "es. 175", en: "e.g. 175", de: "z. B. 175" },
  "bmi.title": { it: "BMI", en: "BMI", de: "BMI" },
  "bmi.under": { it: "Sottopeso", en: "Underweight", de: "Untergewicht" },
  "bmi.ok": { it: "Normale", en: "Normal", de: "Normal" },
  "bmi.over": { it: "Sovrappeso", en: "Overweight", de: "Übergewicht" },
  "bmi.obese": { it: "Obesità", en: "Obesity", de: "Adipositas" },
  "bmi.tdee": { it: "TDEE stimato: {v} kcal/giorno", en: "Est. TDEE: {v} kcal/day", de: "Gesch. TDEE: {v} kcal/Tag" },
  "setup.custom": { it: "Timer custom (sec)", en: "Custom timer (sec)", de: "Custom Timer (Sek)" },
  "setup.executionMode": { it: "Modalità esecuzione", en: "Execution mode", de: "Ausführungsmodus" },
  "setup.mode.time": { it: "Tempo (standard)", en: "Time (standard)", de: "Zeit (Standard)" },
  "setup.mode.reps": { it: "Ripetizioni", en: "Reps", de: "Wiederholungen" },
  "setup.mode.time.hint": { it: "40″ lavoro / 20″ recupero — 15′ fissi, avanzamento automatico. Perfetto per dimagrimento.", en: "40″ work / 20″ rest — fixed 15′, auto-advance. Best for fat loss.", de: "40″ Arbeit / 20″ Pause — feste 15 Min." },
  "setup.mode.reps.hint": { it: "Es. 12× squat, 10× affondo — tocchi FATTO quando hai finito. Hold (plank…) resta a tempo. Più controllo per articolazioni.", en: "E.g. 12× squat — tap DONE when finished. Holds stay timed. More joint control.", de: "z. B. 12× Kniebeuge — tippe FERTIG. Halten bleibt Zeit." },
  "setup.custom.work": { it: "Lavoro", en: "Work", de: "Arbeit" },
  "setup.custom.rest": { it: "Recupero", en: "Rest", de: "Pause" }
};
const LangContext = reactExports.createContext({ lang: "it", t: (k2, v) => translate(k2, "it", v), setLang: () => {
} });
function useT() {
  return reactExports.useContext(LangContext);
}
const TRACKS = [
  { id: "hustlin", name: "Hustlin'", artist: "NEFFEX", src: "tracks/hustlin.mp3", tag: "Energetica", lang: "EN" },
  { id: "manifest", name: "Manifest It", artist: "NEFFEX", src: "tracks/manifest.mp3", tag: "Battuta", lang: "EN" },
  { id: "born", name: "Born A Rockstar", artist: "NEFFEX", src: "tracks/born.mp3", tag: "Sprint", lang: "EN" },
  { id: "fightback", name: "Fight Back", artist: "NEFFEX", src: "tracks/fightback.mp3", tag: "Pesante", lang: "EN" },
  { id: "theitch", name: "The Itch", artist: "NEFFEX ft. Josh A", src: "tracks/theitch.mp3", tag: "Battuta", lang: "EN" },
  { id: "godown", name: "Go Down Swinging", artist: "NEFFEX", src: "tracks/godown.mp3", tag: "Energetica", lang: "EN" },
  { id: "addict", name: "Addict", artist: "NEFFEX", src: "tracks/addict.mp3", tag: "Sprint", lang: "EN" },
  { id: "tellme", name: "Tell Me That I Can't", artist: "NEFFEX", src: "tracks/tellme.mp3", tag: "Pesante", lang: "EN" },
  { id: "grateful", name: "Grateful", artist: "NEFFEX", src: "tracks/grateful.mp3", tag: "Energetica", lang: "EN" },
  { id: "unstoppable", name: "Unstoppable", artist: "NEFFEX", src: "tracks/unstoppable.mp3", tag: "Sprint", lang: "EN" },
  { id: "comeback", name: "Comeback", artist: "NEFFEX", src: "tracks/comeback.mp3", tag: "Pesante", lang: "EN" },
  { id: "destiny", name: "Destiny", artist: "NEFFEX", src: "tracks/destiny.mp3", tag: "Battuta", lang: "EN" }
];
const DEFAULT_TRACK = TRACKS[0].id;
let audio = null;
let shouldPlay = false;
let currentTrackId = DEFAULT_TRACK;
let autoPlayNext = true;
let shuffleMode = false;
let onTrackChange = null;
function ensureAudio() {
  if (!audio) {
    audio = new Audio();
    audio.loop = false;
    audio.preload = "auto";
    audio.addEventListener("ended", () => {
      if (!shouldPlay || !autoPlayNext) return;
      const nextId = shuffleMode ? getRandomTrackId() : getNextTrackId(currentTrackId);
      if (nextId) {
        currentTrackId = nextId;
        const nxt = TRACKS.find((t) => t.id === nextId);
        if (nxt) {
          musicLoad(nxt.src);
          if (onTrackChange) try {
            onTrackChange(nextId);
          } catch {
          }
          musicPlay();
        }
      }
    });
  }
  return audio;
}
function getNextTrackId(id) {
  var _a;
  const idx = TRACKS.findIndex((t) => t.id === id);
  if (idx === -1) return ((_a = TRACKS[0]) == null ? void 0 : _a.id) || null;
  return TRACKS[(idx + 1) % TRACKS.length].id;
}
function getPrevTrackId(id) {
  var _a;
  const idx = TRACKS.findIndex((t) => t.id === id);
  if (idx === -1) return ((_a = TRACKS[0]) == null ? void 0 : _a.id) || null;
  return TRACKS[(idx - 1 + TRACKS.length) % TRACKS.length].id;
}
function getRandomTrackId() {
  var _a;
  if (TRACKS.length <= 1) return ((_a = TRACKS[0]) == null ? void 0 : _a.id) || null;
  let pick;
  do {
    pick = TRACKS[Math.floor(Math.random() * TRACKS.length)].id;
  } while (pick === currentTrackId);
  return pick;
}
function musicSetShouldPlay(v) {
  shouldPlay = !!v;
}
function musicSetAutoPlay(v) {
  autoPlayNext = !!v;
}
function musicSetShuffle(v) {
  shuffleMode = !!v;
}
function musicSetOnTrackChange(cb) {
  onTrackChange = typeof cb === "function" ? cb : null;
}
function musicLoad(src) {
  const a = ensureAudio();
  let resolvedSrc = src;
  const byId = TRACKS.find((t) => t.id === src);
  if (byId) {
    resolvedSrc = byId.src;
    currentTrackId = byId.id;
  } else {
    const found = TRACKS.find((t) => t.src === src);
    if (found) currentTrackId = found.id;
  }
  const want = new URL(resolvedSrc, location.href).href;
  if (a.src !== want) {
    a.src = want;
    a.load();
  } else {
    const f2 = TRACKS.find((t) => new URL(t.src, location.href).href === want);
    if (f2) currentTrackId = f2.id;
  }
}
function musicPlay() {
  const a = ensureAudio();
  if (!a.src) {
    const cur = TRACKS.find((t) => t.id === currentTrackId) || TRACKS[0];
    if (cur) musicLoad(cur.src);
  }
  const p2 = a.play();
  if (p2 && typeof p2.catch === "function") p2.catch(() => {
  });
}
function musicPause() {
  if (audio && !audio.paused) audio.pause();
}
function musicSetVolume(v) {
  if (audio) audio.volume = Math.max(0, Math.min(1, v));
}
function musicNext() {
  const nextId = shuffleMode ? getRandomTrackId() : getNextTrackId(currentTrackId);
  if (!nextId) return null;
  currentTrackId = nextId;
  const nxt = TRACKS.find((t) => t.id === nextId);
  if (nxt) {
    musicLoad(nxt.src);
    if (shouldPlay) musicPlay();
    if (onTrackChange) try {
      onTrackChange(nextId);
    } catch {
    }
  }
  return nextId;
}
function musicPrev() {
  const prevId = getPrevTrackId(currentTrackId);
  if (!prevId) return null;
  currentTrackId = prevId;
  const prv = TRACKS.find((t) => t.id === prevId);
  if (prv) {
    musicLoad(prv.src);
    if (shouldPlay) musicPlay();
    if (onTrackChange) try {
      onTrackChange(prevId);
    } catch {
    }
  }
  return prevId;
}
if (typeof window !== "undefined") {
  ["pointerdown", "touchend", "keydown"].forEach(
    (evt) => window.addEventListener(evt, () => {
      if (shouldPlay) musicPlay();
    }, { passive: true })
  );
}
const INK = "#1B1D16";
const INK_2 = "#242820";
const PAPER = "#EDE8D8";
const OLIVE = "#4A5233";
const OLIVE_DARK = "#333823";
const KHAKI = "#B8AE8C";
const BLAZE = "#C1440E";
const BLAZE_DEEP = "#8F2A0A";
const STEEL = "#8A9078";
const EXERCISES = {
  squat: {
    name: { it: "Squat", en: "Squat", de: "Kniebeuge" },
    pose: "squat",
    met: 5.5,
    repGuide: { it: "12–15 ripetizioni", en: "12–15 reps", de: "12–15 Wiederholungen" },
    cue: { it: "Schiena dritta, ginocchia in linea con le punte dei piedi.", en: "Straight back, knees in line with your toes.", de: "Gerader Rücken, Knie über den Fußspitzen." },
    tip40: { it: "Scendi solo fin dove senti il controllo: meglio un range parziale pulito che uno ampio scomposto.", en: "Lower only as far as you feel in control: a clean partial range beats a sloppy deep one.", de: "Geh nur so tief, wie du die Kontrolle behältst: Eine saubere Teilbewegung ist besser als eine wacklige tiefe." },
    steps: [{ it: "Piedi larghi quanto le spalle, punte leggermente fuori", en: "Feet shoulder-width, toes slightly turned out", de: "Füße schulterbreit, Zehen leicht nach außen" }, { it: "Scendi come per sederti, peso sui talloni", en: "Sit back as if into a chair, weight on your heels", de: "Setz dich ab, Gewicht auf den Fersen" }, { it: "Sali spingendo sui talloni, bacino in avanti", en: "Drive up through your heels, hips forward", de: "Drück dich über die Fersen hoch, Becken nach vorn" }],
    breath: { it: "Inspira scendendo, espira risalendo.", en: "Breathe in lowering, out rising.", de: "Einatmen beim Runtergehen, ausatmen beim Hochkommen." }
  },
  affondo: {
    name: { it: "Affondo alternato", en: "Alternating lunge", de: "Ausfallschritt (abwechselnd)" },
    pose: "lunge",
    met: 5.5,
    repGuide: { it: "10–12 per gamba", en: "10–12 per leg", de: "10–12 pro Bein" },
    cue: { it: "Passo lungo, busto verticale, il ginocchio dietro sfiora il pavimento.", en: "Long step, upright torso, rear knee grazes the floor.", de: "Langer Schritt, aufrechter Oberkörper, hinteres Knie berührt fast den Boden." },
    tip40: { it: "Evita il rimbalzo sul ginocchio a terra: controlla la discesa, niente scatti.", en: "No bouncing on the grounded knee: control the descent, no jerking.", de: "Nicht auf dem Knie abfedern: Die Abwärtsbewegung kontrollieren, keine ruckartigen Bewegungen." },
    steps: [{ it: "Passo lungo in avanti, busto verticale", en: "Step far forward, torso upright", de: "Großer Schritt nach vorn, Oberkörper aufrecht" }, { it: "Scendi finché il ginocchio dietro sfiora il suolo", en: "Lower until the rear knee grazes the floor", de: "Absenken, bis das hintere Knie den Boden fast berührt" }, { it: "Spingi col piede davanti per risalire", en: "Push off with the front foot to stand back up", de: "Mit dem vorderen Fuß abdrücken und hochkommen" }],
    breath: { it: "Inspira scendendo, espira spingendo su.", en: "Inhale lowering, exhale pushing up.", de: "Einatmen beim Absenken, ausatmen beim Hochdrücken." }
  },
  flessioni: {
    name: { it: "Piegamenti (push-up)", en: "Push-ups", de: "Liegestütze" },
    pose: "pushup",
    met: 8,
    repGuide: { it: "8–12 ripetizioni", en: "8–12 reps", de: "8–12 Wiederholungen" },
    cue: { it: "Corpo in linea retta, gomiti a circa 45° dal busto.", en: "Body in a straight line, elbows at about 45° from your torso.", de: "Körper in einer Linie, Ellbogen etwa 45° vom Oberkörper." },
    tip40: { it: 'Spalle che protestano? Ginocchia a terra: la tecnica conta più della versione "hardcore".', en: 'Shoulders complaining? Drop to your knees: technique beats the "hardcore" version.', de: "Protestieren die Schultern? Auf die Knie gehen: Technik ist wichtiger als die „hardcore“-Variante." },
    steps: [{ it: "Mani sotto le spalle, corpo in linea retta", en: "Hands under shoulders, body in a straight line", de: "Hände unter den Schultern, Körper in einer Linie" }, { it: "Piega i gomiti a 45° finché il petto sfiora terra", en: "Bend elbows to 45° until your chest grazes the floor", de: "Ellbogen auf 45° beugen, bis die Brust fast den Boden berührt" }, { it: "Spingi via il pavimento, testa neutra", en: "Push the floor away, neutral head", de: "Drück den Boden weg, Kopf neutral" }],
    breath: { it: "Inspira scendendo, espira spingendo su.", en: "Inhale lowering, exhale pushing up.", de: "Einatmen beim Absenken, ausatmen beim Hochdrücken." }
  },
  plank: {
    name: { it: "Plank", en: "Plank", de: "Unterarmstütz" },
    pose: "plank",
    met: 3.5,
    repGuide: { it: "Tieni la posizione", en: "Hold the position", de: "Position halten" },
    cue: { it: "Addome contratto, bacino né troppo alto né troppo basso, respira.", en: "Core engaged, hips neither too high nor too low, breathe.", de: "Bauch anspannen, Becken weder zu hoch noch zu tief, atmen." },
    tip40: { it: "Se senti la zona lombare, alza leggermente il bacino: meno estetico, molto più sicuro.", en: "If you feel it in your lower back, lift your hips slightly: less pretty, much safer.", de: "Wenn der untere Rücken zieht, Becken leicht anheben: weniger hübsch, dafür sicherer." },
    steps: [{ it: "Avambracci a terra, gomiti sotto le spalle", en: "Forearms on the floor, elbows under shoulders", de: "Unterarme auf dem Boden, Ellbogen unter den Schultern" }, { it: "Piedi aperti, corpo in linea retta", en: "Feet apart, body in a straight line", de: "Füße geöffnet, Körper in einer Linie" }, { it: "Contrai glutei e addome, bacino fermo", en: "Squeeze glutes and abs, keep hips still", de: "Gesäß und Bauch anspannen, Becken still" }],
    breath: { it: "Respiro lento e costante, mai trattenuto.", en: "Slow, steady breathing, never held.", de: "Langsam und gleichmäßig atmen, nie anhalten." }
  },
  jumpingjack: {
    name: { it: "Jumping jack", en: "Jumping jack", de: "Jumping Jack" },
    pose: "jack",
    met: 8,
    repGuide: { it: "Ritmo costante", en: "Steady rhythm", de: "Gleichmäßiger Rhythmus" },
    cue: { it: "Atterra morbido sulle punte, braccia sopra la testa.", en: "Land softly on the balls of your feet, arms overhead.", de: "Weich auf den Fußballen landen, Arme über den Kopf." },
    tip40: { it: "Ginocchia sensibili? Passa allo step jack laterale: stesso battito, meno impatto.", en: "Sensitive knees? Switch to a lateral step jack: same rhythm, less impact.", de: "Empfindliche Knie? Wechsle zum seitlichen Step Jack: gleicher Takt, weniger Belastung." },
    steps: [{ it: "Piedi uniti, braccia lungo i fianchi", en: "Feet together, arms at your sides", de: "Füße zusammen, Arme seitlich" }, { it: "Salta aprendo gambe e braccia sopra la testa", en: "Jump, opening legs and arms overhead", de: "Springen, Beine öffnen und Arme über den Kopf" }, { it: "Atterra morbido sulle punte e ripeti", en: "Land softly on the balls of your feet and repeat", de: "Weich auf den Fußballen landen und wiederholen" }],
    breath: { it: "Un ciclo di respiro ogni 2 salti.", en: "One breath cycle every 2 jumps.", de: "Ein Atemzyklus alle 2 Sprünge." }
  },
  mountainclimber: {
    name: { it: "Mountain climber", en: "Mountain climber", de: "Mountain Climber" },
    pose: "mountainclimber",
    met: 8,
    repGuide: { it: "Ritmo sostenuto", en: "Brisk pace", de: "Zügiges Tempo" },
    cue: { it: "Bacino basso e stabile, ginocchia verso il petto.", en: "Hips low and stable, knees driving toward your chest.", de: "Becken tief und stabil, Knie zur Brust." },
    tip40: { it: "Se il polso protesta, rallenta il ritmo: la qualità del gesto viene prima della velocità.", en: "If your wrists complain, slow the pace: quality of movement comes before speed.", de: "Wenn die Handgelenke protestieren, Tempo drosseln: Die Qualität der Bewegung zählt mehr als Tempo." },
    steps: [{ it: "Plank alto, mani sotto le spalle", en: "High plank, hands under shoulders", de: "Hoher Stütz, Hände unter den Schultern" }, { it: "Porta un ginocchio al petto, poi l’altro in corsa", en: "Drive one knee to your chest, then the other in a running motion", de: "Ein Knie zur Brust, dann das andere im Lauftakt" }, { it: "Bacino basso, core contratto", en: "Hips low, core engaged", de: "Becken tief, Bauch angespannt" }],
    breath: { it: "Espirazioni brevi e ritmiche, non trattenere.", en: "Short, rhythmic exhales, don’t hold your breath.", de: "Kurze, rhythmische Ausatmungen, nicht anhalten." }
  },
  wallsit: {
    name: { it: "Wall sit", en: "Wall sit", de: "Wandsitz" },
    pose: "wallsit",
    met: 3.5,
    repGuide: { it: "Tieni la posizione", en: "Hold the position", de: "Position halten" },
    cue: { it: "Ginocchia a 90°, schiena piatta contro il muro.", en: "Knees at 90°, back flat against the wall.", de: "Knie 90°, Rücken flach an der Wand." },
    tip40: { it: "Ottimo per il ginocchio: carico isometrico, zero impatto.", en: "Great for the knees: isometric load, zero impact.", de: "Schonend für die Knie: isometrische Belastung, null Impact." },
    steps: [{ it: "Schiena appoggiata al muro, piedi un passo avanti", en: "Back against the wall, feet one step forward", de: "Rücken an der Wand, Füße einen Schritt davor" }, { it: "Scendi fino a ginocchia a 90°", en: "Slide down until knees are at 90°", de: "Absenken bis die Knie 90° ergeben" }, { it: "Resta fermo, cosce parallele al suolo", en: "Hold still, thighs parallel to the floor", de: "Still halten, Oberschenkel parallel zum Boden" }],
    breath: { it: "Respiro calmo e continuo durante la tenuta.", en: "Calm, continuous breathing during the hold.", de: "Ruhig und durchgehend atmen während der Haltezeit." }
  },
  superman: {
    name: { it: "Superman", en: "Superman", de: "Superman" },
    pose: "superman",
    met: 3.5,
    repGuide: { it: "Contrazioni lente", en: "Slow contractions", de: "Langsame Kontraktionen" },
    cue: { it: "Solleva braccia e gambe insieme, sguardo verso il basso.", en: "Lift arms and legs together, gaze down.", de: "Arme und Beine gemeinsam anheben, Blick nach unten." },
    tip40: { it: "Rinforza la zona lombare: un investimento diretto contro il mal di schiena da scrivania.", en: "Strengthens the lower back: a direct investment against desk-back pain.", de: "Stärkt den unteren Rücken: eine direkte Investition gegen Büro-Rückenschmerzen." },
    steps: [{ it: "A pancia in giù, braccia tese in avanti", en: "Lying face down, arms extended forward", de: "Auf dem Bauch, Arme nach vorn gestreckt" }, { it: "Solleva braccia e gambe insieme", en: "Lift arms and legs together", de: "Arme und Beine gemeinsam anheben" }, { it: "Stringi i glutei, sguardo a terra", en: "Squeeze glutes, eyes to the floor", de: "Gesäß anspannen, Blick zum Boden" }],
    breath: { it: "Inspira per preparare, espira sollevando.", en: "Inhale to prepare, exhale as you lift.", de: "Einatmen zur Vorbereitung, ausatmen beim Anheben." }
  },
  ponte: {
    name: { it: "Ponte glutei", en: "Glute bridge", de: "Glute Bridge" },
    pose: "bridge",
    met: 3.5,
    repGuide: { it: "12–15 ripetizioni", en: "12–15 reps", de: "12–15 Wiederholungen" },
    cue: { it: "Spingi sui talloni, contrai i glutei in alto.", en: "Push through your heels, squeeze your glutes at the top.", de: "Durch die Fersen drücken, Gesäß oben anspannen." },
    tip40: { it: 'Contrasta le ore da seduto: riattiva glutei spesso "addormentati".', en: 'Counteracts hours of sitting: reawakens often "sleepy" glutes.', de: "Wirkt dem vielen Sitzen entgegen: aktiviert oft „eingeschlafene“ Gesäßmuskeln." },
    steps: [{ it: "Sdraiato, ginocchia piegate, piedi vicini al bacino", en: "Lying down, knees bent, feet close to your hips", de: "Auf dem Rücken, Knie gebeugt, Füße nahe am Becken" }, { it: "Spingi sui talloni e alza il bacino", en: "Push through your heels and lift your hips", de: "Durch die Fersen drücken und Becken anheben" }, { it: "Contrai i glutei in alto, scendi lento", en: "Squeeze glutes at the top, lower slowly", de: "Gesäß oben anspannen, langsam absenken" }],
    breath: { it: "Espira salendo, inspira scendendo.", en: "Exhale rising, inhale lowering.", de: "Ausatmen beim Hochgehen, einatmen beim Absenken." }
  },
  crunchbici: {
    name: { it: "Bicycle crunch", en: "Bicycle crunch", de: "Bicycle Crunch" },
    pose: "bicyclecrunch",
    met: 4.5,
    repGuide: { it: "10–12 per lato", en: "10–12 per side", de: "10–12 pro Seite" },
    cue: { it: "Gomito verso il ginocchio opposto, movimento lento e controllato.", en: "Elbow toward the opposite knee, slow and controlled movement.", de: "Ellbogen zum gegenüberliegenden Knie, langsam und kontrolliert." },
    tip40: { it: "Niente strappi sul collo: la mano è un appoggio leggero, non una leva.", en: "No yanking on your neck: the hand is a light support, not a lever.", de: "Nicht am Nacken ziehen: Die Hand ist eine leichte Stütze, kein Hebel." },
    steps: [{ it: "Sdraiato, mani dietro la testa, gambe sollevate", en: "Lying down, hands behind your head, legs lifted", de: "Auf dem Rücken, Hände hinter dem Kopf, Beine angehoben" }, { it: "Gomito destro verso ginocchio sinistro, gambe alternate", en: "Right elbow toward left knee, legs alternating", de: "Rechter Ellbogen zum linken Knie, Beine abwechselnd" }, { it: "Movimento lento, scapole sollevate", en: "Slow movement, shoulder blades lifted", de: "Langsame Bewegung, Schulterblätter angehoben" }],
    breath: { it: "Espira ruotando, inspira al centro.", en: "Exhale rotating, inhale in the middle.", de: "Ausatmen beim Drehen, einatmen in der Mitte." }
  },
  russiantwist: {
    name: { it: "Russian twist", en: "Russian twist", de: "Russian Twist" },
    pose: "russiantwist",
    met: 4.5,
    repGuide: { it: "10–12 per lato", en: "10–12 per side", de: "10–12 pro Seite" },
    cue: { it: "Busto inclinato, piedi a terra o sollevati, ruota dal core.", en: "Torso leaned back, feet on the floor or lifted, rotate from the core.", de: "Oberkörper nach hinten geneigt, Füße auf dem Boden oder angehoben, aus dem Core drehen." },
    tip40: { it: "Piedi a terra è già efficace: non serve la versione acrobatica per lavorare bene.", en: "Feet on the floor is already effective: no need for the acrobatic version to work well.", de: "Füße auf dem Boden sind bereits effektiv: Für gutes Training braucht es keine akrobatische Variante." },
    steps: [{ it: "Seduto, busto inclinato all’indietro", en: "Seated, torso leaned back", de: "Sitzend, Oberkörper nach hinten geneigt" }, { it: "Piedi a terra (o sollevati) e braccia davanti", en: "Feet on the floor (or lifted) and arms out front", de: "Füße auf dem Boden (oder angehoben), Arme nach vorn" }, { it: "Ruota il busto a destra e sinistra dal core", en: "Rotate your torso right and left from the core", de: "Oberkörper aus dem Core nach rechts und links drehen" }],
    breath: { it: "Espira a ogni rotazione.", en: "Exhale with each rotation.", de: "Bei jeder Drehung ausatmen." }
  },
  ginocchiaalte: {
    name: { it: "Ginocchia alte", en: "High knees", de: "Knie hoch" },
    pose: "highknees",
    met: 8,
    repGuide: { it: "Ritmo sostenuto", en: "Brisk pace", de: "Zügiges Tempo" },
    cue: { it: "Ginocchio a livello anca, braccia in coordinazione.", en: "Knee up to hip level, arms in coordination.", de: "Knie auf Hüfthöhe, Arme im Gleichklang." },
    tip40: { it: "Ottimo motore cardio a basso impatto se atterri sull’avampiede.", en: "Great low-impact cardio engine if you land on your forefoot.", de: "Ausgezeichnetes gelenkschonendes Cardio-Training, wenn du auf dem Vorfuß landest." },
    steps: [{ it: "Busto dritto, braccia ai fianchi", en: "Torso upright, arms at your sides", de: "Oberkörper aufrecht, Arme seitlich" }, { it: "Porta le ginocchia all’altezza dell’anca", en: "Drive knees up to hip height", de: "Knie auf Hüfthöhe bringen" }, { it: "Atterra sull’avampiede, ritmo costante", en: "Land on your forefoot, steady rhythm", de: "Auf dem Vorfuß landen, gleichmäßiger Rhythmus" }],
    breath: { it: "Respiro ritmico: 2 passi a ogni inspirazione.", en: "Rhythmic breathing: 2 steps per inhale.", de: "Rhythmisches Atmen: 2 Schritte pro Einatmung." }
  },
  burpeetattico: {
    name: { it: "Burpee tattico", en: "Tactical burpee", de: "Taktischer Burpee" },
    pose: "burpee",
    met: 8,
    repGuide: { it: "6–8 ripetizioni", en: "6–8 reps", de: "6–8 Wiederholungen" },
    cue: { it: "Passo indietro invece del salto, spinta a terra, risali controllato.", en: "Step back instead of jumping, push-up at the bottom, rise controlled.", de: "Schritt zurück statt Sprung, Liegestütz am Boden, kontrolliert aufstehen." },
    tip40: { it: 'La variante "senza salto" mantiene l’intensità cardio proteggendo ginocchia e lombari.', en: 'The "no-jump" version keeps cardio intensity while protecting knees and lower back.', de: "Die „ohne Sprung“-Variante hält die Cardio-Intensität und schont Knie und unteren Rücken." },
    steps: [{ it: "Da in piedi scendi con le mani a terra", en: "From standing, place your hands on the floor", de: "Aus dem Stand die Hände auf den Boden setzen" }, { it: "Porta i piedi indietro in plank, uno alla volta", en: "Step your feet back into a plank, one at a time", de: "Füße einzeln nach hinten in den Stütz bringen" }, { it: "Riporta i piedi avanti e risali, senza salto", en: "Step feet forward and stand up, no jump", de: "Füße nach vorn bringen und aufstehen, ohne Sprung" }],
    breath: { it: "Espira nella spinta, inspira scendendo.", en: "Exhale on the push, inhale lowering.", de: "Ausatmen beim Drücken, einatmen beim Absenken." }
  },
  crunch: {
    name: { it: "Crunch", en: "Crunch", de: "Crunch" },
    pose: "crunch",
    met: 4,
    repGuide: { it: "15–20 ripetizioni", en: "15–20 reps", de: "15–20 Wiederholungen" },
    cue: { it: "Scapole fuori dal pavimento, sguardo al soffitto, espira in alto.", en: "Shoulder blades off the floor, eyes to the ceiling, exhale at the top.", de: "Schulterblätter vom Boden, Blick zur Decke, oben ausatmen." },
    tip40: { it: "La lombare resta appoggiata: non tirare il collo con le mani.", en: "Keep your lower back down: don’t pull your neck with your hands.", de: "Der untere Rücken bleibt am Boden: Nicht den Nacken mit den Händen ziehen." },
    steps: [{ it: "Sdraiato, ginocchia piegate, mani alle tempie", en: "Lying down, knees bent, hands at your temples", de: "Auf dem Rücken, Knie gebeugt, Hände an den Schläfen" }, { it: "Solleva le scapole, sguardo al soffitto", en: "Lift your shoulder blades, eyes to the ceiling", de: "Schulterblätter anheben, Blick zur Decke" }, { it: "Scendi controllato, testa non riappoggia", en: "Lower controlled, head doesn’t rest back down", de: "Kontrolliert absenken, Kopf legt sich nicht ab" }],
    breath: { it: "Espira in alto, inspira scendendo.", en: "Exhale at the top, inhale lowering.", de: "Oben ausatmen, beim Absenken einatmen." }
  },
  sideplank: {
    name: { it: "Plank laterale", en: "Side plank", de: "Seitstütz" },
    pose: "sideplank",
    met: 3.5,
    repGuide: { it: "20–30″ per lato", en: "20–30s per side", de: "20–30 s pro Seite" },
    cue: { it: "Corpo in linea retta di lato, gomito sotto la spalla, bacino alto.", en: "Body in a straight line on your side, elbow under shoulder, hips high.", de: "Körper seitlich in einer Linie, Ellbogen unter der Schulter, Becken hoch." },
    tip40: { it: "Lato debole? Ginocchio a terra finché la linea regge: conta la tenuta, non la finta.", en: "Weak side? Knee down until the line holds: what counts is the hold, not the show.", de: "Schwache Seite? Knie absetzen, solange die Linie hält: Zählen tut die Haltezeit, nicht die Pose." },
    steps: [{ it: "Gomito sotto la spalla, piedi impilati", en: "Elbow under shoulder, feet stacked", de: "Ellbogen unter der Schulter, Füße übereinander" }, { it: "Alza il bacino fino a corpo in linea", en: "Lift hips until your body is in a line", de: "Becken anheben, bis der Körper eine Linie bildet" }, { it: "Tieni senza lasciar cadere l’anca", en: "Hold without letting your hip drop", de: "Halten, ohne die Hüfte sinken zu lassen" }],
    breath: { it: "Respiro continuo, niente apnee.", en: "Continuous breathing, no breath holding.", de: "Durchgehend atmen, nicht anhalten." }
  },
  legraise: {
    name: { it: "Leg raise", en: "Leg raise", de: "Beinheben" },
    pose: "legraise",
    met: 3.5,
    repGuide: { it: "10–12 ripetizioni", en: "10–12 reps", de: "10–12 Wiederholungen" },
    cue: { it: "Gambe tese, lombare premuta a terra: scendi solo fin dove resta appoggiata.", en: "Legs straight, lower back pressed to the floor: lower only as far as it stays down.", de: "Beine gestreckt, unterer Rücken am Boden: Nur so weit absenken, wie er am Boden bleibt." },
    tip40: { it: "Se la schiena si inarca, piega leggermente le ginocchia: proteggi i lombari.", en: "If your back arches, bend your knees slightly: protect your lower back.", de: "Wenn der Rücken sich wölbt, Knie leicht beugen: Unteren Rücken schützen." },
    steps: [{ it: "Sdraiato, gambe tese, lombare a terra", en: "Lying down, legs straight, lower back on the floor", de: "Auf dem Rücken, Beine gestreckt, unterer Rücken am Boden" }, { it: "Solleva le gambe a 90°", en: "Lift your legs to 90°", de: "Beine auf 90° anheben" }, { it: "Scendi lento finché la lombare resta a terra", en: "Lower slowly as long as your lower back stays down", de: "Langsam absenken, solange der untere Rücken am Boden bleibt" }],
    breath: { it: "Espira salendo, inspira scendendo.", en: "Exhale rising, inhale lowering.", de: "Ausatmen beim Anheben, einatmen beim Absenken." }
  },
  flutterkick: {
    name: { it: "Forbici", en: "Flutter kicks", de: "Schere (Flutter Kicks)" },
    pose: "flutterkick",
    met: 4.5,
    repGuide: { it: "Ritmo costante", en: "Steady rhythm", de: "Gleichmäßiger Rhythmus" },
    cue: { it: "Gambe a pochi cm da terra, alterna salita e discesa senza fermarti.", en: "Legs a few cm off the floor, alternate up and down without stopping.", de: "Beine wenige cm über dem Boden, ohne Unterbrechung auf und ab bewegen." },
    tip40: { it: "Lavoro intenso: se i lombari cedono, alza leggermente le gambe.", en: "Intense work: if your lower back gives out, raise your legs slightly.", de: "Intensives Training: Wenn der untere Rücken nachgibt, Beine leicht anheben." },
    steps: [{ it: "Sdraiato, gambe sollevate a pochi cm da terra", en: "Lying down, legs lifted a few cm off the floor", de: "Auf dem Rücken, Beine wenige cm über dem Boden" }, { it: "Alterna su e giù senza fermarti", en: "Alternate up and down without stopping", de: "Ohne Unterbrechung auf und ab wechseln" }, { it: "Lombare premuta a terra", en: "Lower back pressed to the floor", de: "Unterer Rücken am Boden" }],
    breath: { it: "Respiro breve e ritmico, non trattenere.", en: "Short, rhythmic breathing, don’t hold.", de: "Kurz und rhythmisch atmen, nicht anhalten." }
  },
  deadbug: {
    name: { it: "Dead bug", en: "Dead bug", de: "Dead Bug" },
    pose: "deadbug",
    met: 3.5,
    repGuide: { it: "8–10 per lato", en: "8–10 per side", de: "8–10 pro Seite" },
    cue: { it: "Braccio e gamba opposti si abbassano lenti, lombare sempre a terra.", en: "Opposite arm and leg lower slowly, lower back always on the floor.", de: "Gegenüberliegender Arm und Bein senken sich langsam, unterer Rücken bleibt am Boden." },
    tip40: { it: "L’esercizio lombare-sicuro per eccellenza: rinforza senza dolore.", en: "The lower-back-safe exercise par excellence: strengthens without pain.", de: "Die rückenschonende Übung schlechthin: Stärkt ohne Schmerzen." },
    steps: [{ it: "Sdraiato, braccia in alto, gambe a 90°", en: "Lying down, arms up, legs at 90°", de: "Auf dem Rücken, Arme nach oben, Beine 90°" }, { it: "Abbassa braccio e gamba opposti, lenti", en: "Lower opposite arm and leg slowly", de: "Gegenüberliegenden Arm und Bein langsam absenken" }, { it: "Torna al centro e cambia lato, lombare a terra", en: "Return to center and switch sides, lower back down", de: "Zur Mitte zurück und Seite wechseln, unterer Rücken am Boden" }],
    breath: { it: "Espira allungando braccio e gamba.", en: "Exhale as you extend arm and leg.", de: "Ausatmen beim Strecken von Arm und Bein." }
  },
  vup: {
    name: { it: "V-up", en: "V-up", de: "V-up" },
    pose: "vup",
    met: 5,
    repGuide: { it: "8–10 ripetizioni", en: "8–10 reps", de: "8–10 Wiederholungen" },
    cue: { it: "Toccati le punte dei piedi formando una V, scendi controllato.", en: "Touch your toes forming a V, lower controlled.", de: "Zehen berühren und ein V formen, kontrolliert absenken." },
    tip40: { it: "Troppo? Piegala le ginocchia: la V imperfetta conta, il collo tirato no.", en: "Too much? Bend your knees: an imperfect V counts, a yanked neck doesn’t.", de: "Zu viel? Knie beugen: Ein unvollkommenes V zählt, ein gezogener Nacken nicht." },
    steps: [{ it: "Sdraiato, braccia tese oltre la testa", en: "Lying down, arms extended past your head", de: "Auf dem Rücken, Arme über den Kopf gestreckt" }, { it: "Solleva gambe e busto insieme verso le punte", en: "Lift legs and torso together toward your toes", de: "Beine und Oberkörper gemeinsam zu den Zehen anheben" }, { it: "Scendi controllato, senza slanci", en: "Lower controlled, no momentum", de: "Kontrolliert absenken, ohne Schwung" }],
    breath: { it: "Espira toccando le punte, inspira scendendo.", en: "Exhale touching your toes, inhale lowering.", de: "Ausatmen beim Berühren der Zehen, einatmen beim Absenken." }
  },
  plankjack: {
    name: { it: "Plank jack", en: "Plank jack", de: "Plank Jack" },
    pose: "plankjack",
    met: 6,
    repGuide: { it: "Ritmo sostenuto", en: "Brisk pace", de: "Zügiges Tempo" },
    cue: { it: "In plank alto, piedi che saltano fuori e dentro senza muovere il bacino.", en: "In a high plank, feet jumping in and out without moving your hips.", de: "Im hohen Stütz, Füße springen rein und raus, Becken bleibt ruhig." },
    tip40: { it: "Unisce core e battito: brucia calorie a impatto quasi zero.", en: "Combines core and heartbeat: burns calories with almost zero impact.", de: "Verbinder Core und Puls: Verbrennt Kalorien bei fast null Belastung." },
    steps: [{ it: "Plank alto, piedi uniti", en: "High plank, feet together", de: "Hoher Stütz, Füße zusammen" }, { it: "Salta aprendo e chiudendo i piedi", en: "Jump feet open and closed", de: "Füße öffnen und schließen springen" }, { it: "Bacino fermo, core stretto", en: "Hips still, core tight", de: "Becken ruhig, Bauch angespannt" }],
    breath: { it: "Respiro ritmico: 2 salti per ciclo.", en: "Rhythmic breathing: 2 jumps per cycle.", de: "Rhythmisches Atmen: 2 Sprünge pro Zyklus." }
  },
  skater: {
    name: { it: "Skater", en: "Skater", de: "Skater" },
    pose: "skater",
    met: 7,
    repGuide: { it: "10–12 per lato", en: "10–12 per side", de: "10–12 pro Seite" },
    cue: { it: "Saltello laterale da una gamba all’altra, busto basso e avanti.", en: "Lateral hop from one leg to the other, torso low and forward.", de: "Seitlicher Sprung von einem Bein aufs andere, Oberkörper tief und nach vorn." },
    tip40: { it: "Grande brucia-grassi a basso impatto: atterra morbido sull’avampiede.", en: "Great low-impact fat burner: land softly on your forefoot.", de: "Starker gelenkschonender Fettverbrenner: Weich auf dem Vorfuß landen." },
    steps: [{ it: "Peso su una gamba, busto basso e avanti", en: "Weight on one leg, torso low and forward", de: "Gewicht auf einem Bein, Oberkörper tief und nach vorn" }, { it: "Saltella di lato sull’altra gamba", en: "Hop sideways onto the other leg", de: "Seitlich auf das andere Bein hüpfen" }, { it: "Atterra morbido, gesto ampio", en: "Land softly, wide movement", de: "Weich landen, große Bewegung" }],
    breath: { it: "Espira a ogni atterraggio.", en: "Exhale with each landing.", de: "Bei jeder Landung ausatmen." }
  },
  heeltap: {
    name: { it: "Heel tap", en: "Heel tap", de: "Heel Tap" },
    pose: "heeltap",
    met: 3.5,
    repGuide: { it: "12–15 per lato", en: "12–15 per side", de: "12–15 pro Seite" },
    cue: { it: "Da sdraiato con ginocchia piegate, tocca i talloni in alternanza.", en: "Lying down with knees bent, tap your heels alternately.", de: "Auf dem Rücken mit gebeugten Knien die Fersen abwechselnd berühren." },
    tip40: { it: "Fatto lento ti fa sentire davvero gli obliqui: niente fretta.", en: "Done slowly you really feel your obliques: no rush.", de: "Langsam ausgeführt spürst du die seitliche Bauchmuskulatur wirklich: Keine Eile." },
    steps: [{ it: "Sdraiato, ginocchia piegate, piedi a terra", en: "Lying down, knees bent, feet on the floor", de: "Auf dem Rücken, Knie gebeugt, Füße am Boden" }, { it: "Tocca il tallone destro con la mano destra", en: "Tap your right heel with your right hand", de: "Rechte Ferse mit der rechten Hand berühren" }, { it: "Alterna lentamente, obliqui attivi", en: "Alternate slowly, obliques active", de: "Langsam wechseln, seitliche Bauchmuskeln aktiv" }],
    breath: { it: "Espira toccando il tallone.", en: "Exhale as you tap your heel.", de: "Ausatmen beim Berühren der Ferse." }
  }
};
const EXERCISE_GROUPS$1 = {
  standing: ["squat", "affondo", "jumpingjack", "ginocchiaalte", "burpeetattico", "skater"],
  ground: [
    "flessioni",
    "plank",
    "mountainclimber",
    "wallsit",
    "superman",
    "ponte",
    "crunchbici",
    "russiantwist",
    "crunch",
    "sideplank",
    "legraise",
    "flutterkick",
    "deadbug",
    "vup",
    "plankjack",
    "heeltap"
  ],
  core: ["plank", "crunch", "sideplank", "legraise", "flutterkick", "deadbug", "vup", "heeltap", "crunchbici", "russiantwist", "plankjack", "mountainclimber"]
};
const WORK_SEC = 40;
const REST_SEC = 20;
const WARM_SEC = 90;
const COOL_SEC = 90;
const INTERVAL_PRESETS = [
  { key: "tabata", work: 20, rest: 10, label: "20″ / 10″ · Tabata" },
  { key: "breve", work: 30, rest: 15, label: "30″ / 15″" },
  { key: "standard", work: 40, rest: 20, label: "40″ / 20″" },
  { key: "lungo", work: 45, rest: 15, label: "45″ / 15″" },
  { key: "custom", work: 40, rest: 20, label: "Custom", isCustom: true }
];
function getCustomPreset(profile) {
  if (profile && profile.customWork && profile.customRest) {
    const w = Math.max(10, Math.min(90, parseInt(profile.customWork, 10) || 40));
    const r = Math.max(5, Math.min(60, parseInt(profile.customRest, 10) || 20));
    return { key: "custom", work: w, rest: r, label: `${w}″ / ${r}″` };
  }
  return null;
}
function getIntervalPreset(key) {
  return INTERVAL_PRESETS.find((p2) => p2.key === key) || INTERVAL_PRESETS[1];
}
const LEVELS = [
  { key: "recluta", label: { it: "RECLUTA", en: "RECRUIT", de: "REKRUT" }, preset: "breve", work: 30, rest: 15, desc: { it: "Ritmo iniziale: recupero pieno", en: "Starting pace: full rest", de: "Starttempo: volle Pause" } },
  { key: "combattente", label: { it: "COMBATTENTE", en: "FIGHTER", de: "KÄMPFER" }, preset: "standard", work: 40, rest: 20, desc: { it: "Ritmo standard 40″/20″", en: "Standard pace 40s/20s", de: "Standardtempo 40s/20s" } },
  { key: "elite", label: { it: "ELITE", en: "ELITE", de: "ELITE" }, preset: "lungo", work: 45, rest: 15, desc: { it: "Ritmo sostenuto 45″/15″", en: "Brisk pace 45s/15s", de: "Zügiges Tempo 45s/15s" } }
];
const HOLD_EXERCISES$1 = /* @__PURE__ */ new Set(["plank", "wallsit", "sideplank"]);
const REPS_BASE = {
  squat: 12,
  affondo: 10,
  flessioni: 8,
  jumpingjack: 20,
  mountainclimber: 20,
  superman: 10,
  ponte: 12,
  crunchbici: 12,
  russiantwist: 12,
  ginocchiaalte: 20,
  burpeetattico: 6,
  crunch: 15,
  legraise: 12,
  flutterkick: 20,
  deadbug: 10,
  vup: 10,
  plankjack: 15,
  skater: 10,
  heeltap: 14
};
function getReps$1(exId, levelKey) {
  if (HOLD_EXERCISES$1.has(exId)) return null;
  const base = REPS_BASE[exId] || 10;
  const factor = levelKey === "recluta" ? 0.75 : levelKey === "elite" ? 1.35 : 1;
  const v = Math.round(base * factor);
  if (exId === "affondo" || exId === "skater") return v % 2 ? v + 1 : v;
  return v;
}
function getLevel(key) {
  return LEVELS.find((l2) => l2.key === key) || LEVELS[1];
}
function levelPreset$1(profile) {
  if (profile && profile.intervalPreset === "custom") {
    const c = getCustomPreset(profile);
    if (c) return c;
  }
  const lvl = profile && profile.level ? getLevel(profile.level) : null;
  return lvl ? getIntervalPreset(lvl.preset) : getIntervalPreset(profile && profile.intervalPreset || "standard");
}
const PROGRAMS$1 = [
  {
    id: "A",
    difficulty: 2,
    name: { it: "ASSALTO PANCIA", en: "BELLY ASSAULT", de: "BAUCH-ANGRIFF" },
    tagline: { it: "Core e addominali — la battaglia decisiva", en: "Core and abs — the decisive battle", de: "Core und Bauch — die entscheidende Schlacht" },
    focus: { it: "PANCIA", en: "BELLY", de: "BAUCH" },
    rounds: 2,
    exercises: ["plank", "crunch", "legraise", "sideplank", "flutterkick", "vup"]
  },
  {
    id: "B",
    difficulty: 3,
    name: { it: "BRUCIA GRASSI", en: "FAT BURN", de: "FETT VERBRENNEN" },
    tagline: { it: "Circuito metabolico per dimagrire", en: "Metabolic circuit to lose fat", de: "Metabolischer Zirkel zum Abnehmen" },
    focus: { it: "BRUCIA", en: "BURN", de: "BRENNEN" },
    rounds: 2,
    exercises: ["jumpingjack", "skater", "mountainclimber", "plankjack", "burpeetattico", "ginocchiaalte"]
  },
  {
    id: "C",
    difficulty: 2,
    name: { it: "TOTALE FORZA", en: "FULL STRENGTH", de: "VOLLE KRAFT" },
    tagline: { it: "Full body — brucia e costruisci", en: "Full body — burn and build", de: "Ganzkörper — verbrennen und aufbauen" },
    focus: { it: "TOTALE", en: "TOTAL", de: "TOTAL" },
    rounds: 2,
    exercises: ["squat", "flessioni", "affondo", "deadbug", "superman", "crunch"]
  },
  {
    id: "D",
    difficulty: 1,
    name: { it: "RECUPERO ATTIVO", en: "ACTIVE RECOVERY", de: "AKTIVE ERHOLUNG" },
    tagline: { it: "Mobilità e respiro — giorno di ricarica", en: "Mobility and breath — recharge day", de: "Mobilität und Atmung — Auftanktag" },
    focus: { it: "RECUPERO", en: "RECOVERY", de: "ERHOLUNG" },
    rounds: 1,
    exercises: ["wallsit", "ponte", "superman", "sideplank", "deadbug"]
  },
  {
    id: "E",
    difficulty: 2,
    name: { it: "PANCIA PIATTA", en: "FLAT BELLY", de: "FLACHER BAUCH" },
    tagline: { it: "Brucia grasso e scolpisci il girovita — la missione anti-pancetta", en: "Burn fat and sculpt your waist — the anti-belly mission", de: "Fett verbrennen und die Taille formen — die Anti-Bauch-Mission" },
    focus: { it: "GIROVITA", en: "WAIST", de: "TAILLE" },
    rounds: 2,
    exercises: ["jumpingjack", "mountainclimber", "crunchbici", "russiantwist", "skater", "heeltap"]
  },
  {
    id: "F",
    difficulty: 2,
    name: { it: "ADDOMINALI SCOLPITI", en: "SCULPTED ABS", de: "BAUCH AUS STAHL" },
    tagline: { it: "Isolamento mirato per addominali definiti come l'acciaio", en: "Targeted isolation for steel-defined abs", de: "Gezieltes Training für stahlharte Bauchmuskeln" },
    focus: { it: "ADDOMINALI", en: "ABS", de: "BAUCH" },
    rounds: 2,
    exercises: ["crunch", "legraise", "vup", "deadbug", "flutterkick", "sideplank"]
  },
  {
    id: "G",
    difficulty: 3,
    name: { it: "SNAGLIATURA TOTALE", en: "FULL SLIM", de: "TOTALER SCHLANKHEIT" },
    tagline: { it: "Dimagrisci su tutto il corpo: metabolismo al massimo", en: "Slim down all over — metabolism on max", de: "Überall abnehmen — Stoffwechsel auf Maximum" },
    focus: { it: "SNAGLIATURA", en: "SLIM", de: "ABNEHMEN" },
    rounds: 2,
    exercises: ["burpeetattico", "ginocchiaalte", "mountainclimber", "squat", "flessioni", "skater"]
  },
  {
    id: "H",
    difficulty: 1,
    name: { it: "SCHIENA DI FERRO", en: "IRON BACK", de: "EISENRÜCKEN" },
    tagline: { it: "Postura e lombari — addio mal di schiena", en: "Posture & lower back — goodbye back pain", de: "Haltung & unterer Rücken — bye Rückenschmerz" },
    focus: { it: "SCHIENA", en: "BACK", de: "RÜCKEN" },
    rounds: 2,
    exercises: ["superman", "ponte", "deadbug", "wallsit", "sideplank", "plank"]
  },
  {
    id: "I",
    difficulty: 1,
    name: { it: "CARDIO LEGGERO", en: "LIGHT CARDIO", de: "LEICHTES CARDIO" },
    tagline: { it: "Fiato senza impatto — per ginocchia sensibili", en: "Breath without impact — for sensitive knees", de: "Atem ohne Impact — für empfindliche Knie" },
    focus: { it: "FIATO", en: "BREATH", de: "ATEM" },
    rounds: 2,
    exercises: ["ginocchiaalte", "heeltap", "ponte", "crunch", "sideplank", "superman"]
  },
  {
    id: "J",
    difficulty: 2,
    name: { it: "BRACCIA D'ACCIAIO", en: "STEEL ARMS", de: "STAHLARME" },
    tagline: { it: "Petto e braccia — spinta a corpo libero", en: "Chest & arms — bodyweight push", de: "Brust & Arme — Bodyweight Push" },
    focus: { it: "BRACCIA", en: "ARMS", de: "ARME" },
    rounds: 2,
    exercises: ["flessioni", "plankjack", "mountainclimber", "deadbug", "superman", "crunchbici"]
  },
  {
    id: "K",
    difficulty: 1,
    name: { it: "EQUILIBRIO ZEN", en: "ZEN BALANCE", de: "ZEN-GLEICHGEWICHT" },
    tagline: { it: "Stabilità e respiro — mente e core", en: "Stability & breath — mind and core", de: "Stabilität & Atmung — Geist und Core" },
    focus: { it: "EQUILIBRIO", en: "BALANCE", de: "GLEICHGEWICHT" },
    rounds: 2,
    exercises: ["sideplank", "deadbug", "ponte", "wallsit", "plank", "superman"]
  },
  {
    id: "L",
    difficulty: 3,
    name: { it: "POTENZA ESPLOSIVA", en: "EXPLOSIVE POWER", de: "EXPLOSIVE KRAFT" },
    tagline: { it: "Sprint e salti controllati — potenza over 40", en: "Sprints & controlled jumps — power over 40", de: "Sprints & kontrollierte Sprünge — Kraft über 40" },
    focus: { it: "POTENZA", en: "POWER", de: "KRAFT" },
    rounds: 2,
    exercises: ["burpeetattico", "skater", "ginocchiaalte", "jumpingjack", "mountainclimber", "squat"]
  },
  {
    id: "M",
    difficulty: 3,
    name: { it: "CORE ESTREMO", en: "EXTREME CORE", de: "EXTREMER CORE" },
    tagline: { it: "Addome d’acciaio — 6 colpi al core", en: "Steel abs — 6 core hits", de: "Stahlbauch — 6 Core-Treffer" },
    focus: { it: "CORE", en: "CORE", de: "CORE" },
    rounds: 2,
    exercises: ["vup", "russiantwist", "legraise", "crunchbici", "flutterkick", "heeltap"]
  },
  // ── PANCIA DEDICATA — 3 nuove missioni over-40, tutte con clip MP4 + focus girovita ──
  {
    id: "N",
    difficulty: 2,
    name: { it: "OMBELICO PIATTO", en: "FLAT NAVEL", de: "FLACHER NABEL" },
    tagline: { it: "Addome basso + obliqui — pancia piatta in 15′", en: "Lower abs + obliques — flat belly in 15′", de: "Unterbauch + Obliques — flacher Bauch in 15 Min" },
    focus: { it: "PANCIA", en: "BELLY", de: "BAUCH" },
    rounds: 2,
    exercises: ["legraise", "flutterkick", "heeltap", "deadbug", "crunch", "sideplank"],
    belly: true
  },
  {
    id: "O",
    difficulty: 2,
    name: { it: "OBLIQUI GUERRIERO", en: "WARRIOR OBLIQUES", de: "KRIEGER OBLIQUES" },
    tagline: { it: "Fianchi scolpiti e girovita stretto — maniglie addio", en: "Sculpted sides & tight waist — love handles gone", de: "Geformte Seiten & schmale Taille — Love Handles weg" },
    focus: { it: "OBLIQUI", en: "OBLIQUES", de: "OBLIQUES" },
    rounds: 2,
    exercises: ["russiantwist", "sideplank", "heeltap", "crunchbici", "plankjack", "vup"],
    belly: true
  },
  {
    id: "P",
    difficulty: 3,
    name: { it: "CINTURA D’ACCIAIO", en: "STEEL BELT", de: "STAHLGÜRTEL" },
    tagline: { it: "Core 360° — cintura addominale a tutta vita", en: "Core 360° — steel belt around your waist", de: "Core 360° — Stahlgürtel um die Taille" },
    focus: { it: "CINTURA", en: "BELT", de: "GÜRTEL" },
    rounds: 2,
    exercises: ["vup", "legraise", "russiantwist", "flutterkick", "deadbug", "heeltap"],
    belly: true
  }
];
const QUICK_PROGRAM = {
  id: "Q",
  name: { it: "RAFFICA LAMPO", en: "QUICK BLAST", de: "BLITZ-RUNDE" },
  tagline: { it: "Per i giorni senza tempo", en: "For the days with no time", de: "Für Tage ohne Zeit" },
  rounds: 1,
  exercises: ["squat", "flessioni", "plank", "jumpingjack"]
};
const CAMP_DAYS = 30;
const DAY_CYCLE = ["A", "N", "B", "O", "C", "P", "K", "H", "I", "J", "L", "M", "D", "E", "F", "G", "A", "B", "C", "D"];
const BELLY_IDS = ["N", "O", "P"];
PROGRAMS$1.filter((p2) => p2.belly);
function campDayIndex(profile) {
  const start = profile && profile.campStart ? new Date(profile.campStart) : null;
  if (!start) return 1;
  const toKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const startKey = toKey(start);
  const nowKey = toKey(/* @__PURE__ */ new Date());
  const s = new Date(startKey);
  const n2 = new Date(nowKey);
  const diff = Math.round((n2 - s) / 864e5);
  return Math.max(1, diff + 1);
}
function campDayDisplay(profile) {
  return Math.min(CAMP_DAYS, campDayIndex(profile));
}
function programById(id) {
  return PROGRAMS$1.find((p2) => p2.id === id) || PROGRAMS$1[0];
}
function pickNextProgram(sessions, profile) {
  if (!profile || !profile.campStart || !sessions.length) {
    if (!sessions.length) return { program: PROGRAMS$1[0], adaptive: false };
    const order = ["A", "B", "C"];
    const last2 = sessions[sessions.length - 1];
    const rotationNextId = order[(order.indexOf(last2.programId) + 1) % order.length];
    const hoursSince2 = (Date.now() - new Date(last2.date).getTime()) / 36e5;
    if (last2.rpe >= 4 && hoursSince2 < 20) {
      return { program: programById("D"), adaptive: true };
    }
    return { program: programById(rotationNextId), adaptive: false };
  }
  const idx = campDayIndex(profile);
  let program = programById(DAY_CYCLE[(idx - 1) % DAY_CYCLE.length]);
  const last = sessions[sessions.length - 1];
  const hoursSince = (Date.now() - new Date(last.date).getTime()) / 36e5;
  if (last && last.rpe >= 4 && hoursSince < 20 && program.id !== "D") {
    return { program: programById("D"), adaptive: true };
  }
  return { program, adaptive: false };
}
function buildSequence(program, skipWarmup, workSec = WORK_SEC, restSec = REST_SEC, mode = "time", levelKey = "combattente") {
  const isReps = mode === "reps";
  const seq = skipWarmup ? [] : [{ type: "warmup", duration: WARM_SEC }];
  for (let r = 1; r <= program.rounds; r++) {
    program.exercises.forEach((exId, i) => {
      const reps = isReps ? getReps$1(exId, levelKey) : null;
      if (isReps && reps) {
        seq.push({ type: "work", exerciseId: exId, reps, duration: null, round: r, mode: "reps" });
      } else {
        seq.push({ type: "work", exerciseId: exId, duration: workSec, round: r, mode: "time" });
      }
      const isLast = r === program.rounds && i === program.exercises.length - 1;
      if (!isLast) seq.push({ type: "rest", duration: restSec });
    });
  }
  if (!skipWarmup) seq.push({ type: "cooldown", duration: COOL_SEC });
  return seq;
}
function kcalForSeconds(met, weightKg, seconds) {
  return met * 3.5 * weightKg / 200 * (seconds / 60);
}
function estimateProgramKcal$1(program, weightKg, skipWarmup, workSec = WORK_SEC, restSec = REST_SEC, mode = "time", levelKey = "combattente") {
  let kcal = skipWarmup ? 0 : kcalForSeconds(3, weightKg, WARM_SEC) + kcalForSeconds(3, weightKg, COOL_SEC);
  const isReps = mode === "reps";
  program.exercises.forEach((id) => {
    const ex = EXERCISES[id];
    for (let r = 0; r < program.rounds; r++) {
      if (isReps) {
        const reps = getReps$1(id, levelKey);
        const sec = reps ? reps * 3 : workSec;
        kcal += kcalForSeconds(ex.met, weightKg, sec);
      } else {
        kcal += kcalForSeconds(ex.met, weightKg, workSec);
      }
      kcal += kcalForSeconds(2, weightKg, restSec);
    }
  });
  return kcal;
}
function totalSeqSeconds$1(program, skipWarmup, workSec = WORK_SEC, restSec = REST_SEC, mode = "time", levelKey = "combattente") {
  return buildSequence(program, skipWarmup, workSec, restSec, mode, levelKey).reduce((a, p2) => a + (p2.duration || (p2.reps ? p2.reps * 3 : 0)), 0);
}
function formatTime(s) {
  const m2 = Math.floor(s / 60), sec = s % 60;
  return `${m2}:${sec.toString().padStart(2, "0")}`;
}
function dayKey$1(d) {
  const y = d.getFullYear();
  const m2 = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m2}-${day}`;
}
function sessionDayKey$1(s) {
  return dayKey$1(new Date(s.date));
}
function hrZone$1(bpm, age, lang) {
  const max = 220 - age;
  const pct = bpm / max * 100;
  if (pct < 60) return { label: tr$1({ it: "Recupero", en: "Recovery", de: "Erholung" }, lang), color: STEEL };
  if (pct < 70) return { label: tr$1({ it: "Brucia grassi", en: "Fat burn", de: "Fett verbrennen" }, lang), color: OLIVE };
  if (pct < 85) return { label: tr$1({ it: "Cardio", en: "Cardio", de: "Cardio" }, lang), color: BLAZE };
  return { label: tr$1({ it: "Massimale", en: "Max", de: "Maximal" }, lang), color: BLAZE_DEEP };
}
function computeBestStreak(sessions) {
  const dates = [...new Set(sessions.map(sessionDayKey$1))].sort();
  if (!dates.length) return 0;
  let best = 1, cur = 1;
  for (let i = 1; i < dates.length; i++) {
    const diff = Math.round((new Date(dates[i]) - new Date(dates[i - 1])) / 864e5);
    if (diff === 1) {
      cur++;
      best = Math.max(best, cur);
    } else if (diff > 1) {
      cur = 1;
    }
  }
  return best;
}
function computeStreak(sessions) {
  const dateSet = new Set(sessions.map(sessionDayKey$1));
  let cursor = /* @__PURE__ */ new Date();
  if (!dateSet.has(dayKey$1(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (dateSet.has(dayKey$1(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
function computeStreakWithFreeze(sessions) {
  const dateSet = new Set(sessions.map(sessionDayKey$1));
  let cursor = /* @__PURE__ */ new Date();
  if (!dateSet.has(dayKey$1(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  let freezes = 1;
  while (true) {
    const k2 = dayKey$1(cursor);
    if (dateSet.has(k2)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }
    if (freezes > 0) {
      freezes--;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }
    break;
  }
  return { streak, usedFreeze: freezes === 0 };
}
const WEEKLY_GOAL = 3;
const STREAK_BADGES = [3, 7, 14, 30, 60, 90];
const SESSION_BADGES = [5, 10, 25, 50, 75, 100, 150];
const KCAL_BADGES = [1e3, 2500, 5e3, 1e4, 2e4, 5e4];
const CONSISTENCY_BADGES = [30, 50, 70, 85, 100];
const PERFECT_WEEK_BADGES = [1, 4, 8, 12, 26];
({
  streak: STREAK_BADGES.map((n2) => ({ type: "streak", n: n2, label: `${n2}gg serie`, icon: "🔥", color: "#C1440E" })),
  sessions: SESSION_BADGES.map((n2) => ({ type: "sessions", n: n2, label: `${n2} sessioni`, icon: "⚡", color: "#B8AE8C" })),
  kcal: KCAL_BADGES.map((n2) => ({ type: "kcal", n: n2, label: `${n2 >= 1e3 ? n2 / 1e3 + "k" : n2} kcal`, icon: "🔥", color: "#E84B2A" })),
  consistency: CONSISTENCY_BADGES.map((n2) => ({ type: "consistency", n: n2, label: `${n2}% costanza`, icon: "◎", color: "#7FB069" })),
  perfect: PERFECT_WEEK_BADGES.map((n2) => ({ type: "perfect", n: n2, label: `${n2} sett. perfette`, icon: "★", color: "#D9B34C" }))
});
const RPE_LABELS = [
  { it: "Facile", en: "Easy", de: "Leicht" },
  { it: "Leggero", en: "Light", de: "Mäßig" },
  { it: "Medio", en: "Medium", de: "Mittel" },
  { it: "Duro", en: "Hard", de: "Hart" },
  { it: "Al limite", en: "Max effort", de: "Am Limit" }
];
const RPE_COLORS = ["#6FA75F", "#9DB85A", "#D9B34C", "#E0843D", "#C1440E"];
const RANKS = [
  { min: 0, name: { it: "RECLUTA", en: "RECRUIT", de: "REKRUT" } },
  { min: 5, name: { it: "SOLDATO", en: "SOLDIER", de: "SOLDAT" } },
  { min: 15, name: { it: "SERGENTE", en: "SERGEANT", de: "SERGEANT" } },
  { min: 30, name: { it: "TENENTE", en: "LIEUTENANT", de: "LEUTNANT" } },
  { min: 60, name: { it: "CAPITANO", en: "CAPTAIN", de: "KAPITÄN" } },
  { min: 100, name: { it: "VETERANO", en: "VETERAN", de: "VETERAN" } }
];
function getRank(sessionsCount) {
  let current = RANKS[0];
  for (const r of RANKS) if (sessionsCount >= r.min) current = r;
  const idx = RANKS.indexOf(current);
  return { current, next: RANKS[idx + 1] || null };
}
function nextBadge(sessions) {
  const bestStreak = computeBestStreak(sessions);
  const candidates = [
    ...STREAK_BADGES.filter((n2) => bestStreak < n2).map((n2) => ({ kind: "serie", n: n2, remaining: n2 - bestStreak })),
    ...SESSION_BADGES.filter((n2) => sessions.length < n2).map((n2) => ({ kind: "sessioni", n: n2, remaining: n2 - sessions.length }))
  ];
  if (!candidates.length) return null;
  candidates.sort((a, b) => a.remaining - b.remaining);
  return candidates[0];
}
function getMedalProgress(sessions) {
  const bestStreak = computeBestStreak(sessions);
  const totalKcal = Math.round((sessions || []).reduce((a, s) => a + (s.kcal || 0), 0));
  const totalSessions = (sessions == null ? void 0 : sessions.length) || 0;
  const byDay = new Set((sessions || []).map(sessionDayKey$1));
  const now = /* @__PURE__ */ new Date();
  let activeDays = 0;
  for (let i = 0; i < 56; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    if (byDay.has(dayKey$1(d))) activeDays++;
  }
  const cons = Math.round(Math.min(100, activeDays / (8 * WEEKLY_GOAL) * 100));
  let perfectWeeks = 0;
  for (let w = 0; w < 12; w++) {
    const ws = new Date(now);
    ws.setDate(now.getDate() - now.getDay() + 1 - w * 7);
    ws.setHours(0, 0, 0, 0);
    const we = new Date(ws);
    we.setDate(ws.getDate() + 7);
    const done = (sessions || []).filter((s) => {
      const d = new Date(s.date);
      return d >= ws && d < we;
    }).length;
    if (done >= WEEKLY_GOAL) perfectWeeks++;
  }
  const all = [];
  for (const n2 of STREAK_BADGES) all.push({ type: "streak", n: n2, label: `${n2}gg serie`, icon: "🔥", color: "#C1440E", value: bestStreak, unlocked: bestStreak >= n2, progress: Math.min(1, bestStreak / n2) });
  for (const n2 of SESSION_BADGES) all.push({ type: "sessions", n: n2, label: `${n2} sessioni`, icon: "⚡", color: "#B8AE8C", value: totalSessions, unlocked: totalSessions >= n2, progress: Math.min(1, totalSessions / n2) });
  for (const n2 of KCAL_BADGES) all.push({ type: "kcal", n: n2, label: `${n2 >= 1e3 ? n2 / 1e3 + "k" : n2} kcal`, icon: "◆", color: "#E84B2A", value: totalKcal, unlocked: totalKcal >= n2, progress: Math.min(1, totalKcal / n2) });
  for (const n2 of CONSISTENCY_BADGES) all.push({ type: "consistency", n: n2, label: `${n2}% costanza`, icon: "◎", color: "#7FB069", value: cons, unlocked: cons >= n2, progress: Math.min(1, cons / n2) });
  for (const n2 of PERFECT_WEEK_BADGES) all.push({ type: "perfect", n: n2, label: `${n2} sett. perfette`, icon: "★", color: "#D9B34C", value: perfectWeeks, unlocked: perfectWeeks >= n2, progress: Math.min(1, perfectWeeks / n2) });
  return { all, unlocked: all.filter((m2) => m2.unlocked), locked: all.filter((m2) => !m2.unlocked), totals: { bestStreak, totalSessions, totalKcal, cons, perfectWeeks } };
}
function getNextMedals(sessions, limit = 3) {
  const { locked } = getMedalProgress(sessions);
  locked.sort((a, b) => b.progress - a.progress);
  return locked.slice(0, limit);
}
function greeting(lang) {
  const h = (/* @__PURE__ */ new Date()).getHours();
  if (h < 6) return tr$1({ it: "Ancora sveglio,", en: "Still awake,", de: "Noch wach," }, lang);
  if (h < 12) return tr$1({ it: "Buongiorno,", en: "Good morning,", de: "Guten Morgen," }, lang);
  if (h < 18) return tr$1({ it: "Buon pomeriggio,", en: "Good afternoon,", de: "Guten Nachmittag," }, lang);
  return tr$1({ it: "Buonasera,", en: "Good evening,", de: "Guten Abend," }, lang);
}
function buildHeatmap(sessions, days = 35) {
  const dateSet = new Set(sessions.map(sessionDayKey$1));
  const cells = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - i);
    cells.push({ key: dayKey$1(d), active: dateSet.has(dayKey$1(d)) });
  }
  return cells;
}
function buildYearHeatmap(sessions) {
  const byDay = /* @__PURE__ */ new Map();
  sessions.forEach((s) => {
    const k2 = sessionDayKey$1(s);
    byDay.set(k2, (byDay.get(k2) || 0) + 1);
  });
  const now = /* @__PURE__ */ new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const days = [];
  for (let d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
    const k2 = dayKey$1(d);
    const c = byDay.get(k2) || 0;
    days.push({ key: k2, date: new Date(d), count: c, active: c > 0 });
  }
  return days;
}
function getPersonalRecords(sessions) {
  var _a;
  if (!sessions.length) return null;
  const maxKcal = Math.max(...sessions.map((s) => s.kcal || 0));
  const maxStreak = computeBestStreak(sessions);
  const totalMin = Math.round(sessions.reduce((a, s) => a + (s.durationSec || 0), 0) / 60);
  const favCounts = {};
  sessions.forEach((s) => {
    favCounts[s.programId] = (favCounts[s.programId] || 0) + 1;
  });
  const favId = ((_a = Object.entries(favCounts).sort((a, b) => b[1] - a[1])[0]) == null ? void 0 : _a[0]) || null;
  return { maxKcal, maxStreak, totalMin, totalSessions: sessions.length, favId };
}
function getMonthlyTrend(sessions) {
  const now = /* @__PURE__ */ new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("it-IT", { month: "short" });
    const kcal = sessions.filter((s) => s.date.slice(0, 7) === key).reduce((a, s) => a + (s.kcal || 0), 0);
    months.push({ key, label, kcal });
  }
  return months;
}
let _audioCtx = null;
function getAudioCtx() {
  try {
    if (!_audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      _audioCtx = new Ctx();
    }
    if (_audioCtx.state === "suspended") _audioCtx.resume();
    return _audioCtx;
  } catch {
    return null;
  }
}
function unlockAudio() {
  try {
    const ctx = getAudioCtx();
    if (ctx && ctx.state === "suspended") ctx.resume();
  } catch {
  }
}
if (typeof window !== "undefined") {
  ["pointerdown", "touchend", "keydown"].forEach(
    (evt) => window.addEventListener(evt, unlockAudio, { once: true, passive: true })
  );
}
function playBeep(freq = 660, duration = 0.12) {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(1e-3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.02);
  } catch {
  }
}
function playClick() {
  playBeep(1500, 0.025);
}
function vibrate(pattern) {
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch {
  }
}
function speak$1(text, lang, locales) {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang && locales[lang] || "it-IT";
    u.rate = 1.03;
    window.speechSynthesis.speak(u);
  } catch {
  }
}
const STYLES = `

@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
html, body { margin: 0; padding: 0; background: ${INK}; overscroll-behavior: none; }
.o40 * { box-sizing: border-box; }
.o40 button { touch-action: manipulation; -webkit-user-select: none; user-select: none; }
.o40 input, .o40 textarea { -webkit-user-select: text; user-select: text; }
.o40 { font-family: 'Inter', sans-serif; }
.o40-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }
.o40-mono { font-family: 'IBM Plex Mono', monospace; }
.o40-figure #armL, .o40-figure #armR { transform-origin: 50px 40px; }
.o40-figure #legL, .o40-figure #legR { transform-origin: 50px 82px; }
.o40-figure #torso { transform-origin: 50px 40px; }

/* --- standing: squat --- */
.pose-squat #figure { animation: squatBob 1.1s ease-in-out infinite; transform-origin: 50px 82px; }
@keyframes squatBob { 0%,100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(16px) scaleY(0.88); } }

/* --- standing: lunge (staggered stance, drawn via polylines) --- */
.pose-lunge #figure { animation: lungeBob 1.1s ease-in-out infinite; transform-origin: 50px 82px; }
@keyframes lungeBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(10px); } }

/* --- standing: push-up (horizontal, chest dips) --- */
.pose-pushup #upper { animation: pushupDip 1.1s ease-in-out infinite; transform-origin: 60px 51px; }
@keyframes pushupDip { 0%,100% { transform: translateY(0); } 50% { transform: translateY(9px); } }

/* --- plank: static breathing hold --- */
.pose-plank #figure { animation: plankHold 2.6s ease-in-out infinite; transform-origin: 85px 65px; }
@keyframes plankHold { 0%,100% { transform: scale(1); } 50% { transform: scale(1.025); } }

/* --- mountain climber: alternating knee drive --- */
.pose-mountainclimber #legL { animation: mcL 0.6s ease-in-out infinite; transform-origin: 60px 51px; }
.pose-mountainclimber #legR { animation: mcR 0.6s ease-in-out infinite; transform-origin: 60px 51px; }
@keyframes mcL { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(52px,-16px) scale(0.55); } }
@keyframes mcR { 0%,50%,100% { transform: translate(0,0) scale(1); } 25% { transform: translate(52px,-16px) scale(0.55); } }

/* --- jumping jack: arms & legs spread --- */
.pose-jack #armL { animation: jackArmL 0.85s ease-in-out infinite; }
.pose-jack #armR { animation: jackArmR 0.85s ease-in-out infinite; }
.pose-jack #legL { animation: jackLegL 0.85s ease-in-out infinite; transform-origin: 50px 82px; }
.pose-jack #legR { animation: jackLegR 0.85s ease-in-out infinite; transform-origin: 50px 82px; }
@keyframes jackArmL { 0%,100% { transform: rotate(15deg); } 50% { transform: rotate(150deg); } }
@keyframes jackArmR { 0%,100% { transform: rotate(-15deg); } 50% { transform: rotate(-150deg); } }
@keyframes jackLegL { 0%,100% { transform: rotate(6deg); } 50% { transform: rotate(26deg); } }
@keyframes jackLegR { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(-26deg); } }

/* --- high knees: alternating leg lift, standing --- */
.pose-highknees #legL { animation: hkL 0.5s ease-in-out infinite; transform-origin: 50px 82px; }
.pose-highknees #legR { animation: hkR 0.5s ease-in-out infinite; transform-origin: 50px 82px; }
.pose-highknees #armL { animation: hkArmL 0.5s ease-in-out infinite; }
.pose-highknees #armR { animation: hkArmR 0.5s ease-in-out infinite; }
@keyframes hkL { 0%,50%,100% { transform: rotate(0deg); } 25% { transform: rotate(-85deg) translateY(-4px); } }
@keyframes hkR { 0%,50%,100% { transform: rotate(-85deg) translateY(-4px); } 25% { transform: rotate(0deg); } }
@keyframes hkArmL { 0%,50%,100% { transform: rotate(15deg); } 25% { transform: rotate(-45deg); } }
@keyframes hkArmR { 0%,50%,100% { transform: rotate(-45deg); } 25% { transform: rotate(-15deg); } }

/* --- superman: prone, arms & legs lift --- */
.pose-superman #armR { animation: supLift 1.4s ease-in-out infinite; transform-origin: 122px 64px; }
.pose-superman #legR { animation: supLift 1.4s ease-in-out infinite; transform-origin: 58px 64px; }
@keyframes supLift { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-13px); } }

/* --- bridge: hips lift off the floor (rotate around shoulder anchor, no gap) --- */
.pose-bridge #hipgroup { animation: bridgeLift 1.3s ease-in-out infinite; transform-origin: 62px 82px; }
@keyframes bridgeLift { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-15deg); } }

/* --- bicycle crunch: alternating twist, knees up (rigid two-segment leg groups) --- */
.pose-bicyclecrunch #upperTwist { animation: bcTwist 1s ease-in-out infinite; transform-origin: 55px 82px; }
.pose-bicyclecrunch #legL { animation: bcLegL 1s ease-in-out infinite; transform-origin: 82px 82px; }
.pose-bicyclecrunch #legR { animation: bcLegR 1s ease-in-out infinite; transform-origin: 82px 82px; }
@keyframes bcTwist { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
@keyframes bcLegL { 0%,100% { transform: scale(1) translate(0,0); } 50% { transform: scale(0.72) translate(10px,-6px); } }
@keyframes bcLegR { 0%,100% { transform: scale(0.72) translate(10px,-6px); } 50% { transform: scale(1) translate(0,0); } }

/* --- russian twist: seated, torso rotates --- */
.pose-russiantwist #upperTwist { animation: rtTwist 0.9s ease-in-out infinite; transform-origin: 60px 90px; }
@keyframes rtTwist { 0%,100% { transform: rotate(-22deg); } 50% { transform: rotate(22deg); } }

/* --- wall sit: isometric hold against the wall --- */
.pose-wallsit #figure { animation: wallPulse 2.6s ease-in-out infinite; transform-origin: 37px 82px; }
@keyframes wallPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.02); } }

/* --- burpee: compound drop-and-rise sequence, ground phase included --- */
.pose-burpee #figure { animation: burpeeFlow 1.8s ease-in-out infinite; transform-origin: 50px 100px; }
@keyframes burpeeFlow {
  0%   { transform: translateY(0) rotate(0deg) scaleY(1); }
  18%  { transform: translateY(26px) rotate(0deg) scaleY(0.78); }
  40%  { transform: translateY(46px) rotate(-62deg) translateX(-14px) scaleY(0.62); }
  62%  { transform: translateY(26px) rotate(0deg) scaleY(0.78); }
  82%  { transform: translateY(-8px) rotate(0deg) scaleY(1.06); }
  100% { transform: translateY(0) rotate(0deg) scaleY(1); }
}

/* --- crunch: shoulders curl up --- */
.pose-crunch #crunchUpper { animation: crunchCurl 1.1s ease-in-out infinite; transform-origin: 66px 78px; }
@keyframes crunchCurl { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-14deg); } }

/* --- side plank: isometric diagonal hold --- */
.pose-sideplank #figure { animation: spHold 2.6s ease-in-out infinite; transform-origin: 84px 62px; }
@keyframes spHold { 0%,100% { transform: scale(1); } 50% { transform: scale(1.025); } }

/* --- leg raise: straight legs lift from hips --- */
.pose-legraise #legGroup { animation: lrLift 1.4s ease-in-out infinite; transform-origin: 66px 82px; }
@keyframes lrLift { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-24deg); } }

/* --- flutter kicks: alternating beat --- */
.pose-flutterkick #legGroup { animation: fkBeat 0.7s ease-in-out infinite; transform-origin: 66px 82px; }
@keyframes fkBeat { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(7deg); } }

/* --- dead bug: opposite arm & leg reach --- */
.pose-deadbug #dbArmL { animation: dbA 1.1s ease-in-out infinite; transform-origin: 40px 82px; }
.pose-deadbug #dbLegR { animation: dbL 1.1s ease-in-out infinite; transform-origin: 70px 82px; }
.pose-deadbug #dbArmR { animation: dbAr 1.1s ease-in-out infinite; transform-origin: 58px 82px; }
.pose-deadbug #dbLegL { animation: dbLl 1.1s ease-in-out infinite; transform-origin: 70px 82px; }
@keyframes dbA { 0%,100% { transform: rotate(8deg); } 50% { transform: rotate(-16deg); } }
@keyframes dbL { 0%,100% { transform: rotate(6deg); } 50% { transform: rotate(-12deg); } }
@keyframes dbAr { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(16deg); } }
@keyframes dbLl { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(12deg); } }

/* --- V-up: torso + legs rise into a fold --- */
.pose-vup #figure { animation: vupFold 1.2s ease-in-out infinite; transform-origin: 60px 78px; }
@keyframes vupFold { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-18deg); } }

/* --- plank jack: feet jump apart / together --- */
.pose-plankjack #legR { animation: pjR 0.8s ease-in-out infinite; transform-origin: 62px 51px; }
.pose-plankjack #legL { animation: pjL 0.8s ease-in-out infinite; transform-origin: 60px 51px; }
@keyframes pjR { 0%,100% { transform: translate(0,0); } 50% { transform: translate(34px,4px) scale(0.8); } }
@keyframes pjL { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-14px,6px) scale(0.85); } }

/* --- skater: lateral bounding hop --- */
.pose-skater #figure { animation: skatHop 1.1s ease-in-out infinite; transform-origin: 50px 100px; }
@keyframes skatHop { 0%,100% { transform: translate(-16px,0) rotate(-6deg); } 50% { transform: translate(16px,-4px) rotate(6deg); } }

/* --- heel taps: alternating reach to each heel --- */
.pose-heeltap #htL { animation: htL 1s ease-in-out infinite; transform-origin: 40px 82px; }
.pose-heeltap #htR { animation: htR 1s ease-in-out infinite; transform-origin: 54px 82px; }
@keyframes htL { 0%,100% { transform: rotate(10deg); } 50% { transform: rotate(-16deg); } }
@keyframes htR { 0%,100% { transform: rotate(-10deg); } 50% { transform: rotate(16deg); } }

@media (prefers-reduced-motion: reduce) { .o40-figure * { animation: none !important; } }
.o40-scroll::-webkit-scrollbar { width: 6px; }
.o40-scroll::-webkit-scrollbar-thumb { background: ${KHAKI}; border-radius: 4px; }

/* ---- modern UI polish ---- */
.o40-aura {
  position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
  background:
    radial-gradient(38% 46% at 22% 26%, ${OLIVE}40 0%, transparent 70%),
    radial-gradient(30% 40% at 78% 16%, ${BLAZE}33 0%, transparent 70%),
    radial-gradient(42% 50% at 72% 84%, ${OLIVE}30 0%, transparent 70%),
    radial-gradient(26% 34% at 18% 88%, ${BLAZE_DEEP}30 0%, transparent 70%);
  animation: auraDrift 22s ease-in-out infinite alternate;
}
@keyframes auraDrift {
  0% { transform: translate(0, 0) scale(1); filter: hue-rotate(0deg); }
  100% { transform: translate(-2%, 2%) scale(1.08); filter: hue-rotate(10deg); }
}
@keyframes confettiFall {
  0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translateY(360px) rotate(300deg); opacity: 0; }
}
.o40-confetti { position: absolute; top: 0; width: 8px; height: 13px; border-radius: 2px; animation: confettiFall linear infinite; pointer-events: none; }
.o40-gradtext {
  background: linear-gradient(110deg, ${PAPER} 20%, ${KHAKI} 40%, ${BLAZE} 55%, ${PAPER} 75%);
  background-size: 220% auto; -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: gradShift 5s linear infinite;
}
@keyframes gradShift { to { background-position: -220% center; } }
.o40-pulsebtn { position: relative; }
.o40-pulsebtn::after {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  box-shadow: 0 0 0 0 ${BLAZE}aa; animation: btnRing 2.2s ease-out infinite; pointer-events: none;
}
@keyframes btnRing {
  0% { box-shadow: 0 0 0 0 ${BLAZE}aa; }
  70% { box-shadow: 0 0 0 14px ${BLAZE}00; }
  100% { box-shadow: 0 0 0 0 ${BLAZE}00; }
}
.o40 button { -webkit-tap-highlight-color: transparent; transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease; }
.o40 button:active { transform: scale(0.96); }
.o40-toast-in { animation: toastIn 0.3s cubic-bezier(0.16,1,0.3,1); }
@keyframes toastIn { from { opacity: 0; transform: translateY(14px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
.o40-input:focus { outline: none; border-color: ${BLAZE} !important; box-shadow: 0 0 0 3px rgba(193,68,14,0.18); }
.o40-card { transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
.o40-card:active { transform: scale(0.985); }

/* ---- ambient phone background (subtle modern glow) ---- */
.o40-phone {
  background:
    radial-gradient(120% 55% at 50% -8%, ${OLIVE}2e 0%, transparent 55%),
    radial-gradient(95% 42% at 88% 108%, ${BLAZE_DEEP}20 0%, transparent 60%),
    radial-gradient(80% 30% at 8% 108%, ${OLIVE}1a 0%, transparent 55%),
    ${INK};
}
.o40-camo { background: repeating-linear-gradient(115deg, ${OLIVE} 0 14px, ${OLIVE_DARK} 14px 26px, ${KHAKI} 26px 30px); background-size: 40px 6px; animation: camoSlide 14s linear infinite; }
@keyframes camoSlide { from { background-position: 0 0; } to { background-position: 40px 0; } }

/* ---- micro-interactions ---- */
@keyframes fadeSlide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes popIn { from { opacity: 0; transform: scale(0.82); } to { opacity: 1; transform: scale(1); } }
@keyframes tabPop { 0% { transform: translateY(6px) scale(0.6); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
@keyframes glowPulse {
  0%,100% { box-shadow: 0 0 0 0 ${BLAZE}55, 0 10px 30px rgba(0,0,0,0.45); }
  50% { box-shadow: 0 0 0 9px ${BLAZE}11, 0 10px 30px rgba(0,0,0,0.45); }
}
@keyframes ringPulse { 0% { transform: scale(0.97); opacity: 1; } 100% { transform: scale(1.06); opacity: 0; } }
@keyframes restBreath { 0%,100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.07); opacity: 0.95; } }
.o40-expand { animation: fadeSlide 0.28s cubic-bezier(0.16,1,0.3,1); }
.o40-pop { animation: popIn 0.32s cubic-bezier(0.16,1,0.3,1); }
@media (hover: hover) {
  .o40-card:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(0,0,0,0.5); }
}
@keyframes shimmer { 0% { background-position: -120px 0; } 100% { background-position: 120px 0; } }

/* ---- smart graphic animations ---- */
.o40-screen-in { animation: screenIn 0.45s cubic-bezier(0.16,1,0.3,1); }
@keyframes screenIn { from { opacity: 0; transform: translateY(14px) scale(0.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
.o40-eqbar { display: inline-block; border-radius: 2px; }
@keyframes eqPulse { 0%,100% { height: 4px; opacity: 0.45; } 50% { height: 100%; opacity: 1; } }
@keyframes cometGlow { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
.o40-comet { animation: cometGlow 1.1s ease-in-out infinite; }
@keyframes emberRise {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  12% { opacity: 0.9; }
  85% { opacity: 0.3; }
  100% { transform: translateY(-150px) scale(0.4); opacity: 0; }
}
.o40-embers { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.o40-ember { position: absolute; bottom: -6px; width: 4px; height: 4px; border-radius: 50%; background: radial-gradient(circle, ${BLAZE}, transparent 70%); animation: emberRise 3.4s ease-out infinite; }
@keyframes ecgDash { to { stroke-dashoffset: -48; } }
.o40-ecg { animation: ecgDash 1.5s linear infinite; }
.o40-ticker { overflow: hidden; white-space: nowrap; position: relative; mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); }
.o40-ticker-inner { display: inline-flex; gap: 44px; padding-left: 44px; animation: tickerScroll 24s linear infinite; will-change: transform; }
@keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes loadSweep { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
.o40-loadbar { position: relative; overflow: hidden; background: ${OLIVE_DARK}; border-radius: 3px; }
.o40-loadbar > span { position: absolute; inset: 0; border-radius: 3px; background: linear-gradient(90deg, ${BLAZE}66, ${BLAZE}, ${BLAZE}66); animation: loadSweep 1.2s ease-in-out infinite; }
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }
.o40-blink { animation: blink 1s step-start infinite; }
/* ---- modern graphics polish ---- */
@keyframes ringSpin { to { transform: rotate(360deg); } }
.o40-ring-border { position: relative; }
.o40-ring-border::before {
  content: ''; position: absolute; inset: -1px; border-radius: 19px; padding: 2px;
  background: conic-gradient(from 0deg, transparent 0%, ${BLAZE} 12%, transparent 30%, transparent 70%, ${KHAKI} 88%, transparent 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  animation: ringSpin 5s linear infinite; pointer-events: none;
}
.o40-gridbg {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.5; overflow: hidden;
  background-image: linear-gradient(${OLIVE}14 1px, transparent 1px), linear-gradient(90deg, ${OLIVE}14 1px, transparent 1px);
  background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, #000 30%, transparent 90%);
  mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, #000 30%, transparent 90%);
  animation: gridDrift 18s linear infinite;
}
@keyframes gridDrift { from { background-position: 0 0, 0 0; } to { background-position: 0 26px, 26px 0; } }
.o40-sheen::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: -60%; width: 45%;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,0.10), transparent);
  transform: skewX(-18deg); transition: left 0.6s ease; pointer-events: none;
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .o40-sheen:hover::after { left: 130%; }
}
@media (prefers-reduced-motion: reduce) {
  .o40-eqbar, .o40-comet, .o40-ember, .o40-ecg, .o40-ticker-inner, .o40-loadbar > span { animation: none !important; }
}

/* ---- UI upgrade: glass + light mode + search + favorites ---- */
:root { --bg: ${INK}; --bg2: ${INK_2}; --surface: ${OLIVE_DARK}; --text: ${PAPER}; --muted: ${STEEL}; --accent: ${BLAZE}; --accent2: ${KHAKI}; }
.o40-glass { background: color-mix(in srgb, var(--bg2) 92%, transparent); backdrop-filter: blur(10px) saturate(1.2); border: 1px solid color-mix(in srgb, var(--accent2) 22%, transparent); box-shadow: 0 8px 24px rgba(0,0,0,0.28); }
.o40-card-glass { background: linear-gradient(165deg, color-mix(in srgb, var(--bg2) 96%, transparent), color-mix(in srgb, var(--bg) 96%, transparent)); backdrop-filter: blur(8px); border: 1px solid rgba(184,174,140,0.18); box-shadow: 0 6px 20px rgba(0,0,0,0.32); transition: transform 0.18s ease, box-shadow 0.22s ease, border-color 0.22s ease; }
.o40-card-glass:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(0,0,0,0.42); border-color: rgba(184,174,140,0.28); }
.o40-search { width: 100%; background: var(--bg2); border: 1px solid var(--surface); color: var(--text); border-radius: 12px; padding: 10px 36px 10px 36px; font-size: 14px; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
.o40-search:focus { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
.o40-search-wrap { position: relative; }
.o40-search-wrap::before { content: '⌕'; position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 16px; pointer-events: none; }
.o40-fav { transition: transform 0.15s, color 0.15s; }
.o40-fav:active { transform: scale(1.15); }
.o40-skeleton { background: linear-gradient(90deg, ${OLIVE_DARK} 25%, ${OLIVE} 50%, ${OLIVE_DARK} 75%); background-size: 200% 100%; animation: shimmer 1.2s infinite; border-radius: 10px; }
.o40-install { position: fixed; bottom: calc(72px + env(safe-area-inset-bottom, 0px)); left: 12px; right: 12px; z-index: 40; background: ${INK_2}; border: 1px solid ${KHAKI}; border-radius: 14px; padding: 12px; display: flex; align-items: center; gap: 10; box-shadow: 0 12px 30px rgba(0,0,0,0.45); animation: popIn 0.32s ease; }
.o40-tour-mask { position: fixed; inset: 0; background: rgba(0,0,0,0.58); z-index: 50; display: flex; align-items: flex-end; justify-content: center; padding: 16px; }
.o40-tour-card { background: ${PAPER}; color: ${INK}; border-radius: 16px; padding: 18px; max-width: 360px; width: 100%; box-shadow: 0 16px 40px rgba(0,0,0,0.5); }
/* dark polish: stronger TopBar blur, card depth, noise */
.o40-phone::before { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0.04; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E"); }
.o40-topbar-glass { backdrop-filter: blur(12px) saturate(1.15); background: color-mix(in srgb, ${INK} 88%, transparent); border-bottom: 1px solid rgba(184,174,140,0.12); }
.o40-bottomnav-glass { backdrop-filter: blur(12px) saturate(1.15); background: color-mix(in srgb, ${INK} 90%, transparent); border-top: 1px solid rgba(184,174,140,0.12); }
`;
const limb = { stroke: "currentColor", strokeWidth: 7, strokeLinecap: "round" };
const body = { stroke: "currentColor", strokeWidth: 16, strokeLinecap: "round" };
const floorLine = (x1, y, x2) => /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1, y1: y, x2, y2: y, stroke: KHAKI, strokeWidth: "2", opacity: "0.4" });
const dot = (cx, cy, r = 4) => /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx, cy, r, fill: "currentColor" });
const head = (cx, cy, r = 11) => /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx, cy, r, fill: "currentColor", fillOpacity: "0.3", stroke: "currentColor", strokeWidth: "5" });
const groundShadow = (cx, y) => /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx, cy: y, rx: "24", ry: "4", fill: KHAKI, opacity: "0.22" });
function ExerciseFigure$1({ pose, color = BLAZE, size = "100%" }) {
  const wrap2 = (viewBox, children) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox, width: size, height: size, className: `o40-figure pose-${pose}`, style: { color, overflow: "visible" }, children });
  switch (pose) {
    case "squat":
      return wrap2("0 0 100 140", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(8, 134, 92),
        groundShadow(50, 133),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(50, 20),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "torso", x1: "50", y1: "30", x2: "50", y2: "80", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armL", x1: "50", y1: "40", x2: "30", y2: "56", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armR", x1: "50", y1: "40", x2: "70", y2: "56", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { id: "legL", points: "50,80 33,101 33,123", fill: "none", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { id: "legR", points: "50,80 67,101 67,123", fill: "none", ...limb }),
          dot(50, 40, 4.5),
          dot(50, 80, 4.5),
          dot(30, 56),
          dot(70, 56),
          dot(33, 123),
          dot(67, 123)
        ] })
      ] }));
    case "lunge":
      return wrap2("0 0 100 140", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(8, 134, 92),
        groundShadow(52, 133),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(52, 20),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "torso", x1: "52", y1: "30", x2: "50", y2: "78", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armL", x1: "52", y1: "40", x2: "32", y2: "58", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armR", x1: "52", y1: "40", x2: "72", y2: "58", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { id: "legL", points: "50,78 38,102 44,130", fill: "none", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { id: "legR", points: "50,78 66,96 74,130", fill: "none", ...limb }),
          dot(52, 40, 4.5),
          dot(50, 78, 4.5),
          dot(32, 58),
          dot(72, 58),
          dot(44, 130),
          dot(74, 130)
        ] })
      ] }));
    case "jack":
      return wrap2("0 0 100 140", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(8, 134, 92),
        groundShadow(50, 133),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(50, 20),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "torso", x1: "50", y1: "30", x2: "50", y2: "82", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armL", x1: "50", y1: "40", x2: "28", y2: "62", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armR", x1: "50", y1: "40", x2: "72", y2: "62", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legL", x1: "50", y1: "82", x2: "34", y2: "125", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legR", x1: "50", y1: "82", x2: "66", y2: "125", ...limb }),
          dot(50, 40, 4.5),
          dot(50, 82, 4.5),
          dot(28, 62),
          dot(72, 62),
          dot(34, 125),
          dot(66, 125)
        ] })
      ] }));
    case "highknees":
      return wrap2("0 0 100 140", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(8, 134, 92),
        groundShadow(50, 133),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(50, 20),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "torso", x1: "50", y1: "30", x2: "50", y2: "82", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armL", x1: "50", y1: "40", x2: "28", y2: "62", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armR", x1: "50", y1: "40", x2: "72", y2: "62", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legL", x1: "50", y1: "82", x2: "34", y2: "125", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legR", x1: "50", y1: "82", x2: "66", y2: "125", ...limb }),
          dot(50, 40, 4.5),
          dot(50, 82, 4.5),
          dot(28, 62),
          dot(72, 62),
          dot(34, 125),
          dot(66, 125)
        ] })
      ] }));
    case "plank":
      return wrap2("0 0 160 100", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(10, 88, 150),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(136, 42, 9),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "torso", x1: "128", y1: "45", x2: "58", y2: "52", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "124", y1: "47", x2: "120", y2: "86", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "51", x2: "24", y2: "86", ...limb }),
          dot(124, 47, 4.5),
          dot(60, 51, 4.5),
          dot(120, 86),
          dot(24, 86)
        ] })
      ] }));
    case "pushup":
      return wrap2("0 0 160 100", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(10, 88, 150),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "upper", children: [
            head(136, 42, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "128", y1: "45", x2: "60", y2: "51", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "124", y1: "47", x2: "120", y2: "86", ...limb }),
            dot(124, 47, 4.5),
            dot(120, 86)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "51", x2: "24", y2: "86", ...limb }),
          dot(60, 51, 4.5),
          dot(24, 86)
        ] })
      ] }));
    case "mountainclimber":
      return wrap2("0 0 160 100", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(10, 88, 150),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(136, 42, 9),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "128", y1: "45", x2: "60", y2: "51", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "124", y1: "47", x2: "120", y2: "86", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legR", x1: "60", y1: "51", x2: "26", y2: "84", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legL", x1: "60", y1: "51", x2: "22", y2: "88", ...limb }),
          dot(124, 47, 4.5),
          dot(60, 51, 4.5),
          dot(120, 86),
          dot(26, 84),
          dot(22, 88)
        ] })
      ] }));
    case "superman":
      return wrap2("0 0 160 90", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(10, 74, 150),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(132, 62, 9),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "124", y1: "63", x2: "60", y2: "63", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armR", x1: "120", y1: "63", x2: "146", y2: "57", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legR", x1: "60", y1: "63", x2: "26", y2: "57", ...limb }),
          dot(120, 63, 4.5),
          dot(60, 63, 4.5),
          dot(146, 57),
          dot(26, 57)
        ] })
      ] }));
    case "bridge":
      return wrap2("0 0 160 100", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(10, 90, 150),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(34, 82, 9),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "42", y1: "82", x2: "62", y2: "82", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "34", y1: "82", x2: "30", y2: "65", ...limb }),
          dot(30, 65, 4.5),
          dot(62, 82, 4.5),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "hipgroup", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "62", y1: "82", x2: "88", y2: "82", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "88", y1: "82", x2: "102", y2: "66", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "102", y1: "66", x2: "102", y2: "90", ...limb }),
            dot(88, 82, 4.5),
            dot(102, 90)
          ] })
        ] })
      ] }));
    case "bicyclecrunch":
      return wrap2("0 0 160 100", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(10, 90, 150),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(30, 82, 9),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "upperTwist", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "38", y1: "82", x2: "72", y2: "82", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "55", y1: "82", x2: "80", y2: "66", ...limb }),
            dot(38, 82, 4.5),
            dot(80, 66)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "legL", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "82", y1: "82", x2: "100", y2: "60", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "100", y1: "60", x2: "118", y2: "72", ...limb }),
            dot(118, 72)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "legR", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "82", y1: "82", x2: "104", y2: "68", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "104", y1: "68", x2: "128", y2: "56", ...limb }),
            dot(128, 56)
          ] }),
          dot(82, 82, 4.5)
        ] })
      ] }));
    case "russiantwist":
      return wrap2("0 0 120 120", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(8, 108, 112),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "upperTwist", children: [
            head(60, 44, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "53", x2: "60", y2: "90", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "60", x2: "90", y2: "66", ...limb }),
            dot(60, 60, 4.5),
            dot(90, 66)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "60,90 78,84 74,100", fill: "none", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "60,90 68,80 60,98", fill: "none", ...limb }),
          dot(60, 90, 4.5),
          dot(74, 100),
          dot(60, 98)
        ] })
      ] }));
    case "wallsit":
      return wrap2("0 0 100 140", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(20, 134, 92),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "16", y1: "8", x2: "16", y2: "134", stroke: KHAKI, strokeWidth: "3", opacity: "0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "18", x2: "16", y2: "10", stroke: KHAKI, strokeWidth: "2", opacity: "0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "38", x2: "16", y2: "30", stroke: KHAKI, strokeWidth: "2", opacity: "0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "58", x2: "16", y2: "50", stroke: KHAKI, strokeWidth: "2", opacity: "0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(24, 20, 9),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "24", y1: "29", x2: "24", y2: "80", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "24", y1: "42", x2: "42", y2: "58", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "24,80 54,80 54,132", fill: "none", ...limb }),
          dot(24, 42, 4.5),
          dot(24, 80, 4.5),
          dot(42, 58),
          dot(54, 132)
        ] })
      ] }));
    case "burpee":
      return wrap2("0 0 100 140", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(8, 134, 92),
        groundShadow(50, 133),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(50, 20),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "30", x2: "50", y2: "80", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "40", x2: "30", y2: "56", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "40", x2: "70", y2: "56", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "80", x2: "34", y2: "123", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "80", x2: "66", y2: "123", ...limb }),
          dot(50, 40, 4.5),
          dot(50, 80, 4.5),
          dot(30, 56),
          dot(70, 56),
          dot(34, 123),
          dot(66, 123)
        ] })
      ] }));
    case "crunch":
      return wrap2("0 0 160 100", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(10, 92, 150),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "crunchUpper", children: [
            head(26, 74, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "34", y1: "80", x2: "66", y2: "78", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "48", y1: "81", x2: "74", y2: "64", ...limb }),
            dot(34, 80, 4.5),
            dot(66, 78, 4.5),
            dot(74, 64)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "66,78 90,62 102,74", fill: "none", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "66,78 94,64 110,72", fill: "none", ...limb }),
          dot(90, 62, 4.5),
          dot(102, 74),
          dot(94, 64, 4.5),
          dot(110, 72)
        ] })
      ] }));
    case "sideplank":
      return wrap2("0 0 160 100", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(10, 88, 150),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(132, 40, 9),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "124", y1: "42", x2: "46", y2: "70", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "68", x2: "28", y2: "84", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "118", y1: "45", x2: "96", y2: "52", ...limb }),
          dot(124, 42, 4.5),
          dot(46, 70, 4.5),
          dot(28, 84),
          dot(96, 52)
        ] })
      ] }));
    case "legraise":
      return wrap2("0 0 160 100", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(10, 90, 150),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(18, 78, 9),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "26", y1: "82", x2: "66", y2: "82", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "38", y1: "82", x2: "34", y2: "88", ...limb }),
          dot(26, 82, 4.5),
          dot(66, 82, 4.5),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "legGroup", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "66", y1: "82", x2: "82", y2: "46", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "82", y1: "46", x2: "82", y2: "30", ...limb }),
            dot(82, 46, 4.5),
            dot(82, 30)
          ] })
        ] })
      ] }));
    case "flutterkick":
      return wrap2("0 0 160 100", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(10, 90, 150),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(18, 78, 9),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "26", y1: "82", x2: "66", y2: "82", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "38", y1: "82", x2: "34", y2: "88", ...limb }),
          dot(26, 82, 4.5),
          dot(66, 82, 4.5),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "legGroup", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "66", y1: "82", x2: "90", y2: "66", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "90", y1: "66", x2: "106", y2: "62", ...limb }),
            dot(90, 66, 4.5),
            dot(106, 62)
          ] })
        ] })
      ] }));
    case "deadbug":
      return wrap2("0 0 160 100", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(10, 90, 150),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(18, 78, 9),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "26", y1: "82", x2: "70", y2: "82", ...body }),
          dot(26, 82, 4.5),
          dot(70, 82, 4.5),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "dbArmL", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "40", y1: "82", x2: "54", y2: "60", ...limb }),
            dot(54, 60)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "dbArmR", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "58", y1: "82", x2: "76", y2: "92", ...limb }),
            dot(76, 92)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "dbLegL", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "70", y1: "82", x2: "98", y2: "88", ...limb }),
            dot(98, 88)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "dbLegR", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "70", y1: "82", x2: "88", y2: "58", ...limb }),
            dot(88, 58)
          ] })
        ] })
      ] }));
    case "vup":
      return wrap2("0 0 120 120", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(8, 108, 112),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(60, 30, 9),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "39", x2: "60", y2: "78", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "52", x2: "36", y2: "64", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "52", x2: "84", y2: "64", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "60,78 52,96 44,106", fill: "none", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "60,78 68,96 76,106", fill: "none", ...limb }),
          dot(60, 52, 4.5),
          dot(60, 78, 4.5),
          dot(36, 64),
          dot(84, 64),
          dot(44, 106),
          dot(76, 106)
        ] })
      ] }));
    case "plankjack":
      return wrap2("0 0 160 100", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(10, 88, 150),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(136, 42, 9),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "128", y1: "45", x2: "60", y2: "51", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "124", y1: "47", x2: "120", y2: "86", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legR", x1: "62", y1: "51", x2: "28", y2: "86", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legL", x1: "60", y1: "51", x2: "44", y2: "86", ...limb }),
          dot(124, 47, 4.5),
          dot(60, 51, 4.5),
          dot(120, 86),
          dot(28, 86),
          dot(44, 86)
        ] })
      ] }));
    case "skater":
      return wrap2("0 0 100 140", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(8, 134, 92),
        groundShadow(50, 133),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(50, 20),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "30", x2: "50", y2: "80", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armL", x1: "50", y1: "40", x2: "30", y2: "56", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armR", x1: "50", y1: "40", x2: "70", y2: "56", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legL", x1: "50", y1: "80", x2: "34", y2: "125", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legR", x1: "50", y1: "80", x2: "66", y2: "125", ...limb }),
          dot(50, 40, 4.5),
          dot(50, 80, 4.5),
          dot(30, 56),
          dot(70, 56),
          dot(34, 125),
          dot(66, 125)
        ] })
      ] }));
    case "heeltap":
      return wrap2("0 0 160 100", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(10, 92, 150),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(24, 78, 9),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "32", y1: "82", x2: "76", y2: "82", ...body }),
          dot(32, 82, 4.5),
          dot(76, 82, 4.5),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "76,82 92,66 108,74", fill: "none", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "76,82 96,70 112,76", fill: "none", ...limb }),
          dot(92, 66, 4.5),
          dot(108, 74),
          dot(96, 70, 4.5),
          dot(112, 76),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "htL", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "40", y1: "82", x2: "56", y2: "80", ...limb }),
            dot(56, 80)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "htR", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "54", y1: "82", x2: "70", y2: "80", ...limb }),
            dot(70, 80)
          ] })
        ] })
      ] }));
    default:
      return wrap2("0 0 100 140", /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        floorLine(8, 134, 92),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
          head(50, 20),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "30", x2: "50", y2: "80", ...body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "40", x2: "30", y2: "56", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "40", x2: "70", y2: "56", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "80", x2: "34", y2: "123", ...limb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "80", x2: "66", y2: "123", ...limb })
        ] })
      ] }));
  }
}
function getReminder() {
  try {
    const v = localStorage.getItem("o40_reminder");
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}
function checkAndFireReminder(t) {
  const r = getReminder();
  if (!r || !r.enabled) return false;
  if (typeof Notification === "undefined" || Notification.permission !== "granted") return false;
  const now = /* @__PURE__ */ new Date();
  if (now.getHours() !== r.hour || now.getMinutes() !== r.minute) return false;
  const key = `o40_reminder_fired_${now.toISOString().slice(0, 10)}`;
  if (localStorage.getItem(key)) return false;
  localStorage.setItem(key, "1");
  try {
    new Notification("Operator 40 — Missione pronta", {
      body: t ? t("notif.body") : "La tua missione di 15 min ti aspetta. Andiamo!",
      icon: "./icons/icon-192.png",
      badge: "./icons/icon-192.png",
      tag: "o40-daily"
    });
  } catch {
  }
  return true;
}
function fireTestNotification(t) {
  if (typeof Notification === "undefined" || Notification.permission !== "granted") return false;
  try {
    new Notification("Operator 40 — Test", {
      body: t ? t("notif.test.body") : "Le notifiche funzionano. A domani per la missione!",
      icon: "./icons/icon-192.png"
    });
    return true;
  } catch {
    return false;
  }
}
const VAPID_PUBLIC_KEY = "BHwro8IiKhELhqxV6edpJ6iUPDAnMh7yzEmMyOi9XLL8CnkuIT3esLAgeKjz-sfjkxCb8izjLrwQUsORtdmAb5Q";
const API_BASE = "./api";
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}
function isPushSupported() {
  return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
}
function isStandalonePWA() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}
async function getExistingSubscription() {
  if (!isPushSupported()) return null;
  try {
    const reg = await navigator.serviceWorker.ready;
    return await reg.pushManager.getSubscription();
  } catch {
    return null;
  }
}
async function subscribePush() {
  if (!isPushSupported()) throw new Error("Push non supportato su questo browser");
  if (typeof Notification === "undefined") throw new Error("Notification non disponibile");
  const perm = Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
  if (perm !== "granted") throw new Error("Permesso notifiche negato");
  const reg = await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (sub) {
    try {
      await sub.unsubscribe();
    } catch {
    }
  }
  const appServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
  sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: appServerKey
  });
  await sendSubscriptionToServer(sub, "subscribe");
  try {
    localStorage.setItem("o40_push_sub", JSON.stringify({ endpoint: sub.endpoint }));
  } catch {
  }
  return sub;
}
async function unsubscribePush() {
  const sub = await getExistingSubscription();
  if (sub) {
    await sendSubscriptionToServer(sub, "unsubscribe").catch(() => {
    });
    await sub.unsubscribe();
  }
  try {
    localStorage.removeItem("o40_push_sub");
  } catch {
  }
}
async function sendSubscriptionToServer(subscription, action = "subscribe") {
  const url = action === "unsubscribe" ? `${API_BASE}/push-unsubscribe.php` : `${API_BASE}/push-subscribe.php`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json().catch(() => ({}));
  } catch (e) {
    console.warn("[push] backend non raggiungibile, salvo solo locale", e);
    return { localOnly: true };
  }
}
async function updatePushStats(sessions, profile, lang) {
  const sub = await getExistingSubscription();
  if (!sub) return;
  try {
    const now = Date.now();
    const last = sessions.length ? sessions.reduce((a, b) => new Date(b.date) > new Date(a.date) ? b : a) : null;
    const missed = last ? Math.floor((now - new Date(last.date).getTime()) / 864e5) : 999;
    const payload = {
      endpoint: sub.endpoint,
      stats: {
        n: sessions.length,
        missed,
        lang: lang || (profile == null ? void 0 : profile.lang) || "it",
        name: (profile == null ? void 0 : profile.name) || "",
        ts: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    await fetch(`${API_BASE}/push-update-stats.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(() => {
    });
  } catch {
  }
}
async function testPushViaSW(lang = "it") {
  const reg = await navigator.serviceWorker.ready;
  try {
    const sub = await getExistingSubscription();
    const res = await fetch(`${API_BASE}/push-send.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ test: true, filterSelf: true, lang, subscription: sub ? { endpoint: sub.endpoint } : null })
    });
    if (res.ok) {
      const j = await res.json();
      if (j.sent > 0) return j;
      throw new Error("no sent");
    }
  } catch {
  }
  const l2 = lang || "it";
  const titles = { it: "Operator 40 — Test push", en: "Operator 40 — Push test", de: "Operator 40 — Push-Test" };
  const bodies = {
    it: "Se vedi questo, il push PWA funziona (via SW).",
    en: "If you see this, PWA push works (via SW).",
    de: "Wenn du das siehst, funktioniert PWA-Push (via SW)."
  };
  if ("showNotification" in ServiceWorkerRegistration.prototype) {
    await reg.showNotification(titles[l2] || titles.it, {
      body: bodies[l2] || bodies.it,
      icon: "./icons/icon-192.png",
      badge: "./icons/icon-192.png",
      tag: "o40-test",
      data: { url: "./" }
    });
    return { localOnly: true };
  }
  if (typeof Notification !== "undefined") {
    new Notification(titles[l2] || titles.it, { body: bodies[l2] || bodies.it });
  }
  return { localOnly: true };
}
function getWeeklyProgress(sessions, weeklyGoal = WEEKLY_GOAL) {
  const now = /* @__PURE__ */ new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + 1);
  start.setHours(0, 0, 0, 0);
  const done = (sessions || []).filter((s) => new Date(s.date) >= start).length;
  const pct = Math.min(1, done / weeklyGoal);
  const remain = Math.max(0, weeklyGoal - done);
  return { done, total: weeklyGoal, pct, remain, isDone: done >= weeklyGoal };
}
function getConsistencyScore$1(sessions, weeks = 8) {
  if (!(sessions == null ? void 0 : sessions.length)) return 0;
  const now = /* @__PURE__ */ new Date();
  const byDay = new Set(sessions.map(sessionDayKey$1));
  let activeDays = 0;
  for (let i = 0; i < weeks * 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    if (byDay.has(dayKey$1(d))) activeDays++;
  }
  const ideal = weeks * WEEKLY_GOAL;
  return Math.round(Math.min(100, activeDays / ideal * 100));
}
function getAveragePace(sessions) {
  if (!(sessions == null ? void 0 : sessions.length)) return null;
  const totalSec = sessions.reduce((a, s) => a + (s.durationSec || 780), 0);
  const totalKcal = sessions.reduce((a, s) => a + (s.kcal || 0), 0);
  const avgMin = Math.round(totalSec / sessions.length / 60);
  const avgKcal = Math.round(totalKcal / sessions.length);
  return { avgMin, avgKcal, count: sessions.length };
}
function getStreakRisk$1(sessions) {
  if (!(sessions == null ? void 0 : sessions.length)) return "break";
  const last = new Date(sessions[sessions.length - 1].date);
  const diffDays = Math.round((Date.now() - last.getTime()) / 864e5);
  if (diffDays <= 1) return "ok";
  if (diffDays === 2) return "at-risk";
  return "break";
}
function daysSinceLastSession(sessions) {
  if (!sessions.length) return 999;
  const last = sessions.reduce((a, b) => new Date(b.date) > new Date(a.date) ? b : a);
  const diff = Math.floor((Date.now() - new Date(last.date).getTime()) / 864e5);
  return diff;
}
const STRESS_TIPS = {
  it: [
    "Tip anti-stress: 4s inspira, 4s trattieni, 4s espira — 3 volte e riparti.",
    "Stress? 2 min di plank + 10 respiri profondi. Bastano.",
    "Pausa 60s: spalle giù, collo lungo, 5 respiri lenti. Poi missione.",
    "Tip: cammina 10 min a pranzo — abbassa cortisolo più di un caffè.",
    "Sotto pressione? Fai 20 squat lenti — scarichi tensione, non la accumuli.",
    "Tip: bevi un bicchiere d’acqua e fai 30″ di superman. Ricarica lampo."
  ],
  en: [
    "Stress tip: 4s in, 4s hold, 4s out — 3 rounds and go.",
    "Stressed? 2 min plank + 10 deep breaths. Enough.",
    "60s reset: shoulders down, neck long, 5 slow breaths. Then mission.",
    "Tip: 10 min walk at lunch — lowers cortisol more than coffee.",
    "Under pressure? 20 slow squats — release tension."
  ],
  de: [
    "Anti-Stress-Tipp: 4s ein, 4s halten, 4s aus — 3 Runden.",
    "Gestresst? 2 Min Plank + 10 tiefe Atemzüge.",
    "60s Reset: Schultern runter, Nacken lang, 5 Atemzüge."
  ]
};
const MOTIVATIONAL_GENERIC = {
  it: [
    "Ogni ripetizione è un investimento sui tuoi 40+.",
    "15 minuti oggi valgono più di un’ora mai fatta.",
    "Costanza > intensità. Un passo alla volta.",
    "Il tuo corpo ricorda ogni missione. Continua.",
    "Non serve essere perfetti, serve non fermarsi."
  ],
  en: [
    "Every rep is an investment in your 40+.",
    "15 minutes today beats an hour never done.",
    "Consistency > intensity. One step at a time."
  ],
  de: [
    "Jede Wiederholung ist eine Investition.",
    "15 Minuten heute schlagen eine nie gemachte Stunde."
  ]
};
function personalize(base, name, lang) {
  if (!name || !name.trim() || name.trim().toLowerCase() === "operatore") return base;
  const clean = name.trim().split(" ")[0];
  const prefixes = {
    it: `Ciao ${clean}, `,
    en: `Hey ${clean}, `,
    de: `Hey ${clean}, `
  };
  return (prefixes[lang] || prefixes.it) + base.charAt(0).toLowerCase() + base.slice(1);
}
function getMotivationalMessage({ sessions = [], profile = null, lang = "it", date = /* @__PURE__ */ new Date() } = {}) {
  var _a;
  const n2 = sessions.length;
  const streak = computeStreak(sessions);
  computeBestStreak(sessions);
  const missed = daysSinceLastSession(sessions);
  const cons = (() => {
    try {
      return getConsistencyScore$1(sessions, 8);
    } catch {
      return 0;
    }
  })();
  const risk = getStreakRisk$1(sessions);
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 864e5);
  const name = ((_a = profile == null ? void 0 : profile.name) == null ? void 0 : _a.trim()) || null;
  if (n2 > 0 && missed >= 2) {
    const titles2 = {
      it: `Manchi da ${missed} giorni — torna in base! 💪`,
      en: `Away for ${missed} days — come back! 💪`,
      de: `Seit ${missed} Tagen weg — komm zurück! 💪`
    };
    const bodies = {
      it: missed >= 4 ? `La serie si è interrotta, ma bastano 15′ di Recupero Attivo per riprendere. Andiamo?` : `La tua striscia ti aspetta. Anche 15′ oggi salvano il ritmo.`,
      en: `Your streak awaits. Even 15′ today keeps rhythm.`,
      de: `Deine Serie wartet. Schon 15′ heute halten den Rhythmus.`
    };
    return {
      title: titles2[lang] || titles2.it,
      body: personalize(bodies[lang] || bodies.it, name, lang),
      tag: "o40-comeback",
      type: "comeback"
    };
  }
  if (streak >= 7) {
    const titles2 = { it: `Sei inarrestabile! 🔥 ${streak} giorni`, en: `Unstoppable! 🔥 ${streak} days`, de: `Unaufhaltsam! 🔥 ${streak} Tage` };
    const bodies = {
      it: `Costanza al ${cons}% — continua così, stai andando alla grande!`,
      en: `Consistency ${cons}% — keep going, you're doing great!`,
      de: `Konstanz ${cons}% — weiter so, du machst es großartig!`
    };
    return {
      title: titles2[lang] || titles2.it,
      body: personalize(bodies[lang] || bodies.it, name, lang),
      tag: "o40-streak",
      type: "streak"
    };
  }
  if (streak >= 3) {
    const titles2 = { it: `Continua così! 🔥 ${streak} giorni di fila`, en: `Keep it up! 🔥 ${streak} days`, de: `Weiter so! 🔥 ${streak} Tage` };
    const bodies = {
      it: `Stai andando bene — mantieni il ritmo, il risultato arriva.`,
      en: `You're doing well — keep rhythm.`,
      de: `Du machst es gut — halte den Rhythmus.`
    };
    return {
      title: titles2[lang] || titles2.it,
      body: personalize(bodies[lang] || bodies.it, name, lang),
      tag: "o40-streak",
      type: "streak"
    };
  }
  if (risk === "at-risk") {
    const titles2 = { it: "Streak a rischio ⏰", en: "Streak at risk ⏰", de: "Serie in Gefahr ⏰" };
    const bodies = {
      it: "Un giorno al break — 15′ di Recupero Attivo oggi salvano la serie.",
      en: "One day to break — 15′ Active Recovery saves the streak.",
      de: "Ein Tag bis zum Bruch — 15′ Aktive Erholung retten die Serie."
    };
    return {
      title: titles2[lang] || titles2.it,
      body: personalize(bodies[lang] || bodies.it, name, lang),
      tag: "o40-risk",
      type: "risk"
    };
  }
  if (n2 === 0) {
    const titles2 = { it: "Inizia oggi 🌱", en: "Start today 🌱", de: "Starte heute 🌱" };
    const bodies = {
      it: "15′ bastano per la prima missione. Pancia piatta inizia da qui.",
      en: "15′ is enough for your first mission.",
      de: "15′ reichen für die erste Mission."
    };
    return {
      title: titles2[lang] || titles2.it,
      body: personalize(bodies[lang] || bodies.it, name, lang),
      tag: "o40-start",
      type: "start"
    };
  }
  if (dayOfYear % 3 === 0) {
    const tips = STRESS_TIPS[lang] || STRESS_TIPS.it;
    const tip = tips[dayOfYear % tips.length];
    const titles2 = { it: "Tip anti-stress 🧘", en: "Anti-stress tip 🧘", de: "Anti-Stress Tipp 🧘" };
    return {
      title: titles2[lang] || titles2.it,
      body: personalize(tip, name, lang),
      tag: "o40-stress",
      type: "stress"
    };
  }
  const generics = MOTIVATIONAL_GENERIC[lang] || MOTIVATIONAL_GENERIC.it;
  const g = generics[dayOfYear % generics.length];
  const titles = {
    it: "Continua così — stai andando bene 💪",
    de: "Weiter so — du machst es gut 💪",
    en: "Keep going — you're doing great 💪"
  };
  return {
    title: titles[lang] || titles.it,
    body: personalize(g, name, lang),
    tag: "o40-motivation",
    type: "motivation"
  };
}
const BELLY_LEVELS = [
  { key: "recluta", label: { it: "RECLUTA", en: "RECRUIT", de: "REKRUT" }, minPlank: 0, minCrunch: 0, work: 30, rest: 20, desc: { it: "Base — core sicuro", en: "Base — safe core", de: "Basis — sicher" } },
  { key: "combattente", label: { it: "COMBATTENTE", en: "FIGHTER", de: "KÄMPFER" }, minPlank: 30, minCrunch: 10, work: 40, rest: 20, desc: { it: "Standard — 40″/20″", en: "Standard — 40s/20s", de: "Standard — 40s/20s" } },
  { key: "elite", label: { it: "ELITE", en: "ELITE", de: "ELITE" }, minPlank: 60, minCrunch: 20, work: 45, rest: 15, desc: { it: "Avanzato — 45″/15″", en: "Advanced — 45s/15s", de: "Fortgeschritten — 45s/15s" } }
];
function getBellyLevelForTest({ plankSec = 0, crunchReps = 0 } = {}) {
  const p2 = Math.max(0, parseInt(plankSec, 10) || 0);
  const c = Math.max(0, parseInt(crunchReps, 10) || 0);
  const levelByPlank = p2 >= 60 ? "elite" : p2 >= 30 ? "combattente" : "recluta";
  const levelByCrunch = c >= 20 ? "elite" : c >= 10 ? "combattente" : "recluta";
  const order = { recluta: 0, combattente: 1, elite: 2 };
  const chosen = order[levelByPlank] < order[levelByCrunch] ? levelByPlank : levelByCrunch;
  return BELLY_LEVELS.find((l2) => l2.key === chosen) || BELLY_LEVELS[0];
}
function shouldProgressBellyLevel({ sessions, currentLevelKey = "recluta", waistHistory, profile }) {
  const levelOrder = ["recluta", "combattente", "elite"];
  const idx = levelOrder.indexOf(currentLevelKey);
  if (idx >= levelOrder.length - 1) return null;
  const lastChange = (profile == null ? void 0 : profile.bellyLevelUpdated) ? new Date(profile.bellyLevelUpdated) : null;
  if (lastChange) {
    const diff = (Date.now() - lastChange.getTime()) / 864e5;
    if (diff < 7) return null;
  }
  const weekAgo = Date.now() - 7 * 864e5;
  const bellySessions = (sessions || []).filter((s) => ["N", "O", "P", "A", "E", "F", "M"].includes(s.programId) && new Date(s.date).getTime() > weekAgo);
  if (bellySessions.length < 3) return null;
  return levelOrder[idx + 1];
}
function BellyTest({ onSave, onClose, lang = "it", initial = null }) {
  const [plankSec, setPlankSec] = reactExports.useState((initial == null ? void 0 : initial.plankSec) ? String(initial.plankSec) : "");
  const [crunchReps, setCrunchReps] = reactExports.useState((initial == null ? void 0 : initial.crunchReps) ? String(initial.crunchReps) : "");
  const [running, setRunning] = reactExports.useState(null);
  const [seconds, setSeconds] = reactExports.useState(0);
  const [crunchCount, setCrunchCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      if (running === "plank") setSeconds((s) => s + 1);
      if (running === "crunch") setSeconds((s) => s + 1);
    }, 1e3);
    return () => clearInterval(id);
  }, [running]);
  reactExports.useEffect(() => {
    if (running === "crunch" && seconds >= 30) {
      setRunning(null);
      setCrunchReps(String(crunchCount));
      setSeconds(0);
    }
  }, [seconds, running, crunchCount]);
  const p2 = parseInt(plankSec, 10) || 0;
  const c = parseInt(crunchReps, 10) || 0;
  const hasInput = p2 > 0 || c > 0;
  const suggested = hasInput ? getBellyLevelForTest({ plankSec: p2, crunchReps: c }) : null;
  const t = (it, en, de) => lang === "en" ? en : lang === "de" ? de : it;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${BLAZE}66`, borderRadius: 14, padding: 14 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 18, color: BLAZE }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: BLAZE, fontSize: 11, letterSpacing: "0.08em" }, children: t("TEST PANCIA 2.0 — TROVA IL TUO LIVELLO", "BELLY TEST 2.0 — FIND YOUR LEVEL", "BAUCH-TEST 2.0") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 12 }, children: t(
      "2 test da 30-60s: tieni il plank più a lungo che puoi e conta i crunch in 30s. Ti assegno Recluta/Combattente/Elite automatico.",
      "2 quick tests: hold plank as long as you can and count crunches in 30s. You get auto level.",
      "2 Tests: Plank so lange wie möglich halten und Crunches in 30s zählen."
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, marginBottom: 6 }, children: "PLANK MAX (sec)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: plankSec,
            onChange: (e) => setPlankSec(e.target.value.replace(/\D/g, "").slice(0, 3)),
            placeholder: "es. 45",
            inputMode: "numeric",
            style: { width: "100%", background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 8, padding: "10px 12px", color: PAPER, fontSize: 16, outline: "none" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, marginTop: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                setRunning(running === "plank" ? null : "plank");
                if (running !== "plank") setSeconds(0);
              },
              style: { flex: 1, padding: "6px 8px", borderRadius: 8, border: `1px solid ${running === "plank" ? BLAZE : OLIVE}`, background: running === "plank" ? `${BLAZE}22` : "transparent", color: running === "plank" ? BLAZE : STEEL, fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { size: 12 }),
                " ",
                running === "plank" ? `${seconds}″ STOP` : "VIA PLANK"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                setPlankSec(String(seconds));
                setRunning(null);
              },
              style: { padding: "6px 10px", borderRadius: 8, border: `1px solid ${OLIVE}`, background: INK_2, color: KHAKI, fontSize: 11, cursor: "pointer" },
              children: [
                "Usa ",
                seconds,
                "″"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 9, marginTop: 4 }, children: "<30 Recluta · 30-60 Combattente · >60 Elite" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, marginBottom: 6 }, children: "CRUNCH 30″ (rep)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: crunchReps,
            onChange: (e) => setCrunchReps(e.target.value.replace(/\D/g, "").slice(0, 2)),
            placeholder: "es. 14",
            inputMode: "numeric",
            style: { width: "100%", background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 8, padding: "10px 12px", color: PAPER, fontSize: 16, outline: "none" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, marginTop: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                if (running === "crunch") {
                  setRunning(null);
                  setCrunchReps(String(crunchCount));
                } else {
                  setRunning("crunch");
                  setSeconds(0);
                  setCrunchCount(0);
                }
              },
              style: { flex: 1, padding: "6px 8px", borderRadius: 8, border: `1px solid ${running === "crunch" ? BLAZE : OLIVE}`, background: running === "crunch" ? `${BLAZE}22` : "transparent", color: running === "crunch" ? BLAZE : STEEL, fontSize: 11, fontWeight: 700, cursor: "pointer" },
              children: running === "crunch" ? `30″: ${30 - seconds}s` : "VIA 30″"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setCrunchCount((c2) => c2 + 1),
              disabled: running !== "crunch",
              style: { padding: "6px 10px", borderRadius: 8, border: `1px solid ${OLIVE}`, background: running === "crunch" ? BLAZE : INK_2, color: running === "crunch" ? PAPER : STEEL, fontSize: 14, fontWeight: 700, cursor: running === "crunch" ? "pointer" : "not-allowed" },
              children: [
                "+1 (",
                crunchCount,
                ")"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 9, marginTop: 4 }, children: "<10 Recluta · 10-20 Combattente · >20 Elite" })
      ] })
    ] }),
    suggested && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK})`, border: `1px solid ${BLAZE}`, borderRadius: 10, padding: 10, display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 36, height: 36, borderRadius: "50%", background: `${BLAZE}22`, display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 16, color: BLAZE }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10 }, children: "LIVELLO SUGGERITO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: PAPER, fontSize: 14, fontWeight: 700 }, children: [
          suggested.label.it,
          " · ",
          suggested.work,
          "″/",
          suggested.rest,
          "″"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11 }, children: suggested.desc.it })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "right" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: BLAZE, fontSize: 10 }, children: [
        p2,
        "″ / ",
        c,
        " rep"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: { flex: 1, padding: "10px 12px", borderRadius: 10, border: `1px solid ${OLIVE}`, background: INK, color: STEEL, fontSize: 12, fontWeight: 600, cursor: "pointer" }, children: t("Chiudi", "Close", "Schließen") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => hasInput && suggested && onSave({ plankSec: p2, crunchReps: c, level: suggested.key, date: (/* @__PURE__ */ new Date()).toISOString() }),
          disabled: !hasInput || !suggested,
          style: { flex: 2, padding: "10px 12px", borderRadius: 10, border: `1px solid ${BLAZE}`, background: hasInput ? `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})` : INK_2, color: PAPER, fontSize: 12, fontWeight: 700, cursor: hasInput ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, opacity: hasInput ? 1 : 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }),
            " ",
            t("Salva livello", "Save level", "Level speichern"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 4, marginTop: 8, justifyContent: "center" }, children: BELLY_LEVELS.map((l2) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 9, color: (suggested == null ? void 0 : suggested.key) === l2.key ? BLAZE : STEEL, border: `1px solid ${(suggested == null ? void 0 : suggested.key) === l2.key ? BLAZE : OLIVE}`, borderRadius: 6, padding: "2px 6px", background: (suggested == null ? void 0 : suggested.key) === l2.key ? `${BLAZE}18` : "transparent" }, children: l2.label.it }, l2.key)) })
  ] });
}
function BeforeAfterSlider({ before, after }) {
  const [pos, setPos] = reactExports.useState(50);
  if (!before || !after) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 12, overflow: "hidden", position: "relative" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { display: "flex", justifyContent: "space-between", padding: "6px 10px", color: KHAKI, fontSize: 9, letterSpacing: "0.06em", background: INK }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "PRIMA" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "DOPO" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", width: "100%", height: 280, overflow: "hidden", background: "#000" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: after.url, alt: "dopo", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, width: `${pos}%`, overflow: "hidden", borderRight: `2px solid ${BLAZE}` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: before.url, alt: "prima", style: { width: "100%", height: 280, objectFit: "cover", maxWidth: "none", display: "block" } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 100,
          value: pos,
          onChange: (e) => setPos(parseInt(e.target.value, 10)),
          style: { position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", width: "80%", accentColor: BLAZE }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", left: `${pos}%`, top: 0, bottom: 0, width: 2, background: BLAZE, pointerEvents: "none", transform: "translateX(-1px)" } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "6px 10px", color: STEEL, fontSize: 10 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(before.date).toLocaleDateString("it-IT") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        new Date(after.date).toLocaleDateString("it-IT"),
        " · Δ ",
        Math.round((new Date(after.date) - new Date(before.date)) / 864e5),
        " gg"
      ] })
    ] })
  ] });
}
class HysteresisStateMachine {
  constructor(cfg) {
    this.cfg = {
      downThreshold: cfg.downThreshold,
      upThreshold: cfg.upThreshold,
      hysteresis: cfg.hysteresis ?? 6,
      minDownMs: cfg.minDownMs ?? 180,
      minUpMs: cfg.minUpMs ?? 120,
      minRepsIntervalMs: cfg.minRepsIntervalMs ?? 300
    };
    this.state = {
      phase: "idle",
      lastTransitionAt: 0,
      lastAngle: 180,
      minAngleInRep: 180,
      maxAngleInRep: 0
    };
  }
  reset() {
    this.state = { phase: "idle", lastTransitionAt: 0, lastAngle: 180, minAngleInRep: 180, maxAngleInRep: 0 };
  }
  updateConfig(patch) {
    this.cfg = { ...this.cfg, ...patch };
  }
  get phase() {
    return this.state.phase;
  }
  get minAngle() {
    return this.state.minAngleInRep;
  }
  get maxAngle() {
    return this.state.maxAngleInRep;
  }
  /**
   * Feed one angle sample (primary joint). Returns { nextPhase, didRep }.
   * Hysteresis: down = angle < downThreshold, up = angle > upThreshold.
   * Band between thresholds = no transition (sticky).
   */
  step(angle, timestampMs, visibility) {
    const { downThreshold, upThreshold, minDownMs, minRepsIntervalMs } = this.cfg;
    const visOk = visibility >= 0.22;
    let p2 = this.state.phase;
    let didRep = false;
    this.state.minAngleInRep = Math.min(this.state.minAngleInRep, angle);
    this.state.maxAngleInRep = Math.max(this.state.maxAngleInRep, angle);
    const dtSince = timestampMs - this.state.lastTransitionAt;
    if (p2 === "idle") {
      if (visOk && angle > upThreshold - 10) {
        p2 = "ready";
        this.transition(p2, timestampMs, angle);
      } else if (visOk) {
        p2 = "ready";
        this.transition(p2, timestampMs, angle);
      }
      this.state.lastAngle = angle;
      return { nextPhase: p2, didRep };
    }
    const isDownBand = angle <= downThreshold;
    const isUpBand = angle >= upThreshold;
    switch (p2) {
      case "ready":
        if (isDownBand) {
          p2 = "down";
          this.transition(p2, timestampMs, angle);
        }
        break;
      case "down":
        if (dtSince >= minDownMs && angle <= downThreshold - 2) {
          p2 = "bottom";
          this.transition(p2, timestampMs, angle);
        } else if (isUpBand && dtSince >= minDownMs) {
          p2 = "up";
          this.transition(p2, timestampMs, angle);
        }
        break;
      case "bottom":
        if (isUpBand && dtSince >= minDownMs) {
          p2 = "up";
          this.transition(p2, timestampMs, angle);
        }
        break;
      case "up":
        if (isUpBand && dtSince >= (this.cfg.minUpMs ?? 100)) {
          const hasValidRom = this.state.minAngleInRep <= downThreshold + 18;
          const timeOk = dtSince >= minRepsIntervalMs || this.state.lastTransitionAt === 0;
          if (hasValidRom && timeOk) {
            didRep = true;
            p2 = "rep_completed";
          }
        }
        break;
      case "rep_completed":
        p2 = "ready";
        this.transition(p2, timestampMs, angle);
        this.state.minAngleInRep = angle;
        this.state.maxAngleInRep = angle;
        break;
    }
    if (!didRep && this.state.phase === "up" && isDownBand && dtSince >= (this.cfg.minUpMs ?? 100)) ;
    if (p2 !== this.state.phase && !didRep) {
      this.transition(p2, timestampMs, angle);
    } else if (didRep) {
      this.state.phase = "rep_completed";
      this.state.lastTransitionAt = timestampMs;
    }
    this.state.lastAngle = angle;
    if (didRep) return { nextPhase: "rep_completed", didRep: true };
    if (this.state.phase === "rep_completed") ;
    return { nextPhase: this.state.phase, didRep };
  }
  /** Call after handling a rep to reset ROM and go to ready. */
  consumeRep(timestampMs, currentAngle) {
    this.state.phase = "ready";
    this.state.lastTransitionAt = timestampMs;
    this.state.minAngleInRep = currentAngle;
    this.state.maxAngleInRep = currentAngle;
  }
  transition(next, ts, angle) {
    this.state.phase = next;
    this.state.lastTransitionAt = ts;
  }
  /** Visibility lost — go idle if not visible for a threshold (caller decides). */
  markIdle(timestampMs, angle) {
    this.state.phase = "idle";
    this.state.lastTransitionAt = timestampMs;
    this.state.lastAngle = angle;
    this.state.minAngleInRep = angle;
    this.state.maxAngleInRep = angle;
  }
}
const LM = {
  nose: 0,
  left_ear: 7,
  right_ear: 8,
  left_shoulder: 11,
  right_shoulder: 12,
  left_elbow: 13,
  right_elbow: 14,
  left_wrist: 15,
  right_wrist: 16,
  left_hip: 23,
  right_hip: 24,
  left_knee: 25,
  right_knee: 26,
  left_ankle: 27,
  right_ankle: 28,
  left_heel: 29,
  right_heel: 30
};
function angleDeg(a, b, c) {
  const abx = a.x - b.x, aby = a.y - b.y;
  const cbx = c.x - b.x, cby = c.y - b.y;
  const dot2 = abx * cbx + aby * cby;
  const mag = Math.hypot(abx, aby) * Math.hypot(cbx, cby);
  if (mag < 1e-9) return 180;
  const cos = Math.max(-1, Math.min(1, dot2 / mag));
  return Math.acos(cos) * 180 / Math.PI;
}
function angleFromLandmarks(lm, a, b, c) {
  const pa = lm[a], pb = lm[b], pc = lm[c];
  if (!pa || !pb || !pc) return 180;
  return angleDeg(pa, pb, pc);
}
function bilateralAngle(lm, left, right, visThreshold = 0.4) {
  var _a, _b, _c, _d, _e, _f;
  const al = angleFromLandmarks(lm, left[0], left[1], left[2]);
  const ar = angleFromLandmarks(lm, right[0], right[1], right[2]);
  const vl = Math.min(((_a = lm[left[0]]) == null ? void 0 : _a.visibility) ?? 1, ((_b = lm[left[1]]) == null ? void 0 : _b.visibility) ?? 1, ((_c = lm[left[2]]) == null ? void 0 : _c.visibility) ?? 1);
  const vr = Math.min(((_d = lm[right[0]]) == null ? void 0 : _d.visibility) ?? 1, ((_e = lm[right[1]]) == null ? void 0 : _e.visibility) ?? 1, ((_f = lm[right[2]]) == null ? void 0 : _f.visibility) ?? 1);
  const lOk = vl >= visThreshold, rOk = vr >= visThreshold;
  if (lOk && rOk) return (al + ar) / 2;
  if (lOk) return al;
  if (rOk) return ar;
  return (al + ar) / 2;
}
function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: ((a.z ?? 0) + (b.z ?? 0)) / 2, visibility: Math.min(a.visibility ?? 1, b.visibility ?? 1) };
}
function visibilityScore(lm, indices) {
  var _a;
  if (!lm || lm.length === 0) return 0;
  let sum = 0, n2 = 0;
  for (const i of indices) {
    const v = (_a = lm[i]) == null ? void 0 : _a.visibility;
    if (v != null) {
      sum += v;
      n2++;
    }
  }
  return n2 ? sum / n2 : 0;
}
function clamp(n2, min, max) {
  return Math.max(min, Math.min(max, n2));
}
const CUE = {
  backStraight: { it: "Schiena dritta", en: "Keep your back straight", de: "Rücken gerade halten" },
  kneesOverToes: { it: "Ginocchia sopra le punte", en: "Knees over toes", de: "Knie über Fußspitzen" },
  fullRange: { it: "Completa il movimento", en: "Complete the range", de: "Volle Bewegung" },
  elbows45: { it: "Gomiti a 45°", en: "Elbows at 45°", de: "Ellbogen 45°" },
  coreTight: { it: "Addome contratto", en: "Core tight", de: "Bauch anspannen" },
  breathe: { it: "Respira", en: "Breathe", de: "Atmen" },
  hipsUp: { it: "Bacino alto", en: "Hips up", de: "Becken hoch" },
  control: { it: "Movimento controllato", en: "Controlled motion", de: "Kontrollierte Bewegung" },
  kneesToChest: { it: "Ginocchio al petto", en: "Knee to chest", de: "Knie zur Brust" },
  steady: { it: "Ritmo costante", en: "Steady rhythm", de: "Gleichmäßiges Tempo" },
  scendiAncora: { it: "Scendi ancora", en: "Lower still", de: "Noch tiefer" },
  distendiBraccia: { it: "Braccia completamente distese", en: "Fully extend arms", de: "Arme ganz strecken" },
  distendiGambe: { it: "Distendi le gambe", en: "Fully extend legs", de: "Beine ganz strecken" },
  pettoATerra: { it: "Petto a terra", en: "Chest to floor", de: "Brust zum Boden" },
  schienaDritta: { it: "Schiena dritta", en: "Keep back straight", de: "Rücken gerade halten" },
  addomeStretto: { it: "Addome stretto", en: "Tighten core", de: "Core anspannen" }
};
function tr(cue, lang) {
  return cue[lang] ?? cue.en;
}
function kneeAngle(lm) {
  return bilateralAngle(lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]);
}
function hipAngle(lm) {
  return bilateralAngle(lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
}
function elbowAngle(lm) {
  return bilateralAngle(lm, [LM.left_shoulder, LM.left_elbow, LM.left_wrist], [LM.right_shoulder, LM.right_elbow, LM.right_wrist]);
}
function shoulderAbduction(lm) {
  return bilateralAngle(lm, [LM.left_hip, LM.left_shoulder, LM.left_elbow], [LM.right_hip, LM.right_shoulder, LM.right_elbow]);
}
function trunkLean(lm) {
  return bilateralAngle(lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
}
function ankleDistance(lm) {
  const a = lm[LM.left_ankle], b = lm[LM.right_ankle];
  if (!a || !b) return 0;
  return Math.hypot(a.x - b.x, a.y - b.y);
}
function bestSideAngle(lm, left, right) {
  var _a, _b, _c, _d, _e, _f;
  const al = angleFromLandmarks(lm, left[0], left[1], left[2]);
  const ar = angleFromLandmarks(lm, right[0], right[1], right[2]);
  const vl = Math.min(((_a = lm[left[0]]) == null ? void 0 : _a.visibility) ?? 0, ((_b = lm[left[1]]) == null ? void 0 : _b.visibility) ?? 0, ((_c = lm[left[2]]) == null ? void 0 : _c.visibility) ?? 0);
  const vr = Math.min(((_d = lm[right[0]]) == null ? void 0 : _d.visibility) ?? 0, ((_e = lm[right[1]]) == null ? void 0 : _e.visibility) ?? 0, ((_f = lm[right[2]]) == null ? void 0 : _f.visibility) ?? 0);
  if (vl > vr + 0.12) return al;
  if (vr > vl + 0.12) return ar;
  return (al + ar) / 2;
}
function kneeAngleBest(lm) {
  return bestSideAngle(lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]);
}
function hipAngleBest(lm) {
  return bestSideAngle(lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
}
function elbowAngleBest(lm) {
  return bestSideAngle(lm, [LM.left_shoulder, LM.left_elbow, LM.left_wrist], [LM.right_shoulder, LM.right_elbow, LM.right_wrist]);
}
const EXERCISE_DEFINITIONS = {
  // 1. SQUAT — permissive: down 92 (was 85), up 150 (was 155). Real-time cues scendi ancora / distendi gambe.
  squat: {
    id: "squat",
    aliases: [],
    label: { it: "Squat", en: "Squat", de: "Kniebeuge" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_ankle, LM.right_ankle, LM.left_shoulder, LM.right_shoulder],
    movementPattern: "squat_down_up",
    safetyRules: ["backStraight", "kneesOverToes"],
    primaryAngle: { a: LM.left_hip, b: LM.left_knee, c: LM.left_ankle, name: "knee" },
    secondaryAngles: [
      { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: "hipFlex", ideal: [40, 90] },
      { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_ankle, name: "trunk", ideal: [160, 180] }
    ],
    thresholds: { downThreshold: 108, upThreshold: 148, hysteresis: 5, minDownMs: 160, minUpMs: 110, minRepsIntervalMs: 380 },
    customTransition(angle, _vel, prev, ctx) {
      var _a, _b;
      const lm = ctx.landmarks;
      const knee = angle;
      const hipY = ((((_a = lm[LM.left_hip]) == null ? void 0 : _a.y) ?? 0.5) + (((_b = lm[LM.right_hip]) == null ? void 0 : _b.y) ?? 0.5)) / 2;
      const kneeDown = knee < 115;
      const hipDown = hipY > 0.61;
      const kneeUp = knee > 145;
      const hipUp = hipY < 0.6;
      if (prev === "ready" && (kneeDown || hipDown)) return "down";
      if (prev === "down" && (knee < 105 || hipY > 0.65)) return "bottom";
      if ((prev === "down" || prev === "bottom") && (kneeUp && hipUp)) return "up";
      return null;
    },
    evaluateForm(lm, angles, phase, ctx) {
      const cues = [];
      let quality = 92;
      const trunk = trunkLean(lm);
      const knee = angles["primary"] ?? angles["knee"] ?? kneeAngleBest(lm);
      if ((phase === "down" || phase === "ready") && knee > 105 && knee < 135 && ctx.direction === "down") {
        cues.push("scendiAncora");
      } else if ((phase === "up" || phase === "bottom") && knee > 125 && knee < 148 && ctx.direction === "up") {
        cues.push("distendiGambe");
      }
      if (trunk < 148) {
        quality -= 18;
        cues.unshift("backStraight");
      } else if (trunk < 162) {
        quality -= 7;
        cues.unshift("backStraight");
      }
      const leftK = angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle);
      const rightK = angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle);
      if (Math.abs(leftK - rightK) > 20) {
        quality -= 9;
        cues.push("kneesOverToes");
      }
      if (Math.abs(ctx.velocity) > 430) {
        quality -= 9;
        cues.push("control");
      }
      return { quality: clamp(quality, 0, 100), cues };
    }
  },
  // 2. PUSHUP — permissive down 88→95 (was 90), up 148 (was 155). Cues scendi ancora / braccia distese.
  pushup: {
    id: "pushup",
    aliases: ["flessioni"],
    label: { it: "Piegamenti", en: "Push-up", de: "Liegestütz" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_elbow, LM.right_elbow, LM.left_wrist, LM.right_wrist, LM.left_hip, LM.right_hip, LM.left_ankle, LM.right_ankle],
    movementPattern: "pushup_down_up",
    safetyRules: ["coreTight", "elbows45"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_elbow, c: LM.left_wrist, name: "elbow" },
    secondaryAngles: [
      { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_ankle, name: "plankLine", ideal: [160, 185] },
      { a: LM.left_hip, b: LM.left_shoulder, c: LM.left_elbow, name: "shoulder", ideal: [20, 70] }
    ],
    thresholds: { downThreshold: 102, upThreshold: 145, hysteresis: 6, minDownMs: 160, minUpMs: 110, minRepsIntervalMs: 340 },
    evaluateForm(lm, angles, phase, ctx) {
      const cues = [];
      let q2 = 90;
      const elbow = angles["primary"] ?? angles["elbow"] ?? elbowAngleBest(lm);
      if ((phase === "down" || phase === "ready") && elbow > 102 && elbow < 132 && ctx.direction === "down") cues.push("scendiAncora");
      else if ((phase === "up" || phase === "bottom") && elbow > 128 && elbow < 147 && ctx.direction === "up") cues.push("distendiBraccia");
      const line = trunkLean(lm);
      if (line < 152) {
        q2 -= 20;
        cues.unshift("coreTight");
      } else if (line < 164) {
        q2 -= 8;
        cues.unshift("coreTight");
      }
      const shoulderL = angleFromLandmarks(lm, LM.left_hip, LM.left_shoulder, LM.left_elbow);
      if (shoulderL > 84) {
        q2 -= 10;
        cues.push("elbows45");
      }
      if (Math.abs(ctx.velocity) > 520) {
        q2 -= 8;
        cues.push("control");
      }
      return { quality: clamp(q2, 0, 100), cues };
    }
  },
  // 3. CRUNCH
  crunch: {
    id: "crunch",
    aliases: [],
    label: { it: "Crunch", en: "Crunch", de: "Crunch" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_ear, LM.right_ear],
    movementPattern: "hip_flexion",
    safetyRules: ["backStraight"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: "hipFlex" },
    secondaryAngles: [{ a: LM.left_hip, b: LM.left_shoulder, c: LM.left_ear, name: "neck", ideal: [70, 110] }],
    thresholds: { downThreshold: 95, upThreshold: 125, hysteresis: 6, minDownMs: 180, minUpMs: 140 },
    evaluateForm(lm, _angles, _phase, ctx) {
      const cues = [];
      let q2 = 88;
      const neck = angleFromLandmarks(lm, LM.left_hip, LM.left_shoulder, LM.left_ear);
      if (neck < 60 || neck > 120) {
        q2 -= 10;
        cues.push("backStraight");
      }
      if (Math.abs(ctx.velocity) > 380) {
        q2 -= 8;
        cues.push("control");
      }
      return { quality: clamp(q2, 0, 100), cues };
    }
  },
  // 4. PLANK (hold)
  plank: {
    id: "plank",
    aliases: [],
    label: { it: "Plank", en: "Plank", de: "Plank" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_ankle, LM.right_ankle],
    movementPattern: "hold_plank",
    safetyRules: ["coreTight", "hipsUp"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: "hipLine" },
    secondaryAngles: [{ a: LM.left_shoulder, b: LM.left_hip, c: LM.left_ankle, name: "fullLine", ideal: [160, 180] }],
    thresholds: { downThreshold: 150, upThreshold: 160, hysteresis: 5, minDownMs: 300, minUpMs: 300 },
    isHold: true,
    evaluateForm(lm) {
      const cues = [];
      const line = trunkLean(lm);
      const hip = hipAngle(lm);
      let q2 = 95;
      if (line < 155) {
        q2 = 55;
        cues.push("hipsUp");
      } else if (line < 165) {
        q2 -= 12;
        cues.push("coreTight");
      }
      if (hip < 150) {
        q2 -= 10;
        cues.push("hipsUp");
      }
      return { quality: clamp(q2, 0, 100), cues };
    }
  },
  // 5. MOUNTAIN CLIMBER — alternating knee drive, count each knee touch as half-rep or full cycle
  mountainclimber: {
    id: "mountainclimber",
    aliases: [],
    label: { it: "Mountain climber", en: "Mountain climber", de: "Mountain Climber" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_ankle, LM.right_ankle],
    movementPattern: "alternating_knee_drive",
    safetyRules: ["coreTight"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: "leftHipFlex" },
    secondaryAngles: [{ a: LM.right_shoulder, b: LM.right_hip, c: LM.right_knee, name: "rightHipFlex" }],
    thresholds: { downThreshold: 65, upThreshold: 120, hysteresis: 8, minDownMs: 120, minUpMs: 100 },
    customTransition(angle, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      hipAngle(lm) - 20;
      const left = angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
      const right = angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
      const driving = Math.min(left, right);
      if (prev === "ready" && driving < 75) return "down";
      if (prev === "down" && driving > 115) return "up";
      if (prev === "bottom" && driving > 115) return "up";
      if (prev === "down" && driving < 60) return "bottom";
      return null;
    },
    evaluateForm(lm, _angles, _phase, ctx) {
      const cues = [];
      let q2 = 88;
      if (trunkLean(lm) < 155) {
        q2 -= 15;
        cues.push("coreTight");
      }
      if (Math.abs(ctx.velocity) > 700) {
        q2 -= 8;
        cues.push("steady");
      }
      return { quality: clamp(q2, 0, 100), cues };
    }
  },
  // 6. JUMPING JACK — legs wide + arms overhead
  jumpingjack: {
    id: "jumpingjack",
    aliases: [],
    label: { it: "Jumping jack", en: "Jumping jack", de: "Jumping Jack" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_elbow, LM.right_elbow, LM.left_wrist, LM.right_wrist, LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_ankle, LM.right_ankle],
    movementPattern: "closed_open_closed",
    safetyRules: ["steady"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_elbow, c: LM.left_wrist, name: "arms" },
    secondaryAngles: [{ a: LM.left_hip, b: LM.left_knee, c: LM.left_ankle, name: "legs" }],
    thresholds: { downThreshold: 60, upThreshold: 140, hysteresis: 12, minDownMs: 160, minUpMs: 120 },
    customTransition(angle, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const legSpread = ankleDistance(lm);
      const armsUp = shoulderAbduction(lm);
      const combined = armsUp * 0.6 + legSpread * 200;
      if (prev === "ready" && combined < 55) return "down";
      if (prev === "down" && combined > 125) return "up";
      if (prev === "bottom" && combined > 125) return "up";
      if (prev === "down" && combined < 35) return "bottom";
      return null;
    },
    evaluateForm(_lm, _angles, _phase, ctx) {
      let q2 = 90;
      const cues = [];
      if (Math.abs(ctx.velocity) > 600) {
        q2 -= 6;
        cues.push("steady");
      }
      return { quality: clamp(q2, 0, 100), cues };
    }
  },
  // 7. FLUTTER KICKS — alternating hip flexion small amplitude bilateral
  flutterkick: {
    id: "flutterkick",
    aliases: ["flutterkicks"],
    label: { it: "Forbici", en: "Flutter kicks", de: "Flutter Kicks" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_ankle, LM.right_ankle],
    movementPattern: "alternating_hip_flex",
    safetyRules: ["coreTight"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: "hipFlex" },
    thresholds: { downThreshold: 145, upThreshold: 165, hysteresis: 5, minDownMs: 140, minUpMs: 120 },
    customTransition(_angle, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const lHip = angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
      const rHip = angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
      const asymmetry = Math.abs(lHip - rHip);
      const mean = (lHip + rHip) / 2;
      if (prev === "ready" && asymmetry > 14 && mean < 168) return "down";
      if ((prev === "down" || prev === "bottom") && asymmetry < 6) return "up";
      if (prev === "down" && asymmetry > 22) return "bottom";
      return null;
    },
    evaluateForm(lm, _angles, _phase, _ctx) {
      let q2 = 88;
      const cues = [];
      const trunk = hipAngle(lm);
      if (trunk > 185) {
        q2 -= 10;
        cues.push("coreTight");
      }
      return { quality: clamp(q2, 0, 100), cues };
    }
  },
  // 8. BICYCLE CRUNCH — opposite elbow to knee
  bicyclecrunch: {
    id: "bicyclecrunch",
    aliases: ["crunchbici"],
    label: { it: "Bicycle crunch", en: "Bicycle crunch", de: "Bicycle Crunch" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_elbow, LM.right_elbow],
    movementPattern: "cross_elbow_knee",
    safetyRules: ["control"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.right_knee, name: "crossA" },
    thresholds: { downThreshold: 45, upThreshold: 95, hysteresis: 10, minDownMs: 160, minUpMs: 120 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const le = lm[LM.left_elbow], rk = lm[LM.right_knee], re = lm[LM.right_elbow], lk = lm[LM.left_knee];
      if (!le || !rk || !re || !lk) return null;
      const d1 = Math.hypot(le.x - rk.x, le.y - rk.y);
      const d2 = Math.hypot(re.x - lk.x, re.y - lk.y);
      const best = Math.min(d1, d2);
      const contact = best < 0.16;
      const apart = best > 0.28;
      if (prev === "ready" && apart) return "down";
      if (prev === "down" && contact) return "bottom";
      if ((prev === "down" || prev === "bottom") && apart) return "up";
      return null;
    },
    evaluateForm(_lm, _a, _p, ctx) {
      let q2 = 87;
      if (Math.abs(ctx.velocity) > 500) {
        q2 -= 8;
      }
      return { quality: clamp(q2, 0, 100), cues: [] };
    }
  },
  // 9. LEG RAISE — hip 180->80
  legraise: {
    id: "legraise",
    aliases: [],
    label: { it: "Leg raise", en: "Leg raise", de: "Beinheben" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_ankle, LM.right_ankle],
    movementPattern: "hip_flexion_extended",
    safetyRules: ["control"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: "hipFlex" },
    thresholds: { downThreshold: 90, upThreshold: 155, hysteresis: 8, minDownMs: 260, minUpMs: 160 },
    evaluateForm(lm, _angles, _phase, _ctx) {
      let q2 = 90;
      const cues = [];
      const lk = angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle);
      const rk = angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle);
      const kneeExt = (lk + rk) / 2;
      if (kneeExt < 155) {
        q2 -= 12;
        cues.push("control");
      }
      return { quality: clamp(q2, 0, 100), cues };
    }
  },
  // 10. DEAD BUG — opposite arm/leg extension
  deadbug: {
    id: "deadbug",
    aliases: [],
    label: { it: "Dead bug", en: "Dead bug", de: "Dead Bug" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_elbow, LM.right_elbow, LM.left_wrist, LM.right_wrist, LM.left_ankle, LM.right_ankle],
    movementPattern: "contralateral_extension",
    safetyRules: ["coreTight"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: "hipFlex" },
    thresholds: { downThreshold: 95, upThreshold: 155, hysteresis: 10, minDownMs: 220, minUpMs: 160 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const lHip = angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
      const rHip = angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
      const lShoulder = angleFromLandmarks(lm, LM.left_hip, LM.left_shoulder, LM.left_elbow);
      const rShoulder = angleFromLandmarks(lm, LM.right_hip, LM.right_shoulder, LM.right_elbow);
      const extendedLeft = lHip > 150 && lShoulder > 130;
      const extendedRight = rHip > 150 && rShoulder > 130;
      const oneExtended = extendedLeft !== extendedRight;
      if (prev === "ready" && !oneExtended) return "down";
      if (prev === "down" && oneExtended) return "bottom";
      if ((prev === "down" || prev === "bottom") && !oneExtended) return "up";
      return null;
    },
    evaluateForm(lm, _a, _p, _ctx) {
      let q2 = 90;
      const cues = [];
      if (trunkLean(lm) < 160) {
        q2 -= 10;
        cues.push("coreTight");
      }
      return { quality: clamp(q2, 0, 100), cues };
    }
  },
  // 11. HEEL TAP — lateral crunch touching heel
  heeltap: {
    id: "heeltap",
    aliases: [],
    label: { it: "Heel tap", en: "Heel tap", de: "Heel Tap" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_wrist, LM.right_wrist, LM.left_heel, LM.right_heel],
    movementPattern: "lateral_flexion",
    safetyRules: ["control"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: "lateral" },
    thresholds: { downThreshold: 28, upThreshold: 65, hysteresis: 8, minDownMs: 180, minUpMs: 120 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const lw = lm[LM.left_wrist], lh = lm[LM.left_heel], rw = lm[LM.right_wrist], rh = lm[LM.right_heel];
      if (!lw || !lh || !rw || !rh) return null;
      const dL = Math.hypot(lw.x - lh.x, lw.y - lh.y);
      const dR = Math.hypot(rw.x - rh.x, rw.y - rh.y);
      const best = Math.min(dL, dR);
      const tap = best < 0.14;
      const centered = best > 0.28;
      if (prev === "ready" && centered) return "down";
      if (prev === "down" && tap) return "bottom";
      if ((prev === "down" || prev === "bottom") && centered) return "up";
      return null;
    },
    evaluateForm(_lm, _a, _p, _ctx) {
      return { quality: 88, cues: [] };
    }
  },
  // 12. V-UP — pike, hip ~45 at top
  vup: {
    id: "vup",
    aliases: [],
    label: { it: "V-up", en: "V-up", de: "V-Up" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_ankle, LM.right_ankle, LM.left_wrist, LM.right_wrist],
    movementPattern: "pike_compression",
    safetyRules: ["control"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: "pike" },
    thresholds: { downThreshold: 60, upThreshold: 155, hysteresis: 10, minDownMs: 260, minUpMs: 180 },
    evaluateForm(lm, _a, _p, ctx) {
      const cues = [];
      let q2 = 88;
      const lk = angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle);
      if (lk < 150) {
        q2 -= 10;
        cues.push("control");
      }
      if (Math.abs(ctx.velocity) > 550) {
        q2 -= 8;
        cues.push("control");
      }
      return { quality: clamp(q2, 0, 100), cues };
    }
  },
  // 13. BURPEE — full body down→up via squat/plank/jump phases; we count completion as return to standing + jump
  burpee: {
    id: "burpee",
    aliases: ["burpeetattico"],
    label: { it: "Burpee", en: "Burpee", de: "Burpee" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_ankle, LM.right_ankle, LM.left_shoulder, LM.right_shoulder, LM.left_elbow, LM.right_elbow],
    movementPattern: "multi_phase_stand_squat_plank_jump",
    safetyRules: ["backStraight", "control"],
    primaryAngle: { a: LM.left_hip, b: LM.left_knee, c: LM.left_ankle, name: "knee" },
    thresholds: { downThreshold: 85, upThreshold: 155, hysteresis: 9, minDownMs: 340, minUpMs: 240 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const knee = kneeAngle(lm);
      const elbow = elbowAngle(lm);
      const standing = knee > 150;
      const squatDown = knee < 95;
      const inPlank = elbow > 150 && knee > 140;
      if (prev === "ready" && squatDown) return "down";
      if (prev === "down" && (inPlank || knee < 80)) return "bottom";
      if ((prev === "down" || prev === "bottom") && standing) return "up";
      return null;
    },
    evaluateForm(lm, _a, _p, ctx) {
      let q2 = 86;
      const cues = [];
      if (Math.abs(ctx.velocity) > 650) {
        q2 -= 6;
        cues.push("control");
      }
      if (trunkLean(lm) < 145) {
        cues.push("backStraight");
      }
      return { quality: clamp(q2, 0, 100), cues };
    }
  },
  // 14. AFFONDO — lunge, knee 160->80, usare lato migliore, scendi ancora / distendi
  affondo: {
    id: "affondo",
    aliases: ["lunge"],
    label: { it: "Affondo", en: "Lunge", de: "Ausfallschritt" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_ankle, LM.right_ankle, LM.left_shoulder, LM.right_shoulder],
    movementPattern: "lunge_down_up",
    safetyRules: ["backStraight"],
    primaryAngle: { a: LM.left_hip, b: LM.left_knee, c: LM.left_ankle, name: "knee" },
    thresholds: { downThreshold: 92, upThreshold: 150, hysteresis: 6, minDownMs: 220, minUpMs: 140, minRepsIntervalMs: 450 },
    evaluateForm(lm, angles, phase, ctx) {
      const cues = [];
      let q2 = 90;
      const knee = angles["primary"] ?? kneeAngleBest(lm);
      if ((phase === "down" || phase === "ready") && knee > 108 && knee < 138 && ctx.direction === "down") cues.push("scendiAncora");
      else if ((phase === "up" || phase === "bottom") && knee > 130 && knee < 149 && ctx.direction === "up") cues.push("distendiGambe");
      if (trunkLean(lm) < 150) {
        q2 -= 14;
        cues.unshift("backStraight");
      }
      if (Math.abs(ctx.velocity) > 450) {
        q2 -= 8;
        cues.push("control");
      }
      return { quality: clamp(q2, 0, 100), cues };
    }
  },
  // 15. SKATER — hop laterale, usare ankle distance + knee, ritmo costante
  skater: {
    id: "skater",
    label: { it: "Skater", en: "Skater", de: "Skater" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_ankle, LM.right_ankle],
    movementPattern: "lateral_hop",
    safetyRules: ["control"],
    primaryAngle: { a: LM.left_hip, b: LM.left_knee, c: LM.left_ankle, name: "knee" },
    thresholds: { downThreshold: 95, upThreshold: 155, hysteresis: 8, minDownMs: 180, minUpMs: 140, minRepsIntervalMs: 380 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const spread = ankleDistance(lm);
      const knee = kneeAngleBest(lm);
      const bent = knee < 125;
      const wide = spread > 0.28;
      if (prev === "ready" && bent && wide) return "down";
      if (prev === "down" && spread < 0.14) return "up";
      if (prev === "bottom" && spread < 0.14) return "up";
      if (prev === "down" && knee < 105) return "bottom";
      return null;
    },
    evaluateForm(_lm, _a, _p, ctx) {
      let q2 = 88;
      if (Math.abs(ctx.velocity) > 600) {
        q2 -= 7;
      }
      return { quality: clamp(q2, 0, 100), cues: [] };
    }
  },
  // 16. GINOCCHIA ALTE — high knees, hipFlex alternato, ginocchio al petto — permissivo 75/125
  ginocchiaalte: {
    id: "ginocchiaalte",
    aliases: ["highknees"],
    label: { it: "Ginocchia alte", en: "High knees", de: "Knie hoch" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee],
    movementPattern: "alternating_high_knee",
    safetyRules: ["kneesToChest"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: "hipFlex" },
    thresholds: { downThreshold: 78, upThreshold: 125, hysteresis: 8, minDownMs: 130, minUpMs: 110, minRepsIntervalMs: 280 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const l2 = angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
      const r = angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
      const driving = Math.min(l2, r);
      if (prev === "ready" && driving < 78) return "down";
      if (prev === "down" && driving > 115) return "up";
      if (prev === "bottom" && driving > 115) return "up";
      if (prev === "down" && driving < 62) return "bottom";
      return null;
    },
    evaluateForm(lm, _a, _p, ctx) {
      let q2 = 87;
      if (trunkLean(lm) < 152) {
        q2 -= 10;
      }
      if (Math.abs(ctx.velocity) > 650) {
        q2 -= 7;
      }
      return { quality: clamp(q2, 0, 100), cues: q2 < 72 ? ["kneesToChest"] : [] };
    }
  },
  // 17. SUPERMAN — sdraiato prono, braccia+gambe su, angolo shoulder-hip-knee esteso
  superman: {
    id: "superman",
    label: { it: "Superman", en: "Superman", de: "Superman" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee],
    movementPattern: "prone_extension",
    safetyRules: ["control"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: "hipFlex" },
    thresholds: { downThreshold: 155, upThreshold: 170, hysteresis: 5, minDownMs: 300, minUpMs: 220, minRepsIntervalMs: 500 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const hip = hipAngleBest(lm);
      const up = hip < 162;
      const down = hip > 170;
      if (prev === "ready" && down) return "down";
      if (prev === "down" && up) return "bottom";
      if ((prev === "down" || prev === "bottom") && down) return "up";
      return null;
    },
    evaluateForm(_lm, _a, _p, _ctx) {
      return { quality: 88, cues: [] };
    },
    isHold: false
  },
  // 18. PONTE — bridge glutei, hip 95->170, bacino alto
  ponte: {
    id: "ponte",
    aliases: ["bridge"],
    label: { it: "Ponte glutei", en: "Glute bridge", de: "Glute Bridge" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_ankle, LM.right_ankle],
    movementPattern: "hip_extension",
    safetyRules: ["coreTight"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: "hipFlex" },
    thresholds: { downThreshold: 100, upThreshold: 160, hysteresis: 8, minDownMs: 250, minUpMs: 180, minRepsIntervalMs: 500 },
    evaluateForm(lm, angles, phase, ctx) {
      const cues = [];
      let q2 = 90;
      const hip = angles["primary"] ?? hipAngleBest(lm);
      if ((phase === "down" || phase === "ready") && hip < 135 && hip > 105 && ctx.direction === "up") cues.push("hipsUp");
      if (trunkLean(lm) < 150) {
        q2 -= 12;
        cues.push("coreTight");
      }
      return { quality: clamp(q2, 0, 100), cues };
    }
  },
  // 19. RUSSIAN TWIST — rotazione busto, shoulder-hip alternato, distanza mano-ginocchio
  russiantwist: {
    id: "russiantwist",
    label: { it: "Russian twist", en: "Russian twist", de: "Russian Twist" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_hip, LM.right_hip, LM.left_wrist, LM.right_wrist, LM.left_knee, LM.right_knee],
    movementPattern: "torso_rotation",
    safetyRules: ["control"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.right_knee, name: "twist" },
    thresholds: { downThreshold: 30, upThreshold: 70, hysteresis: 10, minDownMs: 180, minUpMs: 140, minRepsIntervalMs: 350 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const lw = lm[LM.left_wrist], rw = lm[LM.right_wrist];
      if (!lw || !rw) return null;
      const midHip = { x: (lm[LM.left_hip].x + lm[LM.right_hip].x) / 2, y: (lm[LM.left_hip].y + lm[LM.right_hip].y) / 2 };
      const left = Math.abs(lw.x - midHip.x), right = Math.abs(rw.x - midHip.x);
      const maxLateral = Math.max(left, right);
      const centered = maxLateral < 0.2;
      const twisted = maxLateral > 0.3;
      if (prev === "ready" && centered) return "down";
      if (prev === "down" && twisted) return "bottom";
      if ((prev === "down" || prev === "bottom") && centered) return "up";
      return null;
    },
    evaluateForm(_lm, _a, _p, _ctx) {
      return { quality: 86, cues: [] };
    }
  },
  // 20. WALLSIT — hold, knee 90°, schiena al muro
  wallsit: {
    id: "wallsit",
    label: { it: "Wall sit", en: "Wall sit", de: "Wandsitz" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_ankle, LM.right_ankle, LM.left_shoulder, LM.right_shoulder],
    movementPattern: "hold_knee_90",
    safetyRules: ["backStraight"],
    primaryAngle: { a: LM.left_hip, b: LM.left_knee, c: LM.left_ankle, name: "knee" },
    thresholds: { downThreshold: 80, upThreshold: 110, hysteresis: 6, minDownMs: 400, minUpMs: 300 },
    isHold: true,
    evaluateForm(lm) {
      const k2 = kneeAngleBest(lm);
      let q2 = 95;
      const cues = [];
      if (k2 < 75 || k2 > 115) {
        q2 -= 22;
        cues.push("control");
      } else if (k2 < 82 || k2 > 105) {
        q2 -= 10;
        cues.push("control");
      }
      if (trunkLean(lm) < 155) {
        q2 -= 10;
        cues.push("backStraight");
      }
      return { quality: clamp(q2, 0, 100), cues };
    }
  },
  // 21. SIDEPLANK — hold laterale
  sideplank: {
    id: "sideplank",
    label: { it: "Plank laterale", en: "Side plank", de: "Seitstütz" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_hip, LM.right_hip, LM.left_ankle, LM.right_ankle],
    movementPattern: "hold_lateral",
    safetyRules: ["hipsUp", "coreTight"],
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_ankle, name: "fullLine" },
    thresholds: { downThreshold: 155, upThreshold: 168, hysteresis: 5, minDownMs: 350, minUpMs: 300 },
    isHold: true,
    evaluateForm(lm) {
      const line = trunkLean(lm);
      let q2 = 94;
      const cues = [];
      if (line < 150) {
        q2 = 52;
        cues.push("hipsUp");
      } else if (line < 162) {
        q2 -= 12;
        cues.push("coreTight");
      }
      return { quality: clamp(q2, 0, 100), cues };
    }
  },
  // 22. PLANKJACK — plank + gambe che si aprono, ankle distance
  plankjack: {
    id: "plankjack",
    label: { it: "Plank jack", en: "Plank jack", de: "Plank Jack" },
    trackingSupported: true,
    requiredLandmarks: [LM.left_shoulder, LM.right_shoulder, LM.left_hip, LM.right_hip, LM.left_knee, LM.right_knee, LM.left_ankle, LM.right_ankle],
    movementPattern: "hold_plank_legs_open_close",
    safetyRules: ["coreTight"],
    primaryAngle: { a: LM.left_hip, b: LM.left_knee, c: LM.left_ankle, name: "knee" },
    thresholds: { downThreshold: 40, upThreshold: 120, hysteresis: 10, minDownMs: 150, minUpMs: 120, minRepsIntervalMs: 300 },
    customTransition(_a, _vel, prev, ctx) {
      const spread = ankleDistance(ctx.landmarks);
      const closed = spread < 0.12;
      const open = spread > 0.3;
      if (prev === "ready" && closed) return "down";
      if (prev === "down" && open) return "bottom";
      if ((prev === "down" || prev === "bottom") && closed) return "up";
      return null;
    },
    evaluateForm(lm, _a, _p, ctx) {
      let q2 = 88;
      if (trunkLean(lm) < 153) {
        q2 -= 14;
      }
      if (Math.abs(ctx.velocity) > 700) {
        q2 -= 7;
      }
      return { quality: clamp(q2, 0, 100), cues: [] };
    }
  }
};
function normalizeExerciseId(id) {
  if (id === "flessioni") return "pushup";
  if (id === "crunchbici") return "bicyclecrunch";
  if (id === "burpeetattico") return "burpee";
  if (id === "highknees") return "ginocchiaalte";
  if (id === "bridge") return "ponte";
  if (id === "lunge") return "affondo";
  return id;
}
function getDefinition(id) {
  const nid = normalizeExerciseId(id);
  return EXERCISE_DEFINITIONS[nid] ?? null;
}
function localizedCue(cueKey, lang) {
  const c = CUE[cueKey];
  return c ? tr(c, lang) : cueKey;
}
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link2 = links[i];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
class OneEuroFilter {
  constructor(minCutoff = 1, beta = 7e-3, dCutoff = 1) {
    this.minCutoff = minCutoff;
    this.beta = beta;
    this.dCutoff = dCutoff;
    this.xPrev = 0;
    this.dxPrev = 0;
    this.initialized = false;
    this.lastTimestamp = 0;
  }
  alpha(cutoff, dt) {
    const tau = 1 / (2 * Math.PI * cutoff);
    return 1 / (1 + tau / dt);
  }
  lowPass(prev, curr, alpha) {
    return alpha * curr + (1 - alpha) * prev;
  }
  /** Filter one scalar value. timestampMs from performance.now() or video timestamp. */
  filter(value, timestampMs) {
    let dt = 0.016;
    if (this.initialized) {
      dt = Math.max(1e-3, (timestampMs - this.lastTimestamp) / 1e3);
    }
    this.lastTimestamp = timestampMs;
    if (!this.initialized) {
      this.xPrev = value;
      this.dxPrev = 0;
      this.initialized = true;
      return value;
    }
    const dx = (value - this.xPrev) / dt;
    const edx = this.lowPass(this.dxPrev, dx, this.alpha(this.dCutoff, dt));
    this.dxPrev = edx;
    const cutoff = this.minCutoff + this.beta * Math.abs(edx);
    const a = this.alpha(cutoff, dt);
    const out = this.lowPass(this.xPrev, value, a);
    this.xPrev = out;
    return out;
  }
  reset() {
    this.initialized = false;
    this.xPrev = 0;
    this.dxPrev = 0;
    this.lastTimestamp = 0;
  }
  setParams(minCutoff, beta, dCutoff = this.dCutoff) {
    this.minCutoff = minCutoff;
    this.beta = beta;
    this.dCutoff = dCutoff;
  }
}
class LandmarkSmoother {
  constructor(count = 33, minCutoff = 1, beta = 7e-3, dCutoff = 1) {
    this.count = count;
    this.minCutoff = minCutoff;
    this.beta = beta;
    this.dCutoff = dCutoff;
    this.fx = [];
    this.fy = [];
    this.initialized = false;
    this.alloc();
  }
  alloc() {
    this.fx = Array.from({ length: this.count }, () => new OneEuroFilter(this.minCutoff, this.beta, this.dCutoff));
    this.fy = Array.from({ length: this.count }, () => new OneEuroFilter(this.minCutoff, this.beta, this.dCutoff));
  }
  smooth(input, timestampMs) {
    if (!input || input.length === 0) return input;
    if (!this.initialized) {
      this.alloc();
      this.initialized = true;
    }
    const out = new Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const p2 = input[i];
      if (!p2) {
        out[i] = p2;
        continue;
      }
      const idx = i < this.count ? i : 0;
      if (!this.fx[idx]) {
        this.fx[idx] = new OneEuroFilter(this.minCutoff, this.beta, this.dCutoff);
        this.fy[idx] = new OneEuroFilter(this.minCutoff, this.beta, this.dCutoff);
      }
      const sx = this.fx[idx].filter(p2.x, timestampMs);
      const sy = this.fy[idx].filter(p2.y, timestampMs);
      out[i] = { x: sx, y: sy, z: p2.z, visibility: p2.visibility };
    }
    return out;
  }
  reset() {
    for (const f2 of this.fx) f2.reset();
    for (const f2 of this.fy) f2.reset();
    this.initialized = false;
  }
  setTuning(minCutoff, beta) {
    this.minCutoff = minCutoff;
    this.beta = beta;
    for (const f2 of [...this.fx, ...this.fy]) f2.setParams(minCutoff, beta);
  }
}
const DEFAULT_WASM_BASE = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const LITE_MODEL = "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";
const HEAVY_MODEL = "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/1/pose_landmarker_heavy.task";
const FULL_MODEL = "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task";
const FALLBACK_WASM_BASES = [
  DEFAULT_WASM_BASE,
  "./wasm"
];
function modelUrlsForVariant(variant) {
  const localMap = {
    lite: "./models/pose_landmarker_lite.task",
    heavy: "./models/pose_landmarker_heavy.task",
    full: "./models/pose_landmarker_full.task"
  };
  const cdnMap = { lite: LITE_MODEL, heavy: HEAVY_MODEL, full: FULL_MODEL };
  if (variant === "auto") {
    return [localMap.heavy, HEAVY_MODEL, localMap.lite, LITE_MODEL];
  }
  const v = variant;
  const cdn = cdnMap[v] ?? LITE_MODEL;
  const local = localMap[v] ?? localMap.lite;
  return [cdn, local];
}
class PoseLandmarkerManager {
  constructor(opts = {}, enableSmoothing = true) {
    this.opts = opts;
    this.enableSmoothing = enableSmoothing;
    this.landmarker = null;
    this.fileset = null;
    this.smoother = null;
    this.ready = false;
    this.delegate = "GPU";
    this.modelVariant = "lite";
    this.delegate = opts.delegate ?? "GPU";
    if (enableSmoothing) this.smoother = new LandmarkSmoother(33, 1.15, 8e-3);
  }
  setSmoothingTuning(minCutoff, beta) {
    var _a;
    (_a = this.smoother) == null ? void 0 : _a.setTuning(minCutoff, beta);
  }
  isReady() {
    return this.ready && !!this.landmarker;
  }
  async init(onProgress) {
    if (this.ready) return;
    const vision = await __vitePreload(() => import("./vision-BnDXmRAR.js"), true ? [] : void 0, import.meta.url);
    const { PoseLandmarker, FilesetResolver } = vision;
    const requested = this.opts.modelVariant ?? "lite";
    if (requested === "auto") {
      try {
        const mem = navigator.deviceMemory ?? 4;
        const ua = navigator.userAgent ?? "";
        const isOldIOS = /iPhone OS 1[0-4]_/.test(ua);
        this.modelVariant = mem >= 4 && !isOldIOS ? "heavy" : "lite";
      } catch {
        this.modelVariant = "lite";
      }
    } else {
      this.modelVariant = requested;
    }
    let lastErr = null;
    for (const wasmBase of FALLBACK_WASM_BASES) {
      try {
        onProgress == null ? void 0 : onProgress(`wasm:${wasmBase}`);
        this.fileset = await FilesetResolver.forVisionTasks(wasmBase);
        break;
      } catch (e) {
        lastErr = e;
      }
    }
    if (!this.fileset) throw new Error(`Fileset failed: ${String(lastErr)}`);
    const candidateModels = modelUrlsForVariant(this.modelVariant);
    for (const delegate of [this.delegate, "CPU"]) {
      for (const modelPath of candidateModels) {
        try {
          onProgress == null ? void 0 : onProgress(`model:${delegate}:${modelPath}`);
          const t0 = performance.now();
          this.landmarker = await PoseLandmarker.createFromOptions(this.fileset, {
            baseOptions: { modelAssetPath: modelPath, delegate },
            runningMode: "VIDEO",
            numPoses: this.opts.numPoses ?? 1,
            minPoseDetectionConfidence: this.opts.minPoseDetectionConfidence ?? 0.45,
            minPosePresenceConfidence: this.opts.minPosePresenceConfidence ?? 0.45,
            minTrackingConfidence: this.opts.minTrackingConfidence ?? 0.5,
            outputSegmentationMasks: false
          });
          this.delegate = delegate;
          this.ready = true;
          const dt = performance.now() - t0;
          if (dt > 3800) onProgress == null ? void 0 : onProgress("heavy_slow");
          return;
        } catch (e) {
          lastErr = e;
        }
      }
    }
    throw new Error(`PoseLandmarker init failed: ${String(lastErr)}`);
  }
  /** Detect for video element at given timestamp (performance.now). Returns smoothed landmarks. */
  detect(video, timestampMs) {
    var _a, _b;
    if (!this.landmarker || !this.ready) {
      return { landmarks: null, timestampMs, visibilityScore: 0 };
    }
    try {
      const result = this.landmarker.detectForVideo(video, timestampMs);
      const raw = ((_a = result == null ? void 0 : result.landmarks) == null ? void 0 : _a[0]) ?? null;
      const world = ((_b = result == null ? void 0 : result.worldLandmarks) == null ? void 0 : _b[0]) ?? null;
      if (!raw) return { landmarks: null, worldLandmarks: world, timestampMs, visibilityScore: 0 };
      let lm = raw;
      if (this.enableSmoothing && this.smoother) {
        lm = this.smoother.smooth(raw, timestampMs);
      }
      const vis = visibilityScore(lm, [11, 12, 23, 24, 25, 26, 13, 14, 15, 16]);
      return { landmarks: lm, worldLandmarks: world, timestampMs, visibilityScore: vis };
    } catch {
      return { landmarks: null, timestampMs, visibilityScore: 0 };
    }
  }
  resetSmoother() {
    var _a;
    (_a = this.smoother) == null ? void 0 : _a.reset();
  }
  close() {
    var _a, _b;
    try {
      (_b = (_a = this.landmarker) == null ? void 0 : _a.close) == null ? void 0 : _b.call(_a);
    } catch {
    }
    this.landmarker = null;
    this.fileset = null;
    this.ready = false;
  }
}
function torsoLength(lm) {
  const s = midpoint(lm[LM.left_shoulder] ?? lm[LM.right_shoulder], lm[LM.right_shoulder] ?? lm[LM.left_shoulder]);
  const h = midpoint(lm[LM.left_hip] ?? lm[LM.right_hip], lm[LM.right_hip] ?? lm[LM.left_hip]);
  if (!s || !h) return 0.35;
  return Math.hypot(s.x - h.x, s.y - h.y) || 0.35;
}
class ExerciseAnalyzer {
  constructor() {
    this.phase = "READY";
    this.lastTransitionAt = 0;
    this.trough = 180;
    this.peak = 0;
    this.lastRepAt = 0;
    this.bilateralVisEma = {};
    this.bilateralSide = {};
    this.minRepIntervalMs = 320;
    this.minPhaseMs = 120;
  }
  reset() {
    this.phase = "READY";
    this.lastTransitionAt = 0;
    this.trough = 180;
    this.peak = 0;
    this.lastRepAt = 0;
    this.bilateralVisEma = {};
    this.bilateralSide = {};
  }
  /**
   * Angle at a bilateral joint (e.g. both knees, shoulder-hip-ankle line) picking the
   * more visible side instead of always averaging left+right. A plain average lets an
   * occluded/estimated side (very common in side-view filming) drag the angle toward a
   * value neither leg actually has. EMA-smooths visibility and requires a clear margin
   * to switch sides, so the choice doesn't flicker frame-to-frame near the threshold.
   */
  bilateralJointAngle(key, lm, left, right, opts) {
    var _a, _b, _c, _d, _e, _f;
    const visThreshold = (opts == null ? void 0 : opts.visThreshold) ?? 0.4;
    const switchMargin = (opts == null ? void 0 : opts.switchMargin) ?? 0.12;
    const alpha = (opts == null ? void 0 : opts.emaAlpha) ?? 0.35;
    const al = angleFromLandmarks(lm, left[0], left[1], left[2]);
    const ar = angleFromLandmarks(lm, right[0], right[1], right[2]);
    const rawVl = Math.min(((_a = lm[left[0]]) == null ? void 0 : _a.visibility) ?? 0, ((_b = lm[left[1]]) == null ? void 0 : _b.visibility) ?? 0, ((_c = lm[left[2]]) == null ? void 0 : _c.visibility) ?? 0);
    const rawVr = Math.min(((_d = lm[right[0]]) == null ? void 0 : _d.visibility) ?? 0, ((_e = lm[right[1]]) == null ? void 0 : _e.visibility) ?? 0, ((_f = lm[right[2]]) == null ? void 0 : _f.visibility) ?? 0);
    const prevEma = this.bilateralVisEma[key] ?? { l: rawVl, r: rawVr };
    const vl = prevEma.l * (1 - alpha) + rawVl * alpha;
    const vr = prevEma.r * (1 - alpha) + rawVr * alpha;
    this.bilateralVisEma[key] = { l: vl, r: vr };
    const lOk = vl >= visThreshold, rOk = vr >= visThreshold;
    const prevSide = this.bilateralSide[key] ?? "avg";
    let side;
    if (lOk && rOk) side = Math.abs(vl - vr) < switchMargin ? "avg" : vl > vr ? "left" : "right";
    else if (lOk) side = "left";
    else if (rOk) side = "right";
    else side = prevSide;
    if (prevSide !== "avg" && side !== prevSide && side !== "avg") {
      const winMargin = side === "left" ? vl - vr : vr - vl;
      if (winMargin < switchMargin) side = prevSide;
    }
    this.bilateralSide[key] = side;
    return side === "left" ? al : side === "right" ? ar : (al + ar) / 2;
  }
  // minimum time in phase before transition (anti-jitter)
  shouldCountRep(now, repConf, thresh = 80) {
    if (repConf < thresh) return false;
    if (this.lastRepAt && now - this.lastRepAt < this.minRepIntervalMs) return false;
    return true;
  }
  phaseElapsed(now) {
    return now - this.lastTransitionAt;
  }
  canTransition(now, minMs) {
    return this.phaseElapsed(now) >= (minMs ?? this.minPhaseMs);
  }
}
class PushupAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "pushup";
    this.requiredLandmarks = [11, 12, 13, 14, 15, 16, 23, 24];
    this.minRepIntervalMs = 320;
    this.minPhaseMs = 65;
    this.velFilt = 0;
    this.lastAngle = 180;
    this.lastT = 0;
  }
  analyze(lm, ts, dtMs, q2) {
    const ang = this.bilateralJointAngle("elbow", lm, [LM.left_shoulder, LM.left_elbow, LM.left_wrist], [LM.right_shoulder, LM.right_elbow, LM.right_wrist]);
    const dt = dtMs || 16;
    const rawV = (ang - this.lastAngle) / (dt / 1e3);
    this.velFilt = this.velFilt * 0.7 + rawV * 0.3;
    const dir = Math.abs(this.velFilt) < 18 ? "hold" : this.velFilt < 0 ? "down" : "up";
    const line = this.bilateralJointAngle("bodyLine", lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
    this.trough = Math.min(this.trough, ang);
    this.peak = Math.max(this.peak, ang);
    let next = this.phase;
    if (this.phase === "READY" && ang < 120) next = "DESCENDING";
    else if (this.phase === "DESCENDING" && ang < 110) next = "BOTTOM";
    else if (this.phase === "BOTTOM" && ang > 125) next = "ASCENDING";
    else if (this.phase === "ASCENDING" && ang > 142) next = "TOP";
    let repInc = false, repConf = 0;
    if (next === "TOP" && (this.phase === "ASCENDING" || this.phase === "BOTTOM")) {
      const rom = this.peak - this.trough;
      const depthOk = this.trough < 110;
      const extOk = ang > 142;
      const velScore = clamp(100 - Math.abs(this.velFilt) * 0.06, 0, 100);
      const alignScore = line > 155 ? 95 : line > 145 ? 78 : 42;
      const romScore = rom > 28 ? 28 : rom > 18 ? 18 : 10;
      const depthBonus = this.trough < 92 ? 8 : this.trough < 102 ? 4 : 0;
      if (depthOk && extOk) {
        repConf = clamp(velScore * 0.32 + alignScore * 0.35 + romScore + depthBonus, 0, 100);
      } else {
        repConf = clamp(velScore * 0.18 + 8, 0, 100);
      }
      if (depthOk && extOk && repConf > 62 && q2.exerciseConfidence > 38) {
        if (this.shouldCountRep(ts, repConf, 62)) {
          repInc = true;
          this.lastRepAt = ts;
        }
      }
      this.trough = ang;
      this.peak = ang;
      next = "READY";
    }
    if (repInc) {
      this.phase = "READY";
      this.lastTransitionAt = ts;
    } else if (next !== this.phase) {
      this.phase = next;
      this.lastTransitionAt = ts;
    }
    let form = 90, cues = [];
    if (line < 148) {
      form -= 18;
      cues.push("coreTight");
    } else if (line < 158) {
      form -= 7;
      cues.push("coreTight");
    }
    if (this.phase === "DESCENDING" && ang > 108 && ang < 135 && dir === "down") cues.push("scendiAncora");
    if (this.phase === "ASCENDING" && ang > 125 && ang < 144 && dir === "up") cues.push("distendiBraccia");
    if (Math.abs(this.velFilt) > 560) {
      form -= 7;
      cues.push("control");
    }
    this.lastAngle = ang;
    this.lastT = ts;
    const enginePhase = this.phase === "BOTTOM" ? "bottom" : this.phase === "DESCENDING" ? "down" : this.phase === "ASCENDING" ? "up" : this.phase === "TOP" ? "up" : "ready";
    return { phase: this.phase, enginePhase, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: ang, secondaryAngles: { line }, velocity: this.velFilt, direction: dir };
  }
}
class SquatAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "squat";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26];
    this.minRepIntervalMs = 340;
    this.minPhaseMs = 70;
    this.velFilt = 0;
    this.lastA = 180;
    this.restingHipY = null;
  }
  analyze(lm, ts, dtMs, q2) {
    var _a, _b;
    const ang = this.bilateralJointAngle("knee", lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]);
    const tr2 = this.bilateralJointAngle("trunk", lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
    const hipY = ((((_a = lm[LM.left_hip]) == null ? void 0 : _a.y) ?? 0.5) + (((_b = lm[LM.right_hip]) == null ? void 0 : _b.y) ?? 0.5)) / 2;
    if (ang > 160 && Math.abs(this.velFilt) < 15) {
      this.restingHipY = this.restingHipY == null ? hipY : this.restingHipY * 0.92 + hipY * 0.08;
    }
    const baseline = this.restingHipY ?? 0.55;
    const hipYDelta = hipY - baseline;
    const dt = dtMs || 16;
    const rawV = (ang - this.lastA) / (dt / 1e3);
    this.velFilt = this.velFilt * 0.7 + rawV * 0.3;
    const dir = Math.abs(this.velFilt) < 18 ? "hold" : this.velFilt < 0 ? "down" : "up";
    this.trough = Math.min(this.trough, ang);
    this.peak = Math.max(this.peak, ang);
    let next = this.phase;
    if (this.phase === "READY" && (ang <= 122 || hipYDelta > 0.05)) next = "DESCENDING";
    else if (this.phase === "DESCENDING" && (ang <= 113 || hipYDelta > 0.09)) next = "BOTTOM";
    else if (this.phase === "DESCENDING" && ang > 142 && hipYDelta < 0.05 && this.trough < 122 && this.canTransition(ts, 55)) next = "ASCENDING";
    else if (this.phase === "BOTTOM" && (ang > 140 || hipYDelta < 0.09) && this.canTransition(ts, 70)) next = "ASCENDING";
    else if (this.phase === "ASCENDING" && ang > 146 && this.canTransition(ts, 55)) next = "STANDING";
    let repInc = false, repConf = 0;
    if (next === "STANDING" && (this.phase === "ASCENDING" || this.phase === "BOTTOM" || this.phase === "DESCENDING")) {
      const rom = this.peak - this.trough;
      const depthOk = this.trough < 122;
      const extOk = ang > 142;
      const velScore = clamp(100 - Math.abs(this.velFilt) * 0.06, 0, 100);
      const trunkScore = tr2 > 155 ? 40 : tr2 > 142 ? 30 : 18;
      const romScore = rom > 28 ? 32 : rom > 20 ? 22 : rom > 14 ? 14 : 8;
      const depthBonus = this.trough < 95 ? 10 : this.trough < 108 ? 6 : 0;
      if (depthOk && extOk) {
        repConf = clamp(velScore * 0.32 + romScore + trunkScore + depthBonus, 0, 100);
      } else {
        repConf = clamp(velScore * 0.18 + 8, 0, 100);
      }
      if (depthOk && extOk && repConf > 62 && q2.exerciseConfidence > 38) {
        if (this.shouldCountRep(ts, repConf, 62)) {
          repInc = true;
          this.lastRepAt = ts;
        }
      }
      this.trough = ang;
      this.peak = ang;
      next = "READY";
    }
    if (repInc) {
      this.phase = "READY";
      this.lastTransitionAt = ts;
    } else if (next !== this.phase) {
      this.phase = next;
      this.lastTransitionAt = ts;
    }
    let form = 92, cues = [];
    if (tr2 < 142) {
      form -= 14;
      cues.push("backStraight");
    } else if (tr2 < 155) {
      form -= 6;
      cues.push("backStraight");
    }
    if (this.phase === "DESCENDING" && ang > 108 && ang < 135 && dir === "down") cues.push("scendiAncora");
    if (this.phase === "ASCENDING" && ang > 125 && ang < 146 && dir === "up") cues.push("distendiGambe");
    if (Math.abs(this.velFilt) > 480) {
      form -= 8;
      cues.push("control");
    }
    this.lastA = ang;
    const eng = this.phase === "BOTTOM" ? "bottom" : this.phase === "DESCENDING" ? "down" : this.phase === "ASCENDING" ? "up" : this.phase === "STANDING" ? "up" : "ready";
    return { phase: this.phase, enginePhase: eng, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: ang, secondaryAngles: { trunk: tr2, hipY }, velocity: this.velFilt, direction: dir };
  }
}
class CrunchAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "crunch";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26, 7, 8];
    this.velFilt = 0;
    this.lastA = 120;
  }
  analyze(lm, ts, dtMs, q2) {
    const hipFlex = this.bilateralJointAngle("hipFlex", lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
    const dt = dtMs || 16;
    const rawV = (hipFlex - this.lastA) / (dt / 1e3);
    this.velFilt = this.velFilt * 0.75 + rawV * 0.25;
    const dir = Math.abs(this.velFilt) < 18 ? "hold" : this.velFilt < 0 ? "down" : "up";
    this.trough = Math.min(this.trough, hipFlex);
    this.peak = Math.max(this.peak, hipFlex);
    let next = this.phase;
    if (this.phase === "READY" && hipFlex <= 112) next = "FLEXING";
    else if (this.phase === "FLEXING" && hipFlex <= 102) next = "CONTRACTED";
    else if (this.phase === "CONTRACTED" && hipFlex >= 108) next = "RETURNING";
    else if (this.phase === "RETURNING" && hipFlex >= 118) next = "EXTENDED";
    let repInc = false, repConf = 0;
    if (next === "EXTENDED" && (this.phase === "RETURNING" || this.phase === "CONTRACTED")) {
      const rom = this.peak - this.trough;
      const contractOk = this.trough <= 102;
      const extOk = hipFlex >= 118;
      const neck = angleFromLandmarks(lm, LM.left_hip, LM.left_shoulder, LM.left_ear);
      const neckOk = neck > 58 && neck < 122;
      if (contractOk && extOk) {
        repConf = clamp(60 + (neckOk ? 16 : 6) + (rom > 22 ? 12 : rom > 14 ? 6 : 3) + (Math.abs(this.velFilt) < 420 ? 6 : 0), 0, 100);
      } else {
        repConf = clamp(18, 0, 100);
      }
      if (contractOk && extOk && repConf > 62 && q2.exerciseConfidence > 38) {
        if (this.shouldCountRep(ts, repConf, 62)) {
          repInc = true;
          this.lastRepAt = ts;
        }
      }
      this.trough = hipFlex;
      this.peak = hipFlex;
      next = "READY";
    }
    if (repInc) {
      this.phase = "READY";
      this.lastTransitionAt = ts;
    } else if (next !== this.phase) {
      this.phase = next;
      this.lastTransitionAt = ts;
    }
    let form = 88, cues = [];
    const neckA = angleFromLandmarks(lm, LM.left_hip, LM.left_shoulder, LM.left_ear);
    if (neckA < 60 || neckA > 120) {
      form -= 10;
      cues.push("backStraight");
    }
    if (this.phase === "FLEXING" && hipFlex > 100 && hipFlex < 115 && dir === "down") cues.push("scendiAncora");
    if (this.phase === "RETURNING" && hipFlex > 108 && hipFlex < 118 && dir === "up") cues.push("distendiSchiena");
    if (Math.abs(this.velFilt) > 380) {
      form -= 8;
      cues.push("control");
    }
    this.lastA = hipFlex;
    const eng = this.phase === "CONTRACTED" ? "bottom" : this.phase === "FLEXING" ? "down" : this.phase === "RETURNING" ? "up" : "ready";
    return { phase: this.phase, enginePhase: eng, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: hipFlex, secondaryAngles: { neck: neckA }, velocity: this.velFilt, direction: dir };
  }
}
class PlankAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "plank";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26, 27, 28];
    this.goodSince = null;
    this.graceMs = 600;
  }
  analyze(lm, ts, _dt, q2) {
    const line = this.bilateralJointAngle("trunk", lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
    const hip = this.bilateralJointAngle("hip", lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
    const valid = line > 152 && hip > 148 && q2.exerciseConfidence > 38;
    if (valid) {
      if (this.goodSince == null) this.goodSince = ts;
      this.phase = "HOLD_GOOD";
    } else {
      if (this.goodSince != null && ts - this.goodSince < this.graceMs) {
        this.phase = "HOLD_GOOD";
      } else {
        this.phase = "HOLD_BAD";
        this.goodSince = null;
      }
    }
    const form = line < 152 ? 55 : line < 162 ? 82 : 95 - (hip < 148 ? 10 : 0);
    const cues = line < 152 ? ["hipsUp"] : line < 162 ? ["coreTight"] : [];
    return { phase: this.phase, enginePhase: "ready", repIncrement: false, repConfidence: 0, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: line, secondaryAngles: { hip, line }, velocity: 0, direction: "hold" };
  }
}
class LegRaiseAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "legraise";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26];
    this.velFilt = 0;
    this.lastA = 170;
  }
  analyze(lm, ts, dtMs, q2) {
    const hipFlex = this.bilateralJointAngle("hipFlex", lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
    const lk = this.bilateralJointAngle("kneeExt", lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]);
    const dt = dtMs || 16;
    const rawV = (hipFlex - this.lastA) / (dt / 1e3);
    this.velFilt = this.velFilt * 0.75 + rawV * 0.25;
    const dir = Math.abs(this.velFilt) < 18 ? "hold" : this.velFilt < 0 ? "down" : "up";
    this.trough = Math.min(this.trough, hipFlex);
    this.peak = Math.max(this.peak, hipFlex);
    let next = this.phase;
    if (this.phase === "READY" && hipFlex < 145) next = "RAISING";
    else if (this.phase === "RAISING" && hipFlex < 105) next = "TOP";
    else if (this.phase === "TOP" && hipFlex > 118) next = "LOWERING";
    else if (this.phase === "LOWERING" && hipFlex > 148) next = "DOWN";
    let repInc = false, repConf = 0;
    if (next === "DOWN" && (this.phase === "LOWERING" || this.phase === "TOP")) {
      const rom = this.peak - this.trough;
      const topOk = this.trough < 108;
      const downOk = hipFlex > 148;
      const kneeScore = lk > 155 ? 18 : lk > 145 ? 10 : 2;
      if (topOk && downOk) {
        repConf = clamp(52 + kneeScore + (rom > 45 ? 14 : rom > 30 ? 8 : 4) + (Math.abs(this.velFilt) < 350 ? 8 : 0), 0, 100);
      } else {
        repConf = clamp(14, 0, 100);
      }
      if (topOk && downOk && repConf > 60 && q2.exerciseConfidence > 38) {
        if (this.shouldCountRep(ts, repConf, 60)) {
          repInc = true;
          this.lastRepAt = ts;
        }
      }
      this.trough = hipFlex;
      this.peak = hipFlex;
      next = "READY";
    }
    if (repInc) {
      this.phase = "READY";
      this.lastTransitionAt = ts;
    } else if (next !== this.phase) {
      this.phase = next;
      this.lastTransitionAt = ts;
    }
    let form = 90, cues = [];
    if (lk < 145) {
      form -= 14;
      cues.push("control");
    } else if (lk < 155) {
      form -= 5;
      cues.push("control");
    }
    if (this.phase === "RAISING" && hipFlex > 105 && hipFlex < 135 && dir === "down") cues.push("sollevaPiu");
    if (this.phase === "LOWERING" && hipFlex > 120 && hipFlex < 150 && dir === "up") cues.push("abbassaControllo");
    this.lastA = hipFlex;
    const eng = this.phase === "TOP" ? "bottom" : this.phase === "RAISING" ? "down" : this.phase === "LOWERING" ? "up" : "ready";
    return { phase: this.phase, enginePhase: eng, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: hipFlex, secondaryAngles: { kneeExt: lk }, velocity: this.velFilt, direction: dir };
  }
}
class FlutterKickAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "flutterkick";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26];
    this.cycle = "center";
    this.lastSwitch = 0;
  }
  analyze(lm, ts, _dt, q2) {
    const lHip = angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
    const rHip = angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
    const asym = Math.abs(lHip - rHip);
    const mean = (lHip + rHip) / 2;
    let repInc = false, repConf = 0;
    if (this.phase === "READY" && asym > 12 && mean < 170) {
      this.phase = "LEFT_UP";
      this.lastTransitionAt = ts;
    } else if (this.phase === "LEFT_UP" && asym > 12 && mean < 170 && (lHip < rHip && this.cycle !== "leftUp" || rHip < lHip && this.cycle !== "rightUp")) {
      const nowCycle = lHip < rHip ? "leftUp" : "rightUp";
      if (nowCycle !== this.cycle && ts - this.lastSwitch > 250) {
        this.cycle = nowCycle;
        this.lastSwitch = ts;
        this._alt = (this._alt || 0) + 1;
        if (this._alt % 2 === 0) {
          repConf = clamp(70 + (asym > 16 ? 10 : 0) + (q2.exerciseConfidence > 60 ? 10 : 0), 0, 100);
          if (repConf > 60 && q2.exerciseConfidence > 38 && this.shouldCountRep(ts, repConf, 60)) {
            repInc = true;
            this.lastRepAt = ts;
          }
        }
      }
    } else if (asym < 8) {
      this.phase = "READY";
    }
    let form = 88;
    const cues = [];
    if ((lHip + rHip) / 2 > 185) {
      form -= 10;
      cues.push("coreTight");
    }
    return { phase: this.phase, enginePhase: this.phase === "LEFT_UP" ? "down" : "ready", repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: mean, secondaryAngles: { lHip, rHip, asym }, velocity: 0, direction: "hold" };
  }
}
class DeadBugAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "deadbug";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26, 13, 14, 15, 16];
  }
  analyze(lm, ts, _dt, q2) {
    const lHip = angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
    const rHip = angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
    const lSh = angleFromLandmarks(lm, LM.left_hip, LM.left_shoulder, LM.left_elbow);
    const rSh = angleFromLandmarks(lm, LM.right_hip, LM.right_shoulder, LM.right_elbow);
    const extL = lHip > 150 && lSh > 130;
    const extR = rHip > 150 && rSh > 130;
    const oneExt = extL !== extR;
    let repInc = false, repConf = 0;
    if (this.phase === "READY" && !oneExt) this.phase = "TUCKED";
    else if (this.phase === "TUCKED" && oneExt) {
      this.phase = "EXTENDED";
      this.lastTransitionAt = ts;
    } else if (this.phase === "EXTENDED" && !oneExt) {
      repConf = clamp(65 + (q2.exerciseConfidence > 60 ? 15 : 0) + (Math.abs(lHip - rHip) > 30 ? 10 : 0), 0, 100);
      if (repConf > 60 && q2.exerciseConfidence > 38 && this.shouldCountRep(ts, repConf, 60)) {
        repInc = true;
        this.lastRepAt = ts;
        this.phase = "READY";
      } else this.phase = "READY";
    }
    let form = 90;
    const cues = [];
    const trunk = this.bilateralJointAngle("trunk", lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
    if (trunk < 160) {
      form -= 10;
      cues.push("coreTight");
    }
    return { phase: this.phase, enginePhase: this.phase === "EXTENDED" ? "bottom" : this.phase === "TUCKED" ? "down" : "ready", repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: (lHip + rHip) / 2, secondaryAngles: { lHip, rHip, lSh, rSh }, velocity: 0, direction: "hold" };
  }
}
class VUpAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "vup";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26, 15, 16];
    this.velFilt = 0;
    this.lastA = 160;
  }
  analyze(lm, ts, dtMs, q2) {
    const pike = this.bilateralJointAngle("pike", lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
    const dt = dtMs || 16;
    const rawV = (pike - this.lastA) / (dt / 1e3);
    this.velFilt = this.velFilt * 0.75 + rawV * 0.25;
    const dir = Math.abs(this.velFilt) < 18 ? "hold" : this.velFilt < 0 ? "down" : "up";
    this.trough = Math.min(this.trough, pike);
    this.peak = Math.max(this.peak, pike);
    const lk = this.bilateralJointAngle("kneeExt", lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]);
    let next = this.phase;
    if (this.phase === "READY" && pike <= 135) next = "FOLDING";
    else if (this.phase === "FOLDING" && pike <= 80) next = "V_POSITION";
    else if (this.phase === "V_POSITION" && pike >= 95) next = "EXTENDING";
    else if (this.phase === "EXTENDING" && pike >= 145) next = "EXTENDED";
    let repInc = false, repConf = 0;
    if (next === "EXTENDED" && (this.phase === "EXTENDING" || this.phase === "V_POSITION")) {
      const rom = this.peak - this.trough;
      const foldOk = this.trough <= 80;
      const extOk = pike >= 145;
      const legScore = lk > 155 ? 12 : lk > 145 ? 6 : 2;
      if (foldOk && extOk) {
        repConf = clamp(54 + legScore + (rom > 75 ? 14 : rom > 55 ? 8 : 4) + (Math.abs(this.velFilt) < 600 ? 8 : 0), 0, 100);
      } else {
        repConf = clamp(14, 0, 100);
      }
      if (foldOk && extOk && repConf > 60 && q2.exerciseConfidence > 38) {
        if (this.shouldCountRep(ts, repConf, 60)) {
          repInc = true;
          this.lastRepAt = ts;
        }
      }
      this.trough = pike;
      this.peak = pike;
      next = "READY";
    }
    if (repInc) {
      this.phase = "READY";
      this.lastTransitionAt = ts;
    } else if (next !== this.phase) {
      this.phase = next;
      this.lastTransitionAt = ts;
    }
    this.lastA = pike;
    let form = 88;
    const cues = [];
    if (lk < 150) {
      form -= 10;
      cues.push("control");
    }
    if (this.phase === "FOLDING" && pike > 80 && pike < 120 && dir === "down") cues.push("chiudiPiu");
    if (this.phase === "EXTENDING" && pike > 110 && pike < 145 && dir === "up") cues.push("distendiPiu");
    const eng = this.phase === "V_POSITION" ? "bottom" : this.phase === "FOLDING" ? "down" : this.phase === "EXTENDING" ? "up" : "ready";
    return { phase: this.phase, enginePhase: eng, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: pike, secondaryAngles: { kneeExt: lk }, velocity: this.velFilt, direction: dir };
  }
}
class MountainClimberAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "mountainclimber";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26];
    this.lastSwitch = 0;
    this.cycle = null;
    this.alt = 0;
  }
  analyze(lm, ts, _dt, q2) {
    const lHip = angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
    const rHip = angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
    const driving = Math.min(lHip, rHip);
    const trunk = this.bilateralJointAngle("trunk", lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
    let repInc = false, repConf = 0;
    const leftForward = lHip < 78, rightForward = rHip < 78;
    const nowCycle = leftForward ? "left" : rightForward ? "right" : null;
    if (nowCycle && nowCycle !== this.cycle && ts - this.lastSwitch > 180) {
      if (this.cycle) {
        this.alt++;
        if (this.alt % 2 === 0) {
          repConf = clamp(65 + (trunk > 155 ? 15 : 0) + (q2.exerciseConfidence > 60 ? 10 : 0), 0, 100);
          if (repConf > 58 && q2.exerciseConfidence > 38 && this.shouldCountRep(ts, repConf, 58)) {
            repInc = true;
            this.lastRepAt = ts;
          }
        }
      }
      this.cycle = nowCycle;
      this.lastSwitch = ts;
      this.phase = nowCycle === "left" ? "LEFT_FORWARD" : "RIGHT_FORWARD";
    }
    if (!nowCycle) this.phase = "HOLD_PLANK";
    let form = 88;
    const cues = [];
    if (trunk < 152) {
      form -= 13;
      cues.push("coreTight");
    }
    return { phase: this.phase, enginePhase: repInc ? "up" : "down", repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: driving, secondaryAngles: { lHip, rHip, trunk }, velocity: 0, direction: "hold" };
  }
}
class JumpingJackAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "jumpingjack";
    this.requiredLandmarks = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];
  }
  analyze(lm, ts, _dt, q2) {
    const rawSpread = (() => {
      const a = lm[LM.left_ankle], b = lm[LM.right_ankle];
      if (!a || !b) return 0;
      return Math.hypot(a.x - b.x, a.y - b.y);
    })();
    const tl = torsoLength(lm);
    const legSpread = tl > 1e-6 ? rawSpread / tl : rawSpread;
    const shoulderAbduction2 = this.bilateralJointAngle("shoulderAbduction", lm, [LM.left_hip, LM.left_shoulder, LM.left_elbow], [LM.right_hip, LM.right_shoulder, LM.right_elbow]);
    const combined = shoulderAbduction2 * 0.6 + legSpread * 90;
    let next = this.phase;
    let repInc = false, repConf = 0;
    if (this.phase === "READY" && combined < 60) next = "CLOSED";
    else if ((this.phase === "READY" || this.phase === "CLOSED") && combined > 110) next = "OPEN";
    else if (this.phase === "OPEN" && combined < 60) next = "CLOSED";
    if (next === "CLOSED" && this.phase === "OPEN") {
      const armsOk = shoulderAbduction2 > 110;
      const legsOk = legSpread > 0.55;
      const bothOk = armsOk && legsOk;
      const partialOk = armsOk || legsOk;
      if (bothOk) {
        repConf = clamp(72 + (q2.exerciseConfidence > 60 ? 10 : 0) + (legSpread > 0.75 ? 4 : 0), 0, 100);
      } else if (partialOk) {
        repConf = clamp(58 + (q2.exerciseConfidence > 60 ? 6 : 0), 0, 100);
      } else {
        repConf = clamp(18, 0, 100);
      }
      if (partialOk && repConf > 58 && q2.exerciseConfidence > 38 && this.shouldCountRep(ts, repConf, 58)) {
        repInc = true;
        this.lastRepAt = ts;
        next = "READY";
      }
    }
    if (repInc) {
      this.phase = "READY";
      this.lastTransitionAt = ts;
    } else if (next !== this.phase) {
      this.phase = next;
      this.lastTransitionAt = ts;
    }
    if (this.phase === "READY" && combined < 60) this.phase = "CLOSED";
    const form = 90;
    const cues = [];
    return { phase: this.phase, enginePhase: this.phase === "OPEN" ? "up" : "down", repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: combined, secondaryAngles: { legSpread, shoulderAbduction: shoulderAbduction2 }, velocity: 0, direction: "hold" };
  }
}
class BicycleCrunchAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "bicyclecrunch";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26, 13, 14];
    this.lastAlt = null;
  }
  analyze(lm, ts, _dt, q2) {
    const le = lm[LM.left_elbow], rk = lm[LM.right_knee], re = lm[LM.right_elbow], lk = lm[LM.left_knee];
    if (!le || !rk || !re || !lk) return { phase: this.phase, enginePhase: "ready", repIncrement: false, repConfidence: 0, formScore: 70, poseQuality: q2, cues: [], primaryAngle: 0, secondaryAngles: {}, velocity: 0, direction: "hold" };
    const d1 = Math.hypot(le.x - rk.x, le.y - rk.y);
    const d2 = Math.hypot(re.x - lk.x, re.y - lk.y);
    const best = Math.min(d1, d2);
    const contact = best < 0.18;
    const apart = best > 0.26;
    let repInc = false, repConf = 0;
    if (this.phase === "READY" && apart) this.phase = "EXTENDED";
    else if (this.phase === "EXTENDED" && contact) {
      const nowAlt = d1 < d2 ? "left" : "right";
      if (this.lastAlt && this.lastAlt !== nowAlt) {
        repConf = clamp(70 + (q2.exerciseConfidence > 60 ? 10 : 0), 0, 100);
        if (repConf > 58 && q2.exerciseConfidence > 38 && this.shouldCountRep(ts, repConf, 58)) {
          repInc = true;
          this.lastRepAt = ts;
        }
      }
      this.lastAlt = nowAlt;
      this.phase = "CONTRACTED";
    } else if (this.phase === "CONTRACTED" && apart) {
      this.phase = "EXTENDED";
    }
    if (repInc) {
      this.phase = "READY";
      this.lastTransitionAt = ts;
    }
    return { phase: this.phase, enginePhase: this.phase === "CONTRACTED" ? "bottom" : "down", repIncrement: repInc, repConfidence: repConf, formScore: clamp(87, 0, 100), poseQuality: q2, cues: [], primaryAngle: best, secondaryAngles: { d1, d2 }, velocity: 0, direction: "hold" };
  }
}
class HeelTapAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "heeltap";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26, 15, 16, 29, 30];
    this.lastSide = null;
  }
  analyze(lm, ts, _dt, q2) {
    const lw = lm[LM.left_wrist], lh = lm[LM.left_heel], rw = lm[LM.right_wrist], rh = lm[LM.right_heel];
    if (!lw || !lh || !rw || !rh) return { phase: this.phase, enginePhase: "ready", repIncrement: false, repConfidence: 0, formScore: 70, poseQuality: q2, cues: [], primaryAngle: 0, secondaryAngles: {}, velocity: 0, direction: "hold" };
    const tl = torsoLength(lm);
    const n2 = tl > 1e-6 ? 1 / tl : 1;
    const dL = Math.hypot(lw.x - lh.x, lw.y - lh.y) * n2;
    const dR = Math.hypot(rw.x - rh.x, rw.y - rh.y) * n2;
    const best = Math.min(dL, dR);
    const tap = best < 0.42;
    const centered = best > 0.62;
    let repInc = false, repConf = 0;
    if (this.phase === "READY" && centered) this.phase = "CENTER";
    else if (this.phase === "CENTER" && tap) {
      const side = dL < dR ? "left" : "right";
      if (this.lastSide && this.lastSide !== side) {
        repConf = clamp(70 + (q2.exerciseConfidence > 60 ? 10 : 0), 0, 100);
        if (repConf > 58 && q2.exerciseConfidence > 38 && this.shouldCountRep(ts, repConf, 58)) {
          repInc = true;
          this.lastRepAt = ts;
        }
      }
      this.lastSide = side;
      this.phase = side === "left" ? "LEFT" : "RIGHT";
    } else if ((this.phase === "LEFT" || this.phase === "RIGHT") && centered) {
      this.phase = "CENTER";
    }
    if (repInc) {
      this.phase = "CENTER";
      this.lastTransitionAt = ts;
    }
    return { phase: this.phase, enginePhase: this.phase === "LEFT" || this.phase === "RIGHT" ? "bottom" : "down", repIncrement: repInc, repConfidence: repConf, formScore: 88, poseQuality: q2, cues: [], primaryAngle: best, secondaryAngles: { dL, dR }, velocity: 0, direction: "hold" };
  }
}
class BurpeeAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "burpee";
    this.requiredLandmarks = [23, 24, 25, 26, 27, 28, 11, 12, 13, 14];
  }
  analyze(lm, ts, _dt, q2) {
    var _a, _b, _c, _d;
    const knee = (angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle) + angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle)) / 2;
    const elbow = (angleFromLandmarks(lm, LM.left_shoulder, LM.left_elbow, LM.left_wrist) + angleFromLandmarks(lm, LM.right_shoulder, LM.right_elbow, LM.right_wrist)) / 2;
    const hipY = ((((_a = lm[LM.left_hip]) == null ? void 0 : _a.y) ?? 0.5) + (((_b = lm[LM.right_hip]) == null ? void 0 : _b.y) ?? 0.5)) / 2;
    let repInc = false, repConf = 0;
    const standing = knee > 142 && hipY < 0.62;
    const squat = knee < 108;
    const handsDown = hipY > 0.58 && Math.min(((_c = lm[LM.left_wrist]) == null ? void 0 : _c.y) ?? 1, ((_d = lm[LM.right_wrist]) == null ? void 0 : _d.y) ?? 1) > 0.62;
    const plank = elbow > 145 && knee > 135;
    const jump = hipY < 0.52 && knee > 145 && Math.abs(knee - 150) < 30;
    if (this.phase === "READY" && squat) this.phase = "SQUAT";
    else if (this.phase === "SQUAT" && handsDown) this.phase = "HANDS_DOWN";
    else if (this.phase === "HANDS_DOWN" && plank) this.phase = "PLANK";
    else if (this.phase === "PLANK" && squat) this.phase = "RETURN";
    else if (this.phase === "RETURN" && standing) this.phase = "STANDING";
    else if (this.phase === "STANDING" && jump) {
      repConf = clamp(68 + (q2.exerciseConfidence > 60 ? 10 : 0) + (Math.abs(elbow - 160) < 20 ? 6 : 0), 0, 100);
      if (repConf > 60 && q2.exerciseConfidence > 38 && this.shouldCountRep(ts, repConf, 60)) {
        repInc = true;
        this.lastRepAt = ts;
        this.phase = "READY";
      }
    } else if (this.phase === "STANDING" && standing && ts - this.lastTransitionAt > 900) {
      repConf = clamp(62 + (q2.exerciseConfidence > 60 ? 8 : 0), 0, 100);
      if (repConf > 60 && q2.exerciseConfidence > 38 && this.shouldCountRep(ts, repConf, 60)) {
        repInc = true;
        this.lastRepAt = ts;
        this.phase = "READY";
      }
    }
    if (!standing && !squat && this.phase === "STANDING" && ts - this.lastTransitionAt > 1200) this.phase = "READY";
    return { phase: this.phase, enginePhase: this.phase === "PLANK" ? "bottom" : this.phase === "SQUAT" ? "down" : this.phase === "STANDING" ? "up" : "ready", repIncrement: repInc, repConfidence: repConf, formScore: clamp(86, 0, 100), poseQuality: q2, cues: [], primaryAngle: knee, secondaryAngles: { elbow, hipY }, velocity: 0, direction: "hold" };
  }
}
class AffondoAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "affondo";
    this.requiredLandmarks = [23, 24, 25, 26, 11, 12];
    this.minRepIntervalMs = 350;
    this.minPhaseMs = 70;
    this.velFilt = 0;
    this.lastA = 160;
  }
  analyze(lm, ts, dtMs, q2) {
    const al = angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle);
    const ar = angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle);
    const knee = Math.min(al, ar);
    const dt = dtMs || 16;
    const rawV = (knee - this.lastA) / (dt / 1e3);
    this.velFilt = this.velFilt * 0.7 + rawV * 0.3;
    const dir = Math.abs(this.velFilt) < 18 ? "hold" : this.velFilt < 0 ? "down" : "up";
    this.trough = Math.min(this.trough, knee);
    this.peak = Math.max(this.peak, knee);
    let next = this.phase;
    if (this.phase === "READY" && knee < 122) next = "DESCENDING";
    else if (this.phase === "DESCENDING" && knee < 105) next = "BOTTOM";
    else if (this.phase === "BOTTOM" && knee > 135) next = "ASCENDING";
    else if (this.phase === "ASCENDING" && knee > 142) next = "STANDING";
    else if (this.phase === "DESCENDING" && knee > 138 && this.trough < 122) next = "ASCENDING";
    let repInc = false, repConf = 0;
    if (next === "STANDING" && (this.phase === "ASCENDING" || this.phase === "BOTTOM" || this.phase === "DESCENDING")) {
      const depthOk = this.trough < 105;
      const extOk = knee > 142;
      const symScore = Math.abs(al - ar) < 20 ? 10 : Math.abs(al - ar) < 30 ? 6 : 3;
      const rom = this.peak - this.trough;
      const romScore = rom > 28 ? 18 : rom > 18 ? 10 : 6;
      if (depthOk && extOk) {
        repConf = clamp(62 + symScore + romScore + (q2.exerciseConfidence > 60 ? 6 : 0), 0, 100);
      } else {
        repConf = clamp(18, 0, 100);
      }
      if (depthOk && extOk && repConf > 60 && q2.exerciseConfidence > 38 && this.shouldCountRep(ts, repConf, 60)) {
        repInc = true;
        this.lastRepAt = ts;
      }
      this.trough = knee;
      this.peak = knee;
      next = "READY";
    }
    if (repInc) {
      this.phase = "READY";
      this.lastTransitionAt = ts;
    } else if (next !== this.phase) {
      this.phase = next;
      this.lastTransitionAt = ts;
    }
    this.lastA = knee;
    const trunk = this.bilateralJointAngle("trunk", lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
    let form = 90;
    const cues = [];
    if (trunk < 150) {
      form -= 14;
      cues.push("backStraight");
    }
    if (this.phase === "DESCENDING" && knee > 108 && knee < 138 && dir === "down") cues.push("scendiAncora");
    return { phase: this.phase, enginePhase: this.phase === "BOTTOM" ? "bottom" : this.phase === "DESCENDING" ? "down" : this.phase === "ASCENDING" ? "up" : "ready", repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: knee, secondaryAngles: { al, ar, trunk }, velocity: this.velFilt, direction: dir };
  }
}
class SkaterAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "skater";
    this.requiredLandmarks = [23, 24, 25, 26, 27, 28];
    this.lastX = null;
    this.velX = 0;
  }
  analyze(lm, ts, dtMs, q2) {
    var _a, _b, _c, _d;
    const cx = ((((_a = lm[LM.left_hip]) == null ? void 0 : _a.x) ?? 0.5) + (((_b = lm[LM.right_hip]) == null ? void 0 : _b.x) ?? 0.5)) / 2;
    const dt = dtMs || 16;
    const rawV = this.lastX === null ? 0 : (cx - this.lastX) / (dt / 1e3);
    this.velX = this.velX * 0.7 + rawV * 0.3;
    const rawSpread = Math.hypot((((_c = lm[LM.left_ankle]) == null ? void 0 : _c.x) ?? 0.4) - (((_d = lm[LM.right_ankle]) == null ? void 0 : _d.x) ?? 0.6), 0);
    const tl = torsoLength(lm);
    const spread = tl > 1e-6 ? rawSpread / tl : rawSpread;
    const knee = this.bilateralJointAngle("knee", lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]);
    const bent = knee < 128;
    const wide = spread > 0.58;
    let repInc = false, repConf = 0;
    if (this.phase === "READY" && bent && wide) {
      this.phase = "LANDED";
      this.lastTransitionAt = ts;
    } else if (this.phase === "LANDED" && spread < 0.42) {
      this._hops = (this._hops || 0) + 1;
      if (this._hops % 2 === 0) {
        repConf = clamp(70 + (Math.abs(this.velX) > 0.3 ? 10 : 0), 0, 100);
        if (repConf > 58 && q2.exerciseConfidence > 38 && this.shouldCountRep(ts, repConf, 58)) {
          repInc = true;
          this.lastRepAt = ts;
        }
      }
      this.phase = "CENTER";
    } else if (this.phase === "CENTER" && bent && wide && this.canTransition(ts, 120)) {
      this.phase = "LANDED";
    }
    this.lastX = cx;
    return { phase: this.phase, enginePhase: this.phase === "LANDED" ? "bottom" : "ready", repIncrement: repInc, repConfidence: repConf, formScore: clamp(88, 0, 100), poseQuality: q2, cues: [], primaryAngle: spread * 100, secondaryAngles: { knee, spread, velX: this.velX }, velocity: this.velX * 100, direction: Math.abs(this.velX) < 0.2 ? "hold" : this.velX > 0 ? "up" : "down" };
  }
}
class GinocchiaAlteAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "ginocchiaalte";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26];
    this.lastSwitch = 0;
    this.cycle = null;
    this.alt = 0;
  }
  analyze(lm, ts, _dt, q2) {
    const l2 = angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
    const r = angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
    const driving = Math.min(l2, r);
    const trunk = this.bilateralJointAngle("trunk", lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
    const nowCycle = l2 < r ? "left" : "right";
    const kneeUp = driving < 85;
    let repInc = false, repConf = 0;
    if (kneeUp && nowCycle !== this.cycle && ts - this.lastSwitch > 180) {
      if (this.cycle) {
        this.alt++;
        if (this.alt % 2 === 0) {
          repConf = clamp(70 + (trunk > 152 ? 10 : 0), 0, 100);
          if (repConf > 58 && q2.exerciseConfidence > 38 && this.shouldCountRep(ts, repConf, 58)) {
            repInc = true;
            this.lastRepAt = ts;
          }
        }
      }
      this.cycle = nowCycle;
      this.lastSwitch = ts;
      this.phase = nowCycle === "left" ? "LEFT_UP" : "RIGHT_UP";
    } else if (!kneeUp) {
      this.phase = "READY";
    }
    let form = 87;
    if (trunk < 152) form -= 10;
    return { phase: this.phase, enginePhase: kneeUp ? "down" : "ready", repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues: form < 72 ? ["kneesToChest"] : [], primaryAngle: driving, secondaryAngles: { l: l2, r, trunk }, velocity: 0, direction: "hold" };
  }
}
class SupermanAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "superman";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26];
  }
  analyze(lm, ts, _dt, q2) {
    var _a, _b, _c, _d;
    const hip = this.bilateralJointAngle("hip", lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
    const down = hip > 168;
    const up = hip < 162;
    const shoulderY = (((_a = lm[LM.left_shoulder]) == null ? void 0 : _a.y) ?? 0.5 + ((_b = lm[LM.right_shoulder]) == null ? void 0 : _b.y) ?? 0.5) / 2;
    const hipY = (((_c = lm[LM.left_hip]) == null ? void 0 : _c.y) ?? 0.5 + ((_d = lm[LM.right_hip]) == null ? void 0 : _d.y) ?? 0.5) / 2;
    const lifted = shoulderY < hipY - 0.015 || hipY < 0.72;
    let repInc = false, repConf = 0;
    if (this.phase === "READY" && down) this.phase = "DOWN";
    else if (this.phase === "DOWN" && (up || lifted)) {
      this.phase = "UP";
      this.lastTransitionAt = ts;
    } else if (this.phase === "UP" && down) {
      repConf = clamp(66 + (q2.exerciseConfidence > 60 ? 10 : 0) + (lifted ? 6 : 0), 0, 100);
      if (repConf > 60 && q2.exerciseConfidence > 38 && this.shouldCountRep(ts, repConf, 60)) {
        repInc = true;
        this.lastRepAt = ts;
        this.phase = "READY";
      } else this.phase = "READY";
    }
    return { phase: this.phase, enginePhase: this.phase === "UP" ? "bottom" : "down", repIncrement: repInc, repConfidence: repConf, formScore: 88, poseQuality: q2, cues: [], primaryAngle: hip, secondaryAngles: { hip }, velocity: 0, direction: "hold" };
  }
}
class PonteAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "ponte";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26];
    this.velFilt = 0;
    this.lastA = 100;
  }
  analyze(lm, ts, dtMs, q2) {
    const hip = this.bilateralJointAngle("hip", lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
    const dt = dtMs || 16;
    const rawV = (hip - this.lastA) / (dt / 1e3);
    this.velFilt = this.velFilt * 0.75 + rawV * 0.25;
    const dir = Math.abs(this.velFilt) < 18 ? "hold" : this.velFilt > 0 ? "up" : "down";
    this.trough = Math.min(this.trough, hip);
    this.peak = Math.max(this.peak, hip);
    let next = this.phase;
    if (this.phase === "READY" && hip >= 125) next = "RISING";
    else if (this.phase === "RISING" && hip >= 148) next = "TOP";
    else if (this.phase === "TOP" && hip <= 135) next = "LOWERING";
    else if (this.phase === "LOWERING" && hip <= 110) next = "DOWN";
    let repInc = false, repConf = 0;
    if (next === "DOWN" && (this.phase === "LOWERING" || this.phase === "TOP")) {
      const rom = this.peak - this.trough;
      const topOk = this.peak >= 148;
      const downOk = hip <= 110;
      if (topOk && downOk) {
        repConf = clamp(62 + (rom > 45 ? 14 : rom > 30 ? 8 : 4) + (q2.exerciseConfidence > 60 ? 5 : 0), 0, 100);
      } else {
        repConf = clamp(12, 0, 100);
      }
      if (topOk && downOk && repConf > 60 && q2.exerciseConfidence > 38 && this.shouldCountRep(ts, repConf, 60)) {
        repInc = true;
        this.lastRepAt = ts;
      }
      this.trough = hip;
      this.peak = hip;
      next = "READY";
    }
    if (repInc) {
      this.phase = "READY";
      this.lastTransitionAt = ts;
    } else if (next !== this.phase) {
      this.phase = next;
      this.lastTransitionAt = ts;
    }
    this.lastA = hip;
    let form = 90;
    const cues = [];
    const trunk = this.bilateralJointAngle("trunk", lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
    if (trunk < 148) {
      form -= 12;
      cues.push("coreTight");
    }
    if (this.phase === "RISING" && hip > 125 && hip < 145 && dir === "up") cues.push("spingiAnche");
    if (this.phase === "LOWERING" && hip > 115 && hip < 135 && dir === "down") cues.push("controllaDiscesa");
    const eng = this.phase === "TOP" ? "bottom" : this.phase === "RISING" ? "down" : this.phase === "LOWERING" ? "up" : "ready";
    return { phase: this.phase, enginePhase: eng, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: hip, secondaryAngles: { trunk }, velocity: this.velFilt, direction: dir };
  }
}
class RussianTwistAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "russiantwist";
    this.requiredLandmarks = [11, 12, 23, 24, 15, 16, 25, 26];
    this.lastSide = null;
  }
  analyze(lm, ts, _dt, q2) {
    const lw = lm[LM.left_wrist], rw = lm[LM.right_wrist];
    if (!lw || !rw) return { phase: this.phase, enginePhase: "ready", repIncrement: false, repConfidence: 0, formScore: 70, poseQuality: q2, cues: [], primaryAngle: 0, secondaryAngles: {}, velocity: 0, direction: "hold" };
    const midHip = { x: (lm[LM.left_hip].x + lm[LM.right_hip].x) / 2, y: (lm[LM.left_hip].y + lm[LM.right_hip].y) / 2 };
    const tl = torsoLength(lm);
    const n2 = tl > 1e-6 ? 1 / tl : 1;
    const left = Math.abs(lw.x - midHip.x) * n2, right = Math.abs(rw.x - midHip.x) * n2;
    const maxL = Math.max(left, right);
    const centered = maxL < 0.52;
    const twisted = maxL > 0.72;
    let repInc = false, repConf = 0;
    if (this.phase === "READY" && centered) this.phase = "CENTER";
    else if (this.phase === "CENTER" && twisted) {
      const side = left > right ? "left" : "right";
      if (this.lastSide && this.lastSide !== side) {
        repConf = clamp(70, 0, 100);
        if (repConf > 58 && q2.exerciseConfidence > 38 && this.shouldCountRep(ts, repConf, 58)) {
          repInc = true;
          this.lastRepAt = ts;
        }
      }
      this.lastSide = side;
      this.phase = side === "left" ? "LEFT" : "RIGHT";
    } else if ((this.phase === "LEFT" || this.phase === "RIGHT") && centered) {
      this.phase = "CENTER";
    }
    if (repInc) {
      this.phase = "CENTER";
      this.lastTransitionAt = ts;
    }
    return { phase: this.phase, enginePhase: this.phase === "LEFT" || this.phase === "RIGHT" ? "bottom" : "down", repIncrement: repInc, repConfidence: repConf, formScore: 86, poseQuality: q2, cues: [], primaryAngle: maxL * 100, secondaryAngles: { left, right }, velocity: 0, direction: "hold" };
  }
}
class WallsitAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "wallsit";
    this.requiredLandmarks = [23, 24, 25, 26, 11, 12];
    this.goodSince = null;
    this.graceMs = 500;
  }
  analyze(lm, ts, _dt, q2) {
    const k2 = this.bilateralJointAngle("knee", lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]);
    const trunk = this.bilateralJointAngle("trunk", lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
    const valid = k2 > 78 && k2 < 108 && trunk > 152 && q2.exerciseConfidence > 38;
    if (valid) {
      if (this.goodSince == null) this.goodSince = ts;
      this.phase = "HOLD_GOOD";
    } else {
      if (this.goodSince != null && ts - this.goodSince < this.graceMs) this.phase = "HOLD_GOOD";
      else {
        this.phase = "HOLD_BAD";
        this.goodSince = null;
      }
    }
    let form = 95;
    const cues = [];
    if (k2 < 78 || k2 > 108) {
      form -= 22;
      cues.push("control");
    } else if (k2 < 82 || k2 > 105) {
      form -= 10;
      cues.push("control");
    }
    if (trunk < 152) {
      form -= 10;
      cues.push("backStraight");
    }
    return { phase: this.phase, enginePhase: "ready", repIncrement: false, repConfidence: 0, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: k2, secondaryAngles: { trunk }, velocity: 0, direction: "hold" };
  }
}
class SideplankAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "sideplank";
    this.requiredLandmarks = [11, 12, 23, 24, 27, 28];
    this.goodSince = null;
    this.graceMs = 500;
  }
  analyze(lm, ts, _dt, q2) {
    const line = this.bilateralJointAngle("trunk", lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
    const valid = line > 158 && q2.exerciseConfidence > 38;
    if (valid) {
      if (this.goodSince == null) this.goodSince = ts;
      this.phase = "HOLD_GOOD";
    } else {
      if (this.goodSince != null && ts - this.goodSince < this.graceMs) this.phase = "HOLD_GOOD";
      else {
        this.phase = "HOLD_BAD";
        this.goodSince = null;
      }
    }
    let form = 94;
    const cues = [];
    if (line < 148) {
      form = 52;
      cues.push("hipsUp");
    } else if (line < 158) {
      form -= 12;
      cues.push("coreTight");
    }
    return { phase: this.phase, enginePhase: "ready", repIncrement: false, repConfidence: 0, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: line, secondaryAngles: { line }, velocity: 0, direction: "hold" };
  }
}
class PlankJackAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "plankjack";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26, 27, 28];
  }
  analyze(lm, ts, _dt, q2) {
    const spread = (() => {
      const a = lm[LM.left_ankle], b = lm[LM.right_ankle];
      if (!a || !b) return 0;
      return Math.hypot(a.x - b.x, a.y - b.y);
    })();
    const line = this.bilateralJointAngle("trunk", lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
    const plankOk = line > 153;
    const closed = spread < 0.12;
    const open = spread > 0.3;
    let repInc = false, repConf = 0;
    if (!plankOk) {
      this.phase = "BAD_PLANK";
    } else {
      if (this.phase === "READY" && closed) this.phase = "FEET_TOGETHER";
      else if (this.phase === "FEET_TOGETHER" && open) this.phase = "FEET_APART";
      else if (this.phase === "FEET_APART" && closed) {
        repConf = clamp(70 + (q2.exerciseConfidence > 60 ? 10 : 0), 0, 100);
        if (repConf > 58 && q2.exerciseConfidence > 38 && this.shouldCountRep(ts, repConf, 58)) {
          repInc = true;
          this.lastRepAt = ts;
          this.phase = "FEET_TOGETHER";
        } else this.phase = "FEET_TOGETHER";
      }
      if (this.phase === "READY" && closed) this.phase = "FEET_TOGETHER";
    }
    const form = plankOk ? 88 : 55;
    return { phase: this.phase, enginePhase: this.phase === "FEET_APART" ? "bottom" : "down", repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues: plankOk ? [] : ["coreTight"], primaryAngle: spread * 100, secondaryAngles: { line, spread }, velocity: 0, direction: "hold" };
  }
}
const REGISTRY = {
  pushup: PushupAnalyzer,
  squat: SquatAnalyzer,
  crunch: CrunchAnalyzer,
  plank: PlankAnalyzer,
  legraise: LegRaiseAnalyzer,
  flutterkick: FlutterKickAnalyzer,
  deadbug: DeadBugAnalyzer,
  vup: VUpAnalyzer,
  mountainclimber: MountainClimberAnalyzer,
  jumpingjack: JumpingJackAnalyzer,
  bicyclecrunch: BicycleCrunchAnalyzer,
  heeltap: HeelTapAnalyzer,
  burpee: BurpeeAnalyzer,
  affondo: AffondoAnalyzer,
  skater: SkaterAnalyzer,
  ginocchiaalte: GinocchiaAlteAnalyzer,
  superman: SupermanAnalyzer,
  ponte: PonteAnalyzer,
  russiantwist: RussianTwistAnalyzer,
  wallsit: WallsitAnalyzer,
  sideplank: SideplankAnalyzer,
  plankjack: PlankJackAnalyzer
};
function getAnalyzer(exerciseId) {
  const nid = normalizeExerciseId(exerciseId);
  const Cls = REGISTRY[nid];
  if (!Cls) return null;
  return new Cls();
}
function evaluatePoseQuality(lm, required, thresholds) {
  var _a;
  if (!lm) return { poseConfidence: 0, landmarkConfidence: {}, exerciseConfidence: 0, requiredVisible: false, missing: required.slice() };
  const landmarkConfidence = {};
  for (let i = 0; i < lm.length; i++) landmarkConfidence[i] = Math.round((((_a = lm[i]) == null ? void 0 : _a.visibility) ?? 0) * 100);
  const poseConfidence = Math.round(visibilityScore(lm, [11, 12, 23, 24, 25, 26, 13, 14, 15, 16]) * 100);
  const reqScores = required.map((idx) => {
    var _a2;
    return (((_a2 = lm[idx]) == null ? void 0 : _a2.visibility) ?? 0) * 100;
  });
  const avgReq = reqScores.length ? reqScores.reduce((a, b) => a + b, 0) / reqScores.length : poseConfidence;
  const minReq = reqScores.length ? Math.min(...reqScores) : poseConfidence;
  const exerciseConfidence = Math.round(clamp(avgReq * 0.7 + minReq * 0.3, 0, 100));
  const requiredMin = 38;
  const missing = required.filter((idx) => {
    var _a2;
    return (((_a2 = lm[idx]) == null ? void 0 : _a2.visibility) ?? 0) * 100 < requiredMin;
  });
  const requiredVisible = exerciseConfidence >= 38 && missing.length <= 2;
  return { poseConfidence, landmarkConfidence, exerciseConfidence, requiredVisible, missing };
}
class FitnessEngine {
  constructor(cfg) {
    this.analyzer = null;
    this.video = null;
    this.running = false;
    this.rafId = null;
    this.lastInferenceAt = 0;
    this.lastAngle = 180;
    this.lastTs = 0;
    this.velocity = 0;
    this.velocityFiltered = 0;
    this.lastRepAt = 0;
    this.reps = 0;
    this.startedAt = null;
    this.elapsedActiveMs = 0;
    this.lastTickAt = 0;
    this.qualityWindow = [];
    this.avgQuality = 0;
    this.lastRepQuality = null;
    this.lastRepConfidence = null;
    this.currentPhase = "idle";
    this.currentForm = null;
    this.troughInRep = 180;
    this.peakInRep = 0;
    this.fpsEma = 0;
    this.frameCount = 0;
    this.angleHistory = [];
    this.lastPoseQuality = 0;
    this.liveRepConfidence = 0;
    this.lastResult = null;
    this.calibSamples = [];
    this.calibDone = false;
    this.loop = (now) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
      this.rafId = requestAnimationFrame(this.loop);
      if (!this.running || !this.video) return;
      const fpsTarget = this.cfg.targetFps ?? 30;
      const minInterval = 1e3 / fpsTarget;
      if (now - this.lastInferenceAt < minInterval) {
        this.updateTimers(now);
        return;
      }
      if (this.video.readyState < 2 || this.video.videoWidth === 0) {
        this.updateTimers(now);
        return;
      }
      const videoTs = this.video.currentTime ? Math.round(this.video.currentTime * 1e3) : now;
      const ts = videoTs || now;
      const t0 = performance.now();
      const result = this.landmarker.detect(this.video, ts);
      const dtInfer = performance.now() - t0;
      if (dtInfer > 42 && fpsTarget > 22) {
        this.cfg.targetFps = Math.max(22, (this.cfg.targetFps ?? 30) - 2);
      }
      this.lastInferenceAt = now;
      this.lastResult = result;
      const instFps = 1e3 / Math.max(1, now - (this.lastTs || now - 16));
      this.fpsEma = this.fpsEma ? this.fpsEma * 0.9 + instFps * 0.1 : instFps;
      this.frameCount++;
      const pq = evaluatePoseQuality(result.landmarks ?? null, ((_a = this.analyzer) == null ? void 0 : _a.requiredLandmarks) ?? ((_b = this.def) == null ? void 0 : _b.requiredLandmarks) ?? [11, 12, 23, 24, 25, 26, 27, 28]);
      this.lastPoseQuality = pq.exerciseConfidence;
      if (!result.landmarks) {
        if (this.currentPhase !== "idle") {
          this.currentPhase = "idle";
          this.currentForm = { primaryAngle: this.lastAngle, secondaryAngles: {}, velocity: 0, direction: "idle", quality: 0, cues: ["moveIntoFrame"], visibility: 0, poseQuality: this.lastPoseQuality };
          (_c = this.onPhaseChange) == null ? void 0 : _c.call(this, "idle", this.currentForm);
        }
        this.updateTimers(now);
        this.lastTs = now;
        this.emitMetrics();
        return;
      }
      const lm = result.landmarks;
      const vis = result.visibilityScore;
      const primVis = this.primaryVisibility(lm);
      const visEffective = Math.max(vis, primVis);
      const lowVis = primVis < 0.22 && vis < 0.28;
      if (lowVis) {
        this.updateTimers(now);
        this.lastTs = now;
        if (this.currentForm) {
          this.currentForm = { ...this.currentForm, visibility: visEffective, cues: ["move into frame"] };
        }
      }
      if (this.analyzer) {
        const dtAna = now - (this.lastTs || now - 16);
        const pqForAna = evaluatePoseQuality(lm, this.analyzer.requiredLandmarks);
        if (pqForAna.exerciseConfidence < 38) {
          this.updateTimers(now);
          this.lastTs = now;
          this.lastAngle = this.getPrimaryAngle(lm);
          this.emitMetrics();
          return;
        }
        const aRes = this.analyzer.analyze(lm, now, dtAna, pqForAna);
        this.liveRepConfidence = aRes.repConfidence;
        this.currentPhase = aRes.enginePhase;
        this.currentForm = {
          primaryAngle: aRes.primaryAngle,
          secondaryAngles: aRes.secondaryAngles,
          velocity: aRes.velocity,
          direction: aRes.direction,
          quality: aRes.formScore,
          cues: aRes.cues,
          visibility: pqForAna.exerciseConfidence / 100,
          poseQuality: pqForAna.exerciseConfidence
        };
        if (!this.startedAt && (aRes.phase === "DESCENDING" || aRes.phase === "FLEXING" || aRes.phase === "BOTTOM" || aRes.phase === "HOLD_GOOD")) {
          this.startedAt = now;
          this.lastRepAt = now;
        }
        if (aRes.phase !== this.currentPhase) (_d = this.onPhaseChange) == null ? void 0 : _d.call(this, aRes.enginePhase, this.currentForm);
        if (aRes.repIncrement) {
          const repDuration = this.lastRepAt ? now - this.lastRepAt : this.startedAt ? now - this.startedAt : 0;
          this.reps += 1;
          this.lastRepAt = now;
          this.lastRepQuality = aRes.formScore;
          this.lastRepConfidence = aRes.repConfidence;
          this.qualityWindow.push(aRes.formScore);
          if (this.qualityWindow.length > (this.cfg.qualitySmoothingWindow ?? 5)) this.qualityWindow.shift();
          this.avgQuality = this.qualityWindow.reduce((a, b) => a + b, 0) / this.qualityWindow.length;
          const evt = { repIndex: this.reps, timestampMs: now, durationMs: repDuration, peakAngle: this.peakInRep, troughAngle: this.troughInRep, quality: aRes.formScore, cues: aRes.cues, velocity: aRes.velocity, confidence: aRes.repConfidence };
          (_e = this.onRep) == null ? void 0 : _e.call(this, evt);
          try {
            (_f = navigator.vibrate) == null ? void 0 : _f.call(navigator, 28);
          } catch {
          }
          this.troughInRep = aRes.primaryAngle;
          this.peakInRep = aRes.primaryAngle;
          this.sm.consumeRep(now, aRes.primaryAngle);
          this.currentPhase = "ready";
          (_g = this.onPhaseChange) == null ? void 0 : _g.call(this, "ready", this.currentForm);
        }
        if ((_h = this.def) == null ? void 0 : _h.isHold) {
          this.qualityWindow.push(aRes.formScore);
          if (this.qualityWindow.length > 8) this.qualityWindow.shift();
          this.avgQuality = this.qualityWindow.reduce((a, b) => a + b, 0) / this.qualityWindow.length;
          if (!this.startedAt && pqForAna.exerciseConfidence >= 50) this.startedAt = this.startedAt ?? now;
        }
        this.lastAngle = aRes.primaryAngle;
        this.lastTs = now;
        this.updateTimers(now);
        this.emitMetrics();
        return;
      }
      if (this.def && this.def.trackingSupported === false) {
        const pqTmp = evaluatePoseQuality(lm, this.def.requiredLandmarks ?? []);
        const formEvalTmp = ((_i = this.def) == null ? void 0 : _i.evaluateForm(lm, {}, this.currentPhase, { velocity: 0, direction: "hold", visibility: pqTmp.exerciseConfidence / 100, repCount: this.reps })) ?? { quality: 0 };
        this.currentForm = { primaryAngle: 0, secondaryAngles: {}, velocity: 0, direction: "hold", quality: formEvalTmp.quality, cues: ["tracking not supported"], visibility: pqTmp.exerciseConfidence / 100, poseQuality: pqTmp.exerciseConfidence };
        this.updateTimers(now);
        this.lastTs = now;
        this.emitMetrics();
        return;
      }
      const primaryAngle = this.getPrimaryAngle(lm);
      const secondary = this.computeSecondaryAngles(lm);
      const dtMs = now - (this.lastTs || now - 16);
      const rawVel = dtMs > 0 ? (primaryAngle - this.lastAngle) / (dtMs / 1e3) : 0;
      this.velocity = rawVel;
      this.velocityFiltered = this.velocityFiltered * 0.75 + rawVel * 0.25;
      const direction = Math.abs(this.velocityFiltered) < 18 ? "hold" : this.velocityFiltered < 0 ? "down" : "up";
      this.angleHistory.push({ angle: primaryAngle, ts: now });
      const cutoff = now - 900;
      while (this.angleHistory.length && this.angleHistory[0].ts < cutoff) this.angleHistory.shift();
      this.troughInRep = Math.min(this.troughInRep, primaryAngle);
      this.peakInRep = Math.max(this.peakInRep, primaryAngle);
      let phase = this.currentPhase;
      if (!this.calibDone && (phase === "ready" || phase === "idle")) {
        this.calibSamples.push(primaryAngle);
        if (this.calibSamples.length >= 32) {
          const sorted = [...this.calibSamples].sort((a, b) => a - b);
          const minObs = sorted[Math.floor(sorted.length * 0.08)];
          const maxObs = sorted[Math.floor(sorted.length * 0.92)];
          const span = maxObs - minObs;
          if (span > 22) {
            const origDown = this.def.thresholds.downThreshold;
            const origUp = this.def.thresholds.upThreshold;
            const adaptDown = clamp(minObs + span * 0.18, origDown - 12, origDown + 10);
            const adaptUp = clamp(maxObs - span * 0.12, origUp - 10, origUp + 14);
            this.sm.updateConfig({ downThreshold: adaptDown, upThreshold: adaptUp });
          }
          this.calibDone = true;
        }
      }
      let didRep = false;
      if ((_j = this.def) == null ? void 0 : _j.customTransition) {
        const custom = this.def.customTransition(primaryAngle, this.velocityFiltered, phase, { landmarks: lm, timestampMs: now });
        if (custom) {
          const wasDownLike = phase === "down" || phase === "bottom";
          if (wasDownLike && custom === "up") {
            const timeOk = this.lastRepAt === 0 || now - this.lastRepAt > (this.def.thresholds.minRepsIntervalMs ?? 300);
            const romOk = this.troughInRep < this.def.thresholds.downThreshold + 10;
            if (timeOk && romOk) didRep = true;
          }
          phase = custom;
          if (phase === "down" || phase === "bottom") this.sm.state.phase = phase;
          else if (phase === "up") this.sm.state.phase = "up";
          else if (phase === "ready") this.sm.state.phase = "ready";
        } else {
          const step = this.sm.step(primaryAngle, now, visEffective);
          phase = step.nextPhase;
          didRep = step.didRep;
        }
      } else {
        const step = this.sm.step(primaryAngle, now, visEffective);
        phase = step.nextPhase;
        didRep = step.didRep;
      }
      if (!this.startedAt && (phase === "down" || phase === "bottom")) {
        this.startedAt = now;
        this.lastRepAt = now;
      }
      const formEval = ((_k = this.def) == null ? void 0 : _k.evaluateForm(lm, { ...secondary, knee: primaryAngle, primary: primaryAngle }, phase, {
        velocity: this.velocityFiltered,
        direction,
        visibility: vis,
        repCount: this.reps
      })) ?? { quality: 75, cues: [] };
      const form = {
        primaryAngle,
        secondaryAngles: secondary,
        velocity: this.velocityFiltered,
        direction,
        quality: clamp(formEval.quality, 0, 100),
        cues: formEval.cues,
        visibility: vis
      };
      this.currentForm = form;
      if (phase !== this.currentPhase) {
        this.currentPhase = phase;
        (_l = this.onPhaseChange) == null ? void 0 : _l.call(this, phase, form);
      }
      if (didRep) {
        const repDuration = this.lastRepAt ? now - this.lastRepAt : this.startedAt ? now - this.startedAt : 0;
        const rom = this.peakInRep - this.troughInRep;
        const expectedRom = this.def.thresholds.upThreshold - this.def.thresholds.downThreshold;
        const romScore = clamp(100 * (rom / Math.max(30, expectedRom)), 0, 100);
        const velocityScore = clamp(100 - Math.abs(this.velocityFiltered) * 0.06, 0, 100);
        const repQuality = clamp(form.quality * 0.55 + romScore * 0.3 + velocityScore * 0.15, 0, 100);
        this.reps += 1;
        this.lastRepAt = now;
        this.lastRepQuality = repQuality;
        this.lastRepConfidence = evt.confidence ?? repQuality;
        this.qualityWindow.push(repQuality);
        if (this.qualityWindow.length > (this.cfg.qualitySmoothingWindow ?? 5)) this.qualityWindow.shift();
        this.avgQuality = this.qualityWindow.reduce((a, b) => a + b, 0) / this.qualityWindow.length;
        const evt = {
          repIndex: this.reps,
          timestampMs: now,
          durationMs: repDuration,
          peakAngle: this.peakInRep,
          troughAngle: this.troughInRep,
          quality: repQuality,
          cues: form.cues,
          velocity: this.velocityFiltered
        };
        (_m = this.onRep) == null ? void 0 : _m.call(this, evt);
        try {
          (_n = navigator.vibrate) == null ? void 0 : _n.call(navigator, 28);
        } catch {
        }
        this.troughInRep = primaryAngle;
        this.peakInRep = primaryAngle;
        this.sm.consumeRep(now, primaryAngle);
        this.currentPhase = "ready";
        (_o = this.onPhaseChange) == null ? void 0 : _o.call(this, "ready", form);
      }
      if ((_p = this.def) == null ? void 0 : _p.isHold) {
        this.qualityWindow.push(form.quality);
        if (this.qualityWindow.length > 8) this.qualityWindow.shift();
        this.avgQuality = this.qualityWindow.reduce((a, b) => a + b, 0) / this.qualityWindow.length;
        if (!this.startedAt && vis >= 0.35) this.startedAt = this.startedAt ?? now;
      }
      this.lastAngle = primaryAngle;
      this.lastTs = now;
      this.updateTimers(now);
      this.emitMetrics();
    };
    const nid = normalizeExerciseId(cfg.exerciseId);
    const def = getDefinition(nid);
    if (!def) throw new Error(`Unknown exercise: ${cfg.exerciseId}`);
    this.cfg = { targetFps: 30, enableFiltering: true, ...cfg, exerciseId: nid };
    this.def = def;
    this.analyzer = getAnalyzer(nid);
    const thresholds = { ...def.thresholds, ...cfg.thresholdsOverride ?? {} };
    this.sm = new HysteresisStateMachine(thresholds);
    this.landmarker = new PoseLandmarkerManager({}, cfg.enableFiltering !== false);
    if (def.isHold) this.landmarker.setSmoothingTuning(0.75, 4e-3);
    else if (["mountainclimber", "jumpingjack", "burpee"].includes(def.id)) this.landmarker.setSmoothingTuning(1.35, 0.012);
    else this.landmarker.setSmoothingTuning(1.15, 8e-3);
    this.onRep = cfg.onRep;
    this.onPhaseChange = cfg.onPhaseChange;
    this.onMetrics = cfg.onMetrics;
  }
  get metrics() {
    var _a;
    const now = performance.now();
    const elapsedMs = this.startedAt ? now - this.startedAt : 0;
    return {
      reps: this.reps,
      elapsedMs,
      elapsedActiveMs: this.elapsedActiveMs,
      avgQuality: this.avgQuality,
      lastRepQuality: this.lastRepQuality,
      lastRepConfidence: this.lastRepConfidence,
      liveRepConfidence: Math.round(this.liveRepConfidence),
      currentPhase: this.currentPhase,
      currentForm: this.currentForm,
      fps: Math.round(this.fpsEma),
      poseQuality: Math.round(this.lastPoseQuality),
      trackingSupported: ((_a = this.def) == null ? void 0 : _a.trackingSupported) !== false
    };
  }
  computePoseQuality(lm, visibilityScore2) {
    var _a, _b;
    if (!lm) return 0;
    const req = ((_a = this.def) == null ? void 0 : _a.requiredLandmarks) ?? [11, 12, 23, 24, 25, 26, 27, 28];
    let minVis = 1;
    let sumVis = 0;
    let n2 = 0;
    for (const idx of req) {
      const v = ((_b = lm[idx]) == null ? void 0 : _b.visibility) ?? 0;
      sumVis += v;
      n2++;
      minVis = Math.min(minVis, v);
    }
    const avgReq = n2 ? sumVis / n2 : visibilityScore2;
    const quality = avgReq * 60 + visibilityScore2 * 20 + minVis * 20;
    return Math.max(0, Math.min(100, Math.round(quality * 100) / 100 * 100));
  }
  async init(video, onProgress) {
    this.video = video;
    await this.landmarker.init(onProgress);
  }
  /** Attach a different video element (e.g. after remount) without re-init model. */
  attachVideo(video) {
    this.video = video;
  }
  updateExercise(exerciseId) {
    const nid = normalizeExerciseId(exerciseId);
    const def = getDefinition(nid);
    if (!def) return;
    this.def = def;
    this.analyzer = getAnalyzer(nid);
    this.cfg.exerciseId = nid;
    const thresholds = { ...def.thresholds, ...this.cfg.thresholdsOverride ?? {} };
    this.sm = new HysteresisStateMachine(thresholds);
    this.resetCounters();
    if (def.isHold) this.landmarker.setSmoothingTuning(0.75, 4e-3);
    else if (["mountainclimber", "jumpingjack", "burpee"].includes(def.id)) this.landmarker.setSmoothingTuning(1.35, 0.012);
    else this.landmarker.setSmoothingTuning(1.15, 8e-3);
  }
  updateConfig(patch) {
    this.cfg = { ...this.cfg, ...patch };
    if (patch.thresholdsOverride) {
      this.sm.updateConfig(patch.thresholdsOverride);
    }
    if (patch.onRep !== void 0) this.onRep = patch.onRep;
    if (patch.onPhaseChange !== void 0) this.onPhaseChange = patch.onPhaseChange;
    if (patch.onMetrics !== void 0) this.onMetrics = patch.onMetrics;
  }
  resetCounters() {
    this.reps = 0;
    this.startedAt = null;
    this.elapsedActiveMs = 0;
    this.lastRepAt = 0;
    this.qualityWindow = [];
    this.avgQuality = 0;
    this.lastRepQuality = null;
    this.lastRepConfidence = null;
    this.currentPhase = "idle";
    this.currentForm = null;
    this.troughInRep = 180;
    this.peakInRep = 0;
    this.sm.reset();
    this.landmarker.resetSmoother();
    this.lastAngle = 180;
    this.velocity = 0;
    this.velocityFiltered = 0;
    this.angleHistory = [];
    this.calibSamples = [];
    this.calibDone = false;
  }
  start() {
    if (this.running) return;
    this.running = true;
    this.lastTickAt = performance.now();
    this.lastInferenceAt = 0;
    this.loop(performance.now());
  }
  stop() {
    this.running = false;
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }
  destroy() {
    this.stop();
    this.landmarker.close();
  }
  getLastResult() {
    return this.lastResult;
  }
  bestSideAngle(lm, left, right) {
    var _a, _b, _c, _d, _e, _f;
    const al = angleFromLandmarks(lm, left[0], left[1], left[2]);
    const ar = angleFromLandmarks(lm, right[0], right[1], right[2]);
    const vl = Math.min(((_a = lm[left[0]]) == null ? void 0 : _a.visibility) ?? 0, ((_b = lm[left[1]]) == null ? void 0 : _b.visibility) ?? 0, ((_c = lm[left[2]]) == null ? void 0 : _c.visibility) ?? 0);
    const vr = Math.min(((_d = lm[right[0]]) == null ? void 0 : _d.visibility) ?? 0, ((_e = lm[right[1]]) == null ? void 0 : _e.visibility) ?? 0, ((_f = lm[right[2]]) == null ? void 0 : _f.visibility) ?? 0);
    if (vl > vr + 0.12) return al;
    if (vr > vl + 0.12) return ar;
    return (al + ar) / 2;
  }
  getPrimaryAngle(lm) {
    const d = this.def;
    const pa = d.primaryAngle;
    const name = pa.name;
    if (name === "knee") return this.bestSideAngle(lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]);
    if (name === "hipFlex" || name === "pike" || name === "hipLine") return this.bestSideAngle(lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
    if (name === "elbow") return this.bestSideAngle(lm, [LM.left_shoulder, LM.left_elbow, LM.left_wrist], [LM.right_shoulder, LM.right_elbow, LM.right_wrist]);
    return angleFromLandmarks(lm, pa.a, pa.b, pa.c);
  }
  primaryVisibility(lm) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
    const d = this.def;
    const pa = d.primaryAngle;
    const name = pa.name;
    if (name === "knee") {
      const vl = Math.min(((_a = lm[LM.left_hip]) == null ? void 0 : _a.visibility) ?? 0, ((_b = lm[LM.left_knee]) == null ? void 0 : _b.visibility) ?? 0, ((_c = lm[LM.left_ankle]) == null ? void 0 : _c.visibility) ?? 0);
      const vr = Math.min(((_d = lm[LM.right_hip]) == null ? void 0 : _d.visibility) ?? 0, ((_e = lm[LM.right_knee]) == null ? void 0 : _e.visibility) ?? 0, ((_f = lm[LM.right_ankle]) == null ? void 0 : _f.visibility) ?? 0);
      return Math.max(vl, vr);
    }
    if (name === "elbow") {
      const vl = Math.min(((_g = lm[LM.left_shoulder]) == null ? void 0 : _g.visibility) ?? 0, ((_h = lm[LM.left_elbow]) == null ? void 0 : _h.visibility) ?? 0, ((_i = lm[LM.left_wrist]) == null ? void 0 : _i.visibility) ?? 0);
      const vr = Math.min(((_j = lm[LM.right_shoulder]) == null ? void 0 : _j.visibility) ?? 0, ((_k = lm[LM.right_elbow]) == null ? void 0 : _k.visibility) ?? 0, ((_l = lm[LM.right_wrist]) == null ? void 0 : _l.visibility) ?? 0);
      return Math.max(vl, vr);
    }
    const v = Math.min(((_m = lm[pa.a]) == null ? void 0 : _m.visibility) ?? 0, ((_n = lm[pa.b]) == null ? void 0 : _n.visibility) ?? 0, ((_o = lm[pa.c]) == null ? void 0 : _o.visibility) ?? 0);
    return v;
  }
  computeSecondaryAngles(lm) {
    var _a;
    const out = {};
    for (const sa of ((_a = this.def) == null ? void 0 : _a.secondaryAngles) ?? []) {
      out[sa.name] = angleFromLandmarks(lm, sa.a, sa.b, sa.c);
    }
    return out;
  }
  updateTimers(now) {
    const dt = now - (this.lastTickAt || now);
    this.lastTickAt = now;
    if (this.startedAt) {
      if (this.currentPhase !== "idle") this.elapsedActiveMs += dt;
    }
  }
  emitMetrics() {
    var _a;
    (_a = this.onMetrics) == null ? void 0 : _a.call(this, this.metrics);
  }
}
class SpeechCoach {
  constructor(enabled = false, lang = "it", cooldownMs = 2800) {
    this.enabled = false;
    this.lang = "it";
    this.lastSpokeAt = 0;
    this.cooldownMs = 2800;
    this.queue = [];
    this.speaking = false;
    this.enabled = enabled;
    this.lang = lang;
    this.cooldownMs = cooldownMs;
    if (typeof window !== "undefined") {
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) this.cancel();
      });
    }
  }
  setEnabled(v) {
    this.enabled = v;
    if (!v) this.cancel();
  }
  setLang(l2) {
    this.lang = l2;
  }
  setCooldown(ms) {
    this.cooldownMs = ms;
  }
  canSpeak() {
    if (!this.enabled) return false;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    if (document.hidden) return false;
    if (performance.now() - this.lastSpokeAt < this.cooldownMs) return false;
    return true;
  }
  speak(text, opts) {
    if (!text) return;
    if (!(opts == null ? void 0 : opts.force) && !this.canSpeak()) {
      this.queue[this.queue.length ? 0 : 0] = text;
      if (this.queue.length > 2) this.queue.shift();
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = this.lang === "de" ? "de-DE" : this.lang === "en" ? "en-US" : "it-IT";
      u.rate = (opts == null ? void 0 : opts.rate) ?? 1;
      u.volume = 0.95;
      this.speaking = true;
      u.onend = () => {
        this.speaking = false;
        this.lastSpokeAt = performance.now();
        this.flushQueue();
      };
      u.onerror = () => {
        this.speaking = false;
        this.lastSpokeAt = performance.now();
      };
      window.speechSynthesis.speak(u);
      this.lastSpokeAt = performance.now();
    } catch {
    }
  }
  speakCue(cueKey, opts) {
    const text = localizedCue(cueKey, this.lang);
    this.speak(text, opts);
  }
  speakCount(count) {
    if (!this.canSpeak()) return;
    const t = this.lang === "it" ? `${count}` : this.lang === "de" ? `${count}` : `${count}`;
    this.speak(t, { rate: 1.15 });
  }
  flushQueue() {
    if (!this.enabled || this.speaking) return;
    const next = this.queue.shift();
    if (next && this.canSpeak()) this.speak(next);
  }
  cancel() {
    var _a;
    try {
      (_a = window.speechSynthesis) == null ? void 0 : _a.cancel();
    } catch {
    }
    this.speaking = false;
    this.queue = [];
  }
}
const POSE_CONNECTIONS = [
  [11, 12],
  // shoulders
  [11, 13],
  [13, 15],
  // left arm
  [12, 14],
  [14, 16],
  // right arm
  [11, 23],
  [12, 24],
  // torso sides
  [23, 24],
  // hips
  [23, 25],
  [25, 27],
  [27, 29],
  [29, 31],
  // left leg
  [24, 26],
  [26, 28],
  [28, 30],
  [30, 32],
  // right leg
  [27, 28]
  // ankles bridge (subtle)
];
function drawSkeleton(ctx, landmarks, width, height, opts = {}) {
  if (!landmarks || landmarks.length === 0) return;
  const { mirror = true, lineWidth = 2.5, pointRadius = 2.8, color = "#C1440E", jointColor = "#EDE8D8" } = opts;
  ctx.save();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = 0.95;
  ctx.beginPath();
  for (const [a, b] of POSE_CONNECTIONS) {
    const pa = landmarks[a], pb = landmarks[b];
    if (!pa || !pb) continue;
    const v = Math.min(pa.visibility ?? 1, pb.visibility ?? 1);
    if (v < 0.33) continue;
    const ax = (mirror ? 1 - pa.x : pa.x) * width;
    const ay = pa.y * height;
    const bx = (mirror ? 1 - pb.x : pb.x) * width;
    const by = pb.y * height;
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
  }
  ctx.stroke();
  ctx.fillStyle = jointColor;
  for (let i = 0; i < landmarks.length; i++) {
    const p2 = landmarks[i];
    if (!p2 || (p2.visibility ?? 1) < 0.35) continue;
    const isPrimary = [11, 12, 13, 14, 23, 24, 25, 26].includes(i);
    const r = isPrimary ? pointRadius * 1.25 : pointRadius;
    const x = (mirror ? 1 - p2.x : p2.x) * width;
    const y = p2.y * height;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    if (isPrimary) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  ctx.restore();
}
function drawAngleBadge(ctx, text, x, y) {
  const padX = 8;
  ctx.save();
  ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
  const w = ctx.measureText(text).width + padX * 2;
  const h = 18;
  ctx.fillStyle = "rgba(27,29,22,0.88)";
  ctx.strokeStyle = "rgba(74,82,51,0.9)";
  ctx.lineWidth = 1;
  const rx = 9;
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, rx);
  else {
    ctx.rect(x, y, w, h);
  }
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#EDE8D8";
  ctx.fillText(text, x + padX, y + 12.5);
  ctx.restore();
}
const IDEAL_READY = {
  squat: {
    [LM.nose]: { x: 0.5, y: 0.18 },
    [LM.left_shoulder]: { x: 0.42, y: 0.32 },
    [LM.right_shoulder]: { x: 0.58, y: 0.32 },
    [LM.left_elbow]: { x: 0.38, y: 0.5 },
    [LM.right_elbow]: { x: 0.62, y: 0.5 },
    [LM.left_wrist]: { x: 0.36, y: 0.62 },
    [LM.right_wrist]: { x: 0.64, y: 0.62 },
    [LM.left_hip]: { x: 0.44, y: 0.58 },
    [LM.right_hip]: { x: 0.56, y: 0.58 },
    [LM.left_knee]: { x: 0.44, y: 0.78 },
    [LM.right_knee]: { x: 0.56, y: 0.78 },
    [LM.left_ankle]: { x: 0.44, y: 0.96 },
    [LM.right_ankle]: { x: 0.56, y: 0.96 }
  },
  pushup: {
    // plank top position (lateral-ish, but frontal still shows)
    [LM.left_shoulder]: { x: 0.35, y: 0.45 },
    [LM.right_shoulder]: { x: 0.35, y: 0.45 },
    [LM.left_elbow]: { x: 0.35, y: 0.6 },
    [LM.right_elbow]: { x: 0.35, y: 0.6 },
    [LM.left_wrist]: { x: 0.35, y: 0.75 },
    [LM.right_wrist]: { x: 0.35, y: 0.75 },
    [LM.left_hip]: { x: 0.6, y: 0.48 },
    [LM.right_hip]: { x: 0.6, y: 0.48 },
    [LM.left_knee]: { x: 0.75, y: 0.55 },
    [LM.right_knee]: { x: 0.75, y: 0.55 },
    [LM.left_ankle]: { x: 0.88, y: 0.62 },
    [LM.right_ankle]: { x: 0.88, y: 0.62 },
    [LM.nose]: { x: 0.3, y: 0.38 }
  },
  crunch: {
    [LM.left_shoulder]: { x: 0.4, y: 0.65 },
    [LM.right_shoulder]: { x: 0.6, y: 0.65 },
    [LM.left_hip]: { x: 0.5, y: 0.75 },
    [LM.right_hip]: { x: 0.5, y: 0.75 },
    [LM.left_knee]: { x: 0.45, y: 0.6 },
    [LM.right_knee]: { x: 0.55, y: 0.6 }
  },
  plank: {
    [LM.left_shoulder]: { x: 0.3, y: 0.5 },
    [LM.right_shoulder]: { x: 0.3, y: 0.5 },
    [LM.left_hip]: { x: 0.6, y: 0.52 },
    [LM.right_hip]: { x: 0.6, y: 0.52 },
    [LM.left_ankle]: { x: 0.85, y: 0.58 },
    [LM.right_ankle]: { x: 0.85, y: 0.58 }
  }
};
function getIdeal(exerciseId) {
  return IDEAL_READY[exerciseId] ?? IDEAL_READY.squat;
}
const GHOST_CONNECTIONS = [
  [LM.left_shoulder, LM.right_shoulder],
  [LM.left_shoulder, LM.left_elbow],
  [LM.left_elbow, LM.left_wrist],
  [LM.right_shoulder, LM.right_elbow],
  [LM.right_elbow, LM.right_wrist],
  [LM.left_shoulder, LM.left_hip],
  [LM.right_shoulder, LM.right_hip],
  [LM.left_hip, LM.right_hip],
  [LM.left_hip, LM.left_knee],
  [LM.left_knee, LM.left_ankle],
  [LM.right_hip, LM.right_knee],
  [LM.right_knee, LM.right_ankle]
];
function alignmentScore(landmarks, exerciseId) {
  if (!landmarks) return 0;
  const ideal = getIdeal(exerciseId);
  let sum = 0, n2 = 0;
  for (const k2 in ideal) {
    const idx = Number(k2);
    const iv = ideal[idx];
    const lm = landmarks[idx];
    if (!lm || (lm.visibility ?? 0) < 0.25) continue;
    const ux = 1 - lm.x;
    const dx = ux - iv.x, dy = lm.y - iv.y;
    const d = Math.hypot(dx, dy);
    const s = Math.max(0, 1 - d * 3.2);
    sum += s;
    n2++;
  }
  return n2 ? sum / n2 : 0;
}
function PositioningMask({ exerciseId, landmarks, lang = "it", width = 640, height = 480 }) {
  const ideal = getIdeal(exerciseId);
  const score = alignmentScore(landmarks, exerciseId);
  const ready = score > 0.72;
  const label = lang === "de" ? "Positioniere dich in der Silhouette" : lang === "en" ? "Align to silhouette" : "Posizionati nella sagoma";
  const hint = lang === "de" ? "Ganzkörper im Bild · seitlich für Kniebeuge/Liegestütz" : lang === "en" ? "Full body in frame · side view for squat/pushup" : "Corpo intero in camera · laterale per squat/piegamenti";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width, height, viewBox: `0 0 ${width} ${height}`, style: { position: "absolute", inset: 0, width: "100%", height: "100%" }, children: [
      GHOST_CONNECTIONS.map(([a, b], i) => {
        const pa = ideal[a], pb = ideal[b];
        if (!pa || !pb) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: pa.x * width, y1: pa.y * height, x2: pb.x * width, y2: pb.y * height, stroke: ready ? "#7FB069" : KHAKI, strokeWidth: ready ? 4 : 3, strokeDasharray: ready ? void 0 : "8 6", opacity: 0.95, strokeLinecap: "round" }, i);
      }),
      Object.entries(ideal).map(([k2, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: v.x * width, cy: v.y * height, r: ready ? 7 : 5, fill: ready ? "#7FB069" : PAPER, stroke: ready ? "#7FB069" : KHAKI, strokeWidth: 2, opacity: 0.95 }, k2))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", background: ready ? "#7FB069" : BLAZE, color: PAPER, fontSize: 11, fontWeight: 700, padding: "6px 12px", borderRadius: 20, border: `1px solid ${ready ? "#7FB069" : BLAZE}`, boxShadow: "0 4px 12px rgba(0,0,0,0.35)", textAlign: "center", minWidth: 180 }, children: [
      ready ? lang === "de" ? "✓ Position OK — los!" : lang === "en" ? "✓ Aligned — go!" : "✓ Posizione OK — via!" : label,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 9, fontWeight: 400, opacity: 0.9, marginTop: 2 }, children: hint }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 4, background: "rgba(0,0,0,0.25)", borderRadius: 2, marginTop: 6, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: `${Math.round(score * 100)}%`, height: "100%", background: PAPER, transition: "width 0.2s" } }) })
    ] })
  ] });
}
class LandmarkRecorder {
  constructor() {
    this.frames = [];
    this.recording = false;
    this.startT = 0;
  }
  start() {
    this.frames = [];
    this.recording = true;
    this.startT = performance.now();
  }
  stop() {
    this.recording = false;
  }
  isRecording() {
    return this.recording;
  }
  push(landmarks) {
    if (!this.recording) return;
    this.frames.push({ t: Math.round(performance.now() - this.startT), landmarks: landmarks ? JSON.parse(JSON.stringify(landmarks)) : null });
    if (this.frames.length > 1200) this.frames.shift();
  }
  exportJson() {
    return JSON.stringify({ version: 1, created: (/* @__PURE__ */ new Date()).toISOString(), frames: this.frames }, null, 2);
  }
  download(filename = "landmarks.json") {
    const blob = new Blob([this.exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  load(json) {
    const data = JSON.parse(json);
    this.frames = data.frames ?? [];
  }
  *replay() {
    for (const f2 of this.frames) yield f2;
  }
  get count() {
    return this.frames.length;
  }
}
Object.values(EXERCISE_DEFINITIONS).map((d) => ({
  id: d.id,
  label: d.label.it + (d.id !== d.label.it.toLowerCase() ? ` · ${d.label.en}` : "")
})).sort((a, b) => a.label.localeCompare(b.label));
function fmtMs$1(ms) {
  const s = Math.floor(ms / 1e3);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}
function FitnessEngineView({ exercise = "squat", lang = "it", onClose, onRep, onDone }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const videoRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const engineRef = reactExports.useRef(null);
  const speechRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const [status, setStatus] = reactExports.useState("idle");
  const [error, setError] = reactExports.useState(null);
  const [exId, setExId] = reactExports.useState(() => normalizeExerciseId(exercise));
  const [metrics, setMetrics] = reactExports.useState(null);
  const [lastForm, setLastForm] = reactExports.useState(null);
  const [reps, setReps] = reactExports.useState(0);
  const [showSkeleton, setShowSkeleton] = reactExports.useState(true);
  const [debugMode, setDebugMode] = reactExports.useState(false);
  const [speechOn, setSpeechOn] = reactExports.useState(false);
  const [coachingText, setCoachingText] = reactExports.useState("");
  const [alignOkSince, setAlignOkSince] = reactExports.useState(null);
  const recorderRef = reactExports.useRef(null);
  const [recCount, setRecCount] = reactExports.useState(0);
  if (!recorderRef.current) recorderRef.current = new LandmarkRecorder();
  reactExports.useEffect(() => {
    speechRef.current = new SpeechCoach(speechOn, lang, 3e3);
    return () => {
      var _a2;
      return (_a2 = speechRef.current) == null ? void 0 : _a2.cancel();
    };
  }, []);
  reactExports.useEffect(() => {
    var _a2;
    (_a2 = speechRef.current) == null ? void 0 : _a2.setLang(lang);
  }, [lang]);
  reactExports.useEffect(() => {
    var _a2;
    (_a2 = speechRef.current) == null ? void 0 : _a2.setEnabled(speechOn);
  }, [speechOn]);
  reactExports.useEffect(() => {
    let raf = 0;
    let lastDrawAt = 0;
    const draw = (now) => {
      var _a2;
      raf = requestAnimationFrame(draw);
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const engine = engineRef.current;
      if (!canvas || !video || !engine) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (now - lastDrawAt < 22) return;
      lastDrawAt = now;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      try {
        if (video.readyState >= 2) ctx.drawImage(video, 0, 0, W, H);
      } catch {
      }
      const res = engine.getLastResult();
      const lm = (res == null ? void 0 : res.landmarks) ?? null;
      if ((_a2 = recorderRef.current) == null ? void 0 : _a2.isRecording()) {
        recorderRef.current.push(lm);
        if (Math.random() < 0.05) setRecCount(recorderRef.current.count);
      }
      if (showSkeleton && lm) {
        drawSkeleton(ctx, lm, W, H, { mirror: true, color: BLAZE, jointColor: PAPER });
      }
      if (lm && reps === 0 && ((metrics == null ? void 0 : metrics.currentPhase) === "ready" || (metrics == null ? void 0 : metrics.currentPhase) === "idle")) {
        const s = alignmentScore(lm, exId);
        if (s > 0.68) {
          if (alignOkSince == null) setAlignOkSince(performance.now());
        } else {
          if (alignOkSince != null) setAlignOkSince(null);
        }
      }
      if (lastForm) {
        const ang = Math.round(lastForm.primaryAngle);
        drawAngleBadge(ctx, `${ang}° · ${(metrics == null ? void 0 : metrics.currentPhase) ?? ""}`, 8, 10);
        const q2 = Math.round(lastForm.quality);
        const col = q2 > 75 ? "#7FB069" : q2 > 50 ? "#D4A017" : BLAZE;
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(W - 92, 10, 84, 10);
        ctx.fillStyle = col;
        ctx.fillRect(W - 92, 10, Math.round(84 * (q2 / 100)), 10);
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.lineWidth = 1;
        ctx.strokeRect(W - 92, 10, 84, 10);
      }
      if (res && res.visibilityScore < 0.35) {
        ctx.fillStyle = "rgba(193,68,14,0.92)";
        ctx.font = "11px ui-monospace, monospace";
        ctx.fillText("Move into frame", 10, H - 14);
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [showSkeleton, lastForm, metrics]);
  const startCamera = reactExports.useCallback(async () => {
    setError(null);
    setStatus("camera");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640, max: 640 }, height: { ideal: 480, max: 480 }, frameRate: { ideal: 30, max: 30 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {
        });
      }
      const nid = normalizeExerciseId(exId);
      const eng = new FitnessEngine({
        exerciseId: nid,
        lang,
        targetFps: 28,
        enableFiltering: true,
        enableSpeech: speechOn,
        onRep: (e) => {
          var _a2, _b2;
          setReps(e.repIndex);
          onRep == null ? void 0 : onRep(e, e.repIndex);
          if (speechOn) (_a2 = speechRef.current) == null ? void 0 : _a2.speakCount(e.repIndex);
          if (e.quality < 58 && e.cues[0]) {
            const txt = localizedCue(e.cues[0], lang);
            setCoachingText(txt);
            if (speechOn) (_b2 = speechRef.current) == null ? void 0 : _b2.speakCue(e.cues[0]);
          }
        },
        onPhaseChange: (phase, form) => {
          if (form) setLastForm(form);
          if (form && form.cues[0] && form.quality < 62) {
            const txt = localizedCue(form.cues[0], lang);
            setCoachingText(txt);
          } else if (form && form.quality > 80) {
            setCoachingText("");
          }
        },
        onMetrics: (m2) => setMetrics(m2)
      });
      engineRef.current = eng;
      setStatus("loading-model");
      await eng.init(videoRef.current);
      setStatus("ready");
      eng.start();
      setStatus("running");
    } catch (e) {
      const msg = (e == null ? void 0 : e.message) ?? String(e);
      const friendly = msg.includes("NotAllowedError") || msg.includes("Permission") ? lang === "it" ? "Permesso camera negato — consenti la camera e riprova (serve HTTPS)." : "Camera permission denied — allow camera and retry (HTTPS required)." : msg;
      setError(friendly);
      setStatus("error");
    }
  }, [exId, lang, speechOn, onRep]);
  reactExports.useEffect(() => {
    if (engineRef.current && status === "running") {
      const nid = normalizeExerciseId(exId);
      engineRef.current.updateExercise(nid);
      setReps(0);
    }
  }, [exId, status]);
  const stopAndCleanup = reactExports.useCallback(() => {
    var _a2, _b2;
    try {
      (_a2 = engineRef.current) == null ? void 0 : _a2.destroy();
    } catch {
    }
    engineRef.current = null;
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((t) => t.stop());
      } catch {
      }
      streamRef.current = null;
    }
    try {
      (_b2 = speechRef.current) == null ? void 0 : _b2.cancel();
    } catch {
    }
  }, []);
  reactExports.useEffect(() => () => {
    stopAndCleanup();
  }, [stopAndCleanup]);
  const handleClose = reactExports.useCallback(() => {
    const m2 = metrics;
    const summary = { reps, elapsedMs: (m2 == null ? void 0 : m2.elapsedMs) ?? 0, avgQuality: (m2 == null ? void 0 : m2.avgQuality) ?? 0 };
    if (reps > 0 || ((m2 == null ? void 0 : m2.elapsedMs) ?? 0) > 2e3) onDone == null ? void 0 : onDone(summary);
    stopAndCleanup();
    onClose == null ? void 0 : onClose();
  }, [metrics, reps, onDone, onClose, stopAndCleanup]);
  const def = getDefinition(exId) ?? getDefinition("squat");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 14, overflow: "hidden", boxShadow: "0 10px 36px rgba(0,0,0,0.55)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: INK, borderBottom: `1px solid ${OLIVE}55` }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, letterSpacing: "0.08em" }, children: [
          "AI ENGINE · ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: PAPER }, children: exId.toUpperCase() }),
          " · ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: status === "running" ? "#7FB069" : status === "error" ? BLAZE : STEEL }, children: status })
        ] }),
        (metrics == null ? void 0 : metrics.fps) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: [
          Math.round(metrics.fps),
          " FPS"
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setSpeechOn((v) => !v),
            title: speechOn ? "Voice coach ON" : "Voice coach OFF",
            style: { padding: "6px 8px", borderRadius: 20, border: `1px solid ${speechOn ? BLAZE : OLIVE}`, background: speechOn ? `${BLAZE}22` : INK, color: speechOn ? BLAZE : STEEL, fontSize: 11, cursor: "pointer" },
            children: [
              speechOn ? "🔊" : "🔈",
              " Coach"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowSkeleton((v) => !v),
            style: { padding: "6px 8px", borderRadius: 20, border: `1px solid ${OLIVE}`, background: showSkeleton ? `${OLIVE}33` : INK, color: showSkeleton ? KHAKI : STEEL, fontSize: 11, cursor: "pointer" },
            children: showSkeleton ? "◉ Skeleton" : "◎ Skeleton"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setDebugMode((v) => !v),
            style: { padding: "6px 8px", borderRadius: 20, border: `1px solid ${debugMode ? BLAZE : OLIVE}`, background: debugMode ? `${BLAZE}22` : INK, color: debugMode ? BLAZE : STEEL, fontSize: 11, cursor: "pointer" },
            title: "Debug: exercise/state/reps/form/pose/fps/angles",
            children: debugMode ? "◆ DEBUG" : "◇ DEBUG"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleClose,
            style: { padding: "6px 10px", borderRadius: 20, border: `1px solid ${OLIVE}`, background: INK, color: STEEL, fontSize: 11, cursor: "pointer" },
            children: "✕ Chiudi"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, padding: "8px 10px", overflowX: "auto", background: `${INK}F0`, borderBottom: `1px solid ${OLIVE}22` }, children: ["squat", "pushup", "crunch", "plank", "mountainclimber", "jumpingjack", "flutterkick", "bicyclecrunch", "legraise", "deadbug", "heeltap", "vup", "burpee", "affondo", "skater", "ginocchiaalte", "superman", "ponte", "russiantwist", "wallsit", "sideplank", "plankjack"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setExId(id),
        style: {
          flex: "0 0 auto",
          padding: "6px 10px",
          borderRadius: 20,
          fontSize: 11,
          cursor: "pointer",
          border: `1px solid ${exId === id ? BLAZE : OLIVE}`,
          background: exId === id ? BLAZE : INK,
          color: exId === id ? PAPER : STEEL
        },
        children: id
      },
      id
    )) }),
    (metrics == null ? void 0 : metrics.poseQuality) != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "0 12px", marginTop: 8, display: "flex", alignItems: "center", gap: 8, fontSize: 10 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: STEEL, minWidth: 90 }, children: [
        "POSE ",
        metrics.poseQuality ?? 0,
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, height: 6, background: `${OLIVE}55`, borderRadius: 3, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: `${Math.round(metrics.poseQuality ?? 0)}%`, height: "100%", background: (metrics.poseQuality ?? 0) > 70 ? "#7FB069" : (metrics.poseQuality ?? 0) > 45 ? "#D4A017" : BLAZE, transition: "width 0.2s" } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: (metrics.poseQuality ?? 0) < 45 ? BLAZE : STEEL, fontSize: 9 }, children: (metrics.poseQuality ?? 0) < 45 ? lang === "it" ? "Allontanati" : lang === "de" ? "Zurück" : "Move back" : (metrics.poseQuality ?? 0) > 75 ? "OK" : "—" })
    ] }),
    metrics != null && ((metrics == null ? void 0 : metrics.poseQuality) ?? 100) < 42 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { margin: "6px 12px 0", padding: "6px 8px", borderRadius: 8, background: `${BLAZE}1A`, border: `1px solid ${BLAZE}55`, color: PAPER, fontSize: 11, textAlign: "center" }, children: lang === "it" ? "Allontanati così vedo tutto il corpo." : lang === "de" ? "Geh zurück, damit ich deinen ganzen Körper sehe." : "Move back so I can see your whole body." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "10px 12px", background: INK }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: `${INK}CC`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: "10px 12px", textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: "REPS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: BLAZE, fontSize: 28, lineHeight: 1 }, children: reps }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 9 }, children: (metrics == null ? void 0 : metrics.currentPhase) ?? "—" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: `${INK}CC`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: "10px 12px", textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: "TIME" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 22, lineHeight: 1 }, children: fmtMs$1((metrics == null ? void 0 : metrics.elapsedMs) ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: [
          "active ",
          fmtMs$1((metrics == null ? void 0 : metrics.elapsedActiveMs) ?? 0)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: `${INK}CC`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: "10px 12px", textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: "QUALITY" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: ((metrics == null ? void 0 : metrics.avgQuality) ?? 0) > 70 ? "#7FB069" : ((metrics == null ? void 0 : metrics.avgQuality) ?? 0) > 50 ? "#D4A017" : BLAZE, fontSize: 22, lineHeight: 1 }, children: Math.round((metrics == null ? void 0 : metrics.avgQuality) ?? (lastForm == null ? void 0 : lastForm.quality) ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 9 }, children: "/100" })
      ] })
    ] }),
    coachingText ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "0 12px", padding: "8px 10px", borderRadius: 10, background: `${BLAZE}1A`, border: `1px solid ${BLAZE}55`, color: PAPER, fontSize: 12, display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 14 }, children: "💡" }),
      " ",
      coachingText
    ] }) : null,
    debugMode && metrics && lastForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "8px 12px 0", padding: "8px 10px", borderRadius: 10, background: `${INK_2}EE`, border: `1px solid ${OLIVE}66`, fontFamily: "ui-monospace, monospace", fontSize: 10, lineHeight: 1.5, color: PAPER }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px 14px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: KHAKI }, children: "EXERCISE:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: exId.toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: KHAKI }, children: "PHASE:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: BLAZE }, children: metrics.currentPhase.toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: KHAKI }, children: "REPS:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          reps,
          def && def.trackingSupported === false ? " (no AI)" : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: KHAKI }, children: "REP CONF:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          Math.round(metrics.lastRepConfidence ?? 0),
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: KHAKI }, children: "POSE:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          Math.round(metrics.poseQuality ?? 0),
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: KHAKI }, children: "FORM:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: Math.round(lastForm.quality) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: KHAKI }, children: "FPS:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: Math.round(metrics.fps) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px 14px", marginTop: 4 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: KHAKI }, children: "ANGLE:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          Math.round(lastForm.primaryAngle),
          "°"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: KHAKI }, children: "VEL:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          Math.round(lastForm.velocity),
          "°/s"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: KHAKI }, children: "DIR:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lastForm.direction }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: KHAKI }, children: "VIS:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          (lastForm.visibility * 100).toFixed(0),
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: KHAKI }, children: "REQ:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ((_a = def == null ? void 0 : def.requiredLandmarks) == null ? void 0 : _a.length) ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: KHAKI }, children: "DET:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ((_c = (_b = engineRef.current) == null ? void 0 : _b.getLastResult()) == null ? void 0 : _c.landmarks) ? "yes" : "no" })
      ] }),
      Object.keys(lastForm.secondaryAngles).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, marginTop: 4 }, children: [
        "secondary: ",
        Object.entries(lastForm.secondaryAngles).map(([k2, v]) => `${k2}:${Math.round(v)}°`).join(" · ")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, marginTop: 6 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          const r = recorderRef.current;
          if (r.isRecording()) {
            r.stop();
            setRecCount(r.count);
          } else {
            r.start();
            setRecCount(0);
          }
        }, style: { padding: "4px 8px", borderRadius: 6, border: `1px solid ${OLIVE}`, background: ((_d = recorderRef.current) == null ? void 0 : _d.isRecording()) ? BLAZE : INK, color: PAPER, fontSize: 10, cursor: "pointer" }, children: ((_e = recorderRef.current) == null ? void 0 : _e.isRecording()) ? `● REC ${recCount}` : "○ REC landmarks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          var _a2;
          return (_a2 = recorderRef.current) == null ? void 0 : _a2.download(`landmarks-${exId}-${Date.now()}.json`);
        }, disabled: (((_f = recorderRef.current) == null ? void 0 : _f.count) ?? 0) === 0, style: { padding: "4px 8px", borderRadius: 6, border: `1px solid ${OLIVE}`, background: INK, color: STEEL, fontSize: 10, cursor: "pointer", opacity: (((_g = recorderRef.current) == null ? void 0 : _g.count) ?? 0) === 0 ? 0.5 : 1 }, children: "↓ JSON" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: STEEL, fontSize: 9, alignSelf: "center" }, children: [
          recCount,
          " frames · replay offline without video"
        ] })
      ] })
    ] }),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: 12, padding: 14, borderRadius: 12, background: `${BLAZE}14`, border: `1px solid ${BLAZE}55`, color: BLAZE, fontSize: 12, lineHeight: 1.5 }, children: [
      error,
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 11 }, children: "Apri con HTTPS (richiesto da iOS per la camera). Consenti la camera quando il browser lo chiede." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 10 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        setError(null);
        setStatus("idle");
      }, style: { padding: "8px 14px", borderRadius: 10, border: `1px solid ${OLIVE}`, background: INK, color: PAPER, cursor: "pointer" }, children: "Riprova" }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", width: "100%", aspectRatio: "4/3", background: "#050608", overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "video",
        {
          ref: videoRef,
          autoPlay: true,
          muted: true,
          playsInline: true,
          "webkit-playsinline": "true",
          style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)", background: "#000" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "canvas",
        {
          ref: canvasRef,
          width: 640,
          height: 480,
          style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)", pointerEvents: "none" }
        }
      ),
      reps === 0 && status === "running" && ((metrics == null ? void 0 : metrics.currentPhase) === "ready" || (metrics == null ? void 0 : metrics.currentPhase) === "idle" || !metrics) && /* @__PURE__ */ jsxRuntimeExports.jsx(PositioningMask, { exerciseId: exId, landmarks: ((_i = (_h = engineRef.current) == null ? void 0 : _h.getLastResult()) == null ? void 0 : _i.landmarks) ?? null, lang, width: 640, height: 480 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", bottom: 8, left: 8, right: 8, display: "flex", justifyContent: "space-between", gap: 6, pointerEvents: "none" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { background: `${INK}DD`, color: KHAKI, fontSize: 10, padding: "4px 8px", borderRadius: 20, border: `1px solid ${OLIVE}55` }, children: lastForm ? `∠ ${Math.round(lastForm.primaryAngle)}° · v ${Math.round(lastForm.velocity)}°/s` : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { background: `${BLAZE}DD`, color: PAPER, fontSize: 10, padding: "4px 10px", borderRadius: 20 }, children: [
          (metrics == null ? void 0 : metrics.currentPhase) ?? "idle",
          " ",
          ((_j = metrics == null ? void 0 : metrics.currentForm) == null ? void 0 : _j.direction) ? `· ${metrics.currentForm.direction}` : ""
        ] })
      ] }),
      status === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(0,0,0,0.42)", backdropFilter: "blur(2px)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: startCamera,
          style: { padding: "16px 22px", borderRadius: 999, border: `2px solid ${PAPER}`, background: BLAZE, color: PAPER, fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.45)" },
          children: [
            "▶︎ Avvia camera · ",
            exId
          ]
        }
      ) }),
      (status === "camera" || status === "loading-model") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(0,0,0,0.55)", color: PAPER }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-loadbar", style: { width: 160, height: 6, margin: "0 auto 10px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { fontSize: 11, color: KHAKI }, children: status === "camera" ? "Avvio camera…" : "Carico modello AI (offline dopo il primo avvio)…" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "8px 12px", color: STEEL, fontSize: 11, lineHeight: 1.45, borderTop: `1px solid ${OLIVE}22` }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: KHAKI }, children: "● Client-side:" }),
      " nessun video caricato sul server. Modello MediaPipe su dispositivo, offline dopo cache PWA. ",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL }, children: "Inquadra tutto il corpo. Per squat/push-up: ripresa laterale. Plank: laterale. Crunch/V-up: laterale a terra." })
    ] })
  ] });
}
const CHANGELOG_VERSION = "2.8.4";
const CHANGELOG_STORAGE_KEY = `o40_changelog_${CHANGELOG_VERSION}`;
const COPY = {
  it: {
    badge: "NUOVO v2.8.4",
    title: "Sessione tracking — 7 fix in 1 giorno",
    subtitle: "v2.8.4 · 26 Agosto 2026 · Framing + pose + conteggio — 100% offline",
    intro: "Giornata intera di debug col replay dei tuoi landmarks reali: framing frontale che non blocca più, angoli stabili in side-view, blocco “idle” eliminato e bug root del conteggio risolto. Tutto verificato con i tuoi file landmarks-squat-*.json (0→7 rep).",
    groups: [
      {
        icon: "📐",
        title: "1. Framing frontale — caviglie non bloccano più",
        items: [
          "Problema: con la selfie-camera (FOV stretta) dovevi allontanarti troppo; se i piedi uscivano dal frame, il tracking si metteva in pausa per “pose bassa”.",
          "Fix: rimosso gate caviglie (27/28) da requiredLandmarks in 10 esercizi: squat, affondo, wallsit, pushup, legRaise, deadBug, flutterKick, mountainClimber, vUp, ponte",
          "Geometria invariata: l’angolo ginocchio/tronco usa ancora le caviglie quando visibili — tolto solo il blocco"
        ]
      },
      {
        icon: "👁️",
        title: "2. Side-view stabile — angolo bilaterale visibility-aware",
        items: [
          "Problema: 16/22 analyzer mediavano (sx+dx)/2 senza guardare la visibilità → in side-view il lato occluso (vis. bassa, stima “indovinata”) distorceva l’angolo",
          "Fix: nuovo helper bilateralJointAngle() — EMA visibilità α0.35 + isteresi 0.12 per cambio lato + hold ultimo lato buono",
          "Applicato a 16 esercizi, pulizia duplicate knee()/trunk() in squat/pushup + ricalcolo unico in legRaise/vUp"
        ]
      },
      {
        icon: "🔓",
        title: "3. “Resta in idle” — badge e hint corretti",
        items: [
          "Causa: FitnessEngine calcolava POSE% con lista generica (con caviglie) anche quando l’analyzer ne usava una ridotta + banner “Allontanati” nascosto proprio in idle (condizione invertita)",
          "Fix: POSE% ora usa analyzer.requiredLandmarks; rimossa condizione currentPhase!=idle in SessionAIOverlay + FitnessEngineView",
          "Estese le caviglie rimosse ad altri 6 a terra (vedi sopra) — risolto lo stesso gate anche lì"
        ]
      },
      {
        icon: "🐛",
        title: "4. Bug root: STANDING/TOP senza uscita → conteggio bloccato",
        items: [
          "Trovato col replay landmarks reali (1200 frame): un colpo a vuoto iniziale lasciava phase=STANDING per sempre — reset a READY solo su rep riuscita",
          "Stesso schema in 7 analyzer: squat(STANDING), pushup(TOP), crunch(EXTENDED), legRaise(DOWN), vUp(EXTENDED), ponte(DOWN), affondo(STANDING)",
          "Fix: reset a READY + azimuth trough/peak anche su rep non contata — prima 0 rep, dopo 7 rep sugli stessi dati + test regressione"
        ]
      },
      {
        icon: "📏",
        title: "5. Squat — hipY calibrato per sessione",
        items: [
          "Problema: soglia fissa hipY 0.55 per “sei abbastanza vicino” non adatta a tutte le altezze/distances",
          "Fix: calibrazione hipY nei primi 300ms della sessione (media dei frame iniziali) invece di soglia fissa",
          "Elimina flicker di fase spurio a inizio sessione"
        ]
      },
      {
        icon: "🔍",
        title: "6. Diagnostica + fix DEBUG",
        items: [
          "Nuovo badge CONF live nell’HUD (repConfidence) per capire al volo se la rep è “scarsa” o “bloccata”",
          "Fix crash pannello ◇ DEBUG: ReferenceError INK_2 (colore non importato) → app non crasha più aprendo AI ENGINE",
          "LandmarkRecorder ◯ REC → landmarks-*.json: il replay offline è il modo più rapido per replicare un bug reale"
        ]
      },
      {
        icon: "⚡",
        title: "7. Affinamento 22 esercizi (mattina)",
        items: [
          "Loop 10 giri perfezionamento: squat/pushup/affondo soglie shallow, PoseQuality 38 side-view, hold grace 500ms, normalizzazione torsoLength",
          "Burpee/jumpingJack adaptive + jitter 28fps stabilizzato — harness 7/7 PASS, 22/22 smoke OK"
        ]
      }
    ],
    cta: "PROVA ORA",
    ctaHint: "Home → Missione → Avvia · verifica su https://mikweb.eu/operator40/ con iPhone frontale",
    dismiss: "Non mostrare più",
    close: "Chiudi",
    footer: "Tutto on-device (IndexedDB, MediaPipe mai su server). Per replay: ◯ REC durante sessione → ↓ JSON → test analyzer. Docs completi in docs/FIX-tracking-2026-08-26.md"
  },
  en: {
    badge: "NEW v2.8.4",
    title: "Tracking session — 7 fixes in one day",
    subtitle: "v2.8.4 · Aug 26 2026 · Framing + pose + counting — 100% offline",
    intro: "Your personal coach now sees you, counts and corrects — all on your phone, no video uploaded.",
    groups: [
      {
        icon: "🧠",
        title: "On-device AI engine",
        items: [
          "Google MediaPipe Tasks Vision — Pose Landmarker Lite (GPU on iPhone, CPU fallback)",
          "33 landmarks in real time, no video upload (100% private)",
          "PWA optimized: iOS Safari 16.4+ & Android Chrome, works offline after first load"
        ]
      },
      {
        icon: "🏋️",
        title: "13 exercises with joint analysis",
        items: [
          "Push-up, squat, crunch, plank, mountain climber, jumping jack, flutter kicks, bicycle crunch, leg raise, dead bug, heel taps, V-up, burpee",
          "Real-time angles: knee, elbow, hip, trunk",
          "Direction & velocity (°/s) to tell control from momentum"
        ]
      },
      {
        icon: "🔁",
        title: "Rep counting + smart timer",
        items: [
          "Configurable state machine: idle → ready → down → bottom → up → rep_completed",
          "Hysteresis band (5-12°) + dwell times (120-340 ms) — zero double counts",
          "Timer starts on first motion, tracks total & active time (excludes idle)"
        ]
      },
      {
        icon: "⭐",
        title: "Quality Score 0-100 & coaching",
        items: [
          "Per-rep: form 55% + ROM 30% + velocity 15% → 5-rep moving avg",
          "Live cues: “Keep your back straight”, “Knees over toes”, “Elbows at 45°”, “Core tight”",
          "Localized it / en / de + haptic buzz on rep"
        ]
      },
      {
        icon: "〰️",
        title: "Filters & performance",
        items: [
          "One Euro Filter per landmark (x,y) — jitter gone without lag (lighter than Kalman)",
          "requestAnimationFrame + throttled inference 28 fps (auto 22 if hot) → battery saved",
          "Clean TypeScript: FitnessEngine, PoseLandmarkerManager, LandmarkSmoother, SpeechCoach"
        ]
      },
      {
        icon: "🎤",
        title: "Voice coach + skeleton overlay",
        items: [
          "Optional speech synthesis throttled 3 s — announces reps & fixes",
          "Mirrored canvas skeleton + angle badge + quality bar + FPS",
          "HUD: REPS / TIME / QUALITY + live exercise switcher"
        ]
      }
    ],
    cta: "TRY IT",
    ctaHint: "Home → Count squat (camera) · or from any mission",
    dismiss: "Don't show again",
    close: "Close",
    footer: "Everything runs on-device. For 100% offline, copy wasm + model to public/wasm (see docs/ENGINE.md)."
  },
  de: {
    badge: "NEU v2.8.4",
    title: "Tracking-Session — 7 Fixes an einem Tag",
    subtitle: "v2.8.4 · 26. Aug 2026 · Framing + Pose + Zählung — 100% offline",
    intro: "Dein persönlicher Coach sieht dich jetzt, zählt und korrigiert — alles auf dem Handy, kein Video-Upload.",
    groups: [
      {
        icon: "🧠",
        title: "On-Device KI-Engine",
        items: [
          "Google MediaPipe Tasks Vision — Pose Landmarker Lite (GPU auf dem iPhone, CPU-Fallback)",
          "33 Landmarks in Echtzeit, kein Video-Upload (100% privat)",
          "PWA-optimiert: iOS Safari 16.4+ & Android Chrome, offline nach dem ersten Laden"
        ]
      },
      {
        icon: "🏋️",
        title: "13 Übungen mit Gelenkanalyse",
        items: [
          "Liegestütz, Kniebeuge, Crunch, Plank, Mountain Climber, Jumping Jack, Flutter Kicks, Bicycle Crunch, Beinheben, Dead Bug, Heel Taps, V-Up, Burpee",
          "Echtzeit-Winkel: Knie, Ellbogen, Hüfte, Rumpf",
          "Richtung & Geschwindigkeit (°/s) für Kontrolle vs. Schwung"
        ]
      },
      {
        icon: "🔁",
        title: "Wiederholungszählung + Smart-Timer",
        items: [
          "Konfigurierbare State Machine: idle → ready → down → bottom → up → rep_completed",
          "Hysterese (5-12°) + Verweilzeiten (120-340 ms) — keine Doppelzählungen",
          "Timer startet bei erster Bewegung, trackt Gesamt- & Aktivzeit"
        ]
      },
      {
        icon: "⭐",
        title: "Quality Score 0-100 & Coaching",
        items: [
          "Pro Rep: Form 55% + ROM 30% + Geschwindigkeit 15% → 5-Rep-Durchschnitt",
          "Live-Hinweise: „Rücken gerade halten“, „Knie über Fußspitzen“, „Ellbogen 45°“",
          "Lokalisiert it / en / de + Vibration bei Rep"
        ]
      },
      {
        icon: "〰️",
        title: "Filter & Performance",
        items: [
          "One Euro Filter pro Landmark (x,y) — Zittern weg ohne Lag (leichter als Kalman)",
          "requestAnimationFrame + gedrosselte Inferenz 28 fps (auto 22 bei Hitze) → Akku gespart",
          "Sauberes TypeScript: FitnessEngine, PoseLandmarkerManager, LandmarkSmoother"
        ]
      },
      {
        icon: "🎤",
        title: "Voice-Coach + Skelett-Overlay",
        items: [
          "Optionale Sprachsynthese gedrosselt 3 s — sagt Reps & Korrekturen an",
          "Gespiegeltes Skelett + Winkel-Badge + Qualitätsbalken + FPS",
          "HUD: REPS / TIME / QUALITY + Live-Übungswechsel"
        ]
      }
    ],
    cta: "TESTEN",
    ctaHint: "Home → Squat zählen (Kamera)",
    dismiss: "Nicht mehr anzeigen",
    close: "Schließen",
    footer: "Alles läuft on-device. Für 100% offline: wasm + Modell nach public/wasm kopieren (docs/ENGINE.md)."
  }
};
function ChangelogModal({ lang = "it", onClose, onTry }) {
  const l2 = ["it", "en", "de"].includes(lang) ? lang : "it";
  const c = COPY[l2];
  React.useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  function handleDismissForever() {
    try {
      localStorage.setItem(CHANGELOG_STORAGE_KEY, "dismissed");
    } catch {
    }
    onClose();
  }
  function handleClose() {
    try {
      localStorage.setItem(CHANGELOG_STORAGE_KEY, "seen");
    } catch {
    }
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "o40-changelog-mask",
      onClick: handleClose,
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(5,6,8,0.78)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: (e) => e.stopPropagation(),
          style: {
            width: "min(560px, 96vw)",
            maxHeight: "90vh",
            overflow: "hidden",
            background: `linear-gradient(180deg, ${INK_2} 0%, ${INK} 100%)`,
            border: `1px solid ${OLIVE}`,
            borderRadius: 18,
            boxShadow: "0 20px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(193,68,14,0.14) inset",
            display: "flex",
            flexDirection: "column"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "18px 18px 12px", borderBottom: `1px solid ${OLIVE}33`, position: "relative", overflow: "hidden" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, opacity: 0.08, background: `repeating-linear-gradient(90deg, ${OLIVE} 0 1px, transparent 1px 14px)` } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 12, alignItems: "center" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, display: "grid", placeItems: "center", boxShadow: `0 6px 18px ${BLAZE}66`, flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles$1, { size: 22, color: PAPER }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { background: BLAZE, color: PAPER, fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", padding: "2px 6px", borderRadius: 6 }, children: c.badge }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: STEEL, fontSize: 10 }, children: [
                        CHANGELOG_VERSION,
                        " · AI ENGINE"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 22, lineHeight: 1, marginTop: 4 }, children: c.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, letterSpacing: "0.06em", marginTop: 2 }, children: c.subtitle })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleClose, "aria-label": "Close", style: { width: 32, height: 32, borderRadius: "50%", border: `1px solid ${OLIVE}`, background: INK, color: STEEL, display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "relative", marginTop: 10, color: KHAKI, fontSize: 12.5, lineHeight: 1.5, background: `${INK}AA`, border: `1px solid ${OLIVE}44`, borderRadius: 10, padding: "8px 10px" }, children: c.intro })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }, children: [
              c.groups.map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK, border: `1px solid ${OLIVE}55`, borderRadius: 12, padding: "12px 12px", display: "flex", gap: 10 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 18, lineHeight: 1, flexShrink: 0, marginTop: 1 }, children: g.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: PAPER, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }, children: g.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: { margin: "6px 0 0", paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }, children: g.items.map((it, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { style: { color: KHAKI, fontSize: 11.5, lineHeight: 1.45 }, children: it }, j)) })
                ] })
              ] }, i)),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: `${BLAZE}12`, border: `1px dashed ${BLAZE}55`, borderRadius: 10, padding: "10px 12px", color: STEEL, fontSize: 10.5, lineHeight: 1.4 }, children: c.footer })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px 14px", borderTop: `1px solid ${OLIVE}33`, background: INK_2, display: "flex", flexDirection: "column", gap: 8 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => {
                    handleClose();
                    if (onTry) setTimeout(onTry, 150);
                  },
                  style: {
                    flex: 1,
                    background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`,
                    color: PAPER,
                    border: "none",
                    borderRadius: 12,
                    padding: "12px 14px",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 16,
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    boxShadow: `0 6px 18px ${BLAZE}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 16 }),
                    " ",
                    c.cta,
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { opacity: 0.9 }, children: "→" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9, textAlign: "center" }, children: c.ctaHint }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, justifyContent: "center" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleDismissForever, style: { background: "transparent", border: `1px solid ${OLIVE}`, color: STEEL, borderRadius: 20, padding: "6px 12px", fontSize: 11, cursor: "pointer" }, children: c.dismiss }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleClose, style: { background: INK, border: `1px solid ${OLIVE}`, color: KHAKI, borderRadius: 20, padding: "6px 14px", fontSize: 11, fontWeight: 600, cursor: "pointer" }, children: c.close })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
const FALLBACK = "en";
function normalizeLang(input) {
  if (!input) return detectLang() || FALLBACK;
  const base = input.split("-")[0].toLowerCase();
  if (LANGS.includes(base)) return base;
  if (["fr", "de", "it", "en"].includes(base)) return base;
  return FALLBACK;
}
const COACH_I18N = {
  // Form corrections
  "coach.backStraight": { it: "Tieni la schiena dritta!", en: "Keep your back straight!", de: "Halte deinen Rücken gerade!", fr: "Tiens le dos droit !" },
  "coach.goLower": { it: "Scendi ancora!", en: "Go lower!", de: "Geh tiefer!", fr: "Descends plus bas !" },
  "coach.extendArms": { it: "Braccia completamente distese!", en: "Fully extend your arms!", de: "Arme ganz strecken!", fr: "Tends complètement les bras !" },
  "coach.extendLegs": { it: "Distendi le gambe!", en: "Fully extend your legs!", de: "Beine ganz strecken!", fr: "Tends complètement les jambes !" },
  "coach.control": { it: "Controlla il movimento.", en: "Control the movement.", de: "Kontrolliere die Bewegung.", fr: "Contrôle le mouvement." },
  "coach.hipsStable": { it: "Tieni il bacino stabile.", en: "Keep your hips stable.", de: "Halte die Hüften stabil.", fr: "Garde les hanches stables." },
  "coach.kneesOverToes": { it: "Ginocchia sopra le punte.", en: "Knees over toes.", de: "Knie über den Zehen.", fr: "Genoux au-dessus des orteils." },
  "coach.coreTight": { it: "Addome contratto!", en: "Tighten your core!", de: "Core anspannen!", fr: "Gaine les abdos !" },
  "coach.steady": { it: "Ritmo costante.", en: "Steady rhythm.", de: "Gleichmäßiges Tempo.", fr: "Rythme régulier." },
  "coach.slowDown": { it: "Rallenta un po’.", en: "Slow down.", de: "Langsamer.", fr: "Ralentis." },
  "coach.breathe": { it: "Respira!", en: "Breathe!", de: "Atmen!", fr: "Respire !" },
  // Rep / quality praise
  "coach.good": { it: "Bene!", en: "Good!", de: "Gut!", fr: "Bien !" },
  "coach.perfect": { it: "Perfetto!", en: "Perfect!", de: "Perfekt!", fr: "Parfait !" },
  "coach.excellentRep": { it: "Ripetizione eccellente!", en: "Excellent repetition!", de: "Ausgezeichnete Wiederholung!", fr: "Excellente répétition !" },
  "coach.almostThere": { it: "Ci sei quasi!", en: "Almost there!", de: "Fast geschafft!", fr: "Presque arrivé !" },
  // Motivation
  "coach.greatJob": { it: "Grande lavoro! Continua così!", en: "Great job! Keep going!", de: "Großartige Arbeit! Weiter so!", fr: "Excellent travail ! Continue !" },
  "coach.threeMore": { it: "Ancora tre!", en: "Only three more!", de: "Nur noch drei!", fr: "Encore trois !" },
  "coach.twoMore": { it: "Dai! Ancora due!", en: "Come on! Two more!", de: "Komm schon! Noch zwei!", fr: "Allez ! Encore deux !" },
  "coach.oneMore": { it: "ULTIMO! Dai tutto!", en: "ONE MORE! Give it everything!", de: "LETZTE! Gib alles!", fr: "DERNIÈRE ! Donne tout !" },
  "coach.missionComplete": { it: "Missione compiuta! Lavoro eccellente!", en: "Mission complete! Excellent work!", de: "Mission abgeschlossen! Ausgezeichnet!", fr: "Mission accomplie ! Excellent travail !" },
  "coach.ready": { it: "Pronto? Inizia quando vuoi.", en: "Ready? Start when you are.", de: "Bereit? Starte wenn du willst.", fr: "Prêt ? Démarre quand tu veux." },
  "coach.holdPosition": { it: "Mantieni la posizione...", en: "Hold the position...", de: "Position halten...", fr: "Garde la position..." },
  "coach.moveIntoFrame": { it: "Entra nell’inquadratura.", en: "Move into frame.", de: "Komm ins Bild.", fr: "Place-toi dans le cadre." },
  "coach.poseQuality": { it: "Qualità posa", en: "Pose quality", de: "Pose-Qualität", fr: "Qualité pose" },
  "coach.moveBack": { it: "Allontanati così vedo tutto il corpo.", en: "Move back so I can see your whole body.", de: "Geh zurück, damit ich deinen ganzen Körper sehe.", fr: "Recule pour que je voie tout le corps." },
  "coach.feetOutside": { it: "Piedi fuori dall’inquadratura.", en: "Your feet are outside the camera.", de: "Füße außerhalb des Bildes.", fr: "Pieds hors du cadre." },
  "coach.turnSideways": { it: "Girati di lato.", en: "Turn sideways.", de: "Dreh dich seitlich.", fr: "Tourne-toi de côté." },
  "coach.upperBodyHidden": { it: "Non vedo la parte superiore del corpo.", en: "I can't see your upper body.", de: "Oberkörper nicht sichtbar.", fr: "Je ne vois pas le haut du corps." },
  // Misc
  "coach.rep": { it: "Ripetizione", en: "Rep", de: "Wdh", fr: "Rép" },
  "coach.time": { it: "Tempo", en: "Time", de: "Zeit", fr: "Temps" },
  "coach.form": { it: "Forma", en: "Form", de: "Form", fr: "Forme" },
  "coach.status.good": { it: "Buona forma", en: "Good form", de: "Gute Form", fr: "Bonne forme" },
  "coach.status.fix": { it: "Correggi", en: "Fix form", de: "Korrigieren", fr: "Corrige" }
};
function tCoach(key, lang) {
  const l2 = normalizeLang(lang);
  const entry = COACH_I18N[key];
  if (!entry) return key;
  return entry[l2] ?? entry.en ?? key;
}
class CoachEngine {
  constructor(opts = {}) {
    this.lastSpokeByKey = /* @__PURE__ */ new Map();
    this.lastGeneralSpeak = 0;
    this.queue = [];
    this.lang = normalizeLang(opts.lang);
    this.enableVoice = !!opts.enableVoice;
    this.cooldownMs = opts.cooldownMs ?? 2800;
  }
  setLang(lang) {
    this.lang = normalizeLang(lang);
  }
  setVoiceEnabled(v) {
    this.enableVoice = v;
    if (!v) this.cancelSpeech();
  }
  /** Decide feedback based on priority. Called each frame where form is available. */
  decideFeedback(params) {
    const { formQuality, cues, reps, targetReps, isHold } = params;
    if (formQuality < 58 && cues[0]) {
      const cue = cues[0];
      const key = cueToCoachKey(cue);
      if (key && this.canSpeakKey(key)) {
        return { text: key ? tCoach(key, this.lang) : localizedCue(cue, this.lang), priority: 1, cueKey: key ?? cue };
      }
      if (cues.length) return { text: localizedCue(cue, this.lang), priority: 1, cueKey: cue };
    }
    if (cues.includes("scendiAncora") || cues.includes("distendiBraccia") || cues.includes("distendiGambe")) {
      const k2 = cues.find((c) => ["scendiAncora", "distendiBraccia", "distendiGambe"].includes(c));
      if (k2 && this.canSpeakKey(k2)) {
        return { text: localizedCue(k2, this.lang), priority: 2, cueKey: k2 };
      }
    }
    if (targetReps && reps >= 0) {
      const remaining = targetReps - reps;
      if (remaining === 0 && reps > 0) ;
      else if (remaining === 1) {
        if (this.canSpeakKey("oneMore")) return { text: tCoach("coach.oneMore", this.lang), priority: 3, cueKey: "oneMore" };
      } else if (remaining === 2) {
        if (this.canSpeakKey("twoMore")) return { text: tCoach("coach.twoMore", this.lang), priority: 3, cueKey: "twoMore" };
      } else if (remaining === 3) {
        if (this.canSpeakKey("threeMore")) return { text: tCoach("coach.threeMore", this.lang), priority: 3, cueKey: "threeMore" };
      }
    }
    if (formQuality > 75 && reps > 0 && reps % 5 === 0) {
      if (this.canSpeakKey("greatJob")) return { text: tCoach("coach.greatJob", this.lang), priority: 4, cueKey: "greatJob" };
    }
    return { text: null, priority: 99 };
  }
  /** Motivation tick outside per-frame: call when reps increment or timer milestones */
  motivationForRep(reps, targetReps, quality) {
    if (!targetReps) {
      if (reps > 0 && reps % 6 === 0 && (quality ?? 100) > 65) return tCoach("coach.greatJob", this.lang);
      return null;
    }
    const remaining = targetReps - reps;
    if (remaining === 3) return tCoach("coach.threeMore", this.lang);
    if (remaining === 2) return tCoach("coach.twoMore", this.lang);
    if (remaining === 1) return tCoach("coach.oneMore", this.lang);
    if (remaining === 0) return tCoach("coach.missionComplete", this.lang);
    if (reps > 0 && reps % 5 === 0 && (quality ?? 70) > 72) return tCoach("coach.greatJob", this.lang);
    if (reps === 1 && (quality ?? 0) > 80) return tCoach("coach.good", this.lang);
    return null;
  }
  canSpeakKey(key) {
    const last = this.lastSpokeByKey.get(key) ?? 0;
    return performance.now() - last > this.cooldownMs;
  }
  markSpoken(key) {
    this.lastSpokeByKey.set(key, performance.now());
    this.lastGeneralSpeak = performance.now();
  }
  // ---- SpeechManager (Web Speech API) ----
  speak(text, opts = {}) {
    if (!text) return;
    if (!this.enableVoice) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (!opts.force && opts.key && !this.canSpeakKey(opts.key)) return;
    if (!opts.force && performance.now() - this.lastGeneralSpeak < 1100) {
      if (this.queue.length < 2) this.queue.push(text);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = this.lang === "de" ? "de-DE" : this.lang === "fr" ? "fr-FR" : this.lang === "it" ? "it-IT" : "en-US";
      u.rate = opts.rate ?? 1;
      u.volume = 0.95;
      u.onend = () => {
        if (opts.key) this.markSpoken(opts.key);
        this.lastGeneralSpeak = performance.now();
        const nxt = this.queue.shift();
        if (nxt) setTimeout(() => this.speak(nxt, { force: true }), 250);
      };
      u.onerror = () => {
        if (opts.key) this.markSpoken(opts.key);
      };
      window.speechSynthesis.speak(u);
      if (opts.key) this.markSpoken(opts.key);
      this.lastGeneralSpeak = performance.now();
    } catch {
    }
  }
  speakKey(coachKey, fallbackCue) {
    const text = COACH_KEY_EXISTS(coachKey) ? tCoach(coachKey, this.lang) : fallbackCue ? localizedCue(fallbackCue, this.lang) : coachKey;
    this.speak(text, { key: coachKey });
  }
  cancelSpeech() {
    var _a;
    try {
      (_a = window.speechSynthesis) == null ? void 0 : _a.cancel();
    } catch {
    }
    this.queue = [];
  }
}
function cueToCoachKey(cue) {
  const map = {
    backStraight: "coach.backStraight",
    scendiAncora: "coach.goLower",
    distendiBraccia: "coach.extendArms",
    distendiGambe: "coach.extendLegs",
    coreTight: "coach.coreTight",
    control: "coach.control",
    steady: "coach.steady",
    kneesOverToes: "coach.kneesOverToes",
    elbows45: "coach.extendArms",
    hipsUp: "coach.hipsStable"
  };
  return map[cue] ?? null;
}
function COACH_KEY_EXISTS(k2) {
  return k2.startsWith("coach.");
}
function exerciseFromPhase(phase, lang = "it", levelKey = "combattente") {
  var _a, _b;
  if (!phase || !phase.exerciseId) return null;
  const rawId = phase.exerciseId;
  const nid = normalizeExerciseId(rawId);
  const def = getDefinition(nid) ?? null;
  const trackingSupported = !!def && def.trackingSupported !== false;
  const hold = HOLD_EXERCISES$1.has(rawId) || !!(def == null ? void 0 : def.isHold);
  const reps = phase.reps ?? (!hold ? getReps$1(rawId, levelKey) : null);
  return {
    exerciseId: nid,
    originalId: rawId,
    definition: def,
    trackingSupported,
    targetReps: reps,
    targetDurationMs: hold ? phase.duration != null ? phase.duration * 1e3 : 40 * 1e3 : null,
    isTimeBased: hold || reps == null,
    isHold: hold,
    label: ((_b = (_a = EXERCISES[rawId]) == null ? void 0 : _a.name) == null ? void 0 : _b[lang]) ?? nid
  };
}
function fmtMs(ms) {
  const s = Math.floor(ms / 1e3);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
function SessionAIOverlay({ phase, lang = "it", levelKey = "combattente", onRep, onCompletePhase, onFormUpdate, aiEnabled = true, compact = false }) {
  var _a, _b, _c, _d, _e;
  const videoRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const engineRef = reactExports.useRef(null);
  const coachRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const [status, setStatus] = reactExports.useState("idle");
  const [error, setError] = reactExports.useState(null);
  const [metrics, setMetrics] = reactExports.useState(null);
  const [coachingText, setCoachingText] = reactExports.useState("");
  const [reps, setReps] = reactExports.useState(0);
  const [alignOkSince, setAlignOkSince] = reactExports.useState(null);
  const missionEx = exerciseFromPhase(phase, lang, levelKey);
  const trackingSupported = (missionEx == null ? void 0 : missionEx.trackingSupported) !== false && ((_a = missionEx == null ? void 0 : missionEx.definition) == null ? void 0 : _a.trackingSupported) !== false;
  const targetReps = (missionEx == null ? void 0 : missionEx.targetReps) ?? (phase == null ? void 0 : phase.reps) ?? null;
  const isHold = !!(missionEx == null ? void 0 : missionEx.isHold);
  const exerciseId = (missionEx == null ? void 0 : missionEx.exerciseId) ?? (phase == null ? void 0 : phase.exerciseId) ?? "squat";
  if (!coachRef.current) coachRef.current = new CoachEngine({ lang, enableVoice: true, cooldownMs: 2600 });
  reactExports.useEffect(() => {
    var _a2;
    (_a2 = coachRef.current) == null ? void 0 : _a2.setLang(lang);
  }, [lang]);
  reactExports.useEffect(() => {
    let cancelled = false;
    async function start() {
      if (!aiEnabled) return;
      setStatus("camera");
      setError(null);
      setReps(0);
      setMetrics(null);
      setCoachingText("");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640, max: 640 }, height: { ideal: 480, max: 480 }, frameRate: { ideal: 30, max: 30 } },
          audio: false
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {
          });
        }
        if (cancelled) return;
        setStatus("loading");
        const eng = new FitnessEngine({
          exerciseId,
          lang,
          targetFps: 28,
          enableFiltering: true,
          enableSpeech: false,
          // we handle speech via CoachEngine
          onRep: (evt) => {
            var _a2, _b2, _c2;
            setReps(evt.repIndex);
            onRep == null ? void 0 : onRep(evt.repIndex, evt);
            const mot = (_a2 = coachRef.current) == null ? void 0 : _a2.motivationForRep(evt.repIndex, targetReps, evt.quality);
            if (mot) {
              setCoachingText(mot);
              (_b2 = coachRef.current) == null ? void 0 : _b2.speak(mot, { key: `mot-${evt.repIndex}`, rate: 1.05 });
            } else if (evt.quality > 80) {
              const praise = tCoach("coach.good", lang);
              setCoachingText(praise);
            }
            if (targetReps && evt.repIndex >= targetReps) {
              const m2 = eng.metrics;
              setTimeout(() => onCompletePhase == null ? void 0 : onCompletePhase({ reps: evt.repIndex, elapsedMs: m2.elapsedMs, avgQuality: m2.avgQuality }), 650);
              (_c2 = coachRef.current) == null ? void 0 : _c2.speak(tCoach("coach.missionComplete", lang), { key: "missionComplete", rate: 0.95 });
            }
          },
          onPhaseChange: (ph, form) => {
            var _a2, _b2;
            if (!form) return;
            onFormUpdate == null ? void 0 : onFormUpdate(form.quality, form.quality > 68 ? tCoach("coach.status.good", lang) : tCoach("coach.status.fix", lang));
            const fb = (_a2 = coachRef.current) == null ? void 0 : _a2.decideFeedback({
              phase: ph,
              formQuality: form.quality,
              cues: form.cues,
              velocity: form.velocity,
              reps,
              targetReps,
              elapsedMs: eng.metrics.elapsedMs,
              isHold
            });
            if (fb == null ? void 0 : fb.text) {
              setCoachingText(fb.text);
              if (fb.priority <= 2) (_b2 = coachRef.current) == null ? void 0 : _b2.speak(fb.text, { key: fb.cueKey ?? "form", rate: 1 });
            }
          },
          onMetrics: (m2) => {
            setMetrics(m2);
            if (isHold && targetReps == null && (phase == null ? void 0 : phase.duration)) {
              const targetMs = phase.duration * 1e3;
              if (m2.elapsedMs >= targetMs && m2.elapsedMs > 0) {
                onCompletePhase == null ? void 0 : onCompletePhase({ reps: 0, elapsedMs: m2.elapsedMs, avgQuality: m2.avgQuality });
              }
            }
          }
        });
        if (cancelled) {
          eng.destroy();
          return;
        }
        engineRef.current = eng;
        await eng.init(videoRef.current, () => {
        });
        if (cancelled) {
          eng.destroy();
          return;
        }
        eng.start();
        setStatus("running");
      } catch (e) {
        setError((e == null ? void 0 : e.message) ?? String(e));
        setStatus("error");
      }
    }
    start();
    return () => {
      var _a2, _b2;
      cancelled = true;
      try {
        (_a2 = engineRef.current) == null ? void 0 : _a2.destroy();
      } catch {
      }
      engineRef.current = null;
      if (streamRef.current) {
        try {
          streamRef.current.getTracks().forEach((t) => t.stop());
        } catch {
        }
        streamRef.current = null;
      }
      (_b2 = coachRef.current) == null ? void 0 : _b2.cancelSpeech();
    };
  }, [exerciseId, phase == null ? void 0 : phase.exerciseId, phase == null ? void 0 : phase.reps, phase == null ? void 0 : phase.duration, aiEnabled, lang, levelKey, isHold]);
  reactExports.useEffect(() => {
    let raf = 0;
    const draw = () => {
      var _a2;
      raf = requestAnimationFrame(draw);
      const canvas = canvasRef.current, video = videoRef.current, eng = engineRef.current;
      if (!canvas || !video || !eng) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      try {
        if (video.readyState >= 2) ctx.drawImage(video, 0, 0, W, H);
      } catch {
      }
      const res = (_a2 = eng.getLastResult()) == null ? void 0 : _a2.landmarks;
      if (res) drawSkeleton(ctx, res, W, H, { mirror: true, color: BLAZE, jointColor: PAPER });
      if (res && reps === 0 && ((metrics == null ? void 0 : metrics.currentPhase) === "ready" || (metrics == null ? void 0 : metrics.currentPhase) === "idle")) {
        const s = alignmentScore(res, exerciseId);
        if (s > 0.68) {
          if (alignOkSince == null) setAlignOkSince(performance.now());
        } else {
          if (alignOkSince != null) setAlignOkSince(null);
        }
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [reps, metrics == null ? void 0 : metrics.currentPhase, exerciseId, alignOkSince]);
  const normLang = normalizeLang(lang);
  const formVal = Math.round((metrics == null ? void 0 : metrics.avgQuality) ?? ((_b = metrics == null ? void 0 : metrics.currentForm) == null ? void 0 : _b.quality) ?? 0);
  const poseQuality = Math.round((metrics == null ? void 0 : metrics.poseQuality) ?? ((_c = metrics == null ? void 0 : metrics.currentForm) == null ? void 0 : _c.poseQuality) ?? 0);
  const statusText = !metrics ? tCoach("coach.moveIntoFrame", normLang) : formVal > 68 ? tCoach("coach.status.good", normLang) : tCoach("coach.status.fix", normLang);
  if (!aiEnabled) return null;
  if (!trackingSupported) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", background: INK, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14, textAlign: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10 }, children: "AI TRACKING" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 13, marginTop: 6 }, children: lang === "it" ? "Tracciamento AI non ancora calibrato per questo esercizio — usa timer standard." : "AI tracking not yet calibrated for this exercise — using standard timer." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11, marginTop: 8 }, children: exerciseId })
    ] });
  }
  const progressPct = targetReps ? Math.min(1, reps / targetReps) : (metrics == null ? void 0 : metrics.elapsedMs) && (phase == null ? void 0 : phase.duration) ? Math.min(1, metrics.elapsedMs / (phase.duration * 1e3)) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", background: INK, border: `1px solid ${OLIVE}`, borderRadius: 14, overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, padding: 8, background: INK_2, borderBottom: `1px solid ${OLIVE}33` }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: "6px 8px", textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 8 }, children: tCoach("coach.time", normLang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 16, lineHeight: 1 }, children: fmtMs((metrics == null ? void 0 : metrics.elapsedMs) ?? 0) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: "6px 8px", textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 8 }, children: tCoach("coach.rep", normLang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-display", style: { color: BLAZE, fontSize: 16, lineHeight: 1 }, children: [
          reps,
          targetReps ? ` / ${targetReps}` : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 4, background: OLIVE + "55", borderRadius: 2, marginTop: 4, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: `${Math.round(progressPct * 100)}%`, height: "100%", background: BLAZE, transition: "width 0.3s" } }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: "6px 8px", textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 8 }, children: tCoach("coach.form", normLang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-display", style: { color: formVal > 70 ? "#7FB069" : formVal > 50 ? "#D4A017" : BLAZE, fontSize: 16, lineHeight: 1 }, children: [
          formVal,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 10, color: STEEL }, children: "/100" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: formVal > 68 ? "#7FB069" : BLAZE, fontSize: 7 }, children: statusText })
      ] })
    ] }),
    metrics && poseQuality < 42 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { margin: "8px 8px 0", padding: "6px 8px", borderRadius: 8, background: `${BLAZE}1A`, border: `1px solid ${BLAZE}55`, color: PAPER, fontSize: 11, textAlign: "center" }, children: lang === "it" ? "Allontanati così vedo tutto il corpo." : lang === "de" ? "Geh zurück, damit ich deinen ganzen Körper sehe." : "Move back so I can see your whole body." }),
    coachingText && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { margin: "8px 8px 0", padding: "8px 10px", borderRadius: 10, background: `${BLAZE}14`, border: `1px solid ${BLAZE}55`, color: PAPER, fontSize: 12, textAlign: "center" }, children: coachingText }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", width: "100%", aspectRatio: "4/3", background: "#050608", marginTop: coachingText ? 8 : 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: videoRef, autoPlay: true, muted: true, playsInline: true, "webkit-playsinline": "true", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)", background: "#000" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, width: 640, height: 480, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)", pointerEvents: "none" } }),
      reps === 0 && status === "running" && ((metrics == null ? void 0 : metrics.currentPhase) === "ready" || (metrics == null ? void 0 : metrics.currentPhase) === "idle" || !metrics) && /* @__PURE__ */ jsxRuntimeExports.jsx(PositioningMask, { exerciseId, landmarks: ((_e = (_d = engineRef.current) == null ? void 0 : _d.getLastResult()) == null ? void 0 : _e.landmarks) ?? null, lang, width: 640, height: 480 }),
      status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(0,0,0,0.45)", color: PAPER }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { fontSize: 10, color: KHAKI }, children: "AI Coach loading…" }) }),
      status === "error" && error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(0,0,0,0.7)", padding: 16, textAlign: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: BLAZE, fontSize: 12 }, children: [
        error,
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 10 }, children: "HTTPS + camera permission required." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", bottom: 6, left: 6, right: 6, display: "flex", justifyContent: "space-between", pointerEvents: "none" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { background: `${INK}DD`, color: KHAKI, fontSize: 9, padding: "3px 7px", borderRadius: 20, border: `1px solid ${OLIVE}55` }, children: [
          exerciseId,
          " · ",
          status === "running" ? "AI" : status
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { background: `${INK}DD`, color: poseQuality > 60 ? "#7FB069" : poseQuality > 40 ? "#D4A017" : BLAZE, fontSize: 9, padding: "3px 7px", borderRadius: 20, border: `1px solid ${OLIVE}55` }, children: [
          "POSE ",
          poseQuality,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { background: formVal > 68 ? "#7FB069DD" : `${BLAZE}DD`, color: PAPER, fontSize: 9, padding: "3px 8px", borderRadius: 20 }, children: (metrics == null ? void 0 : metrics.currentPhase) ?? "idle" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "6px 8px", background: INK_2, borderTop: `1px solid ${OLIVE}22`, display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: isHold ? tCoach("coach.holdPosition", normLang) : `${tCoach("coach.rep", normLang)} ${reps}${targetReps ? `/${targetReps}` : ""} · ${formVal}/100` }),
      !isHold && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", title: "Confidenza dell'ultimo movimento rilevato — sotto ~62 la rep non viene contata", style: { color: ((metrics == null ? void 0 : metrics.liveRepConfidence) ?? 0) > 62 ? "#7FB069" : STEEL, fontSize: 8 }, children: [
        "CONF ",
        (metrics == null ? void 0 : metrics.liveRepConfidence) ?? 0
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 8 }, children: [
        "AI · ",
        exerciseId,
        " · ",
        fmtMs((metrics == null ? void 0 : metrics.elapsedActiveMs) ?? 0),
        " active"
      ] })
    ] })
  ] });
}
function CountdownScreen({ program, onDone, lang, t }) {
  const [n2, setN] = reactExports.useState(3);
  reactExports.useEffect(() => {
    if (n2 <= 0) {
      onDone();
      return;
    }
    playBeep(n2 === 1 ? 880 : 550, 0.15);
    const t2 = setTimeout(() => setN((v) => v - 1), 800);
    return () => clearTimeout(t2);
  }, [n2]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 13, letterSpacing: "0.15em" }, children: tr$1(program.name, lang) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: BLAZE, fontSize: 110, lineHeight: 1 }, children: n2 > 0 ? n2 : t("countdown.go") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 13 }, children: t("countdown.getReady") })
  ] });
}
const btnIcon$4 = { background: "transparent", border: "none", padding: 6, cursor: "pointer", display: "flex", borderRadius: 10 };
function TopBar$1({ title, onBack, right }) {
  const { t } = useT();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-topbar-glass", style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "max(14px, env(safe-area-inset-top, 0px)) 16px",
    position: "sticky",
    top: 0,
    zIndex: 5
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 32 }, children: onBack && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onBack, "aria-label": t("app.back"), style: btnIcon$4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft$1, { size: 20, color: PAPER }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 22 }, children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { minWidth: 32, display: "flex", justifyContent: "flex-end" }, children: right })
  ] });
}
const inputStyle$2 = {
  width: "100%",
  background: INK_2,
  border: `1px solid ${OLIVE}`,
  borderRadius: 12,
  padding: "12px 14px",
  color: PAPER,
  fontSize: 16,
  fontFamily: "Inter, sans-serif",
  outline: "none"
};
const primaryBtn$5 = {
  background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`,
  color: PAPER,
  border: "none",
  borderRadius: 14,
  padding: "15px 18px",
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 18,
  letterSpacing: "0.06em",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  width: "100%",
  boxShadow: `0 6px 20px ${BLAZE}4d`
};
const secondaryBtn$2 = { background: INK_2, border: `1px solid ${KHAKI}`, color: PAPER, borderRadius: 14, padding: "12px 16px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: "0.05em", cursor: "pointer" };
function ToggleRow({ label, icon: Icon, on, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, style: {
    width: "100%",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 8px"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, color: on ? BLAZE : STEEL, style: { flexShrink: 0 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: PAPER, fontSize: 13.5, lineHeight: 1.3 }, children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 40, height: 22, borderRadius: 11, background: on ? BLAZE : OLIVE_DARK, position: "relative", transition: "background 0.2s", flexShrink: 0, marginLeft: 10 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      position: "absolute",
      top: 2,
      left: on ? 20 : 2,
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: PAPER,
      transition: "left 0.2s"
    } }) })
  ] });
}
function Field$1({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }, children: label }),
    children
  ] });
}
function SetupScreen({ formName, setFormName, formAge, setFormAge, formWeight, setFormWeight, formWaist, setFormWaist, formHeight, setFormHeight, formCustomWork, setFormCustomWork, formCustomRest, setFormCustomRest, reminderHour, setReminderHour, reminderMinute, setReminderMinute, onSave, canCancel, onCancel, soundOn, onToggleSound, vibrationOn, onToggleVibration, musicOn, onToggleMusic, musicTrack, onSelectTrack, musicVolume, onChangeMusicVolume, musicAutoPlay, onToggleAutoPlay, musicShuffle, onToggleShuffle, onNextTrack, onPrevTrack, skipWarmup, onToggleSkipWarmup, voiceCountdown, onToggleVoiceCountdown, level, onSetLevel, intervalPreset, onSetIntervalPreset, executionMode, onSetExecutionMode, onImportHealth, healthImportStatus, healthWeightSuggestion, onApplyHealthWeight, showToast: showToast2, largeText, setLargeText, pushEnabled, pushSupported, pushBusy, onTogglePush, onTestPush }) {
  const { lang, t, setLang } = useT();
  const curLevel = getLevel(level || "combattente");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-screen-in", style: { flex: 1, display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopBar$1, { title: t("setup.title"), onBack: canCancel ? onCancel : null }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-scroll", style: { flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 18 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8 }, children: LANGS.map((l2) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLang(l2), style: {
        flex: 1,
        padding: "9px 0",
        borderRadius: 10,
        cursor: "pointer",
        textAlign: "center",
        background: lang === l2 ? OLIVE_DARK : INK,
        border: `1px solid ${lang === l2 ? BLAZE : OLIVE}`,
        color: lang === l2 ? BLAZE : KHAKI,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.05em"
      }, children: l2 === "it" ? "ITALIANO" : l2 === "en" ? "ENGLISH" : "DEUTSCH" }, l2)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: "8px 12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, letterSpacing: "0.06em" }, children: "A11Y · Testo grande" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLargeText((v) => !v), style: { padding: "6px 10px", borderRadius: 8, border: `1px solid ${largeText ? BLAZE : OLIVE}`, background: largeText ? `${BLAZE}22` : "transparent", color: largeText ? BLAZE : STEEL, fontSize: 11, fontWeight: 700, cursor: "pointer" }, children: largeText ? "A Grande ✓" : "A Normale" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: STEEL, fontSize: 14, lineHeight: 1.5 }, dangerouslySetInnerHTML: { __html: t("setup.intro") } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: t("setup.name"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: formName,
          onChange: (e) => setFormName(e.target.value),
          placeholder: t("setup.name.ph"),
          className: "o40-input",
          style: inputStyle$2
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: t("setup.age"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: formAge,
          onChange: (e) => setFormAge(e.target.value.replace(/\D/g, "")),
          inputMode: "numeric",
          placeholder: "40",
          className: "o40-input",
          style: inputStyle$2
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: t("setup.weight"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: formWeight,
          onChange: (e) => setFormWeight(e.target.value.replace(/\D/g, "")),
          inputMode: "numeric",
          placeholder: "82",
          className: "o40-input",
          style: inputStyle$2
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: t("setup.waist"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: formWaist,
          onChange: (e) => setFormWaist(e.target.value.replace(/\D/g, "")),
          inputMode: "numeric",
          placeholder: t("setup.waist.ph"),
          className: "o40-input",
          style: inputStyle$2
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: t("setup.height"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: formHeight,
          onChange: (e) => setFormHeight(e.target.value.replace(/\D/g, "")),
          inputMode: "numeric",
          placeholder: t("setup.height.ph"),
          className: "o40-input",
          style: inputStyle$2
        }
      ) }),
      canCancel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 4 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRow, { label: t("setup.sounds"), icon: soundOn ? Volume2 : VolumeX, on: soundOn, onClick: onToggleSound }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: OLIVE_DARK, margin: "0 12px" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRow, { label: t("setup.vibration"), icon: Vibrate, on: vibrationOn, onClick: onToggleVibration }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: OLIVE_DARK, margin: "0 12px" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRow, { label: t("setup.skip"), icon: SkipForward, on: skipWarmup, onClick: onToggleSkipWarmup }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: OLIVE_DARK, margin: "0 12px" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRow, { label: lang === "it" ? "Conto vocale" : lang === "de" ? "Sprach-Countdown" : "Voice countdown", icon: Music, on: voiceCountdown, onClick: onToggleVoiceCountdown })
      ] }),
      canCancel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-sheen", style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 4, position: "relative", overflow: "hidden" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRow, { label: t("setup.music"), icon: musicOn ? Music2 : HeadphoneOff, on: musicOn, onClick: onToggleMusic }),
        musicOn && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "8px 10px 12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onPrevTrack, style: { width: 32, height: 32, borderRadius: "50%", background: OLIVE_DARK, border: `1px solid ${OLIVE}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }, "aria-label": "Prev", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft$1, { size: 16, color: KHAKI }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0, textAlign: "center" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: BLAZE, fontSize: 9, letterSpacing: "0.08em" }, children: musicAutoPlay ? musicShuffle ? "SHUFFLE • AUTOPLAY" : "AUTOPLAY • TUTTE" : "SINGOLA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: (TRACKS.find((t2) => t2.id === musicTrack) || TRACKS[0]).name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 10 }, children: (TRACKS.find((t2) => t2.id === musicTrack) || TRACKS[0]).artist })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onNextTrack, style: { width: 32, height: 32, borderRadius: "50%", background: BLAZE, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }, "aria-label": "Next", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { size: 16, color: PAPER }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, marginBottom: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onToggleAutoPlay, style: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "7px 8px", borderRadius: 8, border: `1px solid ${musicAutoPlay ? BLAZE : OLIVE}`, background: musicAutoPlay ? `${BLAZE}22` : "transparent", color: musicAutoPlay ? BLAZE : STEEL, fontSize: 11, fontWeight: 600, cursor: "pointer" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw$1, { size: 12 }),
              " ",
              musicAutoPlay ? "Auto • Tutte" : "Singola"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onToggleShuffle, style: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "7px 8px", borderRadius: 8, border: `1px solid ${musicShuffle ? BLAZE : OLIVE}`, background: musicShuffle ? `${BLAZE}22` : "transparent", color: musicShuffle ? BLAZE : STEEL, fontSize: 11, fontWeight: 600, cursor: "pointer" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw$1, { size: 12, style: { transform: musicShuffle ? "rotate(180deg)" : "none" } }),
              " ",
              musicShuffle ? "Shuffle ON" : "Shuffle OFF"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 11.5, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("setup.music.pick") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: KHAKI, fontSize: 10 }, children: [
              TRACKS.length,
              " brani • ",
              musicAutoPlay ? "auto" : "loop singolo"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6, maxHeight: 220, overflowY: "auto" }, children: TRACKS.map((track) => {
            const on = musicTrack === track.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onSelectTrack(track.id), style: {
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 10,
              cursor: "pointer",
              textAlign: "left",
              background: on ? OLIVE_DARK : INK,
              border: `1px solid ${on ? BLAZE : OLIVE}`
            }, children: [
              on ? /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { size: 15, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { size: 15, color: STEEL }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: PAPER, fontSize: 12 }, children: track.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { fontSize: 9, color: track.lang === "IT" ? "#7FB069" : track.lang === "DE" ? "#D9B34C" : STEEL, border: `1px solid ${track.lang === "IT" ? "#7FB06966" : track.lang === "DE" ? "#D9B34C66" : `${STEEL}44`}`, borderRadius: 4, padding: "0 4px" }, children: track.lang })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 10.5 }, children: [
                  track.artist,
                  " · ",
                  track.tag,
                  " · 2:00 ",
                  on && musicOn ? "• ora" : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: on ? BLAZE : KHAKI, fontSize: 10 }, children: on ? musicOn ? "▶" : t("setup.music.playing") : t("setup.music.listen") })
            ] }, track.id);
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 12, display: "flex", alignItems: "center", gap: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { size: 15, color: KHAKI }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "range",
                min: 0,
                max: 100,
                value: Math.round(musicVolume * 100),
                onChange: (e) => onChangeMusicVolume(e.target.value / 100),
                style: { flex: 1, accentColor: BLAZE }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: STEEL, fontSize: 10 }, children: [
              Math.round(musicVolume * 100),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 8, color: STEEL, fontSize: 10, lineHeight: 1.4 }, children: musicAutoPlay ? lang === "it" ? "▶ Tutte le canzoni in sequenza automatica. Shuffle per ordine casuale." : "All songs autoplay in sequence. Shuffle for random." : t("setup.music.note") })
        ] })
      ] }),
      canCancel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }, children: t("setup.level") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginBottom: 10 }, children: t("setup.level.hint") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }, children: INTERVAL_PRESETS.map((pr) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          onSetIntervalPreset(pr.key);
          if (pr.key !== "custom") {
            setFormCustomWork(String(pr.work));
            setFormCustomRest(String(pr.rest));
          }
        }, style: { padding: "6px 10px", borderRadius: 8, border: `1px solid ${intervalPreset === pr.key ? BLAZE : OLIVE}`, background: intervalPreset === pr.key ? `${BLAZE}22` : "transparent", color: intervalPreset === pr.key ? BLAZE : STEEL, fontSize: 11, fontWeight: 600, cursor: "pointer" }, children: pr.label }, pr.key)) }),
        intervalPreset === "custom" || formCustomWork !== "40" || formCustomRest !== "20" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: t("setup.custom.work"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: formCustomWork, onChange: (e) => setFormCustomWork(e.target.value), type: "number", inputMode: "numeric", className: "o40-input", style: inputStyle$2 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: t("setup.custom.rest"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: formCustomRest, onChange: (e) => setFormCustomRest(e.target.value), type: "number", inputMode: "numeric", className: "o40-input", style: inputStyle$2 }) })
        ] }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: 10, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, letterSpacing: "0.07em", marginBottom: 6 }, children: t("setup.executionMode") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onSetExecutionMode("time"), style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "10px 8px", borderRadius: 8, border: `1px solid ${executionMode === "time" ? BLAZE : OLIVE}`, background: executionMode === "time" ? `${BLAZE}22` : "transparent", color: executionMode === "time" ? BLAZE : STEEL, cursor: "pointer" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, fontWeight: 700 }, children: t("setup.mode.time") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 9, color: STEEL, textAlign: "center", lineHeight: 1.3 }, children: t("setup.mode.time.hint") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onSetExecutionMode("reps"), style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "10px 8px", borderRadius: 8, border: `1px solid ${executionMode === "reps" ? BLAZE : OLIVE}`, background: executionMode === "reps" ? `${BLAZE}22` : "transparent", color: executionMode === "reps" ? BLAZE : STEEL, cursor: "pointer" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, fontWeight: 700 }, children: t("setup.mode.reps") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 9, color: STEEL, textAlign: "center", lineHeight: 1.3 }, children: t("setup.mode.reps.hint") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 10, marginTop: 6, textAlign: "center" }, children: executionMode === "reps" ? "Es: 12× squat → FATTO → recupero 20″ (auto)" : "Standard tempo — adatto a dimagrimento" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: LEVELS.map((l2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onSetLevel(l2.key), style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          borderRadius: 10,
          cursor: "pointer",
          textAlign: "left",
          background: curLevel.key === l2.key ? OLIVE_DARK : INK,
          border: `1px solid ${curLevel.key === l2.key ? BLAZE : OLIVE}`
        }, children: [
          curLevel.key === l2.key ? /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 15, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { size: 15, color: STEEL }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: PAPER, fontSize: 12.5 }, children: l2.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11 }, children: l2.desc })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: curLevel.key === l2.key ? BLAZE : KHAKI, fontSize: 11 }, children: [
            l2.work,
            "″/",
            l2.rest,
            "″"
          ] })
        ] }, l2.key)) })
      ] }),
      canCancel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }, children: t("setup.health") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }, dangerouslySetInnerHTML: { __html: t("setup.health.body") } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: {
          ...secondaryBtn$2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          cursor: "pointer",
          width: "100%"
        }, children: [
          healthImportStatus === "reading" || healthImportStatus === "parsing" ? t("setup.health.processing") : t("setup.health.upload"),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              accept: ".xml",
              style: { display: "none" },
              onChange: (e) => {
                const f2 = e.target.files && e.target.files[0];
                if (f2) onImportHealth(f2);
                e.target.value = "";
              }
            }
          )
        ] }),
        healthImportStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: BLAZE, fontSize: 11.5, marginTop: 8 }, children: t("setup.health.error") }),
        healthWeightSuggestion && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 12, background: INK, border: `1px solid ${BLAZE}`, borderRadius: 10, padding: 12, display: "flex", alignItems: "center", gap: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, color: PAPER, fontSize: 12.5 }, children: [
            t("setup.health.weight"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              healthWeightSuggestion.kg,
              " kg"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onApplyHealthWeight, style: { ...primaryBtn$5, width: "auto", padding: "8px 14px", fontSize: 13 }, children: t("setup.health.apply") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${pushEnabled ? BLAZE : OLIVE}`, borderRadius: 14, padding: 14 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }, children: [
          pushEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 16, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { size: 16, color: STEEL }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: pushEnabled ? BLAZE : KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", flex: 1 }, children: lang === "it" ? "Push PWA — anche con app chiusa" : lang === "de" ? "Push PWA — auch geschlossen" : "PWA Push — works when closed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { fontSize: 9, color: pushEnabled ? BLAZE : STEEL, border: `1px solid ${pushEnabled ? BLAZE : OLIVE}`, borderRadius: 6, padding: "2px 6px", background: pushEnabled ? `${BLAZE}18` : "transparent" }, children: pushEnabled ? "ON" : "OFF" })
        ] }),
        !pushSupported ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12, lineHeight: 1.5 }, children: lang === "it" ? "Push non supportato su questo browser (usa Chrome/Android o Safari iOS 16.4+ con PWA installata)." : "Push not supported in this browser." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }, children: [
            lang === "it" ? "Ricevi la missione giornaliera anche con PWA chiusa. Su iPhone: installa con “Aggiungi a Home” poi attiva." : lang === "de" ? "Tägliche Mission auch bei geschlossener PWA erhalten." : "Get daily mission even when PWA is closed. On iPhone: Add to Home Screen first.",
            !(isStandalonePWA == null ? void 0 : isStandalonePWA()) && pushSupported && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: KHAKI, display: "block", marginTop: 4 }, children: [
              "⚠️ ",
              lang === "it" ? "Apri come PWA installata per push in background su iOS." : "Open as installed PWA for background push on iOS."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onTogglePush, disabled: pushBusy, style: {
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "10px 12px",
              borderRadius: 10,
              cursor: pushBusy ? "wait" : "pointer",
              background: pushEnabled ? INK : `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`,
              color: pushEnabled ? KHAKI : PAPER,
              border: `1px solid ${pushEnabled ? OLIVE : BLAZE}`,
              fontSize: 12,
              fontWeight: 700,
              opacity: pushBusy ? 0.6 : 1
            }, children: [
              pushBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw$1, { size: 14, className: "o40-spin" }) : pushEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 14 }),
              pushBusy ? "..." : pushEnabled ? lang === "it" ? "Disattiva push" : "Disable push" : lang === "it" ? "Attiva push" : "Enable push"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onTestPush, disabled: pushBusy, style: {
              padding: "10px 14px",
              borderRadius: 10,
              cursor: pushBusy ? "wait" : "pointer",
              background: INK,
              border: `1px solid ${OLIVE}`,
              color: KHAKI,
              fontSize: 12,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 6,
              opacity: pushBusy ? 0.6 : 1
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 14 }),
              " Test"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 10, marginTop: 8, lineHeight: 1.4 }, children: lang === "it" ? "Privacy: subscription salvata solo su mikweb.eu, nessun tracking." : "Privacy: subscription stored only on mikweb.eu" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12, display: "flex", gap: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { size: 20, color: BLAZE, style: { flexShrink: 0, marginTop: 2 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 12.5, lineHeight: 1.5 }, children: t("setup.tech.note") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onSave, disabled: !formAge || !formWeight, style: {
        ...primaryBtn$5,
        opacity: !formAge || !formWeight ? 0.5 : 1,
        marginTop: 4
      }, children: [
        t("setup.enlist"),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 })
      ] })
    ] })
  ] });
}
const LEGACY_BELLY = /* @__PURE__ */ new Set(["A", "E", "F", "M"]);
const ALL_BELLY = /* @__PURE__ */ new Set([...LEGACY_BELLY, ...BELLY_IDS]);
function isBellyProgram(id) {
  return ALL_BELLY.has(id);
}
function getBellySessions(sessions) {
  return (sessions || []).filter((s) => isBellyProgram(s.programId));
}
function getBellyCount(sessions, weeks = 4) {
  const since = Date.now() - weeks * 7 * 864e5;
  return getBellySessions(sessions).filter((s) => new Date(s.date).getTime() > since).length;
}
function getBellyStreak(sessions) {
  const dates = new Set(getBellySessions(sessions).map((s) => s.date.slice(0, 10)));
  if (!dates.size) return 0;
  let cur = /* @__PURE__ */ new Date();
  if (!dates.has(cur.toISOString().slice(0, 10))) cur.setDate(cur.getDate() - 1);
  let n2 = 0;
  while (dates.has(cur.toISOString().slice(0, 10))) {
    n2++;
    cur.setDate(cur.getDate() - 1);
    if (n2 > 60) break;
  }
  return n2;
}
function getBellyProgress(sessions, goal = 3) {
  const weekAgo = Date.now() - 7 * 864e5;
  const done = getBellySessions(sessions).filter((s) => new Date(s.date).getTime() > weekAgo).length;
  return { done, total: goal, pct: Math.min(1, done / goal), remain: Math.max(0, goal - done), isDone: done >= goal };
}
function getBellyInsight({ sessions, waistHistory, lang = "it" }) {
  const bellyCount = getBellyCount(sessions, 4);
  const streak = getBellyStreak(sessions);
  const waist = (waistHistory == null ? void 0 : waistHistory.length) ? waistHistory[waistHistory.length - 1] : null;
  const first = (waistHistory == null ? void 0 : waistHistory.length) ? waistHistory[0] : null;
  const delta = waist && first && waistHistory.length > 1 ? waist.cm - first.cm : null;
  if (delta != null && delta <= -2) {
    return lang === "it" ? `Pancia in ritirata: -${Math.abs(delta)} cm dal via. Continua così — 3 pancia / sett. è il ritmo d’oro.` : `Belly retreating: -${Math.abs(delta)} cm since start. Keep 3 belly / week.`;
  }
  if (streak >= 3) {
    return lang === "it" ? `Streak pancia ${streak} giorni — la cintura si stringe. Non mollare ora!` : `Belly streak ${streak} days — belt is tightening!`;
  }
  if (bellyCount < 4) {
    return lang === "it" ? `Solo ${bellyCount} pancia nelle ultime 4 sett. — punta a 8-12 per vedere il girovita muoversi.` : `Only ${bellyCount} belly in 4 weeks — aim for 8-12 to see the waist move.`;
  }
  if (waist) {
    return lang === "it" ? `Girovita ${waist.cm} cm — ${bellyCount} pancia / 4 sett. Buon ritmo, resta costante.` : `Waist ${waist.cm} cm — ${bellyCount} belly / 4 wks. Good pace, stay consistent.`;
  }
  return lang === "it" ? `Obiettivo pancia: 3 missioni / sett. per attaccare il grasso addominale.` : `Belly goal: 3 missions / week to attack belly fat.`;
}
function getRecommendedMissions({ sessions, profile, others }) {
  const cons = (() => {
    try {
      return getConsistencyScore$1(sessions, 4);
    } catch {
      return 50;
    }
  })();
  const counts = {};
  (sessions || []).forEach((s) => {
    counts[s.programId] = (counts[s.programId] || 0) + 1;
  });
  const lastRpe = (sessions == null ? void 0 : sessions.length) ? sessions[sessions.length - 1].rpe : null;
  return [...others].sort((a, b) => {
    if (lastRpe >= 4) {
      const rec = ["D", "H", "I"];
      const ai = rec.indexOf(a.id), bi = rec.indexOf(b.id);
      if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    }
    if (cons < 40) return (a.difficulty || 2) - (b.difficulty || 2);
    const ca = counts[a.id] || 0, cb = counts[b.id] || 0;
    if (ca !== cb) return ca - cb;
    return (a.difficulty || 2) - (b.difficulty || 2);
  });
}
function getDailyChallenge({ sessions, profile }) {
  const day = (/* @__PURE__ */ new Date()).getDate() % PROGRAMS$1.length;
  const base = PROGRAMS$1[day];
  const cons = (() => {
    try {
      return getConsistencyScore$1(sessions, 4);
    } catch {
      return 50;
    }
  })();
  const streak = (() => {
    const set2 = new Set((sessions || []).map((s) => s.date.slice(0, 10)));
    let cur = /* @__PURE__ */ new Date();
    if (!set2.has(cur.toISOString().slice(0, 10))) cur.setDate(cur.getDate() - 1);
    let n2 = 0;
    while (set2.has(cur.toISOString().slice(0, 10))) {
      n2++;
      cur.setDate(cur.getDate() - 1);
    }
    return n2;
  })();
  let bonus = "";
  if (cons > 70) bonus = "Bonus costanza: +1 round";
  else if (streak >= 3) bonus = `Streak ${streak} — mantieni!`;
  else if ((sessions == null ? void 0 : sessions.length) === 0) bonus = "Prima missione: inizia leggero";
  return { program: base, bonus, cons, streak };
}
function getBellyMissions({ sessions, profile, waistHistory }) {
  const belly = PROGRAMS$1.filter((p2) => BELLY_IDS.includes(p2.id));
  const counts = {};
  (sessions || []).forEach((s) => {
    counts[s.programId] = (counts[s.programId] || 0) + 1;
  });
  const bellyCount = getBellyCount(sessions, 4);
  const waist = (waistHistory == null ? void 0 : waistHistory.length) ? waistHistory[waistHistory.length - 1] : null;
  const first = (waistHistory == null ? void 0 : waistHistory.length) ? waistHistory[0] : null;
  const delta = waist && first && waistHistory.length > 1 ? waist.cm - first.cm : null;
  const needsBelly = bellyCount < 6 || delta != null && delta > -1;
  return [...belly].sort((a, b) => {
    if (needsBelly) return (counts[a.id] || 0) - (counts[b.id] || 0);
    return (counts[a.id] || 0) - (counts[b.id] || 0);
  }).map((p2) => ({ ...p2, _needsBelly: needsBelly }));
}
function getGoalProgress(sessions, weeklyGoal = WEEKLY_GOAL) {
  const now = /* @__PURE__ */ new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + 1);
  start.setHours(0, 0, 0, 0);
  const done = (sessions || []).filter((s) => new Date(s.date) >= start).length;
  const pct = Math.min(1, done / weeklyGoal);
  const remain = Math.max(0, weeklyGoal - done);
  const isDone = done >= weeklyGoal;
  return { done, total: weeklyGoal, pct, remain, isDone };
}
function getGoalHistory(sessions, weeklyGoal = WEEKLY_GOAL, weeks = 8) {
  const now = /* @__PURE__ */ new Date();
  const byWeek = [];
  for (let w = weeks - 1; w >= 0; w--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + 1 - w * 7);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    const done = (sessions || []).filter((s) => {
      const d = new Date(s.date);
      return d >= weekStart && d < weekEnd;
    }).length;
    const label = weekStart.toLocaleDateString("it-IT", { day: "2-digit", month: "short" });
    byWeek.push({ label, done, goal: weeklyGoal, pct: Math.min(1, done / weeklyGoal), isDone: done >= weeklyGoal });
  }
  return byWeek;
}
function suggestNextGoal(sessions, currentGoal = WEEKLY_GOAL) {
  const cons = getConsistencyScore$1(sessions, 4);
  const recent = getGoalHistory(sessions, currentGoal, 4);
  const avgDone = recent.reduce((a, w) => a + w.done, 0) / 4;
  if (cons >= 80 && avgDone >= currentGoal) return Math.min(7, currentGoal + 1);
  if (cons < 35 && avgDone < currentGoal * 0.6) return Math.max(1, currentGoal - 1);
  return currentGoal;
}
function formatGoal(goal) {
  return `${goal} ${goal === 1 ? "sessione" : "sessioni"}/sett.`;
}
function estimateWeeklyCalories(sessions, weeklyGoal = WEEKLY_GOAL) {
  if (!(sessions == null ? void 0 : sessions.length)) return weeklyGoal * 180;
  const avgKcal = Math.round(sessions.reduce((a, s) => a + (s.kcal || 0), 0) / sessions.length);
  return weeklyGoal * avgKcal;
}
function getStreakWeeks(sessions) {
  const history = getGoalHistory(sessions, WEEKLY_GOAL, 12);
  let streak = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].isDone) streak++;
    else break;
  }
  return streak;
}
function GoalRing({ done, total, size = 72, stroke = 7 }) {
  const pct = Math.min(1, Math.max(0, done / total));
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - pct);
  const isDone = done >= total;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", width: size, height: size, flexShrink: 0 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: size, height: size, style: { transform: "rotate(-90deg)", display: "block" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: size / 2, cy: size / 2, r: radius, stroke: OLIVE_DARK, strokeWidth: stroke, fill: "none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "circle",
        {
          cx: size / 2,
          cy: size / 2,
          r: radius,
          stroke: isDone ? "#7FB069" : BLAZE,
          strokeWidth: stroke,
          fill: "none",
          strokeDasharray: circ,
          strokeDashoffset: offset,
          strokeLinecap: "round",
          style: { transition: "stroke-dashoffset 0.6s ease, stroke 0.3s ease", filter: isDone ? "drop-shadow(0 0 6px #7FB06988)" : `drop-shadow(0 0 6px ${BLAZE}66)` }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: isDone ? "#7FB069" : PAPER, fontFamily: "Bebas Neue, sans-serif", fontSize: size * 0.32, lineHeight: 1 }, children: [
        done,
        "/",
        total
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: size * 0.11, letterSpacing: "0.06em", fontFamily: "IBM Plex Mono, monospace" }, children: isDone ? "FATTO!" : "GOAL" })
    ] })
  ] });
}
function MiniGoalBar({ history }) {
  const max = Math.max(1, ...history.map((h) => Math.max(h.done, h.goal)));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "flex-end", gap: 4, height: 48 }, children: history.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, height: 36, justifyContent: "flex-end" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "100%", height: `${Math.round(h.done / max * 28) + 4}px`, background: h.isDone ? "#7FB069" : h.done > 0 ? KHAKI : OLIVE_DARK, borderRadius: 3, opacity: h.isDone ? 1 : 0.85 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "100%", height: 2, background: BLAZE, opacity: 0.35, borderRadius: 1 }, title: `goal ${h.goal}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 8, fontFamily: "IBM Plex Mono, monospace" }, children: h.label })
  ] }, i)) });
}
function getSmartInsight({ sessions, profile, waistHistory, weightHistory, lang = "it" }) {
  const n2 = (sessions == null ? void 0 : sessions.length) || 0;
  if (n2 === 0) {
    return {
      icon: "🌱",
      title: lang === "it" ? "Inizia leggero" : lang === "de" ? "Leicht starten" : "Start light",
      body: lang === "it" ? "2–3 sessioni a settimana bastano per i primi 14 giorni. Costanza batte intensità." : "2–3 sessions/week for first 14 days. Consistency beats intensity.",
      color: "#7FB069"
    };
  }
  const streak = (() => {
    const s = new Set(sessions.map((v) => v.date.slice(0, 10)));
    let cur = /* @__PURE__ */ new Date();
    if (!s.has(cur.toISOString().slice(0, 10))) cur.setDate(cur.getDate() - 1);
    let n3 = 0;
    while (s.has(cur.toISOString().slice(0, 10))) {
      n3++;
      cur.setDate(cur.getDate() - 1);
    }
    return n3;
  })();
  const cons = getConsistencyScore$1(sessions, 8);
  const risk = getStreakRisk$1(sessions);
  const waist = (waistHistory == null ? void 0 : waistHistory.length) ? waistHistory[waistHistory.length - 1] : null;
  const waistPrev = (waistHistory == null ? void 0 : waistHistory.length) > 1 ? waistHistory[0] : null;
  const wDelta = waist && waistPrev ? waist.cm - waistPrev.cm : null;
  if (risk === "at-risk") {
    return { icon: "⚠️", title: lang === "it" ? "Rischio streak" : "Streak at risk", body: lang === "it" ? "Sei a 1 giorno dal break — 15′ oggi salvano la serie." : "1 day from break — 15′ today saves the streak.", color: "#D9B34C" };
  }
  if (cons < 40) {
    return { icon: "🧭", title: lang === "it" ? "Costanza bassa" : "Low consistency", body: lang === "it" ? `Sei al ${cons}% su 8 settimane. Prova a fissare 3 slot fissi e usa “Recupero Attivo” nei giorni no.` : `You’re at ${cons}% over 8 weeks. Fix 3 slots and use Active Recovery on off days.`, color: "#C1440E" };
  }
  if (wDelta != null && wDelta > 0) {
    return { icon: "📏", title: lang === "it" ? "Girovita +" + wDelta + "cm" : `Waist +${wDelta}cm`, body: lang === "it" ? "Controlla kcal e sonno. Le sessioni brucia-grassi (B/E/G) + 8k passi aiutano." : "Check kcal and sleep. Fat-burn sessions + 8k steps help.", color: "#B8AE8C" };
  }
  if (streak >= 7) {
    return { icon: "🔥", title: lang === "it" ? `Fuoco! ${streak} giorni` : `On fire! ${streak} days`, body: lang === "it" ? "Streak solida — mantieni con 1 sessione leggera se sei stanco." : "Solid streak — keep with 1 light session if tired.", color: "#C1440E" };
  }
  const recentRpe = sessions.slice(-3).map((s) => s.rpe).filter((v) => v != null);
  if (recentRpe.length >= 2 && recentRpe.every((v) => v >= 4)) {
    return { icon: "🧘", title: lang === "it" ? "Intensità alta" : "High intensity", body: lang === "it" ? "2 sessioni dure di fila — domani fai Recupero Attivo o camminata." : "2 hard sessions in a row — do Active Recovery tomorrow.", color: "#7FB069" };
  }
  return { icon: "💡", title: lang === "it" ? "Continua così" : "Keep going", body: lang === "it" ? `Hai ${n2} sessioni, streak ${streak}. Prossimo livello: ${getRank(n2).next ? getRank(n2).next.min - n2 + " sessioni" : "veterano!"}` : `You have ${n2} sessions, streak ${streak}.`, color: "#B8AE8C" };
}
function getSmartRecommendation({ sessions, profile, lang = "it" }) {
  var _a;
  const n2 = (sessions == null ? void 0 : sessions.length) || 0;
  const last = n2 ? sessions[n2 - 1] : null;
  if (!last) return { programId: "A", reason: lang === "it" ? "Parti con Assalto Pancia, tecnico ma dolce." : "Start with Belly Assault." };
  if (last.rpe >= 4) return { programId: "D", reason: lang === "it" ? "Ultima dura — oggi Recupero Attivo." : "Last was hard — Active Recovery today." };
  const risk = getStreakRisk$1(sessions);
  if (risk === "at-risk") return { programId: "I", reason: lang === "it" ? "Streak a rischio — Cardio Leggero per non rompere." : "Streak at risk — Light Cardio to keep it." };
  const cons = getConsistencyScore$1(sessions, 4);
  if (cons > 75) return { programId: "L", reason: lang === "it" ? "Costanza top — prova Potenza Esplosiva." : "Top consistency — try Explosive Power." };
  if (cons < 40) return { programId: "H", reason: lang === "it" ? "Riparti con Schiena di Ferro, dolce." : "Restart with Iron Back." };
  const counts = {};
  sessions.forEach((s) => counts[s.programId] = (counts[s.programId] || 0) + 1);
  const least = (_a = Object.entries(counts).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _a[0];
  if (least) return { programId: least, reason: lang === "it" ? "Varia lo stimolo — tocca il meno usato." : "Vary stimulus — hit the least used." };
  return { programId: "B", reason: lang === "it" ? "Brucia Grassi per ritmo." : "Fat Burn for pace." };
}
function getPersonalChallenge(sessions, profile) {
  const n2 = (sessions == null ? void 0 : sessions.length) || 0;
  const bestStreak = computeBestStreak(sessions || []);
  const cons = (() => {
    try {
      return getConsistencyScore$1(sessions, 8);
    } catch {
      return 0;
    }
  })();
  const weeklyGoal = (profile == null ? void 0 : profile.weeklyGoal) || 3;
  if (n2 < 3) return { id: "first3", title: "Prime 3", desc: "Completa le prime 3 sessioni", target: 3, current: n2, progress: n2 / 3, icon: "🌱", color: "#7FB069" };
  if (bestStreak < 7) return { id: "streak7", title: "Settimana perfetta", desc: "7 giorni consecutivi", target: 7, current: bestStreak, progress: bestStreak / 7, icon: "🔥", color: "#C1440E" };
  if (cons < 70) return { id: "cons70", title: "Costanza 70%", desc: "Aderenza 8 settimane al 70%", target: 70, current: cons, progress: cons / 70, icon: "◎", color: "#7FB069" };
  if (n2 < 10) return { id: "s10", title: "10 Sessioni", desc: "Raggiungi 10 allenamenti", target: 10, current: n2, progress: n2 / 10, icon: "⚡", color: "#B8AE8C" };
  const hist = getGoalHistory(sessions, weeklyGoal, 8);
  const perfect = hist.filter((h) => h.isDone).length;
  if (perfect < 4) return { id: "perfect4", title: "4 Sett. Perfette", desc: `${weeklyGoal} sess/sett ×4`, target: 4, current: perfect, progress: perfect / 4, icon: "★", color: "#D9B34C" };
  if (n2 < 25) return { id: "s25", title: "25 Sessioni", desc: "Costruisci abitudine", target: 25, current: n2, progress: n2 / 25, icon: "🏆", color: "#C1440E" };
  return { id: "veterano", title: "Veterano", desc: "100 sessioni — leggenda", target: 100, current: n2, progress: Math.min(1, n2 / 100), icon: "👑", color: "#B8AE8C" };
}
function getRecoveryTip(sessions, lang = "it") {
  const last = (sessions == null ? void 0 : sessions.length) ? sessions[sessions.length - 1] : null;
  if (!last) return lang === "it" ? "Inizia con 2 sessioni leggere a settimana." : "Start with 2 light sessions/week.";
  const rpe = last.rpe;
  if (rpe >= 4) return lang === "it" ? "Ultima dura — oggi fai mobilità + camminata, non forzare." : "Last was hard — mobility + walk today.";
  if (rpe <= 2) return lang === "it" ? "Eri leggero — puoi spingere oggi." : "You were light — you can push today.";
  return lang === "it" ? "Mantieni ritmo, ascolta il corpo." : "Keep rhythm, listen to body.";
}
const ACHIEVEMENTS = [
  { id: "first", title: { it: "Primo passo", en: "First Step", de: "Erster Schritt" }, desc: { it: "Completa la prima sessione", en: "Complete first session", de: "Erste Session" }, icon: "🌱", color: "#7FB069", check: (s) => s.length >= 1, progress: (s) => Math.min(1, s.length / 1) },
  { id: "streak3", title: { it: "Scintilla", en: "Spark", de: "Funke" }, desc: { it: "3 giorni di fila", en: "3 days streak", de: "3 Tage Serie" }, icon: "✨", color: "#D9B34C", check: (s) => computeBestStreak(s) >= 3, progress: (s) => Math.min(1, computeBestStreak(s) / 3) },
  { id: "streak7", title: { it: "Settimana di fuoco", en: "Fire Week", de: "Feuerwoche" }, desc: { it: "7 giorni di fila", en: "7 days streak", de: "7 Tage Serie" }, icon: "🔥", color: "#C1440E", check: (s) => computeBestStreak(s) >= 7, progress: (s) => Math.min(1, computeBestStreak(s) / 7) },
  { id: "s5", title: { it: "Ingranaggio", en: "Gear Up", de: "Auf Touren" }, desc: { it: "5 sessioni totali", en: "5 sessions", de: "5 Sessions" }, icon: "⚙️", color: "#B8AE8C", check: (s) => s.length >= 5, progress: (s) => Math.min(1, s.length / 5) },
  { id: "s25", title: { it: "Costruttore", en: "Builder", de: "Erbauer" }, desc: { it: "25 sessioni", en: "25 sessions", de: "25 Sessions" }, icon: "🏗️", color: "#8A8578", check: (s) => s.length >= 25, progress: (s) => Math.min(1, s.length / 25) },
  { id: "k5000", title: { it: "Fornace", en: "Furnace", de: "Ofen" }, desc: { it: "5.000 kcal bruciate", en: "5k kcal burned", de: "5k kcal" }, icon: "🔥", color: "#E84B2A", check: (s) => s.reduce((a, v) => a + (v.kcal || 0), 0) >= 5e3, progress: (s) => Math.min(1, s.reduce((a, v) => a + (v.kcal || 0), 0) / 5e3) },
  { id: "cons70", title: { it: "Metronomo", en: "Metronome", de: "Metronom" }, desc: { it: "70% costanza 8 sett.", en: "70% consistency 8w", de: "70% Konstanz 8W" }, icon: "◎", color: "#7FB069", check: (s) => {
    try {
      return getConsistencyScore$1(s, 8) >= 70;
    } catch {
      return false;
    }
  }, progress: (s) => {
    try {
      return Math.min(1, getConsistencyScore$1(s, 8) / 70);
    } catch {
      return 0;
    }
  } },
  { id: "perfect4", title: { it: "Quadrifoglio", en: "Clover", de: "Klee" }, desc: { it: "4 settimane perfette", en: "4 perfect weeks", de: "4 perfekte Wochen" }, icon: "🍀", color: "#D9B34C", check: (s) => {
    const hist = getGoalHistoryMock(s);
    return hist.filter((h) => h.isDone).length >= 4;
  }, progress: (s) => {
    const hist = getGoalHistoryMock(s);
    return Math.min(1, hist.filter((h) => h.isDone).length / 4);
  } }
];
function getGoalHistoryMock(sessions) {
  const now = /* @__PURE__ */ new Date();
  const hist = [];
  for (let w = 0; w < 8; w++) {
    const ws = new Date(now);
    ws.setDate(now.getDate() - now.getDay() + 1 - w * 7);
    ws.setHours(0, 0, 0, 0);
    const we = new Date(ws);
    we.setDate(ws.getDate() + 7);
    const done = (sessions || []).filter((x) => {
      const d = new Date(x.date);
      return d >= ws && d < we;
    }).length;
    hist.push({ isDone: done >= 3 });
  }
  return hist;
}
function getAchievementsProgress(sessions) {
  return ACHIEVEMENTS.map((a) => ({
    ...a,
    unlocked: !!a.check(sessions || []),
    progress: a.progress(sessions || [])
  }));
}
function getNextAchievements(sessions, limit = 3) {
  return getAchievementsProgress(sessions).filter((a) => !a.unlocked).sort((a, b) => b.progress - a.progress).slice(0, limit);
}
function getDailyInsight({ sessions, profile, waistHistory, weightHistory, lang = "it" }) {
  const n2 = (sessions == null ? void 0 : sessions.length) || 0;
  const cons = (() => {
    try {
      return getConsistencyScore$1(sessions, 8);
    } catch {
      return 0;
    }
  })();
  const risk = getStreakRisk$1(sessions);
  const hist = getGoalHistory(sessions, (profile == null ? void 0 : profile.weeklyGoal) || 3, 4);
  const avgDone = hist.reduce((a, w) => a + w.done, 0) / 4;
  if (n2 === 0) return { icon: "🌱", title: "Inizia", body: lang === "it" ? "Fai la prima sessione oggi — 15′ bastano." : "Do first session today — 15′ is enough.", color: "#7FB069", tip: lang === "it" ? "Scegli Assalto Pancia, ritmo dolce." : "Pick Belly Assault, easy pace." };
  if (risk === "at-risk") return { icon: "⏰", title: "Streak a rischio", body: lang === "it" ? "Un giorno al break — 15′ di Recupero Attivo salvano la serie." : "One day to break — 15′ Active Recovery saves streak.", color: "#D9B34C", tip: "Recupero Attivo (D) oggi." };
  if (cons < 35) return { icon: "🧭", title: "Costanza bassa", body: lang === "it" ? `Sei al ${cons}% su 8 settimane. Fissa 3 slot fissi.` : `You are at ${cons}% over 8 weeks. Fix 3 slots.`, color: "#C1440E", tip: "Lun/Mer/Ven 07:30." };
  if (avgDone >= ((profile == null ? void 0 : profile.weeklyGoal) || 3)) return { icon: "🚀", title: "In forma", body: lang === "it" ? `Media ${avgDone.toFixed(1)}/sett. — alza a ${((profile == null ? void 0 : profile.weeklyGoal) || 3) + 1} se vuoi spingere.` : `Avg ${avgDone.toFixed(1)}/week — raise to ${((profile == null ? void 0 : profile.weeklyGoal) || 3) + 1} to push.`, color: "#7FB069", tip: "Prova Potenza Esplosiva (L)." };
  const waist = (waistHistory == null ? void 0 : waistHistory.length) ? waistHistory[waistHistory.length - 1] : null;
  const waistPrev = (waistHistory == null ? void 0 : waistHistory.length) ? waistHistory[0] : null;
  const wDelta = waist && waistPrev ? waist.cm - waistPrev.cm : null;
  if (wDelta != null && wDelta > 1) return { icon: "📏", title: `Girovita +${wDelta}cm`, body: lang === "it" ? "Rivedi kcal e passi. Sessioni B/E/G + 8k passi." : "Check kcal and steps. B/E/G sessions + 8k steps.", color: "#B8AE8C", tip: "Brucia Grassi (B) 2×/sett." };
  return { icon: "💡", title: "Continua così", body: lang === "it" ? `Hai ${n2} sessioni, streak ${computeBestStreak(sessions)} best. Mantieni ritmo.` : `You have ${n2} sessions, best streak ${computeBestStreak(sessions)}. Keep rhythm.`, color: "#B8AE8C", tip: "Varia stimolo ogni 3-4 giorni." };
}
function getWeeklyInsight({ sessions, profile, lang = "it" }) {
  const hist = getGoalHistory(sessions, (profile == null ? void 0 : profile.weeklyGoal) || 3, 8);
  const perfect = hist.filter((h) => h.isDone).length;
  const total = hist.length;
  const pct = Math.round(perfect / total * 100);
  if (pct >= 75) return { icon: "🏆", title: "Settimane top", body: `${perfect}/${total} perfette — grande costanza!`, color: "#7FB069" };
  if (pct >= 50) return { icon: "📈", title: "Buon ritmo", body: `${perfect}/${total} perfette — tieni così`, color: "#B8AE8C" };
  return { icon: "🎯", title: "Obiettivo", body: `${perfect}/${total} perfette — punta a ${Math.ceil(total * 0.6)}`, color: "#D9B34C" };
}
const btnIcon$3 = { background: "transparent", border: "none", padding: 6, cursor: "pointer", display: "flex", borderRadius: 10 };
function DogTag$3({ label, value, sub }) {
  const numeric = typeof value === "number";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-card", style: {
    background: `linear-gradient(160deg, ${INK_2}, ${INK})`,
    border: `1px solid ${OLIVE}`,
    borderRadius: 14,
    padding: "12px 13px",
    position: "relative",
    flex: 1,
    minWidth: 0,
    boxShadow: "0 4px 14px rgba(0,0,0,0.35)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: 9, left: -5, width: 10, height: 10, borderRadius: "50%", background: INK, border: `2px solid ${KHAKI}` } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 26, lineHeight: 1.1 }, children: numeric ? value : value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11 }, children: sub })
  ] });
}
function ProgressRing$1({ progress, size = 240, stroke = 12, color, comet = true }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(1, progress)));
  const gradId = `ring-grad-${color.replace("#", "")}`;
  const angle = Math.max(1e-3, Math.min(0.999, progress)) * 2 * Math.PI;
  const dotX = size / 2 + radius * Math.sin(angle);
  const dotY = size / 2 - radius * Math.cos(angle);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: size, height: size, style: { transform: "rotate(-90deg)", filter: `drop-shadow(0 0 10px ${color}55)` }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: gradId, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: color, stopOpacity: "0.65" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: color, stopOpacity: "1" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: size / 2, cy: size / 2, r: radius, stroke: OLIVE_DARK, strokeWidth: stroke, fill: "none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "circle",
      {
        cx: size / 2,
        cy: size / 2,
        r: radius,
        stroke: `url(#${gradId})`,
        strokeWidth: stroke,
        fill: "none",
        strokeDasharray: circumference,
        strokeDashoffset: offset,
        strokeLinecap: "round",
        style: { transition: "stroke-dashoffset 1s linear" }
      }
    ),
    comet && progress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: dotX, cy: dotY, r: stroke * 2, fill: color, opacity: "0.15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "o40-comet", cx: dotX, cy: dotY, r: stroke * 0.8, fill: PAPER })
    ] })
  ] });
}
function SegmentedProgress$1({ total, current, currentProgress, color }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 4, width: "100%" }, children: Array.from({ length: total }).map((_, i) => {
    const isDone = i < current;
    const isActive = i === current;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      flex: 1,
      height: 6,
      borderRadius: 3,
      background: isDone || isActive ? color : OLIVE_DARK,
      opacity: isActive ? 0.5 + 0.5 * currentProgress : 1,
      transition: "opacity 0.3s linear, background 0.3s ease",
      boxShadow: isDone || isActive ? `0 0 8px ${color}66` : "none"
    } }, i);
  }) });
}
function HomeScreen({ profile, sessions, customPrograms, waistHistory, weightHistory, onOpenProgram, onBuild, onEditCustom, onDeleteCustom, onDismissIntro, onPromote, onBellyTest, onPose }) {
  const { lang, t } = useT();
  const [confirmDeleteId, setConfirmDeleteId] = reactExports.useState(null);
  const [showOthers, setShowOthers] = reactExports.useState(false);
  const { streak, usedFreeze } = computeStreakWithFreeze(sessions);
  const weekAgo = Date.now() - 7 * 864e5;
  const kcalWeek = Math.round(sessions.filter((s) => new Date(s.date).getTime() > weekAgo).reduce((a, s) => a + s.kcal, 0));
  const sessionsThisWeek = sessions.filter((s) => new Date(s.date).getTime() > weekAgo).length;
  const weeklyGoal = profile.weeklyGoal || WEEKLY_GOAL;
  const { program: todayProgram, adaptive } = pickNextProgram(sessions, profile);
  const othersRaw = PROGRAMS$1.filter((p2) => p2.id !== todayProgram.id);
  const others = getRecommendedMissions({ sessions, profile, others: othersRaw });
  const dailyChallenge = getDailyChallenge({ sessions, profile });
  const { current: rank, next: nextRank } = getRank(sessions.length);
  const upcoming = nextBadge(sessions);
  const lastSession = sessions.length ? sessions[sessions.length - 1] : null;
  const lastProgram = lastSession && lastSession.programId !== "health-import" ? [...PROGRAMS$1, ...customPrograms].find((p2) => p2.id === lastSession.programId) : null;
  const campDay = campDayDisplay(profile);
  const lvl = getLevel(profile.level || "combattente");
  const levelIdx = LEVELS.indexOf(lvl);
  const waist = waistHistory.length ? waistHistory[waistHistory.length - 1] : null;
  const waistFirst = waistHistory.length ? waistHistory[0] : null;
  const waistDelta = waist && waistFirst && waistHistory.length > 1 ? waist.cm - waistFirst.cm : null;
  const weight = weightHistory.length ? weightHistory[weightHistory.length - 1] : null;
  const weightFirst = weightHistory.length ? weightHistory[0] : null;
  const weightDelta = weight && weightFirst && weightHistory.length > 1 ? weight.kg - weightFirst.kg : null;
  const recentRpe = sessions.slice(-3).map((s) => s.rpe).filter((r) => r != null);
  const canPromote = recentRpe.length >= 3 && recentRpe.every((r) => r <= 2) && levelIdx < LEVELS.length - 1;
  const nextLevel = canPromote ? LEVELS[levelIdx + 1] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-screen-in", style: { flex: 1, display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "16px 16px 4px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12 }, children: greeting(lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 26 }, children: profile.name.toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: BLAZE, fontSize: 10.5, letterSpacing: "0.1em", marginTop: 1 }, children: [
          tr$1(rank.name, lang),
          " · ",
          tr$1(lvl.label, lang),
          nextRank && ` · ${nextRank.min - sessions.length} ${t("home.towards")} ${tr$1(nextRank.name, lang)}`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 3, marginTop: 2, flexShrink: 0 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", width: 46, height: 46 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressRing$1, { progress: campDay / CAMP_DAYS, size: 46, stroke: 5, color: BLAZE }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-display", style: { color: PAPER, fontSize: 13 }, children: campDay }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 8.5, letterSpacing: "0.06em" }, children: [
          t("home.day"),
          " /",
          CAMP_DAYS
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "0 16px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "inline-flex", alignItems: "center", gap: 6, background: `${OLIVE}22`, border: `1px solid ${OLIVE}`, borderRadius: 20, padding: "5px 12px", marginTop: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 12, color: BLAZE }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 10.5, letterSpacing: "0.08em" }, children: [
        t("home.min15"),
        " · ",
        t("home.mission"),
        " ",
        tr$1(todayProgram.focus, lang)
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-ticker o40-mono", style: { marginTop: 10, fontSize: 10.5, color: KHAKI, letterSpacing: "0.12em" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-ticker-inner", children: [`${t("ticker.streak")} ${streak} ${t("dt.days").toUpperCase()}`, `${t("ticker.sessions")} ${sessions.length}`, `${t("ticker.kcal")} ${kcalWeek} / ${t("ticker.week7")}`, `${t("ticker.level")} ${tr$1(lvl.label, lang).toUpperCase()}`, `${t("ticker.mission")} ${todayProgram.id.toUpperCase()}`, `${t("ticker.goal")} ${sessionsThisWeek}/${weeklyGoal} ${t("ticker.week")}`, `${t("ticker.rank")} ${tr$1(rank.name, lang).toUpperCase()}`].concat(`${t("ticker.streak")} ${streak} ${t("dt.days").toUpperCase()}`, `${t("ticker.sessions")} ${sessions.length}`, `${t("ticker.kcal")} ${kcalWeek} / ${t("ticker.week7")}`, `${t("ticker.level")} ${tr$1(lvl.label, lang).toUpperCase()}`, `${t("ticker.mission")} ${todayProgram.id.toUpperCase()}`, `${t("ticker.goal")} ${sessionsThisWeek}/${weeklyGoal} ${t("ticker.week")}`, `${t("ticker.rank")} ${tr$1(rank.name, lang).toUpperCase()}`).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 44 }, children: [
      s,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: BLAZE }, children: "◆" })
    ] }, i)) }) }),
    !profile.seenIntro && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "10px 16px 0", background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`, border: `1px solid ${BLAZE}`, borderRadius: 12, padding: 12, display: "flex", gap: 10, alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 16, color: BLAZE, style: { flexShrink: 0, marginTop: 1 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, color: KHAKI, fontSize: 12, lineHeight: 1.4 }, dangerouslySetInnerHTML: { __html: t("home.intro") } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onDismissIntro, style: { background: "transparent", border: "none", cursor: "pointer", padding: 2, flexShrink: 0 }, "aria-label": t("home.intro.close"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, color: STEEL }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, padding: "14px 16px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag$3, { label: t("dt.streak"), value: usedFreeze ? `${streak} ❄️` : streak, sub: streak === 1 ? t("dt.day") : t("dt.days") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag$3, { label: t("dt.sessions"), value: sessions.length, sub: t("dt.total") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag$3, { label: t("dt.kcal"), value: kcalWeek, sub: t("dt.7d") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "4px 16px 16px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, margin: "12px 0 8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "64", height: "12", viewBox: "0 0 64 12", fill: "none", style: { flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M0 6 H10 L14 2 L18 10 L22 4 L26 8 L30 6 H40 L44 2 L48 10 L52 4 L56 8 L60 6 H64",
            stroke: BLAZE,
            strokeWidth: "1.5",
            strokeLinejoin: "round",
            strokeLinecap: "round",
            className: "o40-ecg"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }, children: t("home.mission.title") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "o40-card o40-ring-border o40-sheen", onClick: () => {
        vibrate(10);
        onOpenProgram(todayProgram);
      }, style: {
        width: "100%",
        textAlign: "left",
        border: `1px solid ${BLAZE}`,
        background: `linear-gradient(150deg, ${INK_2} 0%, ${OLIVE_DARK} 55%, ${OLIVE} 130%)`,
        borderRadius: 18,
        padding: 20,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        boxShadow: `0 10px 30px rgba(0,0,0,0.45), 0 0 0 1px ${BLAZE}22 inset`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, backgroundImage: "url(music-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, background: "rgba(10,12,10,0.6)" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-embers", children: [["8%", "0s", "3.2s"], ["22%", "1.1s", "3.8s"], ["38%", "0.5s", "3.4s"], ["55%", "1.7s", "3.6s"], ["70%", "0.9s", "3.3s"], ["84%", "1.4s", "3.9s"], ["93%", "0.3s", "3.5s"]].map(([l2, d, du], i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-ember", style: { left: l2, animationDelay: d, animationDuration: du } }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: BLAZE, fontSize: 11, letterSpacing: "0.1em" }, children: t("home.mission.tag", { id: todayProgram.id }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 9.5, letterSpacing: "0.08em", background: `${KHAKI}18`, border: `1px solid ${KHAKI}44`, borderRadius: 6, padding: "2px 7px" }, children: tr$1(todayProgram.focus, lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 2, alignItems: "center" }, children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 10, color: i < (todayProgram.difficulty || 2) ? BLAZE : STEEL, fill: i < (todayProgram.difficulty || 2) ? BLAZE : "none" }, i)) }),
            ["H", "I", "J", "K", "L", "M", "N", "O", "P"].includes(todayProgram.id) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: PAPER, fontSize: 9, letterSpacing: "0.08em", background: BLAZE, borderRadius: 6, padding: "2px 7px" }, children: "NEW" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 30, marginTop: 2 }, children: tr$1(todayProgram.name, lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 13.5, marginTop: 2 }, children: tr$1(todayProgram.tagline, lang) }),
          adaptive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10.5, marginTop: 8, background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, padding: "4px 8px", display: "inline-block" }, children: t("home.mission.adaptive") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 14, marginTop: 12, color: STEEL, fontSize: 12.5 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("home.mission.min") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("home.mission.noequip") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("home.mission.ex", { n: todayProgram.exercises.length }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            marginTop: 14,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            color: PAPER,
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 16,
            letterSpacing: "0.05em",
            background: `${BLAZE}33`,
            border: `1px solid ${BLAZE}`,
            borderRadius: 10,
            padding: "7px 14px",
            animation: "glowPulse 2.4s ease-in-out infinite"
          }, children: [
            t("home.mission.see"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 })
          ] })
        ] })
      ] }),
      lastProgram && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onOpenProgram(lastProgram), style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        width: "100%",
        marginTop: 10,
        background: "transparent",
        border: `1px dashed ${OLIVE}`,
        borderRadius: 10,
        padding: 10,
        cursor: "pointer"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 13, color: STEEL }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: STEEL, fontSize: 11.5 }, children: t("home.repeat", { name: tr$1(lastProgram.name, lang) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onOpenProgram(QUICK_PROGRAM), style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        marginTop: 10,
        background: `linear-gradient(135deg, ${INK_2}, ${INK})`,
        border: `1px solid ${KHAKI}`,
        borderRadius: 12,
        padding: 12,
        cursor: "pointer",
        textAlign: "left"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 34, height: 34, borderRadius: "50%", background: `${KHAKI}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 17, color: KHAKI }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 13.5, fontWeight: 600 }, children: tr$1(QUICK_PROGRAM.name, lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 11.5 }, children: [
            tr$1(QUICK_PROGRAM.tagline, lang),
            " · ",
            t("home.quick.min")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, color: STEEL })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "12px 0 8px", background: `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 36, height: 36, borderRadius: "50%", background: `${KHAKI}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 16, color: KHAKI }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, letterSpacing: "0.06em" }, children: [
            "SFIDA DEL GIORNO • ",
            dailyChallenge.bonus
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: tr$1(dailyChallenge.program.name, lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11 }, children: tr$1(dailyChallenge.program.tagline, lang) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onOpenProgram(dailyChallenge.program), style: { background: BLAZE, color: PAPER, border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", flexShrink: 0 }, children: "Vai" })
      ] }),
      (() => {
        const bellyMissions = getBellyMissions({ sessions, profile, waistHistory });
        const bellyProgress = getBellyProgress(sessions, 3);
        const bellyStreak = getBellyStreak(sessions);
        const bellyInsight = getBellyInsight({ sessions, waistHistory, lang });
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "12px 0 8px", background: `linear-gradient(135deg, ${BLAZE}14, ${INK_2})`, border: `1px solid ${BLAZE}66`, borderRadius: 14, padding: 12 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 32, height: 32, borderRadius: "50%", background: `${BLAZE}22`, display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 16, color: BLAZE }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: BLAZE, fontSize: 11, letterSpacing: "0.08em" }, children: "PANCIA • 3 MISSIONI DEDICATE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 11 }, children: bellyInsight })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-display", style: { color: bellyProgress.isDone ? "#7FB069" : BLAZE, fontSize: 18 }, children: [
                bellyProgress.done,
                "/",
                bellyProgress.total
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 8 }, children: "SETTIMANA" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 6, borderRadius: 3, background: OLIVE_DARK, overflow: "hidden", marginBottom: 10 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: `${Math.round(bellyProgress.pct * 100)}%`, height: "100%", background: bellyProgress.isDone ? "#7FB069" : BLAZE, transition: "width 0.4s ease" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8 }, children: bellyMissions.map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onOpenProgram(p2), style: {
            flex: 1,
            background: INK,
            border: `1px solid ${p2.id === "P" ? BLAZE : OLIVE}`,
            borderRadius: 10,
            padding: "10px 8px",
            cursor: "pointer",
            textAlign: "center",
            position: "relative"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: BLAZE, fontSize: 9, letterSpacing: "0.08em" }, children: [
              p2.id,
              " • ",
              tr$1(p2.focus, lang)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 11, fontWeight: 700, lineHeight: 1.2, marginTop: 2 }, children: tr$1(p2.name, lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 1, justifyContent: "center", marginTop: 4 }, children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 8, color: i < (p2.difficulty || 2) ? BLAZE : STEEL, fill: i < (p2.difficulty || 2) ? BLAZE : "none" }, i)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 9, marginTop: 4 }, children: [
              p2.exercises.length,
              " esercizi • ",
              p2.exercises.slice(0, 2).map((e) => {
                var _a, _b;
                return ((_b = (_a = EXERCISES[e]) == null ? void 0 : _a.name) == null ? void 0 : _b.it) || e;
              }).join(" + ")
            ] }),
            bellyStreak >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { position: "absolute", top: 4, right: 4, background: BLAZE, color: PAPER, fontSize: 7, fontWeight: 700, borderRadius: 4, padding: "1px 4px" }, children: [
              "🔥",
              bellyStreak
            ] })
          ] }, p2.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 8, color: STEEL, fontSize: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Streak pancia: ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { style: { color: KHAKI }, children: [
                bellyStreak,
                " gg"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: bellyProgress.isDone ? "Obiettivo pancia raggiunto ✓" : `${bellyProgress.remain} pancia alla meta` })
          ] }),
          (() => {
            const next = shouldProgressBellyLevel({ sessions, currentLevelKey: profile.bellyLevel || "recluta", profile });
            const curLevel = profile.bellyLevel || "recluta";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 10 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onBellyTest, style: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 10px", borderRadius: 8, border: `1px solid ${BLAZE}`, background: profile.bellyTest ? INK : `${BLAZE}18`, color: profile.bellyTest ? KHAKI : BLAZE, fontSize: 11, fontWeight: 700, cursor: "pointer" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 12 }),
                " ",
                profile.bellyTest ? `Test: ${profile.bellyTest.level.toUpperCase()} · Rifai` : "Test Pancia 2.0"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 4, background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, padding: "6px 10px", color: KHAKI, fontSize: 10, fontWeight: 600 }, children: [
                "Liv. ",
                curLevel.toUpperCase()
              ] }),
              next && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: async () => {
                const p2 = { ...profile, bellyLevel: next, bellyLevelUpdated: (/* @__PURE__ */ new Date()).toISOString() };
                try {
                  await window.storage.set("o40_profile", JSON.stringify(p2), false);
                } catch {
                }
                window.location.reload();
              }, style: { padding: "6px 10px", borderRadius: 8, border: `1px solid ${KHAKI}`, background: KHAKI, color: INK, fontSize: 10, fontWeight: 700, cursor: "pointer" }, children: [
                "→ ",
                next.toUpperCase(),
                "?"
              ] })
            ] });
          })(),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, marginTop: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onPose && onPose("squat"), style: { flex: 1, padding: "6px 8px", borderRadius: 8, border: `1px solid ${OLIVE}`, background: INK, color: STEEL, fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 12 }),
            " Conta squat (camera)"
          ] }) })
        ] });
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowOthers((v) => !v), style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        background: showOthers ? OLIVE_DARK : INK_2,
        border: `1px solid ${showOthers ? BLAZE : OLIVE}`,
        borderRadius: 12,
        padding: "12px 14px",
        cursor: "pointer",
        margin: "20px 0 12px",
        boxShadow: showOthers ? `0 4px 12px rgba(0,0,0,0.3)` : "none",
        transition: "all 0.2s ease"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 36, height: 36, borderRadius: "50%", background: showOthers ? BLAZE : `${KHAKI}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 16, color: showOthers ? PAPER : KHAKI }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, textAlign: "left" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: showOthers ? BLAZE : KHAKI, fontSize: 11, letterSpacing: "0.06em" }, children: [
            t("home.other"),
            " • ",
            others.length,
            " missioni"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11, marginTop: 2 }, children: showOthers ? "Tocca per chiudere" : "Esplora tutte le missioni disponibili" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 28, height: 28, borderRadius: "50%", background: showOthers ? BLAZE : OLIVE_DARK, display: "flex", alignItems: "center", justifyContent: "center", transform: showOthers ? "rotate(90deg)" : "none", transition: "all 0.2s ease" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14, color: showOthers ? PAPER : KHAKI }) })
      ] }),
      showOthers && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: others.map((p2, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onOpenProgram(p2), style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: idx === 0 ? `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})` : INK_2,
        border: `1px solid ${idx === 0 ? KHAKI : ["H", "I", "J"].includes(p2.id) ? BLAZE : OLIVE}`,
        borderRadius: 10,
        padding: 12,
        cursor: "pointer",
        textAlign: "left",
        position: "relative"
      }, children: [
        idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { position: "absolute", top: 6, left: 6, background: KHAKI, color: INK, fontSize: 8, fontWeight: 700, borderRadius: 4, padding: "1px 4px" }, children: "★ Consigliata" }),
        ["H", "I", "J", "K", "L", "M", "N", "O", "P"].includes(p2.id) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { position: "absolute", top: 6, right: 6, background: BLAZE, color: PAPER, fontSize: 8, fontWeight: 700, borderRadius: 4, padding: "1px 4px" }, children: "NEW" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 40, height: 40, flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseFigure$1, { pose: EXERCISES[p2.exercises[0]].pose, color: KHAKI }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: PAPER, fontSize: 14.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }, children: [
            tr$1(p2.name, lang),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { display: "flex", gap: 1 }, children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 9, color: i < (p2.difficulty || 2) ? KHAKI : STEEL, fill: i < (p2.difficulty || 2) ? KHAKI : "none" }, i)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12 }, children: tr$1(p2.tagline, lang) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18, color: STEEL })
      ] }, p2.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", margin: "20px 0 8px" }, children: [
        (() => {
          const wp = getWeeklyProgress(sessions, weeklyGoal);
          const cons = getConsistencyScore$1(sessions);
          const risk = getStreakRisk$1(sessions);
          const pace = getAveragePace(sessions);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "0 16px 4px", background: `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})`, border: `1px solid ${risk === "at-risk" ? KHAKI : risk === "break" ? BLAZE : OLIVE}`, borderRadius: 12, padding: "11px 13px", display: "flex", alignItems: "center", gap: 11 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 34, height: 34, borderRadius: "50%", background: `${BLAZE}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, color: risk === "break" ? BLAZE : KHAKI }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: [
                "Aderenza · ",
                cons,
                "% ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: STEEL, fontWeight: 400 }, children: [
                  "· ",
                  wp.done,
                  "/",
                  wp.total,
                  " questa settimana"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 1 }, children: [
                risk === "ok" ? "Streak al sicuro" : risk === "at-risk" ? "Rischio streak — allenati oggi!" : "Streak interrotta — riparti oggi",
                " ",
                pace ? `· ${pace.avgMin}′ / ${pace.avgKcal} kcal medi` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-display", style: { color: wp.isDone ? "#7FB069" : BLAZE, fontSize: 18 }, children: [
                Math.round(wp.pct * 100),
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: "SETTIMANA" })
            ] })
          ] });
        })(),
        (() => {
          const smart = getSmartInsight({ sessions, profile, waistHistory, weightHistory, lang });
          const rec = getSmartRecommendation({ sessions, profile, lang });
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "0 16px 4px", background: `linear-gradient(135deg, ${smart.color}18, ${INK_2})`, border: `1px solid ${smart.color}55`, borderRadius: 12, padding: "11px 13px", display: "flex", gap: 11, alignItems: "center" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 34, height: 34, borderRadius: "50%", background: `${smart.color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }, children: smart.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: smart.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 1, lineHeight: 1.4 }, children: smart.body }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: KHAKI, fontSize: 10.5, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { size: 10 }),
                " ",
                rec.reason
              ] })
            ] })
          ] });
        })(),
        (() => {
          const ch = getPersonalChallenge(sessions, profile);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "0 16px 4px", background: `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})`, border: `1px solid ${ch.color}55`, borderRadius: 12, padding: "11px 13px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 16 }, children: ch.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, letterSpacing: "0.06em" }, children: [
                ch.title.toUpperCase(),
                " • SFIDA PERSONALE"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { marginLeft: "auto", color: ch.color, fontSize: 11, fontWeight: 700 }, children: [
                Math.round(ch.progress * 100),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: ch.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 6, borderRadius: 3, background: OLIVE_DARK, marginTop: 8, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: `${Math.round(ch.progress * 100)}%`, height: "100%", background: ch.color, transition: "width 0.4s ease" } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 6, color: STEEL, fontSize: 10.5 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                ch.current,
                "/",
                ch.target
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: ch.progress >= 1 ? "#7FB069" : KHAKI, display: "flex", alignItems: "center", gap: 4 }, children: ch.progress >= 1 ? "Completata! 🎉" : getRecoveryTip(sessions, lang) })
            ] })
          ] });
        })(),
        (() => {
          const ach = getAchievementsProgress(sessions);
          const nextAch = getNextAchievements(sessions, 3);
          const unlocked = ach.filter((a) => a.unlocked).length;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "0 16px 4px", background: `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: "11px 13px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { size: 14, color: KHAKI }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, letterSpacing: "0.06em" }, children: [
                "ACHIEVEMENTS • ",
                unlocked,
                "/",
                ach.length
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: "auto", color: unlocked === ach.length ? "#7FB069" : STEEL, fontSize: 10 }, children: unlocked === ach.length ? "Tutte!" : `${ach.length - unlocked} mancanti` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, overflowX: "auto" }, children: ach.slice(0, 6).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minWidth: 64, background: a.unlocked ? `${a.color}22` : INK, border: `1px solid ${a.unlocked ? a.color : OLIVE}`, borderRadius: 10, padding: "6px 8px", textAlign: "center", flexShrink: 0, opacity: a.unlocked ? 1 : 0.6 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 16 }, children: a.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: a.unlocked ? PAPER : STEEL, fontSize: 9, fontWeight: 700, lineHeight: 1.2 }, children: a.title.it }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 3, borderRadius: 2, background: OLIVE_DARK, marginTop: 4 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: `${Math.round(a.progress * 100)}%`, height: "100%", background: a.color } }) })
            ] }, a.id)) }),
            nextAch.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }, children: nextAch.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { background: `${a.color}22`, border: `1px solid ${a.color}55`, color: PAPER, fontSize: 10, padding: "2px 7px", borderRadius: 20 }, children: [
              a.icon,
              " ",
              a.title.it,
              " ",
              Math.round(a.progress * 100),
              "%"
            ] }, a.id)) })
          ] });
        })(),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "0 16px 4px", background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: "11px 13px", display: "flex", alignItems: "center", gap: 11 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 34, height: 34, borderRadius: "50%", background: `${BLAZE}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ruler, { size: 16, color: BLAZE }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: [
              t("home.waist.title"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontWeight: 400 }, children: t("home.waist.sub") })
            ] }),
            waist ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: KHAKI, fontSize: 11.5, marginTop: 1 }, children: [
              t("home.waist.last", { v: waist.cm }),
              waistDelta != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: waistDelta <= 0 ? "#7FB069" : BLAZE, marginLeft: 6, display: "inline-flex", alignItems: "center", gap: 3 }, children: [
                waistDelta <= 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 12 }),
                waistDelta > 0 ? "+" : "",
                t("home.waist.delta", { v: waistDelta })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 1 }, children: t("home.waist.empty") })
          ] }),
          waist && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: waistDelta != null && waistDelta <= 0 ? "#7FB069" : KHAKI, fontSize: 11 }, children: waistDelta != null && waistDelta <= 0 ? t("home.trendok") : t("home.start") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "0 16px 4px", background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: "11px 13px", display: "flex", alignItems: "center", gap: 11 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 34, height: 34, borderRadius: "50%", background: `${KHAKI}1f`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { size: 16, color: KHAKI }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: [
              t("home.weight.title"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontWeight: 400 }, children: t("home.weight.sub") })
            ] }),
            weight ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: KHAKI, fontSize: 11.5, marginTop: 1 }, children: [
              t("home.weight.last", { v: weight.kg }),
              weightDelta != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: weightDelta <= 0 ? "#7FB069" : BLAZE, marginLeft: 6, display: "inline-flex", alignItems: "center", gap: 3 }, children: [
                weightDelta <= 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 12 }),
                weightDelta > 0 ? "+" : "",
                t("home.weight.delta", { v: weightDelta.toFixed(1) })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 1 }, children: t("home.weight.empty") })
          ] }),
          weight && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: weightDelta != null && weightDelta <= 0 ? "#7FB069" : KHAKI, fontSize: 11 }, children: weightDelta != null && weightDelta <= 0 ? t("home.trendok") : t("home.start") })
        ] }),
        nextLevel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "8px 16px 0", display: "flex", alignItems: "center", gap: 10, background: `linear-gradient(135deg, ${BLAZE_DEEP}, ${INK_2})`, border: `1px solid ${BLAZE}`, borderRadius: 12, padding: "11px 13px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 16, color: PAPER, style: { flexShrink: 0 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: t("home.promote.title", { lvl: tr$1(nextLevel.label, lang) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 11.5, marginTop: 1 }, children: t("home.promote.body") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onPromote, style: {
            background: BLAZE,
            border: "none",
            borderRadius: 8,
            padding: "8px 12px",
            cursor: "pointer",
            flexShrink: 0
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: PAPER, fontSize: 11 }, children: t("home.promote.btn") }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "0 16px 4px" }, children: [
          (() => {
            const gp = getGoalProgress(sessions, weeklyGoal);
            const hist = getGoalHistory(sessions, weeklyGoal, 6);
            const sugg = suggestNextGoal(sessions, weeklyGoal);
            const kcalWeekEst = estimateWeeklyCalories(sessions, weeklyGoal);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})`, border: `1px solid ${gp.isDone ? "#7FB069" : OLIVE}`, borderRadius: 14, padding: 12, display: "flex", gap: 12, alignItems: "center" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GoalRing, { done: gp.done, total: gp.total, size: 64, stroke: 6 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, letterSpacing: "0.06em" }, children: [
                  t("home.goal.title"),
                  " · ",
                  formatGoal(weeklyGoal),
                  " ",
                  gp.isDone && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#7FB069" }, children: "✓" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600, marginTop: 2 }, children: [
                  gp.isDone ? "Obiettivo raggiunto!" : `${gp.remain} ${gp.remain === 1 ? "sessione" : "sessioni"} alla meta`,
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: STEEL, fontWeight: 400 }, children: [
                    "· ~",
                    kcalWeekEst,
                    " kcal/sett."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MiniGoalBar, { history: hist }) }),
                sugg !== weeklyGoal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: KHAKI, fontSize: 10.5, marginTop: 6, display: "flex", alignItems: "center", gap: 4 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { size: 10 }),
                  " ",
                  lang === "it" ? `Suggerito: ${formatGoal(sugg)}` : `Suggested: ${formatGoal(sugg)}`
                ] })
              ] })
            ] });
          })(),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SegmentedProgress$1, { total: weeklyGoal, current: Math.min(sessionsThisWeek, weeklyGoal), currentProgress: 1, color: sessionsThisWeek >= weeklyGoal ? "#7FB069" : BLAZE }) }),
          upcoming && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginTop: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 12, color: KHAKI }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 11 }, children: t("home.next.title", { n: upcoming.remaining, unit: upcoming.kind === "serie" ? upcoming.remaining === 1 ? t("home.unit.streak1") : t("home.unit.streakN") : upcoming.remaining === 1 ? t("home.unit.session1") : t("home.unit.sessionN") }) })
          ] })
        ] }),
        (() => {
          const next = getNextMedals(sessions, 3);
          if (!next.length) return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "0 16px 8px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { size: 16, color: KHAKI }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, letterSpacing: "0.06em" }, children: "PROSSIME MEDAGLIE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }, children: next.map((m2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { background: `${m2.color}22`, border: `1px solid ${m2.color}55`, color: PAPER, fontSize: 11, padding: "2px 7px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4 }, children: [
                m2.icon,
                " ",
                m2.n,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: KHAKI, fontSize: 9 }, children: [
                  Math.round(m2.progress * 100),
                  "%"
                ] })
              ] }, `${m2.type}-${m2.n}`)) })
            ] })
          ] }) });
        })(),
        t("home.yours")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
        customPrograms.map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: INK_2,
          border: `1px solid ${OLIVE}`,
          borderRadius: 10,
          padding: 12
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onOpenProgram(p2), style: { display: "flex", alignItems: "center", gap: 12, background: "transparent", border: "none", cursor: "pointer", textAlign: "left", flex: 1, padding: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 40, height: 40, flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseFigure$1, { pose: EXERCISES[p2.exercises[0]].pose, color: KHAKI }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 14.5, fontWeight: 600 }, children: tr$1(p2.name, lang) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 12 }, children: [
                tr$1(p2.tagline, lang),
                " · ",
                t("home.custom.ex", { n: p2.exercises.length })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onEditCustom(p2), style: { ...btnIcon$3, background: "transparent" }, "aria-label": "Modifica", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 14, color: KHAKI }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            if (confirmDeleteId === p2.id) {
              onDeleteCustom(p2.id);
              setConfirmDeleteId(null);
            } else {
              setConfirmDeleteId(p2.id);
              setTimeout(() => setConfirmDeleteId((c) => c === p2.id ? null : c), 3e3);
            }
          }, style: { ...btnIcon$3, background: confirmDeleteId === p2.id ? `${BLAZE}33` : "transparent" }, "aria-label": t("home.custom.delete"), children: confirmDeleteId === p2.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16, color: STEEL }) })
        ] }, p2.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onBuild, style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          background: "transparent",
          border: `1px dashed ${KHAKI}`,
          borderRadius: 10,
          padding: 14,
          cursor: "pointer"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, color: KHAKI }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 12.5, letterSpacing: "0.05em" }, children: t("home.custom.create") })
        ] })
      ] })
    ] })
  ] });
}
function loadFavorites() {
  try {
    const v = localStorage.getItem("o40_favs");
    return v ? JSON.parse(v) : [];
  } catch {
    return [];
  }
}
async function saveFavoritesAsync(list) {
  try {
    await window.storage.set("o40_favs", JSON.stringify(list));
  } catch {
  }
}
function saveFavorites(list) {
  try {
    localStorage.setItem("o40_favs", JSON.stringify(list));
  } catch {
  }
  saveFavoritesAsync(list).catch(() => {
  });
}
function toggleFavorite(list, id) {
  const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  saveFavorites(next);
  return next;
}
function LibraryScreen({ sessions, profile }) {
  const { lang, t } = useT();
  const [filter, setFilter] = reactExports.useState("all");
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [query, setQuery] = reactExports.useState("");
  const [showFavs, setShowFavs] = reactExports.useState(false);
  const [favs, setFavs] = reactExports.useState(() => loadFavorites());
  const visibleIds = Object.keys(EXERCISES).filter((id) => {
    const ex = EXERCISES[id];
    const byGroup = filter === "all" ? true : EXERCISE_GROUPS$1[filter].includes(id);
    const byFav = showFavs ? favs.includes(id) : true;
    const q2 = query.trim().toLowerCase();
    const byQuery = !q2 || tr$1(ex.name, lang).toLowerCase().includes(q2) || id.toLowerCase().includes(q2) || tr$1(ex.cue, lang).toLowerCase().includes(q2);
    return byGroup && byFav && byQuery;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-screen-in", style: { flex: 1, display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "16px 16px 4px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 26 }, children: t("lib.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 13 }, children: t("lib.sub") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "10px 16px 0" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-search-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: lang === "it" ? "Cerca esercizio…" : lang === "de" ? "Übung suchen…" : "Search exercise…", className: "o40-search" }),
      query && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQuery(""), style: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", color: STEEL, cursor: "pointer" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, padding: "12px 16px 4px", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowFavs((v) => !v), style: { padding: "6px 12px", borderRadius: 20, cursor: "pointer", background: showFavs ? BLAZE : "transparent", border: `1px solid ${showFavs ? BLAZE : OLIVE}`, display: "flex", alignItems: "center", gap: 4 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 12, color: showFavs ? PAPER : KHAKI, fill: showFavs ? PAPER : "none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: showFavs ? PAPER : STEEL, fontSize: 11 }, children: [
          showFavs ? "★" : "☆",
          " ",
          favs.length || ""
        ] })
      ] }),
      [["all", t("lib.all")], ["standing", t("lib.standing")], ["ground", t("lib.ground")], ["core", t("lib.core")]].map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(key), style: {
        padding: "6px 12px",
        borderRadius: 20,
        cursor: "pointer",
        background: filter === key ? BLAZE : "transparent",
        border: `1px solid ${filter === key ? BLAZE : OLIVE}`
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: filter === key ? PAPER : STEEL, fontSize: 11 }, children: label }) }, key))
    ] }),
    (() => {
      const lastProg = sessions && sessions.length ? sessions[sessions.length - 1].programId : null;
      const recIds = lastProg && EXERCISES[lastProg] ? [] : profile ? PROGRAMS.find((pr) => pr.id === "A").exercises.slice(0, 3) : [];
      let rec = recIds.length ? recIds : ["plank", "squat", "jumpingjack"].filter((id) => !favs.includes(id)).slice(0, 3);
      const cons = getConsistencyScore(sessions);
      const risk = getStreakRisk(sessions);
      if (risk === "at-risk" && !query && !showFavs) {
        rec = ["wallsit", "ponte", "superman"].filter((id) => !favs.includes(id)).slice(0, 3);
      } else if (cons < 30 && !query && !showFavs) {
        rec = ["jumpingjack", "squat", "crunch"].filter((id) => !favs.includes(id)).slice(0, 3);
      }
      const label = risk === "at-risk" ? lang === "it" ? "Recupero consigliato" : "Recovery pick" : cons < 30 ? lang === "it" ? "Partenza facile" : "Easy start" : lang === "it" ? "Consigliati per te" : "Recommended for you";
      if (!query && !showFavs && rec.length) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "8px 16px 0" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, letterSpacing: "0.06em", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 10 }),
          " ",
          label,
          " ",
          cons ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: STEEL, marginLeft: 6 }, children: [
            "· ",
            cons,
            "% aderenza"
          ] }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }, children: rec.map((rid) => {
          const ex = EXERCISES[rid];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelectedId(rid), style: { minWidth: 110, background: `linear-gradient(135deg, ${INK_2}, ${INK})`, border: `1px solid ${favs.includes(rid) ? BLAZE : OLIVE}`, borderRadius: 12, padding: 10, cursor: "pointer", textAlign: "center", boxShadow: favs.includes(rid) ? `0 0 0 1px ${BLAZE}22` : "none" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 44, height: 44, margin: "0 auto 6px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseFigure$1, { pose: ex.pose, color: favs.includes(rid) ? BLAZE : KHAKI }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 11, fontWeight: 700 }, children: tr$1(ex.name, lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: favs.includes(rid) ? BLAZE : STEEL, fontSize: 9 }, children: favs.includes(rid) ? "★ preferito" : "tap per aprire" })
          ] }, `rec-${rid}`);
        }) })
      ] });
      return null;
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-scroll", style: { flex: 1, overflowY: "auto", padding: 16 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: visibleIds.map((id) => {
      const ex = EXERCISES[id];
      const isOpen = selectedId === id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "o40-card", onClick: () => {
        const opening = !isOpen;
        setSelectedId(opening ? id : null);
        if (opening) speak(tr$1(ex.name, lang));
      }, style: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        background: INK_2,
        border: `1px solid ${isOpen ? BLAZE : OLIVE}`,
        borderRadius: 14,
        padding: 12,
        cursor: "pointer",
        textAlign: "left",
        width: "100%"
      }, children: [
        isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-expand", style: { width: "100%", aspectRatio: hasClip(id, ex.pose) ? "9 / 16" : "1 / 1", maxHeight: hasClip(id, ex.pose) ? 320 : 260, background: INK, borderRadius: 10, border: `1px solid ${OLIVE}`, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseMedia, { exerciseId: id, pose: ex.pose, color: BLAZE, rounded: 10 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 12 }, children: [
          !isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 52, height: 52, flexShrink: 0, background: INK, borderRadius: 8, border: `1px solid ${OLIVE}`, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseMedia, { exerciseId: id, pose: ex.pose, color: BLAZE, rounded: 8 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontWeight: 700, fontSize: 14.5, flex: 1 }, children: tr$1(ex.name, lang) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
                e.stopPropagation();
                const next = toggleFavorite(favs, id);
                setFavs(next);
              }, className: "o40-fav", style: { background: "transparent", border: "none", cursor: "pointer", padding: 4 }, "aria-label": "favorite", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 16, color: favs.includes(id) ? BLAZE : STEEL, fill: favs.includes(id) ? BLAZE : "none" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 12 }, children: tr$1(ex.repGuide, lang) }),
            isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 3, marginTop: 5, textAlign: "left" }, children: ex.steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, alignItems: "flex-start" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, minWidth: 13 }, children: [
                  i + 1,
                  "."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 11.5, lineHeight: 1.4 }, children: tr$1(s, lang) })
              ] }, i)) }),
              ex.breath && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, alignItems: "center", marginTop: 6, color: OLIVE }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { size: 12, style: { flexShrink: 0 } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, fontStyle: "italic", lineHeight: 1.4 }, children: tr$1(ex.breath, lang) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 6, lineHeight: 1.4, fontStyle: "italic" }, children: tr$1(ex.tip40, lang) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 3, lineHeight: 1.4 }, children: tr$1(ex.cue, lang) })
          ] })
        ] })
      ] }, id);
    }) }) })
  ] });
}
const inputStyle$1 = { width: "100%", background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: "12px 14px", color: PAPER, fontSize: 16, fontFamily: "Inter, sans-serif", outline: "none" };
const primaryBtn$4 = { background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, color: PAPER, border: "none", borderRadius: 14, padding: "12px 16px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: "0.05em", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%" };
function Field({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }, children: label }),
    children
  ] });
}
function BuilderScreen({ profile, initial, onCancel, onCreate, onUpdate }) {
  const { lang, t } = useT();
  const [selected, setSelected] = reactExports.useState(initial ? initial.exercises : []);
  const [rounds, setRounds] = reactExports.useState(initial ? initial.rounds : 2);
  const [name, setName] = reactExports.useState(initial ? initial.name : "");
  const [filter, setFilter] = reactExports.useState("all");
  function toggleEx(id) {
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : s.length < 10 ? [...s, id] : s);
  }
  const isEdit = !!initial;
  const canCreate = selected.length >= 3;
  const draft = { id: initial ? initial.id : `custom-${Date.now()}`, name: name.trim() || t("bld.draft.name"), tagline: t("bld.draft.tagline"), rounds, exercises: selected };
  const preset = levelPreset(profile);
  const kcal = canCreate ? Math.round(estimateProgramKcal(draft, profile.weight, !!profile.skipWarmup, preset.work, preset.rest)) : 0;
  const mins = canCreate ? Math.round(totalSeqSeconds(draft, !!profile.skipWarmup, preset.work, preset.rest) / 60) : 0;
  const visibleIds = Object.keys(EXERCISES).filter(
    (id) => filter === "all" ? true : EXERCISE_GROUPS[filter].includes(id)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-screen-in", style: { flex: 1, display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopBar, { title: t("bld.title"), onBack: onCancel }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-scroll", style: { flex: 1, overflowY: "auto", padding: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("bld.name"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: name,
          onChange: (e) => setName(e.target.value),
          placeholder: t("bld.name.ph"),
          className: "o40-input",
          style: inputStyle$1
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 16 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }, children: t("bld.rounds") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8 }, children: [1, 2, 3].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setRounds(r), style: {
          flex: 1,
          padding: "10px 0",
          borderRadius: 10,
          cursor: "pointer",
          textAlign: "center",
          background: rounds === r ? BLAZE : INK_2,
          border: `1px solid ${rounds === r ? BLAZE : OLIVE}`
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-display", style: { color: PAPER, fontSize: 18 }, children: r }) }, r)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", margin: "18px 0 8px" }, children: t("bld.exercises", { sel: selected.length }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8, marginBottom: 10 }, children: [["all", t("lib.all")], ["standing", t("lib.standing")], ["ground", t("lib.ground")], ["core", t("lib.core")]].map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(key), style: {
        padding: "6px 12px",
        borderRadius: 20,
        cursor: "pointer",
        background: filter === key ? BLAZE : "transparent",
        border: `1px solid ${filter === key ? BLAZE : OLIVE}`
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: filter === key ? PAPER : STEEL, fontSize: 11 }, children: label }) }, key)) }),
      selected.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 12, background: INK_2, border: `1px solid ${BLAZE}`, borderRadius: 10, padding: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, letterSpacing: "0.06em", marginBottom: 6 }, children: "Ordine selezionati · trascina su/giù" }),
        selected.map((sid, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: idx < selected.length - 1 ? `1px solid ${OLIVE_DARK}` : "none" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: STEEL, fontSize: 10 }, children: [
            idx + 1,
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { flex: 1, color: PAPER, fontSize: 12 }, children: EXERCISES[sid] ? EXERCISES[sid].name.it : sid }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: idx === 0, onClick: () => setSelected((s) => {
            const a = [...s];
            [a[idx - 1], a[idx]] = [a[idx], a[idx - 1]];
            return a;
          }), style: { background: "transparent", border: `1px solid ${OLIVE}`, borderRadius: 6, padding: "2px 6px", color: PAPER, opacity: idx === 0 ? 0.3 : 1, cursor: idx === 0 ? "default" : "pointer" }, children: "↑" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: idx === selected.length - 1, onClick: () => setSelected((s) => {
            const a = [...s];
            [a[idx], a[idx + 1]] = [a[idx + 1], a[idx]];
            return a;
          }), style: { background: "transparent", border: `1px solid ${OLIVE}`, borderRadius: 6, padding: "2px 6px", color: PAPER, opacity: idx === selected.length - 1 ? 0.3 : 1, cursor: idx === selected.length - 1 ? "default" : "pointer" }, children: "↓" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelected((s) => s.filter((x) => x !== sid)), style: { background: "transparent", border: "none", color: STEEL, cursor: "pointer", padding: 4 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 }) })
        ] }, sid))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: visibleIds.map((id) => {
        const ex = EXERCISES[id];
        const on = selected.includes(id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggleEx(id), style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: on ? OLIVE_DARK : INK_2,
          border: `1px solid ${on ? BLAZE : OLIVE}`,
          borderRadius: 10,
          padding: 10,
          cursor: "pointer",
          textAlign: "left"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 36, height: 36, flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseFigure, { pose: ex.pose, color: on ? BLAZE : STEEL }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 13.5, fontWeight: 600 }, children: tr$1(ex.name, lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11 }, children: tr$1(ex.repGuide, lang) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            width: 20,
            height: 20,
            borderRadius: 5,
            border: `1px solid ${on ? BLAZE : OLIVE}`,
            background: on ? BLAZE : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }, children: on && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 13, color: PAPER }) })
        ] }, id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: 16, borderTop: `1px solid ${OLIVE_DARK}` }, children: canCreate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 14, marginBottom: 10, color: STEEL, fontSize: 12.5, justifyContent: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("bld.min", { m: mins }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("bld.kcal", { k: kcal }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => isEdit ? onUpdate(draft) : onCreate(draft), style: primaryBtn$4, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 18 }),
        " ",
        isEdit ? "AGGIORNA" : t("bld.create.go")
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 13, textAlign: "center" }, children: t("bld.hint") }) })
  ] });
}
function groupOf(id) {
  return EXERCISE_GROUPS.standing.includes(id) ? "standing" : "ground";
}
function PreviewScreen({ program, profile, soundOn, onBack, onStart }) {
  const { lang, t } = useT();
  const [selectedId, setSelectedId] = useState(null);
  const [subs, setSubs] = useState({});
  const [swapOpenId, setSwapOpenId] = useState(null);
  const effectiveExercises = program.exercises.map((id) => subs[id] || id);
  const effectiveProgram = { ...program, exercises: effectiveExercises };
  const preset = levelPreset$1(profile);
  const mode = profile && profile.executionMode || "time";
  const levelKey = profile && profile.level || "combattente";
  const kcal = Math.round(estimateProgramKcal$1(effectiveProgram, profile.weight, !!profile.skipWarmup, preset.work, preset.rest, mode, levelKey));
  const mins = Math.round(totalSeqSeconds$1(effectiveProgram, !!profile.skipWarmup, preset.work, preset.rest, mode, levelKey) / 60);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-screen-in", style: { flex: 1, display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopBar, { title: t("prev.title", { id: program.id }), onBack }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-scroll", style: { flex: 1, overflowY: "auto", padding: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 26 }, children: tr$1(program.name, lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 14, marginBottom: 14 }, children: tr$1(program.tagline, lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 18 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag, { label: t("dt.duration"), value: `${mins}′` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag, { label: t("dt.estkcal"), value: kcal }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag, { label: t("dt.rounds"), value: program.rounds })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", margin: "4px 0 10px" }, children: t("prev.sub", { n: program.exercises.length, r: program.rounds, p: mode === "reps" ? lang === "it" ? "Ripetizioni" : lang === "de" ? "Wiederholungen" : "Reps" : tr$1(preset.label, lang) }) }),
      mode === "reps" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: BLAZE, fontSize: 11, marginBottom: 8, background: `${BLAZE}14`, border: `1px solid ${BLAZE}44`, borderRadius: 8, padding: "6px 10px", textAlign: "center" }, children: lang === "it" ? "Modalità ripetizioni: tocca FATTO quando hai finito ogni esercizio. Hold resta a tempo." : "Reps mode: tap DONE when finished each exercise. Holds stay timed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: program.exercises.map((originalId, i) => {
        const currentId = subs[originalId] || originalId;
        const ex = EXERCISES[currentId];
        const isOpen = selectedId === originalId;
        const isSwapping = swapOpenId === originalId;
        const isSubbed = !!subs[originalId];
        const usedElsewhere = effectiveExercises.filter((_, idx) => program.exercises[idx] !== originalId);
        const alternatives = EXERCISE_GROUPS[groupOf(originalId)].filter((aid) => aid !== currentId && !usedElsewhere.includes(aid));
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "flex",
          flexDirection: "column",
          gap: 12,
          background: INK_2,
          border: `1px solid ${isOpen ? BLAZE : OLIVE}`,
          borderRadius: 10,
          padding: 12
        }, children: [
          isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-expand", style: { width: "100%", aspectRatio: hasClip(currentId, ex.pose) ? "9 / 16" : "1 / 1", maxHeight: hasClip(currentId, ex.pose) ? 320 : 260, background: INK, borderRadius: 10, border: `1px solid ${OLIVE}`, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseMedia, { exerciseId: currentId, pose: ex.pose, color: BLAZE, rounded: 10 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 12 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              const opening = !isOpen;
              setSelectedId(opening ? originalId : null);
              if (opening && soundOn) speak(tr$1(ex.name, lang));
            }, style: {
              display: "flex",
              gap: 12,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              padding: 0,
              flex: 1,
              minWidth: 0
            }, children: [
              !isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 52, height: 52, flexShrink: 0, background: INK, borderRadius: 8, border: `1px solid ${OLIVE}`, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseMedia, { exerciseId: currentId, pose: ex.pose, color: BLAZE, rounded: 8 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: STEEL, fontSize: 11 }, children: [
                    i + 1,
                    "."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: PAPER, fontWeight: 700, fontSize: 14.5 }, children: tr$1(ex.name, lang) }),
                  isSubbed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 9, border: `1px solid ${OLIVE}`, borderRadius: 4, padding: "1px 4px" }, children: t("prev.swapped") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: KHAKI, fontSize: 12, display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }, children: [
                  (() => {
                    const reps = mode === "reps" ? getReps(currentId, levelKey) : null;
                    return reps ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { background: `${BLAZE}22`, border: `1px solid ${BLAZE}55`, color: BLAZE, padding: "1px 6px", borderRadius: 6, fontWeight: 700 }, children: [
                      "×",
                      reps
                    ] }) : null;
                  })(),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tr$1(ex.repGuide, lang) }),
                  mode === "reps" && !HOLD_EXERCISES.has(currentId) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: STEEL, fontSize: 10 }, children: [
                    "· ",
                    lang === "it" ? "tocca FATTO" : "tap DONE"
                  ] })
                ] }),
                isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 3, marginTop: 5, textAlign: "left" }, children: ex.steps.map((s, k2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, alignItems: "flex-start" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, minWidth: 13 }, children: [
                    k2 + 1,
                    "."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 11.5, lineHeight: 1.4 }, children: tr$1(s, lang) })
                ] }, k2)) }),
                isOpen && ex.breath && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, alignItems: "center", marginTop: 6, color: OLIVE }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { size: 12, style: { flexShrink: 0 } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, fontStyle: "italic", lineHeight: 1.4 }, children: tr$1(ex.breath, lang) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 3, lineHeight: 1.4, fontStyle: "italic" }, children: tr$1(ex.tip40, lang) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSwapOpenId(isSwapping ? null : originalId), style: { ...btnIcon, flexShrink: 0, alignSelf: "flex-start" }, "aria-label": t("prev.swap"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 16, color: isSwapping ? BLAZE : STEEL }) })
          ] }),
          isSwapping && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, paddingTop: 4, borderTop: `1px solid ${OLIVE_DARK}` }, children: [
            isSubbed && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              setSubs((s) => {
                const n2 = { ...s };
                delete n2[originalId];
                return n2;
              });
              setSwapOpenId(null);
            }, style: {
              padding: "6px 10px",
              borderRadius: 20,
              background: "transparent",
              border: `1px solid ${KHAKI}`,
              cursor: "pointer"
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 10.5 }, children: t("prev.restore", { name: tr$1(EXERCISES[originalId].name, lang) }) }) }),
            alternatives.map((aid) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              setSubs((s) => ({ ...s, [originalId]: aid }));
              setSwapOpenId(null);
            }, style: {
              padding: "6px 10px",
              borderRadius: 20,
              background: INK,
              border: `1px solid ${OLIVE}`,
              cursor: "pointer"
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: PAPER, fontSize: 10.5 }, children: tr$1(EXERCISES[aid].name, lang) }) }, aid))
          ] })
        ] }, originalId);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: 16, borderTop: `1px solid ${OLIVE_DARK}` }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onStart(effectiveProgram), className: "o40-pulsebtn", style: { ...primaryBtn, borderRadius: 14 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 18 }),
      " ",
      t("prev.go")
    ] }) })
  ] });
}
let lock = null;
async function requestWakeLock() {
  if (!("wakeLock" in navigator)) return null;
  try {
    lock = await navigator.wakeLock.request("screen");
    lock.addEventListener("release", () => {
      lock = null;
    });
    return lock;
  } catch {
    return null;
  }
}
async function releaseWakeLock() {
  try {
    if (lock) await lock.release();
    lock = null;
  } catch {
  }
}
const primaryBtn$3 = { background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, color: PAPER, border: "none", borderRadius: 14, padding: "12px 16px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: "0.05em", cursor: "pointer" };
const btnIcon$2 = { background: "transparent", border: "none", padding: 6, cursor: "pointer", display: "flex", borderRadius: 10 };
let _mediaPromise = null;
function getMediaMap() {
  if (!_mediaPromise) _mediaPromise = __vitePreload(() => import("./media-_rtSdoti.js"), true ? [] : void 0, import.meta.url).then((m2) => ({ b64: m2.VIDEO_B64, files: m2.VIDEO_FILES }));
  return _mediaPromise;
}
function ExerciseMedia$1({ exerciseId, pose, color = BLAZE, size = "100%", rounded = 10 }) {
  const [src, setSrc] = reactExports.useState(null);
  const [videoSrc, setVideoSrc] = reactExports.useState(null);
  const [failed, setFailed] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    setSrc(null);
    setVideoSrc(null);
    setFailed(false);
    getMediaMap().then(({ b64, files }) => {
      if (cancelled) return;
      const clip = files[exerciseId] || files[pose] || null;
      setVideoSrc(clip);
      if (!clip) setSrc(b64[exerciseId] || b64[pose] || null);
    }).catch(() => {
      if (!cancelled) setFailed(true);
    });
    return () => {
      cancelled = true;
    };
  }, [exerciseId]);
  if (videoSrc && !failed) return /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: videoSrc, autoPlay: true, muted: true, loop: true, playsInline: true, preload: "metadata", onError: () => setFailed(true), style: { width: size, height: size, objectFit: "cover", borderRadius: rounded, display: "block", background: INK } });
  if (src && !failed) return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", onError: () => setFailed(true), style: { width: size, height: size, objectFit: "cover", borderRadius: rounded, display: "block", background: INK } });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseFigure$1, { pose, color, size });
}
function ProgressRing({ progress, size = 240, stroke = 12, color, comet = true }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(1, progress)));
  const gradId = `ring-grad-${color.replace("#", "")}`;
  const angle = Math.max(1e-3, Math.min(0.999, progress)) * 2 * Math.PI;
  const dotX = size / 2 + radius * Math.sin(angle);
  const dotY = size / 2 - radius * Math.cos(angle);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: size, height: size, style: { transform: "rotate(-90deg)", filter: `drop-shadow(0 0 10px ${color}55)` }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: gradId, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: color, stopOpacity: "0.65" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: color, stopOpacity: "1" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: size / 2, cy: size / 2, r: radius, stroke: OLIVE_DARK, strokeWidth: stroke, fill: "none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: size / 2, cy: size / 2, r: radius, stroke: `url(#${gradId})`, strokeWidth: stroke, fill: "none", strokeDasharray: circumference, strokeDashoffset: offset, strokeLinecap: "round", style: { transition: "stroke-dashoffset 1s linear" } }),
    comet && progress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: dotX, cy: dotY, r: stroke * 2, fill: color, opacity: "0.15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "o40-comet", cx: dotX, cy: dotY, r: stroke * 0.8, fill: PAPER })
    ] })
  ] });
}
function EqBars({ tone = BLAZE, bars = 5, speed = 1, style }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "flex-end", gap: 3, height: 14, ...style }, "aria-hidden": "true", children: Array.from({ length: bars }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-eqbar", style: { width: 3, background: tone, height: 8, animation: `eqPulse ${(0.55 + i % 3 * 0.18) / speed}s ease-in-out ${i * 0.08}s infinite` } }, i)) });
}
function SegmentedProgress({ total, current, currentProgress, color }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 4, width: "100%" }, children: Array.from({ length: total }).map((_, i) => {
    const isDone = i < current;
    const isActive = i === current;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, height: 6, borderRadius: 3, background: isDone || isActive ? color : OLIVE_DARK, opacity: isActive ? 0.5 + 0.5 * currentProgress : 1, transition: "opacity 0.3s linear, background 0.3s ease", boxShadow: isDone || isActive ? `0 0 8px ${color}66` : "none" } }, i);
  }) });
}
function SessionScreen({ program, profile, seq, phaseIdx, secondsLeft, paused, setPaused, soundOn, setSoundOn, musicOn, onToggleMusic, aiEnabled, onToggleAi, lang: langProp, onSkip, onPrev, exitConfirm, setExitConfirm, onExit }) {
  const { lang: ctxLang, t } = useT();
  const lang = langProp ?? ctxLang;
  const phase = seq[phaseIdx];
  const next = seq[phaseIdx + 1];
  const ex = phase.exerciseId ? EXERCISES[phase.exerciseId] : null;
  const nextEx = next && next.exerciseId ? EXERCISES[next.exerciseId] : null;
  const isRepsWork = phase.type === "work" && phase.mode === "reps";
  const isAiWork = aiEnabled && phase.type === "work" && !!phase.exerciseId;
  const progress = isRepsWork ? 1 : phase.duration ? 1 - secondsLeft / phase.duration : 0;
  reactExports.useEffect(() => {
    if (soundOn && profile && profile.voiceCountdown && secondsLeft <= 3 && secondsLeft > 0 && phase.type === "work" && !isRepsWork) speak$1(String(secondsLeft), lang, LOCALES);
  }, [secondsLeft, phase.type, soundOn, profile, isRepsWork]);
  reactExports.useEffect(() => {
    requestWakeLock();
    function onVis() {
      if (!document.hidden) requestWakeLock();
    }
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      releaseWakeLock();
    };
  }, []);
  const phaseLabel = phase.type === "warmup" ? t("ses.warmup") : phase.type === "cooldown" ? t("ses.cooldown") : phase.type === "rest" ? t("ses.rest") : t("ses.round", { r: phase.round, name: tr$1(ex.name, lang).toUpperCase() });
  const ringColor = phase.type === "rest" ? OLIVE : phase.type === "work" ? BLAZE : KHAKI;
  const doneWork = seq.slice(0, phaseIdx).filter((p2) => p2.type === "work").length;
  const totalWork = seq.filter((p2) => p2.type === "work").length;
  const elapsedSec = seq.slice(0, phaseIdx).reduce((a, p2) => a + (p2.duration || (p2.reps ? p2.reps * 3 : 0)), 0) + (phase.duration ? phase.duration - secondsLeft : 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-screen-in", style: { flex: 1, display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TopBar$1,
      {
        title: tr$1(program.name, lang),
        onBack: () => setExitConfirm(true),
        right: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 2 }, children: [
          musicOn && /* @__PURE__ */ jsxRuntimeExports.jsx(EqBars, { tone: ringColor, bars: 4, speed: phase.type === "work" ? 1.4 : phase.type === "rest" ? 0.5 : 0.8, style: { marginRight: 6, height: 12 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onToggleAi, title: aiEnabled ? "AI Coach ON" : "AI Coach OFF", style: { ...btnIcon$2, border: `1px solid ${aiEnabled ? BLAZE : "transparent"}`, borderRadius: 8, background: aiEnabled ? `${BLAZE}22` : "transparent" }, children: aiEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16, color: STEEL }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onToggleMusic, style: btnIcon$2, "aria-label": t("ses.music"), children: musicOn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { size: 18, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(HeadphoneOff, { size: 18, color: STEEL }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSoundOn(!soundOn), style: btnIcon$2, children: soundOn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { size: 18, color: PAPER }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { size: 18, color: STEEL }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px 16px 0" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SegmentedProgress, { total: seq.length, current: phaseIdx, currentProgress: progress, color: ringColor }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 8 }, className: "o40-mono", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 11 }, children: t("ses.elapsed", { t: formatTime(elapsedSec) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 11 }, children: t("ses.ex", { a: doneWork, b: totalWork }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `o40-mono o40-expand ${phase.type === "work" ? "o40-gradtext" : ""}`, style: { color: ringColor, fontSize: 13, letterSpacing: "0.1em" }, children: phaseLabel }, phaseIdx),
      isAiWork ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", maxWidth: 420 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SessionAIOverlay,
          {
            phase,
            lang,
            levelKey: (profile == null ? void 0 : profile.level) ?? "combattente",
            aiEnabled,
            onCompletePhase: () => {
              if (soundOn) playBeep(880);
              if (vibrate) vibrate([30]);
              onSkip();
            },
            onRep: () => {
            }
          },
          `${phase.exerciseId}-${phaseIdx}`
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9, textAlign: "center", marginTop: 6 }, children: aiEnabled ? lang === "it" ? "AI Coach attivo — conta automatico, voce nella tua lingua" : "AI Coach on — auto-count, voice in your language" : "" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", width: 240, height: 240 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            position: "absolute",
            inset: -18,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ringColor}30 0%, transparent 70%)`,
            transition: "background 0.3s ease",
            animation: phase.type === "rest" ? "restBreath 2.4s ease-in-out infinite" : "none"
          } }),
          phase.type === "work" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: -10, borderRadius: "50%", border: `2px solid ${ringColor}44`, animation: "ringPulse 1.5s ease-out infinite" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressRing, { progress, color: ringColor }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }, children: ex ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 150, height: 150 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseMedia$1, { exerciseId: phase.exerciseId, pose: ex.pose, color: PAPER, rounded: 14 }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 44 }, children: formatTime(secondsLeft) }) })
        ] }),
        ex && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center" }, children: isRepsWork ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-display", style: { color: PAPER, fontSize: 48, lineHeight: 1 }, children: [
            "×",
            phase.reps
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, letterSpacing: "0.08em" }, children: lang === "it" ? "RIPETIZIONI" : "REPS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 8, color: BLAZE, fontSize: 11, fontWeight: 600 }, children: lang === "it" ? "Tocca FATTO quando hai finito" : "Tap DONE when finished" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 40 }, children: formatTime(secondsLeft) }) })
      ] }),
      ex && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", maxWidth: 330 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 13 }, children: isRepsWork ? `${phase.reps}× ${tr$1(ex.name, lang)} — ${tr$1(ex.repGuide, lang)}` : tr$1(ex.repGuide, lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 4, marginTop: 8, textAlign: "left" }, children: ex.steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 7, alignItems: "flex-start" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 10.5, minWidth: 15 }, children: [
            i + 1,
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 12, lineHeight: 1.4 }, children: tr$1(s, lang) })
        ] }, i)) }),
        ex.breath && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 7, alignItems: "center", justifyContent: "center", marginTop: 9, color: OLIVE }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wind$1, { size: 13, style: { flexShrink: 0 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11.5, fontStyle: "italic", lineHeight: 1.4 }, children: tr$1(ex.breath, lang) })
        ] }),
        ex.tip40 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "flex-start", marginTop: 10, textAlign: "left", background: `${KHAKI}10`, border: `1px solid ${KHAKI}44`, borderRadius: 10, padding: "8px 10px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { size: 14, color: KHAKI, style: { flexShrink: 0, marginTop: 1 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 11.5, lineHeight: 1.45 }, children: tr$1(ex.tip40, lang) })
        ] })
      ] }),
      phase.type === "rest" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginTop: 4 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 52, height: 52, borderRadius: "50%", background: OLIVE, opacity: 0.9, animation: "restBreath 3.2s ease-in-out infinite", display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wind$1, { size: 16, color: PAPER }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, letterSpacing: "0.08em" }, children: lang === "it" ? "Respira — 4 sec in, 4 sec out" : lang === "de" ? "Atmen — 4s ein, 4s aus" : "Breathe — 4s in, 4s out" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-card-glass", style: { color: STEEL, fontSize: 12, marginTop: 6, display: "flex", alignItems: "center", gap: 8, borderRadius: 10, padding: "7px 12px" }, children: next ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        next.exerciseId && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 26, height: 26, flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseFigure$1, { pose: EXERCISES[next.exerciseId].pose, color: KHAKI, size: "100%" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("ses.next", { name: next.type === "work" ? tr$1(nextEx.name, lang) : next.type === "rest" ? t("ses.next.rest") : t("ses.next.cooldown") }) })
      ] }) : t("ses.last") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 12, padding: "10px 20px 8px", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPaused(!paused), style: { ...iconCircle$1, width: 74, height: 74, background: BLAZE, animation: paused ? "glowPulse 1.6s ease-in-out infinite" : "none" }, "aria-label": paused ? t("ses.resume") : t("ses.pause"), children: paused ? /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 30, color: PAPER }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { size: 30, color: PAPER }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, padding: "0 20px 20px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onPrev, disabled: phaseIdx === 0, style: { ...pillBtn, opacity: phaseIdx === 0 ? 0.4 : 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 15 }),
        " PREV"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onSkip,
          style: {
            ...pillBtn,
            background: isAiWork ? `${OLIVE}88` : isRepsWork ? BLAZE : pillBtn.background,
            color: isAiWork ? KHAKI : isRepsWork ? PAPER : void 0,
            fontWeight: isRepsWork || isAiWork ? 700 : void 0,
            flex: isRepsWork || isAiWork ? 1.6 : 1,
            opacity: isAiWork ? 0.9 : 1
          },
          title: isAiWork ? lang === "it" ? "AI conta auto — puoi saltare manualmente" : "AI auto-count — you can skip manually" : void 0,
          children: [
            isAiWork ? lang === "it" ? "SALTA →" : "SKIP →" : isRepsWork ? lang === "it" ? "FATTO ✓" : "DONE ✓" : "NEXT",
            " ",
            isAiWork ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { size: 15 }) : isRepsWork ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { size: 15 })
          ]
        }
      )
    ] }),
    isAiWork && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9, textAlign: "center", paddingBottom: 8 }, children: lang === "it" ? "AI avanzerà da solo al target · disattiva con 👁️" : "AI will auto-advance at target · disable with 👁️" }),
    exitConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, background: "rgba(27,29,22,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 22, maxWidth: 320, textAlign: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 22, marginBottom: 8 }, children: t("ses.quit.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 13, marginBottom: 18 }, children: t("ses.quit.body") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setExitConfirm(false), style: { ...secondaryBtn$1, flex: 1 }, children: t("ses.quit.continue") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onExit, style: { ...primaryBtn$3, flex: 1 }, children: t("ses.quit.exit") })
      ] })
    ] }) })
  ] });
}
const iconCircle$1 = { borderRadius: "50%", border: `1px solid ${OLIVE}`, background: `linear-gradient(160deg, ${INK_2}, ${INK})`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.35)" };
const secondaryBtn$1 = { background: INK_2, border: `1px solid ${KHAKI}`, color: PAPER, borderRadius: 14, padding: "12px 16px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: "0.05em", cursor: "pointer" };
const pillBtn = {
  flex: 1,
  background: INK_2,
  border: `1px solid ${OLIVE}`,
  color: PAPER,
  borderRadius: 10,
  padding: "10px 0",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 12,
  letterSpacing: "0.08em",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4
};
function WeeklyChallenge({ sessions = [], weeklyGoal = 3 }) {
  const now = /* @__PURE__ */ new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + 1);
  start.setHours(0, 0, 0, 0);
  const weekSessions = (sessions || []).filter((s) => new Date(s.date) >= start);
  const done = weekSessions.length;
  const pct = Math.min(1, done / weeklyGoal);
  const remain = Math.max(0, weeklyGoal - done);
  const isDone = done >= weeklyGoal;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-card-glass", style: { borderRadius: 14, padding: 14, display: "flex", gap: 12, alignItems: "center" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 56, height: 56, borderRadius: "50%", background: `conic-gradient(${BLAZE} ${pct * 360}deg, ${OLIVE} 0deg)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 44, height: 44, borderRadius: "50%", background: INK_2, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${OLIVE}` }, children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 20, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 20, color: KHAKI }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, letterSpacing: "0.07em" }, children: "SFIDA SETTIMANALE" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontWeight: 800, fontSize: 14 }, children: isDone ? "Completata!" : `${done}/${weeklyGoal} missioni` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12 }, children: isDone ? "Obiettivo raggiunto, mantieni il fuoco" : `Mancano ${remain} per chiudere la settimana` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-display", style: { color: BLAZE, fontSize: 22 }, children: [
        Math.round(pct * 100),
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 10, display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 10 }),
        " Lun-Dom"
      ] })
    ] })
  ] });
}
const inputStyle = { width: "100%", background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: "12px 14px", color: PAPER, fontSize: 16, fontFamily: "Inter, sans-serif", outline: "none" };
const primaryBtn$2 = { background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, color: PAPER, border: "none", borderRadius: 14, padding: "12px 16px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: "0.05em", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%" };
function DogTag$2({ label, value, sub }) {
  const numeric = typeof value === "number";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-card", style: { background: `linear-gradient(160deg, ${INK_2}, ${INK})`, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: "12px 13px", position: "relative", flex: 1, minWidth: 0, boxShadow: "0 4px 14px rgba(0,0,0,0.35)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: 9, left: -5, width: 10, height: 10, borderRadius: "50%", background: INK, border: `2px solid ${KHAKI}` } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 26, lineHeight: 1.1 }, children: numeric ? value : value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11 }, children: sub })
  ] });
}
function SummaryScreen({ stats, profile, sessions, hrInput, setHrInput, waistInput, setWaistInput, weightInput, setWeightInput, rpe, setRpe, notes, setNotes, onSave }) {
  const { lang, t } = useT();
  const zone = hrInput ? hrZone$1(parseInt(hrInput, 10), profile.age, lang) : null;
  const [shareState, setShareState] = reactExports.useState("idle");
  async function handleShare() {
    const text = t("sum.share", { name: tr$1(stats.program.name, lang), min: Math.round(stats.durationSec / 60), kcal: stats.kcal });
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setShareState("copied");
        setTimeout(() => setShareState("idle"), 2e3);
      }
    } catch (e) {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-screen-in", style: { flex: 1, display: "flex", flexDirection: "column", position: "relative" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }, children: ["#C1440E", "#B8AE8C", "#7FB069", "#EDE8D8", "#D9B34C"].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-confetti", style: {
      background: c,
      left: `${8 + i * 18}%`,
      animationDuration: `${2.6 + i % 3 * 0.7}s`,
      animationDelay: `${i * 0.35}s`,
      opacity: 0.85
    } }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-scroll", style: { flex: 1, overflowY: "auto", padding: 20 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginTop: 10 }, className: "o40-pop", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 40, color: BLAZE }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 30, marginTop: 8 }, children: t("sum.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 14 }, children: tr$1(stats.program.name, lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleShare, style: {
          marginTop: 10,
          background: "transparent",
          border: `1px solid ${KHAKI}`,
          borderRadius: 20,
          padding: "6px 14px",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 6
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 11 }, children: shareState === "copied" ? t("sum.copied") : t("sum.sharebtn") }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, margin: "20px 0" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag$2, { label: t("dt.duration"), value: `${Math.round(stats.durationSec / 60)}′` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag$2, { label: t("dt.kcal"), value: stats.kcal })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyChallenge, { sessions, weeklyGoal: profile.weeklyGoal || WEEKLY_GOAL }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 16, marginBottom: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }, children: t("sum.rpe.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, marginTop: 10 }, children: RPE_LABELS.map((lbl, i) => {
          const val = i + 1;
          const on = rpe === val;
          const c = RPE_COLORS[i];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setRpe(on ? null : val), style: {
            flex: 1,
            padding: "10px 2px",
            borderRadius: 8,
            cursor: "pointer",
            textAlign: "center",
            background: on ? c : INK,
            border: `1px solid ${on ? c : OLIVE}`,
            transition: "background 0.15s ease, border-color 0.15s ease, transform 0.1s ease"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 18 }, children: val }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: on ? PAPER : STEEL, fontSize: 8.5 }, children: tr$1(lbl, lang) })
          ] }, val);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 16, marginBottom: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }, children: t("sum.notes.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: notes,
            onChange: (e) => setNotes(e.target.value.slice(0, 200)),
            placeholder: t("sum.notes.ph"),
            rows: 2,
            className: "o40-input",
            style: { ...inputStyle, marginTop: 10, resize: "none", fontFamily: "Inter, sans-serif" }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 16, marginBottom: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Ruler, { size: 18, color: BLAZE }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }, children: t("sum.waist.title") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12, marginBottom: 10, lineHeight: 1.4 }, children: t("sum.waist.body") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: waistInput,
            onChange: (e) => setWaistInput(e.target.value.replace(/\D/g, "")),
            inputMode: "numeric",
            placeholder: t("sum.waist.ph"),
            className: "o40-input",
            style: inputStyle
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 16, marginBottom: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { size: 18, color: BLAZE }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }, children: t("sum.weight.title") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12, marginBottom: 10, lineHeight: 1.4 }, children: t("sum.weight.body") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: weightInput,
            onChange: (e) => setWeightInput(e.target.value.replace(/[^\d.,]/g, "")),
            inputMode: "decimal",
            placeholder: profile && profile.weight ? t("sum.weight.ph.dynamic", { v: profile.weight }) : t("sum.weight.ph"),
            className: "o40-input",
            style: inputStyle
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 16, marginBottom: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { size: 18, color: BLAZE }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }, children: t("sum.hr.title") }),
          !hrInput && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-blink", style: { marginLeft: "auto", background: `${BLAZE}22`, border: `1px solid ${BLAZE}`, color: BLAZE, fontSize: 10, letterSpacing: "0.06em", borderRadius: 6, padding: "2px 7px" }, children: t("sum.hr.remind") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12, marginBottom: 10, lineHeight: 1.4 }, children: t("sum.hr.body") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: hrInput,
            onChange: (e) => setHrInput(e.target.value.replace(/\D/g, "")),
            inputMode: "numeric",
            placeholder: t("sum.hr.ph"),
            className: "o40-input",
            style: inputStyle
          }
        ),
        zone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 10, display: "flex", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 10, height: 10, borderRadius: "50%", background: zone.color } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: PAPER, fontSize: 13 }, children: t("sum.zone", { label: zone.label }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "12px 20px 20px", borderTop: `1px solid ${OLIVE_DARK}` }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onSave, style: primaryBtn$2, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 18 }),
      " ",
      t("sum.save")
    ] }) })
  ] });
}
function csvEscape(v) {
  const s = String(v ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) return `"${s.replace(/"/g, '""')}"`;
  return s;
}
function exportCSV(sessions, waistHistory, weightHistory) {
  const rows = [["date", "program", "kcal", "duration_min", "hr_peak", "rpe", "waist_cm", "weight_kg", "notes"]];
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
      s.programId || s.programName || "",
      s.kcal ?? "",
      s.durationSec ? Math.round(s.durationSec / 60) : "",
      s.hr ?? "",
      s.rpe ?? "",
      waistByDay[day] ?? "",
      weightByDay[day] ?? "",
      (s.notes || "").replace(/\n/g, " ")
    ]);
  });
  const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `operator40-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function buildCalendarGrid(sessions, year, monthIndex) {
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
    days.push({ day: d, key, sessions: byDay[key] || [], isToday: key === (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) });
  }
  const pad = (first.getDay() + 6) % 7;
  return { pad, days, year, monthIndex };
}
function calcBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm) return null;
  const h = heightCm / 100;
  if (h <= 0) return null;
  return Math.round(weightKg / (h * h) * 10) / 10;
}
function bmiCategory(bmi) {
  if (bmi == null) return null;
  if (bmi < 18.5) return { key: "under", color: "#9DB85A" };
  if (bmi < 25) return { key: "ok", color: "#6FA75F" };
  if (bmi < 30) return { key: "over", color: "#D9B34C" };
  return { key: "obese", color: "#C1440E" };
}
function estimateTDEE(weightKg, heightCm, age, activity = 1.35) {
  if (!weightKg || !heightCm || !age) return null;
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  return Math.round(bmr * activity);
}
function simpleMealHint(goal) {
  const hints = {
    cut: { it: "Deficit leggero ~300 kcal, proteine 1.8g/kg, verdure + camminata.", en: "Small deficit ~300 kcal, protein 1.8g/kg, veg + walk.", de: "Leichtes Defizit ~300 kcal, Protein 1,8g/kg, Gemüse + Gehen." },
    maintain: { it: "Mantieni TDEE, proteine 1.6g/kg, 3 pasti regolari.", en: "Maintain TDEE, protein 1.6g/kg, 3 regular meals.", de: "TDEE halten, Protein 1,6g/kg, 3 regelmäßige Mahlzeiten." },
    tone: { it: "Leggero surplus + forza, proteine 1.8g/kg.", en: "Small surplus + strength, protein 1.8g/kg.", de: "Leichter Überschuss + Kraft, Protein 1,8g/kg." }
  };
  return hints[goal] || hints.cut;
}
function estimateBodyFat({ waistCm, weightKg, heightCm, age, sex = "male" }) {
  if (!waistCm || !weightKg || !heightCm || !age) return null;
  const bmi = weightKg / (heightCm / 100) ** 2;
  const bf = 1.2 * bmi + 0.23 * age - 10.8 * (sex === "male" ? 1 : 0) - 5.4;
  const wht = waistCm / heightCm;
  const whtAdj = (wht - 0.5) * 30;
  const est = Math.max(6, Math.min(42, Math.round((bf * 0.7 + (bf + whtAdj) * 0.3) * 10) / 10));
  return est;
}
function whtCategory(wht) {
  if (wht < 0.5) return { key: "ok", color: "#7FB069" };
  if (wht < 0.6) return { key: "at", color: "#D9B34C" };
  return { key: "high", color: "#C1440E" };
}
async function shareStatsImage({ sessions, profile, t, tr: tr2 }) {
  var _a, _b, _c, _d;
  const W = 1080, H = 1350;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0F1210");
  bg.addColorStop(0.45, "#1B1D16");
  bg.addColorStop(1, "#2A2E22");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(184,174,140,0.06)";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 42) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 42) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.fillStyle = "#333823";
  ctx.fillRect(0, 0, W, 8);
  ctx.fillStyle = "#C1440E";
  ctx.fillRect(0, 8, W, 2);
  const pad = 36;
  const cardX = pad, cardY = 48, cardW = W - pad * 2, cardH = H - pad * 2 - 20;
  ctx.fillStyle = "rgba(237,232,216,0.07)";
  ctx.strokeStyle = "rgba(184,174,140,0.22)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  const r = 28;
  ctx.roundRect(cardX, cardY, cardW, cardH, r);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "rgba(193,68,14,0.35)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(cardX + 10, cardY + 10, cardW - 20, cardH - 20, r - 6);
  ctx.stroke();
  ctx.fillStyle = "#B8AE8C";
  ctx.font = '600 18px "IBM Plex Mono", monospace';
  ctx.textAlign = "center";
  ctx.letterSpacing = "0.18em";
  ctx.fillText("OPERATOR 40  •  OVER 40  •  15′/DAY", W / 2, cardY + 54);
  ctx.fillStyle = "#EDE8D8";
  ctx.font = '900 64px "Bebas Neue", sans-serif';
  ctx.fillText((profile == null ? void 0 : profile.name) ? profile.name.toUpperCase() : "OPERATORE", W / 2, cardY + 118);
  const rank = getRank((sessions == null ? void 0 : sessions.length) || 0);
  ((_a = rank.current) == null ? void 0 : _a.name) ? profile ? rank.current.name.it : "RECLUTA" : "RECLUTA";
  let rankText = "RECLUTA";
  try {
    if ((_c = (_b = rank.current) == null ? void 0 : _b.name) == null ? void 0 : _c.it) rankText = rank.current.name.it;
    else if (typeof ((_d = rank.current) == null ? void 0 : _d.name) === "string") rankText = rank.current.name;
  } catch {
  }
  ctx.fillStyle = "#C1440E";
  ctx.font = '700 18px "IBM Plex Mono", monospace';
  ctx.fillText(rankText + (rank.next ? `  →  ${rank.next.min - ((sessions == null ? void 0 : sessions.length) || 0)} AL PROSSIMO` : "  •  VETERANO"), W / 2, cardY + 148);
  const totalKcal = (sessions || []).reduce((a2, s) => a2 + (s.kcal || 0), 0);
  const totalMin = Math.round((sessions || []).reduce((a2, s) => a2 + (s.durationSec || 780), 0) / 60);
  const streak = (() => {
    try {
      const s = new Set((sessions || []).map((v) => v.date.slice(0, 10)));
      let cur = /* @__PURE__ */ new Date();
      if (!s.has(cur.toISOString().slice(0, 10))) cur.setDate(cur.getDate() - 1);
      let n2 = 0;
      while (s.has(cur.toISOString().slice(0, 10))) {
        n2++;
        cur.setDate(cur.getDate() - 1);
      }
      return n2;
    } catch {
      return 0;
    }
  })();
  const best = computeBestStreak(sessions || []);
  const cons = (() => {
    try {
      return getConsistencyScore$1(sessions, 8);
    } catch {
      return 0;
    }
  })();
  const { unlocked } = (() => {
    try {
      return getMedalProgress(sessions || []);
    } catch {
      return { unlocked: [] };
    }
  })();
  const boxY = cardY + 190;
  const boxW = (cardW - 48) / 3;
  const boxH = 148;
  const boxes = [
    { label: "SESSIONI", value: String((sessions == null ? void 0 : sessions.length) || 0), sub: `${totalMin}′ totali`, color: "#EDE8D8" },
    { label: "KCAL", value: String(totalKcal), sub: `${Math.round(totalKcal / Math.max(1, (sessions == null ? void 0 : sessions.length) || 1))} avg`, color: "#EDE8D8" },
    { label: "STREAK", value: `${streak}🔥`, sub: `best ${best}`, color: streak > 0 ? "#C1440E" : "#EDE8D8" }
  ];
  boxes.forEach((b, i) => {
    const x = cardX + 18 + i * (boxW + 6);
    ctx.fillStyle = i === 1 ? "rgba(193,68,14,0.14)" : "rgba(0,0,0,0.22)";
    ctx.strokeStyle = i === 1 ? "rgba(193,68,14,0.35)" : "rgba(184,174,140,0.14)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, boxY, boxW, boxH, 16);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = b.color;
    ctx.font = "900 54px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(b.value, x + boxW / 2, boxY + 72);
    ctx.fillStyle = "#B8AE8C";
    ctx.font = '600 13px "IBM Plex Mono", monospace';
    ctx.fillText(b.label, x + boxW / 2, boxY + 96);
    ctx.fillStyle = "rgba(237,232,216,0.62)";
    ctx.font = "500 12px Inter, sans-serif";
    ctx.fillText(b.sub, x + boxW / 2, boxY + 118);
  });
  const secY = boxY + boxH + 18;
  const secBoxes = [
    { label: "CONSISTENZA 8W", value: `${cons}%`, color: cons >= 70 ? "#7FB069" : cons >= 40 ? "#B8AE8C" : "#C1440E" },
    { label: "SETT. PERFETTE", value: String(unlocked.filter((m2) => m2.type === "perfect").length || 0), sub: `su ${12}`, color: "#D9B34C" },
    { label: "MEDAGLIE", value: String(unlocked.length), sub: `su ${(() => {
      try {
        return getMedalProgress(sessions || []).all.length;
      } catch {
        return 24;
      }
    })()}`, color: "#EDE8D8" }
  ];
  secBoxes.forEach((b, i) => {
    const x = cardX + 18 + i * (boxW + 6);
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.strokeStyle = "rgba(184,174,140,0.12)";
    ctx.beginPath();
    ctx.roundRect(x, secY, boxW, 64, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = b.color;
    ctx.font = "800 26px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(b.value, x + boxW / 2, secY + 30);
    ctx.fillStyle = "#B8AE8C";
    ctx.font = '600 10px "IBM Plex Mono", monospace';
    ctx.fillText(b.label, x + boxW / 2, secY + 48);
    if (b.sub) {
      ctx.fillStyle = "rgba(237,232,216,0.5)";
      ctx.font = "500 10px Inter, sans-serif";
      ctx.fillText(b.sub, x + boxW / 2, secY + 58);
    }
  });
  const medalY = secY + 84;
  ctx.fillStyle = "#B8AE8C";
  ctx.font = '600 11px "IBM Plex Mono", monospace';
  ctx.textAlign = "left";
  ctx.fillText("MEDAGLIE SBLOCCATE", cardX + 24, medalY);
  ctx.fillStyle = "rgba(237,232,216,0.45)";
  ctx.font = "500 11px Inter, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`${unlocked.length} / ${(() => {
    try {
      return getMedalProgress(sessions || []).all.length;
    } catch {
      return 24;
    }
  })()}`, cardX + cardW - 24, medalY);
  const pillY = medalY + 14;
  const pillH = 28;
  let pillX = cardX + 24;
  const maxPills = 10;
  const toShow = unlocked.slice(0, maxPills);
  if (toShow.length === 0) {
    ctx.fillStyle = "rgba(237,232,216,0.35)";
    ctx.font = "500 13px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("— nessuna medaglia ancora —", W / 2, pillY + 18);
  } else {
    toShow.forEach((m2) => {
      const label = `${m2.icon} ${m2.n}${m2.type === "streak" ? "gg" : m2.type === "kcal" ? "k" : ""}`;
      ctx.font = "700 12px Inter, sans-serif";
      const w = ctx.measureText(label).width + 18;
      if (pillX + w > cardX + cardW - 24) return;
      ctx.fillStyle = m2.unlocked ? "rgba(193,68,14,0.22)" : "rgba(0,0,0,0.18)";
      ctx.strokeStyle = m2.unlocked ? "rgba(193,68,14,0.35)" : "rgba(184,174,140,0.12)";
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, w, pillH, pillH / 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = m2.unlocked ? "#EDE8D8" : "#8A8578";
      ctx.textAlign = "center";
      ctx.fillText(label, pillX + w / 2, pillY + 18);
      pillX += w + 8;
    });
    if (unlocked.length > maxPills) {
      ctx.fillStyle = "rgba(237,232,216,0.5)";
      ctx.font = "600 11px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`+${unlocked.length - maxPills} altre`, pillX + 4, pillY + 18);
    }
  }
  const quoteY = pillY + 52;
  const nextBadge2 = (() => {
    try {
      const { locked } = getMedalProgress(sessions || []);
      locked.sort((a2, b) => b.progress - a2.progress);
      return locked[0];
    } catch {
      return null;
    }
  })();
  if (nextBadge2) {
    const barW = cardW - 48;
    const barX = cardX + 24;
    const barH = 8;
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.roundRect(barX, quoteY, barW, barH, 4);
    ctx.fill();
    ctx.fillStyle = nextBadge2.color;
    ctx.beginPath();
    ctx.roundRect(barX, quoteY, barW * nextBadge2.progress, barH, 4);
    ctx.fill();
    ctx.fillStyle = "rgba(237,232,216,0.9)";
    ctx.font = "600 11px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Prossima: ${nextBadge2.icon} ${nextBadge2.label}`, barX, quoteY + 22);
    ctx.textAlign = "right";
    ctx.fillText(`${Math.round(nextBadge2.progress * 100)}%`, barX + barW, quoteY + 22);
  }
  try {
    const smart = getSmartInsight({ sessions, profile, lang: "it" });
    const sY = quoteY + 40;
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.strokeStyle = `${smart.color}33`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(cardX + 24, sY, cardW - 48, 64, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = smart.color;
    ctx.font = "800 22px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(smart.icon, cardX + 36, sY + 30);
    ctx.fillStyle = "#EDE8D8";
    ctx.font = "700 13px Inter, sans-serif";
    ctx.fillText(smart.title, cardX + 64, sY + 26);
    ctx.fillStyle = "rgba(237,232,216,0.72)";
    ctx.font = "500 11px Inter, sans-serif";
    const body2 = smart.body.length > 78 ? smart.body.slice(0, 78) + "…" : smart.body;
    ctx.fillText(body2, cardX + 64, sY + 44);
  } catch {
  }
  const footY = H - 92;
  ctx.strokeStyle = "rgba(184,174,140,0.18)";
  ctx.beginPath();
  ctx.moveTo(cardX + 24, footY - 18);
  ctx.lineTo(cardX + cardW - 24, footY - 18);
  ctx.stroke();
  ctx.fillStyle = "rgba(237,232,216,0.85)";
  ctx.font = '700 13px "IBM Plex Mono", monospace';
  ctx.textAlign = "center";
  ctx.fillText("mikweb.eu/operator40  •  15′ al giorno  •  over 40", W / 2, footY);
  ctx.fillStyle = "rgba(237,232,216,0.45)";
  ctx.font = "500 11px Inter, sans-serif";
  const dateStr = (/* @__PURE__ */ new Date()).toLocaleDateString("it-IT", { day: "2-digit", month: "short", year: "numeric" });
  ctx.fillText(`${dateStr}  •  Operator 40  •  v${(profile == null ? void 0 : profile.level) || "combattente"}`, W / 2, footY + 18);
  ctx.fillStyle = "#C1440E";
  ctx.beginPath();
  ctx.arc(W - 48, footY - 28, 3, 0, Math.PI * 2);
  ctx.fill();
  const blob = await new Promise((res) => c.toBlob(res, "image/png", 0.96));
  const file = new File([blob], "operator40-stats.png", { type: "image/png" });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ title: "Operator 40", text: `Operator 40 — ${(sessions == null ? void 0 : sessions.length) || 0} sessioni, ${totalKcal} kcal, ${cons}% costanza`, files: [file] });
      return "share";
    } catch {
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `operator40-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.png`;
  a.click();
  URL.revokeObjectURL(url);
  return "download";
}
const secondaryBtn = { background: INK_2, border: `1px solid ${KHAKI}`, color: PAPER, borderRadius: 14, padding: "12px 16px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: "0.05em", cursor: "pointer" };
const primaryBtn$1 = { background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, color: PAPER, border: "none", borderRadius: 14, padding: "12px 16px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: "0.05em", cursor: "pointer" };
const btnIcon$1 = { background: "transparent", border: "none", padding: 6, cursor: "pointer", display: "flex", borderRadius: 10 };
function DogTag$1({ label, value, sub }) {
  const numeric = typeof value === "number";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-card", style: { background: `linear-gradient(160deg, ${INK_2}, ${INK})`, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: "12px 13px", position: "relative", flex: 1, minWidth: 0, boxShadow: "0 4px 14px rgba(0,0,0,0.35)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: 9, left: -5, width: 10, height: 10, borderRadius: "50%", background: INK, border: `2px solid ${KHAKI}` } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 26, lineHeight: 1.1 }, children: numeric ? value : value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11 }, children: sub })
  ] });
}
function last7DaysKcal(sessions, locale) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - i);
    const key = dayKey(d);
    const label = d.toLocaleDateString(locale || "it-IT", { weekday: "short" }).slice(0, 3);
    const kcal = Math.round(sessions.filter((s) => sessionDayKey(s) === key).reduce((a, s) => a + s.kcal, 0));
    days.push({ label, kcal });
  }
  return days;
}
function missionCounts(sessions) {
  const counts = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 };
  sessions.forEach((s) => {
    if (counts[s.programId] !== void 0) counts[s.programId]++;
  });
  return counts;
}
function Badge({ label, unlocked, value, color = BLAZE, icon = "trophy", progress = 1 }) {
  const Icon = icon === "fire" ? Flame : icon === "zap" ? Zap : icon === "star" ? Star : icon === "target" ? Target : Trophy;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    flex: 1,
    minWidth: 52,
    opacity: unlocked ? 1 : 0.55,
    transform: unlocked ? "scale(1)" : "scale(0.96)",
    transition: "all 0.2s ease"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: unlocked ? `radial-gradient(circle at 30% 30%, ${color}, ${INK})` : INK_2,
      border: `1px solid ${unlocked ? color : OLIVE}`,
      boxShadow: unlocked ? `0 0 12px ${color}66, inset 0 1px 1px rgba(255,255,255,0.15)` : "none",
      position: "relative",
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, color: unlocked ? PAPER : STEEL, style: { filter: unlocked ? `drop-shadow(0 1px 2px rgba(0,0,0,0.4))` : "none" } }),
      !unlocked && progress > 0 && progress < 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: OLIVE_DARK }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: `${Math.round(progress * 100)}%`, height: "100%", background: color, transition: "width 0.4s ease" } }) }),
      unlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: -2, borderRadius: "50%", border: `1px solid ${color}44`, animation: "badgePulse 1.6s ease-in-out infinite" } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: unlocked ? PAPER : STEEL, fontSize: 10, fontWeight: unlocked ? 700 : 400 }, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: unlocked ? KHAKI : STEEL, fontSize: 8.5, textAlign: "center", lineHeight: 1.2, minHeight: 20 }, children: label })
  ] });
}
function MedalGrid({ sessions }) {
  const { all, unlocked } = getMedalProgress(sessions);
  const byType = {
    streak: all.filter((m2) => m2.type === "streak"),
    sessions: all.filter((m2) => m2.type === "sessions"),
    kcal: all.filter((m2) => m2.type === "kcal"),
    consistency: all.filter((m2) => m2.type === "consistency"),
    perfect: all.filter((m2) => m2.type === "perfect")
  };
  const next = getNextMedals(sessions, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
    [
      { key: "streak", title: "SERIE", icon: "fire" },
      { key: "sessions", title: "SESSIONI", icon: "zap" },
      { key: "kcal", title: "KCAL", icon: "target" },
      { key: "consistency", title: "COSTANZA", icon: "star" },
      { key: "perfect", title: "SETT. PERFETTE", icon: "star" }
    ].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9, letterSpacing: "0.08em", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }, children: [
        cat.title,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: unlocked.filter((m2) => m2.type === cat.key).length ? "#7FB069" : STEEL, fontSize: 9 }, children: [
          unlocked.filter((m2) => m2.type === cat.key).length,
          "/",
          byType[cat.key].length
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }, children: byType[cat.key].map((m2) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { label: m2.label, value: m2.n, unlocked: m2.unlocked, color: m2.color, icon: m2.type === "streak" ? "fire" : m2.type === "kcal" ? "target" : m2.type === "perfect" ? "star" : "trophy", progress: m2.progress }, `${m2.type}-${m2.n}`)) })
    ] }, cat.key)),
    next.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK})`, border: `1px solid ${KHAKI}33`, borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles$1, { size: 14, color: KHAKI }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: KHAKI, fontSize: 11, flex: 1 }, children: [
        "Prossime: ",
        next.map((m2) => `${m2.icon} ${m2.n}${m2.type === "kcal" ? "" : m2.type === "streak" ? "gg" : ""} (${Math.round(m2.progress * 100)}%)`).join(" • ")
      ] })
    ] })
  ] });
}
function HistoryScreen({ sessions, profile, waistHistory, weightHistory, photos, onAddPhoto, onBack, onClear, onUpdateGoal, onDeleteSession }) {
  const { lang, t } = useT();
  const [confirmClear, setConfirmClear] = reactExports.useState(false);
  const [confirmDeleteDate, setConfirmDeleteDate] = reactExports.useState(null);
  const ordered = [...sessions].reverse();
  const hrData = sessions.filter((s) => s.peakHR).map((s, i) => ({
    idx: i + 1,
    hr: s.peakHR,
    label: new Date(s.date).toLocaleDateString(LOCALES[lang], { day: "2-digit", month: "2-digit" })
  }));
  const waistData = [...waistHistory].sort((a, b) => new Date(a.date) - new Date(b.date)).map((w, i) => ({
    idx: i + 1,
    cm: w.cm,
    label: new Date(w.date).toLocaleDateString(LOCALES[lang], { day: "2-digit", month: "2-digit" })
  }));
  const weightData = [...weightHistory].sort((a, b) => new Date(a.date) - new Date(b.date)).map((w, i) => ({
    idx: i + 1,
    kg: w.kg,
    label: new Date(w.date).toLocaleDateString(LOCALES[lang], { day: "2-digit", month: "2-digit" })
  }));
  const streak = computeStreak(sessions);
  const bestStreak = computeBestStreak(sessions);
  const weekData = last7DaysKcal(sessions, LOCALES[lang]);
  const counts = missionCounts(sessions);
  const maxCount = Math.max(1, counts.A, counts.B, counts.C, counts.D, counts.E, counts.F, counts.G);
  const totalKcal = Math.round(sessions.reduce((a, s) => a + s.kcal, 0));
  const weeklyGoal = profile.weeklyGoal || WEEKLY_GOAL;
  const heatmap = buildHeatmap(sessions, 35);
  const now = Date.now();
  const thisWeekKcal = sessions.filter((s) => new Date(s.date).getTime() > now - 7 * 864e5).reduce((a, s) => a + s.kcal, 0);
  const lastWeekKcal = sessions.filter((s) => {
    const t2 = new Date(s.date).getTime();
    return t2 <= now - 7 * 864e5 && t2 > now - 14 * 864e5;
  }).reduce((a, s) => a + s.kcal, 0);
  const trendPct = lastWeekKcal > 0 ? Math.round((thisWeekKcal - lastWeekKcal) / lastWeekKcal * 100) : null;
  const totalSec = sessions.reduce((a, s) => a + (s.durationSec || 780), 0);
  const totalMin = Math.round(totalSec / 60);
  const avgKcal = sessions.length ? Math.round(totalKcal / sessions.length) : 0;
  const pr = getPersonalRecords(sessions);
  const yearHeat = buildYearHeatmap(sessions);
  const rpeSeries = sessions.filter((s) => s.rpe != null).map((s, i) => ({
    idx: i + 1,
    rpe: s.rpe,
    label: new Date(s.date).toLocaleDateString(LOCALES[lang], { day: "2-digit", month: "2-digit" })
  }));
  const avgRpe = rpeSeries.length ? rpeSeries.reduce((a, b) => a + b.rpe, 0) / rpeSeries.length : null;
  const bestWeekKcal = (() => {
    let best = 0;
    sessions.forEach((s) => {
      const t2 = new Date(s.date).getTime();
      const wk = sessions.filter((x) => {
        const d = new Date(x.date).getTime();
        return d >= t2 - 7 * 864e5 && d < t2;
      }).reduce((a, x) => a + x.kcal, 0);
      best = Math.max(best, wk);
    });
    return Math.round(best);
  })();
  const sessionsPerWeek = sessions.length >= 2 ? sessions.length / Math.max(1, Math.round((new Date(sessions[sessions.length - 1].date) - new Date(sessions[0].date)) / (7 * 864e5))) : sessions.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-screen-in", style: { flex: 1, display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopBar$1, { title: t("hist.title"), onBack }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-scroll", style: { flex: 1, overflowY: "auto", padding: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 18 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag$1, { label: t("dt.streak"), value: streak, sub: streak === 1 ? t("dt.day") : t("dt.days") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag$1, { label: t("dt.record"), value: bestStreak, sub: t("dt.beststreak") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag$1, { label: t("dt.kcal"), value: totalKcal, sub: t("dt.total") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 18 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag$1, { label: t("dt.minutes"), value: totalMin, sub: t("dt.trained") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag$1, { label: t("dt.avgkcal"), value: avgKcal, sub: t("dt.permission") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag$1, { label: t("dt.weeks"), value: sessionsPerWeek.toFixed(1), sub: t("dt.perweek") })
      ] }),
      pr && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-card-glass", style: { display: "flex", gap: 10, marginBottom: 18, padding: 12, borderRadius: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, textAlign: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10 }, children: "MAX KCAL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: BLAZE, fontSize: 20 }, children: pr.maxKcal })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 1, background: OLIVE_DARK } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, textAlign: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10 }, children: "MAX STREAK" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-display", style: { color: PAPER, fontSize: 20 }, children: [
            pr.maxStreak,
            "🔥"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 1, background: OLIVE_DARK } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, textAlign: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10 }, children: "TOTALE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-display", style: { color: KHAKI, fontSize: 20 }, children: [
            pr.totalMin,
            "′"
          ] })
        ] })
      ] }),
      avgRpe !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 18, background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { size: 17, color: BLAZE }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }, children: t("hist.avgint") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginLeft: "auto", display: "flex", alignItems: "baseline", gap: 4 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-display", style: { color: RPE_COLORS[Math.round(avgRpe) - 1] || BLAZE, fontSize: 24 }, children: avgRpe.toFixed(1) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 11 }, children: "/ 6" })
        ] })
      ] }),
      bestWeekKcal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 18, background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 16, color: KHAKI, style: { flexShrink: 0 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 13, fontWeight: 600 }, children: t("hist.bestweek.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5 }, children: t("hist.bestweek.sub") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-display", style: { color: BLAZE, fontSize: 22 }, children: bestWeekKcal }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 10.5 }, children: t("hist.kcal.unit") })
      ] }),
      (() => {
        const wp = getWeeklyProgress(sessions, weeklyGoal);
        const cons = getConsistencyScore$1(sessions);
        const pace = getAveragePace(sessions);
        const risk = getStreakRisk$1(sessions);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 18, background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, letterSpacing: "0.06em", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12, color: BLAZE }),
            " ADERENZA 8 SETTIMANE"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 12 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: "10px 12px", textAlign: "center" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-display", style: { color: cons >= 70 ? "#7FB069" : cons >= 40 ? KHAKI : BLAZE, fontSize: 22 }, children: [
                cons,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: "CONSISTENZA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 4, borderRadius: 2, background: OLIVE_DARK, marginTop: 6, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: `${cons}%`, height: "100%", background: cons >= 70 ? "#7FB069" : cons >= 40 ? KHAKI : BLAZE } }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: "10px 12px", textAlign: "center" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-display", style: { color: wp.isDone ? "#7FB069" : BLAZE, fontSize: 22 }, children: [
                wp.done,
                "/",
                wp.total
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: "SETTIMANA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: risk === "ok" ? "#7FB069" : risk === "at-risk" ? KHAKI : BLAZE, fontSize: 10, marginTop: 4 }, children: risk === "ok" ? "● ok" : risk === "at-risk" ? "◐ a rischio" : "○ break" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: "10px 12px", textAlign: "center" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 18 }, children: pace ? `${pace.avgMin}′` : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: "MEDIA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 10, marginTop: 4 }, children: pace ? `${pace.avgKcal} kcal` : "n/d" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", color: STEEL, fontSize: 11 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Goal ",
              weeklyGoal,
              "/sett."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: wp.isDone ? "#7FB069" : KHAKI }, children: wp.isDone ? "Completata!" : `${wp.remain} mancanti` })
          ] })
        ] });
      })(),
      (() => {
        var _a;
        const daily = getDailyInsight({ sessions, profile, waistHistory, weightHistory, lang });
        const weekly = getWeeklyInsight({ sessions, profile, lang });
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 18, display: "flex", flexDirection: "column", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: `linear-gradient(135deg, ${daily.color}18, ${INK_2})`, border: `1px solid ${daily.color}55`, borderRadius: 14, padding: 12, display: "flex", gap: 10, alignItems: "center" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 22 }, children: daily.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: PAPER, fontSize: 13, fontWeight: 600 }, children: [
                daily.title,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: STEEL, fontSize: 11, fontWeight: 400 }, children: [
                  "· ",
                  daily.tip
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 2, lineHeight: 1.4 }, children: daily.body })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles$1, { size: 16, color: daily.color, style: { flexShrink: 0 } })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12, display: "flex", gap: 10, alignItems: "center" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 18 }, children: weekly.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 13, fontWeight: 600 }, children: weekly.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 2 }, children: weekly.body })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: weekly.color, fontSize: 18, fontWeight: 700 }, children: (_a = weekly.body.split("/")[0]) == null ? void 0 : _a.trim() })
          ] })
        ] });
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }, children: t("hist.goal.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: PAPER, fontSize: 13 }, children: t("hist.goal.label") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 14 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onUpdateGoal(weeklyGoal - 1), disabled: weeklyGoal <= 1, style: { ...iconCircle, width: 30, height: 30, opacity: weeklyGoal <= 1 ? 0.4 : 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: PAPER, fontSize: 16, lineHeight: 1 }, children: "–" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-display", style: { color: PAPER, fontSize: 22, minWidth: 20, textAlign: "center" }, children: weeklyGoal }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onUpdateGoal(weeklyGoal + 1), disabled: weeklyGoal >= 7, style: { ...iconCircle, width: 30, height: 30, opacity: weeklyGoal >= 7 ? 0.4 : 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: PAPER, fontSize: 16, lineHeight: 1 }, children: "+" }) })
            ] })
          ] }),
          (() => {
            const hist = getGoalHistory(sessions, weeklyGoal, 8);
            const sugg = suggestNextGoal(sessions, weeklyGoal);
            const streakW = getStreakWeeks(sessions);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MiniGoalBar, { history: hist }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 8, color: STEEL, fontSize: 11 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "8 sett. · ",
                  streakW,
                  " ",
                  streakW === 1 ? "settimana" : "settimane",
                  " streak"
                ] }),
                sugg !== weeklyGoal && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: KHAKI }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { size: 10, style: { verticalAlign: "middle", marginRight: 4 } }),
                  "Suggerito: ",
                  formatGoal(sugg)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 10.5, marginTop: 4 }, children: [
                "~",
                estimateWeeklyCalories(sessions, weeklyGoal),
                " kcal/sett. a goal ",
                weeklyGoal
              ] })
            ] });
          })()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }, children: t("hist.35d") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }, children: heatmap.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { title: c.key, style: {
          aspectRatio: "1 / 1",
          borderRadius: 3,
          background: c.active ? BLAZE : OLIVE_DARK,
          opacity: c.active ? 1 : 0.6
        } }, c.key)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }, children: [
          "Anno · ",
          (/* @__PURE__ */ new Date()).getFullYear()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(26, 1fr)", gap: 2 }, children: yearHeat.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { title: `${c.key} · ${c.count || 0}`, style: { aspectRatio: "1/1", borderRadius: 2, background: c.count ? c.count > 1 ? BLAZE : OLIVE : OLIVE_DARK, opacity: c.count ? 1 : 0.5 } }, c.key)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { size: 12, color: KHAKI }),
          " ",
          t("hist.milestones"),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: STEEL, fontSize: 10, marginLeft: 6 }, children: [
            getMedalProgress(sessions).unlocked.length,
            "/",
            getMedalProgress(sessions).all.length,
            " sbloccate"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MedalGrid, { sessions }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }, children: t("hist.kcal7") }),
          trendPct !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: STEEL, fontSize: 11 }, children: t("hist.vsweek", { p: (trendPct > 0 ? "+" : "") + trendPct }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: "10px 6px", height: 140 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: weekData, margin: { top: 8, right: 8, left: -22, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: OLIVE_DARK, strokeDasharray: "3 3", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: { fill: STEEL, fontSize: 10 }, axisLine: { stroke: OLIVE }, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fill: STEEL, fontSize: 10 }, axisLine: false, tickLine: false, width: 30 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, fontSize: 12 }, labelStyle: { color: KHAKI }, itemStyle: { color: BLAZE }, cursor: { fill: OLIVE_DARK } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "kcal", fill: BLAZE, radius: [3, 3, 0, 0] })
        ] }) }) })
      ] }),
      (() => {
        const months = getMonthlyTrend(sessions);
        const maxK = Math.max(1, ...months.map((m2) => m2.kcal));
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }, children: "Trend mensile · kcal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: "12px 10px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "flex-end", gap: 6, height: 80 }, children: months.map((m2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "100%", height: `${Math.round(m2.kcal / maxK * 60) + 4}px`, background: m2.kcal ? BLAZE : OLIVE_DARK, borderRadius: 3, opacity: m2.kcal ? 1 : 0.5 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: m2.label })
          ] }, m2.key)) }) })
        ] });
      })(),
      sessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }, children: t("hist.fav") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14, display: "flex", flexDirection: "column", gap: 10 }, children: PROGRAMS$1.map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: PAPER }, children: tr$1(p2.name, lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: STEEL }, children: counts[p2.id] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 6, borderRadius: 3, background: OLIVE_DARK, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "100%", width: `${counts[p2.id] / maxCount * 100}%`, background: BLAZE, borderRadius: 3, transition: "width 0.4s ease" } }) })
        ] }, p2.id)) })
      ] }),
      hrData.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }, children: t("hist.hr") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: "10px 6px", height: 160 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: hrData, margin: { top: 8, right: 12, left: -18, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: OLIVE_DARK, strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: { fill: STEEL, fontSize: 10 }, axisLine: { stroke: OLIVE }, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fill: STEEL, fontSize: 10 }, axisLine: false, tickLine: false, width: 30 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, fontSize: 12 }, labelStyle: { color: KHAKI }, itemStyle: { color: BLAZE } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "hr", stroke: BLAZE, strokeWidth: 2, dot: { r: 3, fill: BLAZE } })
        ] }) }) })
      ] }),
      waistData.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }, children: t("hist.waist") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: waistData[0].cm <= waistData[waistData.length - 1].cm ? BLAZE : "#7FB069", fontSize: 11 }, children: t("hist.waist.total", { v: (waistData[waistData.length - 1].cm - waistData[0].cm > 0 ? "+" : "") + (waistData[waistData.length - 1].cm - waistData[0].cm) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: "10px 6px", height: 160 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: waistData, margin: { top: 8, right: 12, left: -18, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: OLIVE_DARK, strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: { fill: STEEL, fontSize: 10 }, axisLine: { stroke: OLIVE }, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { domain: ["dataMin - 2", "dataMax + 2"], tick: { fill: STEEL, fontSize: 10 }, axisLine: false, tickLine: false, width: 30 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, fontSize: 12 }, labelStyle: { color: KHAKI }, itemStyle: { color: BLAZE } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "cm", stroke: BLAZE, strokeWidth: 2, dot: { r: 3, fill: BLAZE } })
        ] }) }) })
      ] }),
      weightData.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }, children: t("hist.weight") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: weightData[weightData.length - 1].kg <= weightData[0].kg ? "#7FB069" : BLAZE, fontSize: 11 }, children: t("hist.weight.total", { v: (weightData[weightData.length - 1].kg - weightData[0].kg > 0 ? "+" : "") + (weightData[weightData.length - 1].kg - weightData[0].kg).toFixed(1) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: "10px 6px", height: 160 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: weightData, margin: { top: 8, right: 12, left: -18, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: OLIVE_DARK, strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: { fill: STEEL, fontSize: 10 }, axisLine: { stroke: OLIVE }, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { domain: ["dataMin - 1.5", "dataMax + 1.5"], tick: { fill: STEEL, fontSize: 10 }, axisLine: false, tickLine: false, width: 30 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, fontSize: 12 }, labelStyle: { color: KHAKI }, itemStyle: { color: "#7FB069" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "kg", stroke: "#7FB069", strokeWidth: 2, dot: { r: 3, fill: "#7FB069" } })
        ] }) }) })
      ] }),
      rpeSeries.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }, children: t("hist.rpe") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: "10px 6px", height: 150 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: rpeSeries, margin: { top: 8, right: 12, left: -18, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: OLIVE_DARK, strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: { fill: STEEL, fontSize: 10 }, axisLine: { stroke: OLIVE }, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { domain: [1, 6], ticks: [1, 2, 3, 4, 5, 6], tick: { fill: STEEL, fontSize: 10 }, axisLine: false, tickLine: false, width: 30 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, fontSize: 12 }, labelStyle: { color: KHAKI }, itemStyle: { color: BLAZE } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "rpe", stroke: BLAZE, strokeWidth: 2, dot: { r: 3, fill: BLAZE } })
        ] }) }) })
      ] }),
      profile && profile.heightCm && weightHistory.length > 0 && (() => {
        const latestKg = weightHistory[weightHistory.length - 1].kg;
        const bmi = calcBMI(latestKg, profile.heightCm);
        const cat = bmiCategory(bmi);
        const tdee = estimateTDEE(latestKg, profile.heightCm, profile.age);
        const waistLatest = waistHistory.length ? waistHistory[waistHistory.length - 1].cm : null;
        const bf = estimateBodyFat({ waistCm: waistLatest, weightKg: latestKg, heightCm: profile.heightCm, age: profile.age });
        const wht = waistLatest ? waistLatest / profile.heightCm : null;
        const wcat = wht != null ? whtCategory(wht) : null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 14, marginBottom: 16 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, letterSpacing: "0.06em", marginBottom: 6 }, children: [
            t("bmi.title"),
            " · ",
            bmi,
            " ",
            cat && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: cat.color }, children: [
              "· ",
              t("bmi." + cat.key)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 6 }, children: [
            tdee && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 12 }, children: t("bmi.tdee", { v: tdee }) }),
            bf != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: KHAKI, fontSize: 12 }, children: [
              "· BF ",
              bf,
              "%"
            ] }),
            wht != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: wcat.color, fontSize: 12 }, children: [
              "· WHtR ",
              wht.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 4, opacity: 0.8 }, children: tr$1(simpleMealHint(bmi > 27 ? "cut" : "maintain"), lang) })
        ] });
      })(),
      (() => {
        const now2 = /* @__PURE__ */ new Date();
        const { pad, days } = buildCalendarGrid(sessions, now2.getFullYear(), now2.getMonth());
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 14, marginBottom: 16 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, letterSpacing: "0.06em", marginBottom: 8 }, children: [
            t("export.calendar"),
            " · ",
            now2.toLocaleDateString(lang === "it" ? "it-IT" : lang === "de" ? "de-DE" : "en-US", { month: "long", year: "numeric" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, textAlign: "center" }, children: [
            ["L", "M", "M", "G", "V", "S", "D"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 10 }, children: d }, d)),
            Array.from({ length: pad }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `p${i}`)),
            days.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { title: d.sessions.length ? `${d.sessions.length} sessioni` : "", style: { width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, background: d.sessions.length ? BLAZE : "transparent", color: d.sessions.length ? PAPER : STEEL, border: d.isToday ? `1px solid ${KHAKI}` : "1px solid transparent", fontWeight: d.sessions.length ? 700 : 400 }, children: d.day }, d.key))
          ] })
        ] });
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 14, marginBottom: 16 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, letterSpacing: "0.06em" }, children: "Foto progressi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { background: BLAZE, color: PAPER, borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }, children: [
            "+ Foto",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", capture: "environment", style: { display: "none" }, onChange: (e) => {
              const f2 = e.target.files && e.target.files[0];
              if (f2) onAddPhoto(f2);
              e.target.value = "";
            } })
          ] })
        ] }),
        photos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12 }, children: "Nessuna foto — aggiungi la prima per vedere il prima/dopo" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }, children: photos.slice(-6).map((ph) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { aspectRatio: "3/4", borderRadius: 8, overflow: "hidden", border: `1px solid ${OLIVE}`, background: INK }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: ph.url, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) }, ph.id)) }),
          photos.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 12 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BeforeAfterSlider, { before: photos[0], after: photos[photos.length - 1] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }, children: t("hist.sessions.title") }),
      ordered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 13 }, children: t("hist.empty") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: ordered.map((s, i) => {
        const zone = s.peakHR ? hrZone(s.peakHR, profile.age, lang) : null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6, background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 14, fontWeight: 600 }, children: s.programName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5 }, children: new Date(s.date).toLocaleDateString(LOCALES[lang], { weekday: "short", day: "2-digit", month: "short" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 4, color: KHAKI, fontSize: 12.5 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 13, color: BLAZE }),
              " ",
              s.kcal
            ] }),
            zone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 4, color: zone.color, fontSize: 12.5 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { size: 13 }),
              " ",
              s.peakHR
            ] }),
            s.rpe && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 10.5, border: `1px solid ${OLIVE}`, borderRadius: 4, padding: "2px 5px" }, children: tr$1(RPE_LABELS[s.rpe - 1], lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              if (confirmDeleteDate === s.date) {
                onDeleteSession(s.date);
                setConfirmDeleteDate(null);
              } else {
                setConfirmDeleteDate(s.date);
                setTimeout(() => setConfirmDeleteDate((c) => c === s.date ? null : c), 3e3);
              }
            }, style: { ...btnIcon$1, padding: 4, background: confirmDeleteDate === s.date ? `${BLAZE}33` : "transparent" }, "aria-label": t("hist.delete"), children: confirmDeleteDate === s.date ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, color: STEEL }) })
          ] }),
          s.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 11.5, fontStyle: "italic", lineHeight: 1.4 }, children: [
            '"',
            s.notes,
            '"'
          ] })
        ] }, i);
      }) }),
      sessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => exportData(profile, sessions), style: { ...secondaryBtn, flex: 1, minWidth: 120, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }, children: t("hist.export") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => exportCSV(sessions, waistHistory, weightHistory), style: { ...secondaryBtn, flex: 1, minWidth: 120, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }, children: t("export.csv") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: async () => {
          const r = await shareStatsImage({ sessions, profile, t, tr: tr$1 });
          showToast(r === "share" ? "Condiviso" : "Immagine scaricata");
        }, style: { ...secondaryBtn, flex: 1, minWidth: 120, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles$1, { size: 14 }),
          " ",
          lang === "it" ? "Condividi PNG" : "Share PNG"
        ] }),
        "            ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setConfirmClear(true), style: { ...secondaryBtn, flex: 1, minWidth: 120, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 15 }),
          " ",
          t("hist.clear")
        ] })
      ] })
    ] }),
    confirmClear && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, background: "rgba(27,29,22,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 22, maxWidth: 320, textAlign: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 22, marginBottom: 8 }, children: t("hist.clear.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 13, marginBottom: 18 }, children: t("hist.clear.body") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setConfirmClear(false), style: { ...secondaryBtn, flex: 1 }, children: t("hist.clear.cancel") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setConfirmClear(false);
          onClear();
        }, style: { ...primaryBtn$1, flex: 1 }, children: t("hist.clear.confirm") })
      ] })
    ] }) })
  ] });
}
function BottomNav({ active, onNavigate }) {
  const { t } = useT();
  const tabs = [
    { key: "home", label: t("nav.home"), icon: House },
    { key: "library", label: t("nav.library"), icon: BookOpen },
    { key: "history", label: t("nav.history"), icon: History },
    { key: "setup", label: t("nav.setup"), icon: Settings }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-bottomnav-glass", style: {
    display: "flex",
    paddingBottom: "env(safe-area-inset-bottom, 0px)"
  }, children: tabs.map((tab) => {
    const on = active === tab.key;
    const Icon = tab.icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onNavigate(tab.key), style: {
      flex: 1,
      background: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "8px 4px 6px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      position: "relative"
    }, children: [
      on && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: 0, left: "26%", right: "26%", height: 2, borderRadius: 2, background: BLAZE, boxShadow: `0 0 8px ${BLAZE}` } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: 40,
        height: 26,
        borderRadius: 13,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: on ? `${BLAZE}22` : "transparent",
        transition: "background 0.2s ease",
        animation: on ? "tabPop 0.28s cubic-bezier(0.16,1,0.3,1)" : "none"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 20, color: on ? BLAZE : STEEL, style: { transition: "color 0.2s ease" } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: on ? BLAZE : STEEL, fontSize: 9.5, letterSpacing: "0.03em" }, children: tab.label })
    ] }, tab.key);
  }) });
}
const BUILD_VERSION = "2.8.4 · bcc1cd5";
function VersionBadge({ onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick,
      role: onClick ? "button" : void 0,
      title: onClick ? "Novità v2.7 — clic per riaprire changelog" : void 0,
      className: "o40-mono",
      style: {
        color: STEEL,
        fontSize: 9,
        textAlign: "center",
        opacity: onClick ? 0.95 : 0.75,
        marginTop: 18,
        letterSpacing: "0.07em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "6px 12px",
        background: `${INK_2}88`,
        border: `1px solid ${onClick ? KHAKI + "88" : OLIVE + "44"}`,
        borderRadius: 20,
        alignSelf: "center",
        cursor: onClick ? "pointer" : "default"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "#7FB069", boxShadow: "0 0 6px #7FB06988" } }),
        "v",
        BUILD_VERSION,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", background: BLAZE, boxShadow: `0 0 6px ${BLAZE}88` } }),
        onClick && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 8, border: `1px solid ${KHAKI}66`, borderRadius: 6, padding: "1px 5px", marginLeft: 2 }, children: "NOVITÀ" })
      ]
    }
  );
}
async function loadPhotosAsync() {
  try {
    const r = await window.storage.get("o40_photos");
    if (!(r == null ? void 0 : r.value)) return [];
    return JSON.parse(r.value);
  } catch {
    return [];
  }
}
function loadPhotos() {
  try {
    const v = localStorage.getItem("o40_photos");
    return v ? JSON.parse(v) : [];
  } catch {
    return [];
  }
}
async function savePhotosAsync(list) {
  try {
    await window.storage.set("o40_photos", JSON.stringify(list.slice(-12)));
  } catch {
  }
}
function savePhotos(list) {
  try {
    localStorage.setItem("o40_photos", JSON.stringify(list.slice(-12)));
  } catch {
  }
  savePhotosAsync(list).catch(() => {
  });
}
async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("no file"));
    if (file.size > 4 * 1024 * 1024) return reject(new Error("too big"));
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
const HK_ACTIVITY_MAP = {
  HKWorkoutActivityTypeFunctionalStrengthTraining: { it: "Forza funzionale (Apple Health)", en: "Functional strength (Apple Health)", de: "Funktionelles Krafttraining (Apple Health)" },
  HKWorkoutActivityTypeTraditionalStrengthTraining: { it: "Allenamento forza (Apple Health)", en: "Strength training (Apple Health)", de: "Krafttraining (Apple Health)" },
  HKWorkoutActivityTypeCoreTraining: { it: "Core training (Apple Health)", en: "Core training (Apple Health)", de: "Core-Training (Apple Health)" },
  HKWorkoutActivityTypeHighIntensityIntervalTraining: { it: "HIIT (Apple Health)", en: "HIIT (Apple Health)", de: "HIIT (Apple Health)" },
  HKWorkoutActivityTypeCrossTraining: { it: "Cross training (Apple Health)", en: "Cross training (Apple Health)", de: "Cross-Training (Apple Health)" },
  HKWorkoutActivityTypeFlexibility: { it: "Mobilità (Apple Health)", en: "Flexibility (Apple Health)", de: "Mobilität (Apple Health)" },
  HKWorkoutActivityTypeCooldown: { it: "Defaticamento (Apple Health)", en: "Cooldown (Apple Health)", de: "Abkühlen (Apple Health)" }
};
const HK_FALLBACK = { it: "Allenamento (Apple Health)", en: "Workout (Apple Health)", de: "Training (Apple Health)" };
const HK_RELEVANT_TYPES = Object.keys(HK_ACTIVITY_MAP);
function getXmlAttr(tag, name) {
  const m2 = tag.match(new RegExp(name + '="([^"]*)"'));
  return m2 ? m2[1] : null;
}
function parseAppleDate(s) {
  if (!s) return null;
  const m2 = s.match(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) ([+-]\d{2})(\d{2})$/);
  const d = m2 ? /* @__PURE__ */ new Date(`${m2[1]}T${m2[2]}${m2[3]}:${m2[4]}`) : new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
function parseAppleHealthExport(xmlText) {
  const result = { weightKg: null, weightDate: null, workouts: [] };
  const massRegex = /<Record[^>]*type="HKQuantityTypeIdentifierBodyMass"[^>]*\/?>/g;
  let m2, count = 0, latestDate = null, latestVal = null, latestUnit = null;
  while ((m2 = massRegex.exec(xmlText)) && count < 3e4) {
    count++;
    const date = getXmlAttr(m2[0], "startDate");
    const val = getXmlAttr(m2[0], "value");
    const unit = getXmlAttr(m2[0], "unit");
    if (date && val && (!latestDate || date > latestDate)) {
      latestDate = date;
      latestVal = parseFloat(val);
      latestUnit = unit;
    }
  }
  if (latestVal != null) {
    result.weightKg = latestUnit && latestUnit.toLowerCase().includes("lb") ? Math.round(latestVal * 0.453592 * 10) / 10 : latestVal;
    result.weightDate = latestDate;
  }
  const workoutRegex = /<Workout[^>]*>/g;
  let wcount = 0;
  while ((m2 = workoutRegex.exec(xmlText)) && wcount < 5e3) {
    const tag = m2[0];
    const type = getXmlAttr(tag, "workoutActivityType");
    if (!type || !HK_RELEVANT_TYPES.includes(type)) continue;
    const startDate = getXmlAttr(tag, "startDate");
    if (!startDate) continue;
    const durationRaw = parseFloat(getXmlAttr(tag, "duration") || "0");
    const durationUnit = getXmlAttr(tag, "durationUnit") || "min";
    const durationMin = durationUnit === "min" ? durationRaw : durationRaw / 60;
    const kcalStr = getXmlAttr(tag, "totalEnergyBurned");
    const kcal = kcalStr ? Math.round(parseFloat(kcalStr)) : Math.round(durationMin * 6);
    result.workouts.push({ type, durationMin: Math.round(durationMin), kcal, startDate });
    wcount++;
  }
  return result;
}
function App() {
  const [screen, setScreen] = reactExports.useState("loading");
  const [profile, setProfile] = reactExports.useState(null);
  const [lang, setLang] = reactExports.useState(detectLang());
  const t = reactExports.useCallback((key, vars) => translate(key, lang, vars), [lang]);
  async function handleSetLang(l2) {
    if (!LANGS.includes(l2)) return;
    setLang(l2);
    if (profile) {
      const p2 = { ...profile, lang: l2 };
      setProfile(p2);
      try {
        await window.storage.set("o40_profile", JSON.stringify(p2), false);
      } catch (e) {
      }
    }
  }
  const [sessions, setSessions] = reactExports.useState([]);
  const [formName, setFormName] = reactExports.useState("");
  const [formAge, setFormAge] = reactExports.useState("");
  const [formWeight, setFormWeight] = reactExports.useState("");
  const [formWaist, setFormWaist] = reactExports.useState("");
  const [formHeight, setFormHeight] = reactExports.useState("");
  const [formCustomWork, setFormCustomWork] = reactExports.useState("40");
  const [formCustomRest, setFormCustomRest] = reactExports.useState("20");
  const [reminderHour, setReminderHour] = reactExports.useState("8");
  const [reminderMinute, setReminderMinute] = reactExports.useState("0");
  const [reminderEnabled, setReminderEnabled] = reactExports.useState(false);
  const [pushEnabled, setPushEnabled] = reactExports.useState(() => {
    try {
      return !!localStorage.getItem("o40_push_sub");
    } catch {
      return false;
    }
  });
  const [pushSupported, setPushSupported] = reactExports.useState(() => isPushSupported());
  const [pushBusy, setPushBusy] = reactExports.useState(false);
  const [installPrompt, setInstallPrompt] = reactExports.useState(null);
  const [showTour, setShowTour] = reactExports.useState(false);
  const [photos, setPhotos] = reactExports.useState(() => loadPhotos());
  const [largeText, setLargeText] = reactExports.useState(() => {
    try {
      return localStorage.getItem("o40_largeText") === "1";
    } catch {
      return false;
    }
  });
  const [previewProgram, setPreviewProgram] = reactExports.useState(null);
  const [showBellyTest, setShowBellyTest] = reactExports.useState(false);
  const [showPose, setShowPose] = reactExports.useState(null);
  const [showChangelog, setShowChangelog] = reactExports.useState(false);
  const [showReleaseBanner, setShowReleaseBanner] = reactExports.useState(() => {
    try {
      return localStorage.getItem("o40_release_2.8.4") !== "dismissed";
    } catch {
      return true;
    }
  });
  const [aiCoachEnabled, setAiCoachEnabled] = reactExports.useState(() => {
    try {
      return localStorage.getItem("o40_aiCoach") !== "0";
    } catch {
      return true;
    }
  });
  reactExports.useEffect(() => {
    let cancelled = false;
    loadPhotosAsync().then((asyncPhotos) => {
      if (cancelled) return;
      if (JSON.stringify(asyncPhotos) !== JSON.stringify(photos)) setPhotos(asyncPhotos);
    }).catch(() => {
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const [activeProgram, setActiveProgram] = reactExports.useState(null);
  const [seq, setSeq] = reactExports.useState([]);
  const [phaseIdx, setPhaseIdx] = reactExports.useState(0);
  const [secondsLeft, setSecondsLeft] = reactExports.useState(0);
  const [paused, setPaused] = reactExports.useState(false);
  const [soundOn, setSoundOn] = reactExports.useState(true);
  const [vibrationOn, setVibrationOn] = reactExports.useState(true);
  const [musicOn, setMusicOn] = reactExports.useState(false);
  const [musicTrack, setMusicTrack] = reactExports.useState(DEFAULT_TRACK);
  const [musicVolume, setMusicVolume] = reactExports.useState(0.55);
  const [musicAutoPlay, setMusicAutoPlay] = reactExports.useState(true);
  const [musicShuffle, setMusicShuffle] = reactExports.useState(false);
  const [exitConfirm, setExitConfirm] = reactExports.useState(false);
  const [customPrograms, setCustomPrograms] = reactExports.useState([]);
  const [editingCustom, setEditingCustom] = reactExports.useState(null);
  const [toast, setToast] = reactExports.useState(null);
  const toastTimerRef = reactExports.useRef(null);
  const [healthWeightSuggestion, setHealthWeightSuggestion] = reactExports.useState(null);
  const [healthImportStatus, setHealthImportStatus] = reactExports.useState("idle");
  const [lastStats, setLastStats] = reactExports.useState(null);
  const [hrInput, setHrInput] = reactExports.useState("");
  const [waistInput, setWaistInput] = reactExports.useState("");
  const [rpe, setRpe] = reactExports.useState(null);
  const [notes, setNotes] = reactExports.useState("");
  const [waistHistory, setWaistHistory] = reactExports.useState([]);
  const [weightHistory, setWeightHistory] = reactExports.useState([]);
  const [weightInput, setWeightInput] = reactExports.useState("");
  const soundRef = reactExports.useRef(true);
  soundRef.current = soundOn;
  const vibrationRef = reactExports.useRef(true);
  vibrationRef.current = vibrationOn;
  function showToast2(message) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = setTimeout(() => setToast(null), 2600);
  }
  reactExports.useEffect(() => {
    (async () => {
      let p2 = null, s = [], cp = [], wh = [];
      try {
        const r = await window.storage.get("o40_profile", false);
        if (r) p2 = JSON.parse(r.value);
      } catch (e) {
      }
      try {
        const r = await window.storage.get("o40_sessions", false);
        if (r) s = JSON.parse(r.value);
      } catch (e) {
      }
      try {
        const r = await window.storage.get("o40_custom_programs", false);
        if (r) cp = JSON.parse(r.value);
      } catch (e) {
      }
      try {
        const r = await window.storage.get("o40_waist", false);
        if (r) wh = JSON.parse(r.value);
      } catch (e) {
      }
      let wt = null;
      try {
        const r = await window.storage.get("o40_weight", false);
        if (r) wt = JSON.parse(r.value);
      } catch (e) {
      }
      setProfile(p2);
      setSessions(s || []);
      setCustomPrograms(cp || []);
      setWaistHistory(wh || []);
      setWeightHistory(wt || []);
      if (p2) {
        setLang(p2.lang && LANGS.includes(p2.lang) && p2.lang || detectLang());
        setFormName(p2.name);
        setFormAge(String(p2.age));
        setFormWeight(String(p2.weight));
        setFormHeight(p2.heightCm ? String(p2.heightCm) : "");
        setFormCustomWork(p2.customWork || "40");
        setFormCustomRest(p2.customRest || "20");
        setSoundOn(p2.soundOn !== false);
        setVibrationOn(p2.vibrationOn !== false);
        setMusicOn(p2.musicOn === true);
        setMusicTrack(p2.musicTrack || DEFAULT_TRACK);
        if (typeof p2.musicVolume === "number") setMusicVolume(p2.musicVolume);
        setMusicAutoPlay(p2.musicAutoPlay !== false);
        setMusicShuffle(p2.musicShuffle === true);
        musicSetAutoPlay(p2.musicAutoPlay !== false);
        musicSetShuffle(p2.musicShuffle === true);
      }
      setScreen(p2 ? "home" : "setup");
    })();
  }, []);
  reactExports.useEffect(() => {
    function handleClick(e) {
      if (e.target.closest("button") && soundRef.current) playClick();
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);
  reactExports.useEffect(() => {
    window.__o40Busy = screen === "session";
    if (screen !== "session" && window.__o40ReloadAfter) {
      window.__o40ReloadAfter = false;
      window.location.reload();
    }
  }, [screen]);
  reactExports.useEffect(() => {
    function onVisibility() {
      if (document.hidden && screen === "session") setPaused(true);
      else if (!document.hidden) checkAndFireReminder(t);
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [screen, t]);
  reactExports.useEffect(() => {
    const id = setInterval(() => checkAndFireReminder(t), 6e4);
    checkAndFireReminder(t);
    return () => clearInterval(id);
  }, [t]);
  reactExports.useEffect(() => {
    function checkMotivational() {
      var _a, _b;
      if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
      const now = /* @__PURE__ */ new Date();
      if (pushEnabled) return;
      if (now.getHours() !== 9 || now.getMinutes() !== 0) return;
      const key = `o40_motiv_fired_${now.toISOString().slice(0, 10)}`;
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
      try {
        const msg = getMotivationalMessage({ sessions, profile, lang });
        (_b = (_a = navigator.serviceWorker) == null ? void 0 : _a.ready) == null ? void 0 : _b.then((reg) => {
          if (reg && "showNotification" in reg) {
            reg.showNotification(msg.title, { body: msg.body, icon: "./icons/icon-192.png", badge: "./icons/icon-192.png", tag: msg.tag, data: { url: "./" } });
          } else if (typeof Notification !== "undefined") {
            new Notification(msg.title, { body: msg.body, icon: "./icons/icon-192.png", tag: msg.tag });
          }
        }).catch(() => {
          if (typeof Notification !== "undefined") {
            try {
              new Notification(msg.title, { body: msg.body, icon: "./icons/icon-192.png", tag: msg.tag });
            } catch {
            }
          }
        });
      } catch {
      }
    }
    const id = setInterval(checkMotivational, 6e4);
    checkMotivational();
    function onVis() {
      if (!document.hidden) checkMotivational();
    }
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [sessions, profile, lang, pushEnabled]);
  reactExports.useEffect(() => {
    if (!pushEnabled) return;
    updatePushStats(sessions, profile, lang);
  }, [sessions, profile, lang, pushEnabled]);
  reactExports.useEffect(() => {
    function onReady() {
      setInstallPrompt(window.__o40DeferPrompt);
    }
    function onInstalled() {
      setInstallPrompt(null);
    }
    window.addEventListener("o40:installReady", onReady);
    window.addEventListener("appinstalled", onInstalled);
    if (window.__o40DeferPrompt) setInstallPrompt(window.__o40DeferPrompt);
    return () => {
      window.removeEventListener("o40:installReady", onReady);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);
  reactExports.useEffect(() => {
    if (screen === "home" && profile && !profile.seenTour) {
      const seen2 = (() => {
        try {
          return localStorage.getItem("o40_seenTour");
        } catch {
          return null;
        }
      })();
      if (!seen2) setShowTour(true);
    }
  }, [screen, profile]);
  reactExports.useEffect(() => {
    if (screen !== "home" || !profile) return;
    if (showTour) return;
    try {
      const seen2 = localStorage.getItem(CHANGELOG_STORAGE_KEY);
      if (!seen2) {
        const t2 = setTimeout(() => setShowChangelog(true), 900);
        return () => clearTimeout(t2);
      }
    } catch {
    }
  }, [screen, profile, showTour]);
  reactExports.useEffect(() => {
    document.documentElement.style.fontSize = largeText ? "18px" : "";
    try {
      localStorage.setItem("o40_largeText", largeText ? "1" : "0");
    } catch {
    }
  }, [largeText]);
  reactExports.useEffect(() => {
    try {
      localStorage.setItem("o40_aiCoach", aiCoachEnabled ? "1" : "0");
    } catch {
    }
  }, [aiCoachEnabled]);
  const [updateAvailable, setUpdateAvailable] = reactExports.useState(false);
  const [updateVersion, setUpdateVersion] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let cancelled = false;
    async function checkSwUpdate() {
      var _a;
      try {
        const res = await fetch("./sw.js", { cache: "no-store" });
        const text = await res.text();
        const remote = (_a = text.match(/o40-v[0-9a-f]{8}/)) == null ? void 0 : _a[0];
        if (!remote || cancelled) return;
        let lastSeen = null;
        try {
          lastSeen = localStorage.getItem("o40_lastSw");
        } catch {
        }
        if (!lastSeen) {
          try {
            localStorage.setItem("o40_lastSw", remote);
          } catch {
          }
          return;
        }
        if (remote !== lastSeen && !cancelled) {
          setUpdateVersion(remote);
          setUpdateAvailable(true);
        }
        if ("serviceWorker" in navigator) {
          const reg = await navigator.serviceWorker.getRegistration();
          if (reg) await reg.update().catch(() => {
          });
        }
      } catch {
      }
    }
    checkSwUpdate();
    const id = setInterval(checkSwUpdate, 3e4);
    function onFocus() {
      checkSwUpdate();
    }
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") checkSwUpdate();
    });
    return () => {
      cancelled = true;
      clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, []);
  reactExports.useEffect(() => {
    musicSetShouldPlay(!!musicOn);
    musicSetAutoPlay(!!musicAutoPlay);
    musicSetShuffle(!!musicShuffle);
    if (!musicOn) {
      musicPause();
      return;
    }
    musicLoad(trackSrc(musicTrack));
    let vol = musicVolume;
    if (screen === "session") {
      const ph = seq[phaseIdx];
      if (ph) {
        if (ph.type === "rest" || ph.type === "cooldown") vol *= 0.45;
        else if (ph.type === "warmup") vol *= 0.75;
      }
      if (paused) vol *= 0.25;
    } else {
      vol *= 0.45;
    }
    musicSetVolume(vol);
    musicPlay();
  }, [musicOn, musicAutoPlay, musicShuffle, screen, musicTrack, phaseIdx, paused, musicVolume, seq]);
  reactExports.useEffect(() => {
    musicSetOnTrackChange((nextId) => {
      setMusicTrack(nextId);
      if (profile) {
        const p2 = { ...profile, musicTrack: nextId };
        setProfile(p2);
        window.storage.set("o40_profile", JSON.stringify(p2), false).catch(() => {
        });
      }
    });
    return () => musicSetOnTrackChange(null);
  }, [profile]);
  reactExports.useEffect(() => {
    if (screen !== "session" || paused) return;
    const cur = seq[phaseIdx];
    if (!cur) return;
    if (cur.type === "work" && aiCoachEnabled) return;
    if (cur.mode === "reps") return;
    if (secondsLeft <= 0) {
      advancePhase();
      return;
    }
    const t2 = setTimeout(() => setSecondsLeft((s) => s - 1), 1e3);
    return () => clearTimeout(t2);
  }, [screen, paused, secondsLeft, phaseIdx, seq, aiCoachEnabled]);
  function announcePhase(phase) {
    if (!soundRef.current) return;
    if (phase.type === "work") speak$1(tr$1(EXERCISES[phase.exerciseId].name, lang));
    else if (phase.type === "rest") speak$1(t("ses.rest"));
    else if (phase.type === "cooldown") speak$1(t("ses.cooldown"));
  }
  function advancePhase() {
    const nextIdx = phaseIdx + 1;
    if (nextIdx >= seq.length) {
      finishSession();
      return;
    }
    if (soundRef.current) playBeep(seq[nextIdx].type === "work" ? 880 : 440);
    if (vibrationRef.current) vibrate(seq[nextIdx].type === "work" ? [60] : [30, 40, 30]);
    announcePhase(seq[nextIdx]);
    setPhaseIdx(nextIdx);
    setSecondsLeft(seq[nextIdx].duration ?? 0);
  }
  function goPrev() {
    if (phaseIdx <= 0) return;
    const idx = phaseIdx - 1;
    if (soundRef.current) playBeep(440);
    announcePhase(seq[idx]);
    setPhaseIdx(idx);
    setSecondsLeft(seq[idx].duration ?? 0);
  }
  function startSession(program) {
    const skip = !!profile.skipWarmup;
    const preset = levelPreset$1(profile);
    const mode = profile && profile.executionMode || "time";
    const levelKey = profile && profile.level || "combattente";
    const s = buildSequence(program, skip, preset.work, preset.rest, mode, levelKey);
    setActiveProgram(program);
    setSeq(s);
    setPhaseIdx(0);
    setSecondsLeft(s[0].duration ?? 0);
    setPaused(false);
    setRpe(null);
    if (soundRef.current) {
      playBeep(660);
      announcePhase(s[0]);
    }
    setScreen("session");
  }
  function finishSession() {
    const skip = !!profile.skipWarmup;
    const preset = levelPreset$1(profile);
    const mode = profile && profile.executionMode || "time";
    const levelKey = profile && profile.level || "combattente";
    const kcal = Math.round(estimateProgramKcal$1(activeProgram, profile.weight, skip, preset.work, preset.rest, mode, levelKey));
    if (soundRef.current) playBeep(1e3, 0.25);
    if (vibrationRef.current) vibrate([80, 60, 80, 60, 150]);
    setLastStats({ program: activeProgram, kcal, durationSec: totalSeqSeconds$1(activeProgram, skip, preset.work, preset.rest, mode, levelKey) });
    setScreen("summary");
  }
  async function saveProfile() {
    const prevLevel = profile && (profile.level || (profile.intervalPreset === "breve" ? "recluta" : profile.intervalPreset === "lungo" ? "elite" : "combattente"));
    const p2 = {
      name: formName.trim() || "Operatore",
      age: Math.max(18, Math.min(90, parseInt(formAge, 10) || 40)),
      weight: Math.max(40, Math.min(180, parseInt(formWeight, 10) || 80)),
      heightCm: formHeight ? Math.max(120, Math.min(220, parseInt(formHeight, 10) || 0)) : profile && profile.heightCm || null,
      customWork: formCustomWork ? String(Math.max(10, Math.min(90, parseInt(formCustomWork, 10) || 40))) : profile && profile.customWork || "40",
      customRest: formCustomRest ? String(Math.max(5, Math.min(60, parseInt(formCustomRest, 10) || 20))) : profile && profile.customRest || "20",
      weeklyGoal: profile && profile.weeklyGoal || WEEKLY_GOAL,
      soundOn: profile ? profile.soundOn !== false : true,
      vibrationOn: profile ? profile.vibrationOn !== false : true,
      musicOn: profile ? profile.musicOn === true : false,
      musicTrack: profile && profile.musicTrack || DEFAULT_TRACK,
      musicVolume: typeof (profile && profile.musicVolume) === "number" ? profile.musicVolume : 0.55,
      skipWarmup: profile ? !!profile.skipWarmup : false,
      voiceCountdown: profile ? !!profile.voiceCountdown : false,
      seenIntro: profile ? !!profile.seenIntro : false,
      intervalPreset: formCustomWork !== "40" || formCustomRest !== "20" ? "custom" : profile && profile.intervalPreset || "standard",
      level: prevLevel || "combattente",
      executionMode: profile && profile.executionMode || "time",
      lang,
      campStart: profile && profile.campStart ? profile.campStart : (/* @__PURE__ */ new Date()).toISOString()
    };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
    }
    if (formWaist) {
      const cm = Math.max(40, Math.min(200, parseInt(formWaist, 10)));
      if (!isNaN(cm)) await recordWaist(cm);
    }
    setScreen("home");
  }
  async function recordWaist(cm) {
    const latest = waistHistory.length ? waistHistory[waistHistory.length - 1] : null;
    if (latest && latest.cm === cm && dayKey$1(new Date(latest.date)) === dayKey$1(/* @__PURE__ */ new Date())) return;
    const updated = [...waistHistory, { date: (/* @__PURE__ */ new Date()).toISOString(), cm }];
    setWaistHistory(updated);
    try {
      await window.storage.set("o40_waist", JSON.stringify(updated), false);
    } catch (e) {
    }
  }
  async function recordWeight(kg) {
    const latest = weightHistory.length ? weightHistory[weightHistory.length - 1] : null;
    if (latest && latest.kg === kg && dayKey$1(new Date(latest.date)) === dayKey$1(/* @__PURE__ */ new Date())) return;
    const updated = [...weightHistory, { date: (/* @__PURE__ */ new Date()).toISOString(), kg }];
    setWeightHistory(updated);
    try {
      await window.storage.set("o40_weight", JSON.stringify(updated), false);
    } catch (e) {
    }
  }
  async function applyLevel(key) {
    const next = getLevel(key);
    const p2 = { ...profile, level: next.key, intervalPreset: next.preset };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
    }
  }
  async function promoteLevel() {
    const cur = getLevel(profile.level || "combattente");
    const idx = LEVELS.indexOf(cur);
    if (idx >= LEVELS.length - 1) return;
    const next = LEVELS[idx + 1];
    await applyLevel(next.key);
    showToast2(t("toast.level.up", { label: tr$1(next.label, lang) }));
  }
  async function toggleVoiceCountdown() {
    const p2 = { ...profile, voiceCountdown: !profile.voiceCountdown };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch {
    }
  }
  async function toggleSkipWarmup() {
    const p2 = { ...profile, skipWarmup: !profile.skipWarmup };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
    }
  }
  async function setIntervalPreset(key) {
    const p2 = { ...profile, intervalPreset: key };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
    }
  }
  async function setExecutionMode(mode) {
    const m2 = mode === "reps" ? "reps" : "time";
    const p2 = { ...profile, executionMode: m2 };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
    }
  }
  async function dismissIntro() {
    const p2 = { ...profile, seenIntro: true };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
    }
  }
  async function updateWeeklyGoal(n2) {
    const p2 = { ...profile, weeklyGoal: Math.max(1, Math.min(7, n2)) };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
    }
  }
  async function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    const p2 = { ...profile, soundOn: next };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
    }
  }
  async function toggleVibration() {
    const next = !vibrationOn;
    setVibrationOn(next);
    if (next) vibrate([40]);
    const p2 = { ...profile, vibrationOn: next };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
    }
  }
  async function togglePush() {
    if (pushBusy) return;
    setPushBusy(true);
    try {
      if (pushEnabled) {
        await unsubscribePush();
        setPushEnabled(false);
        showToast2(lang === "it" ? "Push disattivato" : "Push disabled");
      } else {
        await subscribePush();
        setPushEnabled(true);
        updatePushStats(sessions, profile, lang).catch(() => {
        });
        showToast2(lang === "it" ? "Push attivato — anche con PWA chiusa" : "Push enabled — works with PWA closed");
      }
    } catch (e) {
      showToast2(e.message || "Push non disponibile");
    } finally {
      setPushBusy(false);
    }
  }
  async function saveBellyTest({ plankSec, crunchReps, level, date }) {
    const p2 = { ...profile, bellyTest: { plankSec, crunchReps, level, date }, bellyLevel: level, bellyLevelUpdated: date };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch {
    }
    setShowBellyTest(false);
    showToast2(`Livello pancia: ${level.toUpperCase()} ✓`);
    updatePushStats(sessions, p2, lang).catch(() => {
    });
  }
  async function handleTestPush() {
    if (pushBusy) return;
    setPushBusy(true);
    try {
      if (pushEnabled && isPushSupported()) {
        await testPushViaSW(lang);
        showToast2(lang === "it" ? "Test push inviato" : lang === "de" ? "Test-Push gesendet" : "Test push sent");
      } else {
        const ok = fireTestNotification(t);
        showToast2(ok ? lang === "it" ? "Notifica di test inviata" : lang === "de" ? "Testbenachrichtigung gesendet" : "Test notification sent" : "Permesso negato");
      }
    } catch (e) {
      showToast2(e.message || "Test fallito");
    } finally {
      setPushBusy(false);
    }
  }
  reactExports.useEffect(() => {
    if (!isPushSupported()) {
      setPushSupported(false);
      return;
    }
    getExistingSubscription().then((sub) => {
      const has = !!sub;
      setPushEnabled(has);
      setPushSupported(true);
      try {
        if (has) localStorage.setItem("o40_push_sub", JSON.stringify({ endpoint: sub.endpoint }));
        else localStorage.removeItem("o40_push_sub");
      } catch {
      }
    }).catch(() => {
    });
  }, []);
  function trackSrc(id) {
    const t2 = TRACKS.find((x) => x.id === id);
    return (t2 || TRACKS[0]).src;
  }
  async function toggleMusic() {
    const next = !musicOn;
    setMusicOn(next);
    const p2 = { ...profile, musicOn: next };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
    }
    musicSetShouldPlay(next);
    if (next) {
      musicLoad(trackSrc(musicTrack));
      musicSetVolume(musicVolume);
      musicPlay();
    } else {
      musicPause();
    }
  }
  async function selectMusicTrack(id) {
    setMusicTrack(id);
    const p2 = { ...profile, musicTrack: id };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
    }
    if (musicOn) {
      musicLoad(trackSrc(id));
      musicSetVolume(musicVolume);
      musicPlay();
    }
  }
  async function changeMusicVolume(v) {
    setMusicVolume(v);
    musicSetVolume(v);
    const p2 = { ...profile, musicVolume: v };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
    }
  }
  async function toggleMusicAutoPlay() {
    const next = !musicAutoPlay;
    setMusicAutoPlay(next);
    musicSetAutoPlay(next);
    const p2 = { ...profile, musicAutoPlay: next };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
    }
  }
  async function toggleMusicShuffle() {
    const next = !musicShuffle;
    setMusicShuffle(next);
    musicSetShuffle(next);
    const p2 = { ...profile, musicShuffle: next };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
    }
  }
  async function nextMusicTrack() {
    const nextId = musicNext();
    if (nextId) {
      setMusicTrack(nextId);
      const p2 = { ...profile, musicTrack: nextId };
      setProfile(p2);
      try {
        await window.storage.set("o40_profile", JSON.stringify(p2), false);
      } catch (e) {
      }
    }
  }
  async function prevMusicTrack() {
    const prevId = musicPrev();
    if (prevId) {
      setMusicTrack(prevId);
      const p2 = { ...profile, musicTrack: prevId };
      setProfile(p2);
      try {
        await window.storage.set("o40_profile", JSON.stringify(p2), false);
      } catch (e) {
      }
    }
  }
  async function saveSession() {
    const prevBest = computeBestStreak(sessions);
    const prevCount = sessions.length;
    const weekAgo = Date.now() - 7 * 864e5;
    const prevWeekCount = sessions.filter((s) => new Date(s.date).getTime() > weekAgo).length;
    const goal = profile.weeklyGoal || WEEKLY_GOAL;
    const record = {
      date: (/* @__PURE__ */ new Date()).toISOString(),
      programId: activeProgram.id,
      programName: tr$1(activeProgram.name, lang),
      kcal: lastStats.kcal,
      durationSec: lastStats.durationSec,
      peakHR: hrInput ? parseInt(hrInput, 10) : null,
      rpe,
      notes: notes.trim() || null
    };
    const updated = [...sessions, record];
    setSessions(updated);
    try {
      await window.storage.set("o40_sessions", JSON.stringify(updated), false);
    } catch (e) {
    }
    if (waistInput) {
      const cm = Math.max(40, Math.min(200, parseInt(waistInput, 10)));
      if (!isNaN(cm)) await recordWaist(cm);
    }
    if (weightInput) {
      const kg = Math.round(parseFloat(weightInput.replace(",", ".")) * 10) / 10;
      if (!isNaN(kg)) await recordWeight(Math.max(35, Math.min(250, kg)));
    }
    setHrInput("");
    setWaistInput("");
    setWeightInput("");
    setRpe(null);
    setNotes("");
    setScreen("home");
    const newBest = computeBestStreak(updated);
    const newCount = updated.length;
    const newWeekCount = updated.filter((s) => new Date(s.date).getTime() > weekAgo).length;
    const newStreakBadge = STREAK_BADGES.find((n2) => newBest >= n2 && prevBest < n2);
    const newSessionBadge = SESSION_BADGES.find((n2) => newCount >= n2 && prevCount < n2);
    const rank = getRank(newCount);
    const prevRank = getRank(prevCount);
    if (rank.current.name !== prevRank.current.name) {
      showToast2(t("toast.promoted", { rank: tr$1(rank.current.name, lang) }));
    } else if (newStreakBadge) {
      showToast2(t("toast.milestone.streak", { n: newStreakBadge }));
    } else if (newSessionBadge) {
      showToast2(t("toast.milestone.sessions", { n: newSessionBadge }));
    } else if (newWeekCount >= goal && prevWeekCount < goal) {
      showToast2(t("toast.goal"));
    } else {
      showToast2(t("toast.saved"));
    }
  }
  async function clearHistory() {
    setSessions([]);
    try {
      await window.storage.set("o40_sessions", JSON.stringify([]), false);
    } catch (e) {
    }
    showToast2(t("toast.history"));
  }
  async function handleAddPhoto(file) {
    if (!file) return;
    try {
      const url = await fileToDataUrl(file);
      const next = [...photos, { id: Date.now().toString(36), date: (/* @__PURE__ */ new Date()).toISOString(), url }].slice(-12);
      setPhotos(next);
      savePhotos(next);
      showToast2("Foto aggiunta");
    } catch {
      showToast2("File troppo grande (max 4MB)");
    }
  }
  async function deleteSession(date) {
    const updated = sessions.filter((s) => s.date !== date);
    setSessions(updated);
    try {
      await window.storage.set("o40_sessions", JSON.stringify(updated), false);
    } catch (e) {
    }
    showToast2(t("toast.removed"));
  }
  async function createCustomProgram(program) {
    const updated = [...customPrograms, program];
    setCustomPrograms(updated);
    try {
      await window.storage.set("o40_custom_programs", JSON.stringify(updated), false);
    } catch (e) {
    }
    setPreviewProgram(program);
    setScreen("preview");
    showToast2(t("toast.created"));
  }
  async function updateCustomProgram(program) {
    const updated = customPrograms.map((p2) => p2.id === program.id ? program : p2);
    setCustomPrograms(updated);
    try {
      await window.storage.set("o40_custom_programs", JSON.stringify(updated), false);
    } catch (e) {
    }
    setEditingCustom(null);
    setPreviewProgram(program);
    setScreen("preview");
    showToast2("Missione aggiornata");
  }
  async function deleteCustomProgram(id) {
    const updated = customPrograms.filter((p2) => p2.id !== id);
    setCustomPrograms(updated);
    try {
      await window.storage.set("o40_custom_programs", JSON.stringify(updated), false);
    } catch (e) {
    }
  }
  async function importAppleHealth(file) {
    setHealthImportStatus("reading");
    try {
      const text = await file.text();
      setHealthImportStatus("parsing");
      const parsed = parseAppleHealthExport(text);
      const existingImportDates = new Set(sessions.filter((s) => s.imported).map((s) => s.date));
      const newRecords = [];
      for (const w of parsed.workouts) {
        const d = parseAppleDate(w.startDate);
        if (!d) continue;
        const iso = d.toISOString();
        if (existingImportDates.has(iso)) continue;
        existingImportDates.add(iso);
        newRecords.push({
          date: iso,
          programId: "health-import",
          programName: tr$1(HK_ACTIVITY_MAP[w.type] || HK_FALLBACK, lang),
          kcal: w.kcal,
          peakHR: null,
          rpe: null,
          notes: null,
          imported: true
        });
      }
      if (newRecords.length) {
        const updated = [...sessions, ...newRecords].sort((a, b) => new Date(a.date) - new Date(b.date));
        setSessions(updated);
        try {
          await window.storage.set("o40_sessions", JSON.stringify(updated), false);
        } catch (e) {
        }
      }
      if (parsed.weightKg) {
        setHealthWeightSuggestion({ kg: Math.round(parsed.weightKg * 10) / 10, date: parsed.weightDate });
      }
      setHealthImportStatus("done");
      showToast2(newRecords.length ? t("toast.imported", { n: newRecords.length }) : t("toast.imported.none"));
    } catch (e) {
      setHealthImportStatus("error");
      showToast2(t("toast.import.fail"));
    }
  }
  async function applyHealthWeight() {
    if (!healthWeightSuggestion) return;
    const p2 = { ...profile, weight: Math.round(healthWeightSuggestion.kg) };
    setProfile(p2);
    setFormWeight(String(p2.weight));
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
    }
    setHealthWeightSuggestion(null);
    showToast2(t("toast.weight"));
  }
  const shell = { minHeight: "100dvh", background: INK, display: "flex", justifyContent: "center" };
  const phone = { width: "100%", maxWidth: 460, minHeight: "100dvh", display: "flex", flexDirection: "column", position: "relative" };
  if (screen === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LangContext.Provider, { value: { lang, t, setLang: handleSetLang }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40", style: { ...shell, alignItems: "center", justifyContent: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: STYLES }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", width: "min(320px, 82vw)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-display", style: { color: KHAKI, fontSize: 26 }, children: [
          t("app.loading"),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-blink", style: { color: BLAZE }, children: t("app.loading.operativo") }),
          "…"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-loadbar", style: { height: 6, marginTop: 16 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}) })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LangContext.Provider, { value: { lang, t, setLang: handleSetLang }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40", style: { ...shell, position: "relative" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: STYLES }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-aura" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-phone", style: phone, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-gridbg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-camo", style: { height: 6 } }),
      screen === "setup" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SetupScreen,
        {
          formName,
          setFormName,
          formAge,
          setFormAge,
          formWeight,
          setFormWeight,
          formWaist,
          setFormWaist,
          formHeight,
          setFormHeight,
          formCustomWork,
          setFormCustomWork,
          formCustomRest,
          setFormCustomRest,
          reminderHour,
          setReminderHour,
          reminderMinute,
          setReminderMinute,
          onSave: saveProfile,
          canCancel: !!profile,
          onCancel: () => setScreen("home"),
          soundOn,
          onToggleSound: toggleSound,
          vibrationOn,
          onToggleVibration: toggleVibration,
          musicOn,
          onToggleMusic: toggleMusic,
          musicTrack,
          onSelectTrack: selectMusicTrack,
          musicVolume,
          onChangeMusicVolume: changeMusicVolume,
          musicAutoPlay,
          onToggleAutoPlay: toggleMusicAutoPlay,
          musicShuffle,
          onToggleShuffle: toggleMusicShuffle,
          onNextTrack: nextMusicTrack,
          onPrevTrack: prevMusicTrack,
          skipWarmup: !!(profile && profile.skipWarmup),
          onToggleSkipWarmup: toggleSkipWarmup,
          voiceCountdown: !!(profile && profile.voiceCountdown),
          onToggleVoiceCountdown: toggleVoiceCountdown,
          level: profile && (profile.level || (profile.intervalPreset === "breve" ? "recluta" : profile.intervalPreset === "lungo" ? "elite" : "combattente")) || "combattente",
          onSetLevel: applyLevel,
          intervalPreset: profile && profile.intervalPreset || "standard",
          onSetIntervalPreset: setIntervalPreset,
          executionMode: profile && profile.executionMode || "time",
          onSetExecutionMode: setExecutionMode,
          onImportHealth: importAppleHealth,
          healthImportStatus,
          healthWeightSuggestion,
          onApplyHealthWeight: applyHealthWeight,
          showToast: showToast2,
          largeText,
          setLargeText,
          pushEnabled,
          pushSupported,
          pushBusy,
          onTogglePush: togglePush,
          onTestPush: handleTestPush
        }
      ),
      screen === "home" && profile && showReleaseBanner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        margin: "10px 16px 0",
        padding: "12px 14px",
        borderRadius: 14,
        background: `linear-gradient(135deg, ${BLAZE}18, ${INK_2})`,
        border: `1px solid ${BLAZE}55`,
        boxShadow: `0 4px 16px rgba(0,0,0,0.35), 0 0 0 1px ${BLAZE}22 inset`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        position: "relative",
        overflow: "hidden"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, opacity: 0.06, background: `repeating-linear-gradient(90deg, ${OLIVE} 0 1px, transparent 1px 14px)`, pointerEvents: "none" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, alignItems: "center", flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, display: "grid", placeItems: "center", flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles$1, { size: 18, color: PAPER }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minWidth: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { background: BLAZE, color: PAPER, fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", padding: "2px 6px", borderRadius: 6 }, children: "NUOVO v2.8.4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 10 }, children: "26 AGO 2026 · 7 FIX TRACKING" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 15, lineHeight: 1.1, marginTop: 3 }, children: "Sessione tracking sbloccata — prova con frontale!" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            try {
              localStorage.setItem("o40_release_2.8.4", "dismissed");
            } catch {
            }
            setShowReleaseBanner(false);
          }, "aria-label": "Chiudi", style: { width: 28, height: 28, borderRadius: "50%", border: `1px solid ${OLIVE}`, background: INK, color: STEEL, display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0, position: "relative" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: { position: "relative", margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 3, listStyle: "disc" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: { color: KHAKI, fontSize: 11.5, lineHeight: 1.35 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { color: PAPER }, children: "Framing" }),
            ": caviglie non bloccano più — squat/affondo/wallsit/pushup +6 a terra visibili anche a mezzo busto"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: { color: KHAKI, fontSize: 11.5, lineHeight: 1.35 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { color: PAPER }, children: "Side-view" }),
            ": angolo bilaterale visibility-aware (EMA+isteresi) — 16 esercizi stabili anche di lato"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: { color: KHAKI, fontSize: 11.5, lineHeight: 1.35 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { color: PAPER }, children: "Idle → READY" }),
            ": badge POSE% corretto + bug root STANDING/TOP risolto (0→7 rep su tuoi landmarks)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: { color: KHAKI, fontSize: 11.5, lineHeight: 1.35 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { color: PAPER }, children: "Squat" }),
            ": hipY calibrato a inizio sessione + badge CONF diagnostico + fix DEBUG INK_2"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", display: "flex", gap: 8, marginTop: 2 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowChangelog(true), style: { flex: 1, background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, color: PAPER, border: "none", borderRadius: 10, padding: "9px 12px", fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: "0.06em", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 14 }),
            " DETTAGLI ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            try {
              localStorage.setItem("o40_release_2.8.4", "dismissed");
            } catch {
            }
            setShowReleaseBanner(false);
          }, style: { background: INK, border: `1px solid ${OLIVE}`, color: KHAKI, borderRadius: 10, padding: "9px 14px", fontSize: 11, fontWeight: 600, cursor: "pointer" }, children: "Chiudi" })
        ] })
      ] }),
      screen === "home" && profile && /* @__PURE__ */ jsxRuntimeExports.jsx(
        HomeScreen,
        {
          profile,
          sessions,
          customPrograms,
          waistHistory,
          weightHistory,
          onOpenProgram: (p2) => {
            setPreviewProgram(p2);
            setScreen("preview");
          },
          onBuild: () => {
            setEditingCustom(null);
            setScreen("builder");
          },
          onEditCustom: (p2) => {
            setEditingCustom(p2);
            setScreen("builder");
          },
          onDeleteCustom: deleteCustomProgram,
          onDismissIntro: dismissIntro,
          onPromote: promoteLevel,
          onBellyTest: () => setShowBellyTest(true),
          onPose: (ex) => setShowPose(ex)
        }
      ),
      screen === "library" && /* @__PURE__ */ jsxRuntimeExports.jsx(LibraryScreen, { sessions, profile }),
      screen === "builder" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        BuilderScreen,
        {
          profile,
          initial: editingCustom,
          onCancel: () => {
            setEditingCustom(null);
            setScreen("home");
          },
          onCreate: createCustomProgram,
          onUpdate: updateCustomProgram
        }
      ),
      screen === "preview" && previewProgram && /* @__PURE__ */ jsxRuntimeExports.jsx(
        PreviewScreen,
        {
          program: previewProgram,
          profile,
          soundOn,
          onBack: () => setScreen("home"),
          onStart: () => setScreen("countdown")
        }
      ),
      screen === "countdown" && previewProgram && /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownScreen, { program: previewProgram, lang, t, onDone: () => startSession(previewProgram) }),
      screen === "session" && seq.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SessionScreen,
        {
          program: activeProgram,
          profile,
          seq,
          phaseIdx,
          secondsLeft,
          paused,
          setPaused,
          soundOn,
          setSoundOn,
          musicOn,
          onToggleMusic: toggleMusic,
          aiEnabled: aiCoachEnabled,
          onToggleAi: () => setAiCoachEnabled((v) => !v),
          lang,
          onSkip: advancePhase,
          onPrev: goPrev,
          exitConfirm,
          setExitConfirm,
          onExit: () => {
            setExitConfirm(false);
            setScreen("home");
          }
        }
      ),
      screen === "summary" && lastStats && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryScreen,
        {
          stats: lastStats,
          profile,
          sessions,
          hrInput,
          setHrInput,
          waistInput,
          setWaistInput,
          weightInput,
          setWeightInput,
          rpe,
          setRpe,
          notes,
          setNotes,
          onSave: saveSession
        }
      ),
      screen === "history" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        HistoryScreen,
        {
          sessions,
          profile,
          waistHistory,
          weightHistory,
          photos,
          onAddPhoto: handleAddPhoto,
          onBack: () => setScreen("home"),
          onClear: clearHistory,
          onUpdateGoal: updateWeeklyGoal,
          onDeleteSession: deleteSession
        }
      ),
      ["home", "library", "history", "setup"].includes(screen) && /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { active: screen, onNavigate: setScreen }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: screen === "loading" ? "12px 0" : "6px 0 10px", opacity: 0.85 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(VersionBadge, { onClick: () => setShowChangelog(true) }),
        updateAvailable && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: async () => {
              try {
                try {
                  if (updateVersion) localStorage.setItem("o40_lastSw", updateVersion);
                } catch {
                }
                const reg = await navigator.serviceWorker.getRegistration();
                if (reg && reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
                await fetch("./sw.js", { cache: "reload" });
                window.location.href = window.location.pathname + "?v=" + (updateVersion || Date.now()) + window.location.hash;
                setTimeout(() => window.location.reload(), 400);
              } catch {
                window.location.reload();
              }
            },
            style: {
              background: BLAZE,
              color: PAPER,
              border: `1px solid ${BLAZE}`,
              borderRadius: 20,
              padding: "6px 14px",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: `0 4px 12px ${BLAZE}66`,
              animation: "glowPulse 1.8s ease-in-out infinite"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw$1, { size: 12 }),
              " Aggiorna app → ",
              updateVersion || "nuova versione"
            ]
          }
        )
      ] }),
      showChangelog && /* @__PURE__ */ jsxRuntimeExports.jsx(ChangelogModal, { lang, onClose: () => setShowChangelog(false), onTry: () => setShowPose("squat") }),
      toast && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 20,
        zIndex: 20,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-toast-in", style: {
        background: `linear-gradient(135deg, ${OLIVE}, ${OLIVE_DARK})`,
        border: `1px solid ${BLAZE}`,
        borderRadius: 12,
        padding: "10px 18px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        color: PAPER,
        fontSize: 13,
        fontWeight: 600,
        textAlign: "center",
        maxWidth: "100%"
      }, children: toast }) }),
      installPrompt && ["home", "library", "history", "setup"].includes(screen) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-install", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 36, height: 36, borderRadius: 8, background: BLAZE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 18, color: PAPER }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontWeight: 700, fontSize: 13 }, children: lang === "it" ? "Installa Operator 40" : lang === "de" ? "Operator 40 installieren" : "Install Operator 40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 11 }, children: lang === "it" ? "Aggiungi alla home per l’accesso offline" : "Add to home for offline access" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
          try {
            installPrompt.prompt();
            const c = await installPrompt.userChoice;
            if (c.outcome === "accepted") setInstallPrompt(null);
          } catch {
          }
        }, style: { background: BLAZE, color: PAPER, border: "none", borderRadius: 8, padding: "8px 12px", fontWeight: 700, cursor: "pointer", fontSize: 12 }, children: "OK" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setInstallPrompt(null), style: { background: "transparent", border: "none", color: STEEL, cursor: "pointer", padding: 6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 }) })
      ] }),
      showTour && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-tour-mask", onClick: () => {
        setShowTour(false);
        try {
          localStorage.setItem("o40_seenTour", "1");
        } catch {
        }
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-tour-card", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles$1, { size: 18, color: BLAZE }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-display", style: { fontSize: 20 }, children: "Benvenuto!" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, lineHeight: 1.5, color: "#333" }, children: lang === "it" ? "Tre tap: scegli la missione del giorno, allenati 15 minuti, traccia i progressi. Tutto offline, sulla tua privacy." : "Three taps: pick today's mission, train 15 min, track progress. Fully offline, private." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 14 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setShowTour(false);
            try {
              localStorage.setItem("o40_seenTour", "1");
            } catch {
            }
          }, style: { flex: 1, background: BLAZE, color: PAPER, border: "none", borderRadius: 10, padding: "10px 0", fontWeight: 700, cursor: "pointer" }, children: "INIZIA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setShowTour(false);
            try {
              localStorage.setItem("o40_seenTour", "1");
            } catch {
            }
          }, style: { background: "transparent", border: `1px solid ${OLIVE}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16, color: OLIVE }) })
        ] })
      ] }) }),
      showBellyTest && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-tour-mask", onClick: () => setShowBellyTest(false), style: { zIndex: 20 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-tour-card", onClick: (e) => e.stopPropagation(), style: { maxHeight: "90vh", overflowY: "auto", maxWidth: 440, width: "92vw" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BellyTest, { lang, initial: profile == null ? void 0 : profile.bellyTest, onSave: saveBellyTest, onClose: () => setShowBellyTest(false) }) }) }),
      showPose && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-tour-mask", onClick: () => setShowPose(null), style: { zIndex: 25 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-tour-card", onClick: (e) => e.stopPropagation(), style: { maxHeight: "90vh", overflowY: "auto", maxWidth: 560, width: "96vw", padding: 0, overflow: "hidden", border: `1px solid ${OLIVE}`, borderRadius: 18 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FitnessEngineView,
        {
          exercise: typeof showPose === "string" ? showPose : "squat",
          lang,
          onClose: () => setShowPose(null),
          onDone: ({ reps, elapsedMs, avgQuality }) => {
            showToast2(`${reps} rep · ${Math.round(elapsedMs / 1e3)}s · Q ${Math.round(avgQuality)}/100`);
          }
        }
      ) }) })
    ] })
  ] }) });
}
/*! Capacitor: https://capacitorjs.com/ - MIT License */
const createCapacitorPlatforms = (win) => {
  const defaultPlatformMap = /* @__PURE__ */ new Map();
  defaultPlatformMap.set("web", { name: "web" });
  const capPlatforms = win.CapacitorPlatforms || {
    currentPlatform: { name: "web" },
    platforms: defaultPlatformMap
  };
  const addPlatform = (name, platform) => {
    capPlatforms.platforms.set(name, platform);
  };
  const setPlatform = (name) => {
    if (capPlatforms.platforms.has(name)) {
      capPlatforms.currentPlatform = capPlatforms.platforms.get(name);
    }
  };
  capPlatforms.addPlatform = addPlatform;
  capPlatforms.setPlatform = setPlatform;
  return capPlatforms;
};
const initPlatforms = (win) => win.CapacitorPlatforms = createCapacitorPlatforms(win);
const CapacitorPlatforms = /* @__PURE__ */ initPlatforms(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
CapacitorPlatforms.addPlatform;
CapacitorPlatforms.setPlatform;
var ExceptionCode;
(function(ExceptionCode2) {
  ExceptionCode2["Unimplemented"] = "UNIMPLEMENTED";
  ExceptionCode2["Unavailable"] = "UNAVAILABLE";
})(ExceptionCode || (ExceptionCode = {}));
class CapacitorException extends Error {
  constructor(message, code, data) {
    super(message);
    this.message = message;
    this.code = code;
    this.data = data;
  }
}
const getPlatformId = (win) => {
  var _a, _b;
  if (win === null || win === void 0 ? void 0 : win.androidBridge) {
    return "android";
  } else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
    return "ios";
  } else {
    return "web";
  }
};
const createCapacitor = (win) => {
  var _a, _b, _c, _d, _e;
  const capCustomPlatform = win.CapacitorCustomPlatform || null;
  const cap = win.Capacitor || {};
  const Plugins = cap.Plugins = cap.Plugins || {};
  const capPlatforms = win.CapacitorPlatforms;
  const defaultGetPlatform = () => {
    return capCustomPlatform !== null ? capCustomPlatform.name : getPlatformId(win);
  };
  const getPlatform = ((_a = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _a === void 0 ? void 0 : _a.getPlatform) || defaultGetPlatform;
  const defaultIsNativePlatform = () => getPlatform() !== "web";
  const isNativePlatform = ((_b = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _b === void 0 ? void 0 : _b.isNativePlatform) || defaultIsNativePlatform;
  const defaultIsPluginAvailable = (pluginName) => {
    const plugin = registeredPlugins.get(pluginName);
    if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
      return true;
    }
    if (getPluginHeader(pluginName)) {
      return true;
    }
    return false;
  };
  const isPluginAvailable = ((_c = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _c === void 0 ? void 0 : _c.isPluginAvailable) || defaultIsPluginAvailable;
  const defaultGetPluginHeader = (pluginName) => {
    var _a2;
    return (_a2 = cap.PluginHeaders) === null || _a2 === void 0 ? void 0 : _a2.find((h) => h.name === pluginName);
  };
  const getPluginHeader = ((_d = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _d === void 0 ? void 0 : _d.getPluginHeader) || defaultGetPluginHeader;
  const handleError = (err) => win.console.error(err);
  const pluginMethodNoop = (_target, prop, pluginName) => {
    return Promise.reject(`${pluginName} does not have an implementation of "${prop}".`);
  };
  const registeredPlugins = /* @__PURE__ */ new Map();
  const defaultRegisterPlugin = (pluginName, jsImplementations = {}) => {
    const registeredPlugin = registeredPlugins.get(pluginName);
    if (registeredPlugin) {
      console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
      return registeredPlugin.proxy;
    }
    const platform = getPlatform();
    const pluginHeader = getPluginHeader(pluginName);
    let jsImplementation;
    const loadPluginImplementation = async () => {
      if (!jsImplementation && platform in jsImplementations) {
        jsImplementation = typeof jsImplementations[platform] === "function" ? jsImplementation = await jsImplementations[platform]() : jsImplementation = jsImplementations[platform];
      } else if (capCustomPlatform !== null && !jsImplementation && "web" in jsImplementations) {
        jsImplementation = typeof jsImplementations["web"] === "function" ? jsImplementation = await jsImplementations["web"]() : jsImplementation = jsImplementations["web"];
      }
      return jsImplementation;
    };
    const createPluginMethod = (impl, prop) => {
      var _a2, _b2;
      if (pluginHeader) {
        const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find((m2) => prop === m2.name);
        if (methodHeader) {
          if (methodHeader.rtype === "promise") {
            return (options) => cap.nativePromise(pluginName, prop.toString(), options);
          } else {
            return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
          }
        } else if (impl) {
          return (_a2 = impl[prop]) === null || _a2 === void 0 ? void 0 : _a2.bind(impl);
        }
      } else if (impl) {
        return (_b2 = impl[prop]) === null || _b2 === void 0 ? void 0 : _b2.bind(impl);
      } else {
        throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
      }
    };
    const createPluginMethodWrapper = (prop) => {
      let remove2;
      const wrapper = (...args) => {
        const p2 = loadPluginImplementation().then((impl) => {
          const fn = createPluginMethod(impl, prop);
          if (fn) {
            const p3 = fn(...args);
            remove2 = p3 === null || p3 === void 0 ? void 0 : p3.remove;
            return p3;
          } else {
            throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
          }
        });
        if (prop === "addListener") {
          p2.remove = async () => remove2();
        }
        return p2;
      };
      wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
      Object.defineProperty(wrapper, "name", {
        value: prop,
        writable: false,
        configurable: false
      });
      return wrapper;
    };
    const addListener = createPluginMethodWrapper("addListener");
    const removeListener = createPluginMethodWrapper("removeListener");
    const addListenerNative = (eventName, callback) => {
      const call = addListener({ eventName }, callback);
      const remove2 = async () => {
        const callbackId = await call;
        removeListener({
          eventName,
          callbackId
        }, callback);
      };
      const p2 = new Promise((resolve) => call.then(() => resolve({ remove: remove2 })));
      p2.remove = async () => {
        console.warn(`Using addListener() without 'await' is deprecated.`);
        await remove2();
      };
      return p2;
    };
    const proxy = new Proxy({}, {
      get(_, prop) {
        switch (prop) {
          case "$$typeof":
            return void 0;
          case "toJSON":
            return () => ({});
          case "addListener":
            return pluginHeader ? addListenerNative : addListener;
          case "removeListener":
            return removeListener;
          default:
            return createPluginMethodWrapper(prop);
        }
      }
    });
    Plugins[pluginName] = proxy;
    registeredPlugins.set(pluginName, {
      name: pluginName,
      proxy,
      platforms: /* @__PURE__ */ new Set([
        ...Object.keys(jsImplementations),
        ...pluginHeader ? [platform] : []
      ])
    });
    return proxy;
  };
  const registerPlugin2 = ((_e = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _e === void 0 ? void 0 : _e.registerPlugin) || defaultRegisterPlugin;
  if (!cap.convertFileSrc) {
    cap.convertFileSrc = (filePath) => filePath;
  }
  cap.getPlatform = getPlatform;
  cap.handleError = handleError;
  cap.isNativePlatform = isNativePlatform;
  cap.isPluginAvailable = isPluginAvailable;
  cap.pluginMethodNoop = pluginMethodNoop;
  cap.registerPlugin = registerPlugin2;
  cap.Exception = CapacitorException;
  cap.DEBUG = !!cap.DEBUG;
  cap.isLoggingEnabled = !!cap.isLoggingEnabled;
  cap.platform = cap.getPlatform();
  cap.isNative = cap.isNativePlatform();
  return cap;
};
const initCapacitorGlobal = (win) => win.Capacitor = createCapacitor(win);
const Capacitor = /* @__PURE__ */ initCapacitorGlobal(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
const registerPlugin = Capacitor.registerPlugin;
Capacitor.Plugins;
class WebPlugin {
  constructor(config) {
    this.listeners = {};
    this.retainedEventArguments = {};
    this.windowListeners = {};
    if (config) {
      console.warn(`Capacitor WebPlugin "${config.name}" config object was deprecated in v3 and will be removed in v4.`);
      this.config = config;
    }
  }
  addListener(eventName, listenerFunc) {
    let firstListener = false;
    const listeners = this.listeners[eventName];
    if (!listeners) {
      this.listeners[eventName] = [];
      firstListener = true;
    }
    this.listeners[eventName].push(listenerFunc);
    const windowListener = this.windowListeners[eventName];
    if (windowListener && !windowListener.registered) {
      this.addWindowListener(windowListener);
    }
    if (firstListener) {
      this.sendRetainedArgumentsForEvent(eventName);
    }
    const remove2 = async () => this.removeListener(eventName, listenerFunc);
    const p2 = Promise.resolve({ remove: remove2 });
    return p2;
  }
  async removeAllListeners() {
    this.listeners = {};
    for (const listener in this.windowListeners) {
      this.removeWindowListener(this.windowListeners[listener]);
    }
    this.windowListeners = {};
  }
  notifyListeners(eventName, data, retainUntilConsumed) {
    const listeners = this.listeners[eventName];
    if (!listeners) {
      if (retainUntilConsumed) {
        let args = this.retainedEventArguments[eventName];
        if (!args) {
          args = [];
        }
        args.push(data);
        this.retainedEventArguments[eventName] = args;
      }
      return;
    }
    listeners.forEach((listener) => listener(data));
  }
  hasListeners(eventName) {
    return !!this.listeners[eventName].length;
  }
  registerWindowListener(windowEventName, pluginEventName) {
    this.windowListeners[pluginEventName] = {
      registered: false,
      windowEventName,
      pluginEventName,
      handler: (event) => {
        this.notifyListeners(pluginEventName, event);
      }
    };
  }
  unimplemented(msg = "not implemented") {
    return new Capacitor.Exception(msg, ExceptionCode.Unimplemented);
  }
  unavailable(msg = "not available") {
    return new Capacitor.Exception(msg, ExceptionCode.Unavailable);
  }
  async removeListener(eventName, listenerFunc) {
    const listeners = this.listeners[eventName];
    if (!listeners) {
      return;
    }
    const index = listeners.indexOf(listenerFunc);
    this.listeners[eventName].splice(index, 1);
    if (!this.listeners[eventName].length) {
      this.removeWindowListener(this.windowListeners[eventName]);
    }
  }
  addWindowListener(handle) {
    window.addEventListener(handle.windowEventName, handle.handler);
    handle.registered = true;
  }
  removeWindowListener(handle) {
    if (!handle) {
      return;
    }
    window.removeEventListener(handle.windowEventName, handle.handler);
    handle.registered = false;
  }
  sendRetainedArgumentsForEvent(eventName) {
    const args = this.retainedEventArguments[eventName];
    if (!args) {
      return;
    }
    delete this.retainedEventArguments[eventName];
    args.forEach((arg) => {
      this.notifyListeners(eventName, arg);
    });
  }
}
const encode = (str) => encodeURIComponent(str).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
const decode = (str) => str.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
class CapacitorCookiesPluginWeb extends WebPlugin {
  async getCookies() {
    const cookies = document.cookie;
    const cookieMap = {};
    cookies.split(";").forEach((cookie) => {
      if (cookie.length <= 0)
        return;
      let [key, value] = cookie.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
      key = decode(key).trim();
      value = decode(value).trim();
      cookieMap[key] = value;
    });
    return cookieMap;
  }
  async setCookie(options) {
    try {
      const encodedKey = encode(options.key);
      const encodedValue = encode(options.value);
      const expires = `; expires=${(options.expires || "").replace("expires=", "")}`;
      const path = (options.path || "/").replace("path=", "");
      const domain = options.url != null && options.url.length > 0 ? `domain=${options.url}` : "";
      document.cookie = `${encodedKey}=${encodedValue || ""}${expires}; path=${path}; ${domain};`;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async deleteCookie(options) {
    try {
      document.cookie = `${options.key}=; Max-Age=0`;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async clearCookies() {
    try {
      const cookies = document.cookie.split(";") || [];
      for (const cookie of cookies) {
        document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${(/* @__PURE__ */ new Date()).toUTCString()};path=/`);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async clearAllCookies() {
    try {
      await this.clearCookies();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
registerPlugin("CapacitorCookies", {
  web: () => new CapacitorCookiesPluginWeb()
});
const readBlobAsBase64 = async (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    const base64String = reader.result;
    resolve(base64String.indexOf(",") >= 0 ? base64String.split(",")[1] : base64String);
  };
  reader.onerror = (error) => reject(error);
  reader.readAsDataURL(blob);
});
const normalizeHttpHeaders = (headers = {}) => {
  const originalKeys = Object.keys(headers);
  const loweredKeys = Object.keys(headers).map((k2) => k2.toLocaleLowerCase());
  const normalized = loweredKeys.reduce((acc, key, index) => {
    acc[key] = headers[originalKeys[index]];
    return acc;
  }, {});
  return normalized;
};
const buildUrlParams = (params, shouldEncode = true) => {
  if (!params)
    return null;
  const output = Object.entries(params).reduce((accumulator, entry) => {
    const [key, value] = entry;
    let encodedValue;
    let item;
    if (Array.isArray(value)) {
      item = "";
      value.forEach((str) => {
        encodedValue = shouldEncode ? encodeURIComponent(str) : str;
        item += `${key}=${encodedValue}&`;
      });
      item.slice(0, -1);
    } else {
      encodedValue = shouldEncode ? encodeURIComponent(value) : value;
      item = `${key}=${encodedValue}`;
    }
    return `${accumulator}&${item}`;
  }, "");
  return output.substr(1);
};
const buildRequestInit = (options, extra = {}) => {
  const output = Object.assign({ method: options.method || "GET", headers: options.headers }, extra);
  const headers = normalizeHttpHeaders(options.headers);
  const type = headers["content-type"] || "";
  if (typeof options.data === "string") {
    output.body = options.data;
  } else if (type.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(options.data || {})) {
      params.set(key, value);
    }
    output.body = params.toString();
  } else if (type.includes("multipart/form-data") || options.data instanceof FormData) {
    const form = new FormData();
    if (options.data instanceof FormData) {
      options.data.forEach((value, key) => {
        form.append(key, value);
      });
    } else {
      for (const key of Object.keys(options.data)) {
        form.append(key, options.data[key]);
      }
    }
    output.body = form;
    const headers2 = new Headers(output.headers);
    headers2.delete("content-type");
    output.headers = headers2;
  } else if (type.includes("application/json") || typeof options.data === "object") {
    output.body = JSON.stringify(options.data);
  }
  return output;
};
class CapacitorHttpPluginWeb extends WebPlugin {
  /**
   * Perform an Http request given a set of options
   * @param options Options to build the HTTP request
   */
  async request(options) {
    const requestInit = buildRequestInit(options, options.webFetchExtra);
    const urlParams = buildUrlParams(options.params, options.shouldEncodeUrlParams);
    const url = urlParams ? `${options.url}?${urlParams}` : options.url;
    const response = await fetch(url, requestInit);
    const contentType = response.headers.get("content-type") || "";
    let { responseType = "text" } = response.ok ? options : {};
    if (contentType.includes("application/json")) {
      responseType = "json";
    }
    let data;
    let blob;
    switch (responseType) {
      case "arraybuffer":
      case "blob":
        blob = await response.blob();
        data = await readBlobAsBase64(blob);
        break;
      case "json":
        data = await response.json();
        break;
      case "document":
      case "text":
      default:
        data = await response.text();
    }
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return {
      data,
      headers,
      status: response.status,
      url: response.url
    };
  }
  /**
   * Perform an Http GET request given a set of options
   * @param options Options to build the HTTP request
   */
  async get(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "GET" }));
  }
  /**
   * Perform an Http POST request given a set of options
   * @param options Options to build the HTTP request
   */
  async post(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "POST" }));
  }
  /**
   * Perform an Http PUT request given a set of options
   * @param options Options to build the HTTP request
   */
  async put(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "PUT" }));
  }
  /**
   * Perform an Http PATCH request given a set of options
   * @param options Options to build the HTTP request
   */
  async patch(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "PATCH" }));
  }
  /**
   * Perform an Http DELETE request given a set of options
   * @param options Options to build the HTTP request
   */
  async delete(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "DELETE" }));
  }
}
registerPlugin("CapacitorHttp", {
  web: () => new CapacitorHttpPluginWeb()
});
const Preferences = registerPlugin("Preferences", {
  web: () => __vitePreload(() => import("./web-CtqCXpCe.js"), true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url).then((m2) => new m2.PreferencesWeb())
});
const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
let idbProxyableTypes;
let cursorAdvanceMethods;
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const transactionDoneMap = /* @__PURE__ */ new WeakMap();
const transformCache = /* @__PURE__ */ new WeakMap();
const reverseTransformCache = /* @__PURE__ */ new WeakMap();
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener("success", success);
      request.removeEventListener("error", error);
    };
    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };
    const error = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener("success", success);
    request.addEventListener("error", error);
  });
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  if (transactionDoneMap.has(tx))
    return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener("complete", complete);
      tx.removeEventListener("error", error);
      tx.removeEventListener("abort", error);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error = () => {
      reject(tx.error || new DOMException("AbortError", "AbortError"));
      unlisten();
    };
    tx.addEventListener("complete", complete);
    tx.addEventListener("error", error);
    tx.addEventListener("abort", error);
  });
  transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      if (prop === "done")
        return transactionDoneMap.get(target);
      if (prop === "store") {
        return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  if (getCursorAdvanceMethods().includes(func)) {
    return function(...args) {
      func.apply(unwrap(this), args);
      return wrap(this.request);
    };
  }
  return function(...args) {
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === "function")
    return wrapFunction(value);
  if (value instanceof IDBTransaction)
    cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes()))
    return new Proxy(value, idbProxyTraps);
  return value;
}
function wrap(value) {
  if (value instanceof IDBRequest)
    return promisifyRequest(value);
  if (transformCache.has(value))
    return transformCache.get(value);
  const newValue = transformCachableValue(value);
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = wrap(request);
  if (upgrade) {
    request.addEventListener("upgradeneeded", (event) => {
      upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
    });
  }
  if (blocked) {
    request.addEventListener("blocked", (event) => blocked(
      // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
      event.oldVersion,
      event.newVersion,
      event
    ));
  }
  openPromise.then((db) => {
    if (terminated)
      db.addEventListener("close", () => terminated());
    if (blocking) {
      db.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
    }
  }).catch(() => {
  });
  return openPromise;
}
const readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
const writeMethods = ["put", "add", "delete", "clear"];
const cachedMethods = /* @__PURE__ */ new Map();
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
    return;
  }
  if (cachedMethods.get(prop))
    return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, "");
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))
  ) {
    return;
  }
  const method = async function(storeName, ...args) {
    const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
    let target2 = tx.store;
    if (useIndex)
      target2 = target2.index(args.shift());
    return (await Promise.all([
      target2[targetFuncName](...args),
      isWrite && tx.done
    ]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
const advanceMethodProps = ["continue", "continuePrimaryKey", "advance"];
const methodMap = {};
const advanceResults = /* @__PURE__ */ new WeakMap();
const ittrProxiedCursorToOriginalProxy = /* @__PURE__ */ new WeakMap();
const cursorIteratorTraps = {
  get(target, prop) {
    if (!advanceMethodProps.includes(prop))
      return target[prop];
    let cachedFunc = methodMap[prop];
    if (!cachedFunc) {
      cachedFunc = methodMap[prop] = function(...args) {
        advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
      };
    }
    return cachedFunc;
  }
};
async function* iterate(...args) {
  let cursor = this;
  if (!(cursor instanceof IDBCursor)) {
    cursor = await cursor.openCursor(...args);
  }
  if (!cursor)
    return;
  cursor = cursor;
  const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
  ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
  reverseTransformCache.set(proxiedCursor, unwrap(cursor));
  while (cursor) {
    yield proxiedCursor;
    cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
    advanceResults.delete(proxiedCursor);
  }
}
function isIteratorProp(target, prop) {
  return prop === Symbol.asyncIterator && instanceOfAny(target, [IDBIndex, IDBObjectStore, IDBCursor]) || prop === "iterate" && instanceOfAny(target, [IDBIndex, IDBObjectStore]);
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get(target, prop, receiver) {
    if (isIteratorProp(target, prop))
      return iterate;
    return oldTraps.get(target, prop, receiver);
  },
  has(target, prop) {
    return isIteratorProp(target, prop) || oldTraps.has(target, prop);
  }
}));
const isNative = () => typeof window !== "undefined" && window.Capacitor && window.Capacitor.isNativePlatform();
let dbPromise = null;
function getDB() {
  if (dbPromise) return dbPromise;
  if (typeof indexedDB === "undefined") return null;
  try {
    dbPromise = openDB("operator40", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("kv")) db.createObjectStore("kv");
      }
    });
    return dbPromise;
  } catch {
    return null;
  }
}
const IDB_KEYS = /* @__PURE__ */ new Set([
  "o40_profile",
  "o40_sessions",
  "o40_custom_programs",
  "o40_waist",
  "o40_weight",
  "o40_photos",
  "o40_favs",
  "o40_favorites"
]);
async function get(key) {
  if (isNative()) {
    const r = await Preferences.get({ key });
    return r.value == null ? void 0 : { value: r.value };
  }
  if (IDB_KEYS.has(key)) {
    try {
      const db = await getDB();
      if (db) {
        const v = await db.get("kv", key);
        if (v !== void 0) return { value: v };
        const ls = localStorage.getItem(key);
        if (ls != null) {
          db.put("kv", ls, key).catch(() => {
          });
          return { value: ls };
        }
        return void 0;
      }
    } catch {
    }
  }
  try {
    const value = localStorage.getItem(key);
    return value == null ? void 0 : { value };
  } catch {
    return void 0;
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
        await db.put("kv", value, key);
        try {
          localStorage.removeItem(key);
        } catch {
        }
        return;
      }
    } catch (e) {
      console.warn("[storage] IDB set failed, fallback to localStorage", key, e);
    }
  }
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn("[storage] set failed", key, e);
    if (e && e.name === "QuotaExceededError") {
      try {
        localStorage.removeItem(key);
        localStorage.setItem(key, value);
      } catch {
      }
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
    if (db) await db.delete("kv", key).catch(() => {
    });
  } catch {
  }
  try {
    localStorage.removeItem(key);
  } catch {
  }
}
async function clear() {
  if (isNative()) {
    await Preferences.clear();
    return;
  }
  try {
    const db = await getDB();
    if (db) await db.clear("kv").catch(() => {
    });
  } catch {
  }
  try {
    localStorage.clear();
  } catch {
  }
}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    __publicField(this, "handleFix", async () => {
      this.setState({ fixing: true, fixLog: "Pulizia cache..." });
      try {
        if ("serviceWorker" in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          for (const r of regs) await r.unregister();
        }
        if (window.caches) {
          const keys = await caches.keys();
          for (const k2 of keys) await caches.delete(k2);
        }
        try {
          localStorage.removeItem("o40_lastSw");
        } catch {
        }
        try {
          sessionStorage.clear();
        } catch {
        }
        this.setState({ fixLog: "Fatto — ricarico..." });
        setTimeout(() => {
          window.location.href = "./?v=" + Date.now() + "#force";
          window.location.reload();
        }, 600);
      } catch (e) {
        this.setState({ fixing: false, fixLog: "Errore: " + e.message });
      }
    });
    this.state = { hasError: false, error: null, fixing: false, fixLog: "" };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info);
  }
  render() {
    if (this.state.hasError) {
      const isFixing = this.state.fixing;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#1B1D16", color: "#EDE8D8", padding: 24, textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontFamily: "Bebas Neue, sans-serif", fontSize: 28, letterSpacing: "0.05em" }, children: "OPERAZIONE INTERROTTA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { opacity: 0.7, marginTop: 8, maxWidth: 360 }, children: "Si è verificato un errore imprevisto. I tuoi dati (missioni, foto, profilo) restano salvati — non disinstallare l’app." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => window.location.reload(),
            style: { marginTop: 20, background: "#C1440E", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontWeight: 700, cursor: "pointer", width: "100%", maxWidth: 360 },
            children: "RICARICA"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: this.handleFix,
            disabled: isFixing,
            style: { marginTop: 10, background: isFixing ? "#4A5233" : "#242820", color: "#EDE8D8", border: "1px solid #4A5233", borderRadius: 10, padding: "12px 24px", fontWeight: 700, cursor: "pointer", width: "100%", maxWidth: 360 },
            children: isFixing ? "PULIZIA IN CORSO..." : "PULISCI CACHE PWA (mantiene i dati)"
          }
        ),
        this.state.fixLog && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 10, fontSize: 11, opacity: 0.6 }, children: this.state.fixLog }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "./force-update.html", style: { marginTop: 12, fontSize: 12, color: "#B8AE8C", textDecoration: "underline" }, children: "Apri pagina di recupero" }),
        this.state.error && /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { style: { marginTop: 16, fontSize: 11, opacity: 0.5, maxWidth: 360, overflow: "auto", textAlign: "left" }, children: String(this.state.error.message || this.state.error) })
      ] });
    }
    return this.props.children;
  }
}
window.storage = { get, set, remove, clear };
window.__o40DeferPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  window.__o40DeferPrompt = e;
  window.dispatchEvent(new CustomEvent("o40:installReady"));
});
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    let refreshing = false;
    const checkUpdate = () => {
      navigator.serviceWorker.getRegistration().then((reg) => reg && reg.update()).catch(() => {
      });
    };
    navigator.serviceWorker.register("./sw.js").then(() => {
      checkUpdate();
      window.addEventListener("focus", checkUpdate);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") checkUpdate();
      });
    }).catch(() => {
    });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      if (window.__o40Busy) {
        window.__o40ReloadAfter = true;
        return;
      }
      refreshing = true;
      window.location.reload();
    });
  });
}
const root = createRoot(document.getElementById("root"));
root.render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
export {
  WebPlugin as W
};
