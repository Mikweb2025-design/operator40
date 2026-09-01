import { u as useT, g as getLevel, j as jsxRuntimeExports, L as LANGS, B as BLAZE, K as KHAKI, O as OLIVE, a as OLIVE_DARK, I as INK, b as INK_2, S as STEEL, i as inputStyle, T as TRACKS, P as PAPER, c as INTERVAL_PRESETS, d as LEVELS, t as tr, s as secondaryBtn, e as primaryBtnLarge, f as BLAZE_DEEP, h as isStandalonePWA } from "./index-DnzZm8wt.js";
import { r as reactExports, V as Volume2, j as VolumeX, k as Vibrate, l as SkipForward, M as Music, S as Sparkles, A as Activity, a as Timer, m as Music2, n as HeadphoneOff, i as ChevronLeft, f as RefreshCw, o as Crown, p as Medal, q as HeartPulse, D as Download, U as Upload, s as Bell, t as BellOff, u as Send, b as ChevronRight } from "./icons-Cu976FrU.js";
import { T as TopBar } from "./TopBar-B0jH1Xov.js";
import "./charts-Cp2TOHCu.js";
const HUAWEI_ACTIVITY_MAP = {
  // codici numerici string + nomi
  "258": { it: "Forza funzionale (Huawei Health)", en: "Functional strength (Huawei)", de: "Funktionelles Krafttraining (Huawei)" },
  "259": { it: "Core training (Huawei Health)", en: "Core training (Huawei)", de: "Core-Training (Huawei)" },
  "260": { it: "Allenamento forza (Huawei Health)", en: "Strength training (Huawei)", de: "Krafttraining (Huawei)" },
  "264": { it: "HIIT (Huawei Health)", en: "HIIT (Huawei)", de: "HIIT (Huawei)" },
  "19": { it: "Cross training (Huawei Health)", en: "Cross training (Huawei)", de: "Cross-Training (Huawei)" },
  "0": { it: "Corsa (Huawei Health)", en: "Running (Huawei)", de: "Laufen (Huawei)" },
  "1": { it: "Camminata (Huawei Health)", en: "Walking (Huawei)", de: "Gehen (Huawei)" },
  // nomi testuali che Huawei usa in alcuni export
  "functional": { it: "Forza funzionale (Huawei Health)", en: "Functional strength (Huawei)", de: "Funktionelles Krafttraining (Huawei)" },
  "strength": { it: "Allenamento forza (Huawei Health)", en: "Strength training (Huawei)", de: "Krafttraining (Huawei)" },
  "hiit": { it: "HIIT (Huawei Health)", en: "HIIT (Huawei)", de: "HIIT (Huawei)" },
  "cross": { it: "Cross training (Huawei Health)", en: "Cross training (Huawei)", de: "Cross-Training (Huawei)" }
};
const HUAWEI_RELEVANT = new Set(Object.keys(HUAWEI_ACTIVITY_MAP));
function toHuaweiTypeKey(raw) {
  if (raw == null) return null;
  const s = String(raw).toLowerCase().trim();
  if (HUAWEI_RELEVANT.has(s)) return s;
  for (const k of HUAWEI_RELEVANT) {
    if (s.includes(k)) return k;
  }
  const num = String(parseInt(s, 10));
  if (HUAWEI_RELEVANT.has(num)) return num;
  return null;
}
function parseHuaweiDate(v) {
  if (v == null) return null;
  if (typeof v === "number" || /^\d{12,13}$/.test(String(v))) {
    const d2 = new Date(Number(v));
    return isNaN(d2.getTime()) ? null : d2;
  }
  const d = new Date(String(v).replace(" ", "T"));
  return isNaN(d.getTime()) ? null : d;
}
function parseHuaweiHealthExport(text, fileName = "") {
  var _a;
  const result = { weightKg: null, weightDate: null, workouts: [] };
  const lowerName = fileName.toLowerCase();
  if (lowerName.endsWith(".json") || text.trim().startsWith("{") || text.trim().startsWith("[")) {
    try {
      const j = JSON.parse(text);
      return parseHuaweiJson(j, result);
    } catch {
    }
  }
  if (text.includes("<TrainingCenterDatabase") || text.includes("<Activities>")) {
    return parseHuaweiTcx(text, result);
  }
  if (text.includes("start_time") || text.includes("startTime") || ((_a = text.split("\n")[0]) == null ? void 0 : _a.includes(","))) {
    const csvRes = parseHuaweiCsv(text, result);
    if (csvRes.workouts.length) return csvRes;
  }
  try {
    const j = JSON.parse(text);
    return parseHuaweiJson(j, result);
  } catch {
  }
  return result;
}
function parseHuaweiJson(j, result) {
  var _a, _b, _c;
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
    for (const v of Object.values(j)) {
      if (Array.isArray(v) && v[0] && (v[0].startTime || v[0].start_time || v[0].sportType !== void 0)) {
        arr = v;
        break;
      }
    }
  }
  if (!arr) {
    if (j.hihealth && Array.isArray(j.hihealth.workouts)) arr = j.hihealth.workouts;
    if (!arr) return result;
  }
  const weightCandidates = [
    j.weight,
    j.bodyWeight,
    j.weightKg,
    j.currentWeight,
    (_a = j == null ? void 0 : j.body) == null ? void 0 : _a.weight,
    (_b = j == null ? void 0 : j.health) == null ? void 0 : _b.weight,
    (_c = j == null ? void 0 : j.profile) == null ? void 0 : _c.weight
  ];
  for (const w of weightCandidates) {
    if (w != null) {
      const n = parseFloat(String(w).replace(",", "."));
      if (!isNaN(n) && n > 20 && n < 300) {
        result.weightKg = Math.round(n * 10) / 10;
        result.weightDate = (/* @__PURE__ */ new Date()).toISOString();
        break;
      }
    }
  }
  if (result.weightKg == null && arr) {
    for (const s of arr) {
      if (String(s.type || s.dataType || "").toLowerCase().includes("weight") && s.value) {
        const n = parseFloat(s.value);
        if (!isNaN(n)) {
          result.weightKg = Math.round(n * 10) / 10;
          result.weightDate = s.startTime || s.time;
          break;
        }
      }
    }
  }
  let wcount = 0;
  for (const w of arr) {
    if (wcount >= 5e3) break;
    const typeRaw = w.sportType ?? w.exerciseType ?? w.type ?? w.activityType ?? w.workoutType ?? w.sport_type;
    const key = toHuaweiTypeKey(typeRaw);
    const startRaw = w.startTime ?? w.start_time ?? w.startDate ?? w.beginTime ?? w.time;
    const d = parseHuaweiDate(startRaw);
    if (!d) continue;
    const isRelevant = key && HUAWEI_RELEVANT.has(key);
    const hasMetrics = (w.duration ?? w.totalTime ?? w.calorie ?? w.calories) != null;
    if (!isRelevant && !hasMetrics) continue;
    const durSecRaw = w.duration ?? w.totalTime ?? w.durationSec ?? w.sportTime ?? 0;
    const durMin = durSecRaw > 300 ? Math.round(Number(durSecRaw) / 60) : Math.round(Number(durSecRaw) || 15);
    const kcalRaw = w.calorie ?? w.calories ?? w.cal ?? w.totalCalories ?? w.energy;
    const kcal = kcalRaw ? Math.round(parseFloat(kcalRaw)) : Math.round(durMin * 6);
    const typeKey = key || "258";
    result.workouts.push({ type: typeKey, durationMin: durMin || 15, kcal, startDate: d.toISOString() });
    wcount++;
  }
  return result;
}
function parseHuaweiTcx(xmlText, result) {
  const activityRegex = /<Activity[^>]*>([\s\S]*?)<\/Activity>/g;
  const lapRegex = /<Lap[^>]*StartTime="([^"]*)"[^>]*>([\s\S]*?)<\/Lap>/g;
  let m;
  let count = 0;
  while ((m = activityRegex.exec(xmlText)) && count < 5e3) {
    const activityBody = m[1];
    const sport = (m[0].match(/Sport="([^"]*)"/) || [])[1] || "Other";
    let lapMatch;
    while ((lapMatch = lapRegex.exec(activityBody)) && count < 5e3) {
      const start = lapMatch[1];
      const lapBody = lapMatch[2];
      const secStr = (lapBody.match(/<TotalTimeSeconds>([^<]*)<\/TotalTimeSeconds>/) || [])[1];
      const kcalStr = (lapBody.match(/<Calories>([^<]*)<\/Calories>/) || [])[1];
      const sec = secStr ? parseFloat(secStr) : 0;
      const kcal = kcalStr ? Math.round(parseFloat(kcalStr)) : Math.round(sec / 60 * 6);
      const durMin = Math.round(sec / 60) || 15;
      const typeKey = toHuaweiTypeKey(sport) || "258";
      result.workouts.push({ type: typeKey, durationMin: durMin, kcal, startDate: start });
      count++;
    }
    if (count === 0) {
      const secStr = (activityBody.match(/<TotalTimeSeconds>([^<]*)<\/TotalTimeSeconds>/) || [])[1];
      if (secStr) {
        const start = (activityBody.match(/StartTime="([^"]*)"/) || [])[1];
        if (start) {
          result.workouts.push({ type: toHuaweiTypeKey(sport) || "258", durationMin: Math.round(parseFloat(secStr) / 60) || 15, kcal: Math.round(parseFloat(secStr) / 60 * 6), startDate: start });
          count++;
        }
      }
    }
  }
  return result;
}
function parseHuaweiCsv(text, result) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (!lines.length) return result;
  const header = lines[0].toLowerCase().split(/[,;]/).map((s) => s.trim());
  const idxStart = header.findIndex((h) => h.includes("start"));
  header.findIndex((h) => h.includes("end"));
  const idxType = header.findIndex((h) => h.includes("type") || h.includes("sport") || h.includes("exercise"));
  const idxKcal = header.findIndex((h) => h.includes("kcal") || h.includes("calorie") || h.includes("cal"));
  const idxDur = header.findIndex((h) => h.includes("duration") || h.includes("time") || h.includes("durata"));
  const idxWeight = header.findIndex((h) => h.includes("weight") || h.includes("peso"));
  let wcount = 0;
  for (let i = 1; i < lines.length && wcount < 5e3; i++) {
    const cols = lines[i].split(/[,;]/);
    if (cols.length < 2) continue;
    if (idxWeight >= 0 && cols[idxWeight]) {
      const n = parseFloat(cols[idxWeight].replace(",", "."));
      if (!isNaN(n) && n > 20 && n < 300 && result.weightKg == null) {
        result.weightKg = Math.round(n * 10) / 10;
        result.weightDate = cols[idxStart] || (/* @__PURE__ */ new Date()).toISOString();
      }
    }
    const startRaw = idxStart >= 0 ? cols[idxStart] : cols[0];
    const d = parseHuaweiDate(startRaw);
    if (!d) continue;
    const typeRaw = idxType >= 0 ? cols[idxType] : "258";
    const kcalRaw = idxKcal >= 0 ? cols[idxKcal] : null;
    const durRaw = idxDur >= 0 ? cols[idxDur] : null;
    const durMin = durRaw ? Math.round(parseFloat(durRaw) / 60) || Math.round(parseFloat(durRaw)) || 15 : 15;
    const kcal = kcalRaw ? Math.round(parseFloat(kcalRaw)) : Math.round(durMin * 6);
    const key = toHuaweiTypeKey(typeRaw) || "258";
    result.workouts.push({ type: key, durationMin: durMin, kcal, startDate: d.toISOString() });
    wcount++;
  }
  return result;
}
const HR_SERVICE = 6157;
const HR_CHAR = 10807;
const BATTERY_SERVICE = 6159;
const BATTERY_CHAR = 10777;
async function connectHuaweiWatch({ onHeartRate, onBattery, onStatus } = {}) {
  if (!navigator.bluetooth) {
    throw new Error("Bluetooth non disponibile in questo browser. Usa Chrome/Edge su Android o Mac.");
  }
  const status = (s) => onStatus && onStatus(s);
  status("searching");
  let device;
  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [
        { namePrefix: "HUAWEI" },
        { namePrefix: "WATCH" },
        { namePrefix: "GT" }
      ],
      optionalServices: [HR_SERVICE, BATTERY_SERVICE]
    });
  } catch (e) {
    device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [HR_SERVICE, BATTERY_SERVICE]
    });
  }
  status("connecting");
  const server = await device.gatt.connect();
  const hrService = await server.getPrimaryService(HR_SERVICE).catch(() => null);
  let hrChar = null;
  if (hrService) {
    hrChar = await hrService.getCharacteristic(HR_CHAR).catch(() => null);
    if (hrChar && hrChar.properties.notify) {
      await hrChar.startNotifications();
      hrChar.addEventListener("characteristicvaluechanged", (e) => {
        const v = e.target.value;
        const flags = v.getUint8(0);
        const is16 = flags & 1;
        const hr = is16 ? v.getUint16(1, true) : v.getUint8(1);
        onHeartRate && onHeartRate(hr);
      });
      status("connected-hr");
    }
  }
  try {
    const batService = await server.getPrimaryService(BATTERY_SERVICE);
    const batChar = await batService.getCharacteristic(BATTERY_CHAR);
    const batVal = await batChar.readValue();
    onBattery && onBattery(batVal.getUint8(0));
  } catch {
  }
  device.addEventListener("gattserverdisconnected", () => status("disconnected"));
  return {
    device,
    server,
    disconnect: () => {
      try {
        device.gatt.disconnect();
      } catch {
      }
    }
  };
}
function ToggleRow({ label, icon: Icon, on, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick,
      style: {
        width: "100%",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 8px"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, color: on ? BLAZE : STEEL, style: { flexShrink: 0 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: PAPER, fontSize: 13.5, lineHeight: 1.3 }, children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              width: 40,
              height: 22,
              borderRadius: 11,
              background: on ? BLAZE : OLIVE_DARK,
              position: "relative",
              transition: "background 0.2s",
              flexShrink: 0,
              marginLeft: 10
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  position: "absolute",
                  top: 2,
                  left: on ? 20 : 2,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: PAPER,
                  transition: "left 0.2s"
                }
              }
            )
          }
        )
      ]
    }
  );
}
function Field({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "o40-mono",
        style: {
          color: KHAKI,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 6
        },
        children: label
      }
    ),
    children
  ] });
}
function SetupScreen({
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
  onSave,
  canCancel,
  onCancel,
  soundOn,
  onToggleSound,
  vibrationOn,
  onToggleVibration,
  musicOn,
  onToggleMusic,
  musicTrack,
  onSelectTrack,
  musicVolume,
  onChangeMusicVolume,
  musicAutoPlay,
  onToggleAutoPlay,
  musicShuffle,
  onToggleShuffle,
  onNextTrack,
  onPrevTrack,
  skipWarmup,
  onToggleSkipWarmup,
  voiceCountdown,
  onToggleVoiceCountdown,
  vocalMotivation,
  onToggleVocalMotivation,
  motionFusion,
  onToggleMotionFusion,
  tempoEnabled,
  onToggleTempo,
  tempoBpm,
  onSetTempoBpm,
  level,
  onSetLevel,
  intervalPreset,
  onSetIntervalPreset,
  executionMode,
  onSetExecutionMode,
  onImportHealth,
  healthImportStatus,
  healthWeightSuggestion,
  onApplyHealthWeight,
  showToast,
  largeText,
  setLargeText,
  pushEnabled,
  pushSupported,
  pushBusy,
  onTogglePush,
  onTestPush,
  onExportBackup,
  onImportBackup
}) {
  var _a;
  const { lang, t, setLang } = useT();
  const curLevel = getLevel(level || "combattente");
  const [huaweiStatus, setHuaweiStatus] = reactExports.useState("idle");
  const [huaweiWatchStatus, setHuaweiWatchStatus] = reactExports.useState("idle");
  const [huaweiWatchHr, setHuaweiWatchHr] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-screen-in", style: { flex: 1, display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopBar, { title: t("setup.title"), onBack: canCancel ? onCancel : null }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "o40-scroll",
        style: {
          flex: 1,
          overflowY: "auto",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 18
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8 }, children: LANGS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setLang(l),
              style: {
                flex: 1,
                padding: "9px 0",
                borderRadius: 10,
                cursor: "pointer",
                textAlign: "center",
                background: lang === l ? OLIVE_DARK : INK,
                border: `1px solid ${lang === l ? BLAZE : OLIVE}`,
                color: lang === l ? BLAZE : KHAKI,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.05em"
              },
              children: l === "it" ? "ITALIANO" : l === "en" ? "ENGLISH" : "DEUTSCH"
            },
            l
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: INK_2,
                border: `1px solid ${OLIVE}`,
                borderRadius: 10,
                padding: "8px 12px"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "o40-mono",
                    style: { color: KHAKI, fontSize: 10, letterSpacing: "0.06em" },
                    children: "A11Y · Testo grande"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setLargeText((v) => !v),
                    style: {
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: `1px solid ${largeText ? BLAZE : OLIVE}`,
                      background: largeText ? `${BLAZE}22` : "transparent",
                      color: largeText ? BLAZE : STEEL,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer"
                    },
                    children: largeText ? "A Grande ✓" : "A Normale"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: { color: STEEL, fontSize: 14, lineHeight: 1.5 },
              dangerouslySetInnerHTML: { __html: t("setup.intro") }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("setup.name"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: formName,
              onChange: (e) => setFormName(e.target.value),
              placeholder: t("setup.name.ph"),
              className: "o40-input",
              style: inputStyle
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("setup.age"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: formAge,
              onChange: (e) => setFormAge(e.target.value.replace(/\D/g, "")),
              inputMode: "numeric",
              placeholder: "40",
              className: "o40-input",
              style: inputStyle
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("setup.weight"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: formWeight,
              onChange: (e) => setFormWeight(e.target.value.replace(/\D/g, "")),
              inputMode: "numeric",
              placeholder: "82",
              className: "o40-input",
              style: inputStyle
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("setup.waist"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: formWaist,
              onChange: (e) => setFormWaist(e.target.value.replace(/\D/g, "")),
              inputMode: "numeric",
              placeholder: t("setup.waist.ph"),
              className: "o40-input",
              style: inputStyle
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("setup.height"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: formHeight,
              onChange: (e) => setFormHeight(e.target.value.replace(/\D/g, "")),
              inputMode: "numeric",
              placeholder: t("setup.height.ph"),
              className: "o40-input",
              style: inputStyle
            }
          ) }),
          canCancel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: INK_2,
                border: `1px solid ${OLIVE}`,
                borderRadius: 14,
                padding: 4
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ToggleRow,
                  {
                    label: t("setup.sounds"),
                    icon: soundOn ? Volume2 : VolumeX,
                    on: soundOn,
                    onClick: onToggleSound
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: OLIVE_DARK, margin: "0 12px" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ToggleRow,
                  {
                    label: t("setup.vibration"),
                    icon: Vibrate,
                    on: vibrationOn,
                    onClick: onToggleVibration
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: OLIVE_DARK, margin: "0 12px" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ToggleRow,
                  {
                    label: t("setup.skip"),
                    icon: SkipForward,
                    on: skipWarmup,
                    onClick: onToggleSkipWarmup
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: OLIVE_DARK, margin: "0 12px" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ToggleRow,
                  {
                    label: lang === "it" ? "Conto vocale" : lang === "de" ? "Sprach-Countdown" : "Voice countdown",
                    icon: Music,
                    on: voiceCountdown,
                    onClick: onToggleVoiceCountdown
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: OLIVE_DARK, margin: "0 12px" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ToggleRow,
                  {
                    label: lang === "it" ? "Motivazioni vocali" : lang === "de" ? "Sprach-Motivation" : "Voice motivation",
                    icon: Sparkles,
                    on: vocalMotivation,
                    onClick: onToggleVocalMotivation
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: OLIVE_DARK, margin: "0 12px" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ToggleRow,
                  {
                    label: lang === "it" ? "IMU Motion — jumpingJack/burpee" : lang === "de" ? "IMU Motion — jumpingJack/burpee" : "IMU Motion — jumpingJack/burpee",
                    icon: Activity,
                    on: motionFusion,
                    onClick: onToggleMotionFusion
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: OLIVE_DARK, margin: "0 12px" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ToggleRow,
                  {
                    label: lang === "it" ? `TEMPO metronomo ${tempoBpm} BPM` : `TEMPO metronome ${tempoBpm} BPM`,
                    icon: Timer,
                    on: tempoEnabled,
                    onClick: onToggleTempo
                  }
                ),
                tempoEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "6px 12px 10px", display: "flex", alignItems: "center", gap: 10 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: STEEL, fontSize: 11 }, children: "40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 40, max: 60, value: tempoBpm, onChange: (e) => onSetTempoBpm(e.target.value), style: { flex: 1, accentColor: BLAZE } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: BLAZE, fontSize: 11 }, children: [
                    tempoBpm,
                    " BPM"
                  ] })
                ] })
              ]
            }
          ),
          canCancel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "o40-sheen",
              style: {
                background: INK_2,
                border: `1px solid ${OLIVE}`,
                borderRadius: 14,
                padding: 4,
                position: "relative",
                overflow: "hidden"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ToggleRow,
                  {
                    label: t("setup.music"),
                    icon: musicOn ? Music2 : HeadphoneOff,
                    on: musicOn,
                    onClick: onToggleMusic
                  }
                ),
                musicOn && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "8px 10px 12px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        background: INK,
                        border: `1px solid ${OLIVE}`,
                        borderRadius: 10,
                        padding: "10px 12px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 10
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: onPrevTrack,
                            style: {
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: OLIVE_DARK,
                              border: `1px solid ${OLIVE}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer"
                            },
                            "aria-label": "Prev",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16, color: KHAKI })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0, textAlign: "center" }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "o40-mono",
                              style: { color: BLAZE, fontSize: 9, letterSpacing: "0.08em" },
                              children: musicAutoPlay ? musicShuffle ? "SHUFFLE • AUTOPLAY" : "AUTOPLAY • TUTTE" : "SINGOLA"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                color: PAPER,
                                fontSize: 12,
                                fontWeight: 700,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                              },
                              children: (TRACKS.find((t2) => t2.id === musicTrack) || TRACKS[0]).name
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 10 }, children: (TRACKS.find((t2) => t2.id === musicTrack) || TRACKS[0]).artist })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: onNextTrack,
                            style: {
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: BLAZE,
                              border: "none",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer"
                            },
                            "aria-label": "Next",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { size: 16, color: PAPER })
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, marginBottom: 10 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        onClick: onToggleAutoPlay,
                        style: {
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          padding: "7px 8px",
                          borderRadius: 8,
                          border: `1px solid ${musicAutoPlay ? BLAZE : OLIVE}`,
                          background: musicAutoPlay ? `${BLAZE}22` : "transparent",
                          color: musicAutoPlay ? BLAZE : STEEL,
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: "pointer"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 12 }),
                          " ",
                          musicAutoPlay ? "Auto • Tutte" : "Singola"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        onClick: onToggleShuffle,
                        style: {
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          padding: "7px 8px",
                          borderRadius: 8,
                          border: `1px solid ${musicShuffle ? BLAZE : OLIVE}`,
                          background: musicShuffle ? `${BLAZE}22` : "transparent",
                          color: musicShuffle ? BLAZE : STEEL,
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: "pointer"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            RefreshCw,
                            {
                              size: 12,
                              style: { transform: musicShuffle ? "rotate(180deg)" : "none" }
                            }
                          ),
                          " ",
                          musicShuffle ? "Shuffle ON" : "Shuffle OFF"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        color: STEEL,
                        fontSize: 11.5,
                        marginBottom: 8,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("setup.music.pick") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: KHAKI, fontSize: 10 }, children: [
                          TRACKS.length,
                          " brani • ",
                          musicAutoPlay ? "auto" : "loop singolo"
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        maxHeight: 220,
                        overflowY: "auto"
                      },
                      children: TRACKS.map((track) => {
                        const on = musicTrack === track.id;
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            onClick: () => onSelectTrack(track.id),
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              padding: "9px 12px",
                              borderRadius: 10,
                              cursor: "pointer",
                              textAlign: "left",
                              background: on ? OLIVE_DARK : INK,
                              border: `1px solid ${on ? BLAZE : OLIVE}`
                            },
                            children: [
                              on ? /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { size: 15, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { size: 15, color: STEEL }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: PAPER, fontSize: 12 }, children: track.name }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: "o40-mono",
                                      style: {
                                        fontSize: 9,
                                        color: track.lang === "IT" ? "#7FB069" : track.lang === "DE" ? "#D9B34C" : STEEL,
                                        border: `1px solid ${track.lang === "IT" ? "#7FB06966" : track.lang === "DE" ? "#D9B34C66" : `${STEEL}44`}`,
                                        borderRadius: 4,
                                        padding: "0 4px"
                                      },
                                      children: track.lang
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 10.5 }, children: [
                                  track.artist,
                                  " · ",
                                  track.tag,
                                  " · 2:00 ",
                                  on && musicOn ? "• ora" : ""
                                ] })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "o40-mono",
                                  style: { color: on ? BLAZE : KHAKI, fontSize: 10 },
                                  children: on ? musicOn ? "▶" : t("setup.music.playing") : t("setup.music.listen")
                                }
                              )
                            ]
                          },
                          track.id
                        );
                      })
                    }
                  ),
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
              ]
            }
          ),
          canCancel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: INK_2,
                border: `1px solid ${OLIVE}`,
                borderRadius: 14,
                padding: 14
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "o40-mono",
                    style: {
                      color: KHAKI,
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 4
                    },
                    children: t("setup.level")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginBottom: 10 }, children: t("setup.level.hint") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }, children: INTERVAL_PRESETS.map((pr) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => {
                      onSetIntervalPreset(pr.key);
                      if (pr.key !== "custom") {
                        setFormCustomWork(String(pr.work));
                        setFormCustomRest(String(pr.rest));
                      }
                    },
                    style: {
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: `1px solid ${intervalPreset === pr.key ? BLAZE : OLIVE}`,
                      background: intervalPreset === pr.key ? `${BLAZE}22` : "transparent",
                      color: intervalPreset === pr.key ? BLAZE : STEEL,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer"
                    },
                    children: pr.label
                  },
                  pr.key
                )) }),
                intervalPreset === "custom" || formCustomWork !== "40" || formCustomRest !== "20" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 12 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("setup.custom.work"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      value: formCustomWork,
                      onChange: (e) => setFormCustomWork(e.target.value),
                      type: "number",
                      inputMode: "numeric",
                      className: "o40-input",
                      style: inputStyle
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("setup.custom.rest"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      value: formCustomRest,
                      onChange: (e) => setFormCustomRest(e.target.value),
                      type: "number",
                      inputMode: "numeric",
                      className: "o40-input",
                      style: inputStyle
                    }
                  ) })
                ] }) : null,
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: INK,
                      border: `1px solid ${OLIVE}`,
                      borderRadius: 10,
                      padding: 10,
                      marginBottom: 12
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "o40-mono",
                          style: { color: KHAKI, fontSize: 10, letterSpacing: "0.07em", marginBottom: 6 },
                          children: t("setup.executionMode")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            onClick: () => onSetExecutionMode("time"),
                            style: {
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: 2,
                              padding: "10px 8px",
                              borderRadius: 8,
                              border: `1px solid ${executionMode === "time" ? BLAZE : OLIVE}`,
                              background: executionMode === "time" ? `${BLAZE}22` : "transparent",
                              color: executionMode === "time" ? BLAZE : STEEL,
                              cursor: "pointer"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, fontWeight: 700 }, children: t("setup.mode.time") }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 9, color: STEEL, textAlign: "center", lineHeight: 1.3 }, children: t("setup.mode.time.hint") })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            onClick: () => onSetExecutionMode("reps"),
                            style: {
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: 2,
                              padding: "10px 8px",
                              borderRadius: 8,
                              border: `1px solid ${executionMode === "reps" ? BLAZE : OLIVE}`,
                              background: executionMode === "reps" ? `${BLAZE}22` : "transparent",
                              color: executionMode === "reps" ? BLAZE : STEEL,
                              cursor: "pointer"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, fontWeight: 700 }, children: t("setup.mode.reps") }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 9, color: STEEL, textAlign: "center", lineHeight: 1.3 }, children: t("setup.mode.reps.hint") })
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 10, marginTop: 6, textAlign: "center" }, children: executionMode === "reps" ? "Es: 12× squat → FATTO → recupero 20″ (auto)" : "Standard tempo — adatto a dimagrimento" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: LEVELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => onSetLevel(l.key),
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      borderRadius: 10,
                      cursor: "pointer",
                      textAlign: "left",
                      background: curLevel.key === l.key ? OLIVE_DARK : INK,
                      border: `1px solid ${curLevel.key === l.key ? BLAZE : OLIVE}`
                    },
                    children: [
                      curLevel.key === l.key ? /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 15, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { size: 15, color: STEEL }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: PAPER, fontSize: 12.5 }, children: tr(l.label, lang) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11 }, children: tr(l.desc, lang) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "o40-mono",
                          style: { color: curLevel.key === l.key ? BLAZE : KHAKI, fontSize: 11 },
                          children: [
                            l.work,
                            "″/",
                            l.rest,
                            "″"
                          ]
                        }
                      )
                    ]
                  },
                  l.key
                )) })
              ]
            }
          ),
          canCancel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: INK_2,
                border: `1px solid ${OLIVE}`,
                borderRadius: 14,
                padding: 14
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "o40-mono",
                    style: {
                      color: KHAKI,
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 8
                    },
                    children: t("setup.health")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 10 },
                    dangerouslySetInnerHTML: { __html: t("setup.health.body") }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    style: {
                      ...secondaryBtn,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      cursor: "pointer",
                      width: "100%"
                    },
                    children: [
                      healthImportStatus === "reading" || healthImportStatus === "parsing" ? t("setup.health.processing") : t("setup.health.upload"),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "file",
                          accept: ".xml",
                          style: { display: "none" },
                          onChange: (e) => {
                            const f = e.target.files && e.target.files[0];
                            if (f) onImportHealth(f);
                            e.target.value = "";
                          }
                        }
                      )
                    ]
                  }
                ),
                healthImportStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: BLAZE, fontSize: 11.5, marginTop: 8 }, children: t("setup.health.error") }),
                healthWeightSuggestion && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      marginTop: 12,
                      background: INK,
                      border: `1px solid ${BLAZE}`,
                      borderRadius: 10,
                      padding: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 10
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, color: PAPER, fontSize: 12.5 }, children: [
                        t("setup.health.weight"),
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                          healthWeightSuggestion.kg,
                          " kg"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: onApplyHealthWeight,
                          style: { ...primaryBtnLarge, width: "auto", padding: "8px 14px", fontSize: 13 },
                          children: t("setup.health.apply")
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          canCancel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: INK_2,
                border: `1px solid ${OLIVE}`,
                borderRadius: 14,
                padding: 14
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "o40-mono",
                    style: {
                      color: KHAKI,
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 6
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { size: 14, color: BLAZE }),
                      " Huawei Health"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }, children: lang === "it" ? "Importa da Huawei Health: esporta da Huawei Health → Richiedi i tuoi dati → JSON/TCX/CSV. Lettura 100% locale, come Apple Health." : lang === "de" ? "Aus Huawei Health importieren: JSON/TCX/CSV — 100% lokal." : "Import from Huawei Health: JSON/TCX/CSV — 100% on-device." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    style: {
                      ...secondaryBtn,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      cursor: "pointer",
                      width: "100%"
                    },
                    children: [
                      huaweiStatus === "parsing" ? t("setup.health.processing") : "Carica Huawei JSON/TCX/CSV",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "file",
                          accept: ".json,.tcx,.csv",
                          style: { display: "none" },
                          onChange: async (e) => {
                            const f = e.target.files && e.target.files[0];
                            if (!f) return;
                            setHuaweiStatus("parsing");
                            try {
                              const text = await f.text();
                              const parsed = parseHuaweiHealthExport(text, f.name);
                              if (!parsed.workouts.length && !parsed.weightKg) throw new Error("empty");
                              const r = await window.storage.get("o40_sessions", false);
                              const cur = r ? JSON.parse(r.value) : [];
                              const existing = new Set(cur.map((s) => s.date));
                              let added = 0;
                              for (const w of parsed.workouts) {
                                const d = w.startDate ? new Date(w.startDate) : null;
                                if (!d || isNaN(d)) continue;
                                const iso = d.toISOString();
                                if (existing.has(iso)) continue;
                                cur.push({ date: iso, programId: "health-import", programName: w.type || "Huawei", kcal: w.kcal || 120, peakHR: null, rpe: null, notes: null, imported: true });
                                existing.add(iso);
                                added++;
                              }
                              cur.sort((a, b) => new Date(a.date) - new Date(b.date));
                              await window.storage.set("o40_sessions", JSON.stringify(cur), false);
                              if (parsed.weightKg) {
                                showToast && showToast(`Huawei: ${added} allenamenti + peso ${parsed.weightKg}kg`);
                              } else {
                                showToast && showToast(`Huawei: ${added} allenamenti importati`);
                              }
                              setHuaweiStatus("done");
                              setTimeout(() => setHuaweiStatus("idle"), 2e3);
                            } catch (err) {
                              setHuaweiStatus("error");
                              setTimeout(() => setHuaweiStatus("idle"), 2500);
                            }
                            e.target.value = "";
                          }
                        }
                      )
                    ]
                  }
                ),
                huaweiStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: BLAZE, fontSize: 11.5, marginTop: 8 }, children: t("setup.huawei.fileError") }),
                huaweiStatus === "done" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#7FB069", fontSize: 11.5, marginTop: 8 }, children: t("setup.huawei.importOk") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: OLIVE_DARK, margin: "12px 0" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 10, letterSpacing: "0.06em", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 14, color: BLAZE }),
                  " Watch HR Live",
                  huaweiWatchHr && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { marginLeft: "auto", color: BLAZE, fontSize: 14 }, children: [
                    huaweiWatchHr,
                    " bpm ❤️"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginBottom: 8 }, children: t("setup.huawei.watchLive") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: async () => {
                      setHuaweiWatchStatus("searching");
                      try {
                        await connectHuaweiWatch({
                          onHeartRate: (hr) => setHuaweiWatchHr(hr),
                          onStatus: (s) => setHuaweiWatchStatus(s)
                        });
                        setHuaweiWatchStatus("connected");
                      } catch (err) {
                        setHuaweiWatchStatus("error");
                        showToast && showToast(err.message || "Bluetooth fallito");
                        setTimeout(() => setHuaweiWatchStatus("idle"), 2e3);
                      }
                    },
                    disabled: huaweiWatchStatus === "searching" || huaweiWatchStatus === "connected",
                    style: { ...secondaryBtn, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, opacity: huaweiWatchStatus === "searching" ? 0.6 : 1 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { size: 14 }),
                      " ",
                      huaweiWatchStatus === "connected" ? t("setup.huawei.connected") : huaweiWatchStatus === "searching" ? t("setup.huawei.searching") : t("setup.huawei.connect")
                    ]
                  }
                ),
                huaweiWatchStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: BLAZE, fontSize: 11, marginTop: 6 }, children: t("setup.huawei.bluetoothFail") })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: { background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 16, color: KHAKI }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "o40-mono",
                      style: {
                        color: KHAKI,
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        flex: 1
                      },
                      children: t("setup.backup.title")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "o40-mono",
                      style: {
                        fontSize: 9,
                        color: STEEL,
                        border: `1px solid ${OLIVE}`,
                        borderRadius: 6,
                        padding: "2px 6px"
                      },
                      children: "v1"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }, children: t("setup.backup.hint2") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: onExportBackup,
                      style: {
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        padding: "10px 12px",
                        borderRadius: 10,
                        cursor: "pointer",
                        background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`,
                        color: PAPER,
                        border: `1px solid ${BLAZE}`,
                        fontSize: 12,
                        fontWeight: 700
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 14 }),
                        " ",
                        t("setup.backup.export")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      style: {
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        padding: "10px 12px",
                        borderRadius: 10,
                        cursor: "pointer",
                        background: INK,
                        border: `1px solid ${OLIVE}`,
                        color: KHAKI,
                        fontSize: 12,
                        fontWeight: 600
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 14 }),
                        " ",
                        t("setup.backup.restore"),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "file",
                            accept: ".json",
                            style: { display: "none" },
                            onChange: (e) => {
                              const f = e.target.files && e.target.files[0];
                              if (f) onImportBackup(f);
                              e.target.value = "";
                            }
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 10, marginTop: 8, lineHeight: 1.4, opacity: 0.8 }, children: t("setup.backup.hint") })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: INK_2,
                border: `1px solid ${pushEnabled ? BLAZE : OLIVE}`,
                borderRadius: 14,
                padding: 14
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }, children: [
                  pushEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 16, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { size: 16, color: STEEL }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "o40-mono",
                      style: {
                        color: pushEnabled ? BLAZE : KHAKI,
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        flex: 1
                      },
                      children: lang === "it" ? "Push PWA — anche con app chiusa" : lang === "de" ? "Push PWA — auch geschlossen" : "PWA Push — works when closed"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "o40-mono",
                      style: {
                        fontSize: 9,
                        color: pushEnabled ? BLAZE : STEEL,
                        border: `1px solid ${pushEnabled ? BLAZE : OLIVE}`,
                        borderRadius: 6,
                        padding: "2px 6px",
                        background: pushEnabled ? `${BLAZE}18` : "transparent"
                      },
                      children: pushEnabled ? "ON" : "OFF"
                    }
                  )
                ] }),
                !pushSupported ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12, lineHeight: 1.5 }, children: lang === "it" ? "Push non supportato su questo browser (usa Chrome/Android o Safari iOS 16.4+ con PWA installata)." : "Push not supported in this browser." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }, children: [
                    lang === "it" ? "Ricevi la missione giornaliera anche con PWA chiusa. Su iPhone: installa con “Aggiungi a Home” poi attiva." : lang === "de" ? "Tägliche Mission auch bei geschlossener PWA erhalten." : "Get daily mission even when PWA is closed. On iPhone: Add to Home Screen first.",
                    !((_a = isStandalonePWA) == null ? void 0 : _a()) && pushSupported && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: KHAKI, display: "block", marginTop: 4 }, children: [
                      "⚠️",
                      " ",
                      lang === "it" ? "Apri come PWA installata per push in background su iOS." : "Open as installed PWA for background push on iOS."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        onClick: onTogglePush,
                        disabled: pushBusy,
                        style: {
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
                        },
                        children: [
                          pushBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14, className: "o40-spin" }) : pushEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 14 }),
                          pushBusy ? "..." : pushEnabled ? lang === "it" ? "Disattiva push" : "Disable push" : lang === "it" ? "Attiva push" : "Enable push"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        onClick: onTestPush,
                        disabled: pushBusy,
                        style: {
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
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 14 }),
                          " Test"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 10, marginTop: 8, lineHeight: 1.4 }, children: lang === "it" ? "Privacy: subscription salvata solo su mikweb.eu, nessun tracking." : "Privacy: subscription stored only on mikweb.eu" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: INK_2,
                border: `1px solid ${OLIVE}`,
                borderRadius: 14,
                padding: 12,
                display: "flex",
                gap: 10
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { size: 20, color: BLAZE, style: { flexShrink: 0, marginTop: 2 } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 12.5, lineHeight: 1.5 }, children: t("setup.tech.note") })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: onSave,
              disabled: !formAge || !formWeight,
              className: "o40-cta",
              style: {
                ...primaryBtnLarge,
                opacity: !formAge || !formWeight ? 0.5 : 1,
                marginTop: 4
              },
              children: [
                t("setup.enlist"),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 })
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  SetupScreen as default
};
