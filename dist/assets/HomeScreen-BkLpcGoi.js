import { k as computeBestStreak, l as getConsistencyScore, m as PROGRAMS, n as BELLY_IDS, o as getBellyCount, j as jsxRuntimeExports, O as OLIVE, b as INK_2, I as INK, B as BLAZE, K as KHAKI, S as STEEL, f as BLAZE_DEEP, P as PAPER, q as getMedalProgress, u as useT, r as computeStreakWithFreeze, W as WEEKLY_GOAL, v as pickNextProgram, w as getRank, x as nextBadge, y as campDayDisplay, g as getLevel, d as LEVELS, z as getWeeklyProgress, A as getAveragePace, C as getStreakRisk, D as getBellyProgress, E as greeting, t as tr, F as CAMP_DAYS, a as OLIVE_DARK, G as vibrate, Q as QUICK_PROGRAM, H as getBellyInsight, J as EXERCISES, M as getBellyStreak, N as shouldProgressBellyLevel, R as btnIcon } from "./index-BbonTWJl.js";
import { r as reactExports, v as Users, T as Trophy, C as Check, w as Share2, L as Link, X, b as ChevronRight, p as Medal, S as Sparkles, F as Flame, I as Info, x as TrendingUp, o as Crown, Z as Zap, y as Star, z as RotateCcw, h as Target, G as Lightbulb, E as Eye, B as BookOpen, e as Settings, J as Trash2, P as Plus, K as Ruler, N as TrendingDown, O as Scale } from "./icons-Cu976FrU.js";
import { g as getGoalHistory, e as estimateWeeklyCalories, M as MiniGoalBar, a as getSmartInsight, b as getSmartRecommendation } from "./GoalRing-BAdG4ZT5.js";
import { E as ExerciseFigure } from "./ExerciseFigure-BON2E8Tg.js";
import { D as DogTag } from "./DogTag-DwGd8j6w.js";
import { P as ProgressRing } from "./ProgressRing-CUXQpRN6.js";
import "./charts-Cp2TOHCu.js";
function getPersonalChallenge(sessions, profile) {
  const n = (sessions == null ? void 0 : sessions.length) || 0;
  const bestStreak = computeBestStreak(sessions || []);
  const cons = (() => {
    try {
      return getConsistencyScore(sessions, 8);
    } catch {
      return 0;
    }
  })();
  const weeklyGoal = (profile == null ? void 0 : profile.weeklyGoal) || 3;
  if (n < 3)
    return {
      id: "first3",
      title: "Prime 3",
      desc: "Completa le prime 3 sessioni",
      target: 3,
      current: n,
      progress: n / 3,
      icon: "🌱",
      color: "#7FB069"
    };
  if (bestStreak < 7)
    return {
      id: "streak7",
      title: "Settimana perfetta",
      desc: "7 giorni consecutivi",
      target: 7,
      current: bestStreak,
      progress: bestStreak / 7,
      icon: "🔥",
      color: "#C1440E"
    };
  if (cons < 70)
    return {
      id: "cons70",
      title: "Costanza 70%",
      desc: "Aderenza 8 settimane al 70%",
      target: 70,
      current: cons,
      progress: cons / 70,
      icon: "◎",
      color: "#7FB069"
    };
  if (n < 10)
    return {
      id: "s10",
      title: "10 Sessioni",
      desc: "Raggiungi 10 allenamenti",
      target: 10,
      current: n,
      progress: n / 10,
      icon: "⚡",
      color: "#B8AE8C"
    };
  const hist = getGoalHistory(sessions, weeklyGoal, 8);
  const perfect = hist.filter((h) => h.isDone).length;
  if (perfect < 4)
    return {
      id: "perfect4",
      title: "4 Sett. Perfette",
      desc: `${weeklyGoal} sess/sett ×4`,
      target: 4,
      current: perfect,
      progress: perfect / 4,
      icon: "★",
      color: "#D9B34C"
    };
  if (n < 25)
    return {
      id: "s25",
      title: "25 Sessioni",
      desc: "Costruisci abitudine",
      target: 25,
      current: n,
      progress: n / 25,
      icon: "🏆",
      color: "#C1440E"
    };
  return {
    id: "veterano",
    title: "Veterano",
    desc: "100 sessioni — leggenda",
    target: 100,
    current: n,
    progress: Math.min(1, n / 100),
    icon: "👑",
    color: "#B8AE8C"
  };
}
function getRecoveryTip(sessions, lang = "it") {
  const last = (sessions == null ? void 0 : sessions.length) ? sessions[sessions.length - 1] : null;
  if (!last)
    return lang === "it" ? "Inizia con 2 sessioni leggere a settimana." : "Start with 2 light sessions/week.";
  const rpe = last.rpe;
  if (rpe >= 4)
    return lang === "it" ? "Ultima dura — oggi fai mobilità + camminata, non forzare." : "Last was hard — mobility + walk today.";
  if (rpe <= 2)
    return lang === "it" ? "Eri leggero — puoi spingere oggi." : "You were light — you can push today.";
  return lang === "it" ? "Mantieni ritmo, ascolta il corpo." : "Keep rhythm, listen to body.";
}
const ACHIEVEMENTS = [
  {
    id: "first",
    title: { it: "Primo passo", en: "First Step", de: "Erster Schritt" },
    desc: { it: "Completa la prima sessione", en: "Complete first session", de: "Erste Session" },
    icon: "🌱",
    color: "#7FB069",
    check: (s) => s.length >= 1,
    progress: (s) => Math.min(1, s.length / 1)
  },
  {
    id: "streak3",
    title: { it: "Scintilla", en: "Spark", de: "Funke" },
    desc: { it: "3 giorni di fila", en: "3 days streak", de: "3 Tage Serie" },
    icon: "✨",
    color: "#D9B34C",
    check: (s) => computeBestStreak(s) >= 3,
    progress: (s) => Math.min(1, computeBestStreak(s) / 3)
  },
  {
    id: "streak7",
    title: { it: "Settimana di fuoco", en: "Fire Week", de: "Feuerwoche" },
    desc: { it: "7 giorni di fila", en: "7 days streak", de: "7 Tage Serie" },
    icon: "🔥",
    color: "#C1440E",
    check: (s) => computeBestStreak(s) >= 7,
    progress: (s) => Math.min(1, computeBestStreak(s) / 7)
  },
  {
    id: "s5",
    title: { it: "Ingranaggio", en: "Gear Up", de: "Auf Touren" },
    desc: { it: "5 sessioni totali", en: "5 sessions", de: "5 Sessions" },
    icon: "⚙️",
    color: "#B8AE8C",
    check: (s) => s.length >= 5,
    progress: (s) => Math.min(1, s.length / 5)
  },
  {
    id: "s25",
    title: { it: "Costruttore", en: "Builder", de: "Erbauer" },
    desc: { it: "25 sessioni", en: "25 sessions", de: "25 Sessions" },
    icon: "🏗️",
    color: "#8A8578",
    check: (s) => s.length >= 25,
    progress: (s) => Math.min(1, s.length / 25)
  },
  {
    id: "k5000",
    title: { it: "Fornace", en: "Furnace", de: "Ofen" },
    desc: { it: "5.000 kcal bruciate", en: "5k kcal burned", de: "5k kcal" },
    icon: "🔥",
    color: "#E84B2A",
    check: (s) => s.reduce((a, v) => a + (v.kcal || 0), 0) >= 5e3,
    progress: (s) => Math.min(1, s.reduce((a, v) => a + (v.kcal || 0), 0) / 5e3)
  },
  {
    id: "cons70",
    title: { it: "Metronomo", en: "Metronome", de: "Metronom" },
    desc: { it: "70% costanza 8 sett.", en: "70% consistency 8w", de: "70% Konstanz 8W" },
    icon: "◎",
    color: "#7FB069",
    check: (s) => {
      try {
        return getConsistencyScore(s, 8) >= 70;
      } catch {
        return false;
      }
    },
    progress: (s) => {
      try {
        return Math.min(1, getConsistencyScore(s, 8) / 70);
      } catch {
        return 0;
      }
    }
  },
  {
    id: "perfect4",
    title: { it: "Quadrifoglio", en: "Clover", de: "Klee" },
    desc: { it: "4 settimane perfette", en: "4 perfect weeks", de: "4 perfekte Wochen" },
    icon: "🍀",
    color: "#D9B34C",
    check: (s) => {
      const hist = getGoalHistoryMock(s);
      return hist.filter((h) => h.isDone).length >= 4;
    },
    progress: (s) => {
      const hist = getGoalHistoryMock(s);
      return Math.min(1, hist.filter((h) => h.isDone).length / 4);
    }
  }
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
function getRecommendedMissions({ sessions, profile, others }) {
  const cons = (() => {
    try {
      return getConsistencyScore(sessions, 4);
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
  const day = (/* @__PURE__ */ new Date()).getDate() % PROGRAMS.length;
  const base = PROGRAMS[day];
  const cons = (() => {
    try {
      return getConsistencyScore(sessions, 4);
    } catch {
      return 50;
    }
  })();
  const streak = (() => {
    const set = new Set((sessions || []).map((s) => s.date.slice(0, 10)));
    let cur = /* @__PURE__ */ new Date();
    if (!set.has(cur.toISOString().slice(0, 10))) cur.setDate(cur.getDate() - 1);
    let n = 0;
    while (set.has(cur.toISOString().slice(0, 10))) {
      n++;
      cur.setDate(cur.getDate() - 1);
    }
    return n;
  })();
  let bonus = "";
  if (cons > 70) bonus = "Bonus costanza: +1 round";
  else if (streak >= 3) bonus = `Streak ${streak} — mantieni!`;
  else if ((sessions == null ? void 0 : sessions.length) === 0) bonus = "Prima missione: inizia leggero";
  return { program: base, bonus, cons, streak };
}
function getBellyMissions({ sessions, profile, waistHistory }) {
  const belly = PROGRAMS.filter((p) => BELLY_IDS.includes(p.id));
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
  }).map((p) => ({ ...p, _needsBelly: needsBelly }));
}
function weekKey(d = /* @__PURE__ */ new Date()) {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date.toISOString().slice(0, 10);
}
function getWeeklyStats(sessions) {
  const weekStart = /* @__PURE__ */ new Date();
  weekStart.setDate(weekStart.getDate() - (weekStart.getDay() + 6) % 7);
  weekStart.setHours(0, 0, 0, 0);
  const wk = (sessions || []).filter((s) => new Date(s.date) >= weekStart);
  const kcal = Math.round(wk.reduce((a, s) => a + (s.kcal || 0), 0));
  const n = wk.length;
  const bestDay = wk.length ? Math.max(...wk.map((s) => s.kcal || 0)) : 0;
  return { weekKey: weekKey(), kcal, n, bestDay, from: weekStart.toISOString() };
}
function generateInviteCode(sessions, profile) {
  const wk = getWeeklyStats(sessions);
  const payload = {
    v: 1,
    wk: wk.weekKey,
    k: wk.kcal,
    n: wk.n,
    s: wk.bestDay,
    name: ((profile == null ? void 0 : profile.name) || "Amico").slice(0, 12),
    ts: Date.now()
  };
  try {
    const json = JSON.stringify(payload);
    const b64 = btoa(unescape(encodeURIComponent(json))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    return b64;
  } catch {
    return "";
  }
}
function parseInviteCode(code) {
  if (!code || typeof code !== "string") return null;
  try {
    let b64 = code.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const json = decodeURIComponent(escape(atob(b64)));
    const p = JSON.parse(json);
    if (!p || p.v !== 1 || typeof p.k !== "number") return null;
    if (p.ts && Date.now() - p.ts > 14 * 864e5) return { ...p, expired: true };
    return p;
  } catch {
    return null;
  }
}
function getInviteLink(code) {
  const base = "https://mikweb.eu/operator40/";
  return `${base}?invite=${encodeURIComponent(code)}`;
}
function getLeaderboard(localSessions, friendPayload) {
  const me = getWeeklyStats(localSessions);
  const entries = [
    { id: "me", name: "Tu", kcal: me.kcal, n: me.n, isMe: true }
  ];
  if (friendPayload && !friendPayload.expired) {
    entries.push({ id: "friend", name: friendPayload.name || "Amico", kcal: friendPayload.k || 0, n: friendPayload.n || 0, isMe: false });
  }
  entries.sort((a, b) => b.kcal - a.kcal);
  const leader = entries[0];
  const diff = friendPayload ? me.kcal - (friendPayload.k || 0) : 0;
  return { entries, leader, diff, me, friend: friendPayload };
}
function getSocialShareText(leaderboard, lang = "it") {
  const { me } = leaderboard;
  if (lang === "de") return `Operator40 Wochen-Challenge: ${me.kcal} kcal in ${me.n} Einheiten — schaffst du mehr?`;
  if (lang === "en") return `Operator40 weekly challenge: ${me.kcal} kcal in ${me.n} sessions — beat me?`;
  return `Operator40 sfida settimanale: ${me.kcal} kcal in ${me.n} sessioni — mi batti?`;
}
function SocialChallenge({ sessions = [], profile, lang = "it" }) {
  const [friendCode, setFriendCode] = reactExports.useState(() => {
    try {
      return localStorage.getItem("o40_friend_code") || "";
    } catch {
      return "";
    }
  });
  const [copied, setCopied] = reactExports.useState(false);
  const [inputCode, setInputCode] = reactExports.useState(friendCode);
  const myCode = generateInviteCode(sessions, profile);
  const myLink = getInviteLink(myCode);
  const friendPayload = parseInviteCode((friendCode || "").trim());
  const lb = getLeaderboard(sessions, friendPayload);
  reactExports.useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const inv = url.searchParams.get("invite");
      if (inv && !friendCode) {
        const p = parseInviteCode(inv);
        if (p && !p.expired) {
          setFriendCode(inv);
          setInputCode(inv);
          localStorage.setItem("o40_friend_code", inv);
          url.searchParams.delete("invite");
          window.history.replaceState({}, "", url.toString());
        }
      }
    } catch {
    }
  }, []);
  async function handleShare() {
    const text = getSocialShareText(lb, lang);
    const shareData = { title: "Operator40 — Sfida", text: `${text} ${myLink}`, url: myLink };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
    }
    try {
      await navigator.clipboard.writeText(`${text} ${myLink}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch {
      window.prompt(lang === "it" ? "Copia il link:" : "Copy link:", myLink);
    }
  }
  function handleSaveFriend() {
    const c = (inputCode || "").trim();
    const p = parseInviteCode(c);
    if (!c) {
      localStorage.removeItem("o40_friend_code");
      setFriendCode("");
      return;
    }
    if (!p) {
      alert(lang === "it" ? "Codice non valido" : "Invalid code");
      return;
    }
    if (p.expired) {
      alert(lang === "it" ? "Codice scaduto (>14gg)" : "Code expired");
      return;
    }
    setFriendCode(c);
    try {
      localStorage.setItem("o40_friend_code", c);
    } catch {
    }
  }
  function handleClear() {
    setFriendCode("");
    setInputCode("");
    try {
      localStorage.removeItem("o40_friend_code");
    } catch {
    }
  }
  const t = (it, en, de) => lang === "de" ? de : lang === "en" ? en : it;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: `linear-gradient(135deg, ${INK_2} 0%, ${INK} 100%)`, border: `1px solid ${OLIVE}`, borderRadius: 16, padding: 14, boxShadow: "0 8px 24px rgba(0,0,0,0.32)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16, color: BLAZE }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 11, letterSpacing: "0.08em" }, children: t("SFIDA SETTIMANALE AMICI", "WEEKLY FRIEND CHALLENGE", "WÖCHENTLICHE FREUNDE-CHALLENGE") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: "auto", color: STEEL, fontSize: 10 }, children: t("Lun-Dom kcal", "Mon-Sun kcal", "Mo-So kcal") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8, marginBottom: 12 }, children: lb.entries.map((e, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, background: idx === 0 ? `linear-gradient(135deg, ${BLAZE} 0%, ${BLAZE_DEEP} 100%)` : INK, border: `1px solid ${idx === 0 ? BLAZE : OLIVE}`, borderRadius: 12, padding: "10px 10px", textAlign: "center", position: "relative" }, children: [
      idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 12, color: PAPER, style: { position: "absolute", top: 6, right: 6 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-mono", style: { color: idx === 0 ? PAPER : STEEL, fontSize: 9 }, children: [
        idx === 0 ? "1°" : "2°",
        " · ",
        e.isMe ? t("TU", "YOU", "DU") : e.name.toUpperCase()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: idx === 0 ? PAPER : KHAKI, fontSize: 22 }, children: e.kcal }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: idx === 0 ? PAPER : STEEL, fontSize: 11 }, children: [
        e.n,
        " ",
        t("sess.", "sess.", "Einh.")
      ] })
    ] }, e.id)) }),
    friendPayload && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: 10, padding: "8px 10px", borderRadius: 8, background: lb.diff >= 0 ? "#7FB06918" : `${BLAZE}18`, border: `1px solid ${lb.diff >= 0 ? "#7FB069" : BLAZE}33`, color: lb.diff >= 0 ? "#7FB069" : BLAZE, fontSize: 12, textAlign: "center" }, children: lb.diff === 0 ? "Pareggio — spingete!" : lb.diff > 0 ? `Sei avanti di ${lb.diff} kcal!` : `Sei dietro di ${Math.abs(lb.diff)} kcal` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginBottom: 10 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleShare, style: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: BLAZE, color: PAPER, border: "none", borderRadius: 10, padding: "10px 12px", fontWeight: 700, fontSize: 13, cursor: "pointer" }, children: [
        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 14 }),
        " ",
        copied ? t("Copiato!", "Copied!", "Kopiert!") : t("Invita amico", "Invite friend", "Freund einladen")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        var _a;
        (_a = navigator.clipboard) == null ? void 0 : _a.writeText(myCode).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }, style: { display: "flex", alignItems: "center", gap: 6, background: INK_2, color: KHAKI, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: "10px 12px", fontSize: 12, cursor: "pointer" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { size: 13 }),
        " ",
        t("Copia codice", "Copy code", "Code kopieren")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9, marginBottom: 6 }, children: t("Il tuo codice (condividi link):", "Your code (share link):", "Dein Code:") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, padding: "8px 10px", fontSize: 10, color: KHAKI, wordBreak: "break-all", fontFamily: "monospace" }, children: myCode }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 12, display: "flex", gap: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: inputCode, onChange: (e) => setInputCode(e.target.value), placeholder: t("Incolla codice amico", "Paste friend code", "Freundescode einfügen"), style: { flex: 1, background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, padding: "8px 10px", color: PAPER, fontSize: 12 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSaveFriend, style: { background: KHAKI, color: INK, border: "none", borderRadius: 8, padding: "8px 12px", fontWeight: 700, fontSize: 12, cursor: "pointer" }, children: t("Confronta", "Compare", "Vergleichen") }),
      friendCode && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleClear, style: { background: "transparent", border: `1px solid ${STEEL}`, borderRadius: 8, padding: "8px 10px", cursor: "pointer" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, color: STEEL }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 10, marginTop: 6 }, children: t("No backend — solo kcal settimanali, codice scade dopo 14gg.", "No backend — weekly kcal only, code expires in 14 days.", "Kein Backend — nur wöchentliche kcal, Code 14 Tage gültig.") })
  ] });
}
function CollapsibleSection({
  id,
  title,
  icon: Icon,
  badge,
  defaultOpen = false,
  children
}) {
  const storageKey = `o40_home_acc_${id}`;
  const [open, setOpen] = reactExports.useState(() => {
    try {
      const v = localStorage.getItem(storageKey);
      if (v !== null) return v === "1";
    } catch {
    }
    return defaultOpen;
  });
  const contentRef = reactExports.useRef(null);
  const [height, setHeight] = reactExports.useState(open ? "auto" : 0);
  reactExports.useEffect(() => {
    try {
      localStorage.setItem(storageKey, open ? "1" : "0");
    } catch {
    }
    if (contentRef.current) {
      if (open) {
        const h = contentRef.current.scrollHeight;
        setHeight(h);
        const t = setTimeout(() => setHeight("auto"), 280);
        return () => clearTimeout(t);
      } else {
        if (height === "auto") {
          const h = contentRef.current.scrollHeight;
          setHeight(h);
          requestAnimationFrame(() => requestAnimationFrame(() => setHeight(0)));
        } else {
          setHeight(0);
        }
      }
    }
  }, [open]);
  reactExports.useEffect(() => {
    if (open && contentRef.current && height === 0) {
      setHeight(contentRef.current.scrollHeight);
      const t = setTimeout(() => setHeight("auto"), 280);
      return () => clearTimeout(t);
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        margin: "0 16px 12px",
        background: `linear-gradient(135deg, ${INK} 0%, #1E2318 100%)`,
        border: `1px solid ${open ? OLIVE : `${OLIVE}88`}`,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: open ? "0 4px 16px rgba(0,0,0,0.25)" : "none",
        transition: "border-color 0.2s"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setOpen((v) => !v),
            "aria-expanded": open,
            style: {
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 14px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textAlign: "left"
            },
            children: [
              Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Icon,
                {
                  size: 16,
                  color: open ? BLAZE : KHAKI,
                  style: { flexShrink: 0, transition: "color 0.2s" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "o40-mono",
                  style: {
                    color: open ? PAPER : KHAKI,
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    flex: 1,
                    fontWeight: 600
                  },
                  children: title
                }
              ),
              badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "o40-mono",
                  style: {
                    color: open ? KHAKI : STEEL,
                    fontSize: 10,
                    background: open ? `${KHAKI}18` : `${OLIVE}22`,
                    border: `1px solid ${open ? `${KHAKI}44` : OLIVE}`,
                    borderRadius: 20,
                    padding: "2px 8px",
                    flexShrink: 0
                  },
                  children: badge
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronRight,
                {
                  size: 16,
                  color: STEEL,
                  style: {
                    flexShrink: 0,
                    transform: open ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.22s ease"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: contentRef,
            style: {
              maxHeight: height === "auto" ? "none" : height,
              height: height === "auto" ? "auto" : height,
              overflow: "hidden",
              opacity: open ? 1 : 0,
              transition: height === "auto" ? "opacity 0.22s ease" : "max-height 0.28s ease, height 0.28s ease, opacity 0.22s ease"
            },
            "aria-hidden": !open,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  padding: open ? "0 14px 14px" : "0 14px",
                  opacity: open ? 1 : 0,
                  transition: "opacity 0.22s ease",
                  pointerEvents: open ? "auto" : "none"
                },
                children
              }
            )
          }
        )
      ]
    }
  );
}
function AchievementsModal({ sessions, onClose }) {
  const ach = getAchievementsProgress(sessions);
  const nextAch = getNextAchievements(sessions, 3);
  const unlocked = ach.filter((a) => a.unlocked).length;
  const medals = getMedalProgress(sessions);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-tour-mask", onClick: onClose, style: { zIndex: 30 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "o40-tour-card",
      onClick: (e) => e.stopPropagation(),
      style: {
        maxHeight: "90vh",
        overflowY: "auto",
        maxWidth: 520,
        width: "96vw",
        padding: 0,
        border: `1px solid ${OLIVE}`,
        borderRadius: 18,
        background: INK_2
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              position: "sticky",
              top: 0,
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 16px",
              background: INK_2,
              borderBottom: `1px solid ${OLIVE}`,
              borderRadius: "18px 18px 0 0"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { size: 18, color: KHAKI }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "o40-mono",
                    style: { color: KHAKI, fontSize: 11, letterSpacing: "0.08em" },
                    children: [
                      "ACHIEVEMENTS • ",
                      unlocked,
                      "/",
                      ach.length
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onClose,
                  style: {
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: INK,
                    border: `1px solid ${OLIVE}`,
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, color: STEEL })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: 16, display: "flex", flexDirection: "column", gap: 16 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }, children: ach.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                minWidth: 80,
                background: a.unlocked ? `${a.color}22` : INK,
                border: `1px solid ${a.unlocked ? a.color : OLIVE}`,
                borderRadius: 12,
                padding: "10px 8px",
                textAlign: "center",
                flexShrink: 0
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 20 }, children: a.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      color: a.unlocked ? PAPER : STEEL,
                      fontSize: 10,
                      fontWeight: 700,
                      lineHeight: 1.2,
                      marginTop: 4
                    },
                    children: a.title.it
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "o40-mono",
                    style: { color: a.unlocked ? KHAKI : STEEL, fontSize: 9, marginTop: 2 },
                    children: a.unlocked ? "Sbloccato" : `${Math.round(a.progress * 100)}%`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 3, borderRadius: 2, background: OLIVE, marginTop: 6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: `${Math.round(a.progress * 100)}%`,
                      height: "100%",
                      background: a.color
                    }
                  }
                ) })
              ]
            },
            a.id
          )) }),
          nextAch.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: `${KHAKI}10`,
                border: `1px solid ${KHAKI}33`,
                borderRadius: 12,
                padding: 12
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "o40-mono",
                    style: {
                      color: KHAKI,
                      fontSize: 10,
                      letterSpacing: "0.06em",
                      marginBottom: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 6
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12 }),
                      " PROSSIMI • ",
                      nextAch.length
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" }, children: nextAch.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    style: {
                      background: `${a.color}22`,
                      border: `1px solid ${a.color}55`,
                      color: PAPER,
                      fontSize: 11,
                      padding: "4px 8px",
                      borderRadius: 20
                    },
                    children: [
                      a.icon,
                      " ",
                      a.title.it,
                      " ",
                      Math.round(a.progress * 100),
                      "%"
                    ]
                  },
                  a.id
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: { background: INK, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 12 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "o40-mono",
                    style: { color: STEEL, fontSize: 10, letterSpacing: "0.06em", marginBottom: 8 },
                    children: [
                      "MEDAGLIE • ",
                      medals.unlocked.length,
                      "/",
                      medals.all.length
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, overflowX: "auto" }, children: medals.all.slice(0, 8).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: { minWidth: 56, textAlign: "center", opacity: m.unlocked ? 1 : 0.5 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            margin: "0 auto",
                            display: "grid",
                            placeItems: "center",
                            background: m.unlocked ? BLAZE : INK_2,
                            border: `1px solid ${m.unlocked ? BLAZE : OLIVE}`
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { size: 14, color: m.unlocked ? PAPER : STEEL })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: m.unlocked ? PAPER : STEEL, fontSize: 9, marginTop: 4 }, children: m.n })
                    ]
                  },
                  `${m.type}-${m.n}`
                )) })
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function HomeScreen({
  profile,
  sessions,
  customPrograms,
  waistHistory,
  weightHistory,
  onOpenProgram,
  onBuild,
  onEditCustom,
  onDeleteCustom,
  onDismissIntro,
  onPromote,
  onBellyTest,
  onPose
}) {
  const { lang, t } = useT();
  const [confirmDeleteId, setConfirmDeleteId] = reactExports.useState(null);
  const [showOthers, setShowOthers] = reactExports.useState(false);
  const { streak, usedFreeze } = computeStreakWithFreeze(sessions);
  const weekAgo = Date.now() - 7 * 864e5;
  const kcalWeek = Math.round(
    sessions.filter((s) => new Date(s.date).getTime() > weekAgo).reduce((a, s) => a + s.kcal, 0)
  );
  const sessionsThisWeek = sessions.filter((s) => new Date(s.date).getTime() > weekAgo).length;
  const weeklyGoal = profile.weeklyGoal || WEEKLY_GOAL;
  const { program: todayProgram, adaptive, isRecovery, isDeload } = pickNextProgram(sessions, profile);
  const othersRaw = PROGRAMS.filter((p) => p.id !== todayProgram.id);
  const others = getRecommendedMissions({ sessions, profile, others: othersRaw });
  const dailyChallenge = getDailyChallenge({ sessions, profile });
  const { current: rank, next: nextRank } = getRank(sessions.length);
  nextBadge(sessions);
  const lastSession = sessions.length ? sessions[sessions.length - 1] : null;
  const lastProgram = lastSession && lastSession.programId !== "health-import" ? [...PROGRAMS, ...customPrograms].find((p) => p.id === lastSession.programId) : null;
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
  const [showAchievements, setShowAchievements] = reactExports.useState(false);
  const wp = getWeeklyProgress(sessions, weeklyGoal);
  const cons = getConsistencyScore(sessions);
  const pace = getAveragePace(sessions);
  const risk = getStreakRisk(sessions);
  const bellyProgress = getBellyProgress(sessions, 3);
  const ach = getAchievementsProgress(sessions);
  const unlockedAch = ach.filter((a) => a.unlocked).length;
  const isRisk = risk !== "ok";
  const showPinnedProgress = isRisk || canPromote;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-screen-in", style: { flex: 1, display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `@keyframes o40OrangePulse{0%,100%{box-shadow:0 0 0 1px #C1440E22 inset,0 4px 12px rgba(0,0,0,0.25)}50%{box-shadow:0 0 0 1px #C1440E44 inset,0 6px 20px rgba(193,68,14,0.22)}}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          padding: "16px 16px 4px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12 }, children: greeting(lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 26 }, children: profile.name.toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "o40-mono",
                style: { color: BLAZE, fontSize: 10.5, letterSpacing: "0.1em", marginTop: 1 },
                children: [
                  tr(rank.name, lang),
                  " · ",
                  tr(lvl.label, lang),
                  nextRank && ` · ${nextRank.min - sessions.length} ${t("home.towards")} ${tr(nextRank.name, lang)}`
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                marginTop: 2,
                flexShrink: 0
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", width: 46, height: 46 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressRing, { progress: campDay / CAMP_DAYS, size: 46, stroke: 5, color: BLAZE }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-display", style: { color: PAPER, fontSize: 13 }, children: campDay })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "o40-mono",
                    style: { color: KHAKI, fontSize: 8.5, letterSpacing: "0.06em" },
                    children: [
                      t("home.day"),
                      " /",
                      CAMP_DAYS
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "0 16px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: `${OLIVE}22`,
          border: `1px solid ${OLIVE}`,
          borderRadius: 20,
          padding: "5px 12px",
          marginTop: 8
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 12, color: BLAZE }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "o40-mono",
              style: { color: KHAKI, fontSize: 10.5, letterSpacing: "0.08em" },
              children: [
                t("home.min15"),
                " · ",
                t("home.mission"),
                " ",
                tr(todayProgram.focus, lang)
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "o40-ticker o40-mono",
        style: { marginTop: 10, fontSize: 10.5, color: KHAKI, letterSpacing: "0.12em" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-ticker-inner", children: [
          `${t("ticker.streak")} ${streak} ${t("dt.days").toUpperCase()}`,
          `${t("ticker.sessions")} ${sessions.length}`,
          `${t("ticker.kcal")} ${kcalWeek} / ${t("ticker.week7")}`,
          `${t("ticker.level")} ${tr(lvl.label, lang).toUpperCase()}`,
          `${t("ticker.mission")} ${todayProgram.id.toUpperCase()}`,
          `${t("ticker.goal")} ${sessionsThisWeek}/${weeklyGoal} ${t("ticker.week")}`,
          `${t("ticker.rank")} ${tr(rank.name, lang).toUpperCase()}`
        ].concat(
          `${t("ticker.streak")} ${streak} ${t("dt.days").toUpperCase()}`,
          `${t("ticker.sessions")} ${sessions.length}`,
          `${t("ticker.kcal")} ${kcalWeek} / ${t("ticker.week7")}`,
          `${t("ticker.level")} ${tr(lvl.label, lang).toUpperCase()}`,
          `${t("ticker.mission")} ${todayProgram.id.toUpperCase()}`,
          `${t("ticker.goal")} ${sessionsThisWeek}/${weeklyGoal} ${t("ticker.week")}`,
          `${t("ticker.rank")} ${tr(rank.name, lang).toUpperCase()}`
        ).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 44 }, children: [
          s,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: BLAZE }, children: "◆" })
        ] }, i)) })
      }
    ),
    !profile.seenIntro && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          margin: "10px 16px 0",
          background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`,
          border: `1px solid ${BLAZE}`,
          borderRadius: 12,
          padding: 12,
          display: "flex",
          gap: 10,
          alignItems: "flex-start"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 16, color: BLAZE, style: { flexShrink: 0, marginTop: 1 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: { flex: 1, color: KHAKI, fontSize: 12, lineHeight: 1.4 },
              dangerouslySetInnerHTML: { __html: t("home.intro") }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onDismissIntro,
              style: {
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 2,
                flexShrink: 0
              },
              "aria-label": t("home.intro.close"),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, color: STEEL })
            }
          )
        ]
      }
    ),
    showPinnedProgress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "12px 16px 0", display: "flex", flexDirection: "column", gap: 8 }, children: [
      isRisk && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            background: `linear-gradient(135deg, ${risk === "break" ? BLAZE : KHAKI}18, ${INK_2})`,
            border: `1px solid ${risk === "break" ? BLAZE : KHAKI}`,
            borderRadius: 12,
            padding: "11px 13px",
            display: "flex",
            alignItems: "center",
            gap: 11
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: `${risk === "break" ? BLAZE : KHAKI}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, color: risk === "break" ? BLAZE : KHAKI })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: [
                risk === "break" ? t("home.streak.break") : t("home.streak.risk"),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: STEEL, fontWeight: 400 }, children: [
                  "· ",
                  cons,
                  "% · ",
                  wp.done,
                  "/",
                  wp.total
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 1 }, children: pace ? `${pace.avgMin}′ / ${pace.avgKcal} kcal medi` : "Aderenza " + cons + "%" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "o40-display",
                  style: { color: risk === "break" ? BLAZE : KHAKI, fontSize: 18 },
                  children: [
                    Math.round(wp.pct * 100),
                    "%"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: t("home.week.label") })
            ] })
          ]
        }
      ),
      canPromote && nextLevel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: `linear-gradient(135deg, ${BLAZE_DEEP}, ${INK_2})`,
            border: `1px solid ${BLAZE}`,
            borderRadius: 12,
            padding: "11px 13px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 16, color: PAPER, style: { flexShrink: 0 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: t("home.promote.title", { lvl: tr(nextLevel.label, lang) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 11.5, marginTop: 1 }, children: t("home.promote.body") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: onPromote,
                style: {
                  background: BLAZE,
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 12px",
                  cursor: "pointer",
                  flexShrink: 0
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: PAPER, fontSize: 11 }, children: t("home.promote.btn") })
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: "12px 16px 0" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "o40-mono",
          style: {
            color: KHAKI,
            fontSize: 11,
            letterSpacing: "0.08em",
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 6
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12, color: BLAZE }),
            " ",
            t("home.section.today")
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "o40-card o40-ring-border o40-sheen",
            onClick: () => {
              vibrate(10);
              onOpenProgram(todayProgram);
            },
            style: {
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
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "url(music-bg.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, background: "rgba(10,12,10,0.6)" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-embers", children: [
                  ["8%", "0s", "3.2s"],
                  ["22%", "1.1s", "3.8s"],
                  ["38%", "0.5s", "3.4s"],
                  ["55%", "1.7s", "3.6s"],
                  ["70%", "0.9s", "3.3s"],
                  ["84%", "1.4s", "3.9s"],
                  ["93%", "0.3s", "3.5s"]
                ].map(([l, d, du], i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "o40-ember",
                    style: { left: l, animationDelay: d, animationDuration: du }
                  },
                  i
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "o40-mono",
                      style: { color: BLAZE, fontSize: 11, letterSpacing: "0.1em" },
                      children: t("home.mission.tag", { id: todayProgram.id })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "o40-mono",
                      style: {
                        color: KHAKI,
                        fontSize: 9.5,
                        letterSpacing: "0.08em",
                        background: `${KHAKI}18`,
                        border: `1px solid ${KHAKI}44`,
                        borderRadius: 6,
                        padding: "2px 7px"
                      },
                      children: tr(todayProgram.focus, lang)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 2, alignItems: "center" }, children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Star,
                    {
                      size: 10,
                      color: i < (todayProgram.difficulty || 2) ? BLAZE : STEEL,
                      fill: i < (todayProgram.difficulty || 2) ? BLAZE : "none"
                    },
                    i
                  )) }),
                  ["H", "I", "J", "K", "L", "M", "N", "O", "P"].includes(todayProgram.id) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "o40-mono",
                      style: {
                        color: PAPER,
                        fontSize: 9,
                        letterSpacing: "0.08em",
                        background: BLAZE,
                        borderRadius: 6,
                        padding: "2px 7px"
                      },
                      children: "NEW"
                    }
                  ),
                  isRecovery && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: "#7FB069", background: "#7FB06922", border: "1px solid #7FB06955", borderRadius: 6, padding: "2px 7px", fontSize: 9 }, children: "RECUPERO" }),
                  isDeload && !isRecovery && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, background: `${KHAKI}22`, border: `1px solid ${KHAKI}55`, borderRadius: 6, padding: "2px 7px", fontSize: 9 }, children: "DELOAD" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 30, marginTop: 2 }, children: tr(todayProgram.name, lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 13.5, marginTop: 2 }, children: tr(todayProgram.tagline, lang) }),
                adaptive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "o40-mono",
                    style: {
                      color: KHAKI,
                      fontSize: 10.5,
                      marginTop: 8,
                      background: INK,
                      border: `1px solid ${OLIVE}`,
                      borderRadius: 8,
                      padding: "4px 8px",
                      display: "inline-block"
                    },
                    children: t("home.mission.adaptive")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: { display: "flex", gap: 14, marginTop: 12, color: STEEL, fontSize: 12.5 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("home.mission.min") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("home.mission.noequip") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("home.mission.ex", { n: todayProgram.exercises.length }) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
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
                    },
                    children: [
                      t("home.mission.see"),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 })
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        lastProgram && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => onOpenProgram(lastProgram),
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              width: "100%",
              background: "transparent",
              border: `1px dashed ${OLIVE}`,
              borderRadius: 10,
              padding: 10,
              cursor: "pointer"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 13, color: STEEL }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: STEEL, fontSize: 11.5 }, children: t("home.repeat", { name: tr(lastProgram.name, lang) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => onOpenProgram(QUICK_PROGRAM),
            style: {
              display: "flex",
              alignItems: "center",
              gap: 12,
              width: "100%",
              background: `linear-gradient(135deg, ${INK_2}, ${INK})`,
              border: `1px solid ${BLAZE}`,
              borderRadius: 12,
              padding: 12,
              cursor: "pointer",
              textAlign: "left",
              boxShadow: `0 0 0 1px ${BLAZE}22 inset, 0 4px 12px rgba(0,0,0,0.25)`,
              animation: "o40OrangePulse 2.4s ease-in-out infinite"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: `${BLAZE}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 17, color: BLAZE })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 13.5, fontWeight: 600 }, children: tr(QUICK_PROGRAM.name, lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 11.5 }, children: [
                  tr(QUICK_PROGRAM.tagline, lang),
                  " · ",
                  t("home.quick.min")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, color: BLAZE })
            ]
          }
        ),
        (() => {
          const gironeProgram = (() => {
            const belly = PROGRAMS.filter((p) => p.belly);
            const idx = (/* @__PURE__ */ new Date()).getDate() % belly.length;
            return belly[idx] || dailyChallenge.program;
          })();
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})`,
                border: `1px solid ${BLAZE}`,
                borderRadius: 12,
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: `0 0 0 1px ${BLAZE}22 inset, 0 4px 12px rgba(0,0,0,0.25)`,
                animation: "o40OrangePulse 2.4s ease-in-out infinite"
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
                      justifyContent: "center",
                      flexShrink: 0
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 16, color: BLAZE })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "o40-mono",
                      style: { color: BLAZE, fontSize: 10, letterSpacing: "0.06em" },
                      children: t("home.girone.title", { id: gironeProgram.id })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: tr(gironeProgram.name, lang) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11 }, children: tr(gironeProgram.tagline, lang) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => onOpenProgram(gironeProgram),
                    style: {
                      background: BLAZE,
                      color: PAPER,
                      border: "none",
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                      flexShrink: 0
                    },
                    children: t("home.daily.go")
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
              background: `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})`,
              border: `1px solid ${BLAZE}`,
              borderRadius: 12,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: `0 0 0 1px ${BLAZE}22 inset, 0 4px 12px rgba(0,0,0,0.25)`,
              animation: "o40OrangePulse 2.4s ease-in-out infinite"
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
                    justifyContent: "center",
                    flexShrink: 0
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 16, color: BLAZE })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "o40-mono",
                    style: { color: BLAZE, fontSize: 10, letterSpacing: "0.06em" },
                    children: t("home.dailyChallenge", { bonus: dailyChallenge.bonus })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: tr(dailyChallenge.program.name, lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11 }, children: tr(dailyChallenge.program.tagline, lang) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => onOpenProgram(dailyChallenge.program),
                  style: {
                    background: BLAZE,
                    color: PAPER,
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 12px",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                    flexShrink: 0
                  },
                  children: t("home.daily.go")
                }
              )
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CollapsibleSection,
      {
        id: "progressi",
        title: t("home.section.progress"),
        icon: TrendingUp,
        badge: `${cons}% · ${wp.done}/${wp.total} · ${streak}gg`,
        defaultOpen: showPinnedProgress,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 12 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DogTag,
              {
                label: t("dt.streak"),
                value: usedFreeze ? `${streak} ❄️` : streak,
                sub: streak === 1 ? t("dt.day") : t("dt.days")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag, { label: t("dt.sessions"), value: sessions.length, sub: t("dt.total") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag, { label: t("dt.kcal"), value: kcalWeek, sub: t("dt.7d") })
          ] }),
          !showPinnedProgress && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                marginBottom: 12,
                background: `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})`,
                border: `1px solid ${OLIVE}`,
                borderRadius: 12,
                padding: "11px 13px",
                display: "flex",
                alignItems: "center",
                gap: 11
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: `${BLAZE}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, color: KHAKI })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: [
                    "Aderenza · ",
                    cons,
                    "%",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: STEEL, fontWeight: 400 }, children: [
                      "· ",
                      wp.done,
                      "/",
                      wp.total,
                      " questa settimana"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 1 }, children: pace ? `${pace.avgMin}′ / ${pace.avgKcal} kcal medi` : "Aderenza " + cons + "%" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "o40-display",
                      style: { color: wp.isDone ? "#7FB069" : BLAZE, fontSize: 18 },
                      children: [
                        Math.round(wp.pct * 100),
                        "%"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: t("home.week.label") })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                marginBottom: 12,
                background: `linear-gradient(135deg, ${wp.isDone ? "#7FB069" : BLAZE}18, ${INK_2})`,
                border: `1px solid ${wp.isDone ? "#7FB069" : BLAZE}55`,
                borderRadius: 12,
                padding: "11px 13px",
                display: "flex",
                gap: 11,
                alignItems: "center",
                opacity: showPinnedProgress ? 0.6 : 1
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: `${wp.isDone ? "#7FB069" : BLAZE}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 18
                    },
                    children: wp.isDone ? "✓" : "◐"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: [
                    wp.isDone ? "Obiettivo raggiunto!" : `${wp.remain} ${wp.remain === 1 ? "sessione" : "sessioni"} alla meta`,
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: STEEL, fontWeight: 400 }, children: [
                      "· ~",
                      estimateWeeklyCalories(sessions, weeklyGoal),
                      " kcal/sett."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MiniGoalBar, { history: getGoalHistory(sessions, weeklyGoal, 6) }) })
                ] })
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
                      style: { color: cons >= 70 ? "#7FB069" : cons >= 40 ? KHAKI : BLAZE, fontSize: 22 },
                      children: [
                        cons,
                        "%"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: t("home.consistency") })
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: pace ? PAPER : STEEL, fontSize: 18 }, children: pace ? `${pace.avgMin}′` : "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: t("home.average") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 10, marginTop: 4 }, children: pace ? `${pace.avgKcal} kcal` : "n/d" })
                ]
              }
            )
          ] }),
          (() => {
            const smart = getSmartInsight({ sessions, profile, waistHistory, weightHistory, lang });
            const rec = getSmartRecommendation({ sessions, profile, lang });
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  marginBottom: 12,
                  background: `linear-gradient(135deg, ${smart.color}18, ${INK_2})`,
                  border: `1px solid ${smart.color}55`,
                  borderRadius: 12,
                  padding: "11px 13px",
                  display: "flex",
                  gap: 11,
                  alignItems: "center"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: `${smart.color}22`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 18
                      },
                      children: smart.icon
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: smart.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 1, lineHeight: 1.4 }, children: smart.body }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          color: KHAKI,
                          fontSize: 10.5,
                          marginTop: 4,
                          display: "flex",
                          alignItems: "center",
                          gap: 4
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { size: 10 }),
                          " ",
                          rec.reason
                        ]
                      }
                    )
                  ] })
                ]
              }
            );
          })(),
          (() => {
            const ch = getPersonalChallenge(sessions, profile);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  background: `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})`,
                  border: `1px solid ${ch.color}55`,
                  borderRadius: 12,
                  padding: "11px 13px"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 16 }, children: ch.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "o40-mono",
                        style: { color: KHAKI, fontSize: 10, letterSpacing: "0.06em" },
                        children: [
                          ch.title.toUpperCase(),
                          " • SFIDA PERSONALE"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        style: { marginLeft: "auto", color: ch.color, fontSize: 11, fontWeight: 700 },
                        children: [
                          Math.round(ch.progress * 100),
                          "%"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: ch.desc }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        height: 6,
                        borderRadius: 3,
                        background: OLIVE_DARK,
                        marginTop: 8,
                        overflow: "hidden"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            width: `${Math.round(ch.progress * 100)}%`,
                            height: "100%",
                            background: ch.color,
                            transition: "width 0.4s ease"
                          }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 6,
                        color: STEEL,
                        fontSize: 10.5
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          ch.current,
                          "/",
                          ch.target
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              color: ch.progress >= 1 ? "#7FB069" : KHAKI,
                              display: "flex",
                              alignItems: "center",
                              gap: 4
                            },
                            children: ch.progress >= 1 ? "Completata! 🎉" : getRecoveryTip(sessions, lang)
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            );
          })(),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 12, display: "flex", gap: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => onPose && onPose("squat"),
              style: {
                flex: 1,
                padding: "6px 8px",
                borderRadius: 8,
                border: `1px solid ${OLIVE}`,
                background: INK,
                color: STEEL,
                fontSize: 10,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 12 }),
                " Conta squat (camera)"
              ]
            }
          ) })
        ]
      }
    ),
    (() => {
      const wkN = sessions.filter((s) => new Date(s.date) >= (() => {
        const d = /* @__PURE__ */ new Date();
        d.setDate(d.getDate() - (d.getDay() + 6) % 7);
        d.setHours(0, 0, 0, 0);
        return d;
      })()).length;
      const wkKcal = Math.round(sessions.filter((s) => new Date(s.date) >= (() => {
        const d = /* @__PURE__ */ new Date();
        d.setDate(d.getDate() - (d.getDay() + 6) % 7);
        d.setHours(0, 0, 0, 0);
        return d;
      })()).reduce((a, s) => a + (s.kcal || 0), 0));
      const friendCode = (() => {
        try {
          return localStorage.getItem("o40_friend_code");
        } catch {
          return null;
        }
      })();
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "social",
          title: t("home.section.social"),
          icon: Users,
          badge: friendCode ? t("home.social.badge", { n: "1", kcal: wkKcal }) : `${wkN}/${profile.weeklyGoal || 3} · ${wkKcal} kcal`,
          defaultOpen: false,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocialChallenge, { sessions, profile, lang })
        }
      );
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CollapsibleSection,
      {
        id: "missioni",
        title: t("home.section.missions"),
        icon: Target,
        badge: `${bellyProgress.done}/${bellyProgress.total} · ${customPrograms.length} custom`,
        defaultOpen: false,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: `linear-gradient(135deg, ${BLAZE}14, ${INK_2})`,
                border: `1px solid ${BLAZE}66`,
                borderRadius: 14,
                padding: 12,
                marginBottom: 12
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: `${BLAZE}22`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 16, color: BLAZE })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "o40-mono",
                        style: { color: BLAZE, fontSize: 11, letterSpacing: "0.08em" },
                        children: t("home.belly.title")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 11 }, children: getBellyInsight({ sessions, waistHistory, lang }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "o40-display",
                        style: { color: bellyProgress.isDone ? "#7FB069" : BLAZE, fontSize: 18 },
                        children: [
                          bellyProgress.done,
                          "/",
                          bellyProgress.total
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: STEEL, fontSize: 8 }, children: t("home.week.label") })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      height: 6,
                      borderRadius: 3,
                      background: OLIVE_DARK,
                      overflow: "hidden",
                      marginBottom: 10
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          width: `${Math.round(bellyProgress.pct * 100)}%`,
                          height: "100%",
                          background: bellyProgress.isDone ? "#7FB069" : BLAZE,
                          transition: "width 0.4s ease"
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8 }, children: getBellyMissions({ sessions, profile, waistHistory }).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => onOpenProgram(p),
                    style: {
                      flex: 1,
                      background: INK,
                      border: `1px solid ${p.id === "P" ? BLAZE : OLIVE}`,
                      borderRadius: 10,
                      padding: "10px 8px",
                      cursor: "pointer",
                      textAlign: "center",
                      position: "relative"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "o40-mono",
                          style: { color: BLAZE, fontSize: 9, letterSpacing: "0.08em" },
                          children: [
                            p.id,
                            " • ",
                            tr(p.focus, lang)
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: PAPER,
                            fontSize: 11,
                            fontWeight: 700,
                            lineHeight: 1.2,
                            marginTop: 2
                          },
                          children: tr(p.name, lang)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 1, justifyContent: "center", marginTop: 4 }, children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Star,
                        {
                          size: 8,
                          color: i < (p.difficulty || 2) ? BLAZE : STEEL,
                          fill: i < (p.difficulty || 2) ? BLAZE : "none"
                        },
                        i
                      )) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 9, marginTop: 4 }, children: [
                        p.exercises.length,
                        " esercizi •",
                        " ",
                        p.exercises.slice(0, 2).map((e) => {
                          var _a, _b;
                          return ((_b = (_a = EXERCISES[e]) == null ? void 0 : _a.name) == null ? void 0 : _b.it) || e;
                        }).join(" + ")
                      ] }),
                      getBellyStreak(sessions) >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          style: {
                            position: "absolute",
                            top: 4,
                            right: 4,
                            background: BLAZE,
                            color: PAPER,
                            fontSize: 7,
                            fontWeight: 700,
                            borderRadius: 4,
                            padding: "1px 4px"
                          },
                          children: [
                            "🔥",
                            getBellyStreak(sessions)
                          ]
                        }
                      )
                    ]
                  },
                  p.id
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 8,
                      color: STEEL,
                      fontSize: 10
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "Streak pancia: ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { style: { color: KHAKI }, children: [
                          getBellyStreak(sessions),
                          " gg"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: bellyProgress.isDone ? "Obiettivo pancia raggiunto ✓" : `${bellyProgress.remain} pancia alla meta` })
                    ]
                  }
                ),
                (() => {
                  const next = shouldProgressBellyLevel({
                    sessions,
                    currentLevelKey: profile.bellyLevel || "recluta",
                    profile
                  });
                  const curLevel = profile.bellyLevel || "recluta";
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 10 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        onClick: onBellyTest,
                        style: {
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          padding: "8px 10px",
                          borderRadius: 8,
                          border: `1px solid ${BLAZE}`,
                          background: profile.bellyTest ? INK : `${BLAZE}18`,
                          color: profile.bellyTest ? KHAKI : BLAZE,
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: "pointer"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 12 }),
                          " ",
                          profile.bellyTest ? `Test: ${profile.bellyTest.level.toUpperCase()} · Rifai` : "Test Pancia 2.0"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          background: INK,
                          border: `1px solid ${OLIVE}`,
                          borderRadius: 8,
                          padding: "6px 10px",
                          color: KHAKI,
                          fontSize: 10,
                          fontWeight: 600
                        },
                        children: [
                          "Liv. ",
                          curLevel.toUpperCase()
                        ]
                      }
                    ),
                    next && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        onClick: async () => {
                          const p = {
                            ...profile,
                            bellyLevel: next,
                            bellyLevelUpdated: (/* @__PURE__ */ new Date()).toISOString()
                          };
                          try {
                            await window.storage.set("o40_profile", JSON.stringify(p), false);
                          } catch {
                          }
                          window.location.reload();
                        },
                        style: {
                          padding: "6px 10px",
                          borderRadius: 8,
                          border: `1px solid ${KHAKI}`,
                          background: KHAKI,
                          color: INK,
                          fontSize: 10,
                          fontWeight: 700,
                          cursor: "pointer"
                        },
                        children: [
                          "→ ",
                          next.toUpperCase(),
                          "?"
                        ]
                      }
                    )
                  ] });
                })()
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setShowOthers((v) => !v),
              style: {
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                background: showOthers ? OLIVE_DARK : INK_2,
                border: `1px solid ${showOthers ? BLAZE : OLIVE}`,
                borderRadius: 12,
                padding: "12px 14px",
                cursor: "pointer",
                marginBottom: 12,
                boxShadow: showOthers ? `0 4px 12px rgba(0,0,0,0.3)` : "none",
                transition: "all 0.2s ease"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: showOthers ? BLAZE : `${KHAKI}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 16, color: showOthers ? PAPER : KHAKI })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, textAlign: "left" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "o40-mono",
                      style: { color: showOthers ? BLAZE : KHAKI, fontSize: 11, letterSpacing: "0.06em" },
                      children: [
                        t("home.other"),
                        " • ",
                        others.length,
                        " missioni"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11, marginTop: 2 }, children: showOthers ? "Tocca per chiudere" : "Esplora tutte le missioni disponibili" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: showOthers ? BLAZE : OLIVE_DARK,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: showOthers ? "rotate(90deg)" : "none",
                      transition: "all 0.2s ease"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14, color: showOthers ? PAPER : KHAKI })
                  }
                )
              ]
            }
          ),
          showOthers && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }, children: others.map((p, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => onOpenProgram(p),
              style: {
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: idx === 0 ? `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})` : INK_2,
                border: `1px solid ${idx === 0 ? KHAKI : ["H", "I", "J"].includes(p.id) ? BLAZE : OLIVE}`,
                borderRadius: 10,
                padding: 12,
                cursor: "pointer",
                textAlign: "left",
                position: "relative"
              },
              children: [
                idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      position: "absolute",
                      top: 6,
                      left: 6,
                      background: KHAKI,
                      color: INK,
                      fontSize: 8,
                      fontWeight: 700,
                      borderRadius: 4,
                      padding: "1px 4px"
                    },
                    children: "★ Consigliata"
                  }
                ),
                ["H", "I", "J", "K", "L", "M", "N", "O", "P"].includes(p.id) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      position: "absolute",
                      top: 6,
                      right: 6,
                      background: BLAZE,
                      color: PAPER,
                      fontSize: 8,
                      fontWeight: 700,
                      borderRadius: 4,
                      padding: "1px 4px"
                    },
                    children: "NEW"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 40, height: 40, flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseFigure, { pose: EXERCISES[p.exercises[0]].pose, color: KHAKI }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        color: PAPER,
                        fontSize: 14.5,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 6
                      },
                      children: [
                        tr(p.name, lang),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { display: "flex", gap: 1 }, children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Star,
                          {
                            size: 9,
                            color: i < (p.difficulty || 2) ? KHAKI : STEEL,
                            fill: i < (p.difficulty || 2) ? KHAKI : "none"
                          },
                          i
                        )) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12 }, children: tr(p.tagline, lang) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18, color: STEEL })
              ]
            },
            p.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "o40-mono",
              style: {
                color: KHAKI,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: "12px 0 8px"
              },
              children: t("home.yours")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
            customPrograms.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: INK_2,
                  border: `1px solid ${OLIVE}`,
                  borderRadius: 10,
                  padding: 12
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => onOpenProgram(p),
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        flex: 1,
                        padding: 0
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 40, height: 40, flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseFigure, { pose: EXERCISES[p.exercises[0]].pose, color: KHAKI }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 14.5, fontWeight: 600 }, children: tr(p.name, lang) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: STEEL, fontSize: 12 }, children: [
                            tr(p.tagline, lang),
                            " · ",
                            t("home.custom.ex", { n: p.exercises.length })
                          ] })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => onEditCustom(p),
                      style: { ...btnIcon, background: "transparent" },
                      "aria-label": "Modifica",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 14, color: KHAKI })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        if (confirmDeleteId === p.id) {
                          onDeleteCustom(p.id);
                          setConfirmDeleteId(null);
                        } else {
                          setConfirmDeleteId(p.id);
                          setTimeout(() => setConfirmDeleteId((c) => c === p.id ? null : c), 3e3);
                        }
                      },
                      style: {
                        ...btnIcon,
                        background: confirmDeleteId === p.id ? `${BLAZE}33` : "transparent"
                      },
                      "aria-label": t("home.custom.delete"),
                      children: confirmDeleteId === p.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16, color: STEEL })
                    }
                  )
                ]
              },
              p.id
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: onBuild,
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: "transparent",
                  border: `1px dashed ${KHAKI}`,
                  borderRadius: 10,
                  padding: 14,
                  cursor: "pointer"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, color: KHAKI }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "o40-mono",
                      style: { color: KHAKI, fontSize: 12.5, letterSpacing: "0.05em" },
                      children: t("home.custom.create")
                    }
                  )
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CollapsibleSection,
      {
        id: "achievements",
        title: t("home.section.achievements"),
        icon: Medal,
        badge: `${unlockedAch}/${ach.length}`,
        defaultOpen: false,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setShowAchievements(true),
              style: {
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: `linear-gradient(135deg, ${INK_2}, ${OLIVE_DARK})`,
                border: `1px solid ${KHAKI}44`,
                borderRadius: 12,
                padding: 14,
                cursor: "pointer",
                textAlign: "left"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: `${KHAKI}22`,
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { size: 18, color: KHAKI })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "o40-mono",
                      style: { color: KHAKI, fontSize: 11, letterSpacing: "0.06em" },
                      children: [
                        "ACHIEVEMENTS • ",
                        unlockedAch,
                        "/",
                        ach.length
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 13, fontWeight: 600 }, children: unlockedAch === ach.length ? "Tutte sbloccate!" : `${ach.length - unlockedAch} mancanti — tocca per vedere` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 4, marginTop: 6 }, children: [
                    ach.slice(0, 4).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 14, opacity: a.unlocked ? 1 : 0.4 }, children: a.icon }, a.id)),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: STEEL, fontSize: 11, marginLeft: 6 }, children: [
                      "+",
                      ach.length - 4,
                      " altri"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18, color: KHAKI })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }, children: getNextAchievements(sessions, 3).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              style: {
                background: `${a.color}22`,
                border: `1px solid ${a.color}55`,
                color: PAPER,
                fontSize: 10,
                padding: "2px 7px",
                borderRadius: 20
              },
              children: [
                a.icon,
                " ",
                a.title.it,
                " ",
                Math.round(a.progress * 100),
                "%"
              ]
            },
            a.id
          )) }),
          showAchievements && /* @__PURE__ */ jsxRuntimeExports.jsx(AchievementsModal, { sessions, onClose: () => setShowAchievements(false) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CollapsibleSection,
      {
        id: "misurazioni",
        title: t("home.section.measurements"),
        icon: Ruler,
        badge: waist || weight ? `${waist ? waist.cm + "cm" : ""}${waist && weight ? " · " : ""}${weight ? weight.kg + "kg" : ""}` : "—",
        defaultOpen: false,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`,
                border: `1px solid ${OLIVE}`,
                borderRadius: 12,
                padding: "11px 13px",
                display: "flex",
                alignItems: "center",
                gap: 11
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: `${BLAZE}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ruler, { size: 16, color: BLAZE })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: [
                    t("home.waist.title"),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontWeight: 400 }, children: t("home.waist.sub") })
                  ] }),
                  waist ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: KHAKI, fontSize: 11.5, marginTop: 1 }, children: [
                    t("home.waist.last", { v: waist.cm }),
                    waistDelta != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        style: {
                          color: waistDelta <= 0 ? "#7FB069" : BLAZE,
                          marginLeft: 6,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 3
                        },
                        children: [
                          waistDelta <= 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 12 }),
                          waistDelta > 0 ? "+" : "",
                          t("home.waist.delta", { v: waistDelta })
                        ]
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 1 }, children: t("home.waist.empty") })
                ] }),
                waist && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "o40-mono",
                    style: {
                      color: waistDelta != null && waistDelta <= 0 ? "#7FB069" : KHAKI,
                      fontSize: 11
                    },
                    children: waistDelta != null && waistDelta <= 0 ? t("home.trendok") : t("home.start")
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`,
                border: `1px solid ${OLIVE}`,
                borderRadius: 12,
                padding: "11px 13px",
                display: "flex",
                alignItems: "center",
                gap: 11
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: `${KHAKI}1f`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { size: 16, color: KHAKI })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: PAPER, fontSize: 12.5, fontWeight: 600 }, children: [
                    t("home.weight.title"),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontWeight: 400 }, children: t("home.weight.sub") })
                  ] }),
                  weight ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: KHAKI, fontSize: 11.5, marginTop: 1 }, children: [
                    t("home.weight.last", { v: weight.kg }),
                    weightDelta != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        style: {
                          color: weightDelta <= 0 ? "#7FB069" : BLAZE,
                          marginLeft: 6,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 3
                        },
                        children: [
                          weightDelta <= 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 12 }),
                          weightDelta > 0 ? "+" : "",
                          t("home.weight.delta", { v: weightDelta.toFixed(1) })
                        ]
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 1 }, children: t("home.weight.empty") })
                ] }),
                weight && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "o40-mono",
                    style: {
                      color: weightDelta != null && weightDelta <= 0 ? "#7FB069" : KHAKI,
                      fontSize: 11
                    },
                    children: weightDelta != null && weightDelta <= 0 ? t("home.trendok") : t("home.start")
                  }
                )
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 12 } })
  ] });
}
export {
  HomeScreen as default
};
