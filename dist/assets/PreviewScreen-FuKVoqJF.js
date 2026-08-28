const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./media-Cx-PcBXv.js","./clips-CZetA5iC.js"])))=>i.map(i=>d[i]);
import { u as useT, X as levelPreset, Y as estimateProgramKcal, Z as totalSeqSeconds, j as jsxRuntimeExports, P as PAPER, t as tr, K as KHAKI, B as BLAZE, U as EXERCISE_GROUPS, O as OLIVE, b as INK_2, I as INK, J as EXERCISES, S as STEEL, a0 as getReps, a1 as HOLD_EXERCISES, V as speak, R as btnIcon, a as OLIVE_DARK, $ as primaryBtn, _ as __vitePreload } from "./index-CrZqQB3M.js";
import { r as reactExports, W as Wind, f as RefreshCw, J as Play } from "./icons-DnFQGhVC.js";
import { h as hasClip } from "./clips-CZetA5iC.js";
import { E as ExerciseFigure } from "./ExerciseFigure-Byx1eVtx.js";
import { T as TopBar } from "./TopBar-CJo8wyth.js";
import { D as DogTag } from "./DogTag-DiqNRA7J.js";
import "./charts-BWCYe6zh.js";
let _mediaPromise = null;
function getMediaMap() {
  if (!_mediaPromise)
    _mediaPromise = __vitePreload(() => import("./media-Cx-PcBXv.js"), true ? __vite__mapDeps([0,1]) : void 0, import.meta.url).then((m) => ({ b64: m.VIDEO_B64, files: m.VIDEO_FILES }));
  return _mediaPromise;
}
function ExerciseMedia({ exerciseId, pose, color = BLAZE, size = "100%", rounded = 10 }) {
  const [src, setSrc] = reactExports.useState(null);
  const [videoSrc, setVideoSrc] = reactExports.useState(null);
  const [failed, setFailed] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let c = false;
    setSrc(null);
    setVideoSrc(null);
    setFailed(false);
    getMediaMap().then(({ b64, files }) => {
      if (c) return;
      const clip = files[exerciseId] || files[pose] || null;
      setVideoSrc(clip);
      if (!clip) setSrc(b64[exerciseId] || b64[pose] || null);
    }).catch(() => {
      if (!c) setFailed(true);
    });
    return () => {
      c = true;
    };
  }, [exerciseId]);
  if (videoSrc && !failed)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        src: videoSrc,
        autoPlay: true,
        muted: true,
        loop: true,
        playsInline: true,
        preload: "metadata",
        onError: () => setFailed(true),
        style: {
          width: size,
          height: size,
          objectFit: "cover",
          borderRadius: rounded,
          display: "block",
          background: INK
        }
      }
    );
  if (src && !failed)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src,
        alt: "",
        onError: () => setFailed(true),
        style: {
          width: size,
          height: size,
          objectFit: "cover",
          borderRadius: rounded,
          display: "block",
          background: INK
        }
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseFigure, { pose, color, size });
}
function groupOf(id) {
  return EXERCISE_GROUPS.standing.includes(id) ? "standing" : "ground";
}
function PreviewScreen({ program, profile, soundOn, onBack, onStart }) {
  const { lang, t } = useT();
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [subs, setSubs] = reactExports.useState({});
  const [swapOpenId, setSwapOpenId] = reactExports.useState(null);
  const effectiveExercises = program.exercises.map((id) => subs[id] || id);
  const effectiveProgram = { ...program, exercises: effectiveExercises };
  const preset = levelPreset(profile);
  const mode = profile && profile.executionMode || "time";
  const levelKey = profile && profile.level || "combattente";
  const kcal = Math.round(
    estimateProgramKcal(
      effectiveProgram,
      profile.weight,
      !!profile.skipWarmup,
      preset.work,
      preset.rest,
      mode,
      levelKey
    )
  );
  const mins = Math.round(
    totalSeqSeconds(
      effectiveProgram,
      !!profile.skipWarmup,
      preset.work,
      preset.rest,
      mode,
      levelKey
    ) / 60
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-screen-in", style: { flex: 1, display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopBar, { title: t("prev.title", { id: program.id }), onBack }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-scroll", style: { flex: 1, overflowY: "auto", padding: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 26 }, children: tr(program.name, lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 14, marginBottom: 14 }, children: tr(program.tagline, lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 18 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag, { label: t("dt.duration"), value: `${mins}′` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag, { label: t("dt.estkcal"), value: kcal }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DogTag, { label: t("dt.rounds"), value: program.rounds })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "o40-mono",
          style: {
            color: KHAKI,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            margin: "4px 0 10px"
          },
          children: t("prev.sub", {
            n: program.exercises.length,
            r: program.rounds,
            p: mode === "reps" ? lang === "it" ? "Ripetizioni" : lang === "de" ? "Wiederholungen" : "Reps" : tr(preset.label, lang)
          })
        }
      ),
      mode === "reps" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            color: BLAZE,
            fontSize: 11,
            marginBottom: 8,
            background: `${BLAZE}14`,
            border: `1px solid ${BLAZE}44`,
            borderRadius: 8,
            padding: "6px 10px",
            textAlign: "center"
          },
          children: lang === "it" ? "Modalità ripetizioni: tocca FATTO quando hai finito ogni esercizio. Hold resta a tempo." : "Reps mode: tap DONE when finished each exercise. Holds stay timed."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: program.exercises.map((originalId, i) => {
        const currentId = subs[originalId] || originalId;
        const ex = EXERCISES[currentId];
        const isOpen = selectedId === originalId;
        const isSwapping = swapOpenId === originalId;
        const isSubbed = !!subs[originalId];
        const usedElsewhere = effectiveExercises.filter(
          (_, idx) => program.exercises[idx] !== originalId
        );
        const alternatives = EXERCISE_GROUPS[groupOf(originalId)].filter(
          (aid) => aid !== currentId && !usedElsewhere.includes(aid)
        );
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 12,
              background: INK_2,
              border: `1px solid ${isOpen ? BLAZE : OLIVE}`,
              borderRadius: 10,
              padding: 12
            },
            children: [
              isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "o40-expand",
                  style: {
                    width: "100%",
                    aspectRatio: hasClip(currentId, ex.pose) ? "9 / 16" : "1 / 1",
                    maxHeight: hasClip(currentId, ex.pose) ? 320 : 260,
                    background: INK,
                    borderRadius: 10,
                    border: `1px solid ${OLIVE}`,
                    overflow: "hidden"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ExerciseMedia,
                    {
                      exerciseId: currentId,
                      pose: ex.pose,
                      color: BLAZE,
                      rounded: 10
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 12 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => {
                      const opening = !isOpen;
                      setSelectedId(opening ? originalId : null);
                      if (opening && soundOn) speak(tr(ex.name, lang));
                    },
                    style: {
                      display: "flex",
                      gap: 12,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: 0,
                      flex: 1,
                      minWidth: 0
                    },
                    children: [
                      !isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            width: 52,
                            height: 52,
                            flexShrink: 0,
                            background: INK,
                            borderRadius: 8,
                            border: `1px solid ${OLIVE}`,
                            overflow: "hidden"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ExerciseMedia,
                            {
                              exerciseId: currentId,
                              pose: ex.pose,
                              color: BLAZE,
                              rounded: 8
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              display: "flex",
                              alignItems: "baseline",
                              gap: 6,
                              flexWrap: "wrap"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: STEEL, fontSize: 11 }, children: [
                                i + 1,
                                "."
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: PAPER, fontWeight: 700, fontSize: 14.5 }, children: tr(ex.name, lang) }),
                              isSubbed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "o40-mono",
                                  style: {
                                    color: KHAKI,
                                    fontSize: 9,
                                    border: `1px solid ${OLIVE}`,
                                    borderRadius: 4,
                                    padding: "1px 4px"
                                  },
                                  children: t("prev.swapped")
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              color: KHAKI,
                              fontSize: 12,
                              display: "flex",
                              gap: 6,
                              alignItems: "center",
                              flexWrap: "wrap"
                            },
                            children: [
                              (() => {
                                const reps = mode === "reps" ? getReps(currentId, levelKey) : null;
                                return reps ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "span",
                                  {
                                    style: {
                                      background: `${BLAZE}22`,
                                      border: `1px solid ${BLAZE}55`,
                                      color: BLAZE,
                                      padding: "1px 6px",
                                      borderRadius: 6,
                                      fontWeight: 700
                                    },
                                    children: [
                                      "×",
                                      reps
                                    ]
                                  }
                                ) : null;
                              })(),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tr(ex.repGuide, lang) }),
                              mode === "reps" && !HOLD_EXERCISES.has(currentId) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: STEEL, fontSize: 10 }, children: [
                                "· ",
                                lang === "it" ? "tocca FATTO" : "tap DONE"
                              ] })
                            ]
                          }
                        ),
                        isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              display: "flex",
                              flexDirection: "column",
                              gap: 3,
                              marginTop: 5,
                              textAlign: "left"
                            },
                            children: ex.steps.map((s, k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                style: { display: "flex", gap: 6, alignItems: "flex-start" },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "span",
                                    {
                                      className: "o40-mono",
                                      style: { color: KHAKI, fontSize: 10, minWidth: 13 },
                                      children: [
                                        k + 1,
                                        "."
                                      ]
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 11.5, lineHeight: 1.4 }, children: tr(s, lang) })
                                ]
                              },
                              k
                            ))
                          }
                        ),
                        isOpen && ex.breath && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              display: "flex",
                              gap: 6,
                              alignItems: "center",
                              marginTop: 6,
                              color: OLIVE
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { size: 12, style: { flexShrink: 0 } }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, fontStyle: "italic", lineHeight: 1.4 }, children: tr(ex.breath, lang) })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              color: STEEL,
                              fontSize: 11.5,
                              marginTop: 3,
                              lineHeight: 1.4,
                              fontStyle: "italic"
                            },
                            children: tr(ex.tip40, lang)
                          }
                        )
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setSwapOpenId(isSwapping ? null : originalId),
                    style: { ...btnIcon, flexShrink: 0, alignSelf: "flex-start" },
                    "aria-label": t("prev.swap"),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 16, color: isSwapping ? BLAZE : STEEL })
                  }
                )
              ] }),
              isSwapping && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    paddingTop: 4,
                    borderTop: `1px solid ${OLIVE_DARK}`
                  },
                  children: [
                    isSubbed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => {
                          setSubs((s) => {
                            const n = { ...s };
                            delete n[originalId];
                            return n;
                          });
                          setSwapOpenId(null);
                        },
                        style: {
                          padding: "6px 10px",
                          borderRadius: 20,
                          background: "transparent",
                          border: `1px solid ${KHAKI}`,
                          cursor: "pointer"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: KHAKI, fontSize: 10.5 }, children: t("prev.restore", { name: tr(EXERCISES[originalId].name, lang) }) })
                      }
                    ),
                    alternatives.map((aid) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => {
                          setSubs((s) => ({ ...s, [originalId]: aid }));
                          setSwapOpenId(null);
                        },
                        style: {
                          padding: "6px 10px",
                          borderRadius: 20,
                          background: INK,
                          border: `1px solid ${OLIVE}`,
                          cursor: "pointer"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-mono", style: { color: PAPER, fontSize: 10.5 }, children: tr(EXERCISES[aid].name, lang) })
                      },
                      aid
                    ))
                  ]
                }
              )
            ]
          },
          originalId
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: 16, borderTop: `1px solid ${OLIVE_DARK}` }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => onStart(effectiveProgram),
        className: "o40-pulsebtn o40-cta",
        style: { ...primaryBtn, borderRadius: 14 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 18 }),
          " ",
          t("prev.go")
        ]
      }
    ) })
  ] });
}
export {
  PreviewScreen as default
};
