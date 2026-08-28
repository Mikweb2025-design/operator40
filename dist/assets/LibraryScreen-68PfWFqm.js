const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./media-Cx-PcBXv.js","./clips-CZetA5iC.js"])))=>i.map(i=>d[i]);
import { u as useT, J as EXERCISES, U as EXERCISE_GROUPS, t as tr, j as jsxRuntimeExports, P as PAPER, K as KHAKI, S as STEEL, B as BLAZE, O as OLIVE, m as PROGRAMS, l as getConsistencyScore, C as getStreakRisk, b as INK_2, I as INK, V as speak, _ as __vitePreload } from "./index-F2ITDERy.js";
import { r as reactExports, X, v as Star, S as Sparkles, W as Wind } from "./icons-BHJLJdva.js";
import { E as ExerciseFigure } from "./ExerciseFigure-CudWhZU7.js";
import { h as hasClip } from "./clips-CZetA5iC.js";
import "./charts-DKCmdoT_.js";
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
function LibraryScreen({ sessions, profile }) {
  const { lang, t } = useT();
  const [filter, setFilter] = reactExports.useState("all");
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [query, setQuery] = reactExports.useState("");
  const [showFavs, setShowFavs] = reactExports.useState(false);
  const [favs, setFavs] = reactExports.useState(() => loadFavorites());
  const visibleIds = Object.keys(EXERCISES).filter((id) => {
    const ex = EXERCISES[id];
    const byGroup = filter === "all" ? true : EXERCISE_GROUPS[filter].includes(id);
    const byFav = showFavs ? favs.includes(id) : true;
    const q = query.trim().toLowerCase();
    const byQuery = !q || tr(ex.name, lang).toLowerCase().includes(q) || id.toLowerCase().includes(q) || tr(ex.cue, lang).toLowerCase().includes(q);
    return byGroup && byFav && byQuery;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-screen-in", style: { flex: 1, display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "16px 16px 4px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 26 }, children: t("lib.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 13 }, children: t("lib.sub") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "10px 16px 0" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-search-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: lang === "it" ? "Cerca esercizio…" : lang === "de" ? "Übung suchen…" : "Search exercise…",
          className: "o40-search"
        }
      ),
      query && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setQuery(""),
          style: {
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            color: STEEL,
            cursor: "pointer"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, padding: "12px 16px 4px", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setShowFavs((v) => !v),
          style: {
            padding: "6px 12px",
            borderRadius: 20,
            cursor: "pointer",
            background: showFavs ? BLAZE : "transparent",
            border: `1px solid ${showFavs ? BLAZE : OLIVE}`,
            display: "flex",
            alignItems: "center",
            gap: 4
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 12, color: showFavs ? PAPER : KHAKI, fill: showFavs ? PAPER : "none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: showFavs ? PAPER : STEEL, fontSize: 11 }, children: [
              showFavs ? "★" : "☆",
              " ",
              favs.length || ""
            ] })
          ]
        }
      ),
      [
        ["all", t("lib.all")],
        ["standing", t("lib.standing")],
        ["ground", t("lib.ground")],
        ["core", t("lib.core")]
      ].map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setFilter(key),
          style: {
            padding: "6px 12px",
            borderRadius: 20,
            cursor: "pointer",
            background: filter === key ? BLAZE : "transparent",
            border: `1px solid ${filter === key ? BLAZE : OLIVE}`
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "o40-mono",
              style: { color: filter === key ? PAPER : STEEL, fontSize: 11 },
              children: label
            }
          )
        },
        key
      ))
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
      if (!query && !showFavs && rec.length)
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "8px 16px 0" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "o40-mono",
              style: {
                color: KHAKI,
                fontSize: 10,
                letterSpacing: "0.06em",
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                gap: 4
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 10 }),
                " ",
                label,
                " ",
                cons ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: STEEL, marginLeft: 6 }, children: [
                  "· ",
                  cons,
                  "% aderenza"
                ] }) : null
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }, children: rec.map((rid) => {
            const ex = EXERCISES[rid];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setSelectedId(rid),
                style: {
                  minWidth: 110,
                  background: `linear-gradient(135deg, ${INK_2}, ${INK})`,
                  border: `1px solid ${favs.includes(rid) ? BLAZE : OLIVE}`,
                  borderRadius: 12,
                  padding: 10,
                  cursor: "pointer",
                  textAlign: "center",
                  boxShadow: favs.includes(rid) ? `0 0 0 1px ${BLAZE}22` : "none"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 44, height: 44, margin: "0 auto 6px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseFigure, { pose: ex.pose, color: favs.includes(rid) ? BLAZE : KHAKI }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 11, fontWeight: 700 }, children: tr(ex.name, lang) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: favs.includes(rid) ? BLAZE : STEEL, fontSize: 9 }, children: favs.includes(rid) ? "★ preferito" : "tap per aprire" })
                ]
              },
              `rec-${rid}`
            );
          }) })
        ] });
      return null;
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-scroll", style: { flex: 1, overflowY: "auto", padding: 16 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: visibleIds.map((id) => {
      const ex = EXERCISES[id];
      const isOpen = selectedId === id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "o40-card",
          onClick: () => {
            const opening = !isOpen;
            setSelectedId(opening ? id : null);
            if (opening) speak(tr(ex.name, lang));
          },
          style: {
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
          },
          children: [
            isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "o40-expand",
                style: {
                  width: "100%",
                  aspectRatio: hasClip(id, ex.pose) ? "9 / 16" : "1 / 1",
                  maxHeight: hasClip(id, ex.pose) ? 320 : 260,
                  background: INK,
                  borderRadius: 10,
                  border: `1px solid ${OLIVE}`,
                  overflow: "hidden"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseMedia, { exerciseId: id, pose: ex.pose, color: BLAZE, rounded: 10 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 12 }, children: [
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
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseMedia, { exerciseId: id, pose: ex.pose, color: BLAZE, rounded: 8 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontWeight: 700, fontSize: 14.5, flex: 1 }, children: tr(ex.name, lang) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        const next = toggleFavorite(favs, id);
                        setFavs(next);
                      },
                      className: "o40-fav",
                      style: {
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: 4
                      },
                      "aria-label": "favorite",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Star,
                        {
                          size: 16,
                          color: favs.includes(id) ? BLAZE : STEEL,
                          fill: favs.includes(id) ? BLAZE : "none"
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: KHAKI, fontSize: 12 }, children: tr(ex.repGuide, lang) }),
                isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        marginTop: 5,
                        textAlign: "left"
                      },
                      children: ex.steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                                  i + 1,
                                  "."
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: STEEL, fontSize: 11.5, lineHeight: 1.4 }, children: tr(s, lang) })
                          ]
                        },
                        i
                      ))
                    }
                  ),
                  ex.breath && /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                        marginTop: 6,
                        lineHeight: 1.4,
                        fontStyle: "italic"
                      },
                      children: tr(ex.tip40, lang)
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11.5, marginTop: 3, lineHeight: 1.4 }, children: tr(ex.cue, lang) })
              ] })
            ] })
          ]
        },
        id
      );
    }) }) })
  ] });
}
export {
  LibraryScreen as default
};
