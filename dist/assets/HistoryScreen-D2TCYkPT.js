import { j as jsxRuntimeExports, O as OLIVE, I as INK, K as KHAKI, B as BLAZE, S as STEEL, w as getRank, k as computeBestStreak, l as getConsistencyScore, q as getMedalProgress, C as getStreakRisk, u as useT, ad as LOCALES, ah as computeStreak, W as WEEKLY_GOAL, ai as buildHeatmap, aj as getPersonalRecords, ak as buildYearHeatmap, a as OLIVE_DARK, P as PAPER, b as INK_2, ag as RPE_COLORS, z as getWeeklyProgress, A as getAveragePace, ab as iconCircle, al as getMonthlyTrend, m as PROGRAMS, t as tr, ae as hrZone, af as RPE_LABELS, R as btnIcon, s as secondaryBtn, $ as primaryBtn, am as dayKey, an as sessionDayKey, ao as getNextMedals } from "./index-Dk3L8kk3.js";
import { r as reactExports, t as HeartPulse, T as Trophy, Z as Zap, S as Sparkles, L as Lightbulb, o as Medal, F as Flame, C as Check, X, w as RotateCcw, v as Star, x as Target } from "./icons-DnFQGhVC.js";
import { a as getSmartInsight, g as getGoalHistory, s as suggestNextGoal, c as getStreakWeeks, M as MiniGoalBar, f as formatGoal, e as estimateWeeklyCalories } from "./GoalRing-C6rHMOOh.js";
import { T as TopBar } from "./TopBar-cJV5r-o6.js";
import { D as DogTag } from "./DogTag-gCVW1aTX.js";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, L as LineChart, b as Line } from "./charts-BWCYe6zh.js";
function BeforeAfterSlider({ before, after }) {
  const [pos, setPos] = reactExports.useState(50);
  if (!before || !after) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: INK,
        border: `1px solid ${OLIVE}`,
        borderRadius: 12,
        overflow: "hidden",
        position: "relative"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "o40-mono",
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 10px",
              color: KHAKI,
              fontSize: 9,
              letterSpacing: "0.06em",
              background: INK
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "PRIMA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "DOPO" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              position: "relative",
              width: "100%",
              height: 280,
              overflow: "hidden",
              background: "#000"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: after.url,
                  alt: "dopo",
                  style: {
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    inset: 0,
                    width: `${pos}%`,
                    overflow: "hidden",
                    borderRight: `2px solid ${BLAZE}`
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: before.url,
                      alt: "prima",
                      style: {
                        width: "100%",
                        height: 280,
                        objectFit: "cover",
                        maxWidth: "none",
                        display: "block"
                      }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 100,
                  value: pos,
                  onChange: (e) => setPos(parseInt(e.target.value, 10)),
                  style: {
                    position: "absolute",
                    bottom: 12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80%",
                    accentColor: BLAZE
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    left: `${pos}%`,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: BLAZE,
                    pointerEvents: "none",
                    transform: "translateX(-1px)"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 10px",
              color: STEEL,
              fontSize: 10
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(before.date).toLocaleDateString("it-IT") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                new Date(after.date).toLocaleDateString("it-IT"),
                " · Δ",
                " ",
                Math.round((new Date(after.date) - new Date(before.date)) / 864e5),
                " gg"
              ] })
            ]
          }
        )
      ]
    }
  );
}
function csvEscape(v) {
  const s = String(v ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) return `"${s.replace(/"/g, '""')}"`;
  return s;
}
function exportCSV(sessions, waistHistory, weightHistory) {
  const rows = [
    ["date", "program", "kcal", "duration_min", "hr_peak", "rpe", "waist_cm", "weight_kg", "notes"]
  ];
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
    days.push({
      day: d,
      key,
      sessions: byDay[key] || [],
      isToday: key === (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    });
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
    cut: {
      it: "Deficit leggero ~300 kcal, proteine 1.8g/kg, verdure + camminata.",
      en: "Small deficit ~300 kcal, protein 1.8g/kg, veg + walk.",
      de: "Leichtes Defizit ~300 kcal, Protein 1,8g/kg, Gemüse + Gehen."
    },
    maintain: {
      it: "Mantieni TDEE, proteine 1.6g/kg, 3 pasti regolari.",
      en: "Maintain TDEE, protein 1.6g/kg, 3 regular meals.",
      de: "TDEE halten, Protein 1,6g/kg, 3 regelmäßige Mahlzeiten."
    },
    tone: {
      it: "Leggero surplus + forza, proteine 1.8g/kg.",
      en: "Small surplus + strength, protein 1.8g/kg.",
      de: "Leichter Überschuss + Kraft, Protein 1,8g/kg."
    }
  };
  return hints[goal] || hints.cut;
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
  ctx.fillText(
    rankText + (rank.next ? `  →  ${rank.next.min - ((sessions == null ? void 0 : sessions.length) || 0)} AL PROSSIMO` : "  •  VETERANO"),
    W / 2,
    cardY + 148
  );
  const totalKcal = (sessions || []).reduce((a2, s) => a2 + (s.kcal || 0), 0);
  const totalMin = Math.round(
    (sessions || []).reduce((a2, s) => a2 + (s.durationSec || 780), 0) / 60
  );
  const streak = (() => {
    try {
      const s = new Set((sessions || []).map((v) => v.date.slice(0, 10)));
      let cur = /* @__PURE__ */ new Date();
      if (!s.has(cur.toISOString().slice(0, 10))) cur.setDate(cur.getDate() - 1);
      let n = 0;
      while (s.has(cur.toISOString().slice(0, 10))) {
        n++;
        cur.setDate(cur.getDate() - 1);
      }
      return n;
    } catch {
      return 0;
    }
  })();
  const best = computeBestStreak(sessions || []);
  const cons = (() => {
    try {
      return getConsistencyScore(sessions, 8);
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
    {
      label: "SESSIONI",
      value: String((sessions == null ? void 0 : sessions.length) || 0),
      sub: `${totalMin}′ totali`,
      color: "#EDE8D8"
    },
    {
      label: "KCAL",
      value: String(totalKcal),
      sub: `${Math.round(totalKcal / Math.max(1, (sessions == null ? void 0 : sessions.length) || 1))} avg`,
      color: "#EDE8D8"
    },
    {
      label: "STREAK",
      value: `${streak}🔥`,
      sub: `best ${best}`,
      color: streak > 0 ? "#C1440E" : "#EDE8D8"
    }
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
    {
      label: "CONSISTENZA 8W",
      value: `${cons}%`,
      color: cons >= 70 ? "#7FB069" : cons >= 40 ? "#B8AE8C" : "#C1440E"
    },
    {
      label: "SETT. PERFETTE",
      value: String(unlocked.filter((m) => m.type === "perfect").length || 0),
      sub: `su ${12}`,
      color: "#D9B34C"
    },
    {
      label: "MEDAGLIE",
      value: String(unlocked.length),
      sub: `su ${(() => {
        try {
          return getMedalProgress(sessions || []).all.length;
        } catch {
          return 24;
        }
      })()}`,
      color: "#EDE8D8"
    }
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
  ctx.fillText(
    `${unlocked.length} / ${(() => {
      try {
        return getMedalProgress(sessions || []).all.length;
      } catch {
        return 24;
      }
    })()}`,
    cardX + cardW - 24,
    medalY
  );
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
    toShow.forEach((m) => {
      const label = `${m.icon} ${m.n}${m.type === "streak" ? "gg" : m.type === "kcal" ? "k" : ""}`;
      ctx.font = "700 12px Inter, sans-serif";
      const w = ctx.measureText(label).width + 18;
      if (pillX + w > cardX + cardW - 24) return;
      ctx.fillStyle = m.unlocked ? "rgba(193,68,14,0.22)" : "rgba(0,0,0,0.18)";
      ctx.strokeStyle = m.unlocked ? "rgba(193,68,14,0.35)" : "rgba(184,174,140,0.12)";
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, w, pillH, pillH / 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = m.unlocked ? "#EDE8D8" : "#8A8578";
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
  const nextBadge = (() => {
    try {
      const { locked } = getMedalProgress(sessions || []);
      locked.sort((a2, b) => b.progress - a2.progress);
      return locked[0];
    } catch {
      return null;
    }
  })();
  if (nextBadge) {
    const barW = cardW - 48;
    const barX = cardX + 24;
    const barH = 8;
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.roundRect(barX, quoteY, barW, barH, 4);
    ctx.fill();
    ctx.fillStyle = nextBadge.color;
    ctx.beginPath();
    ctx.roundRect(barX, quoteY, barW * nextBadge.progress, barH, 4);
    ctx.fill();
    ctx.fillStyle = "rgba(237,232,216,0.9)";
    ctx.font = "600 11px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Prossima: ${nextBadge.icon} ${nextBadge.label}`, barX, quoteY + 22);
    ctx.textAlign = "right";
    ctx.fillText(`${Math.round(nextBadge.progress * 100)}%`, barX + barW, quoteY + 22);
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
    const body = smart.body.length > 78 ? smart.body.slice(0, 78) + "…" : smart.body;
    ctx.fillText(body, cardX + 64, sY + 44);
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
  const dateStr = (/* @__PURE__ */ new Date()).toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  ctx.fillText(
    `${dateStr}  •  Operator 40  •  v${(profile == null ? void 0 : profile.level) || "combattente"}`,
    W / 2,
    footY + 18
  );
  ctx.fillStyle = "#C1440E";
  ctx.beginPath();
  ctx.arc(W - 48, footY - 28, 3, 0, Math.PI * 2);
  ctx.fill();
  const blob = await new Promise((res) => c.toBlob(res, "image/png", 0.96));
  const file = new File([blob], "operator40-stats.png", { type: "image/png" });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title: "Operator 40",
        text: `Operator 40 — ${(sessions == null ? void 0 : sessions.length) || 0} sessioni, ${totalKcal} kcal, ${cons}% costanza`,
        files: [file]
      });
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
function getDailyInsight({ sessions, profile, waistHistory, weightHistory, lang = "it" }) {
  const n = (sessions == null ? void 0 : sessions.length) || 0;
  const cons = (() => {
    try {
      return getConsistencyScore(sessions, 8);
    } catch {
      return 0;
    }
  })();
  const risk = getStreakRisk(sessions);
  const hist = getGoalHistory(sessions, (profile == null ? void 0 : profile.weeklyGoal) || 3, 4);
  const avgDone = hist.reduce((a, w) => a + w.done, 0) / 4;
  if (n === 0)
    return {
      icon: "🌱",
      title: "Inizia",
      body: lang === "it" ? "Fai la prima sessione oggi — 15′ bastano." : "Do first session today — 15′ is enough.",
      color: "#7FB069",
      tip: lang === "it" ? "Scegli Assalto Pancia, ritmo dolce." : "Pick Belly Assault, easy pace."
    };
  if (risk === "at-risk")
    return {
      icon: "⏰",
      title: "Streak a rischio",
      body: lang === "it" ? "Un giorno al break — 15′ di Recupero Attivo salvano la serie." : "One day to break — 15′ Active Recovery saves streak.",
      color: "#D9B34C",
      tip: "Recupero Attivo (D) oggi."
    };
  if (cons < 35)
    return {
      icon: "🧭",
      title: "Costanza bassa",
      body: lang === "it" ? `Sei al ${cons}% su 8 settimane. Fissa 3 slot fissi.` : `You are at ${cons}% over 8 weeks. Fix 3 slots.`,
      color: "#C1440E",
      tip: "Lun/Mer/Ven 07:30."
    };
  if (avgDone >= ((profile == null ? void 0 : profile.weeklyGoal) || 3))
    return {
      icon: "🚀",
      title: "In forma",
      body: lang === "it" ? `Media ${avgDone.toFixed(1)}/sett. — alza a ${((profile == null ? void 0 : profile.weeklyGoal) || 3) + 1} se vuoi spingere.` : `Avg ${avgDone.toFixed(1)}/week — raise to ${((profile == null ? void 0 : profile.weeklyGoal) || 3) + 1} to push.`,
      color: "#7FB069",
      tip: "Prova Potenza Esplosiva (L)."
    };
  const waist = (waistHistory == null ? void 0 : waistHistory.length) ? waistHistory[waistHistory.length - 1] : null;
  const waistPrev = (waistHistory == null ? void 0 : waistHistory.length) ? waistHistory[0] : null;
  const wDelta = waist && waistPrev ? waist.cm - waistPrev.cm : null;
  if (wDelta != null && wDelta > 1)
    return {
      icon: "📏",
      title: `Girovita +${wDelta}cm`,
      body: lang === "it" ? "Rivedi kcal e passi. Sessioni B/E/G + 8k passi." : "Check kcal and steps. B/E/G sessions + 8k steps.",
      color: "#B8AE8C",
      tip: "Brucia Grassi (B) 2×/sett."
    };
  return {
    icon: "💡",
    title: "Continua così",
    body: lang === "it" ? `Hai ${n} sessioni, streak ${computeBestStreak(sessions)} best. Mantieni ritmo.` : `You have ${n} sessions, best streak ${computeBestStreak(sessions)}. Keep rhythm.`,
    color: "#B8AE8C",
    tip: "Varia stimolo ogni 3-4 giorni."
  };
}
function getWeeklyInsight({ sessions, profile, lang = "it" }) {
  const hist = getGoalHistory(sessions, (profile == null ? void 0 : profile.weeklyGoal) || 3, 8);
  const perfect = hist.filter((h) => h.isDone).length;
  const total = hist.length;
  const pct = Math.round(perfect / total * 100);
  if (pct >= 75)
    return {
      icon: "🏆",
      title: "Settimane top",
      body: `${perfect}/${total} perfette — grande costanza!`,
      color: "#7FB069"
    };
  if (pct >= 50)
    return {
      icon: "📈",
      title: "Buon ritmo",
      body: `${perfect}/${total} perfette — tieni così`,
      color: "#B8AE8C"
    };
  return {
    icon: "🎯",
    title: "Obiettivo",
    body: `${perfect}/${total} perfette — punta a ${Math.ceil(total * 0.6)}`,
    color: "#D9B34C"
  };
}
function last7DaysKcal(sessions, locale) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - i);
    const key = dayKey(d);
    const label = d.toLocaleDateString(locale || "it-IT", { weekday: "short" }).slice(0, 3);
    const kcal = Math.round(
      sessions.filter((s) => sessionDayKey(s) === key).reduce((a, s) => a + s.kcal, 0)
    );
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        flex: 1,
        minWidth: 52,
        opacity: unlocked ? 1 : 0.55,
        transform: unlocked ? "scale(1)" : "scale(0.96)",
        transition: "all 0.2s ease"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
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
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Icon,
                {
                  size: 18,
                  color: unlocked ? PAPER : STEEL,
                  style: { filter: unlocked ? `drop-shadow(0 1px 2px rgba(0,0,0,0.4))` : "none" }
                }
              ),
              !unlocked && progress > 0 && progress < 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: OLIVE_DARK
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        width: `${Math.round(progress * 100)}%`,
                        height: "100%",
                        background: color,
                        transition: "width 0.4s ease"
                      }
                    }
                  )
                }
              ),
              unlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    inset: -2,
                    borderRadius: "50%",
                    border: `1px solid ${color}44`,
                    animation: "badgePulse 1.6s ease-in-out infinite"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "o40-mono",
            style: { color: unlocked ? PAPER : STEEL, fontSize: 10, fontWeight: unlocked ? 700 : 400 },
            children: value
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              color: unlocked ? KHAKI : STEEL,
              fontSize: 8.5,
              textAlign: "center",
              lineHeight: 1.2,
              minHeight: 20
            },
            children: label
          }
        )
      ]
    }
  );
}
function MedalGrid({ sessions }) {
  const { all, unlocked } = getMedalProgress(sessions);
  const byType = {
    streak: all.filter((m) => m.type === "streak"),
    sessions: all.filter((m) => m.type === "sessions"),
    kcal: all.filter((m) => m.type === "kcal"),
    consistency: all.filter((m) => m.type === "consistency"),
    perfect: all.filter((m) => m.type === "perfect")
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "o40-mono",
          style: {
            color: STEEL,
            fontSize: 9,
            letterSpacing: "0.08em",
            marginBottom: 6,
            display: "flex",
            alignItems: "center",
            gap: 6
          },
          children: [
            cat.title,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                style: {
                  color: unlocked.filter((m) => m.type === cat.key).length ? "#7FB069" : STEEL,
                  fontSize: 9
                },
                children: [
                  unlocked.filter((m) => m.type === cat.key).length,
                  "/",
                  byType[cat.key].length
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }, children: byType[cat.key].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          label: m.label,
          value: m.n,
          unlocked: m.unlocked,
          color: m.color,
          icon: m.type === "streak" ? "fire" : m.type === "kcal" ? "target" : m.type === "perfect" ? "star" : "trophy",
          progress: m.progress
        },
        `${m.type}-${m.n}`
      )) })
    ] }, cat.key)),
    next.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK})`,
          border: `1px solid ${KHAKI}33`,
          borderRadius: 10,
          padding: "10px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14, color: KHAKI }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: KHAKI, fontSize: 11, flex: 1 }, children: [
            "Prossime:",
            " ",
            next.map(
              (m) => `${m.icon} ${m.n}${m.type === "kcal" ? "" : m.type === "streak" ? "gg" : ""} (${Math.round(m.progress * 100)}%)`
            ).join(" • ")
          ] })
        ]
      }
    )
  ] });
}
function HistoryScreen({
  sessions,
  profile,
  waistHistory,
  weightHistory,
  photos,
  onAddPhoto,
  onBack,
  onClear,
  onUpdateGoal,
  onDeleteSession
}) {
  const { lang, t } = useT();
  const [confirmClear, setConfirmClear] = reactExports.useState(false);
  const [confirmDeleteDate, setConfirmDeleteDate] = reactExports.useState(null);
  const ordered = [...sessions].reverse();
  const hrData = sessions.filter((s) => s.peakHR).map((s, i) => ({
    idx: i + 1,
    hr: s.peakHR,
    label: new Date(s.date).toLocaleDateString(LOCALES[lang], {
      day: "2-digit",
      month: "2-digit"
    })
  }));
  const waistData = [...waistHistory].sort((a, b) => new Date(a.date) - new Date(b.date)).map((w, i) => ({
    idx: i + 1,
    cm: w.cm,
    label: new Date(w.date).toLocaleDateString(LOCALES[lang], {
      day: "2-digit",
      month: "2-digit"
    })
  }));
  const weightData = [...weightHistory].sort((a, b) => new Date(a.date) - new Date(b.date)).map((w, i) => ({
    idx: i + 1,
    kg: w.kg,
    label: new Date(w.date).toLocaleDateString(LOCALES[lang], {
      day: "2-digit",
      month: "2-digit"
    })
  }));
  const streak = computeStreak(sessions);
  const bestStreak = computeBestStreak(sessions);
  const weekData = last7DaysKcal(sessions, LOCALES[lang]);
  const counts = missionCounts(sessions);
  const maxCount = Math.max(
    1,
    counts.A,
    counts.B,
    counts.C,
    counts.D,
    counts.E,
    counts.F,
    counts.G
  );
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
    label: new Date(s.date).toLocaleDateString(LOCALES[lang], {
      day: "2-digit",
      month: "2-digit"
    })
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
  const sessionsPerWeek = sessions.length >= 2 ? sessions.length / Math.max(
    1,
    Math.round(
      (new Date(sessions[sessions.length - 1].date) - new Date(sessions[0].date)) / (7 * 864e5)
    )
  ) : sessions.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-screen-in", style: { flex: 1, display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopBar, { title: t("hist.title"), onBack }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-scroll", style: { flex: 1, overflowY: "auto", padding: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 18 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DogTag,
          {
            label: t("dt.streak"),
            value: streak,
            sub: streak === 1 ? t("dt.day") : t("dt.days")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag, { label: t("dt.record"), value: bestStreak, sub: t("dt.beststreak") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag, { label: t("dt.kcal"), value: totalKcal, sub: t("dt.total") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 18 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag, { label: t("dt.minutes"), value: totalMin, sub: t("dt.trained") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag, { label: t("dt.avgkcal"), value: avgKcal, sub: t("dt.permission") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag, { label: t("dt.weeks"), value: sessionsPerWeek.toFixed(1), sub: t("dt.perweek") })
      ] }),
      pr && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "o40-card-glass",
          style: { display: "flex", gap: 10, marginBottom: 18, padding: 12, borderRadius: 12 },
          children: [
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
          ]
        }
      ),
      avgRpe !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 18,
            background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`,
            border: `1px solid ${OLIVE}`,
            borderRadius: 14,
            padding: 12
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { size: 17, color: BLAZE }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "o40-mono",
                style: {
                  color: KHAKI,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em"
                },
                children: t("hist.avgint")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginLeft: "auto", display: "flex", alignItems: "baseline", gap: 4 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "o40-display",
                  style: { color: RPE_COLORS[Math.round(avgRpe) - 1] || BLAZE, fontSize: 24 },
                  children: avgRpe.toFixed(1)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 11 }, children: "/ 6" })
            ] })
          ]
        }
      ),
      bestWeekKcal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 18,
            background: INK_2,
            border: `1px solid ${OLIVE}`,
            borderRadius: 14,
            padding: 12
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 16, color: KHAKI, style: { flexShrink: 0 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 13, fontWeight: 600 }, children: t("hist.bestweek.title") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5 }, children: t("hist.bestweek.sub") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-display", style: { color: BLAZE, fontSize: 22 }, children: bestWeekKcal }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 10.5 }, children: t("hist.kcal.unit") })
          ]
        }
      ),
      (() => {
        const wp = getWeeklyProgress(sessions, weeklyGoal);
        const cons = getConsistencyScore(sessions);
        const pace = getAveragePace(sessions);
        const risk = getStreakRisk(sessions);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              marginBottom: 18,
              background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`,
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
                    letterSpacing: "0.06em",
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12, color: BLAZE }),
                    " ADERENZA 8 SETTIMANE"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 12 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      flex: 1,
                      background: INK,
                      border: `1px solid ${OLIVE}`,
                      borderRadius: 10,
                      padding: "10px 12px",
                      textAlign: "center"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "o40-display",
                          style: {
                            color: cons >= 70 ? "#7FB069" : cons >= 40 ? KHAKI : BLAZE,
                            fontSize: 22
                          },
                          children: [
                            cons,
                            "%"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: "CONSISTENZA" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            height: 4,
                            borderRadius: 2,
                            background: OLIVE_DARK,
                            marginTop: 6,
                            overflow: "hidden"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                width: `${cons}%`,
                                height: "100%",
                                background: cons >= 70 ? "#7FB069" : cons >= 40 ? KHAKI : BLAZE
                              }
                            }
                          )
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      flex: 1,
                      background: INK,
                      border: `1px solid ${OLIVE}`,
                      borderRadius: 10,
                      padding: "10px 12px",
                      textAlign: "center"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "o40-display",
                          style: { color: wp.isDone ? "#7FB069" : BLAZE, fontSize: 22 },
                          children: [
                            wp.done,
                            "/",
                            wp.total
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: "SETTIMANA" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: risk === "ok" ? "#7FB069" : risk === "at-risk" ? KHAKI : BLAZE,
                            fontSize: 10,
                            marginTop: 4
                          },
                          children: risk === "ok" ? "● ok" : risk === "at-risk" ? "◐ a rischio" : "○ break"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      flex: 1,
                      background: INK,
                      border: `1px solid ${OLIVE}`,
                      borderRadius: 10,
                      padding: "10px 12px",
                      textAlign: "center"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 18 }, children: pace ? `${pace.avgMin}′` : "—" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: "MEDIA" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 10, marginTop: 4 }, children: pace ? `${pace.avgKcal} kcal` : "n/d" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    color: STEEL,
                    fontSize: 11
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Goal ",
                      weeklyGoal,
                      "/sett."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: wp.isDone ? "#7FB069" : KHAKI }, children: wp.isDone ? "Completata!" : `${wp.remain} mancanti` })
                  ]
                }
              )
            ]
          }
        );
      })(),
      (() => {
        var _a;
        const daily = getDailyInsight({ sessions, profile, waistHistory, weightHistory, lang });
        const weekly = getWeeklyInsight({ sessions, profile, lang });
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 18, display: "flex", flexDirection: "column", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: `linear-gradient(135deg, ${daily.color}18, ${INK_2})`,
                border: `1px solid ${daily.color}55`,
                borderRadius: 14,
                padding: 12,
                display: "flex",
                gap: 10,
                alignItems: "center"
              },
              children: [
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
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 16, color: daily.color, style: { flexShrink: 0 } })
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
                gap: 10,
                alignItems: "center"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 18 }, children: weekly.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 13, fontWeight: 600 }, children: weekly.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 2 }, children: weekly.body })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: weekly.color, fontSize: 18, fontWeight: 700 }, children: (_a = weekly.body.split("/")[0]) == null ? void 0 : _a.trim() })
              ]
            }
          )
        ] });
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
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
            children: t("hist.goal.title")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: PAPER, fontSize: 13 }, children: t("hist.goal.label") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 14 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => onUpdateGoal(weeklyGoal - 1),
                          disabled: weeklyGoal <= 1,
                          style: {
                            ...iconCircle,
                            width: 30,
                            height: 30,
                            opacity: weeklyGoal <= 1 ? 0.4 : 1
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: PAPER, fontSize: 16, lineHeight: 1 }, children: "–" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "o40-display",
                          style: { color: PAPER, fontSize: 22, minWidth: 20, textAlign: "center" },
                          children: weeklyGoal
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => onUpdateGoal(weeklyGoal + 1),
                          disabled: weeklyGoal >= 7,
                          style: {
                            ...iconCircle,
                            width: 30,
                            height: 30,
                            opacity: weeklyGoal >= 7 ? 0.4 : 1
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: PAPER, fontSize: 16, lineHeight: 1 }, children: "+" })
                        }
                      )
                    ] })
                  ]
                }
              ),
              (() => {
                const hist = getGoalHistory(sessions, weeklyGoal, 8);
                const sugg = suggestNextGoal(sessions, weeklyGoal);
                const streakW = getStreakWeeks(sessions);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MiniGoalBar, { history: hist }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 8,
                        color: STEEL,
                        fontSize: 11
                      },
                      children: [
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
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 10.5, marginTop: 4 }, children: [
                    "~",
                    estimateWeeklyCalories(sessions, weeklyGoal),
                    " kcal/sett. a goal ",
                    weeklyGoal
                  ] })
                ] });
              })()
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
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
            children: t("hist.35d")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: 14
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }, children: heatmap.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                title: c.key,
                style: {
                  aspectRatio: "1 / 1",
                  borderRadius: 3,
                  background: c.active ? BLAZE : OLIVE_DARK,
                  opacity: c.active ? 1 : 0.6
                }
              },
              c.key
            )) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
            children: [
              "Anno · ",
              (/* @__PURE__ */ new Date()).getFullYear()
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: 14
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(26, 1fr)", gap: 2 }, children: yearHeat.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                title: `${c.key} · ${c.count || 0}`,
                style: {
                  aspectRatio: "1/1",
                  borderRadius: 2,
                  background: c.count ? c.count > 1 ? BLAZE : OLIVE : OLIVE_DARK,
                  opacity: c.count ? 1 : 0.5
                }
              },
              c.key
            )) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { size: 12, color: KHAKI }),
              " ",
              t("hist.milestones"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: STEEL, fontSize: 10, marginLeft: 6 }, children: [
                getMedalProgress(sessions).unlocked.length,
                "/",
                getMedalProgress(sessions).all.length,
                " ",
                "sbloccate"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: 12
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(MedalGrid, { sessions })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 8
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
                    letterSpacing: "0.08em"
                  },
                  children: t("hist.kcal7")
                }
              ),
              trendPct !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: STEEL, fontSize: 11 }, children: t("hist.vsweek", { p: (trendPct > 0 ? "+" : "") + trendPct }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: "10px 6px",
              height: 140
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: weekData, margin: { top: 8, right: 8, left: -22, bottom: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: OLIVE_DARK, strokeDasharray: "3 3", vertical: false }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "label",
                  tick: { fill: STEEL, fontSize: 10 },
                  axisLine: { stroke: OLIVE },
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  tick: { fill: STEEL, fontSize: 10 },
                  axisLine: false,
                  tickLine: false,
                  width: 30
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: {
                    background: INK,
                    border: `1px solid ${OLIVE}`,
                    borderRadius: 8,
                    fontSize: 12
                  },
                  labelStyle: { color: KHAKI },
                  itemStyle: { color: BLAZE },
                  cursor: { fill: OLIVE_DARK }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "kcal", fill: BLAZE, radius: [3, 3, 0, 0] })
            ] }) })
          }
        )
      ] }),
      (() => {
        const months = getMonthlyTrend(sessions);
        const maxK = Math.max(1, ...months.map((m) => m.kcal));
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
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
              children: "Trend mensile · kcal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                background: INK_2,
                border: `1px solid ${OLIVE}`,
                borderRadius: 14,
                padding: "12px 10px"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "flex-end", gap: 6, height: 80 }, children: months.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          width: "100%",
                          height: `${Math.round(m.kcal / maxK * 60) + 4}px`,
                          background: m.kcal ? BLAZE : OLIVE_DARK,
                          borderRadius: 3,
                          opacity: m.kcal ? 1 : 0.5
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: m.label })
                  ]
                },
                m.key
              )) })
            }
          )
        ] });
      })(),
      sessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
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
            children: t("hist.fav")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              gap: 10
            },
            children: PROGRAMS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    marginBottom: 3
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: PAPER }, children: tr(p.name, lang) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: STEEL }, children: counts[p.id] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    height: 6,
                    borderRadius: 3,
                    background: OLIVE_DARK,
                    overflow: "hidden"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        height: "100%",
                        width: `${counts[p.id] / maxCount * 100}%`,
                        background: BLAZE,
                        borderRadius: 3,
                        transition: "width 0.4s ease"
                      }
                    }
                  )
                }
              )
            ] }, p.id))
          }
        )
      ] }),
      hrData.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
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
            children: t("hist.hr")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: "10px 6px",
              height: 160
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: hrData, margin: { top: 8, right: 12, left: -18, bottom: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: OLIVE_DARK, strokeDasharray: "3 3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "label",
                  tick: { fill: STEEL, fontSize: 10 },
                  axisLine: { stroke: OLIVE },
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  tick: { fill: STEEL, fontSize: 10 },
                  axisLine: false,
                  tickLine: false,
                  width: 30
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: {
                    background: INK,
                    border: `1px solid ${OLIVE}`,
                    borderRadius: 8,
                    fontSize: 12
                  },
                  labelStyle: { color: KHAKI },
                  itemStyle: { color: BLAZE }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "hr",
                  stroke: BLAZE,
                  strokeWidth: 2,
                  dot: { r: 3, fill: BLAZE }
                }
              )
            ] }) })
          }
        )
      ] }),
      waistData.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 8
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
                    letterSpacing: "0.08em"
                  },
                  children: t("hist.waist")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "o40-mono",
                  style: {
                    color: waistData[0].cm <= waistData[waistData.length - 1].cm ? BLAZE : "#7FB069",
                    fontSize: 11
                  },
                  children: t("hist.waist.total", {
                    v: (waistData[waistData.length - 1].cm - waistData[0].cm > 0 ? "+" : "") + (waistData[waistData.length - 1].cm - waistData[0].cm)
                  })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: "10px 6px",
              height: 160
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: waistData, margin: { top: 8, right: 12, left: -18, bottom: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: OLIVE_DARK, strokeDasharray: "3 3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "label",
                  tick: { fill: STEEL, fontSize: 10 },
                  axisLine: { stroke: OLIVE },
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  domain: ["dataMin - 2", "dataMax + 2"],
                  tick: { fill: STEEL, fontSize: 10 },
                  axisLine: false,
                  tickLine: false,
                  width: 30
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: {
                    background: INK,
                    border: `1px solid ${OLIVE}`,
                    borderRadius: 8,
                    fontSize: 12
                  },
                  labelStyle: { color: KHAKI },
                  itemStyle: { color: BLAZE }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "cm",
                  stroke: BLAZE,
                  strokeWidth: 2,
                  dot: { r: 3, fill: BLAZE }
                }
              )
            ] }) })
          }
        )
      ] }),
      weightData.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 8
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
                    letterSpacing: "0.08em"
                  },
                  children: t("hist.weight")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "o40-mono",
                  style: {
                    color: weightData[weightData.length - 1].kg <= weightData[0].kg ? "#7FB069" : BLAZE,
                    fontSize: 11
                  },
                  children: t("hist.weight.total", {
                    v: (weightData[weightData.length - 1].kg - weightData[0].kg > 0 ? "+" : "") + (weightData[weightData.length - 1].kg - weightData[0].kg).toFixed(1)
                  })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: "10px 6px",
              height: 160
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: weightData, margin: { top: 8, right: 12, left: -18, bottom: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: OLIVE_DARK, strokeDasharray: "3 3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "label",
                  tick: { fill: STEEL, fontSize: 10 },
                  axisLine: { stroke: OLIVE },
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  domain: ["dataMin - 1.5", "dataMax + 1.5"],
                  tick: { fill: STEEL, fontSize: 10 },
                  axisLine: false,
                  tickLine: false,
                  width: 30
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: {
                    background: INK,
                    border: `1px solid ${OLIVE}`,
                    borderRadius: 8,
                    fontSize: 12
                  },
                  labelStyle: { color: KHAKI },
                  itemStyle: { color: "#7FB069" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "kg",
                  stroke: "#7FB069",
                  strokeWidth: 2,
                  dot: { r: 3, fill: "#7FB069" }
                }
              )
            ] }) })
          }
        )
      ] }),
      rpeSeries.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
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
            children: t("hist.rpe")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: "10px 6px",
              height: 150
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: rpeSeries, margin: { top: 8, right: 12, left: -18, bottom: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: OLIVE_DARK, strokeDasharray: "3 3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "label",
                  tick: { fill: STEEL, fontSize: 10 },
                  axisLine: { stroke: OLIVE },
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  domain: [1, 6],
                  ticks: [1, 2, 3, 4, 5, 6],
                  tick: { fill: STEEL, fontSize: 10 },
                  axisLine: false,
                  tickLine: false,
                  width: 30
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: {
                    background: INK,
                    border: `1px solid ${OLIVE}`,
                    borderRadius: 8,
                    fontSize: 12
                  },
                  labelStyle: { color: KHAKI },
                  itemStyle: { color: BLAZE }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "rpe",
                  stroke: BLAZE,
                  strokeWidth: 2,
                  dot: { r: 3, fill: BLAZE }
                }
              )
            ] }) })
          }
        )
      ] }),
      profile && profile.heightCm && weightHistory.length > 0 && (() => {
        const latestKg = weightHistory[weightHistory.length - 1].kg;
        const bmi = calcBMI(latestKg, profile.heightCm);
        const cat = bmiCategory(bmi);
        const tdee = estimateTDEE(latestKg, profile.heightCm, profile.age);
        const waistLatest = waistHistory.length ? waistHistory[waistHistory.length - 1].cm : null;
        const bf = estimateBodyFat({
          waistCm: waistLatest,
          weightKg: latestKg,
          heightCm: profile.heightCm,
          age: profile.age
        });
        const wht = waistLatest ? waistLatest / profile.heightCm : null;
        const wcat = wht != null ? whtCategory(wht) : null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 12,
              padding: 14,
              marginBottom: 16
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "o40-mono",
                  style: { color: KHAKI, fontSize: 11, letterSpacing: "0.06em", marginBottom: 6 },
                  children: [
                    t("bmi.title"),
                    " · ",
                    bmi,
                    " ",
                    cat && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: cat.color }, children: [
                      "· ",
                      t("bmi." + cat.key)
                    ] })
                  ]
                }
              ),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 4, opacity: 0.8 }, children: tr(simpleMealHint(bmi > 27 ? "cut" : "maintain"), lang) })
            ]
          }
        );
      })(),
      (() => {
        const now2 = /* @__PURE__ */ new Date();
        const { pad, days } = buildCalendarGrid(sessions, now2.getFullYear(), now2.getMonth());
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 12,
              padding: 14,
              marginBottom: 16
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "o40-mono",
                  style: { color: KHAKI, fontSize: 11, letterSpacing: "0.06em", marginBottom: 8 },
                  children: [
                    t("export.calendar"),
                    " ·",
                    " ",
                    now2.toLocaleDateString(
                      lang === "it" ? "it-IT" : lang === "de" ? "de-DE" : "en-US",
                      { month: "long", year: "numeric" }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: 4,
                    textAlign: "center"
                  },
                  children: [
                    ["L", "M", "M", "G", "V", "S", "D"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 10 }, children: d }, d)),
                    Array.from({ length: pad }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `p${i}`)),
                    days.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        title: d.sessions.length ? `${d.sessions.length} sessioni` : "",
                        style: {
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          background: d.sessions.length ? BLAZE : "transparent",
                          color: d.sessions.length ? PAPER : STEEL,
                          border: d.isToday ? `1px solid ${KHAKI}` : "1px solid transparent",
                          fontWeight: d.sessions.length ? 700 : 400
                        },
                        children: d.day
                      },
                      d.key
                    ))
                  ]
                }
              )
            ]
          }
        );
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            background: INK_2,
            border: `1px solid ${OLIVE}`,
            borderRadius: 12,
            padding: 14,
            marginBottom: 16
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "o40-mono",
                      style: { color: KHAKI, fontSize: 11, letterSpacing: "0.06em" },
                      children: "Foto progressi"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      style: {
                        background: BLAZE,
                        color: PAPER,
                        borderRadius: 8,
                        padding: "6px 10px",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer"
                      },
                      children: [
                        "+ Foto",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "file",
                            accept: "image/*",
                            capture: "environment",
                            style: { display: "none" },
                            onChange: (e) => {
                              const f = e.target.files && e.target.files[0];
                              if (f) onAddPhoto(f);
                              e.target.value = "";
                            }
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            ),
            photos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12 }, children: "Nessuna foto — aggiungi la prima per vedere il prima/dopo" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }, children: photos.slice(-6).map((ph) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    aspectRatio: "3/4",
                    borderRadius: 8,
                    overflow: "hidden",
                    border: `1px solid ${OLIVE}`,
                    background: INK
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: ph.url,
                      alt: "",
                      style: { width: "100%", height: "100%", objectFit: "cover" }
                    }
                  )
                },
                ph.id
              )) }),
              photos.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 12 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BeforeAfterSlider, { before: photos[0], after: photos[photos.length - 1] }) })
            ] })
          ]
        }
      ),
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
          children: t("hist.sessions.title")
        }
      ),
      ordered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 13 }, children: t("hist.empty") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: ordered.map((s, i) => {
        const zone = s.peakHR ? hrZone(s.peakHR, profile.age, lang) : null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 6,
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: 12
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 14, fontWeight: 600 }, children: s.programName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5 }, children: new Date(s.date).toLocaleDateString(LOCALES[lang], {
                    weekday: "short",
                    day: "2-digit",
                    month: "short"
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      color: KHAKI,
                      fontSize: 12.5
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 13, color: BLAZE }),
                      " ",
                      s.kcal
                    ]
                  }
                ),
                zone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      color: zone.color,
                      fontSize: 12.5
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { size: 13 }),
                      " ",
                      s.peakHR
                    ]
                  }
                ),
                s.rpe && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "o40-mono",
                    style: {
                      color: STEEL,
                      fontSize: 10.5,
                      border: `1px solid ${OLIVE}`,
                      borderRadius: 4,
                      padding: "2px 5px"
                    },
                    children: tr(RPE_LABELS[s.rpe - 1], lang)
                  }
                ),
                s.aiQuality && s.aiQuality.overall != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "o40-mono",
                    title: t("hist.quality"),
                    style: {
                      color: s.aiQuality.overall > 70 ? "#7FB069" : s.aiQuality.overall > 50 ? "#D4A017" : BLAZE,
                      fontSize: 10.5,
                      border: `1px solid ${s.aiQuality.overall > 70 ? "#7FB069" : s.aiQuality.overall > 50 ? "#D4A017" : OLIVE}`,
                      borderRadius: 4,
                      padding: "2px 5px"
                    },
                    children: [
                      "Q",
                      s.aiQuality.overall
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => {
                      if (confirmDeleteDate === s.date) {
                        onDeleteSession(s.date);
                        setConfirmDeleteDate(null);
                      } else {
                        setConfirmDeleteDate(s.date);
                        setTimeout(
                          () => setConfirmDeleteDate((c) => c === s.date ? null : c),
                          3e3
                        );
                      }
                    },
                    style: {
                      ...btnIcon,
                      padding: 4,
                      background: confirmDeleteDate === s.date ? `${BLAZE}33` : "transparent"
                    },
                    "aria-label": t("hist.delete"),
                    children: confirmDeleteDate === s.date ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, color: STEEL })
                  }
                )
              ] }),
              s.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: { color: STEEL, fontSize: 11.5, fontStyle: "italic", lineHeight: 1.4 },
                  children: [
                    '"',
                    s.notes,
                    '"'
                  ]
                }
              )
            ]
          },
          i
        );
      }) }),
      sessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => exportData(profile, sessions),
            style: {
              ...secondaryBtn,
              flex: 1,
              minWidth: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6
            },
            children: t("hist.export")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => exportCSV(sessions, waistHistory, weightHistory),
            style: {
              ...secondaryBtn,
              flex: 1,
              minWidth: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6
            },
            children: t("export.csv")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: async () => {
              const r = await shareStatsImage({ sessions, profile, t, tr });
              showToast(r === "share" ? "Condiviso" : "Immagine scaricata");
            },
            style: {
              ...secondaryBtn,
              flex: 1,
              minWidth: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14 }),
              " ",
              lang === "it" ? "Condividi PNG" : "Share PNG"
            ]
          }
        ),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setConfirmClear(true),
            style: {
              ...secondaryBtn,
              flex: 1,
              minWidth: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 15 }),
              " ",
              t("hist.clear")
            ]
          }
        )
      ] })
    ] }),
    confirmClear && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          position: "absolute",
          inset: 0,
          background: "rgba(27,29,22,0.92)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: 22,
              maxWidth: 320,
              textAlign: "center"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 22, marginBottom: 8 }, children: t("hist.clear.title") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 13, marginBottom: 18 }, children: t("hist.clear.body") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setConfirmClear(false), style: { ...secondaryBtn, flex: 1 }, children: t("hist.clear.cancel") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => {
                      setConfirmClear(false);
                      onClear();
                    },
                    style: { ...primaryBtn, flex: 1 },
                    children: t("hist.clear.confirm")
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  HistoryScreen as default
};
