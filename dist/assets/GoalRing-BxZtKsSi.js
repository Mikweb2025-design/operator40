import { W as WEEKLY_GOAL, l as getConsistencyScore, C as getStreakRisk, w as getRank, j as jsxRuntimeExports, K as KHAKI, a as OLIVE_DARK, B as BLAZE, S as STEEL } from "./index-DbOkD-eS.js";
import "./icons-CYijDH-L.js";
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
    byWeek.push({
      label,
      done,
      goal: weeklyGoal,
      pct: Math.min(1, done / weeklyGoal),
      isDone: done >= weeklyGoal
    });
  }
  return byWeek;
}
function suggestNextGoal(sessions, currentGoal = WEEKLY_GOAL) {
  const cons = getConsistencyScore(sessions, 4);
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
function getSmartInsight({ sessions, profile, waistHistory, weightHistory, lang = "it" }) {
  const n = (sessions == null ? void 0 : sessions.length) || 0;
  if (n === 0) {
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
    let n2 = 0;
    while (s.has(cur.toISOString().slice(0, 10))) {
      n2++;
      cur.setDate(cur.getDate() - 1);
    }
    return n2;
  })();
  const cons = getConsistencyScore(sessions, 8);
  const risk = getStreakRisk(sessions);
  const waist = (waistHistory == null ? void 0 : waistHistory.length) ? waistHistory[waistHistory.length - 1] : null;
  const waistPrev = (waistHistory == null ? void 0 : waistHistory.length) > 1 ? waistHistory[0] : null;
  const wDelta = waist && waistPrev ? waist.cm - waistPrev.cm : null;
  if (risk === "at-risk") {
    return {
      icon: "⚠️",
      title: lang === "it" ? "Rischio streak" : "Streak at risk",
      body: lang === "it" ? "Sei a 1 giorno dal break — 15′ oggi salvano la serie." : "1 day from break — 15′ today saves the streak.",
      color: "#D9B34C"
    };
  }
  if (cons < 40) {
    return {
      icon: "🧭",
      title: lang === "it" ? "Costanza bassa" : "Low consistency",
      body: lang === "it" ? `Sei al ${cons}% su 8 settimane. Prova a fissare 3 slot fissi e usa “Recupero Attivo” nei giorni no.` : `You’re at ${cons}% over 8 weeks. Fix 3 slots and use Active Recovery on off days.`,
      color: "#C1440E"
    };
  }
  if (wDelta != null && wDelta > 0) {
    return {
      icon: "📏",
      title: lang === "it" ? "Girovita +" + wDelta + "cm" : `Waist +${wDelta}cm`,
      body: lang === "it" ? "Controlla kcal e sonno. Le sessioni brucia-grassi (B/E/G) + 8k passi aiutano." : "Check kcal and sleep. Fat-burn sessions + 8k steps help.",
      color: "#B8AE8C"
    };
  }
  if (streak >= 7) {
    return {
      icon: "🔥",
      title: lang === "it" ? `Fuoco! ${streak} giorni` : `On fire! ${streak} days`,
      body: lang === "it" ? "Streak solida — mantieni con 1 sessione leggera se sei stanco." : "Solid streak — keep with 1 light session if tired.",
      color: "#C1440E"
    };
  }
  const recentRpe = sessions.slice(-3).map((s) => s.rpe).filter((v) => v != null);
  if (recentRpe.length >= 2 && recentRpe.every((v) => v >= 4)) {
    return {
      icon: "🧘",
      title: lang === "it" ? "Intensità alta" : "High intensity",
      body: lang === "it" ? "2 sessioni dure di fila — domani fai Recupero Attivo o camminata." : "2 hard sessions in a row — do Active Recovery tomorrow.",
      color: "#7FB069"
    };
  }
  return {
    icon: "💡",
    title: lang === "it" ? "Continua così" : "Keep going",
    body: lang === "it" ? `Hai ${n} sessioni, streak ${streak}. Prossimo livello: ${getRank(n).next ? getRank(n).next.min - n + " sessioni" : "veterano!"}` : `You have ${n} sessions, streak ${streak}.`,
    color: "#B8AE8C"
  };
}
function getSmartRecommendation({ sessions, profile, lang = "it" }) {
  var _a;
  const n = (sessions == null ? void 0 : sessions.length) || 0;
  const last = n ? sessions[n - 1] : null;
  if (!last)
    return {
      programId: "A",
      reason: lang === "it" ? "Parti con Assalto Pancia, tecnico ma dolce." : "Start with Belly Assault."
    };
  if (last.rpe >= 4)
    return {
      programId: "D",
      reason: lang === "it" ? "Ultima dura — oggi Recupero Attivo." : "Last was hard — Active Recovery today."
    };
  const risk = getStreakRisk(sessions);
  if (risk === "at-risk")
    return {
      programId: "I",
      reason: lang === "it" ? "Streak a rischio — Cardio Leggero per non rompere." : "Streak at risk — Light Cardio to keep it."
    };
  const cons = getConsistencyScore(sessions, 4);
  if (cons > 75)
    return {
      programId: "L",
      reason: lang === "it" ? "Costanza top — prova Potenza Esplosiva." : "Top consistency — try Explosive Power."
    };
  if (cons < 40)
    return {
      programId: "H",
      reason: lang === "it" ? "Riparti con Schiena di Ferro, dolce." : "Restart with Iron Back."
    };
  const counts = {};
  sessions.forEach((s) => counts[s.programId] = (counts[s.programId] || 0) + 1);
  const least = (_a = Object.entries(counts).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _a[0];
  if (least)
    return {
      programId: least,
      reason: lang === "it" ? "Varia lo stimolo — tocca il meno usato." : "Vary stimulus — hit the least used."
    };
  return {
    programId: "B",
    reason: lang === "it" ? "Brucia Grassi per ritmo." : "Fat Burn for pace."
  };
}
function MiniGoalBar({ history }) {
  const max = Math.max(1, ...history.map((h) => Math.max(h.done, h.goal)));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "flex-end", gap: 4, height: 48 }, children: history.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              height: 36,
              justifyContent: "flex-end"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    width: "100%",
                    height: `${Math.round(h.done / max * 28) + 4}px`,
                    background: h.isDone ? "#7FB069" : h.done > 0 ? KHAKI : OLIVE_DARK,
                    borderRadius: 3,
                    opacity: h.isDone ? 1 : 0.85
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    width: "100%",
                    height: 2,
                    background: BLAZE,
                    opacity: 0.35,
                    borderRadius: 1
                  },
                  title: `goal ${h.goal}`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 8, fontFamily: "IBM Plex Mono, monospace" }, children: h.label })
      ]
    },
    i
  )) });
}
export {
  MiniGoalBar as M,
  getSmartInsight as a,
  getSmartRecommendation as b,
  getStreakWeeks as c,
  estimateWeeklyCalories as e,
  formatGoal as f,
  getGoalHistory as g,
  suggestNextGoal as s
};
