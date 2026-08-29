const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-aK3jCnQG.js","./icons-CLcWqI5o.js","./charts-BIux2oEU.js","./web-LLef69x4.js","./CountdownScreen-B6ns6Aq8.js","./SetupScreen-Bay8QDqG.js","./TopBar-CWXKtjL2.js","./HomeScreen-CMc2D1Qq.js","./GoalRing-Ckz3cdjj.js","./ExerciseFigure-Bz-yJ1YY.js","./DogTag-McALqTeV.js","./ProgressRing-DkbvVO8W.js","./LibraryScreen-xbIkzZo4.js","./clips-DJ4gBJJK.js","./BuilderScreen-DvmanM2H.js","./PreviewScreen-nULaaRt8.js","./SessionScreen-CZY9wT1H.js","./SummaryScreen-D2LQtufl.js","./HistoryScreen-BZjFAbK2.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { r as reactExports, T as Trophy, a as Timer, C as Check, b as ChevronRight, R as React, S as Sparkles, X, Z as Zap, H as House, B as BookOpen, d as History, e as Settings, f as RefreshCw, h as Target, E as Eye, i as ChevronLeft } from "./icons-CLcWqI5o.js";
import { r as reactDomExports } from "./charts-BIux2oEU.js";
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
  "setup.waist": {
    it: "Girovita (cm) — la misura della pancia",
    en: "Waist (cm) — the belly measurement",
    de: "Bauchumfang (cm) — die Bauchmessung"
  },
  "setup.waist.ph": { it: "es. 98", en: "e.g. 98", de: "z. B. 98" },
  "setup.sounds": { it: "Suoni", en: "Sounds", de: "Töne" },
  "setup.vibration": { it: "Vibrazione", en: "Vibration", de: "Vibration" },
  "setup.skip": {
    it: "Salta riscaldamento/defaticamento",
    en: "Skip warm-up/cooldown",
    de: "Aufwärmen/Abkühlen überspringen"
  },
  "setup.music": { it: "Musica motivazionale", en: "Motivational music", de: "Motivationsmusik" },
  "setup.music.pick": {
    it: "Scegli la colonna sonora del tuo allenamento:",
    en: "Choose the soundtrack for your workout:",
    de: "Wähle den Soundtrack für dein Training:"
  },
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
  "setup.health": {
    it: "Importa da Apple Health",
    en: "Import from Apple Health",
    de: "Von Apple Health importieren"
  },
  "setup.health.body": {
    it: "Non posso collegarmi in diretta ad Apple Health (nessuna API web esiste per HealthKit). Puoi però esportare i tuoi dati dall'app Salute (foto profilo → Esporta tutti i dati sanitari) e caricare qui il file <strong>export.xml</strong>: viene letto ed elaborato interamente su questo dispositivo, non lascia mai il telefono. Importo allenamenti di forza/core/HIIT e l'ultimo peso registrato.",
    en: "I can't connect directly to Apple Health (no web API exists for HealthKit). But you can export your data from the Health app (profile photo → Export All Health Data) and upload the export.xml file here: it's read and processed entirely on this device and never leaves your phone. I import strength/core/HIIT workouts and your latest recorded weight.",
    de: "Eine direkte Verbindung zu Apple Health ist nicht möglich (für HealthKit gibt es keine Web-API). Du kannst deine Daten aber in der Health-App exportieren (Profilbild → Alle Gesundheitsdaten exportieren) und hier die Datei export.xml hochladen: Sie wird vollständig auf diesem Gerät gelesen und verarbeitet und verlässt nie dein Handy. Ich importiere Kraft-/Core-/HIIT-Workouts und das zuletzt erfasste Gewicht."
  },
  "setup.health.processing": { it: "ELABORAZIONE…", en: "PROCESSING…", de: "VERARBEITE…" },
  "setup.health.upload": {
    it: "CARICA export.xml",
    en: "UPLOAD export.xml",
    de: "export.xml HOCHLADEN"
  },
  "setup.health.error": {
    it: "File non riconosciuto: assicurati di caricare export.xml (non lo zip).",
    en: "Unrecognized file: make sure you upload export.xml (not the zip).",
    de: "Datei nicht erkannt: lade export.xml hoch (nicht die ZIP-Datei)."
  },
  "setup.health.weight": {
    it: "Peso più recente in Apple Health:",
    en: "Most recent weight in Apple Health:",
    de: "Neuestes Gewicht in Apple Health:"
  },
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
  "home.waist.last": {
    it: "Ultima misura: {v} cm",
    en: "Last measurement: {v} cm",
    de: "Letzte Messung: {v} cm"
  },
  "home.waist.delta": {
    it: "{v} cm dalla prima",
    en: "{v} cm from the first",
    de: "{v} cm seit der ersten"
  },
  "home.waist.empty": {
    it: "Misuralo nel riepilogo: è l'indicatore più affidabile del dimagrimento",
    en: "Measure it in the summary: it's the most reliable fat-loss indicator",
    de: "Miss ihn in der Zusammenfassung: Der zuverlässigste Abnehm-Indikator"
  },
  "home.weight.title": { it: "PESO", en: "WEIGHT", de: "GEWICHT" },
  "home.weight.sub": {
    it: "(media settimanale)",
    en: "(weekly average)",
    de: "(Wochendurchschnitt)"
  },
  "home.weight.last": {
    it: "Ultima rilevazione: {v} kg",
    en: "Last reading: {v} kg",
    de: "Letzte Messung: {v} kg"
  },
  "home.weight.delta": {
    it: "{v} kg dalla prima",
    en: "{v} kg from the first",
    de: "{v} kg seit der ersten"
  },
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
  "home.next.title": {
    it: "Prossimo traguardo: ancora {n} {unit}",
    en: "Next milestone: {n} {unit} to go",
    de: "Nächstes Ziel: noch {n} {unit}"
  },
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
  "home.repeat": {
    it: "RIPETI L'ULTIMA: {name}",
    en: "REPEAT LAST: {name}",
    de: "LETZTE WIEDERHOLEN: {name}"
  },
  "home.quick.min": { it: "~5 min", en: "~5 min", de: "~5 min" },
  "home.other": { it: "Altre missioni", en: "Other missions", de: "Andere Missionen" },
  "home.yours": { it: "Le tue missioni", en: "Your missions", de: "Deine Missionen" },
  "home.custom.ex": { it: "{n} esercizi", en: "{n} exercises", de: "{n} Übungen" },
  "home.custom.create": {
    it: "CREA MISSIONE PERSONALIZZATA",
    en: "CREATE CUSTOM MISSION",
    de: "EIGENE MISSION ERSTELLEN"
  },
  "home.custom.delete": { it: "Elimina missione", en: "Delete mission", de: "Mission löschen" },
  "home.section.today": { it: "OGGI", en: "TODAY", de: "HEUTE" },
  "home.section.progress": { it: "PROGRESSI", en: "PROGRESS", de: "FORTSCHRITT" },
  "home.section.missions": {
    it: "MISSIONI & OBIETTIVI",
    en: "MISSIONS & GOALS",
    de: "MISSIONEN & ZIELE"
  },
  "home.section.achievements": { it: "ACHIEVEMENTS", en: "ACHIEVEMENTS", de: "ACHIEVEMENTS" },
  "home.section.measurements": { it: "MISURAZIONI", en: "MEASUREMENTS", de: "MESSUNGEN" },
  "home.streak.break": {
    it: "Streak interrotta — riparti oggi",
    en: "Streak broken — start again today",
    de: "Serie unterbrochen — heute neu starten"
  },
  "home.streak.risk": {
    it: "Rischio streak — allenati oggi!",
    en: "Streak at risk — train today!",
    de: "Serie gefährdet — heute trainieren!"
  },
  "home.week.label": { it: "SETTIMANA", en: "WEEK", de: "WOCHE" },
  "home.consistency": { it: "CONSISTENZA 8 SETT.", en: "CONSISTENCY 8 WKS", de: "KONSTANZ 8 WO." },
  "home.average": { it: "MEDIA", en: "AVG", de: "Ø" },
  "home.belly.title": {
    it: "PANCIA • 3 MISSIONI DEDICATE",
    en: "BELLY • 3 DEDICATED MISSIONS",
    de: "BAUCH • 3 MISSIONEN"
  },
  "home.belly.week": { it: "SETTIMANA", en: "WEEK", de: "WOCHE" },
  "home.daily.go": { it: "Vai", en: "Go", de: "Los" },
  "home.dailyChallenge": {
    it: "SFIDA DEL GIORNO • {bonus}",
    en: "DAILY CHALLENGE • {bonus}",
    de: "TÄGLICHE HERAUSFORDERUNG • {bonus}"
  },
  "home.other.open": { it: "Tocca per chiudere", en: "Tap to close", de: "Tippen zum Schließen" },
  "home.other.closed": {
    it: "Esplora tutte le missioni disponibili",
    en: "Explore all available missions",
    de: "Alle verfügbaren Missionen entdecken"
  },
  "setup.backup.title": {
    it: "Backup & Ripristino",
    en: "Backup & Restore",
    de: "Backup & Wiederherstellung"
  },
  "setup.backup.body": {
    it: "Esporta tutti i dati (profilo, sessioni, misure, foto) in un file JSON. Ripristina su altro device o dopo reset.",
    en: "Export all data (profile, sessions, measures, photos) to a JSON file. Restore on another device or after reset.",
    de: "Exportiere alle Daten (Profil, Sessions, Maße, Fotos) in eine JSON-Datei. Auf anderem Gerät wiederherstellen."
  },
  "setup.backup.export": { it: "Esporta backup", en: "Export backup", de: "Backup exportieren" },
  "setup.backup.restore": { it: "Ripristina", en: "Restore", de: "Wiederherstellen" },
  "setup.backup.hint": {
    it: "Sovrascrive i dati locali — esporta prima se non sei sicuro.",
    en: "Overwrites local data — export first if unsure.",
    de: "Überschreibt lokale Daten — vorher exportieren."
  },
  "setup.backup.version": { it: "v{version}", en: "v{version}", de: "v{version}" },
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
  "bld.name": {
    it: "Nome missione (opzionale)",
    en: "Mission name (optional)",
    de: "Missionsname (optional)"
  },
  "bld.name.ph": { it: "es. Gambe e cuore", en: "e.g. Legs & cardio", de: "z. B. Beine & Herz" },
  "bld.rounds": { it: "Round", en: "Rounds", de: "Runden" },
  "bld.exercises": {
    it: "Esercizi ({sel}/10, minimo 3)",
    en: "Exercises ({sel}/10, min 3)",
    de: "Übungen ({sel}/10, mind. 3)"
  },
  "bld.min": { it: "~{m} min", en: "~{m} min", de: "~{m} min" },
  "bld.kcal": { it: "~{k} kcal", en: "~{k} kcal", de: "~{k} kcal" },
  "bld.create.go": { it: "CREA E VAI", en: "CREATE & GO", de: "ERSTELLEN & LOS" },
  "bld.hint": {
    it: "Seleziona almeno 3 esercizi per continuare",
    en: "Select at least 3 exercises to continue",
    de: "Wähle mindestens 3 Übungen zum Fortfahren"
  },
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
  "ses.quit.title": {
    it: "ABBANDONARE LA MISSIONE?",
    en: "ABANDON THE MISSION?",
    de: "MISSION ABBRECHEN?"
  },
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
  "sum.notes.ph": {
    it: "es. ginocchio destro un po' rigido oggi",
    en: "e.g. right knee a bit stiff today",
    de: "z. B. rechtes Knie heute etwas steif"
  },
  "sum.waist.title": {
    it: "Girovita oggi (cm)",
    en: "Waist today (cm)",
    de: "Bauchumfang heute (cm)"
  },
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
  "sum.hr.title": {
    it: "Battito di picco (Huawei Watch)",
    en: "Peak heart rate (Huawei Watch)",
    de: "Spitzen-Herzfrequenz (Huawei Watch)"
  },
  "sum.hr.remind": { it: "RICORDA", en: "REMEMBER", de: "ERINNERN" },
  "sum.hr.body": {
    it: "Apri l'app Huawei Health e leggi il valore massimo registrato durante l'allenamento, poi inseriscilo qui.",
    en: "Open the Huawei Health app, read the maximum value recorded during your workout, then enter it here.",
    de: "Öffne die Huawei-Health-App, lies den während des Trainings erfassten Maximalwert und trage ihn hier ein."
  },
  "sum.hr.ph": { it: "es. 142", en: "e.g. 142", de: "z. B. 142" },
  "sum.zone": { it: "Zona: {label}", en: "Zone: {label}", de: "Zone: {label}" },
  "sum.quality.title": { it: "Qualità esecuzione (AI)", en: "Form quality (AI)", de: "Ausführungsqualität (KI)" },
  "sum.quality.body": {
    it: "Media della qualità del movimento rilevata dall’AI Coach durante le fasi lavoro.",
    en: "Average movement quality tracked by the AI Coach during work phases.",
    de: "Durchschnittliche Bewegungsqualität, die der AI Coach während der Arbeitsphasen erfasst hat."
  },
  "sum.quality.none": {
    it: "AI Coach non attivo durante la sessione.",
    en: "AI Coach was not active during this session.",
    de: "AI Coach war während dieser Sitzung nicht aktiv."
  },
  "sum.quality.per": { it: "{name} · Q {q}", en: "{name} · Q {q}", de: "{name} · Q {q}" },
  "sum.save": {
    it: "SALVA E TORNA ALLA BASE",
    en: "SAVE & RETURN TO BASE",
    de: "SPEICHERN & ZURÜCK ZUR BASIS"
  },
  /* ---- history ---- */
  "hist.title": { it: "STATISTICHE", en: "STATISTICS", de: "STATISTIK" },
  "hist.quality": { it: "Qualità AI", en: "AI quality", de: "KI-Qualität" },
  "hist.avgint": {
    it: "Intensità media (RPE)",
    en: "Average intensity (RPE)",
    de: "Durchschnittliche Intensität (RPE)"
  },
  "hist.bestweek.title": { it: "MIGLIORE SETTIMANA", en: "BEST WEEK", de: "BESTE WOCHE" },
  "hist.bestweek.sub": {
    it: "Il picco più alto di kcal in 7 giorni",
    en: "Highest kcal peak over 7 days",
    de: "Höchster kcal-Wert in 7 Tagen"
  },
  "hist.kcal.unit": { it: "kcal", en: "kcal", de: "kcal" },
  "hist.goal.title": { it: "Obiettivo settimanale", en: "Weekly goal", de: "Wochenziel" },
  "hist.goal.label": {
    it: "Missioni a settimana",
    en: "Missions per week",
    de: "Missionen pro Woche"
  },
  "hist.35d": { it: "Ultimi 35 giorni", en: "Last 35 days", de: "Letzte 35 Tage" },
  "hist.milestones": { it: "Traguardi", en: "Milestones", de: "Meilensteine" },
  "hist.miles.streak": { it: "{n}gg serie", en: "{n}d streak", de: "{n} Tage Serie" },
  "hist.miles.sessions": { it: "{n} sessioni", en: "{n} sessions", de: "{n} Sessions" },
  "hist.kcal7": { it: "Kcal, ultimi 7 giorni", en: "kcal, last 7 days", de: "kcal, letzte 7 Tage" },
  "hist.vsweek": {
    it: "{p}% vs sett. scorsa",
    en: "{p}% vs last week",
    de: "{p}% ggü. letzter Woche"
  },
  "hist.fav": { it: "Missioni preferite", en: "Favorite missions", de: "Beliebteste Missionen" },
  "hist.hr": {
    it: "Battito di picco nel tempo",
    en: "Peak heart rate over time",
    de: "Spitzen-Herzfrequenz im Verlauf"
  },
  "hist.waist": {
    it: "Girovita nel tempo (cm)",
    en: "Waist over time (cm)",
    de: "Bauchumfang im Verlauf (cm)"
  },
  "hist.waist.total": { it: "{v} cm totali", en: "{v} cm total", de: "{v} cm gesamt" },
  "hist.weight": {
    it: "Peso nel tempo (kg)",
    en: "Weight over time (kg)",
    de: "Gewicht im Verlauf (kg)"
  },
  "hist.weight.total": { it: "{v} kg totali", en: "{v} kg total", de: "{v} kg gesamt" },
  "hist.rpe": {
    it: "Intensità percepita nel tempo (RPE)",
    en: "Perceived intensity over time (RPE)",
    de: "Gefühlte Intensität im Verlauf (RPE)"
  },
  "hist.sessions.title": { it: "Sessioni", en: "Sessions", de: "Sessions" },
  "hist.empty": {
    it: "Nessuna missione ancora completata. Si parte quando vuoi.",
    en: "No mission completed yet. Start whenever you like.",
    de: "Noch keine Mission abgeschlossen. Starte, wann du willst."
  },
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
  "toast.level.up": {
    it: "Livello promosso: {label}",
    en: "Level promoted: {label}",
    de: "Level befördert: {label}"
  },
  "toast.promoted": {
    it: "Promosso a {rank}",
    en: "Promoted to {rank}",
    de: "Befördert zu {rank}"
  },
  "toast.milestone.streak": {
    it: "Traguardo sbloccato: {n} giorni di serie",
    en: "Milestone unlocked: {n}-day streak",
    de: "Meilenstein freigeschaltet: {n} Tage in Serie"
  },
  "toast.milestone.sessions": {
    it: "Traguardo sbloccato: {n} sessioni",
    en: "Milestone unlocked: {n} sessions",
    de: "Meilenstein freigeschaltet: {n} Sessions"
  },
  "toast.goal": {
    it: "Obiettivo settimanale raggiunto",
    en: "Weekly goal reached",
    de: "Wochenziel erreicht"
  },
  "toast.saved": { it: "Missione salvata", en: "Mission saved", de: "Mission gespeichert" },
  "toast.history": { it: "Cronologia cancellata", en: "History cleared", de: "Verlauf gelöscht" },
  "toast.removed": { it: "Sessione rimossa", en: "Session removed", de: "Session entfernt" },
  "toast.created": { it: "Missione creata", en: "Mission created", de: "Mission erstellt" },
  "toast.imported": {
    it: "Importati {n} allenamenti da Apple Health",
    en: "Imported {n} workouts from Apple Health",
    de: "{n} Workouts von Apple Health importiert"
  },
  "toast.imported.none": {
    it: "Nessun nuovo allenamento trovato",
    en: "No new workouts found",
    de: "Keine neuen Workouts gefunden"
  },
  "toast.import.fail": {
    it: "Import non riuscito: file non valido",
    en: "Import failed: invalid file",
    de: "Import fehlgeschlagen: ungültige Datei"
  },
  "toast.weight": { it: "Peso aggiornato", en: "Weight updated", de: "Gewicht aktualisiert" },
  /* ---- new features ---- */
  "notif.body": {
    it: "La tua missione di 15 min ti aspetta. Andiamo!",
    en: "Your 15-min mission is ready. Let’s go!",
    de: "Deine 15-Min-Mission wartet. Los geht’s!"
  },
  "notif.test.body": {
    it: "Le notifiche funzionano. A domani per la missione!",
    en: "Notifications work. See you tomorrow!",
    de: "Benachrichtigungen funktionieren. Bis morgen!"
  },
  "notif.setup.title": {
    it: "Promemoria giornaliero",
    en: "Daily reminder",
    de: "Tägliche Erinnerung"
  },
  "notif.setup.body": {
    it: "Ti avviso ogni giorno all’ora scelta (serve il permesso).",
    en: "I’ll remind you daily at the chosen time (permission required).",
    de: "Ich erinnere dich täglich zur gewählten Zeit (Erlaubnis erforderlich)."
  },
  "notif.enable": {
    it: "ATTIVA NOTIFICHE",
    en: "ENABLE NOTIFICATIONS",
    de: "BENACHRICHTIGUNGEN AKTIVIEREN"
  },
  "notif.disable": { it: "DISATTIVA", en: "DISABLE", de: "DEAKTIVIEREN" },
  "notif.test": { it: "TEST", en: "TEST", de: "TEST" },
  "share.session.title": {
    it: "Missione compiuta — Operator 40",
    en: "Mission complete — Operator 40",
    de: "Mission abgeschlossen — Operator 40"
  },
  "share.session.text": {
    it: "{name} — {min} min, {kcal} kcal 💪",
    en: "{name} — {min} min, {kcal} kcal 💪",
    de: "{name} — {min} min, {kcal} kcal 💪"
  },
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
  "bmi.tdee": {
    it: "TDEE stimato: {v} kcal/giorno",
    en: "Est. TDEE: {v} kcal/day",
    de: "Gesch. TDEE: {v} kcal/Tag"
  },
  "setup.custom": { it: "Timer custom (sec)", en: "Custom timer (sec)", de: "Custom Timer (Sek)" },
  "setup.executionMode": {
    it: "Modalità esecuzione",
    en: "Execution mode",
    de: "Ausführungsmodus"
  },
  "setup.mode.time": { it: "Tempo (standard)", en: "Time (standard)", de: "Zeit (Standard)" },
  "setup.mode.reps": { it: "Ripetizioni", en: "Reps", de: "Wiederholungen" },
  "setup.mode.time.hint": {
    it: "40″ lavoro / 20″ recupero — 15′ fissi, avanzamento automatico. Perfetto per dimagrimento.",
    en: "40″ work / 20″ rest — fixed 15′, auto-advance. Best for fat loss.",
    de: "40″ Arbeit / 20″ Pause — feste 15 Min."
  },
  "setup.mode.reps.hint": {
    it: "Es. 12× squat, 10× affondo — tocchi FATTO quando hai finito. Hold (plank…) resta a tempo. Più controllo per articolazioni.",
    en: "E.g. 12× squat — tap DONE when finished. Holds stay timed. More joint control.",
    de: "z. B. 12× Kniebeuge — tippe FERTIG. Halten bleibt Zeit."
  },
  "setup.custom.work": { it: "Lavoro", en: "Work", de: "Arbeit" },
  "setup.custom.rest": { it: "Recupero", en: "Rest", de: "Pause" }
};
const LangContext = reactExports.createContext({
  lang: "it",
  t: (k2, v) => translate(k2, "it", v),
  setLang: () => {
  }
});
function useT() {
  return reactExports.useContext(LangContext);
}
const TRACKS = [
  {
    id: "hustlin",
    name: "Hustlin'",
    artist: "NEFFEX",
    src: "tracks/hustlin.mp3",
    tag: "Energetica",
    lang: "EN"
  },
  {
    id: "manifest",
    name: "Manifest It",
    artist: "NEFFEX",
    src: "tracks/manifest.mp3",
    tag: "Battuta",
    lang: "EN"
  },
  {
    id: "born",
    name: "Born A Rockstar",
    artist: "NEFFEX",
    src: "tracks/born.mp3",
    tag: "Sprint",
    lang: "EN"
  },
  {
    id: "fightback",
    name: "Fight Back",
    artist: "NEFFEX",
    src: "tracks/fightback.mp3",
    tag: "Pesante",
    lang: "EN"
  },
  {
    id: "theitch",
    name: "The Itch",
    artist: "NEFFEX ft. Josh A",
    src: "tracks/theitch.mp3",
    tag: "Battuta",
    lang: "EN"
  },
  {
    id: "godown",
    name: "Go Down Swinging",
    artist: "NEFFEX",
    src: "tracks/godown.mp3",
    tag: "Energetica",
    lang: "EN"
  },
  {
    id: "addict",
    name: "Addict",
    artist: "NEFFEX",
    src: "tracks/addict.mp3",
    tag: "Sprint",
    lang: "EN"
  },
  {
    id: "tellme",
    name: "Tell Me That I Can't",
    artist: "NEFFEX",
    src: "tracks/tellme.mp3",
    tag: "Pesante",
    lang: "EN"
  },
  {
    id: "grateful",
    name: "Grateful",
    artist: "NEFFEX",
    src: "tracks/grateful.mp3",
    tag: "Energetica",
    lang: "EN"
  },
  {
    id: "unstoppable",
    name: "Unstoppable",
    artist: "NEFFEX",
    src: "tracks/unstoppable.mp3",
    tag: "Sprint",
    lang: "EN"
  },
  {
    id: "comeback",
    name: "Comeback",
    artist: "NEFFEX",
    src: "tracks/comeback.mp3",
    tag: "Pesante",
    lang: "EN"
  },
  {
    id: "destiny",
    name: "Destiny",
    artist: "NEFFEX",
    src: "tracks/destiny.mp3",
    tag: "Battuta",
    lang: "EN"
  }
];
const DEFAULT_TRACK = TRACKS[0].id;
let audio = null;
let audio2 = null;
let shouldPlay = false;
let currentTrackId = DEFAULT_TRACK;
let autoPlayNext = true;
let shuffleMode = false;
let onTrackChange = null;
let shuffleOrder = null;
let shuffleSeedDay = null;
let shuffleIdx = 0;
const CROSSFADE_MS = 1200;
function ensureAudio() {
  if (!audio) {
    audio = new Audio();
    audio.loop = false;
    audio.preload = "auto";
    audio.addEventListener("ended", () => {
      if (!shouldPlay || !autoPlayNext) return;
      const nextId = shuffleMode ? getRandomTrackId() : getNextTrackId(currentTrackId);
      if (nextId) {
        const nxt = TRACKS.find((t) => t.id === nextId);
        if (nxt) {
          if (shouldPlay) crossfadeTo(nxt.src);
          else musicLoad(nxt.src);
          currentTrackId = nextId;
          if (onTrackChange) try {
            onTrackChange(nextId);
          } catch {
          }
          if (!shouldPlay) ;
          else if (!audio2) musicPlay();
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
function hashDay(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  return h >>> 0;
}
function mulberry32(a) {
  return function() {
    let t = a += 1831565813;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function ensureShuffledOrder() {
  const day = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  if (shuffleOrder && shuffleSeedDay === day) return shuffleOrder;
  const seed = hashDay(day);
  const rand = mulberry32(seed);
  const arr = [...TRACKS].map((t) => t.id);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  shuffleOrder = arr;
  shuffleSeedDay = day;
  shuffleIdx = arr.indexOf(currentTrackId);
  if (shuffleIdx === -1) shuffleIdx = 0;
  return shuffleOrder;
}
function getRandomTrackId() {
  const order = ensureShuffledOrder();
  if (order.length <= 1) return order[0] || null;
  shuffleIdx = (shuffleIdx + 1) % order.length;
  let pick = order[shuffleIdx];
  if (pick === currentTrackId) {
    shuffleIdx = (shuffleIdx + 1) % order.length;
    pick = order[shuffleIdx];
  }
  return pick;
}
function crossfadeTo(src) {
  const a = ensureAudio();
  if (!audio2) {
    audio2 = new Audio();
    audio2.preload = "auto";
  }
  const next = audio2;
  const prev = a;
  next.src = src;
  next.volume = 0;
  next.play().catch(() => {
  });
  const steps = 24;
  let s = 0;
  const iv = setInterval(() => {
    s++;
    const t = s / steps;
    try {
      prev.volume = Math.max(0, 1 - t);
      next.volume = Math.min(1, t);
    } catch {
    }
    if (s >= steps) {
      clearInterval(iv);
      try {
        prev.pause();
        prev.volume = 1;
      } catch {
      }
      const tmp = audio;
      audio = audio2;
      audio2 = tmp;
      audio2.pause();
      audio2.currentTime = 0;
      const bySrc = TRACKS.find((tt) => new URL(tt.src, location.href).href === new URL(src, location.href).href);
      if (bySrc) currentTrackId = bySrc.id;
    }
  }, CROSSFADE_MS / steps);
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
  const nxt = TRACKS.find((t) => t.id === nextId);
  if (nxt) {
    if (shouldPlay) crossfadeTo(nxt.src);
    else musicLoad(nxt.src);
    currentTrackId = nextId;
    if (shouldPlay && !audio2) musicPlay();
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
  const prv = TRACKS.find((t) => t.id === prevId);
  if (prv) {
    if (shouldPlay) crossfadeTo(prv.src);
    else musicLoad(prv.src);
    currentTrackId = prevId;
    if (shouldPlay && !audio2) musicPlay();
    if (onTrackChange) try {
      onTrackChange(prevId);
    } catch {
    }
  }
  return prevId;
}
if (typeof window !== "undefined") {
  ["pointerdown", "touchend", "keydown"].forEach(
    (evt) => window.addEventListener(
      evt,
      () => {
        if (shouldPlay) musicPlay();
      },
      { passive: true }
    )
  );
}
const INK = "#1B1D16";
const INK_2 = "#242820";
const PAPER = "#EDE8D8";
const OLIVE = "#4A5233";
const OLIVE_LIGHT = "#5A6340";
const OLIVE_DARK = "#333823";
const KHAKI = "#B8AE8C";
const BLAZE = "#C1440E";
const BLAZE_LIGHT = "#D95A1F";
const BLAZE_DEEP = "#8F2A0A";
const STEEL = "#8A9078";
const EXERCISES = {
  squat: {
    name: { it: "Squat", en: "Squat", de: "Kniebeuge" },
    pose: "squat",
    met: 5.5,
    repGuide: { it: "12–15 ripetizioni", en: "12–15 reps", de: "12–15 Wiederholungen" },
    cue: {
      it: "Schiena dritta, ginocchia in linea con le punte dei piedi.",
      en: "Straight back, knees in line with your toes.",
      de: "Gerader Rücken, Knie über den Fußspitzen."
    },
    tip40: {
      it: "Scendi solo fin dove senti il controllo: meglio un range parziale pulito che uno ampio scomposto.",
      en: "Lower only as far as you feel in control: a clean partial range beats a sloppy deep one.",
      de: "Geh nur so tief, wie du die Kontrolle behältst: Eine saubere Teilbewegung ist besser als eine wacklige tiefe."
    },
    steps: [
      {
        it: "Piedi larghi quanto le spalle, punte leggermente fuori",
        en: "Feet shoulder-width, toes slightly turned out",
        de: "Füße schulterbreit, Zehen leicht nach außen"
      },
      {
        it: "Scendi come per sederti, peso sui talloni",
        en: "Sit back as if into a chair, weight on your heels",
        de: "Setz dich ab, Gewicht auf den Fersen"
      },
      {
        it: "Sali spingendo sui talloni, bacino in avanti",
        en: "Drive up through your heels, hips forward",
        de: "Drück dich über die Fersen hoch, Becken nach vorn"
      }
    ],
    breath: {
      it: "Inspira scendendo, espira risalendo.",
      en: "Breathe in lowering, out rising.",
      de: "Einatmen beim Runtergehen, ausatmen beim Hochkommen."
    }
  },
  affondo: {
    name: { it: "Affondo alternato", en: "Alternating lunge", de: "Ausfallschritt (abwechselnd)" },
    pose: "lunge",
    met: 5.5,
    repGuide: { it: "10–12 per gamba", en: "10–12 per leg", de: "10–12 pro Bein" },
    cue: {
      it: "Passo lungo, busto verticale, il ginocchio dietro sfiora il pavimento.",
      en: "Long step, upright torso, rear knee grazes the floor.",
      de: "Langer Schritt, aufrechter Oberkörper, hinteres Knie berührt fast den Boden."
    },
    tip40: {
      it: "Evita il rimbalzo sul ginocchio a terra: controlla la discesa, niente scatti.",
      en: "No bouncing on the grounded knee: control the descent, no jerking.",
      de: "Nicht auf dem Knie abfedern: Die Abwärtsbewegung kontrollieren, keine ruckartigen Bewegungen."
    },
    steps: [
      {
        it: "Passo lungo in avanti, busto verticale",
        en: "Step far forward, torso upright",
        de: "Großer Schritt nach vorn, Oberkörper aufrecht"
      },
      {
        it: "Scendi finché il ginocchio dietro sfiora il suolo",
        en: "Lower until the rear knee grazes the floor",
        de: "Absenken, bis das hintere Knie den Boden fast berührt"
      },
      {
        it: "Spingi col piede davanti per risalire",
        en: "Push off with the front foot to stand back up",
        de: "Mit dem vorderen Fuß abdrücken und hochkommen"
      }
    ],
    breath: {
      it: "Inspira scendendo, espira spingendo su.",
      en: "Inhale lowering, exhale pushing up.",
      de: "Einatmen beim Absenken, ausatmen beim Hochdrücken."
    }
  },
  flessioni: {
    name: { it: "Piegamenti (push-up)", en: "Push-ups", de: "Liegestütze" },
    pose: "pushup",
    met: 8,
    repGuide: { it: "8–12 ripetizioni", en: "8–12 reps", de: "8–12 Wiederholungen" },
    cue: {
      it: "Corpo in linea retta, gomiti a circa 45° dal busto.",
      en: "Body in a straight line, elbows at about 45° from your torso.",
      de: "Körper in einer Linie, Ellbogen etwa 45° vom Oberkörper."
    },
    tip40: {
      it: 'Spalle che protestano? Ginocchia a terra: la tecnica conta più della versione "hardcore".',
      en: 'Shoulders complaining? Drop to your knees: technique beats the "hardcore" version.',
      de: "Protestieren die Schultern? Auf die Knie gehen: Technik ist wichtiger als die „hardcore“-Variante."
    },
    steps: [
      {
        it: "Mani sotto le spalle, corpo in linea retta",
        en: "Hands under shoulders, body in a straight line",
        de: "Hände unter den Schultern, Körper in einer Linie"
      },
      {
        it: "Piega i gomiti a 45° finché il petto sfiora terra",
        en: "Bend elbows to 45° until your chest grazes the floor",
        de: "Ellbogen auf 45° beugen, bis die Brust fast den Boden berührt"
      },
      {
        it: "Spingi via il pavimento, testa neutra",
        en: "Push the floor away, neutral head",
        de: "Drück den Boden weg, Kopf neutral"
      }
    ],
    breath: {
      it: "Inspira scendendo, espira spingendo su.",
      en: "Inhale lowering, exhale pushing up.",
      de: "Einatmen beim Absenken, ausatmen beim Hochdrücken."
    }
  },
  plank: {
    name: { it: "Plank", en: "Plank", de: "Unterarmstütz" },
    pose: "plank",
    met: 3.5,
    repGuide: { it: "Tieni la posizione", en: "Hold the position", de: "Position halten" },
    cue: {
      it: "Addome contratto, bacino né troppo alto né troppo basso, respira.",
      en: "Core engaged, hips neither too high nor too low, breathe.",
      de: "Bauch anspannen, Becken weder zu hoch noch zu tief, atmen."
    },
    tip40: {
      it: "Se senti la zona lombare, alza leggermente il bacino: meno estetico, molto più sicuro.",
      en: "If you feel it in your lower back, lift your hips slightly: less pretty, much safer.",
      de: "Wenn der untere Rücken zieht, Becken leicht anheben: weniger hübsch, dafür sicherer."
    },
    steps: [
      {
        it: "Avambracci a terra, gomiti sotto le spalle",
        en: "Forearms on the floor, elbows under shoulders",
        de: "Unterarme auf dem Boden, Ellbogen unter den Schultern"
      },
      {
        it: "Piedi aperti, corpo in linea retta",
        en: "Feet apart, body in a straight line",
        de: "Füße geöffnet, Körper in einer Linie"
      },
      {
        it: "Contrai glutei e addome, bacino fermo",
        en: "Squeeze glutes and abs, keep hips still",
        de: "Gesäß und Bauch anspannen, Becken still"
      }
    ],
    breath: {
      it: "Respiro lento e costante, mai trattenuto.",
      en: "Slow, steady breathing, never held.",
      de: "Langsam und gleichmäßig atmen, nie anhalten."
    }
  },
  jumpingjack: {
    name: { it: "Jumping jack", en: "Jumping jack", de: "Jumping Jack" },
    pose: "jack",
    met: 8,
    repGuide: { it: "Ritmo costante", en: "Steady rhythm", de: "Gleichmäßiger Rhythmus" },
    cue: {
      it: "Atterra morbido sulle punte, braccia sopra la testa.",
      en: "Land softly on the balls of your feet, arms overhead.",
      de: "Weich auf den Fußballen landen, Arme über den Kopf."
    },
    tip40: {
      it: "Ginocchia sensibili? Passa allo step jack laterale: stesso battito, meno impatto.",
      en: "Sensitive knees? Switch to a lateral step jack: same rhythm, less impact.",
      de: "Empfindliche Knie? Wechsle zum seitlichen Step Jack: gleicher Takt, weniger Belastung."
    },
    steps: [
      {
        it: "Piedi uniti, braccia lungo i fianchi",
        en: "Feet together, arms at your sides",
        de: "Füße zusammen, Arme seitlich"
      },
      {
        it: "Salta aprendo gambe e braccia sopra la testa",
        en: "Jump, opening legs and arms overhead",
        de: "Springen, Beine öffnen und Arme über den Kopf"
      },
      {
        it: "Atterra morbido sulle punte e ripeti",
        en: "Land softly on the balls of your feet and repeat",
        de: "Weich auf den Fußballen landen und wiederholen"
      }
    ],
    breath: {
      it: "Un ciclo di respiro ogni 2 salti.",
      en: "One breath cycle every 2 jumps.",
      de: "Ein Atemzyklus alle 2 Sprünge."
    }
  },
  mountainclimber: {
    name: { it: "Mountain climber", en: "Mountain climber", de: "Mountain Climber" },
    pose: "mountainclimber",
    met: 8,
    repGuide: { it: "Ritmo sostenuto", en: "Brisk pace", de: "Zügiges Tempo" },
    cue: {
      it: "Bacino basso e stabile, ginocchia verso il petto.",
      en: "Hips low and stable, knees driving toward your chest.",
      de: "Becken tief und stabil, Knie zur Brust."
    },
    tip40: {
      it: "Se il polso protesta, rallenta il ritmo: la qualità del gesto viene prima della velocità.",
      en: "If your wrists complain, slow the pace: quality of movement comes before speed.",
      de: "Wenn die Handgelenke protestieren, Tempo drosseln: Die Qualität der Bewegung zählt mehr als Tempo."
    },
    steps: [
      {
        it: "Plank alto, mani sotto le spalle",
        en: "High plank, hands under shoulders",
        de: "Hoher Stütz, Hände unter den Schultern"
      },
      {
        it: "Porta un ginocchio al petto, poi l’altro in corsa",
        en: "Drive one knee to your chest, then the other in a running motion",
        de: "Ein Knie zur Brust, dann das andere im Lauftakt"
      },
      {
        it: "Bacino basso, core contratto",
        en: "Hips low, core engaged",
        de: "Becken tief, Bauch angespannt"
      }
    ],
    breath: {
      it: "Espirazioni brevi e ritmiche, non trattenere.",
      en: "Short, rhythmic exhales, don’t hold your breath.",
      de: "Kurze, rhythmische Ausatmungen, nicht anhalten."
    }
  },
  wallsit: {
    name: { it: "Wall sit", en: "Wall sit", de: "Wandsitz" },
    pose: "wallsit",
    met: 3.5,
    repGuide: { it: "Tieni la posizione", en: "Hold the position", de: "Position halten" },
    cue: {
      it: "Ginocchia a 90°, schiena piatta contro il muro.",
      en: "Knees at 90°, back flat against the wall.",
      de: "Knie 90°, Rücken flach an der Wand."
    },
    tip40: {
      it: "Ottimo per il ginocchio: carico isometrico, zero impatto.",
      en: "Great for the knees: isometric load, zero impact.",
      de: "Schonend für die Knie: isometrische Belastung, null Impact."
    },
    steps: [
      {
        it: "Schiena appoggiata al muro, piedi un passo avanti",
        en: "Back against the wall, feet one step forward",
        de: "Rücken an der Wand, Füße einen Schritt davor"
      },
      {
        it: "Scendi fino a ginocchia a 90°",
        en: "Slide down until knees are at 90°",
        de: "Absenken bis die Knie 90° ergeben"
      },
      {
        it: "Resta fermo, cosce parallele al suolo",
        en: "Hold still, thighs parallel to the floor",
        de: "Still halten, Oberschenkel parallel zum Boden"
      }
    ],
    breath: {
      it: "Respiro calmo e continuo durante la tenuta.",
      en: "Calm, continuous breathing during the hold.",
      de: "Ruhig und durchgehend atmen während der Haltezeit."
    }
  },
  superman: {
    name: { it: "Superman", en: "Superman", de: "Superman" },
    pose: "superman",
    met: 3.5,
    repGuide: { it: "Contrazioni lente", en: "Slow contractions", de: "Langsame Kontraktionen" },
    cue: {
      it: "Solleva braccia e gambe insieme, sguardo verso il basso.",
      en: "Lift arms and legs together, gaze down.",
      de: "Arme und Beine gemeinsam anheben, Blick nach unten."
    },
    tip40: {
      it: "Rinforza la zona lombare: un investimento diretto contro il mal di schiena da scrivania.",
      en: "Strengthens the lower back: a direct investment against desk-back pain.",
      de: "Stärkt den unteren Rücken: eine direkte Investition gegen Büro-Rückenschmerzen."
    },
    steps: [
      {
        it: "A pancia in giù, braccia tese in avanti",
        en: "Lying face down, arms extended forward",
        de: "Auf dem Bauch, Arme nach vorn gestreckt"
      },
      {
        it: "Solleva braccia e gambe insieme",
        en: "Lift arms and legs together",
        de: "Arme und Beine gemeinsam anheben"
      },
      {
        it: "Stringi i glutei, sguardo a terra",
        en: "Squeeze glutes, eyes to the floor",
        de: "Gesäß anspannen, Blick zum Boden"
      }
    ],
    breath: {
      it: "Inspira per preparare, espira sollevando.",
      en: "Inhale to prepare, exhale as you lift.",
      de: "Einatmen zur Vorbereitung, ausatmen beim Anheben."
    }
  },
  ponte: {
    name: { it: "Ponte glutei", en: "Glute bridge", de: "Glute Bridge" },
    pose: "bridge",
    met: 3.5,
    repGuide: { it: "12–15 ripetizioni", en: "12–15 reps", de: "12–15 Wiederholungen" },
    cue: {
      it: "Spingi sui talloni, contrai i glutei in alto.",
      en: "Push through your heels, squeeze your glutes at the top.",
      de: "Durch die Fersen drücken, Gesäß oben anspannen."
    },
    tip40: {
      it: 'Contrasta le ore da seduto: riattiva glutei spesso "addormentati".',
      en: 'Counteracts hours of sitting: reawakens often "sleepy" glutes.',
      de: "Wirkt dem vielen Sitzen entgegen: aktiviert oft „eingeschlafene“ Gesäßmuskeln."
    },
    steps: [
      {
        it: "Sdraiato, ginocchia piegate, piedi vicini al bacino",
        en: "Lying down, knees bent, feet close to your hips",
        de: "Auf dem Rücken, Knie gebeugt, Füße nahe am Becken"
      },
      {
        it: "Spingi sui talloni e alza il bacino",
        en: "Push through your heels and lift your hips",
        de: "Durch die Fersen drücken und Becken anheben"
      },
      {
        it: "Contrai i glutei in alto, scendi lento",
        en: "Squeeze glutes at the top, lower slowly",
        de: "Gesäß oben anspannen, langsam absenken"
      }
    ],
    breath: {
      it: "Espira salendo, inspira scendendo.",
      en: "Exhale rising, inhale lowering.",
      de: "Ausatmen beim Hochgehen, einatmen beim Absenken."
    }
  },
  crunchbici: {
    name: { it: "Bicycle crunch", en: "Bicycle crunch", de: "Bicycle Crunch" },
    pose: "bicyclecrunch",
    met: 4.5,
    repGuide: { it: "10–12 per lato", en: "10–12 per side", de: "10–12 pro Seite" },
    cue: {
      it: "Gomito verso il ginocchio opposto, movimento lento e controllato.",
      en: "Elbow toward the opposite knee, slow and controlled movement.",
      de: "Ellbogen zum gegenüberliegenden Knie, langsam und kontrolliert."
    },
    tip40: {
      it: "Niente strappi sul collo: la mano è un appoggio leggero, non una leva.",
      en: "No yanking on your neck: the hand is a light support, not a lever.",
      de: "Nicht am Nacken ziehen: Die Hand ist eine leichte Stütze, kein Hebel."
    },
    steps: [
      {
        it: "Sdraiato, mani dietro la testa, gambe sollevate",
        en: "Lying down, hands behind your head, legs lifted",
        de: "Auf dem Rücken, Hände hinter dem Kopf, Beine angehoben"
      },
      {
        it: "Gomito destro verso ginocchio sinistro, gambe alternate",
        en: "Right elbow toward left knee, legs alternating",
        de: "Rechter Ellbogen zum linken Knie, Beine abwechselnd"
      },
      {
        it: "Movimento lento, scapole sollevate",
        en: "Slow movement, shoulder blades lifted",
        de: "Langsame Bewegung, Schulterblätter angehoben"
      }
    ],
    breath: {
      it: "Espira ruotando, inspira al centro.",
      en: "Exhale rotating, inhale in the middle.",
      de: "Ausatmen beim Drehen, einatmen in der Mitte."
    }
  },
  russiantwist: {
    name: { it: "Russian twist", en: "Russian twist", de: "Russian Twist" },
    pose: "russiantwist",
    met: 4.5,
    repGuide: { it: "10–12 per lato", en: "10–12 per side", de: "10–12 pro Seite" },
    cue: {
      it: "Busto inclinato, piedi a terra o sollevati, ruota dal core.",
      en: "Torso leaned back, feet on the floor or lifted, rotate from the core.",
      de: "Oberkörper nach hinten geneigt, Füße auf dem Boden oder angehoben, aus dem Core drehen."
    },
    tip40: {
      it: "Piedi a terra è già efficace: non serve la versione acrobatica per lavorare bene.",
      en: "Feet on the floor is already effective: no need for the acrobatic version to work well.",
      de: "Füße auf dem Boden sind bereits effektiv: Für gutes Training braucht es keine akrobatische Variante."
    },
    steps: [
      {
        it: "Seduto, busto inclinato all’indietro",
        en: "Seated, torso leaned back",
        de: "Sitzend, Oberkörper nach hinten geneigt"
      },
      {
        it: "Piedi a terra (o sollevati) e braccia davanti",
        en: "Feet on the floor (or lifted) and arms out front",
        de: "Füße auf dem Boden (oder angehoben), Arme nach vorn"
      },
      {
        it: "Ruota il busto a destra e sinistra dal core",
        en: "Rotate your torso right and left from the core",
        de: "Oberkörper aus dem Core nach rechts und links drehen"
      }
    ],
    breath: {
      it: "Espira a ogni rotazione.",
      en: "Exhale with each rotation.",
      de: "Bei jeder Drehung ausatmen."
    }
  },
  ginocchiaalte: {
    name: { it: "Ginocchia alte", en: "High knees", de: "Knie hoch" },
    pose: "highknees",
    met: 8,
    repGuide: { it: "Ritmo sostenuto", en: "Brisk pace", de: "Zügiges Tempo" },
    cue: {
      it: "Ginocchio a livello anca, braccia in coordinazione.",
      en: "Knee up to hip level, arms in coordination.",
      de: "Knie auf Hüfthöhe, Arme im Gleichklang."
    },
    tip40: {
      it: "Ottimo motore cardio a basso impatto se atterri sull’avampiede.",
      en: "Great low-impact cardio engine if you land on your forefoot.",
      de: "Ausgezeichnetes gelenkschonendes Cardio-Training, wenn du auf dem Vorfuß landest."
    },
    steps: [
      {
        it: "Busto dritto, braccia ai fianchi",
        en: "Torso upright, arms at your sides",
        de: "Oberkörper aufrecht, Arme seitlich"
      },
      {
        it: "Porta le ginocchia all’altezza dell’anca",
        en: "Drive knees up to hip height",
        de: "Knie auf Hüfthöhe bringen"
      },
      {
        it: "Atterra sull’avampiede, ritmo costante",
        en: "Land on your forefoot, steady rhythm",
        de: "Auf dem Vorfuß landen, gleichmäßiger Rhythmus"
      }
    ],
    breath: {
      it: "Respiro ritmico: 2 passi a ogni inspirazione.",
      en: "Rhythmic breathing: 2 steps per inhale.",
      de: "Rhythmisches Atmen: 2 Schritte pro Einatmung."
    }
  },
  burpeetattico: {
    name: { it: "Burpee tattico", en: "Tactical burpee", de: "Taktischer Burpee" },
    pose: "burpee",
    met: 8,
    repGuide: { it: "6–8 ripetizioni", en: "6–8 reps", de: "6–8 Wiederholungen" },
    cue: {
      it: "Passo indietro invece del salto, spinta a terra, risali controllato.",
      en: "Step back instead of jumping, push-up at the bottom, rise controlled.",
      de: "Schritt zurück statt Sprung, Liegestütz am Boden, kontrolliert aufstehen."
    },
    tip40: {
      it: 'La variante "senza salto" mantiene l’intensità cardio proteggendo ginocchia e lombari.',
      en: 'The "no-jump" version keeps cardio intensity while protecting knees and lower back.',
      de: "Die „ohne Sprung“-Variante hält die Cardio-Intensität und schont Knie und unteren Rücken."
    },
    steps: [
      {
        it: "Da in piedi scendi con le mani a terra",
        en: "From standing, place your hands on the floor",
        de: "Aus dem Stand die Hände auf den Boden setzen"
      },
      {
        it: "Porta i piedi indietro in plank, uno alla volta",
        en: "Step your feet back into a plank, one at a time",
        de: "Füße einzeln nach hinten in den Stütz bringen"
      },
      {
        it: "Riporta i piedi avanti e risali, senza salto",
        en: "Step feet forward and stand up, no jump",
        de: "Füße nach vorn bringen und aufstehen, ohne Sprung"
      }
    ],
    breath: {
      it: "Espira nella spinta, inspira scendendo.",
      en: "Exhale on the push, inhale lowering.",
      de: "Ausatmen beim Drücken, einatmen beim Absenken."
    }
  },
  crunch: {
    name: { it: "Crunch", en: "Crunch", de: "Crunch" },
    pose: "crunch",
    met: 4,
    repGuide: { it: "15–20 ripetizioni", en: "15–20 reps", de: "15–20 Wiederholungen" },
    cue: {
      it: "Scapole fuori dal pavimento, sguardo al soffitto, espira in alto.",
      en: "Shoulder blades off the floor, eyes to the ceiling, exhale at the top.",
      de: "Schulterblätter vom Boden, Blick zur Decke, oben ausatmen."
    },
    tip40: {
      it: "La lombare resta appoggiata: non tirare il collo con le mani.",
      en: "Keep your lower back down: don’t pull your neck with your hands.",
      de: "Der untere Rücken bleibt am Boden: Nicht den Nacken mit den Händen ziehen."
    },
    steps: [
      {
        it: "Sdraiato, ginocchia piegate, mani alle tempie",
        en: "Lying down, knees bent, hands at your temples",
        de: "Auf dem Rücken, Knie gebeugt, Hände an den Schläfen"
      },
      {
        it: "Solleva le scapole, sguardo al soffitto",
        en: "Lift your shoulder blades, eyes to the ceiling",
        de: "Schulterblätter anheben, Blick zur Decke"
      },
      {
        it: "Scendi controllato, testa non riappoggia",
        en: "Lower controlled, head doesn’t rest back down",
        de: "Kontrolliert absenken, Kopf legt sich nicht ab"
      }
    ],
    breath: {
      it: "Espira in alto, inspira scendendo.",
      en: "Exhale at the top, inhale lowering.",
      de: "Oben ausatmen, beim Absenken einatmen."
    }
  },
  sideplank: {
    name: { it: "Plank laterale", en: "Side plank", de: "Seitstütz" },
    pose: "sideplank",
    met: 3.5,
    repGuide: { it: "20–30″ per lato", en: "20–30s per side", de: "20–30 s pro Seite" },
    cue: {
      it: "Corpo in linea retta di lato, gomito sotto la spalla, bacino alto.",
      en: "Body in a straight line on your side, elbow under shoulder, hips high.",
      de: "Körper seitlich in einer Linie, Ellbogen unter der Schulter, Becken hoch."
    },
    tip40: {
      it: "Lato debole? Ginocchio a terra finché la linea regge: conta la tenuta, non la finta.",
      en: "Weak side? Knee down until the line holds: what counts is the hold, not the show.",
      de: "Schwache Seite? Knie absetzen, solange die Linie hält: Zählen tut die Haltezeit, nicht die Pose."
    },
    steps: [
      {
        it: "Gomito sotto la spalla, piedi impilati",
        en: "Elbow under shoulder, feet stacked",
        de: "Ellbogen unter der Schulter, Füße übereinander"
      },
      {
        it: "Alza il bacino fino a corpo in linea",
        en: "Lift hips until your body is in a line",
        de: "Becken anheben, bis der Körper eine Linie bildet"
      },
      {
        it: "Tieni senza lasciar cadere l’anca",
        en: "Hold without letting your hip drop",
        de: "Halten, ohne die Hüfte sinken zu lassen"
      }
    ],
    breath: {
      it: "Respiro continuo, niente apnee.",
      en: "Continuous breathing, no breath holding.",
      de: "Durchgehend atmen, nicht anhalten."
    }
  },
  legraise: {
    name: { it: "Leg raise", en: "Leg raise", de: "Beinheben" },
    pose: "legraise",
    met: 3.5,
    repGuide: { it: "10–12 ripetizioni", en: "10–12 reps", de: "10–12 Wiederholungen" },
    cue: {
      it: "Gambe tese, lombare premuta a terra: scendi solo fin dove resta appoggiata.",
      en: "Legs straight, lower back pressed to the floor: lower only as far as it stays down.",
      de: "Beine gestreckt, unterer Rücken am Boden: Nur so weit absenken, wie er am Boden bleibt."
    },
    tip40: {
      it: "Se la schiena si inarca, piega leggermente le ginocchia: proteggi i lombari.",
      en: "If your back arches, bend your knees slightly: protect your lower back.",
      de: "Wenn der Rücken sich wölbt, Knie leicht beugen: Unteren Rücken schützen."
    },
    steps: [
      {
        it: "Sdraiato, gambe tese, lombare a terra",
        en: "Lying down, legs straight, lower back on the floor",
        de: "Auf dem Rücken, Beine gestreckt, unterer Rücken am Boden"
      },
      { it: "Solleva le gambe a 90°", en: "Lift your legs to 90°", de: "Beine auf 90° anheben" },
      {
        it: "Scendi lento finché la lombare resta a terra",
        en: "Lower slowly as long as your lower back stays down",
        de: "Langsam absenken, solange der untere Rücken am Boden bleibt"
      }
    ],
    breath: {
      it: "Espira salendo, inspira scendendo.",
      en: "Exhale rising, inhale lowering.",
      de: "Ausatmen beim Anheben, einatmen beim Absenken."
    }
  },
  flutterkick: {
    name: { it: "Forbici", en: "Flutter kicks", de: "Schere (Flutter Kicks)" },
    pose: "flutterkick",
    met: 4.5,
    repGuide: { it: "Ritmo costante", en: "Steady rhythm", de: "Gleichmäßiger Rhythmus" },
    cue: {
      it: "Gambe a pochi cm da terra, alterna salita e discesa senza fermarti.",
      en: "Legs a few cm off the floor, alternate up and down without stopping.",
      de: "Beine wenige cm über dem Boden, ohne Unterbrechung auf und ab bewegen."
    },
    tip40: {
      it: "Lavoro intenso: se i lombari cedono, alza leggermente le gambe.",
      en: "Intense work: if your lower back gives out, raise your legs slightly.",
      de: "Intensives Training: Wenn der untere Rücken nachgibt, Beine leicht anheben."
    },
    steps: [
      {
        it: "Sdraiato, gambe sollevate a pochi cm da terra",
        en: "Lying down, legs lifted a few cm off the floor",
        de: "Auf dem Rücken, Beine wenige cm über dem Boden"
      },
      {
        it: "Alterna su e giù senza fermarti",
        en: "Alternate up and down without stopping",
        de: "Ohne Unterbrechung auf und ab wechseln"
      },
      {
        it: "Lombare premuta a terra",
        en: "Lower back pressed to the floor",
        de: "Unterer Rücken am Boden"
      }
    ],
    breath: {
      it: "Respiro breve e ritmico, non trattenere.",
      en: "Short, rhythmic breathing, don’t hold.",
      de: "Kurz und rhythmisch atmen, nicht anhalten."
    }
  },
  deadbug: {
    name: { it: "Dead bug", en: "Dead bug", de: "Dead Bug" },
    pose: "deadbug",
    met: 3.5,
    repGuide: { it: "8–10 per lato", en: "8–10 per side", de: "8–10 pro Seite" },
    cue: {
      it: "Braccio e gamba opposti si abbassano lenti, lombare sempre a terra.",
      en: "Opposite arm and leg lower slowly, lower back always on the floor.",
      de: "Gegenüberliegender Arm und Bein senken sich langsam, unterer Rücken bleibt am Boden."
    },
    tip40: {
      it: "L’esercizio lombare-sicuro per eccellenza: rinforza senza dolore.",
      en: "The lower-back-safe exercise par excellence: strengthens without pain.",
      de: "Die rückenschonende Übung schlechthin: Stärkt ohne Schmerzen."
    },
    steps: [
      {
        it: "Sdraiato, braccia in alto, gambe a 90°",
        en: "Lying down, arms up, legs at 90°",
        de: "Auf dem Rücken, Arme nach oben, Beine 90°"
      },
      {
        it: "Abbassa braccio e gamba opposti, lenti",
        en: "Lower opposite arm and leg slowly",
        de: "Gegenüberliegenden Arm und Bein langsam absenken"
      },
      {
        it: "Torna al centro e cambia lato, lombare a terra",
        en: "Return to center and switch sides, lower back down",
        de: "Zur Mitte zurück und Seite wechseln, unterer Rücken am Boden"
      }
    ],
    breath: {
      it: "Espira allungando braccio e gamba.",
      en: "Exhale as you extend arm and leg.",
      de: "Ausatmen beim Strecken von Arm und Bein."
    }
  },
  vup: {
    name: { it: "V-up", en: "V-up", de: "V-up" },
    pose: "vup",
    met: 5,
    repGuide: { it: "8–10 ripetizioni", en: "8–10 reps", de: "8–10 Wiederholungen" },
    cue: {
      it: "Toccati le punte dei piedi formando una V, scendi controllato.",
      en: "Touch your toes forming a V, lower controlled.",
      de: "Zehen berühren und ein V formen, kontrolliert absenken."
    },
    tip40: {
      it: "Troppo? Piegala le ginocchia: la V imperfetta conta, il collo tirato no.",
      en: "Too much? Bend your knees: an imperfect V counts, a yanked neck doesn’t.",
      de: "Zu viel? Knie beugen: Ein unvollkommenes V zählt, ein gezogener Nacken nicht."
    },
    steps: [
      {
        it: "Sdraiato, braccia tese oltre la testa",
        en: "Lying down, arms extended past your head",
        de: "Auf dem Rücken, Arme über den Kopf gestreckt"
      },
      {
        it: "Solleva gambe e busto insieme verso le punte",
        en: "Lift legs and torso together toward your toes",
        de: "Beine und Oberkörper gemeinsam zu den Zehen anheben"
      },
      {
        it: "Scendi controllato, senza slanci",
        en: "Lower controlled, no momentum",
        de: "Kontrolliert absenken, ohne Schwung"
      }
    ],
    breath: {
      it: "Espira toccando le punte, inspira scendendo.",
      en: "Exhale touching your toes, inhale lowering.",
      de: "Ausatmen beim Berühren der Zehen, einatmen beim Absenken."
    }
  },
  plankjack: {
    name: { it: "Plank jack", en: "Plank jack", de: "Plank Jack" },
    pose: "plankjack",
    met: 6,
    repGuide: { it: "Ritmo sostenuto", en: "Brisk pace", de: "Zügiges Tempo" },
    cue: {
      it: "In plank alto, piedi che saltano fuori e dentro senza muovere il bacino.",
      en: "In a high plank, feet jumping in and out without moving your hips.",
      de: "Im hohen Stütz, Füße springen rein und raus, Becken bleibt ruhig."
    },
    tip40: {
      it: "Unisce core e battito: brucia calorie a impatto quasi zero.",
      en: "Combines core and heartbeat: burns calories with almost zero impact.",
      de: "Verbinder Core und Puls: Verbrennt Kalorien bei fast null Belastung."
    },
    steps: [
      {
        it: "Plank alto, piedi uniti",
        en: "High plank, feet together",
        de: "Hoher Stütz, Füße zusammen"
      },
      {
        it: "Salta aprendo e chiudendo i piedi",
        en: "Jump feet open and closed",
        de: "Füße öffnen und schließen springen"
      },
      {
        it: "Bacino fermo, core stretto",
        en: "Hips still, core tight",
        de: "Becken ruhig, Bauch angespannt"
      }
    ],
    breath: {
      it: "Respiro ritmico: 2 salti per ciclo.",
      en: "Rhythmic breathing: 2 jumps per cycle.",
      de: "Rhythmisches Atmen: 2 Sprünge pro Zyklus."
    }
  },
  skater: {
    name: { it: "Skater", en: "Skater", de: "Skater" },
    pose: "skater",
    met: 7,
    repGuide: { it: "10–12 per lato", en: "10–12 per side", de: "10–12 pro Seite" },
    cue: {
      it: "Saltello laterale da una gamba all’altra, busto basso e avanti.",
      en: "Lateral hop from one leg to the other, torso low and forward.",
      de: "Seitlicher Sprung von einem Bein aufs andere, Oberkörper tief und nach vorn."
    },
    tip40: {
      it: "Grande brucia-grassi a basso impatto: atterra morbido sull’avampiede.",
      en: "Great low-impact fat burner: land softly on your forefoot.",
      de: "Starker gelenkschonender Fettverbrenner: Weich auf dem Vorfuß landen."
    },
    steps: [
      {
        it: "Peso su una gamba, busto basso e avanti",
        en: "Weight on one leg, torso low and forward",
        de: "Gewicht auf einem Bein, Oberkörper tief und nach vorn"
      },
      {
        it: "Saltella di lato sull’altra gamba",
        en: "Hop sideways onto the other leg",
        de: "Seitlich auf das andere Bein hüpfen"
      },
      {
        it: "Atterra morbido, gesto ampio",
        en: "Land softly, wide movement",
        de: "Weich landen, große Bewegung"
      }
    ],
    breath: {
      it: "Espira a ogni atterraggio.",
      en: "Exhale with each landing.",
      de: "Bei jeder Landung ausatmen."
    }
  },
  heeltap: {
    name: { it: "Heel tap", en: "Heel tap", de: "Heel Tap" },
    pose: "heeltap",
    met: 3.5,
    repGuide: { it: "12–15 per lato", en: "12–15 per side", de: "12–15 pro Seite" },
    cue: {
      it: "Da sdraiato con ginocchia piegate, tocca i talloni in alternanza.",
      en: "Lying down with knees bent, tap your heels alternately.",
      de: "Auf dem Rücken mit gebeugten Knien die Fersen abwechselnd berühren."
    },
    tip40: {
      it: "Fatto lento ti fa sentire davvero gli obliqui: niente fretta.",
      en: "Done slowly you really feel your obliques: no rush.",
      de: "Langsam ausgeführt spürst du die seitliche Bauchmuskulatur wirklich: Keine Eile."
    },
    steps: [
      {
        it: "Sdraiato, ginocchia piegate, piedi a terra",
        en: "Lying down, knees bent, feet on the floor",
        de: "Auf dem Rücken, Knie gebeugt, Füße am Boden"
      },
      {
        it: "Tocca il tallone destro con la mano destra",
        en: "Tap your right heel with your right hand",
        de: "Rechte Ferse mit der rechten Hand berühren"
      },
      {
        it: "Alterna lentamente, obliqui attivi",
        en: "Alternate slowly, obliques active",
        de: "Langsam wechseln, seitliche Bauchmuskeln aktiv"
      }
    ],
    breath: {
      it: "Espira toccando il tallone.",
      en: "Exhale as you tap your heel.",
      de: "Ausatmen beim Berühren der Ferse."
    }
  }
};
const EXERCISE_GROUPS = {
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
  core: [
    "plank",
    "crunch",
    "sideplank",
    "legraise",
    "flutterkick",
    "deadbug",
    "vup",
    "heeltap",
    "crunchbici",
    "russiantwist",
    "plankjack",
    "mountainclimber"
  ]
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
  {
    key: "recluta",
    label: { it: "RECLUTA", en: "RECRUIT", de: "REKRUT" },
    preset: "breve",
    work: 30,
    rest: 15,
    desc: {
      it: "Ritmo iniziale: recupero pieno",
      en: "Starting pace: full rest",
      de: "Starttempo: volle Pause"
    }
  },
  {
    key: "combattente",
    label: { it: "COMBATTENTE", en: "FIGHTER", de: "KÄMPFER" },
    preset: "standard",
    work: 40,
    rest: 20,
    desc: {
      it: "Ritmo standard 40″/20″",
      en: "Standard pace 40s/20s",
      de: "Standardtempo 40s/20s"
    }
  },
  {
    key: "elite",
    label: { it: "ELITE", en: "ELITE", de: "ELITE" },
    preset: "lungo",
    work: 45,
    rest: 15,
    desc: { it: "Ritmo sostenuto 45″/15″", en: "Brisk pace 45s/15s", de: "Zügiges Tempo 45s/15s" }
  }
];
const HOLD_EXERCISES = /* @__PURE__ */ new Set(["plank", "wallsit", "sideplank"]);
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
function getReps(exId, levelKey) {
  if (HOLD_EXERCISES.has(exId)) return null;
  const base = REPS_BASE[exId] || 10;
  const factor = levelKey === "recluta" ? 0.75 : levelKey === "elite" ? 1.35 : 1;
  const v = Math.round(base * factor);
  if (exId === "affondo" || exId === "skater") return v % 2 ? v + 1 : v;
  return v;
}
function getLevel(key) {
  return LEVELS.find((l2) => l2.key === key) || LEVELS[1];
}
function levelPreset(profile) {
  if (profile && profile.intervalPreset === "custom") {
    const c = getCustomPreset(profile);
    if (c) return c;
  }
  const lvl = profile && profile.level ? getLevel(profile.level) : null;
  return lvl ? getIntervalPreset(lvl.preset) : getIntervalPreset(profile && profile.intervalPreset || "standard");
}
const PROGRAMS = [
  {
    id: "A",
    difficulty: 2,
    name: { it: "ASSALTO PANCIA", en: "BELLY ASSAULT", de: "BAUCH-ANGRIFF" },
    tagline: {
      it: "Core e addominali — la battaglia decisiva",
      en: "Core and abs — the decisive battle",
      de: "Core und Bauch — die entscheidende Schlacht"
    },
    focus: { it: "PANCIA", en: "BELLY", de: "BAUCH" },
    rounds: 2,
    exercises: ["plank", "crunch", "legraise", "sideplank", "flutterkick", "vup"]
  },
  {
    id: "B",
    difficulty: 3,
    name: { it: "BRUCIA GRASSI", en: "FAT BURN", de: "FETT VERBRENNEN" },
    tagline: {
      it: "Circuito metabolico per dimagrire",
      en: "Metabolic circuit to lose fat",
      de: "Metabolischer Zirkel zum Abnehmen"
    },
    focus: { it: "BRUCIA", en: "BURN", de: "BRENNEN" },
    rounds: 2,
    exercises: [
      "jumpingjack",
      "skater",
      "mountainclimber",
      "plankjack",
      "burpeetattico",
      "ginocchiaalte"
    ]
  },
  {
    id: "C",
    difficulty: 2,
    name: { it: "TOTALE FORZA", en: "FULL STRENGTH", de: "VOLLE KRAFT" },
    tagline: {
      it: "Full body — brucia e costruisci",
      en: "Full body — burn and build",
      de: "Ganzkörper — verbrennen und aufbauen"
    },
    focus: { it: "TOTALE", en: "TOTAL", de: "TOTAL" },
    rounds: 2,
    exercises: ["squat", "flessioni", "affondo", "deadbug", "superman", "crunch"]
  },
  {
    id: "D",
    difficulty: 1,
    name: { it: "RECUPERO ATTIVO", en: "ACTIVE RECOVERY", de: "AKTIVE ERHOLUNG" },
    tagline: {
      it: "Mobilità e respiro — giorno di ricarica",
      en: "Mobility and breath — recharge day",
      de: "Mobilität und Atmung — Auftanktag"
    },
    focus: { it: "RECUPERO", en: "RECOVERY", de: "ERHOLUNG" },
    rounds: 1,
    exercises: ["wallsit", "ponte", "superman", "sideplank", "deadbug"]
  },
  {
    id: "E",
    difficulty: 2,
    name: { it: "PANCIA PIATTA", en: "FLAT BELLY", de: "FLACHER BAUCH" },
    tagline: {
      it: "Brucia grasso e scolpisci il girovita — la missione anti-pancetta",
      en: "Burn fat and sculpt your waist — the anti-belly mission",
      de: "Fett verbrennen und die Taille formen — die Anti-Bauch-Mission"
    },
    focus: { it: "GIROVITA", en: "WAIST", de: "TAILLE" },
    rounds: 2,
    exercises: [
      "jumpingjack",
      "mountainclimber",
      "crunchbici",
      "russiantwist",
      "skater",
      "heeltap"
    ]
  },
  {
    id: "F",
    difficulty: 2,
    name: { it: "ADDOMINALI SCOLPITI", en: "SCULPTED ABS", de: "BAUCH AUS STAHL" },
    tagline: {
      it: "Isolamento mirato per addominali definiti come l'acciaio",
      en: "Targeted isolation for steel-defined abs",
      de: "Gezieltes Training für stahlharte Bauchmuskeln"
    },
    focus: { it: "ADDOMINALI", en: "ABS", de: "BAUCH" },
    rounds: 2,
    exercises: ["crunch", "legraise", "vup", "deadbug", "flutterkick", "sideplank"]
  },
  {
    id: "G",
    difficulty: 3,
    name: { it: "SNAGLIATURA TOTALE", en: "FULL SLIM", de: "TOTALER SCHLANKHEIT" },
    tagline: {
      it: "Dimagrisci su tutto il corpo: metabolismo al massimo",
      en: "Slim down all over — metabolism on max",
      de: "Überall abnehmen — Stoffwechsel auf Maximum"
    },
    focus: { it: "SNAGLIATURA", en: "SLIM", de: "ABNEHMEN" },
    rounds: 2,
    exercises: [
      "burpeetattico",
      "ginocchiaalte",
      "mountainclimber",
      "squat",
      "flessioni",
      "skater"
    ]
  },
  {
    id: "H",
    difficulty: 1,
    name: { it: "SCHIENA DI FERRO", en: "IRON BACK", de: "EISENRÜCKEN" },
    tagline: {
      it: "Postura e lombari — addio mal di schiena",
      en: "Posture & lower back — goodbye back pain",
      de: "Haltung & unterer Rücken — bye Rückenschmerz"
    },
    focus: { it: "SCHIENA", en: "BACK", de: "RÜCKEN" },
    rounds: 2,
    exercises: ["superman", "ponte", "deadbug", "wallsit", "sideplank", "plank"]
  },
  {
    id: "I",
    difficulty: 1,
    name: { it: "CARDIO LEGGERO", en: "LIGHT CARDIO", de: "LEICHTES CARDIO" },
    tagline: {
      it: "Fiato senza impatto — per ginocchia sensibili",
      en: "Breath without impact — for sensitive knees",
      de: "Atem ohne Impact — für empfindliche Knie"
    },
    focus: { it: "FIATO", en: "BREATH", de: "ATEM" },
    rounds: 2,
    exercises: ["ginocchiaalte", "heeltap", "ponte", "crunch", "sideplank", "superman"]
  },
  {
    id: "J",
    difficulty: 2,
    name: { it: "BRACCIA D'ACCIAIO", en: "STEEL ARMS", de: "STAHLARME" },
    tagline: {
      it: "Petto e braccia — spinta a corpo libero",
      en: "Chest & arms — bodyweight push",
      de: "Brust & Arme — Bodyweight Push"
    },
    focus: { it: "BRACCIA", en: "ARMS", de: "ARME" },
    rounds: 2,
    exercises: ["flessioni", "plankjack", "mountainclimber", "deadbug", "superman", "crunchbici"]
  },
  {
    id: "K",
    difficulty: 1,
    name: { it: "EQUILIBRIO ZEN", en: "ZEN BALANCE", de: "ZEN-GLEICHGEWICHT" },
    tagline: {
      it: "Stabilità e respiro — mente e core",
      en: "Stability & breath — mind and core",
      de: "Stabilität & Atmung — Geist und Core"
    },
    focus: { it: "EQUILIBRIO", en: "BALANCE", de: "GLEICHGEWICHT" },
    rounds: 2,
    exercises: ["sideplank", "deadbug", "ponte", "wallsit", "plank", "superman"]
  },
  {
    id: "L",
    difficulty: 3,
    name: { it: "POTENZA ESPLOSIVA", en: "EXPLOSIVE POWER", de: "EXPLOSIVE KRAFT" },
    tagline: {
      it: "Sprint e salti controllati — potenza over 40",
      en: "Sprints & controlled jumps — power over 40",
      de: "Sprints & kontrollierte Sprünge — Kraft über 40"
    },
    focus: { it: "POTENZA", en: "POWER", de: "KRAFT" },
    rounds: 2,
    exercises: [
      "burpeetattico",
      "skater",
      "ginocchiaalte",
      "jumpingjack",
      "mountainclimber",
      "squat"
    ]
  },
  {
    id: "M",
    difficulty: 3,
    name: { it: "CORE ESTREMO", en: "EXTREME CORE", de: "EXTREMER CORE" },
    tagline: {
      it: "Addome d’acciaio — 6 colpi al core",
      en: "Steel abs — 6 core hits",
      de: "Stahlbauch — 6 Core-Treffer"
    },
    focus: { it: "CORE", en: "CORE", de: "CORE" },
    rounds: 2,
    exercises: ["vup", "russiantwist", "legraise", "crunchbici", "flutterkick", "heeltap"]
  },
  // ── PANCIA DEDICATA — 3 nuove missioni over-40, tutte con clip MP4 + focus girovita ──
  {
    id: "N",
    difficulty: 2,
    name: { it: "OMBELICO PIATTO", en: "FLAT NAVEL", de: "FLACHER NABEL" },
    tagline: {
      it: "Addome basso + obliqui — pancia piatta in 15′",
      en: "Lower abs + obliques — flat belly in 15′",
      de: "Unterbauch + Obliques — flacher Bauch in 15 Min"
    },
    focus: { it: "PANCIA", en: "BELLY", de: "BAUCH" },
    rounds: 2,
    exercises: ["legraise", "flutterkick", "heeltap", "deadbug", "crunch", "sideplank"],
    belly: true
  },
  {
    id: "O",
    difficulty: 2,
    name: { it: "OBLIQUI GUERRIERO", en: "WARRIOR OBLIQUES", de: "KRIEGER OBLIQUES" },
    tagline: {
      it: "Fianchi scolpiti e girovita stretto — maniglie addio",
      en: "Sculpted sides & tight waist — love handles gone",
      de: "Geformte Seiten & schmale Taille — Love Handles weg"
    },
    focus: { it: "OBLIQUI", en: "OBLIQUES", de: "OBLIQUES" },
    rounds: 2,
    exercises: ["russiantwist", "sideplank", "heeltap", "crunchbici", "plankjack", "vup"],
    belly: true
  },
  {
    id: "P",
    difficulty: 3,
    name: { it: "CINTURA D’ACCIAIO", en: "STEEL BELT", de: "STAHLGÜRTEL" },
    tagline: {
      it: "Core 360° — cintura addominale a tutta vita",
      en: "Core 360° — steel belt around your waist",
      de: "Core 360° — Stahlgürtel um die Taille"
    },
    focus: { it: "CINTURA", en: "BELT", de: "GÜRTEL" },
    rounds: 2,
    exercises: ["vup", "legraise", "russiantwist", "flutterkick", "deadbug", "heeltap"],
    belly: true
  }
];
const QUICK_PROGRAM = {
  id: "Q",
  name: { it: "RAFFICA LAMPO", en: "QUICK BLAST", de: "BLITZ-RUNDE" },
  tagline: {
    it: "Per i giorni senza tempo",
    en: "For the days with no time",
    de: "Für Tage ohne Zeit"
  },
  rounds: 1,
  exercises: ["squat", "flessioni", "plank", "jumpingjack"]
};
const CAMP_DAYS = 30;
const DAY_CYCLE = [
  "A",
  "N",
  "B",
  "O",
  "C",
  "P",
  "K",
  "H",
  "I",
  "J",
  "L",
  "M",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
  "C",
  "D"
];
const BELLY_IDS = ["N", "O", "P"];
PROGRAMS.filter((p2) => p2.belly);
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
  return PROGRAMS.find((p2) => p2.id === id) || PROGRAMS[0];
}
function isRecoveryDay(dayIdx) {
  return dayIdx % 7 === 0;
}
function isDeloadWeek(dayIdx) {
  return dayIdx >= 22 && dayIdx <= 28;
}
function pickNextProgram(sessions, profile) {
  if (!profile || !profile.campStart || !sessions.length) {
    if (!sessions.length) return { program: PROGRAMS[0], adaptive: false, isRecovery: false, isDeload: false };
    const order = ["A", "B", "C"];
    const last2 = sessions[sessions.length - 1];
    const rotationNextId = order[(order.indexOf(last2.programId) + 1) % order.length];
    const hoursSince2 = (Date.now() - new Date(last2.date).getTime()) / 36e5;
    if (last2.rpe >= 4 && hoursSince2 < 20) {
      return { program: programById("D"), adaptive: true, isRecovery: true, isDeload: false };
    }
    return { program: programById(rotationNextId), adaptive: false, isRecovery: false, isDeload: false };
  }
  const idx = campDayIndex(profile);
  if (isRecoveryDay(idx)) {
    return { program: programById("D"), adaptive: false, isRecovery: true, isDeload: isDeloadWeek(idx) };
  }
  let program;
  if (isDeloadWeek(idx)) {
    const deloadPool = ["D", "K", "H", "I"];
    program = programById(deloadPool[(idx - 22) % deloadPool.length]);
  } else {
    program = programById(DAY_CYCLE[(idx - 1) % DAY_CYCLE.length]);
  }
  const last = sessions[sessions.length - 1];
  const hoursSince = (Date.now() - new Date(last.date).getTime()) / 36e5;
  if (last && last.rpe >= 4 && hoursSince < 20 && program.id !== "D") {
    return { program: programById("D"), adaptive: true, isRecovery: true, isDeload: isDeloadWeek(idx) };
  }
  return { program, adaptive: false, isRecovery: false, isDeload: isDeloadWeek(idx) };
}
function buildSequence(program, skipWarmup, workSec = WORK_SEC, restSec = REST_SEC, mode = "time", levelKey = "combattente") {
  const isReps = mode === "reps";
  const seq = skipWarmup ? [] : [{ type: "warmup", duration: WARM_SEC }];
  for (let r = 1; r <= program.rounds; r++) {
    program.exercises.forEach((exId, i) => {
      const reps = isReps ? getReps(exId, levelKey) : null;
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
function estimateProgramKcal(program, weightKg, skipWarmup, workSec = WORK_SEC, restSec = REST_SEC, mode = "time", levelKey = "combattente") {
  let kcal = skipWarmup ? 0 : kcalForSeconds(3, weightKg, WARM_SEC) + kcalForSeconds(3, weightKg, COOL_SEC);
  const isReps = mode === "reps";
  program.exercises.forEach((id) => {
    const ex = EXERCISES[id];
    for (let r = 0; r < program.rounds; r++) {
      if (isReps) {
        const reps = getReps(id, levelKey);
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
function totalSeqSeconds(program, skipWarmup, workSec = WORK_SEC, restSec = REST_SEC, mode = "time", levelKey = "combattente") {
  return buildSequence(program, skipWarmup, workSec, restSec, mode, levelKey).reduce(
    (a, p2) => a + (p2.duration || (p2.reps ? p2.reps * 3 : 0)),
    0
  );
}
function formatTime(s) {
  const m2 = Math.floor(s / 60), sec = s % 60;
  return `${m2}:${sec.toString().padStart(2, "0")}`;
}
function dayKey(d) {
  const y = d.getFullYear();
  const m2 = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m2}-${day}`;
}
function sessionDayKey(s) {
  return dayKey(new Date(s.date));
}
function hrZone(bpm, age, lang) {
  const max = 220 - age;
  const pct = bpm / max * 100;
  if (pct < 60)
    return { label: tr$1({ it: "Recupero", en: "Recovery", de: "Erholung" }, lang), color: STEEL };
  if (pct < 70)
    return {
      label: tr$1({ it: "Brucia grassi", en: "Fat burn", de: "Fett verbrennen" }, lang),
      color: OLIVE
    };
  if (pct < 85)
    return { label: tr$1({ it: "Cardio", en: "Cardio", de: "Cardio" }, lang), color: BLAZE };
  return { label: tr$1({ it: "Massimale", en: "Max", de: "Maximal" }, lang), color: BLAZE_DEEP };
}
function computeBestStreak(sessions) {
  const dates = [...new Set(sessions.map(sessionDayKey))].sort();
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
  const dateSet = new Set(sessions.map(sessionDayKey));
  let cursor = /* @__PURE__ */ new Date();
  if (!dateSet.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (dateSet.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
function computeStreakWithFreeze(sessions) {
  const dateSet = new Set(sessions.map(sessionDayKey));
  let cursor = /* @__PURE__ */ new Date();
  if (!dateSet.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  let freezes = 1;
  while (true) {
    const k2 = dayKey(cursor);
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
  streak: STREAK_BADGES.map((n2) => ({
    type: "streak",
    n: n2,
    label: `${n2}gg serie`,
    icon: "🔥",
    color: "#C1440E"
  })),
  sessions: SESSION_BADGES.map((n2) => ({
    type: "sessions",
    n: n2,
    label: `${n2} sessioni`,
    icon: "⚡",
    color: "#B8AE8C"
  })),
  kcal: KCAL_BADGES.map((n2) => ({
    type: "kcal",
    n: n2,
    label: `${n2 >= 1e3 ? n2 / 1e3 + "k" : n2} kcal`,
    icon: "🔥",
    color: "#E84B2A"
  })),
  consistency: CONSISTENCY_BADGES.map((n2) => ({
    type: "consistency",
    n: n2,
    label: `${n2}% costanza`,
    icon: "◎",
    color: "#7FB069"
  })),
  perfect: PERFECT_WEEK_BADGES.map((n2) => ({
    type: "perfect",
    n: n2,
    label: `${n2} sett. perfette`,
    icon: "★",
    color: "#D9B34C"
  }))
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
    ...STREAK_BADGES.filter((n2) => bestStreak < n2).map((n2) => ({
      kind: "serie",
      n: n2,
      remaining: n2 - bestStreak
    })),
    ...SESSION_BADGES.filter((n2) => sessions.length < n2).map((n2) => ({
      kind: "sessioni",
      n: n2,
      remaining: n2 - sessions.length
    }))
  ];
  if (!candidates.length) return null;
  candidates.sort((a, b) => a.remaining - b.remaining);
  return candidates[0];
}
function getMedalProgress(sessions) {
  const bestStreak = computeBestStreak(sessions);
  const totalKcal = Math.round((sessions || []).reduce((a, s) => a + (s.kcal || 0), 0));
  const totalSessions = (sessions == null ? void 0 : sessions.length) || 0;
  const byDay = new Set((sessions || []).map(sessionDayKey));
  const now = /* @__PURE__ */ new Date();
  let activeDays = 0;
  for (let i = 0; i < 56; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    if (byDay.has(dayKey(d))) activeDays++;
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
  for (const n2 of STREAK_BADGES)
    all.push({
      type: "streak",
      n: n2,
      label: `${n2}gg serie`,
      icon: "🔥",
      color: "#C1440E",
      value: bestStreak,
      unlocked: bestStreak >= n2,
      progress: Math.min(1, bestStreak / n2)
    });
  for (const n2 of SESSION_BADGES)
    all.push({
      type: "sessions",
      n: n2,
      label: `${n2} sessioni`,
      icon: "⚡",
      color: "#B8AE8C",
      value: totalSessions,
      unlocked: totalSessions >= n2,
      progress: Math.min(1, totalSessions / n2)
    });
  for (const n2 of KCAL_BADGES)
    all.push({
      type: "kcal",
      n: n2,
      label: `${n2 >= 1e3 ? n2 / 1e3 + "k" : n2} kcal`,
      icon: "◆",
      color: "#E84B2A",
      value: totalKcal,
      unlocked: totalKcal >= n2,
      progress: Math.min(1, totalKcal / n2)
    });
  for (const n2 of CONSISTENCY_BADGES)
    all.push({
      type: "consistency",
      n: n2,
      label: `${n2}% costanza`,
      icon: "◎",
      color: "#7FB069",
      value: cons,
      unlocked: cons >= n2,
      progress: Math.min(1, cons / n2)
    });
  for (const n2 of PERFECT_WEEK_BADGES)
    all.push({
      type: "perfect",
      n: n2,
      label: `${n2} sett. perfette`,
      icon: "★",
      color: "#D9B34C",
      value: perfectWeeks,
      unlocked: perfectWeeks >= n2,
      progress: Math.min(1, perfectWeeks / n2)
    });
  return {
    all,
    unlocked: all.filter((m2) => m2.unlocked),
    locked: all.filter((m2) => !m2.unlocked),
    totals: { bestStreak, totalSessions, totalKcal, cons, perfectWeeks }
  };
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
  if (h < 18)
    return tr$1({ it: "Buon pomeriggio,", en: "Good afternoon,", de: "Guten Nachmittag," }, lang);
  return tr$1({ it: "Buonasera,", en: "Good evening,", de: "Guten Abend," }, lang);
}
function buildHeatmap(sessions, days = 35) {
  const dateSet = new Set(sessions.map(sessionDayKey));
  const cells = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - i);
    cells.push({ key: dayKey(d), active: dateSet.has(dayKey(d)) });
  }
  return cells;
}
function buildYearHeatmap(sessions) {
  const byDay = /* @__PURE__ */ new Map();
  sessions.forEach((s) => {
    const k2 = sessionDayKey(s);
    byDay.set(k2, (byDay.get(k2) || 0) + 1);
  });
  const now = /* @__PURE__ */ new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const days = [];
  for (let d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
    const k2 = dayKey(d);
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
function speak(text, lang, locales) {
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
/* v2.11: tactical aura + figure live glow */
@keyframes figAura { 0%,100% { filter: drop-shadow(0 0 3px currentColor) drop-shadow(0 0 8px color-mix(in srgb, currentColor 40%, transparent)); } 50% { filter: drop-shadow(0 0 6px currentColor) drop-shadow(0 0 16px color-mix(in srgb, currentColor 60%, transparent)); } }
.o40-figure { transition: filter 0.25s ease; animation: figAura 2.4s ease-in-out infinite; }
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

/* ---- v2.11 graphics polish: shared card face gloss ---- */
.o40-card-face { position: relative; overflow: hidden; }
.o40-card-face::before {
  content: ''; position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
  background: linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 42%, rgba(0,0,0,0.22) 100%);
}
.o40-card-face::after {
  content: ''; position: absolute; top: 0; left: 12%; right: 12%; height: 1px; pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(184,174,140,0.45), transparent);
}
.o40-card-accent { position: absolute; left: 0; top: 12%; bottom: 12%; width: 3px; border-radius: 0 2px 2px 0; }
.o40-num-glow { background: linear-gradient(180deg, ${PAPER} 0%, ${KHAKI} 130%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.o40-num-glow.on { background: linear-gradient(180deg, ${BLAZE} 0%, ${BLAZE_DEEP} 140%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 8px ${BLAZE}55); }
@keyframes borderSpin { to { transform: rotate(360deg); } }
@keyframes sheenSweep { 0% { transform: translateX(-150%) skewX(-18deg); } 100% { transform: translateX(220%) skewX(-18deg); } }
.o40-spin-border { position: relative; border-radius: inherit; overflow: hidden; }
.o40-spin-border::before {
  content: ''; position: absolute; inset: -60%; padding: 2px; border-radius: inherit;
  background: conic-gradient(from 0deg, transparent 0deg, ${BLAZE}66 120deg, transparent 200deg, ${BLAZE}33 300deg, transparent 360deg);
  animation: borderSpin 6s linear infinite; pointer-events: none;
}
.o40-spin-border > * { position: relative; z-index: 1; border-radius: inherit; }
@media (prefers-reduced-motion: reduce) {
  .o40-figure, .o40-spin-border, .o40-card-face { animation: none !important; }
}

/* ---- v2.11: shared primary CTA treatment ---- */
.o40-cta { position: relative; overflow: hidden; }
.o40-cta::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: 0; width: 40%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
  transform: translateX(-150%) skewX(-18deg); pointer-events: none;
}
.o40-cta:hover::after { transform: translateX(340%) skewX(-18deg); transition: transform 0.7s ease; }
.o40-cta::before {
  content: ''; position: absolute; top: 0; left: 8%; right: 8%; height: 1px; pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
}

/* ---- v2.11: HUD corner-bracket tactical frame ---- */
.o40-hud { position: relative; }
.o40-hud::before, .o40-hud::after {
  content: ''; position: absolute; width: 14px; height: 14px; pointer-events: none; opacity: 0.9;
}
.o40-hud::before {
  top: -6px; left: -6px;
  border-top: 2px solid ${BLAZE}; border-left: 2px solid ${BLAZE};
  border-top-left-radius: 6px; filter: drop-shadow(0 0 4px ${BLAZE}66);
}
.o40-hud::after {
  bottom: -6px; right: -6px;
  border-bottom: 2px solid ${BLAZE}; border-right: 2px solid ${BLAZE};
  border-bottom-right-radius: 6px; filter: drop-shadow(0 0 4px ${BLAZE}66);
}
.o40-hud-corner { position: absolute; top: -6px; right: -6px; width: 14px; height: 14px; pointer-events: none;
  border-top: 2px solid ${BLAZE}; border-right: 2px solid ${BLAZE}; border-top-right-radius: 6px;
  filter: drop-shadow(0 0 4px ${BLAZE}66); }
.o40-hud-corner.bl { top: auto; right: auto; bottom: -6px; left: -6px;
  border-top: none; border-right: none; border-bottom: 2px solid ${BLAZE}; border-left: 2px solid ${BLAZE};
  border-top-right-radius: 0; border-bottom-right-radius: 0; border-bottom-left-radius: 6px; border-top-left-radius: 6px; }

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

/* ---- AI tracking stage: scanline + edge glow overlay ---- */
.o40-ai-stage::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(120% 70% at 50% 0%, ${BLAZE}22 0%, transparent 55%),
    repeating-linear-gradient(180deg, rgba(255,255,255,0.028) 0 1px, transparent 1px 3px);
  mix-blend-mode: screen; opacity: 0.55;
}
.o40-ai-stage::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  box-shadow: inset 0 0 60px 0 rgba(0,0,0,0.55), inset 0 0 2px rgba(193,68,14,0.4);
}
@media (prefers-reduced-motion: reduce) {
  .o40-ai-stage::after { background: radial-gradient(120% 70% at 50% 0%, ${BLAZE}22 0%, transparent 55%); }
}
@media (prefers-reduced-motion: reduce) {
  .o40-eqbar, .o40-comet, .o40-ember, .o40-ecg, .o40-ticker-inner, .o40-loadbar > span,
  .o40-pop, .o40-blink, .o40-expand { animation: none !important; }
}

/* ---- v2.11 graphics polish: shared card face gloss ---- */
.o40-card-face { position: relative; overflow: hidden; }
.o40-card-face::before {
  content: ''; position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
  background: linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 42%, rgba(0,0,0,0.22) 100%);
}
.o40-card-face::after {
  content: ''; position: absolute; top: 0; left: 12%; right: 12%; height: 1px; pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(184,174,140,0.45), transparent);
}
.o40-card-accent { position: absolute; left: 0; top: 12%; bottom: 12%; width: 3px; border-radius: 0 2px 2px 0; }
.o40-num-glow { background: linear-gradient(180deg, ${PAPER} 0%, ${KHAKI} 130%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.o40-num-glow.on { background: linear-gradient(180deg, ${BLAZE} 0%, ${BLAZE_DEEP} 140%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 8px ${BLAZE}55); }
@keyframes borderSpin { to { transform: rotate(360deg); } }
@keyframes sheenSweep { 0% { transform: translateX(-150%) skewX(-18deg); } 100% { transform: translateX(220%) skewX(-18deg); } }

/* =============================================================
   v2.12 — 10 GIR LOOP GRAFICA (OLED depth + tactical polish)
   Loop 1: OLED depth — deeper ink, vignette
   Loop 2: Card system — unified face + hairline + accent
   Loop 3: Typography glow — Bebas + Inter sharpened
   Loop 4: CTA sheen — blaze light + inset highlight
   Loop 5: Nav pill — bottom OLED pill + top blur
   Loop 6: HUD tactical — 4 corners + scanline refined
   Loop 7: Micro-interactions — staggered fade + ticker
   Loop 8: Skeletons & loading — shimmer 2-tone
   Loop 9: Badges & rings — DogTag lift + ProgressRing halo
   Loop 10: Aura & noise — camo subtle + aura slower
   ============================================================= */

/* Loop 1 — OLED depth */
.o40-phone {
  background:
    radial-gradient(130% 60% at 50% -10%, #2A3020 0%, transparent 58%),
    radial-gradient(100% 45% at 88% 108%, ${BLAZE_DEEP}1f 0%, transparent 62%),
    radial-gradient(85% 35% at 8% 108%, ${OLIVE}1e 0%, transparent 58%),
    linear-gradient(180deg, #0E100D 0%, ${INK} 18%, ${INK} 100%);
}
.o40-phone::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(120% 90% at 50% 50%, transparent 62%, rgba(0,0,0,0.42) 100%);
  opacity: 0.9;
}

/* Loop 2 — Card system unified */
.o40-card, .o40-card-glass, .o40-card-face {
  border-radius: 14px;
}
.o40-card {
  background: linear-gradient(165deg, ${INK_2} 0%, #1E221B 55%, ${INK} 100%);
  border: 1px solid rgba(184,174,140,0.14);
  box-shadow: 0 6px 22px rgba(0,0,0,0.38), 0 1px 0 rgba(255,255,255,0.04) inset;
}
.o40-card-glass { backdrop-filter: blur(10px) saturate(1.15); }

/* Loop 3 — Typography */
.o40-display { text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; letter-spacing: 0.055em; }
.o40-mono { font-variant-numeric: tabular-nums; letter-spacing: 0.04em; }
.o40-num-glow { filter: drop-shadow(0 1px 0 rgba(0,0,0,0.35)); }
.o40-num-glow.on { filter: drop-shadow(0 0 10px ${BLAZE}66) drop-shadow(0 1px 0 rgba(0,0,0,0.45)); }

/* Loop 4 — CTA blaze light */
.o40-cta {
  background: linear-gradient(135deg, ${BLAZE_LIGHT} 0%, ${BLAZE} 58%, ${BLAZE_DEEP} 100%) !important;
  box-shadow: 0 8px 22px ${BLAZE}33, 0 1px 0 rgba(255,255,255,0.18) inset, 0 -1px 0 rgba(0,0,0,0.28) inset !important;
  border: 1px solid ${BLAZE_LIGHT}33;
}
.o40-cta:active { transform: scale(0.97); filter: brightness(0.96); }

/* Loop 5 — Nav pill OLED */
.o40-bottomnav-glass {
  backdrop-filter: blur(14px) saturate(1.18);
  background: color-mix(in srgb, #0E100D 94%, transparent);
  border-top: 1px solid rgba(184,174,140,0.10);
  box-shadow: 0 -8px 24px rgba(0,0,0,0.45);
}
.o40-topbar-glass {
  backdrop-filter: blur(14px) saturate(1.18);
  background: color-mix(in srgb, #0E100D 92%, transparent);
  border-bottom: 1px solid rgba(184,174,140,0.10);
}
.o40-camo { opacity: 0.85; height: 5px !important; }

/* Loop 6 — HUD refined */
.o40-hud { border-radius: 12px; }
.o40-hud::before, .o40-hud::after, .o40-hud-corner { border-width: 2px; opacity: 0.95; }
.o40-ai-stage::after { opacity: 0.62; }
.o40-ai-stage::before { box-shadow: inset 0 0 70px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(193,68,14,0.22); }

/* Loop 7 — micro-interactions staggered */
.o40-screen-in { animation: screenIn 0.5s cubic-bezier(0.16,1,0.3,1); }
.o40-card { animation: fadeSlide 0.32s cubic-bezier(0.16,1,0.3,1); animation-fill-mode: both; }
.o40-card:nth-child(1) { animation-delay: 0.02s; }
.o40-card:nth-child(2) { animation-delay: 0.06s; }
.o40-card:nth-child(3) { animation-delay: 0.10s; }
.o40-ticker-inner { animation-duration: 28s; }

/* Loop 8 — skeletons polish */
.o40-skeleton {
  background: linear-gradient(90deg, ${OLIVE_DARK} 20%, ${OLIVE} 50%, ${OLIVE_DARK} 80%);
  background-size: 200% 100%; animation: shimmer 1.4s infinite;
  border-radius: 10px; opacity: 0.9;
}
.o40-loadbar { height: 5px; border-radius: 4px; }

/* Loop 9 — badges lift */
.o40-card:active { transform: scale(0.985) translateY(0px); }
@media (hover: hover) {
  .o40-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(0,0,0,0.52); }
  .o40-card-glass:hover { transform: translateY(-3px); }
}

/* Loop 10 — aura slower + noise softer */
.o40-aura { animation-duration: 28s; opacity: 0.95; }
.o40-phone::before { opacity: 0.035; }
.o40-gridbg { opacity: 0.42; }
.o40-embers { opacity: 0.9; }

/* =============================================================
   v2.11.1 — 3 LOOP AGGIUNTIVI (nuova)
   Loop 11: Hero mission — depth + leggibilità + CTA pulse
   Loop 12: Card progress — DogTag lift + Ring halo + Segmented glow
   Loop 13: Micro — ticker respiro + glass + hover + aura
   ============================================================= */

/* Loop 11 — Hero */
.o40-card.o40-ring-border {
  box-shadow: 0 12px 36px rgba(0,0,0,0.52), 0 0 0 1px ${BLAZE}18 inset, 0 1px 0 rgba(255,255,255,0.07) inset;
}
.o40-card.o40-ring-border::before { opacity: 0.85; }
.o40-card .o40-embers { filter: brightness(1.08); }

/* Loop 12 — Card progress refs */
.o40-card-face { box-shadow: 0 5px 18px rgba(0,0,0,0.32), 0 1px 0 rgba(255,255,255,0.04) inset; }
.o40-card-accent { box-shadow: 0 0 8px color-mix(in srgb, var(--accent, ${BLAZE}) 45%, transparent); }

/* Loop 13 — Micro extra */
.o40-ticker { letter-spacing: 0.11em; }
.o40-ticker-inner { gap: 48px; padding-left: 48px; }
.o40-topbar-glass, .o40-bottomnav-glass { backdrop-filter: blur(15px) saturate(1.2); }
.o40-card { will-change: transform; }

/* =============================================================
   v2.12 — 10 LOOP EXTRA (14-23) full-app polish
   14 Color — OLED ink depth + olive tint lifted
   15 Card v2 — radius 16 + selected glow
   16 Typography — display scale + mono tabular
   17 Iconography — circle halo + badge
   18 Navigation — pill glow + safe-area
   19 Hero/Empty — overlay legibility + empty tint
   20 Session HUD — timer glow + AI stage ring
   21 Data viz — recharts dark tooltip + heatmap radius
   22 Forms — focus ring 3px + pill active
   23 Cohesion — easing + shadow unified
   ============================================================= */

/* Loop 14 — Color */
:root { --ink: ${INK}; --ink2: ${INK_2}; --ink3: #0E100D; --olive: ${OLIVE}; --kaki: ${KHAKI}; --blaze: ${BLAZE}; --paper: ${PAPER}; }
.o40-phone {
  background:
    radial-gradient(135% 62% at 50% -12%, #2D3423 0%, transparent 60%),
    radial-gradient(105% 48% at 90% 110%, ${BLAZE_DEEP}20 0%, transparent 65%),
    linear-gradient(180deg, #0B0D0A 0%, ${INK} 22%, ${INK} 100%);
}

/* Loop 15 — Card v2 */
.o40-card, .o40-card-glass, .o40-card-face { border-radius: 16px; }
.o40-card { border: 1px solid rgba(184,174,140,0.13); box-shadow: 0 7px 24px rgba(0,0,0,0.40), 0 1px 0 rgba(255,255,255,0.05) inset; }
.o40-card-glass[aria-selected="true"], .o40-card[aria-selected="true"] { border-color: ${BLAZE}66; box-shadow: 0 10px 28px rgba(0,0,0,0.48), 0 0 0 1px ${BLAZE}22 inset; }
@media (hover:hover){ .o40-card:hover{ transform: translateY(-3px); box-shadow: 0 18px 40px rgba(0,0,0,0.55); }}

/* Loop 16 — Typography */
.o40-display { font-size-adjust: 0.52; letter-spacing: 0.06em; line-height: 0.95; }
.o40-mono { font-feature-settings: "tnum" 1, "ss01" 1; letter-spacing: 0.045em; }
.o40 { line-height: 1.5; -webkit-font-smoothing: antialiased; }

/* Loop 17 — Iconography */
.o40-fav { filter: drop-shadow(0 1px 2px rgba(0,0,0,0.35)); }
.o40-fav[aria-pressed="true"] { color: ${BLAZE}; filter: drop-shadow(0 0 6px ${BLAZE}66); }

/* Loop 18 — Navigation */
.o40-topbar-glass { min-height: 52px; border-bottom: 1px solid rgba(184,174,140,0.11); }
.o40-bottomnav-glass { padding-bottom: max(4px, env(safe-area-inset-bottom)); }
.o40-bottomnav-glass button[aria-current="page"] span:last-child { opacity: 1; }

/* Loop 19 — Hero/Empty */
.o40-card.o40-ring-border > div > div[style*="music-bg"], .o40-card img { filter: saturate(0.95) contrast(1.03); }
.o40-skeleton { border-radius: 12px; }

/* Loop 20 — Session HUD */
.o40-display.o40-num-glow { text-shadow: 0 1px 0 rgba(0,0,0,0.45); }
.o40-ai-stage { border-radius: 16px; overflow: hidden; }
.o40-ai-stage::before { border-radius: 16px; }

/* Loop 21 — Data viz */
.recharts-tooltip-wrapper { filter: drop-shadow(0 8px 16px rgba(0,0,0,0.45)); }
.recharts-cartesian-grid line { stroke: rgba(184,174,140,0.08); }

/* Loop 22 — Forms */
.o40-input:focus, .o40-search:focus { border-color: ${BLAZE}; box-shadow: 0 0 0 3px ${BLAZE}22, 0 1px 0 rgba(255,255,255,0.06) inset; }
.o40-search { border-radius: 14px; }
.pillBtn[aria-pressed="true"], .o40-card[aria-pressed="true"] { background: ${BLAZE}14; border-color: ${BLAZE}55; }

/* Loop 23 — Cohesion */
* { scrollbar-color: ${KHAKI} ${INK_2}; }
.o40 * { scrollbar-width: thin; }
@media (prefers-reduced-motion: reduce){
  .o40-card, .o40-screen-in, .o40-pop, .o40-expand, .o40-aura, .o40-gridbg, .o40-embers, .o40-ticker-inner { animation: none !important; transition: none !important; }
}

/* === ROADMAP A11y batch (v2.12.1) === */
.o40 button:focus-visible, .o40 a:focus-visible, .o40 [role="button"]:focus-visible {
  outline: 2px solid ${BLAZE}; outline-offset: 2px; box-shadow: 0 0 0 4px ${BLAZE}22;
}
.o40 input:focus-visible, .o40 textarea:focus-visible, .o40 select:focus-visible { outline: 2px solid ${BLAZE}; outline-offset: 1px; }
@media print {
  .o40-phone { background: white !important; color: black !important; }
  .o40-topbar-glass, .o40-bottomnav-glass, .o40-aura, .o40-gridbg, .o40-camo { display: none !important; }
  .o40-card, .o40-card-glass { break-inside: avoid; box-shadow: none !important; border: 1px solid #ccc !important; }
  body { background: white !important; }
}
`;
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
  try {
    return typeof navigator !== "undefined" && "serviceWorker" in navigator && typeof window !== "undefined" && "PushManager" in window && "Notification" in window;
  } catch {
    return false;
  }
}
function isStandalonePWA() {
  try {
    return typeof window !== "undefined" && window.matchMedia && window.matchMedia("(display-mode: standalone)").matches || typeof window !== "undefined" && window.navigator && window.navigator.standalone === true;
  } catch {
    return false;
  }
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
      body: JSON.stringify({
        test: true,
        filterSelf: true,
        lang,
        subscription: sub ? { endpoint: sub.endpoint } : null
      })
    });
    if (res.ok) {
      const j = await res.json();
      if (j.sent > 0) return j;
      throw new Error("no sent");
    }
  } catch {
  }
  const l2 = lang || "it";
  const titles = {
    it: "Operator 40 — Test push",
    en: "Operator 40 — Push test",
    de: "Operator 40 — Push-Test"
  };
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
function getConsistencyScore(sessions, weeks = 8) {
  if (!(sessions == null ? void 0 : sessions.length)) return 0;
  const now = /* @__PURE__ */ new Date();
  const byDay = new Set(sessions.map(sessionDayKey));
  let activeDays = 0;
  for (let i = 0; i < weeks * 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    if (byDay.has(dayKey(d))) activeDays++;
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
function getStreakRisk(sessions) {
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
function getMotivationalMessage({
  sessions = [],
  profile = null,
  lang = "it",
  date = /* @__PURE__ */ new Date()
} = {}) {
  var _a;
  const n2 = sessions.length;
  const streak = computeStreak(sessions);
  computeBestStreak(sessions);
  const missed = daysSinceLastSession(sessions);
  const cons = (() => {
    try {
      return getConsistencyScore(sessions, 8);
    } catch {
      return 0;
    }
  })();
  const risk = getStreakRisk(sessions);
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
    const titles2 = {
      it: `Sei inarrestabile! 🔥 ${streak} giorni`,
      en: `Unstoppable! 🔥 ${streak} days`,
      de: `Unaufhaltsam! 🔥 ${streak} Tage`
    };
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
    const titles2 = {
      it: `Continua così! 🔥 ${streak} giorni di fila`,
      en: `Keep it up! 🔥 ${streak} days`,
      de: `Weiter so! 🔥 ${streak} Tage`
    };
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
    const titles2 = {
      it: "Tip anti-stress 🧘",
      en: "Anti-stress tip 🧘",
      de: "Anti-Stress Tipp 🧘"
    };
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
const VOCAL_MOTIVATION = {
  it: [
    "Dai, un altro sforzo.",
    "Continua così, stai andando alla grande.",
    "Resta concentrato, ogni secondo conta.",
    "Respira e spingi ancora.",
    "La fatica è il progresso che arriva.",
    "Ancora un po', ce la puoi fare.",
    "Ritmo perfetto, non fermarti adesso.",
    "Un passo alla volta, con costanza."
  ],
  en: [
    "Come on, one more push.",
    "Keep going, you are doing great.",
    "Stay focused, every second counts.",
    "Breathe and push again.",
    "The effort is where progress comes from.",
    "A little more, you can do it.",
    "Perfect rhythm, do not stop now.",
    "One step at a time, with consistency."
  ],
  de: [
    "Komm, noch eine Anstrengung.",
    "Mach weiter, du machst das großartig.",
    "Bleib konzentriert, jede Sekunde zählt.",
    "Atme und drück noch einmal.",
    "Die Anstrengung ist der Fortschritt.",
    "Noch ein bisschen, du schaffst es.",
    "Perfekter Rhythmus, bleib dran.",
    "Schritt für Schritt, mit Beständigkeit."
  ]
};
function getVocalMotivation(lang) {
  const list = VOCAL_MOTIVATION[lang] || VOCAL_MOTIVATION.it;
  return list[Math.floor(Math.random() * list.length)];
}
const BELLY_LEVELS = [
  {
    key: "recluta",
    label: { it: "RECLUTA", en: "RECRUIT", de: "REKRUT" },
    minPlank: 0,
    minCrunch: 0,
    work: 30,
    rest: 20,
    desc: { it: "Base — core sicuro", en: "Base — safe core", de: "Basis — sicher" }
  },
  {
    key: "combattente",
    label: { it: "COMBATTENTE", en: "FIGHTER", de: "KÄMPFER" },
    minPlank: 30,
    minCrunch: 10,
    work: 40,
    rest: 20,
    desc: { it: "Standard — 40″/20″", en: "Standard — 40s/20s", de: "Standard — 40s/20s" }
  },
  {
    key: "elite",
    label: { it: "ELITE", en: "ELITE", de: "ELITE" },
    minPlank: 60,
    minCrunch: 20,
    work: 45,
    rest: 15,
    desc: { it: "Avanzato — 45″/15″", en: "Advanced — 45s/15s", de: "Fortgeschritten — 45s/15s" }
  }
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
function shouldProgressBellyLevel({
  sessions,
  currentLevelKey = "recluta",
  waistHistory,
  profile
}) {
  const levelOrder = ["recluta", "combattente", "elite"];
  const idx = levelOrder.indexOf(currentLevelKey);
  if (idx >= levelOrder.length - 1) return null;
  const lastChange = (profile == null ? void 0 : profile.bellyLevelUpdated) ? new Date(profile.bellyLevelUpdated) : null;
  if (lastChange) {
    const diff = (Date.now() - lastChange.getTime()) / 864e5;
    if (diff < 7) return null;
  }
  const weekAgo = Date.now() - 7 * 864e5;
  const bellySessions = (sessions || []).filter(
    (s) => ["N", "O", "P", "A", "E", "F", "M"].includes(s.programId) && new Date(s.date).getTime() > weekAgo
  );
  if (bellySessions.length < 3) return null;
  return levelOrder[idx + 1];
}
function BellyTest({ onSave, onClose, lang = "it", initial = null }) {
  const [plankSec, setPlankSec] = reactExports.useState((initial == null ? void 0 : initial.plankSec) ? String(initial.plankSec) : "");
  const [crunchReps, setCrunchReps] = reactExports.useState(
    (initial == null ? void 0 : initial.crunchReps) ? String(initial.crunchReps) : ""
  );
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: { background: INK_2, border: `1px solid ${BLAZE}66`, borderRadius: 14, padding: 14 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 18, color: BLAZE }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: BLAZE, fontSize: 11, letterSpacing: "0.08em" }, children: t(
            "TEST PANCIA 2.0 — TROVA IL TUO LIVELLO",
            "BELLY TEST 2.0 — FIND YOUR LEVEL",
            "BAUCH-TEST 2.0"
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 12 }, children: t(
          "2 test da 30-60s: tieni il plank più a lungo che puoi e conta i crunch in 30s. Ti assegno Recluta/Combattente/Elite automatico.",
          "2 quick tests: hold plank as long as you can and count crunches in 30s. You get auto level.",
          "2 Tests: Plank so lange wie möglich halten und Crunches in 30s zählen."
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: 10 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, marginBottom: 6 }, children: "PLANK MAX (sec)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: plankSec,
                    onChange: (e) => setPlankSec(e.target.value.replace(/\D/g, "").slice(0, 3)),
                    placeholder: "es. 45",
                    inputMode: "numeric",
                    style: {
                      width: "100%",
                      background: INK_2,
                      border: `1px solid ${OLIVE}`,
                      borderRadius: 8,
                      padding: "10px 12px",
                      color: PAPER,
                      fontSize: 16,
                      outline: "none"
                    }
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
                      style: {
                        flex: 1,
                        padding: "6px 8px",
                        borderRadius: 8,
                        border: `1px solid ${running === "plank" ? BLAZE : OLIVE}`,
                        background: running === "plank" ? `${BLAZE}22` : "transparent",
                        color: running === "plank" ? BLAZE : STEEL,
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4
                      },
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
                      style: {
                        padding: "6px 10px",
                        borderRadius: 8,
                        border: `1px solid ${OLIVE}`,
                        background: INK_2,
                        color: KHAKI,
                        fontSize: 11,
                        cursor: "pointer"
                      },
                      children: [
                        "Usa ",
                        seconds,
                        "″"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 9, marginTop: 4 }, children: "<30 Recluta · 30-60 Combattente · >60 Elite" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: 10 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, marginBottom: 6 }, children: "CRUNCH 30″ (rep)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: crunchReps,
                    onChange: (e) => setCrunchReps(e.target.value.replace(/\D/g, "").slice(0, 2)),
                    placeholder: "es. 14",
                    inputMode: "numeric",
                    style: {
                      width: "100%",
                      background: INK_2,
                      border: `1px solid ${OLIVE}`,
                      borderRadius: 8,
                      padding: "10px 12px",
                      color: PAPER,
                      fontSize: 16,
                      outline: "none"
                    }
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
                      style: {
                        flex: 1,
                        padding: "6px 8px",
                        borderRadius: 8,
                        border: `1px solid ${running === "crunch" ? BLAZE : OLIVE}`,
                        background: running === "crunch" ? `${BLAZE}22` : "transparent",
                        color: running === "crunch" ? BLAZE : STEEL,
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer"
                      },
                      children: running === "crunch" ? `30″: ${30 - seconds}s` : "VIA 30″"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => setCrunchCount((c2) => c2 + 1),
                      disabled: running !== "crunch",
                      style: {
                        padding: "6px 10px",
                        borderRadius: 8,
                        border: `1px solid ${OLIVE}`,
                        background: running === "crunch" ? BLAZE : INK_2,
                        color: running === "crunch" ? PAPER : STEEL,
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: running === "crunch" ? "pointer" : "not-allowed"
                      },
                      children: [
                        "+1 (",
                        crunchCount,
                        ")"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 9, marginTop: 4 }, children: "<10 Recluta · 10-20 Combattente · >20 Elite" })
              ]
            }
          )
        ] }),
        suggested && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK})`,
              border: `1px solid ${BLAZE}`,
              borderRadius: 10,
              padding: 10,
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: `${BLAZE}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 16, color: BLAZE })
                }
              ),
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
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onClose,
              style: {
                flex: 1,
                padding: "10px 12px",
                borderRadius: 10,
                border: `1px solid ${OLIVE}`,
                background: INK,
                color: STEEL,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: t("Chiudi", "Close", "Schließen")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => hasInput && suggested && onSave({
                plankSec: p2,
                crunchReps: c,
                level: suggested.key,
                date: (/* @__PURE__ */ new Date()).toISOString()
              }),
              disabled: !hasInput || !suggested,
              style: {
                flex: 2,
                padding: "10px 12px",
                borderRadius: 10,
                border: `1px solid ${BLAZE}`,
                background: hasInput ? `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})` : INK_2,
                color: PAPER,
                fontSize: 12,
                fontWeight: 700,
                cursor: hasInput ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                opacity: hasInput ? 1 : 0.5
              },
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 4, marginTop: 8, justifyContent: "center" }, children: BELLY_LEVELS.map((l2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontSize: 9,
              color: (suggested == null ? void 0 : suggested.key) === l2.key ? BLAZE : STEEL,
              border: `1px solid ${(suggested == null ? void 0 : suggested.key) === l2.key ? BLAZE : OLIVE}`,
              borderRadius: 6,
              padding: "2px 6px",
              background: (suggested == null ? void 0 : suggested.key) === l2.key ? `${BLAZE}18` : "transparent"
            },
            children: l2.label.it
          },
          l2.key
        )) })
      ]
    }
  );
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
  const dot = abx * cbx + aby * cby;
  const mag = Math.hypot(abx, aby) * Math.hypot(cbx, cby);
  if (mag < 1e-9) return 180;
  const cos = Math.max(-1, Math.min(1, dot / mag));
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
    this.worldSmoother = null;
    this.ready = false;
    this.delegate = "GPU";
    this.modelVariant = "auto";
    this.delegate = opts.delegate ?? "GPU";
    const isHeavy = opts.modelVariant === "heavy" || opts.modelVariant === "auto";
    const cutoff = isHeavy ? 1.05 : 1.15;
    const beta = isHeavy ? 6e-3 : 8e-3;
    if (enableSmoothing) {
      this.smoother = new LandmarkSmoother(33, cutoff, beta);
      this.worldSmoother = new LandmarkSmoother(33, cutoff, beta);
    }
  }
  setSmoothingTuning(minCutoff, beta) {
    var _a, _b;
    (_a = this.smoother) == null ? void 0 : _a.setTuning(minCutoff, beta);
    (_b = this.worldSmoother) == null ? void 0 : _b.setTuning(minCutoff, beta);
  }
  isReady() {
    return this.ready && !!this.landmarker;
  }
  async init(onProgress) {
    if (this.ready) return;
    const vision = await __vitePreload(() => import("./vision-BnDXmRAR.js"), true ? [] : void 0, import.meta.url);
    const { PoseLandmarker, FilesetResolver } = vision;
    const requested = this.opts.modelVariant ?? "auto";
    if (requested === "auto") {
      try {
        const mem = navigator.deviceMemory ?? 4;
        const ua = navigator.userAgent ?? "";
        const isOldIOS = /iPhone OS 1[0-4]_/.test(ua);
        const cores = navigator.hardwareConcurrency ?? 4;
        this.modelVariant = mem >= 4 && cores >= 4 && !isOldIOS ? "heavy" : "lite";
        try {
          const override = localStorage.getItem("o40_modelVariant");
          if (override === "lite" || override === "heavy" || override === "full") this.modelVariant = override;
        } catch {
        }
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
  /** Detect for video element at given timestamp (performance.now). Returns smoothed landmarks + worldLandmarks. */
  detect(video, timestampMs) {
    var _a, _b;
    if (!this.landmarker || !this.ready) {
      return { landmarks: null, timestampMs, visibilityScore: 0 };
    }
    try {
      const result = this.landmarker.detectForVideo(video, timestampMs);
      const raw = ((_a = result == null ? void 0 : result.landmarks) == null ? void 0 : _a[0]) ?? null;
      const worldRaw = ((_b = result == null ? void 0 : result.worldLandmarks) == null ? void 0 : _b[0]) ?? null;
      if (!raw) return { landmarks: null, worldLandmarks: worldRaw, timestampMs, visibilityScore: 0 };
      let lm = raw;
      let world = worldRaw;
      if (this.enableSmoothing && this.smoother) {
        lm = this.smoother.smooth(raw, timestampMs);
        if (worldRaw && this.worldSmoother) {
          world = this.worldSmoother.smooth(worldRaw, timestampMs);
        }
      }
      const vis = visibilityScore(lm, [11, 12, 23, 24, 25, 26, 13, 14, 15, 16]);
      return { landmarks: lm, worldLandmarks: world, timestampMs, visibilityScore: vis };
    } catch {
      return { landmarks: null, timestampMs, visibilityScore: 0 };
    }
  }
  getModelVariant() {
    return this.modelVariant;
  }
  getDelegate() {
    return this.delegate;
  }
  resetSmoother() {
    var _a, _b;
    (_a = this.smoother) == null ? void 0 : _a.reset();
    (_b = this.worldSmoother) == null ? void 0 : _b.reset();
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
function extractFeatures(lm, worldLm, prevFeatures, dtMs) {
  var _a, _b, _c, _d, _e, _f;
  const knee = bilateralAngle(lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]);
  const hipFlex = bilateralAngle(lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
  const trunk = bilateralAngle(lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
  const elbow = bilateralAngle(lm, [LM.left_shoulder, LM.left_elbow, LM.left_wrist], [LM.right_shoulder, LM.right_elbow, LM.right_wrist]);
  const tl = torsoLength(lm);
  const rawSpread = (() => {
    const a = lm[LM.left_ankle], b = lm[LM.right_ankle];
    if (!a || !b) return 0;
    return Math.hypot(a.x - b.x, a.y - b.y);
  })();
  const legSpreadNorm = tl > 1e-6 ? rawSpread / tl : 0;
  const hipY = ((((_a = lm[LM.left_hip]) == null ? void 0 : _a.y) ?? 0.5) + (((_b = lm[LM.right_hip]) == null ? void 0 : _b.y) ?? 0.5)) / 2;
  if (worldLm) {
    ((((_c = worldLm[LM.left_hip]) == null ? void 0 : _c.z) ?? 0) + (((_d = worldLm[LM.right_hip]) == null ? void 0 : _d.z) ?? 0)) / 2;
    ((((_e = worldLm[LM.left_knee]) == null ? void 0 : _e.z) ?? 0) + (((_f = worldLm[LM.right_knee]) == null ? void 0 : _f.z) ?? 0)) / 2;
  }
  const dt = dtMs || 16;
  let velocity = 0;
  if (prevFeatures) {
    velocity = (knee - prevFeatures.kneeRaw) / (dt / 1e3);
  }
  const leftKnee = angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle);
  const rightKnee = angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle);
  const symDiff = Math.abs(leftKnee - rightKnee);
  const symmetry = Math.max(0, 100 - symDiff * 2.5);
  return {
    kneeNorm: knee / 180,
    hipFlexNorm: hipFlex / 180,
    trunkNorm: trunk / 180,
    elbowNorm: elbow / 180,
    legSpreadNorm,
    hipYNorm: hipY,
    torsoLen: tl,
    velocity,
    symmetry,
    kneeRaw: knee,
    hipFlexRaw: hipFlex,
    elbowRaw: elbow,
    trunkRaw: trunk
  };
}
function featuresToVector(f2) {
  return [
    f2.kneeNorm,
    f2.hipFlexNorm,
    f2.trunkNorm,
    f2.elbowNorm,
    Math.min(1, f2.legSpreadNorm / 2),
    f2.hipYNorm,
    Math.tanh(f2.velocity / 400),
    // compress velocity -1..1
    f2.symmetry / 100
  ];
}
class TemporalBuffer {
  constructor(maxSize = 30, maxAgeMs = 1200) {
    this.frames = [];
    this.maxSize = maxSize;
    this.maxAgeMs = maxAgeMs;
  }
  push(features, timestamp) {
    const vector = featuresToVector(features);
    this.frames.push({ features, vector, timestamp });
    if (this.frames.length > this.maxSize) this.frames.shift();
    this.evict(timestamp);
  }
  evict(now) {
    const cutoff = now - this.maxAgeMs;
    while (this.frames.length && this.frames[0].timestamp < cutoff) this.frames.shift();
  }
  clear() {
    this.frames = [];
  }
  get length() {
    return this.frames.length;
  }
  get isReady() {
    return this.frames.length >= 8;
  }
  // minimo per decisione
  get values() {
    return this.frames;
  }
  // Statistiche temporali per classificatore
  getROM(key = "kneeRaw") {
    if (this.frames.length < 4) return 0;
    const vals = this.frames.map((f2) => f2.features[key]);
    return Math.max(...vals) - Math.min(...vals);
  }
  getVelocityProfile(key = "kneeRaw") {
    if (this.frames.length < 4) return { mean: 0, max: 0, smoothness: 100 };
    const vels = [];
    for (let i = 1; i < this.frames.length; i++) {
      const dtMs = this.frames[i].timestamp - this.frames[i - 1].timestamp;
      if (dtMs <= 0) continue;
      const delta = this.frames[i].features[key] - this.frames[i - 1].features[key];
      vels.push(Math.abs(delta) / (dtMs / 1e3));
    }
    if (!vels.length) return { mean: 0, max: 0, smoothness: 100 };
    const mean = vels.reduce((a, b) => a + b, 0) / vels.length;
    const max = Math.max(...vels);
    const variance = vels.reduce((s, v) => s + (v - mean) ** 2, 0) / vels.length;
    const smoothness = Math.max(0, 100 - Math.sqrt(variance) * 0.3);
    return { mean, max, smoothness };
  }
  getSymmetryAvg() {
    if (!this.frames.length) return 100;
    return this.frames.reduce((s, f2) => s + f2.features.symmetry, 0) / this.frames.length;
  }
  // Pattern detection: down-up sinusoidale vs rumore (dalla definizione "decreasing then increasing")
  detectDownUpPattern(key = "kneeRaw") {
    if (this.frames.length < 10) return { hasPattern: false, confidence: 0, rom: 0 };
    const vals = this.frames.map((f2) => f2.features[key]);
    const rom = Math.max(...vals) - Math.min(...vals);
    if (rom < 14) return { hasPattern: false, confidence: 0, rom };
    let directionChanges = 0;
    let lastDir = null;
    for (let i = 1; i < vals.length; i++) {
      const diff = vals[i] - vals[i - 1];
      if (Math.abs(diff) < 1.5) continue;
      const dir = diff > 0 ? "up" : "down";
      if (lastDir && dir !== lastDir) directionChanges++;
      lastDir = dir;
    }
    const hasPattern = directionChanges >= 1 && directionChanges <= 3 && rom > 18;
    const confidence = hasPattern ? Math.min(100, 55 + rom * 1.2 - directionChanges * 8) : 0;
    return { hasPattern, confidence, rom };
  }
  // Per crunch/bicycle/ponte o esercizi che usano hipFlex/trunk come primario:
  // stessa logica down-up ma sul segnale flessione (angolo diminuisce in contrazione).
  detectFlexExtendPattern(key = "kneeRaw") {
    if (this.frames.length < 10) return { hasPattern: false, confidence: 0, rom: 0 };
    const vals = this.frames.map((f2) => f2.features[key]);
    const rom = Math.max(...vals) - Math.min(...vals);
    if (rom < 12) return { hasPattern: false, confidence: 0, rom };
    let changes = 0;
    let lastDir = null;
    for (let i = 1; i < vals.length; i++) {
      const diff = vals[i] - vals[i - 1];
      if (Math.abs(diff) < 1.2) continue;
      const dir = diff > 0 ? "up" : "down";
      if (lastDir && dir !== lastDir) changes++;
      lastDir = dir;
    }
    const hasPattern = changes >= 1 && changes <= 3 && rom > 14;
    const confidence = hasPattern ? Math.min(100, 50 + rom * 1.5 - changes * 8) : 0;
    return { hasPattern, confidence, rom };
  }
  getSlice(n2) {
    return this.frames.slice(-n2);
  }
}
const DEFAULTS = {
  // v2.14.2: tuned via 32 fixtures replay (incl. 9 new: squat-shallow/deep, pushup-side/shallow, legraise-bent/fast, twist-slow/shallow, burpee-nojump)
  squat: { minROM: 17, minConfidence: 55, primaryKey: "kneeRaw", idealVel: 120, minInterval: 350 },
  pushup: { minROM: 18, minConfidence: 56, primaryKey: "elbowRaw", idealVel: 145, minInterval: 340 },
  crunch: { minROM: 14, minConfidence: 58, primaryKey: "hipFlexRaw", idealVel: 110, minInterval: 340 },
  affondo: { minROM: 20, minConfidence: 60, primaryKey: "kneeRaw", idealVel: 120, minInterval: 360 },
  ponte: { minROM: 15, minConfidence: 58, primaryKey: "hipFlexRaw", idealVel: 110, minInterval: 340 },
  jumpingJack: { minROM: 16, minConfidence: 60, primaryKey: "kneeRaw", idealVel: 200, minInterval: 300 },
  burpee: { minROM: 16, minConfidence: 58, primaryKey: "kneeRaw", idealVel: 155, minInterval: 360 },
  legraise: { minROM: 16, minConfidence: 56, primaryKey: "hipFlexRaw", idealVel: 115, minInterval: 340 },
  russiantwist: { minROM: 14, minConfidence: 55, primaryKey: "hipFlexRaw", idealVel: 130, minInterval: 320 }
};
const GENERIC = { minROM: 16, minConfidence: 60, primaryKey: "kneeRaw", idealVel: 120, minInterval: 340 };
class TemporalClassifier {
  constructor(exercise, overrides) {
    this.lastCountAt = 0;
    const def = DEFAULTS[exercise] ?? GENERIC;
    this.cfg = {
      exercise,
      minROM: (overrides == null ? void 0 : overrides.minROM) ?? def.minROM ?? 16,
      minConfidence: (overrides == null ? void 0 : overrides.minConfidence) ?? def.minConfidence ?? 60,
      primaryKey: (overrides == null ? void 0 : overrides.primaryKey) ?? (def.primaryKey ?? "kneeRaw"),
      idealVel: (overrides == null ? void 0 : overrides.idealVel) ?? def.idealVel ?? 120,
      minInterval: (overrides == null ? void 0 : overrides.minInterval) ?? def.minInterval ?? 340
    };
  }
  evaluate(buffer, currentFeatures, dwellMs, now) {
    if (!buffer.isReady) {
      return { confidence: 0, shouldCount: false, rom: 0, patternConfidence: 0, velocityScore: 0, symmetryScore: 0, reason: "buffer warming" };
    }
    const { hasPattern, confidence: patternConf, rom } = this.detectPattern(buffer);
    const vel = buffer.getVelocityProfile(this.cfg.primaryKey);
    const sym = buffer.getSymmetryAvg();
    const ideal = this.cfg.idealVel;
    const velocityScore = clamp(100 - Math.abs(vel.mean - ideal) * 0.28 - Math.max(0, vel.max - 520) * 0.12, 0, 100);
    const symmetryScore = clamp(sym, 0, 100);
    const dwellBonus = dwellMs > 55 ? 6 : dwellMs > 30 ? 3 : 0;
    const romScore = rom > this.cfg.minROM + 12 ? 30 : rom > this.cfg.minROM + 5 ? 22 : rom > this.cfg.minROM ? 14 : 0;
    let confidence = 0;
    if (rom < this.cfg.minROM) {
      confidence = clamp(patternConf * 0.25, 0, 40);
    } else {
      confidence = clamp(
        patternConf * 0.45 + velocityScore * 0.22 + symmetryScore * 0.12 + romScore + dwellBonus,
        0,
        100
      );
    }
    const timeOk = now - this.lastCountAt > this.cfg.minInterval;
    const shouldCount = confidence >= this.cfg.minConfidence && hasPattern && rom >= this.cfg.minROM && timeOk;
    const reason = !hasPattern ? "no pattern" : rom < this.cfg.minROM ? `rom ${Math.round(rom)}<${this.cfg.minROM}` : !timeOk ? "debounce" : confidence < this.cfg.minConfidence ? `conf ${Math.round(confidence)}<${this.cfg.minConfidence}` : "ok";
    return { confidence: Math.round(confidence), shouldCount, rom: Math.round(rom), patternConfidence: Math.round(patternConf), velocityScore: Math.round(velocityScore), symmetryScore: Math.round(symmetryScore), reason };
  }
  detectPattern(buffer) {
    return buffer.detectDownUpPattern(this.cfg.primaryKey);
  }
  markCounted(now) {
    this.lastCountAt = now;
  }
  reset() {
    this.lastCountAt = 0;
  }
  updateConfig(patch) {
    this.cfg = { ...this.cfg, ...patch };
  }
}
class ExerciseAnalyzer {
  constructor() {
    this.phase = "READY";
    this.lastTransitionAt = 0;
    this.trough = 180;
    this.peak = 0;
    this.lastRepAt = 0;
    this.temporalBuffer = new TemporalBuffer(30, 1200);
    this.temporalClassifier = null;
    this.worldLandmarks = null;
    this.motionContext = null;
    this.lastFeatures = null;
    this.dwellAtBottom = 0;
    this.bilateralVisEma = {};
    this.bilateralSide = {};
    this.minRepIntervalMs = 320;
    this.minPhaseMs = 120;
  }
  reset() {
    var _a;
    this.phase = "READY";
    this.lastTransitionAt = 0;
    this.trough = 180;
    this.peak = 0;
    this.lastRepAt = 0;
    this.bilateralVisEma = {};
    this.bilateralSide = {};
    this.temporalBuffer.clear();
    (_a = this.temporalClassifier) == null ? void 0 : _a.reset();
    this.lastFeatures = null;
    this.dwellAtBottom = 0;
    this.worldLandmarks = null;
  }
  // Fase 1 wiring: chiamata da FitnessEngine prima di analyze
  setWorldLandmarks(w) {
    this.worldLandmarks = w;
  }
  setMotionContext(c) {
    this.motionContext = c;
  }
  getTemporalClassifier(exercise) {
    if (!this.temporalClassifier) {
      this.temporalClassifier = new TemporalClassifier(exercise);
    }
    return this.temporalClassifier;
  }
  pushTemporalFrame(lm, ts, dtMs) {
    const feats = extractFeatures(lm, this.worldLandmarks, this.lastFeatures, dtMs);
    this.temporalBuffer.push(feats, ts);
    this.lastFeatures = feats;
    if (this.phase === "BOTTOM") this.dwellAtBottom += dtMs;
    else this.dwellAtBottom = 0;
    return feats;
  }
  evaluateTemporalConfidence(feats, ts) {
    if (!this.temporalClassifier) return { confidence: 0, shouldCount: false, debug: "no classifier" };
    const res = this.temporalClassifier.evaluate(this.temporalBuffer, feats, this.dwellAtBottom, ts);
    return { confidence: res.confidence, shouldCount: res.shouldCount, debug: res.reason };
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
    this.minRepIntervalMs = 360;
    this.minPhaseMs = 85;
    this.velFilt = 0;
    this.lastAngle = 180;
    this.lastT = 0;
  }
  analyze(lm, ts, dtMs, q2) {
    const ang = this.bilateralJointAngle("elbow", lm, [LM.left_shoulder, LM.left_elbow, LM.left_wrist], [LM.right_shoulder, LM.right_elbow, LM.right_wrist]);
    const feats = this.pushTemporalFrame(lm, ts, dtMs);
    const temporal = this.getTemporalClassifier("pushup");
    const dt = dtMs || 16;
    const rawV = (ang - this.lastAngle) / (dt / 1e3);
    this.velFilt = this.velFilt * 0.7 + rawV * 0.3;
    const dir = Math.abs(this.velFilt) < 18 ? "hold" : this.velFilt < 0 ? "down" : "up";
    const line = this.bilateralJointAngle("bodyLine", lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
    this.trough = Math.min(this.trough, ang);
    this.peak = Math.max(this.peak, ang);
    let next = this.phase;
    if (this.phase === "READY" && ang < 122) next = "DESCENDING";
    else if (this.phase === "DESCENDING" && ang < 112) next = "BOTTOM";
    else if (this.phase === "BOTTOM" && ang > 123) next = "ASCENDING";
    else if (this.phase === "ASCENDING" && ang > 140) next = "TOP";
    let repInc = false, repConf = 0;
    if (next === "TOP" && (this.phase === "ASCENDING" || this.phase === "BOTTOM")) {
      const rom = this.peak - this.trough;
      const depthOk = this.trough < 112;
      const extOk = ang > 140;
      const velScore = clamp(100 - Math.abs(this.velFilt) * 0.06, 0, 100);
      const alignScore = line > 155 ? 95 : line > 145 ? 78 : 42;
      const romScore = rom > 28 ? 28 : rom > 18 ? 18 : 10;
      const depthBonus = this.trough < 92 ? 8 : this.trough < 102 ? 4 : 0;
      if (depthOk && extOk) {
        repConf = clamp(velScore * 0.32 + alignScore * 0.35 + romScore + depthBonus, 0, 100);
      } else {
        repConf = clamp(velScore * 0.18 + 6, 0, 100);
      }
      const tRes = temporal.evaluate(this.temporalBuffer, feats, this.dwellAtBottom, ts);
      const bufferReady = this.temporalBuffer.length >= 10;
      if (bufferReady) {
        if (!tRes.shouldCount && tRes.rom < 18) repConf = Math.min(repConf, tRes.confidence + 10);
        else repConf = clamp(repConf * 0.6 + tRes.confidence * 0.4, 0, 100);
      }
      const temporalGate = !bufferReady || tRes.shouldCount || tRes.confidence > 48;
      if (depthOk && extOk && repConf > 55 && q2.exerciseConfidence > 36 && temporalGate) {
        if (this.shouldCountRep(ts, repConf, 55)) {
          repInc = true;
          this.lastRepAt = ts;
          temporal.markCounted(ts);
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
  reset() {
    super.reset();
    this.velFilt = 0;
    this.lastAngle = 180;
  }
}
class SquatAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "squat";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26];
    this.minRepIntervalMs = 380;
    this.minPhaseMs = 90;
    this.velFilt = 0;
    this.lastA = 180;
    this.restingHipY = null;
  }
  analyze(lm, ts, dtMs, q2) {
    var _a, _b;
    const ang = this.bilateralJointAngle("knee", lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]);
    const tr2 = this.bilateralJointAngle("trunk", lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
    const feats = this.pushTemporalFrame(lm, ts, dtMs);
    const temporal = this.getTemporalClassifier("squat");
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
    if (this.phase === "READY" && (ang <= 124 || hipYDelta > 0.05)) next = "DESCENDING";
    else if (this.phase === "DESCENDING" && (ang <= 111 || hipYDelta > 0.09)) next = "BOTTOM";
    else if (this.phase === "DESCENDING" && ang > 142 && hipYDelta < 0.05 && this.trough < 124 && this.canTransition(ts, 55)) next = "ASCENDING";
    else if (this.phase === "BOTTOM" && (ang > 138 || hipYDelta < 0.09) && this.canTransition(ts, 65)) next = "ASCENDING";
    else if (this.phase === "ASCENDING" && ang > 144 && this.canTransition(ts, 55)) next = "STANDING";
    let repInc = false, repConf = 0;
    if (next === "STANDING" && (this.phase === "ASCENDING" || this.phase === "BOTTOM" || this.phase === "DESCENDING")) {
      const rom = this.peak - this.trough;
      const depthOk = this.trough < 124;
      const extOk = ang > 140;
      const velScore = clamp(100 - Math.abs(this.velFilt) * 0.06, 0, 100);
      const trunkScore = tr2 > 155 ? 40 : tr2 > 142 ? 30 : 18;
      const romScore = rom > 28 ? 32 : rom > 20 ? 22 : rom > 14 ? 14 : 8;
      const depthBonus = this.trough < 95 ? 10 : this.trough < 108 ? 6 : 0;
      if (depthOk && extOk) {
        repConf = clamp(velScore * 0.32 + romScore + trunkScore + depthBonus, 0, 100);
      } else {
        repConf = clamp(velScore * 0.18 + 6, 0, 100);
      }
      const tRes = temporal.evaluate(this.temporalBuffer, feats, this.dwellAtBottom, ts);
      const bufferReady = this.temporalBuffer.length >= 10;
      if (bufferReady) {
        if (!tRes.shouldCount && tRes.rom < 16) repConf = Math.min(repConf, tRes.confidence + 12);
        else repConf = clamp(repConf * 0.55 + tRes.confidence * 0.45, 0, 100);
      }
      const temporalGate = !bufferReady || tRes.shouldCount || tRes.confidence > 50;
      if (depthOk && extOk && repConf > 55 && q2.exerciseConfidence > 36 && temporalGate) {
        if (this.shouldCountRep(ts, repConf, 55)) {
          repInc = true;
          this.lastRepAt = ts;
          temporal.markCounted(ts);
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
    const temporalDbg = this.temporalBuffer.length >= 8 ? this.temporalBuffer.getROM("kneeRaw") : 0;
    return { phase: this.phase, enginePhase: eng, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: ang, secondaryAngles: { trunk: tr2, hipY, temporalROM: Math.round(temporalDbg) }, velocity: this.velFilt, direction: dir };
  }
  reset() {
    super.reset();
    this.restingHipY = null;
    this.velFilt = 0;
    this.lastA = 180;
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
    const feats = this.pushTemporalFrame(lm, ts, dtMs);
    const temporal = this.getTemporalClassifier("crunch");
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
      const tRes = temporal.evaluate(this.temporalBuffer, feats, this.dwellAtBottom, ts);
      if (this.temporalBuffer.length >= 10) repConf = clamp(repConf * 0.6 + tRes.confidence * 0.4, 0, 100);
      const temporalGate = this.temporalBuffer.length < 10 || tRes.shouldCount || tRes.confidence > 50;
      if (contractOk && extOk && repConf > 58 && q2.exerciseConfidence > 38 && temporalGate) {
        if (this.shouldCountRep(ts, repConf, 58)) {
          repInc = true;
          this.lastRepAt = ts;
          temporal.markCounted(ts);
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
  reset() {
    super.reset();
    this.velFilt = 0;
    this.lastA = 120;
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
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
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
    return { phase: this.phase, enginePhase: "ready", repIncrement: false, repConfidence: 0, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: line, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), hip, line }, velocity: 0, direction: "hold" };
  }
  reset() {
    super.reset();
    this.goodSince = null;
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
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
    this.getTemporalClassifier("legraise");
    const hipFlex = this.bilateralJointAngle("hipFlex", lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
    const lk = this.bilateralJointAngle("kneeExt", lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]);
    const dt = dtMs || 16;
    const rawV = (hipFlex - this.lastA) / (dt / 1e3);
    this.velFilt = this.velFilt * 0.75 + rawV * 0.25;
    const dir = Math.abs(this.velFilt) < 18 ? "hold" : this.velFilt < 0 ? "down" : "up";
    this.trough = Math.min(this.trough, hipFlex);
    this.peak = Math.max(this.peak, hipFlex);
    let next = this.phase;
    if (this.phase === "READY" && hipFlex < 147) next = "RAISING";
    else if (this.phase === "RAISING" && hipFlex < 108) next = "TOP";
    else if (this.phase === "TOP" && hipFlex > 115) next = "LOWERING";
    else if (this.phase === "LOWERING" && hipFlex > 145) next = "DOWN";
    let repInc = false, repConf = 0;
    if (next === "DOWN" && (this.phase === "LOWERING" || this.phase === "TOP")) {
      const rom = this.peak - this.trough;
      const topOk = this.trough < 110;
      const downOk = hipFlex > 145;
      const kneeScore = lk > 155 ? 18 : lk > 142 ? 10 : 2;
      if (topOk && downOk) {
        repConf = clamp(52 + kneeScore + (rom > 42 ? 14 : rom > 28 ? 8 : 4) + (Math.abs(this.velFilt) < 360 ? 8 : 0), 0, 100);
      } else {
        repConf = clamp(12, 0, 100);
      }
      if (topOk && downOk && repConf > 58 && q2.exerciseConfidence > 36) {
        if (this.shouldCountRep(ts, repConf, 58)) {
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
    return { phase: this.phase, enginePhase: eng, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: hipFlex, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), kneeExt: lk }, velocity: this.velFilt, direction: dir };
  }
  reset() {
    super.reset();
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
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
    this.getTemporalClassifier("flutterkick");
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
    return { phase: this.phase, enginePhase: this.phase === "LEFT_UP" ? "down" : "ready", repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: mean, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), lHip, rHip, asym }, velocity: 0, direction: "hold" };
  }
  reset() {
    super.reset();
  }
}
class DeadBugAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "deadbug";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26, 13, 14, 15, 16];
  }
  analyze(lm, ts, _dt, q2) {
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
    this.getTemporalClassifier("deadbug");
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
    return { phase: this.phase, enginePhase: this.phase === "EXTENDED" ? "bottom" : this.phase === "TUCKED" ? "down" : "ready", repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: (lHip + rHip) / 2, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), lHip, rHip, lSh, rSh }, velocity: 0, direction: "hold" };
  }
  reset() {
    super.reset();
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
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
    this.getTemporalClassifier("vup");
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
    return { phase: this.phase, enginePhase: eng, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: pike, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), kneeExt: lk }, velocity: this.velFilt, direction: dir };
  }
  reset() {
    super.reset();
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
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
    this.getTemporalClassifier("mountainclimber");
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
    return { phase: this.phase, enginePhase: repInc ? "up" : "down", repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: driving, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), lHip, rHip, trunk }, velocity: 0, direction: "hold" };
  }
  reset() {
    super.reset();
  }
}
class JumpingJackAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "jumpingjack";
    this.requiredLandmarks = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];
  }
  analyze(lm, ts, dtMs, q2) {
    var _a;
    const feats = this.pushTemporalFrame(lm, ts, dtMs || 16);
    const temporal = this.getTemporalClassifier("jumpingjack");
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
      const tRes = temporal.evaluate(this.temporalBuffer, feats, this.dwellAtBottom, ts);
      if (this.temporalBuffer.length >= 8) repConf = clamp(repConf * 0.65 + tRes.confidence * 0.35, 0, 100);
      const motionOk = !((_a = this.motionContext) == null ? void 0 : _a.hasData) || this.motionContext.rhythmHz > 0.4;
      if (partialOk && repConf > 55 && q2.exerciseConfidence > 38 && motionOk && this.shouldCountRep(ts, repConf, 55)) {
        repInc = true;
        this.lastRepAt = ts;
        temporal.markCounted(ts);
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
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
    this.getTemporalClassifier("bicyclecrunch");
    const le = lm[LM.left_elbow], rk = lm[LM.right_knee], re = lm[LM.right_elbow], lk = lm[LM.left_knee];
    if (!le || !rk || !re || !lk) return { phase: this.phase, enginePhase: "ready", repIncrement: false, repConfidence: 0, formScore: 70, poseQuality: q2, cues: [], primaryAngle: 0, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")) }, velocity: 0, direction: "hold" };
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
    return { phase: this.phase, enginePhase: this.phase === "CONTRACTED" ? "bottom" : "down", repIncrement: repInc, repConfidence: repConf, formScore: clamp(87, 0, 100), poseQuality: q2, cues: [], primaryAngle: best, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), d1, d2 }, velocity: 0, direction: "hold" };
  }
  reset() {
    super.reset();
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
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
    this.getTemporalClassifier("heeltap");
    const lw = lm[LM.left_wrist], lh = lm[LM.left_heel], rw = lm[LM.right_wrist], rh = lm[LM.right_heel];
    if (!lw || !lh || !rw || !rh) return { phase: this.phase, enginePhase: "ready", repIncrement: false, repConfidence: 0, formScore: 70, poseQuality: q2, cues: [], primaryAngle: 0, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")) }, velocity: 0, direction: "hold" };
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
    return { phase: this.phase, enginePhase: this.phase === "LEFT" || this.phase === "RIGHT" ? "bottom" : "down", repIncrement: repInc, repConfidence: repConf, formScore: 88, poseQuality: q2, cues: [], primaryAngle: best, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), dL, dR }, velocity: 0, direction: "hold" };
  }
  reset() {
    super.reset();
  }
}
class BurpeeAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "burpee";
    this.requiredLandmarks = [23, 24, 25, 26, 27, 28, 11, 12, 13, 14];
  }
  analyze(lm, ts, dtMs, q2) {
    var _a, _b, _c, _d;
    this.pushTemporalFrame(lm, ts, dtMs || 16);
    this.getTemporalClassifier("burpee");
    const knee = (angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle) + angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle)) / 2;
    const elbow = (angleFromLandmarks(lm, LM.left_shoulder, LM.left_elbow, LM.left_wrist) + angleFromLandmarks(lm, LM.right_shoulder, LM.right_elbow, LM.right_wrist)) / 2;
    const hipY = ((((_a = lm[LM.left_hip]) == null ? void 0 : _a.y) ?? 0.5) + (((_b = lm[LM.right_hip]) == null ? void 0 : _b.y) ?? 0.5)) / 2;
    let repInc = false, repConf = 0;
    const standing = knee > 138 && hipY < 0.65;
    const squat = knee < 112;
    const handsDown = hipY > 0.56 && Math.min(((_c = lm[LM.left_wrist]) == null ? void 0 : _c.y) ?? 1, ((_d = lm[LM.right_wrist]) == null ? void 0 : _d.y) ?? 1) > 0.6;
    const plank = elbow > 142 && knee > 132;
    const jump = hipY < 0.54 && knee > 142 && Math.abs(knee - 150) < 32;
    if (this.phase === "READY" && squat) this.phase = "SQUAT";
    else if (this.phase === "SQUAT" && handsDown) this.phase = "HANDS_DOWN";
    else if (this.phase === "HANDS_DOWN" && plank) this.phase = "PLANK";
    else if (this.phase === "PLANK" && squat) this.phase = "RETURN";
    else if (this.phase === "RETURN" && standing) this.phase = "STANDING";
    else if (this.phase === "STANDING" && jump) {
      repConf = clamp(68 + (q2.exerciseConfidence > 58 ? 10 : 0) + (Math.abs(elbow - 160) < 20 ? 6 : 0), 0, 100);
      if (repConf > 58 && q2.exerciseConfidence > 36 && this.shouldCountRep(ts, repConf, 58)) {
        repInc = true;
        this.lastRepAt = ts;
        this.phase = "READY";
      }
    } else if (this.phase === "STANDING" && standing && ts - this.lastTransitionAt > 850) {
      repConf = clamp(62 + (q2.exerciseConfidence > 58 ? 8 : 0), 0, 100);
      if (repConf > 58 && q2.exerciseConfidence > 36 && this.shouldCountRep(ts, repConf, 58)) {
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
    const feats = this.pushTemporalFrame(lm, ts, dtMs);
    const temporal = this.getTemporalClassifier("affondo");
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
      const tRes = temporal.evaluate(this.temporalBuffer, feats, this.dwellAtBottom, ts);
      if (this.temporalBuffer.length >= 10) repConf = clamp(repConf * 0.6 + tRes.confidence * 0.4, 0, 100);
      const temporalGate = this.temporalBuffer.length < 10 || tRes.shouldCount || tRes.confidence > 52;
      if (depthOk && extOk && repConf > 58 && q2.exerciseConfidence > 38 && temporalGate && this.shouldCountRep(ts, repConf, 58)) {
        repInc = true;
        this.lastRepAt = ts;
        temporal.markCounted(ts);
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
  reset() {
    super.reset();
    this.velFilt = 0;
    this.lastA = 160;
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
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
    this.getTemporalClassifier("skater");
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
    return { phase: this.phase, enginePhase: this.phase === "LANDED" ? "bottom" : "ready", repIncrement: repInc, repConfidence: repConf, formScore: clamp(88, 0, 100), poseQuality: q2, cues: [], primaryAngle: spread * 100, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), knee, spread, velX: this.velX }, velocity: this.velX * 100, direction: Math.abs(this.velX) < 0.2 ? "hold" : this.velX > 0 ? "up" : "down" };
  }
  reset() {
    super.reset();
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
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
    this.getTemporalClassifier("ginocchiaalte");
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
    return { phase: this.phase, enginePhase: kneeUp ? "down" : "ready", repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues: form < 72 ? ["kneesToChest"] : [], primaryAngle: driving, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), l: l2, r, trunk }, velocity: 0, direction: "hold" };
  }
  reset() {
    super.reset();
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
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
    this.getTemporalClassifier("superman");
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
    return { phase: this.phase, enginePhase: this.phase === "UP" ? "bottom" : "down", repIncrement: repInc, repConfidence: repConf, formScore: 88, poseQuality: q2, cues: [], primaryAngle: hip, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), hip }, velocity: 0, direction: "hold" };
  }
  reset() {
    super.reset();
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
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
    this.getTemporalClassifier("ponte");
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
    return { phase: this.phase, enginePhase: eng, repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: hip, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), trunk }, velocity: this.velFilt, direction: dir };
  }
  reset() {
    super.reset();
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
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
    this.getTemporalClassifier("russiantwist");
    const lw = lm[LM.left_wrist], rw = lm[LM.right_wrist];
    if (!lw || !rw) return { phase: this.phase, enginePhase: "ready", repIncrement: false, repConfidence: 0, formScore: 70, poseQuality: q2, cues: [], primaryAngle: 0, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")) }, velocity: 0, direction: "hold" };
    const midHip = { x: (lm[LM.left_hip].x + lm[LM.right_hip].x) / 2, y: (lm[LM.left_hip].y + lm[LM.right_hip].y) / 2 };
    const tl = torsoLength(lm);
    const n2 = tl > 1e-6 ? 1 / tl : 1;
    const left = Math.abs(lw.x - midHip.x) * n2, right = Math.abs(rw.x - midHip.x) * n2;
    const maxL = Math.max(left, right);
    const centered = maxL < 0.55;
    const twisted = maxL > 0.66;
    let repInc = false, repConf = 0;
    if (this.phase === "READY" && centered) this.phase = "CENTER";
    else if (this.phase === "CENTER" && twisted) {
      const side = left > right ? "left" : "right";
      if (this.lastSide && this.lastSide !== side) {
        repConf = clamp(68 + (q2.exerciseConfidence > 55 ? 6 : 0), 0, 100);
        if (repConf > 55 && q2.exerciseConfidence > 36 && this.shouldCountRep(ts, repConf, 55)) {
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
    return { phase: this.phase, enginePhase: this.phase === "LEFT" || this.phase === "RIGHT" ? "bottom" : "down", repIncrement: repInc, repConfidence: repConf, formScore: 86, poseQuality: q2, cues: [], primaryAngle: maxL * 100, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), left, right }, velocity: 0, direction: "hold" };
  }
  reset() {
    super.reset();
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
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
    this.getTemporalClassifier("wallsit");
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
    return { phase: this.phase, enginePhase: "ready", repIncrement: false, repConfidence: 0, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: k2, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), trunk }, velocity: 0, direction: "hold" };
  }
  reset() {
    super.reset();
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
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
    this.getTemporalClassifier("sideplank");
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
    return { phase: this.phase, enginePhase: "ready", repIncrement: false, repConfidence: 0, formScore: clamp(form, 0, 100), poseQuality: q2, cues, primaryAngle: line, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), line }, velocity: 0, direction: "hold" };
  }
  reset() {
    super.reset();
  }
}
class PlankJackAnalyzer extends ExerciseAnalyzer {
  constructor() {
    super(...arguments);
    this.id = "plankjack";
    this.requiredLandmarks = [11, 12, 23, 24, 25, 26, 27, 28];
  }
  analyze(lm, ts, _dt, q2) {
    this.pushTemporalFrame(lm, ts, (arguments[2] ?? 16) || 16);
    this.getTemporalClassifier("plankjack");
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
    return { phase: this.phase, enginePhase: this.phase === "FEET_APART" ? "bottom" : "down", repIncrement: repInc, repConfidence: repConf, formScore: clamp(form, 0, 100), poseQuality: q2, cues: plankOk ? [] : ["coreTight"], primaryAngle: spread * 100, secondaryAngles: { temporalROM: Math.round(this.temporalBuffer.getROM("kneeRaw")), line, spread }, velocity: 0, direction: "hold" };
  }
  reset() {
    super.reset();
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
class MotionFusion {
  constructor() {
    this.enabled = false;
    this.lastMagnitude = 0;
    this.impactHistory = [];
    this.accelHandler = null;
    this.removeCapacitorListener = null;
  }
  enable() {
    if (this.enabled) return;
    this.enabled = true;
    try {
      this.listen();
    } catch {
    }
  }
  disable() {
    this.enabled = false;
    try {
      if (this.removeCapacitorListener) this.removeCapacitorListener();
    } catch {
    }
    try {
      if (this.accelHandler) window.removeEventListener("devicemotion", this.accelHandler);
    } catch {
    }
    this.removeCapacitorListener = null;
    this.accelHandler = null;
  }
  async listen() {
    try {
      const mod = await __vitePreload(() => import("./index-aK3jCnQG.js"), true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url).catch(() => null);
      const Motion = mod == null ? void 0 : mod.Motion;
      if (Motion && typeof Motion.addListener === "function") {
        const listener = await Motion.addListener("accel", (event) => {
          const a = event.accelerationIncludingGravity ?? event.acceleration ?? event;
          const x = a.x ?? 0;
          const y = a.y ?? 0;
          const z = a.z ?? 0;
          const mag = Math.hypot(x, y, z);
          this.lastMagnitude = mag;
          this.impactHistory.push(mag);
          if (this.impactHistory.length > 60) this.impactHistory.shift();
        });
        this.removeCapacitorListener = () => {
          var _a;
          try {
            if (listener && typeof listener.remove === "function") listener.remove();
            else (_a = Motion.removeAllListeners) == null ? void 0 : _a.call(Motion);
          } catch {
          }
        };
        return;
      }
    } catch {
    }
    if (typeof window === "undefined" || !("DeviceMotionEvent" in window)) return;
    this.accelHandler = (e) => {
      const a = e.accelerationIncludingGravity ?? e.acceleration;
      if (!a) return;
      const mag = Math.hypot(a.x ?? 0, a.y ?? 0, a.z ?? 0);
      this.lastMagnitude = mag;
      this.impactHistory.push(mag);
      if (this.impactHistory.length > 60) this.impactHistory.shift();
    };
    window.addEventListener("devicemotion", this.accelHandler, { passive: true });
    try {
      const DM = window.DeviceMotionEvent;
      if (DM && typeof DM.requestPermission === "function") {
      }
    } catch {
    }
  }
  getImpactScore() {
    if (!this.enabled || this.impactHistory.length < 5) return 0;
    const avg = this.impactHistory.reduce((s, v) => s + v, 0) / this.impactHistory.length;
    return Math.min(100, Math.max(0, (this.lastMagnitude - avg) * 18 + 50));
  }
  getRhythmHz() {
    if (this.impactHistory.length < 20) return 0;
    let peaks = 0;
    for (let i = 1; i < this.impactHistory.length - 1; i++) {
      if (this.impactHistory[i] > this.impactHistory[i - 1] && this.impactHistory[i] > this.impactHistory[i + 1] && this.impactHistory[i] > 12)
        peaks++;
    }
    return peaks / (this.impactHistory.length / 30);
  }
  isEnabled() {
    return this.enabled;
  }
  hasData() {
    return this.impactHistory.length >= 5;
  }
}
class FitnessEngine {
  constructor(cfg) {
    this.analyzer = null;
    this.motionFusion = null;
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
    this.repQualityHistory = [];
    this.repDurationsMs = [];
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
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
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
        const worldLm = result.worldLandmarks ?? null;
        if (this.motionFusion && this.analyzer.setMotionContext) {
          this.analyzer.setMotionContext({
            impactScore: this.motionFusion.getImpactScore(),
            rhythmHz: this.motionFusion.getRhythmHz(),
            hasData: this.motionFusion.hasData(),
            enabled: this.motionFusion.isEnabled()
          });
        }
        if (worldLm && this.analyzer.setWorldLandmarks) {
          this.analyzer.setWorldLandmarks(worldLm);
        }
        const aRes = this.analyzer.analyze(lm, now, dtAna, pqForAna);
        if (((_d = this.motionFusion) == null ? void 0 : _d.hasData()) && ["jumpingjack", "burpee", "ginocchiaalte", "mountainclimber", "skater"].includes(this.def.id)) {
          const impact = this.motionFusion.getImpactScore();
          const rhythm = this.motionFusion.getRhythmHz();
          if (rhythm > 0.5 && rhythm < 3.5 && impact > 45) {
            aRes.repConfidence = Math.min(100, aRes.repConfidence + Math.round((impact - 45) * 0.15));
          }
          aRes.secondaryAngles = { ...aRes.secondaryAngles, motionImpact: Math.round(impact), motionRhythm: Math.round(rhythm * 10) / 10 };
        }
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
        if (aRes.phase !== this.currentPhase) (_e = this.onPhaseChange) == null ? void 0 : _e.call(this, aRes.enginePhase, this.currentForm);
        if (aRes.repIncrement) {
          const repDuration = this.lastRepAt ? now - this.lastRepAt : this.startedAt ? now - this.startedAt : 0;
          this.reps += 1;
          this.lastRepAt = now;
          this.lastRepQuality = aRes.formScore;
          this.lastRepConfidence = aRes.repConfidence;
          this.qualityWindow.push(aRes.formScore);
          if (this.qualityWindow.length > (this.cfg.qualitySmoothingWindow ?? 5)) this.qualityWindow.shift();
          this.repQualityHistory.push(aRes.formScore);
          this.repDurationsMs.push(repDuration);
          if (this.repQualityHistory.length > 30) {
            this.repQualityHistory.shift();
            this.repDurationsMs.shift();
          }
          this.avgQuality = this.qualityWindow.reduce((a, b) => a + b, 0) / this.qualityWindow.length;
          const evt = { repIndex: this.reps, timestampMs: now, durationMs: repDuration, peakAngle: this.peakInRep, troughAngle: this.troughInRep, quality: aRes.formScore, cues: aRes.cues, velocity: aRes.velocity, confidence: aRes.repConfidence };
          (_f = this.onRep) == null ? void 0 : _f.call(this, evt);
          try {
            (_g = navigator.vibrate) == null ? void 0 : _g.call(navigator, 28);
          } catch {
          }
          this.troughInRep = aRes.primaryAngle;
          this.peakInRep = aRes.primaryAngle;
          this.sm.consumeRep(now, aRes.primaryAngle);
          this.currentPhase = "ready";
          (_h = this.onPhaseChange) == null ? void 0 : _h.call(this, "ready", this.currentForm);
        }
        if ((_i = this.def) == null ? void 0 : _i.isHold) {
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
        const formEvalTmp = ((_j = this.def) == null ? void 0 : _j.evaluateForm(lm, {}, this.currentPhase, { velocity: 0, direction: "hold", visibility: pqTmp.exerciseConfidence / 100, repCount: this.reps })) ?? { quality: 0 };
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
      if ((_k = this.def) == null ? void 0 : _k.customTransition) {
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
      const formEval = ((_l = this.def) == null ? void 0 : _l.evaluateForm(lm, { ...secondary, knee: primaryAngle, primary: primaryAngle }, phase, {
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
        (_m = this.onPhaseChange) == null ? void 0 : _m.call(this, phase, form);
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
        this.repQualityHistory.push(repQuality);
        this.repDurationsMs.push(repDuration);
        if (this.repQualityHistory.length > 30) {
          this.repQualityHistory.shift();
          this.repDurationsMs.shift();
        }
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
        (_n = this.onRep) == null ? void 0 : _n.call(this, evt);
        try {
          (_o = navigator.vibrate) == null ? void 0 : _o.call(navigator, 28);
        } catch {
        }
        this.troughInRep = primaryAngle;
        this.peakInRep = primaryAngle;
        this.sm.consumeRep(now, primaryAngle);
        this.currentPhase = "ready";
        (_p = this.onPhaseChange) == null ? void 0 : _p.call(this, "ready", form);
      }
      if ((_q = this.def) == null ? void 0 : _q.isHold) {
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
    const landmarkerOpts = { modelVariant: "auto" };
    this.landmarker = new PoseLandmarkerManager(landmarkerOpts, cfg.enableFiltering !== false);
    if (def.isHold) this.landmarker.setSmoothingTuning(0.85, 5e-3);
    else if (["mountainclimber", "jumpingjack", "burpee", "ginocchiaalte", "skater"].includes(def.id)) this.landmarker.setSmoothingTuning(1.25, 0.01);
    else if (["pushup", "squat", "affondo", "ponte"].includes(def.id)) this.landmarker.setSmoothingTuning(1.05, 6e-3);
    else this.landmarker.setSmoothingTuning(1.15, 8e-3);
    this.onRep = cfg.onRep;
    this.onPhaseChange = cfg.onPhaseChange;
    this.onMetrics = cfg.onMetrics;
    if (cfg.enableMotionFusion && ["jumpingjack", "burpee", "ginocchiaalte", "mountainclimber", "skater"].includes(def.id)) {
      this.motionFusion = new MotionFusion();
    }
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
      repQualityHistory: this.repQualityHistory.slice(),
      repDurationsMs: this.repDurationsMs.slice(),
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
    if (this.motionFusion) {
      try {
        this.motionFusion.enable();
      } catch {
      }
    }
  }
  /** Attach a different video element (e.g. after remount) without re-init model. */
  attachVideo(video) {
    this.video = video;
  }
  updateExercise(exerciseId) {
    var _a;
    const nid = normalizeExerciseId(exerciseId);
    const def = getDefinition(nid);
    if (!def) return;
    this.def = def;
    this.analyzer = getAnalyzer(nid);
    this.cfg.exerciseId = nid;
    const thresholds = { ...def.thresholds, ...this.cfg.thresholdsOverride ?? {} };
    this.sm = new HysteresisStateMachine(thresholds);
    this.resetCounters();
    if (def.isHold) this.landmarker.setSmoothingTuning(0.85, 5e-3);
    else if (["mountainclimber", "jumpingjack", "burpee", "ginocchiaalte", "skater"].includes(def.id)) this.landmarker.setSmoothingTuning(1.25, 0.01);
    else if (["pushup", "squat", "affondo", "ponte"].includes(def.id)) this.landmarker.setSmoothingTuning(1.05, 6e-3);
    else this.landmarker.setSmoothingTuning(1.15, 8e-3);
    if (this.cfg.enableMotionFusion && ["jumpingjack", "burpee", "ginocchiaalte", "mountainclimber", "skater"].includes(def.id)) {
      if (!this.motionFusion) this.motionFusion = new MotionFusion();
      try {
        this.motionFusion.enable();
      } catch {
      }
    } else {
      try {
        (_a = this.motionFusion) == null ? void 0 : _a.disable();
      } catch {
      }
      if (!this.cfg.enableMotionFusion) this.motionFusion = null;
      else if (!["jumpingjack", "burpee", "ginocchiaalte", "mountainclimber", "skater"].includes(def.id)) this.motionFusion = null;
    }
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
    this.repQualityHistory = [];
    this.repDurationsMs = [];
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
    var _a;
    this.stop();
    this.landmarker.close();
    try {
      (_a = this.motionFusion) == null ? void 0 : _a.disable();
    } catch {
    }
  }
  getMotionFusion() {
    return this.motionFusion;
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
function fmtMs(ms) {
  const s = Math.floor(ms / 1e3);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}
function FitnessEngineView({ exercise = "squat", lang = "it", onClose, onRep, onDone, enableMotionFusion = false }) {
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
  const lastCoachAt = reactExports.useRef(0);
  reactExports.useEffect(() => {
    if (!lastForm || lastForm.quality >= 60 || !lastForm.cues[0]) return;
    const now = Date.now();
    if (now - lastCoachAt.current < 4e3) return;
    lastCoachAt.current = now;
    const cue = localizedCue(lastForm.cues[0], lang);
    setCoachingText(cue);
    if (speechRef.current) speechRef.current.speakCue(lastForm.cues[0]);
  }, [lastForm, lang]);
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
        enableMotionFusion,
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
  }, [exId, lang, speechOn, onRep, enableMotionFusion]);
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: `${INK}CC`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: "10px 12px", textAlign: "center" }, "aria-live": "polite", "aria-atomic": "true", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: "REPS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", role: "status", "aria-live": "polite", style: { color: BLAZE, fontSize: 28, lineHeight: 1 }, children: reps }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 9 }, children: (metrics == null ? void 0 : metrics.currentPhase) ?? "—" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: `${INK}CC`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: "10px 12px", textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: "TIME" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 22, lineHeight: 1 }, children: fmtMs((metrics == null ? void 0 : metrics.elapsedMs) ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: [
          "active ",
          fmtMs((metrics == null ? void 0 : metrics.elapsedActiveMs) ?? 0)
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
const CHANGELOG_VERSION = "2.14.1";
const CHANGELOG_STORAGE_KEY = `o40_changelog_${CHANGELOG_VERSION}`;
const COPY = {
  it: {
    badge: "NUOVO v2.14.1",
    title: "Statistiche — Grafica Premium (v2.14.1)",
    subtitle: "v2.14.1 · 28 Agosto 2026 · DogTag accent + chart gradient + heatmap",
    intro: "Batch statistiche: DogTag accent, PR glass, Bar gradient + tooltip blur, heatmap 6px glow, calendar 8px.",
    groups: [
      {
        icon: "🌑",
        title: "1-2. OLED Depth + Card System",
        items: [
          "INK #0E100D vignette + radial gradient 130% — phone più profondo, camo 5px",
          "o40-card unificato: linear 165° + hairline rgba(184,174,140,0.14) + gloss 07→22",
          "o40-card-face hairline top 1px + accent 3px, numeri tabular-nums glow"
        ]
      },
      {
        icon: "🔥",
        title: "3-4. Tipografia + CTA Blaze Light",
        items: [
          "Bebas + Inter sharpened, num-glow drop-shadow + on-state BLAZE 66 halo",
          "primaryBtn / o40-cta: BLAZE_LIGHT→BLAZE→DEEP + inset highlight + press 0.97",
          "primaryBtnLarge shadow 10/28, iconCircle border OLIVE_LIGHT 55"
        ]
      },
      {
        icon: "🧭",
        title: "5-6. Nav OLED + HUD Tactical",
        items: [
          "TopBar/BottomNav glass blur 14px, #0E100D 92-94%, shadow -8px 24px",
          "BottomNav pill 46×28 con top underline + bottom line BLAZE glow",
          "HUD 4 angoli + AI stage scanline 0.62 + inset 70px blur"
        ]
      },
      {
        icon: "✨",
        title: "7-8. Micro + Skeleton",
        items: [
          "screenIn 0.5s, card stagger 20/60/100ms, ticker 28s, ringSpin 5s",
          "Skeleton 20-50-80% gradient 1.4s, loadbar 5px, toast 0.3s spring",
          "Hover lift -3px 16/36px shadow (desktop), active 0.985"
        ]
      },
      {
        icon: "🎨",
        title: "9-10. Aura & Coesione",
        items: [
          "Aura 28s + phone::after vignette 62-100%, grid 0.42, embers 0.9",
          "Tokens nuovi: INK_3 #121410, PAPER_SOFT, OLIVE_LIGHT, KHAKI_LIGHT, BLAZE_LIGHT",
          "Tracking 2.0 invariato (103 test) + push/voice fix 2.10.x inclusi"
        ]
      },
      {
        icon: "💎",
        title: "11-13. Extra 3 Loop (v2.11.1)",
        items: [
          "Hero o40-ring-border shadow 12/36 + embers brightness 1.08",
          "Card-face shadow 5/18 + accent glow 45%, ticker 48px gap + glass blur 15px",
          "Fix white-screen BLAZE_LIGHT import — #root ora renderizza"
        ]
      },
      {
        icon: "🚀",
        title: "14-23. Full-App 10 Loop (v2.12)",
        items: [
          "Color OLED #0B0D0A 135% + card radius 16 + selected BLAZE glow",
          "Typo display 0.06em + mono tnum, icon halo, nav pill safe-area",
          "Hero overlay, HUD timer glow, recharts dark tooltip, input focus 3px + cohesion easing"
        ]
      },
      {
        icon: "♿",
        title: "24-27. Roadmap Batch (v2.12.1)",
        items: [
          "A11y focus-visible + aria-live reps + prefers-reduced-motion + print",
          "Library debounce 180ms + highlight BLAZE33 + empty 🔍 + LargeText fix",
          "CSV ai_quality/ai_reps + QR 72px share + ROADMAP docs"
        ]
      },
      {
        icon: "📳",
        title: "28-29. IMU + BeforeAfter (v2.12.2)",
        items: [
          "MotionFusion opt-in (IMU) per jumpingJack/burpee/skater — toggle in Impostazioni",
          "BeforeAfter pinch-zoom 1-3× + wheel + double-tap + haptics sul confronto",
          "Engine enableMotionFusion flag + wiring SessionAIOverlay/FitnessEngineView"
        ]
      },
      {
        icon: "❤️",
        title: "30-32. HR + NEFFEX + PWA (v2.12.3)",
        items: [
          "Apple Health HR avg last 20 records + toast HR bpm",
          "NEFFEX crossfade 1.2s + shuffle seed giornaliero deterministico",
          "PWA install banner solo dopo 2 sessioni + dismissed flag"
        ]
      },
      {
        icon: "🎓",
        title: "33-34. Onboarding + Clip (v2.13)",
        items: [
          "Onboarding 3 step con dots, Avanti/Salta, tourStep state",
          "Clip alias: plank→wallsit, jumpingjack→burpee, mountain→skater, affondo→squat",
          "Offline models check + hasClip fallback polish"
        ]
      },
      {
        icon: "🏕️",
        title: "35-37. Camp 2.0 + TEMPO + Coach (v2.14)",
        items: [
          "Camp 2.0: recovery ogni 7 (D) + deload week 22-28 (D/K/H/I)",
          "TEMPO metronomo 40-60 BPM con toggle + slider in Impostazioni",
          "Coach 2.0: TTS cue form<60 via SpeechCoach ogni 4s"
        ]
      },
      {
        icon: "📊",
        title: "38-40. Statistiche Premium (v2.14.1)",
        items: [
          "Hero DogTag accent + PR glass 16px con icone Flame/Crown/Ruler",
          "Bar kcal gradient + tooltip blur + monthly trend 6px glow",
          "Heatmap 6px + year 4px + calendar 8px con border/shadow"
        ]
      }
    ],
    cta: "PROVA ORA",
    ctaHint: "Home → Missione → Avvia · https://mikweb.eu/operator40/ — PWA + iOS",
    dismiss: "Non mostrare più",
    close: "Chiudi",
    footer: "Tutto on-device. 40 iterazioni. Prossimo: v2.15 Social + Watch."
  },
  en: {
    badge: "NEW v2.14.1",
    title: "Statistics — Premium Graphics (v2.14.1)",
    subtitle: "v2.14.1 · Aug 28 2026 · DogTag accent + chart gradient + heatmap",
    intro: "Statistics batch: DogTag accent, PR glass, Bar gradient + tooltip blur, heatmap 6px glow, calendar 8px.",
    groups: [
      { icon: "🌑", title: "1-2. OLED Depth + Card", items: ["INK #0E100D vignette + 130% radial — deeper phone, 5px camo", "Unified card 165° + hairline + gloss", "Card-face hairline + accent + tabular glow"] },
      { icon: "🔥", title: "3-4. Typography + CTA", items: ["Bebas/Inter sharpened, num-glow halo", "CTA BLAZE_LIGHT→DEEP + inset highlight", "Large btn shadow 10/28"] },
      { icon: "🧭", title: "5-6. Nav + HUD", items: ["Top/bottom glass blur 14px, OLED #0E100D", "Pill 46×28 + BLAZE glow lines", "HUD 4 corners + AI scanline 0.62"] },
      { icon: "✨", title: "7-8. Micro + Skeleton", items: ["screenIn 0.5s, card stagger, ticker 28s", "Skeleton 1.4s, loadbar 5px", "Hover -3px lift"] },
      { icon: "🎨", title: "9-10. Aura & Cohesion", items: ["Aura 28s + vignette, grid 0.42", "New tokens INK_3, PAPER_SOFT, etc.", "Tracking 103 tests intact"] },
      { icon: "💎", title: "11-13. Extra 3 Loops", items: ["Hero shadow 12/36 + embers 1.08", "Card-face 5/18 + accent glow", "White-screen fix — root now renders"] },
      { icon: "🚀", title: "14-23. Full-App 10 Loops", items: ["Color OLED #0B0D0A + card 16 + selected glow", "Typo + icon halo + nav pill", "HUD timer + viz tooltip + focus + cohesion"] },
      { icon: "♿", title: "24-27. Roadmap Batch", items: ["Focus-visible + aria-live reps + prefers-motion + print", "Library debounce 180ms + highlight + empty + LargeText", "CSV ai_quality/ai_reps + QR 72px share"] },
      { icon: "📳", title: "28-29. IMU + BeforeAfter", items: ["MotionFusion opt-in for jumpingJack/burpee", "BeforeAfter pinch-zoom 1-3x + haptics", "Engine enableMotionFusion wiring"] },
      { icon: "❤️", title: "30-32. HR + NEFFEX + PWA", items: ["Health HR avg last 20 + toast", "NEFFEX crossfade 1.2s + daily seed", "PWA banner after 2 sessions"] },
      { icon: "🎓", title: "33-34. Onboarding + Clip", items: ["Onboarding 3 step with dots, Skip/Next", "Clip alias for 4 missing (plank/jack/mountain/affondo)", "Offline models check"] },
      { icon: "🏕️", title: "35-37. Camp + TEMPO + Coach", items: ["Camp 2.0 recovery every 7 + deload week", "TEMPO metronome 40-60 BPM + toggle", "Coach 2.0 TTS cue form<60"] },
      { icon: "📊", title: "38-40. Statistics Premium", items: ["Hero DogTag accent + PR glass 16px", "Bar gradient + tooltip blur + monthly 6px", "Heatmap 6px + year 4px + calendar 8px"] }
    ],
    cta: "TRY IT",
    ctaHint: "Home → Mission → Start · https://mikweb.eu/operator40/",
    dismiss: "Don't show again",
    close: "Close",
    footer: "On-device. 40 iterations. Next: v2.15 Social + Watch."
  },
  de: {
    badge: "NEU v2.14.1",
    title: "Statistiken — Premium Grafik (v2.14.1)",
    subtitle: "v2.14.1 · 28. Aug 2026 · DogTag Akzent + Chart Verlauf + Heatmap",
    intro: "Statistiken Batch: DogTag Akzent, PR Glas, Bar Verlauf + Tooltip Blur, Heatmap 6px Glow.",
    groups: [
      { icon: "🌑", title: "1-2. OLED + Card", items: ["INK #0E100D Vignette", "Unified Card + Hairline + Gloss", "Tabular Glow"] },
      { icon: "🔥", title: "3-4. Typo + CTA", items: ["Bebas/Inter sharpened", "CTA Blaze Light + Inset", "Large shadow"] },
      { icon: "🧭", title: "5-6. Nav + HUD", items: ["Glass blur 14px", "Pill 46×28", "HUD 4 Ecken + Scanline"] },
      { icon: "✨", title: "7-8. Micro + Skeleton", items: ["Stagger 20/60/100ms", "Skeleton 1.4s", "Hover -3px"] },
      { icon: "🎨", title: "9-10. Aura", items: ["Aura 28s + Vignette", "Neue Tokens", "103 Tests grün"] },
      { icon: "💎", title: "11-13. Extra", items: ["Hero 12/36 + embers", "Card 5/18 + glow", "White-screen fix"] },
      { icon: "🚀", title: "14-23. Full-App", items: ["Color #0B0D0A + card 16", "Typo + icon + nav", "HUD + viz + forms + cohesion"] },
      { icon: "♿", title: "24-27. Roadmap", items: ["Focus + aria-live + reduced-motion + print", "Debounce + highlight + empty + LargeText", "CSV aiQuality + QR"] },
      { icon: "📳", title: "28-29. IMU + BeforeAfter", items: ["MotionFusion opt-in", "BeforeAfter pinch-zoom + haptics", "Engine wiring"] },
      { icon: "❤️", title: "30-32. HR + NEFFEX + PWA", items: ["Health HR avg + toast", "NEFFEX crossfade 1.2s + seed", "PWA nach 2 Sessions"] },
      { icon: "🎓", title: "33-34. Onboarding + Clip", items: ["Onboarding 3 Step mit Dots", "Clip Alias für 4 fehlende", "Offline Check"] },
      { icon: "🏕️", title: "35-37. Camp + TEMPO + Coach", items: ["Camp 2.0 Recovery alle 7 + Deload Woche", "TEMPO Metronom 40-60 BPM", "Coach 2.0 TTS bei form<60"] }
    ],
    cta: "TESTEN",
    ctaHint: "Home → Mission → Start",
    dismiss: "Nicht mehr anzeigen",
    close: "Schließen",
    footer: "On-device. 37 Iterationen. Next: v2.15."
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, display: "grid", placeItems: "center", boxShadow: `0 6px 18px ${BLAZE}66`, flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 22, color: PAPER }) }),
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
const inputStyle = {
  width: "100%",
  background: `linear-gradient(180deg, ${INK_2} 0%, #1E221B 100%)`,
  border: `1px solid ${OLIVE}`,
  borderRadius: 14,
  padding: "12px 14px",
  color: PAPER,
  fontSize: 16,
  fontFamily: "Inter, sans-serif",
  outline: "none",
  boxShadow: "0 2px 8px rgba(0,0,0,0.22) inset"
};
const primaryBtn = {
  background: `linear-gradient(135deg, ${BLAZE_LIGHT} 0%, ${BLAZE} 55%, ${BLAZE_DEEP} 100%)`,
  color: PAPER,
  border: `1px solid ${BLAZE_LIGHT}33`,
  borderRadius: 14,
  padding: "12px 16px",
  fontFamily: "'Bebas Neue',sans-serif",
  fontSize: 16,
  letterSpacing: "0.05em",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  width: "100%",
  boxShadow: `0 8px 20px ${BLAZE}33, 0 1px 0 rgba(255,255,255,0.14) inset, 0 -1px 0 rgba(0,0,0,0.22) inset`
};
const primaryBtnLarge = {
  ...primaryBtn,
  padding: "15px 18px",
  fontSize: 18,
  letterSpacing: "0.06em",
  boxShadow: `0 10px 28px ${BLAZE}44, 0 1px 0 rgba(255,255,255,0.16) inset, 0 -1px 0 rgba(0,0,0,0.25) inset`
};
const secondaryBtn = {
  background: `linear-gradient(180deg, ${INK_2} 0%, #1C1F18 100%)`,
  border: `1px solid ${KHAKI}88`,
  color: PAPER,
  borderRadius: 14,
  padding: "12px 16px",
  fontFamily: "'Bebas Neue',sans-serif",
  fontSize: 16,
  letterSpacing: "0.05em",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.28), 0 1px 0 rgba(255,255,255,0.06) inset"
};
const btnIcon = {
  background: "transparent",
  border: "none",
  padding: 6,
  cursor: "pointer",
  display: "flex",
  borderRadius: 10
};
const iconCircle = {
  borderRadius: "50%",
  border: `1px solid ${OLIVE_LIGHT}55`,
  background: `linear-gradient(160deg, ${INK_2} 0%, ${INK} 100%)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.06) inset"
};
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
function BottomNav({ active, onNavigate }) {
  const { t } = useT();
  const tabs = [
    { key: "home", label: t("nav.home"), icon: House },
    { key: "library", label: t("nav.library"), icon: BookOpen },
    { key: "history", label: t("nav.history"), icon: History },
    { key: "setup", label: t("nav.setup"), icon: Settings }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "o40-bottomnav-glass",
      style: {
        display: "flex",
        paddingBottom: "env(safe-area-inset-bottom, 0px)"
      },
      children: tabs.map((tab) => {
        const on = active === tab.key;
        const Icon = tab.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => onNavigate(tab.key),
            "aria-current": on ? "page" : void 0,
            style: {
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
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    position: "relative",
                    width: 46,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 14,
                    background: on ? `linear-gradient(180deg, ${BLAZE}33, ${BLAZE}14)` : "transparent",
                    border: on ? `1px solid ${BLAZE}55` : "1px solid transparent",
                    boxShadow: on ? `0 0 14px ${BLAZE}33, inset 0 0 8px ${BLAZE}22` : "none",
                    transition: "background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                    animation: on ? "tabPop 0.3s cubic-bezier(0.16,1,0.3,1)" : "none"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Icon,
                      {
                        size: 20,
                        color: on ? BLAZE : STEEL,
                        style: { transition: "color 0.2s ease", filter: on ? `drop-shadow(0 0 5px ${BLAZE}aa)` : "none" }
                      }
                    ),
                    on && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          position: "absolute",
                          top: -1,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 16,
                          height: 2,
                          borderRadius: 2,
                          background: BLAZE,
                          boxShadow: `0 0 8px ${BLAZE}`
                        }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "o40-mono",
                  style: {
                    color: on ? BLAZE : STEEL,
                    fontSize: 9.5,
                    letterSpacing: "0.03em",
                    textShadow: on ? `0 0 6px ${BLAZE}66` : "none",
                    transition: "color 0.2s ease"
                  },
                  children: tab.label
                }
              ),
              on && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    position: "absolute",
                    bottom: 2,
                    left: "38%",
                    right: "38%",
                    height: 2,
                    borderRadius: 2,
                    background: BLAZE,
                    opacity: 0.85,
                    boxShadow: `0 0 8px ${BLAZE}`
                  }
                }
              )
            ]
          },
          tab.key
        );
      })
    }
  );
}
const BUILD_VERSION = "2.15.0 · 3d1b238";
function VersionBadge({ onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick,
      role: onClick ? "button" : void 0,
      title: onClick ? "Novità v2.14.1 — clic per riaprire changelog" : void 0,
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#7FB069",
              boxShadow: "0 0 6px #7FB06988"
            }
          }
        ),
        "v",
        BUILD_VERSION,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: BLAZE,
              boxShadow: `0 0 6px ${BLAZE}88`
            }
          }
        ),
        onClick && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "o40-mono",
            style: {
              color: KHAKI,
              fontSize: 8,
              border: `1px solid ${KHAKI}66`,
              borderRadius: 6,
              padding: "1px 5px",
              marginLeft: 2
            },
            children: "NOVITÀ"
          }
        )
      ]
    }
  );
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
  web: () => __vitePreload(() => import("./web-LLef69x4.js"), true ? __vite__mapDeps([3,1,2]) : void 0, import.meta.url).then((m2) => new m2.PreferencesWeb())
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
const STORAGE_SCHEMA_VERSION = 2;
let dbPromise = null;
function getDB() {
  if (dbPromise) return dbPromise;
  if (typeof indexedDB === "undefined") return null;
  try {
    dbPromise = openDB("operator40", STORAGE_SCHEMA_VERSION, {
      upgrade(db, oldVersion) {
        if (!db.objectStoreNames.contains("kv")) db.createObjectStore("kv");
      }
    });
    return dbPromise;
  } catch {
    return null;
  }
}
function getStoredVersion() {
  try {
    return parseInt(localStorage.getItem("o40_schemaVersion") || "0", 10) || 0;
  } catch {
    return 0;
  }
}
function setStoredVersion(v) {
  try {
    localStorage.setItem("o40_schemaVersion", String(v));
  } catch {
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
async function migrateStoredDataIfNeeded() {
  const cur = getStoredVersion();
  if (cur >= STORAGE_SCHEMA_VERSION) return;
  try {
    const r = await get("o40_profile");
    if (r && r.value) {
      const p2 = JSON.parse(r.value);
      if (!p2.schemaVersion || p2.schemaVersion < STORAGE_SCHEMA_VERSION) {
        p2.schemaVersion = STORAGE_SCHEMA_VERSION;
        if (!p2.lang) p2.lang = "it";
        if (!p2.weeklyGoal) p2.weeklyGoal = 3;
        if (!p2.level) p2.level = "combattente";
        await set("o40_profile", JSON.stringify(p2));
      }
    }
    setStoredVersion(STORAGE_SCHEMA_VERSION);
  } catch {
  }
}
const BACKUP_VERSION = STORAGE_SCHEMA_VERSION;
function validateBackup(data) {
  if (!data || typeof data !== "object") throw new Error("Backup non valido: root non è oggetto");
  if (data.version != null && typeof data.version !== "number")
    throw new Error("Backup non valido: version deve essere numero");
  if (data.profile != null && typeof data.profile !== "object")
    throw new Error("Backup non valido: profile non è oggetto");
  if (data.sessions != null && !Array.isArray(data.sessions))
    throw new Error("Backup non valido: sessions non è array");
  if (data.waistHistory != null && !Array.isArray(data.waistHistory))
    throw new Error("Backup non valido: waistHistory non è array");
  if (data.weightHistory != null && !Array.isArray(data.weightHistory))
    throw new Error("Backup non valido: weightHistory non è array");
  if (data.customPrograms != null && !Array.isArray(data.customPrograms))
    throw new Error("Backup non valido: customPrograms non è array");
  return true;
}
function migrate(data) {
  const v = data.version || 0;
  if (v < 1) {
    if (data.profile) {
      if (!data.profile.lang) data.profile.lang = "it";
      if (!data.profile.weeklyGoal) data.profile.weeklyGoal = 3;
      if (!data.profile.level) data.profile.level = "combattente";
    }
    if (Array.isArray(data.sessions)) {
      data.sessions = data.sessions.map((s) => ({
        ...s,
        date: s.date || (/* @__PURE__ */ new Date()).toISOString(),
        kcal: typeof s.kcal === "number" ? s.kcal : 0
      }));
    }
    data.version = 1;
  }
  return data;
}
async function exportBackup() {
  const keys = [
    "o40_profile",
    "o40_sessions",
    "o40_waist",
    "o40_weight",
    "o40_custom_programs",
    "o40_photos"
  ];
  const out = { version: BACKUP_VERSION, exportedAt: (/* @__PURE__ */ new Date()).toISOString() };
  for (const k2 of keys) {
    try {
      const r = await window.storage.get(k2, false);
      if (r && r.value) {
        const parsed = JSON.parse(r.value);
        if (k2 === "o40_profile") out.profile = parsed;
        else if (k2 === "o40_sessions") out.sessions = parsed;
        else if (k2 === "o40_waist") out.waistHistory = parsed;
        else if (k2 === "o40_weight") out.weightHistory = parsed;
        else if (k2 === "o40_custom_programs") out.customPrograms = parsed;
        else if (k2 === "o40_photos") out.photos = parsed;
      }
    } catch {
    }
  }
  try {
    const fav = localStorage.getItem("o40_favs") || localStorage.getItem("o40_favorites");
    if (fav) out.favs = JSON.parse(fav);
  } catch {
  }
  return out;
}
function downloadBackup(data) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `operator40-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}-v${data.version || BACKUP_VERSION}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
async function importBackup(data) {
  validateBackup(data);
  const migrated = migrate({ ...data });
  const toWrite = [
    ["o40_profile", migrated.profile],
    ["o40_sessions", migrated.sessions],
    ["o40_waist", migrated.waistHistory],
    ["o40_weight", migrated.weightHistory],
    ["o40_custom_programs", migrated.customPrograms],
    ["o40_photos", migrated.photos]
  ];
  for (const [k2, v] of toWrite) {
    if (v !== void 0) {
      try {
        await window.storage.set(k2, JSON.stringify(v), false);
      } catch (e) {
        throw new Error(`Scrittura ${k2} fallita: ${e.message}`);
      }
    }
  }
  if (migrated.favs !== void 0) {
    try {
      localStorage.setItem("o40_favs", JSON.stringify(migrated.favs));
    } catch {
    }
  }
  try {
    localStorage.setItem("o40_schemaVersion", String(migrated.version));
  } catch {
  }
  return migrated;
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
  const done = getBellySessions(sessions).filter(
    (s) => new Date(s.date).getTime() > weekAgo
  ).length;
  return {
    done,
    total: goal,
    pct: Math.min(1, done / goal),
    remain: Math.max(0, goal - done),
    isDone: done >= goal
  };
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
const CountdownScreen = reactExports.lazy(() => __vitePreload(() => import("./CountdownScreen-B6ns6Aq8.js"), true ? __vite__mapDeps([4,1,2]) : void 0, import.meta.url));
const SetupScreen = reactExports.lazy(() => __vitePreload(() => import("./SetupScreen-Bay8QDqG.js"), true ? __vite__mapDeps([5,1,6,2]) : void 0, import.meta.url));
const HomeScreen = reactExports.lazy(() => __vitePreload(() => import("./HomeScreen-CMc2D1Qq.js"), true ? __vite__mapDeps([7,1,8,9,10,11,2]) : void 0, import.meta.url));
const LibraryScreen = reactExports.lazy(() => __vitePreload(() => import("./LibraryScreen-xbIkzZo4.js"), true ? __vite__mapDeps([12,1,9,13,2]) : void 0, import.meta.url));
const BuilderScreen = reactExports.lazy(() => __vitePreload(() => import("./BuilderScreen-DvmanM2H.js"), true ? __vite__mapDeps([14,1,6,9,2]) : void 0, import.meta.url));
const PreviewScreen = reactExports.lazy(() => __vitePreload(() => import("./PreviewScreen-nULaaRt8.js"), true ? __vite__mapDeps([15,1,13,9,6,10,2]) : void 0, import.meta.url));
const SessionScreen = reactExports.lazy(() => __vitePreload(() => import("./SessionScreen-CZY9wT1H.js"), true ? __vite__mapDeps([16,1,9,6,11,2]) : void 0, import.meta.url));
const SummaryScreen = reactExports.lazy(() => __vitePreload(() => import("./SummaryScreen-D2LQtufl.js"), true ? __vite__mapDeps([17,1,10,2]) : void 0, import.meta.url));
const HistoryScreen = reactExports.lazy(() => __vitePreload(() => import("./HistoryScreen-BZjFAbK2.js"), true ? __vite__mapDeps([18,1,8,6,10,2]) : void 0, import.meta.url));
function ScreenFallback() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: "#EDE8D8", fontSize: 12, letterSpacing: "0.08em" }, children: "CARICAMENTO…" })
    }
  );
}
async function exportData() {
  try {
    const data = await exportBackup();
    downloadBackup(data);
  } catch (e) {
  }
}
async function handleImportBackup(file, {
  setProfile,
  setSessions,
  setWaistHistory,
  setWeightHistory,
  setCustomPrograms,
  showToast,
  setScreen
}) {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    await importBackup(data);
    const p2 = await window.storage.get("o40_profile", false).then((r) => r ? JSON.parse(r.value) : null).catch(() => null);
    const s = await window.storage.get("o40_sessions", false).then((r) => r ? JSON.parse(r.value) : []).catch(() => []);
    const wh = await window.storage.get("o40_waist", false).then((r) => r ? JSON.parse(r.value) : []).catch(() => []);
    const wt = await window.storage.get("o40_weight", false).then((r) => r ? JSON.parse(r.value) : []).catch(() => []);
    const cp = await window.storage.get("o40_custom_programs", false).then((r) => r ? JSON.parse(r.value) : []).catch(() => []);
    setProfile(p2);
    setSessions(s || []);
    setWaistHistory(wh || []);
    setWeightHistory(wt || []);
    setCustomPrograms(cp || []);
    showToast("Backup ripristinato — ricarico...");
    setTimeout(() => window.location.reload(), 800);
  } catch (e) {
    showToast("Backup non valido: " + (e.message || "errore"));
  }
}
const HK_ACTIVITY_MAP = {
  HKWorkoutActivityTypeFunctionalStrengthTraining: {
    it: "Forza funzionale (Apple Health)",
    en: "Functional strength (Apple Health)",
    de: "Funktionelles Krafttraining (Apple Health)"
  },
  HKWorkoutActivityTypeTraditionalStrengthTraining: {
    it: "Allenamento forza (Apple Health)",
    en: "Strength training (Apple Health)",
    de: "Krafttraining (Apple Health)"
  },
  HKWorkoutActivityTypeCoreTraining: {
    it: "Core training (Apple Health)",
    en: "Core training (Apple Health)",
    de: "Core-Training (Apple Health)"
  },
  HKWorkoutActivityTypeHighIntensityIntervalTraining: {
    it: "HIIT (Apple Health)",
    en: "HIIT (Apple Health)",
    de: "HIIT (Apple Health)"
  },
  HKWorkoutActivityTypeCrossTraining: {
    it: "Cross training (Apple Health)",
    en: "Cross training (Apple Health)",
    de: "Cross-Training (Apple Health)"
  },
  HKWorkoutActivityTypeFlexibility: {
    it: "Mobilità (Apple Health)",
    en: "Flexibility (Apple Health)",
    de: "Mobilität (Apple Health)"
  },
  HKWorkoutActivityTypeCooldown: {
    it: "Defaticamento (Apple Health)",
    en: "Cooldown (Apple Health)",
    de: "Abkühlen (Apple Health)"
  }
};
const HK_FALLBACK = {
  it: "Allenamento (Apple Health)",
  en: "Workout (Apple Health)",
  de: "Training (Apple Health)"
};
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
  const result = { weightKg: null, weightDate: null, heartRateAvg: null, heartRateDate: null, workouts: [] };
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
  const hrRegex = /<Record[^>]*type="HKQuantityTypeIdentifierHeartRate"[^>]*\/?>/g;
  let hrVals = [];
  while ((m2 = hrRegex.exec(xmlText)) && hrVals.length < 20) {
    const v = parseFloat(getXmlAttr(m2[0], "value") || "");
    const d = getXmlAttr(m2[0], "startDate");
    if (!isNaN(v)) hrVals.push({ v, d });
  }
  if (hrVals.length) {
    const avg = Math.round(hrVals.reduce((a, b) => a + b.v, 0) / hrVals.length);
    result.heartRateAvg = avg;
    result.heartRateDate = hrVals[hrVals.length - 1].d || hrVals[0].d;
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
  const [tourStep, setTourStep] = reactExports.useState(0);
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
      return localStorage.getItem("o40_release_2.14.1") !== "dismissed";
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
  const [aiPhaseQuality, setAiPhaseQuality] = reactExports.useState([]);
  const aiPhaseQualityRef = reactExports.useRef([]);
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
  function showToast(message) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = setTimeout(() => setToast(null), 2600);
  }
  reactExports.useEffect(() => {
    (async () => {
      try {
        await migrateStoredDataIfNeeded();
      } catch {
      }
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
            reg.showNotification(msg.title, {
              body: msg.body,
              icon: "./icons/icon-192.png",
              badge: "./icons/icon-192.png",
              tag: msg.tag,
              data: { url: "./" }
            });
          } else if (typeof Notification !== "undefined") {
            new Notification(msg.title, {
              body: msg.body,
              icon: "./icons/icon-192.png",
              tag: msg.tag
            });
          }
        }).catch(() => {
          if (typeof Notification !== "undefined") {
            try {
              new Notification(msg.title, {
                body: msg.body,
                icon: "./icons/icon-192.png",
                tag: msg.tag
              });
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
      if (!seen2) {
        setTourStep(0);
        setShowTour(true);
      }
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
  }, [
    musicOn,
    musicAutoPlay,
    musicShuffle,
    screen,
    musicTrack,
    phaseIdx,
    paused,
    musicVolume,
    seq
  ]);
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
    if (phase.type === "work") speak(tr$1(EXERCISES[phase.exerciseId].name, lang));
    else if (phase.type === "rest") speak(t("ses.rest"));
    else if (phase.type === "cooldown") speak(t("ses.cooldown"));
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
    const preset = levelPreset(profile);
    const mode = profile && profile.executionMode || "time";
    const levelKey = profile && profile.level || "combattente";
    const s = buildSequence(program, skip, preset.work, preset.rest, mode, levelKey);
    setActiveProgram(program);
    setSeq(s);
    setPhaseIdx(0);
    setSecondsLeft(s[0].duration ?? 0);
    setPaused(false);
    setRpe(null);
    setAiPhaseQuality([]);
    aiPhaseQualityRef.current = [];
    if (soundRef.current) {
      playBeep(660);
      announcePhase(s[0]);
    }
    setScreen("session");
  }
  function collectAiPhaseQuality(data) {
    if (!data || !data.exerciseId || typeof data.avgQuality !== "number") return;
    const entry = {
      exerciseId: data.exerciseId,
      reps: data.reps ?? 0,
      quality: Math.round(data.avgQuality)
    };
    aiPhaseQualityRef.current = [...aiPhaseQualityRef.current, entry];
    setAiPhaseQuality(aiPhaseQualityRef.current);
  }
  function finishSession() {
    const skip = !!profile.skipWarmup;
    const preset = levelPreset(profile);
    const mode = profile && profile.executionMode || "time";
    const levelKey = profile && profile.level || "combattente";
    const kcal = Math.round(
      estimateProgramKcal(
        activeProgram,
        profile.weight,
        skip,
        preset.work,
        preset.rest,
        mode,
        levelKey
      )
    );
    if (soundRef.current) playBeep(1e3, 0.25);
    if (vibrationRef.current) vibrate([80, 60, 80, 60, 150]);
    const qualityEntries = aiPhaseQualityRef.current;
    let aiQuality = null;
    if (qualityEntries.length) {
      const byExercise = {};
      qualityEntries.forEach((e) => {
        if (!byExercise[e.exerciseId]) {
          byExercise[e.exerciseId] = { name: tr$1(EXERCISES[e.exerciseId].name, lang), reps: 0, sum: 0, n: 0 };
        }
        const g = byExercise[e.exerciseId];
        g.reps = Math.max(g.reps, e.reps ?? 0);
        g.sum += e.quality;
        g.n += 1;
      });
      const exercises = Object.values(byExercise).map((g) => ({
        name: g.name,
        reps: g.reps,
        quality: Math.round(g.sum / g.n)
      }));
      aiQuality = {
        overall: Math.round(exercises.reduce((a, e) => a + e.quality, 0) / exercises.length),
        exercises
      };
    }
    setLastStats({
      program: activeProgram,
      kcal,
      durationSec: totalSeqSeconds(activeProgram, skip, preset.work, preset.rest, mode, levelKey),
      aiQuality
    });
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
      motionFusion: profile ? !!profile.motionFusion : false,
      seenIntro: profile ? !!profile.seenIntro : false,
      intervalPreset: formCustomWork !== "40" || formCustomRest !== "20" ? "custom" : profile && profile.intervalPreset || "standard",
      level: prevLevel || "combattente",
      executionMode: profile && profile.executionMode || "time",
      tempoEnabled: profile ? !!profile.tempoEnabled : false,
      tempoBpm: profile && profile.tempoBpm ? Math.max(40, Math.min(60, parseInt(profile.tempoBpm, 10) || 50)) : 50,
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
    if (latest && latest.cm === cm && dayKey(new Date(latest.date)) === dayKey(/* @__PURE__ */ new Date())) return;
    const updated = [...waistHistory, { date: (/* @__PURE__ */ new Date()).toISOString(), cm }];
    setWaistHistory(updated);
    try {
      await window.storage.set("o40_waist", JSON.stringify(updated), false);
    } catch (e) {
    }
  }
  async function recordWeight(kg) {
    const latest = weightHistory.length ? weightHistory[weightHistory.length - 1] : null;
    if (latest && latest.kg === kg && dayKey(new Date(latest.date)) === dayKey(/* @__PURE__ */ new Date())) return;
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
    showToast(t("toast.level.up", { label: tr$1(next.label, lang) }));
  }
  async function toggleVoiceCountdown() {
    const p2 = { ...profile, voiceCountdown: !profile.voiceCountdown };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch {
    }
  }
  async function toggleVocalMotivation() {
    const p2 = { ...profile, vocalMotivation: !profile.vocalMotivation };
    setProfile(p2);
    if (p2.vocalMotivation) speak(getVocalMotivation(lang), lang, LOCALES);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch (e) {
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
  async function toggleMotionFusion() {
    const p2 = { ...profile, motionFusion: !profile.motionFusion };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch {
    }
    if (p2.motionFusion) showToast(lang === "it" ? "IMU attivato — jumpingJack/burpee/skater" : "IMU enabled");
    else showToast(lang === "it" ? "IMU disattivato" : "IMU disabled");
  }
  async function toggleTempo() {
    const p2 = { ...profile, tempoEnabled: !profile.tempoEnabled };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch {
    }
    showToast(p2.tempoEnabled ? `TEMPO ${p2.tempoBpm || 50} BPM ON` : "TEMPO OFF");
  }
  async function setTempoBpm(v) {
    const bpm = Math.max(40, Math.min(60, parseInt(v, 10) || 50));
    const p2 = { ...profile, tempoBpm: bpm };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch {
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
        showToast(lang === "it" ? "Push disattivato" : "Push disabled");
      } else {
        await subscribePush();
        setPushEnabled(true);
        updatePushStats(sessions, profile, lang).catch(() => {
        });
        showToast(
          lang === "it" ? "Push attivato — anche con PWA chiusa" : "Push enabled — works with PWA closed"
        );
      }
    } catch (e) {
      showToast(e.message || "Push non disponibile");
    } finally {
      setPushBusy(false);
    }
  }
  async function saveBellyTest({ plankSec, crunchReps, level, date }) {
    const p2 = {
      ...profile,
      bellyTest: { plankSec, crunchReps, level, date },
      bellyLevel: level,
      bellyLevelUpdated: date
    };
    setProfile(p2);
    try {
      await window.storage.set("o40_profile", JSON.stringify(p2), false);
    } catch {
    }
    setShowBellyTest(false);
    showToast(`Livello pancia: ${level.toUpperCase()} ✓`);
    updatePushStats(sessions, p2, lang).catch(() => {
    });
  }
  async function handleTestPush() {
    if (pushBusy) return;
    setPushBusy(true);
    try {
      if (pushEnabled && isPushSupported()) {
        await testPushViaSW(lang);
        showToast(
          lang === "it" ? "Test push inviato" : lang === "de" ? "Test-Push gesendet" : "Test push sent"
        );
      } else {
        const ok = fireTestNotification(t);
        showToast(
          ok ? lang === "it" ? "Notifica di test inviata" : lang === "de" ? "Testbenachrichtigung gesendet" : "Test notification sent" : "Permesso negato"
        );
      }
    } catch (e) {
      showToast(e.message || "Test fallito");
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
      aiQuality: lastStats.aiQuality || null,
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
      showToast(t("toast.promoted", { rank: tr$1(rank.current.name, lang) }));
    } else if (newStreakBadge) {
      showToast(t("toast.milestone.streak", { n: newStreakBadge }));
    } else if (newSessionBadge) {
      showToast(t("toast.milestone.sessions", { n: newSessionBadge }));
    } else if (newWeekCount >= goal && prevWeekCount < goal) {
      showToast(t("toast.goal"));
    } else {
      showToast(t("toast.saved"));
    }
  }
  async function clearHistory() {
    setSessions([]);
    try {
      await window.storage.set("o40_sessions", JSON.stringify([]), false);
    } catch (e) {
    }
    showToast(t("toast.history"));
  }
  async function handleAddPhoto(file) {
    if (!file) return;
    try {
      const url = await fileToDataUrl(file);
      const next = [
        ...photos,
        { id: Date.now().toString(36), date: (/* @__PURE__ */ new Date()).toISOString(), url }
      ].slice(-12);
      setPhotos(next);
      savePhotos(next);
      showToast("Foto aggiunta");
    } catch {
      showToast("File troppo grande (max 4MB)");
    }
  }
  async function deleteSession(date) {
    const updated = sessions.filter((s) => s.date !== date);
    setSessions(updated);
    try {
      await window.storage.set("o40_sessions", JSON.stringify(updated), false);
    } catch (e) {
    }
    showToast(t("toast.removed"));
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
    showToast(t("toast.created"));
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
    showToast("Missione aggiornata");
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
        const updated = [...sessions, ...newRecords].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setSessions(updated);
        try {
          await window.storage.set("o40_sessions", JSON.stringify(updated), false);
        } catch (e) {
        }
      }
      if (parsed.weightKg) {
        setHealthWeightSuggestion({
          kg: Math.round(parsed.weightKg * 10) / 10,
          date: parsed.weightDate
        });
      }
      if (parsed.heartRateAvg) {
        setTimeout(() => showToast(`HR ${parsed.heartRateAvg} bpm`), 900);
      }
      setHealthImportStatus("done");
      showToast(
        newRecords.length ? t("toast.imported", { n: newRecords.length }) : t("toast.imported.none")
      );
    } catch (e) {
      setHealthImportStatus("error");
      showToast(t("toast.import.fail"));
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
    showToast(t("toast.weight"));
  }
  const shell = { minHeight: "100dvh", background: INK, display: "flex", justifyContent: "center" };
  const phone = {
    width: "100%",
    maxWidth: 460,
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    position: "relative"
  };
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(ScreenFallback, {}), children: [
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
            vocalMotivation: profile ? profile.vocalMotivation !== false : true,
            onToggleVocalMotivation: toggleVocalMotivation,
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
            showToast,
            largeText,
            setLargeText,
            pushEnabled,
            pushSupported,
            pushBusy,
            onTogglePush: togglePush,
            onTestPush: handleTestPush,
            motionFusion: !!(profile && profile.motionFusion),
            onToggleMotionFusion: toggleMotionFusion,
            tempoEnabled: !!(profile && profile.tempoEnabled),
            onToggleTempo: toggleTempo,
            tempoBpm: profile && profile.tempoBpm || 50,
            onSetTempoBpm: setTempoBpm,
            onExportBackup: exportData,
            onImportBackup: (file) => handleImportBackup(file, {
              setProfile,
              setSessions,
              setWaistHistory,
              setWeightHistory,
              setCustomPrograms,
              showToast,
              setScreen
            })
          }
        ),
        screen === "home" && profile && showReleaseBanner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
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
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    inset: 0,
                    opacity: 0.06,
                    background: `repeating-linear-gradient(90deg, ${OLIVE} 0 1px, transparent 1px 14px)`,
                    pointerEvents: "none"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 10
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: { display: "flex", gap: 10, alignItems: "center", flex: 1, minWidth: 0 },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`,
                                display: "grid",
                                placeItems: "center",
                                flexShrink: 0
                              },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 18, color: PAPER })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minWidth: 0 }, children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                style: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: "o40-mono",
                                      style: {
                                        background: BLAZE,
                                        color: PAPER,
                                        fontSize: 9,
                                        fontWeight: 800,
                                        letterSpacing: "0.08em",
                                        padding: "2px 6px",
                                        borderRadius: 6
                                      },
                                      children: "NUOVO v2.14.1"
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 10 }, children: "28 AGO 2026 · 40 ITERAZIONI" })
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "o40-display",
                                style: { color: PAPER, fontSize: 15, lineHeight: 1.1, marginTop: 3 },
                                children: "Statistiche — Grafica Premium!"
                              }
                            )
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => {
                          try {
                            localStorage.setItem("o40_release_2.14.1", "dismissed");
                          } catch {
                          }
                          setShowReleaseBanner(false);
                        },
                        "aria-label": "Chiudi",
                        style: {
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          border: `1px solid ${OLIVE}`,
                          background: INK,
                          color: STEEL,
                          display: "grid",
                          placeItems: "center",
                          cursor: "pointer",
                          flexShrink: 0,
                          position: "relative"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "ul",
                {
                  style: {
                    position: "relative",
                    margin: 0,
                    paddingLeft: 18,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    listStyle: "disc"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: { color: KHAKI, fontSize: 11.5, lineHeight: 1.35 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { color: PAPER }, children: "Backup" }),
                      ": export/import JSON + schema v2 — non perdi più i dati cambiando device"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: { color: KHAKI, fontSize: 11.5, lineHeight: 1.35 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { color: PAPER }, children: "Dedup" }),
                      ": DogTag/ProgressRing/styles centralizzati — Home 65 righe → shared"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: { color: KHAKI, fontSize: 11.5, lineHeight: 1.35 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { color: PAPER }, children: "i18n" }),
                      ": 15+ hardcoded IT → t() — OGGI/PROGRESSI/MISSIONI + backup"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: { color: KHAKI, fontSize: 11.5, lineHeight: 1.35 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { color: PAPER }, children: "Lazy+PWA" }),
                      ": 9 screen lazy (749k→444k) + SW stale-while-revalidate + 51 test"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", display: "flex", gap: 8, marginTop: 2 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => setShowChangelog(true),
                    style: {
                      flex: 1,
                      background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`,
                      color: PAPER,
                      border: "none",
                      borderRadius: 10,
                      padding: "9px 12px",
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 14,
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 14 }),
                      " DETTAGLI ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => {
                      try {
                        localStorage.setItem("o40_release_2.14.1", "dismissed");
                      } catch {
                      }
                      setShowReleaseBanner(false);
                    },
                    style: {
                      background: INK,
                      border: `1px solid ${OLIVE}`,
                      color: KHAKI,
                      borderRadius: 10,
                      padding: "9px 14px",
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer"
                    },
                    children: "Chiudi"
                  }
                )
              ] })
            ]
          }
        ),
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
        screen === "countdown" && previewProgram && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CountdownScreen,
          {
            program: previewProgram,
            lang,
            t,
            onDone: () => startSession(previewProgram)
          }
        ),
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
            vocalMotivation: profile ? profile.vocalMotivation !== false : true,
            lang,
            onSkip: advancePhase,
            onPrev: goPrev,
            exitConfirm,
            setExitConfirm,
            onAiPhaseComplete: collectAiPhaseQuality,
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
            aiQuality: lastStats.aiQuality,
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
        )
      ] }),
      ["home", "library", "history", "setup"].includes(screen) && /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { active: screen, onNavigate: setScreen }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            padding: screen === "loading" ? "12px 0" : "6px 0 10px",
            opacity: 0.85
          },
          children: [
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 12 }),
                  " Aggiorna app → ",
                  updateVersion || "nuova versione"
                ]
              }
            )
          ]
        }
      ),
      showChangelog && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ChangelogModal,
        {
          lang,
          onClose: () => setShowChangelog(false),
          onTry: () => setShowPose("squat")
        }
      ),
      toast && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            position: "absolute",
            left: 16,
            right: 16,
            bottom: 20,
            zIndex: 20,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "o40-toast-in",
              style: {
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
              },
              children: toast
            }
          )
        }
      ),
      installPrompt && ["home", "library", "history", "setup"].includes(screen) && sessions.length >= 2 && (() => {
        try {
          return localStorage.getItem("o40_install_dismissed") !== "1";
        } catch {
          return true;
        }
      })() && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-install", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              width: 36,
              height: 36,
              borderRadius: 8,
              background: BLAZE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 18, color: PAPER })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontWeight: 700, fontSize: 13 }, children: lang === "it" ? "Installa Operator 40" : lang === "de" ? "Operator 40 installieren" : "Install Operator 40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 11 }, children: lang === "it" ? "Aggiungi alla home per l’accesso offline" : "Add to home for offline access" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: async () => {
              try {
                installPrompt.prompt();
                const c = await installPrompt.userChoice;
                if (c.outcome === "accepted") setInstallPrompt(null);
              } catch {
              }
            },
            style: {
              background: BLAZE,
              color: PAPER,
              border: "none",
              borderRadius: 8,
              padding: "8px 12px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 12
            },
            children: "OK"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              try {
                localStorage.setItem("o40_install_dismissed", "1");
              } catch {
              }
              setInstallPrompt(null);
            },
            style: {
              background: "transparent",
              border: "none",
              color: STEEL,
              cursor: "pointer",
              padding: 6
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
          }
        )
      ] }),
      showTour && (() => {
        const steps = [
          { icon: Sparkles, title: "Benvenuto!", text: lang === "it" ? "Tre tap: scegli missione, allenati 15 minuti, traccia. Tutto offline, privato." : "Three taps: pick mission, train 15′, track. Fully offline." },
          { icon: Target, title: "Missioni & Pancia", text: lang === "it" ? "Missione adattiva + Pancia 2.0 (plank/crunch test) + sfida giornaliera." : "Adaptive mission + Belly 2.0 + daily challenge." },
          { icon: Eye, title: "Traccia & AI", text: lang === "it" ? "AI conta reps, stats 8 settimane, export CSV/QR, backup JSON." : "AI counts reps, 8-week stats, CSV/QR export, backup." }
        ];
        const s = steps[tourStep] || steps[0];
        const Icon = s.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "o40-tour-mask",
            onClick: () => {
              setShowTour(false);
              try {
                localStorage.setItem("o40_seenTour", "1");
              } catch {
              }
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-tour-card", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, color: BLAZE }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-display", style: { fontSize: 20 }, children: s.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: "auto", display: "flex", gap: 4 }, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", background: i === tourStep ? BLAZE : OLIVE, opacity: i === tourStep ? 1 : 0.45 } }, i)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, lineHeight: 1.5, color: "#333" }, children: s.text }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 14 }, children: [
                tourStep > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTourStep(tourStep - 1), style: { background: "transparent", border: `1px solid ${OLIVE}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16, color: OLIVE }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                  setShowTour(false);
                  try {
                    localStorage.setItem("o40_seenTour", "1");
                  } catch {
                  }
                }, style: { background: "transparent", border: `1px solid ${OLIVE}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer" }, children: lang === "it" ? "Salta" : "Skip" }),
                tourStep < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTourStep(tourStep + 1), style: { flex: 1, background: BLAZE, color: PAPER, border: "none", borderRadius: 10, padding: "10px 0", fontWeight: 700, cursor: "pointer" }, children: [
                  lang === "it" ? "Avanti" : "Next",
                  " →"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                  setShowTour(false);
                  try {
                    localStorage.setItem("o40_seenTour", "1");
                  } catch {
                  }
                }, style: { flex: 1, background: BLAZE, color: PAPER, border: "none", borderRadius: 10, padding: "10px 0", fontWeight: 700, cursor: "pointer" }, children: "INIZIA" })
              ] })
            ] })
          }
        );
      })(),
      showBellyTest && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "o40-tour-mask",
          onClick: () => setShowBellyTest(false),
          style: { zIndex: 20 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "o40-tour-card",
              onClick: (e) => e.stopPropagation(),
              style: { maxHeight: "90vh", overflowY: "auto", maxWidth: 440, width: "92vw" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                BellyTest,
                {
                  lang,
                  initial: profile == null ? void 0 : profile.bellyTest,
                  onSave: saveBellyTest,
                  onClose: () => setShowBellyTest(false)
                }
              )
            }
          )
        }
      ),
      showPose && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-tour-mask", onClick: () => setShowPose(null), style: { zIndex: 25 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "o40-tour-card",
          onClick: (e) => e.stopPropagation(),
          style: {
            maxHeight: "90vh",
            overflowY: "auto",
            maxWidth: 560,
            width: "96vw",
            padding: 0,
            overflow: "hidden",
            border: `1px solid ${OLIVE}`,
            borderRadius: 18
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            FitnessEngineView,
            {
              exercise: typeof showPose === "string" ? showPose : "squat",
              lang,
              onClose: () => setShowPose(null),
              onDone: ({ reps, elapsedMs, avgQuality }) => {
                showToast(
                  `${reps} rep · ${Math.round(elapsedMs / 1e3)}s · Q ${Math.round(avgQuality)}/100`
                );
              }
            }
          )
        }
      ) })
    ] })
  ] }) });
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
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#1B1D16",
            color: "#EDE8D8",
            padding: 24,
            textAlign: "center"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { fontFamily: "Bebas Neue, sans-serif", fontSize: 28, letterSpacing: "0.05em" },
                children: "OPERAZIONE INTERROTTA"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { opacity: 0.7, marginTop: 8, maxWidth: 360 }, children: "Si è verificato un errore imprevisto. I tuoi dati (missioni, foto, profilo) restano salvati — non disinstallare l’app." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => window.location.reload(),
                style: {
                  marginTop: 20,
                  background: "#C1440E",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 24px",
                  fontWeight: 700,
                  cursor: "pointer",
                  width: "100%",
                  maxWidth: 360
                },
                children: "RICARICA"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: this.handleFix,
                disabled: isFixing,
                style: {
                  marginTop: 10,
                  background: isFixing ? "#4A5233" : "#242820",
                  color: "#EDE8D8",
                  border: "1px solid #4A5233",
                  borderRadius: 10,
                  padding: "12px 24px",
                  fontWeight: 700,
                  cursor: "pointer",
                  width: "100%",
                  maxWidth: 360
                },
                children: isFixing ? "PULIZIA IN CORSO..." : "PULISCI CACHE PWA (mantiene i dati)"
              }
            ),
            this.state.fixLog && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 10, fontSize: 11, opacity: 0.6 }, children: this.state.fixLog }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "./force-update.html",
                style: { marginTop: 12, fontSize: 12, color: "#B8AE8C", textDecoration: "underline" },
                children: "Apri pagina di recupero"
              }
            ),
            this.state.error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "pre",
              {
                style: {
                  marginTop: 16,
                  fontSize: 11,
                  opacity: 0.5,
                  maxWidth: 360,
                  overflow: "auto",
                  textAlign: "left"
                },
                children: String(this.state.error.message || this.state.error)
              }
            )
          ]
        }
      );
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
  primaryBtn as $,
  getAveragePace as A,
  BLAZE as B,
  getStreakRisk as C,
  getBellyProgress as D,
  greeting as E,
  CAMP_DAYS as F,
  vibrate as G,
  getBellyInsight as H,
  INK as I,
  EXERCISES as J,
  KHAKI as K,
  LANGS as L,
  getBellyStreak as M,
  shouldProgressBellyLevel as N,
  OLIVE as O,
  PAPER as P,
  QUICK_PROGRAM as Q,
  btnIcon as R,
  STEEL as S,
  TRACKS as T,
  EXERCISE_GROUPS as U,
  speak as V,
  WEEKLY_GOAL as W,
  levelPreset as X,
  estimateProgramKcal as Y,
  totalSeqSeconds as Z,
  __vitePreload as _,
  OLIVE_DARK as a,
  getReps as a0,
  HOLD_EXERCISES as a1,
  detectLang as a2,
  localizedCue as a3,
  getDefinition as a4,
  normalizeExerciseId as a5,
  PositioningMask as a6,
  FitnessEngine as a7,
  drawSkeleton as a8,
  alignmentScore as a9,
  getVocalMotivation as aa,
  formatTime as ab,
  iconCircle as ac,
  pillBtn as ad,
  LOCALES as ae,
  hrZone as af,
  RPE_LABELS as ag,
  RPE_COLORS as ah,
  computeStreak as ai,
  buildHeatmap as aj,
  getPersonalRecords as ak,
  buildYearHeatmap as al,
  getMonthlyTrend as am,
  dayKey as an,
  sessionDayKey as ao,
  getNextMedals as ap,
  WebPlugin as aq,
  registerPlugin as ar,
  INK_2 as b,
  INTERVAL_PRESETS as c,
  LEVELS as d,
  primaryBtnLarge as e,
  BLAZE_DEEP as f,
  getLevel as g,
  isStandalonePWA as h,
  inputStyle as i,
  jsxRuntimeExports as j,
  computeBestStreak as k,
  getConsistencyScore as l,
  PROGRAMS as m,
  BELLY_IDS as n,
  getBellyCount as o,
  playBeep as p,
  getMedalProgress as q,
  computeStreakWithFreeze as r,
  secondaryBtn as s,
  tr$1 as t,
  useT as u,
  pickNextProgram as v,
  getRank as w,
  nextBadge as x,
  campDayDisplay as y,
  getWeeklyProgress as z
};
