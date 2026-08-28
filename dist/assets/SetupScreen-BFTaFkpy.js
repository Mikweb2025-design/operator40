import { u as useT, g as getLevel, j as jsxRuntimeExports, L as LANGS, B as BLAZE, K as KHAKI, O as OLIVE, a as OLIVE_DARK, I as INK, b as INK_2, S as STEEL, i as inputStyle, T as TRACKS, P as PAPER, c as INTERVAL_PRESETS, d as LEVELS, t as tr, s as secondaryBtn, e as primaryBtnLarge, f as BLAZE_DEEP, h as isStandalonePWA } from "./index-8atOh5Yh.js";
import { V as Volume2, h as VolumeX, i as Vibrate, j as SkipForward, M as Music, S as Sparkles, A as Activity, k as Music2, l as HeadphoneOff, m as ChevronLeft, f as RefreshCw, n as Crown, o as Medal, D as Download, U as Upload, p as Bell, q as BellOff, s as Send, t as HeartPulse, b as ChevronRight } from "./icons-CiBW7QCm.js";
import { T as TopBar } from "./TopBar-Cl7rsqKD.js";
import "./charts-Dc_aK1Sx.js";
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
                )
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }, children: lang === "it" ? "Esporta tutti i dati (profilo, sessioni, misure, foto) in un file JSON. Ripristina su altro device o dopo reset." : "Export all data (profile, sessions, measures, photos) to JSON. Restore on another device." }),
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
