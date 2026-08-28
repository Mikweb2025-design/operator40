import { j as jsxRuntimeExports, B as BLAZE, O as OLIVE, b as INK_2, K as KHAKI, P as PAPER, S as STEEL, u as useT, af as hrZone, I as INK, t as tr, W as WEEKLY_GOAL, ag as RPE_LABELS, ah as RPE_COLORS, i as inputStyle, a as OLIVE_DARK, $ as primaryBtn } from "./index-Oq15i2wE.js";
import { O as ShieldCheck, F as Flame, Z as Zap, r as reactExports, T as Trophy, Q as Gauge, z as Ruler, J as Scale, t as HeartPulse, C as Check } from "./icons-CiBW7QCm.js";
import { D as DogTag } from "./DogTag-DhOrlvLj.js";
import "./charts-Dc_aK1Sx.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "o40-card-glass",
      style: { borderRadius: 14, padding: 14, display: "flex", gap: 12, alignItems: "center" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: `conic-gradient(${BLAZE} ${pct * 360}deg, ${OLIVE} 0deg)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: INK_2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${OLIVE}`
                },
                children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 20, color: BLAZE }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 20, color: KHAKI })
              }
            )
          }
        ),
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                color: STEEL,
                fontSize: 10,
                display: "flex",
                alignItems: "center",
                gap: 4,
                justifyContent: "flex-end"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 10 }),
                " Lun-Dom"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function SummaryScreen({
  stats,
  aiQuality,
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
  onSave
}) {
  var _a;
  const { lang, t } = useT();
  const zone = hrInput ? hrZone(parseInt(hrInput, 10), profile.age, lang) : null;
  const [shareState, setShareState] = reactExports.useState("idle");
  async function handleShare() {
    const text = t("sum.share", {
      name: tr(stats.program.name, lang),
      min: Math.round(stats.durationSec / 60),
      kcal: stats.kcal
    });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "o40-screen-in",
      style: { flex: 1, display: "flex", flexDirection: "column", position: "relative" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }, children: ["#C1440E", "#B8AE8C", "#7FB069", "#EDE8D8", "#D9B34C"].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "o40-confetti",
            style: {
              background: c,
              left: `${8 + i * 18}%`,
              animationDuration: `${2.6 + i % 3 * 0.7}s`,
              animationDelay: `${i * 0.35}s`,
              opacity: 0.85
            }
          },
          i
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-scroll", style: { flex: 1, overflowY: "auto", padding: 20 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "o40-pop o40-spin-border",
              style: { textAlign: "center", marginTop: 10, borderRadius: 20, padding: "22px 16px 18px" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", display: "inline-block" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        position: "absolute",
                        inset: -12,
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${BLAZE}3d 0%, transparent 70%)`,
                        animation: "ringPulse 1.8s ease-out infinite"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        position: "relative",
                        display: "inline-flex",
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(160deg, ${INK_2}, ${INK})`,
                        border: `1px solid ${BLAZE}66`,
                        boxShadow: `0 0 24px ${BLAZE}44, inset 0 0 16px ${BLAZE}22`
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Trophy,
                        {
                          size: 40,
                          color: BLAZE,
                          style: { filter: `drop-shadow(0 0 8px ${BLAZE})`, marginTop: -3 }
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "o40-display o40-num-glow",
                    style: { fontSize: 32, marginTop: 12, lineHeight: 1 },
                    children: t("sum.title")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 14, marginTop: 2 }, children: tr(stats.program.name, lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: handleShare,
                    style: {
                      marginTop: 12,
                      background: "transparent",
                      border: `1px solid ${KHAKI}`,
                      borderRadius: 20,
                      padding: "6px 14px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 11 }, children: shareState === "copied" ? t("sum.copied") : t("sum.sharebtn") })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, margin: "20px 0" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag, { label: t("dt.duration"), value: `${Math.round(stats.durationSec / 60)}′` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag, { label: t("dt.kcal"), value: stats.kcal })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyChallenge, { sessions, weeklyGoal: profile.weeklyGoal || WEEKLY_GOAL }),
          aiQuality && aiQuality.overall != null && ((_a = aiQuality.exercises) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "o40-pop",
              style: {
                background: INK_2,
                border: `1px solid ${OLIVE}`,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Gauge,
                    {
                      size: 18,
                      color: aiQuality.overall > 70 ? "#7FB069" : aiQuality.overall > 50 ? "#D4A017" : BLAZE
                    }
                  ),
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
                      children: t("sum.quality.title")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "baseline",
                        gap: 2
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "o40-display",
                            style: {
                              color: aiQuality.overall > 70 ? "#7FB069" : aiQuality.overall > 50 ? "#D4A017" : BLAZE,
                              fontSize: 26,
                              lineHeight: 1
                            },
                            children: aiQuality.overall
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: STEEL, fontSize: 9 }, children: "/100" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12, marginBottom: 10, lineHeight: 1.4 }, children: t("sum.quality.body") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: aiQuality.exercises.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "o40-mono",
                    style: {
                      color: PAPER,
                      fontSize: 10,
                      background: INK,
                      border: `1px solid ${e.quality > 70 ? "#7FB069" : e.quality > 50 ? "#D4A017" : OLIVE}`,
                      borderRadius: 6,
                      padding: "3px 8px"
                    },
                    children: t("sum.quality.per", { name: e.name, q: e.quality })
                  },
                  e.name
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: INK_2,
                border: `1px solid ${OLIVE}`,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12
              },
              children: [
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
                    children: t("sum.rpe.title")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, marginTop: 10 }, children: RPE_LABELS.map((lbl, i) => {
                  const val = i + 1;
                  const on = rpe === val;
                  const c = RPE_COLORS[i];
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => setRpe(on ? null : val),
                      style: {
                        flex: 1,
                        padding: "10px 2px",
                        borderRadius: 8,
                        cursor: "pointer",
                        textAlign: "center",
                        background: on ? c : INK,
                        border: `1px solid ${on ? c : OLIVE}`,
                        transition: "background 0.15s ease, border-color 0.15s ease, transform 0.1s ease"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 18 }, children: val }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: on ? PAPER : STEEL, fontSize: 8.5 }, children: tr(lbl, lang) })
                      ]
                    },
                    val
                  );
                }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: INK_2,
                border: `1px solid ${OLIVE}`,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12
              },
              children: [
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
                    children: t("sum.notes.title")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    value: notes,
                    onChange: (e) => setNotes(e.target.value.slice(0, 200)),
                    placeholder: t("sum.notes.ph"),
                    rows: 2,
                    className: "o40-input",
                    style: {
                      ...inputStyle,
                      marginTop: 10,
                      resize: "none",
                      fontFamily: "Inter, sans-serif"
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
                background: INK_2,
                border: `1px solid ${OLIVE}`,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Ruler, { size: 18, color: BLAZE }),
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
                      children: t("sum.waist.title")
                    }
                  )
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
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: INK_2,
                border: `1px solid ${OLIVE}`,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { size: 18, color: BLAZE }),
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
                      children: t("sum.weight.title")
                    }
                  )
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
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: INK_2,
                border: `1px solid ${OLIVE}`,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { size: 18, color: BLAZE }),
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
                      children: t("sum.hr.title")
                    }
                  ),
                  !hrInput && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "o40-blink",
                      style: {
                        marginLeft: "auto",
                        background: `${BLAZE}22`,
                        border: `1px solid ${BLAZE}`,
                        color: BLAZE,
                        fontSize: 10,
                        letterSpacing: "0.06em",
                        borderRadius: 6,
                        padding: "2px 7px"
                      },
                      children: t("sum.hr.remind")
                    }
                  )
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
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "12px 20px 20px", borderTop: `1px solid ${OLIVE_DARK}` }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onSave, className: "o40-cta", style: primaryBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 18 }),
          " ",
          t("sum.save")
        ] }) })
      ]
    }
  );
}
export {
  SummaryScreen as default
};
