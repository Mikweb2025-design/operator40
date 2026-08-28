import { u as useT, X as levelPreset, Y as estimateProgramKcal, Z as totalSeqSeconds, J as EXERCISES, U as EXERCISE_GROUPS, j as jsxRuntimeExports, i as inputStyle, K as KHAKI, B as BLAZE, O as OLIVE, b as INK_2, P as PAPER, S as STEEL, a as OLIVE_DARK, t as tr, $ as primaryBtn } from "./index-CcZwyDlr.js";
import { r as reactExports, X, C as Check } from "./icons-DnFQGhVC.js";
import { T as TopBar } from "./TopBar-BYltBE-N.js";
import { E as ExerciseFigure } from "./ExerciseFigure-DAW2EuJU.js";
import "./charts-BWCYe6zh.js";
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
function BuilderScreen({ profile, initial, onCancel, onCreate, onUpdate }) {
  const { lang, t } = useT();
  const [selected, setSelected] = reactExports.useState(initial ? initial.exercises : []);
  const [rounds, setRounds] = reactExports.useState(initial ? initial.rounds : 2);
  const [name, setName] = reactExports.useState(initial ? initial.name : "");
  const [filter, setFilter] = reactExports.useState("all");
  function toggleEx(id) {
    setSelected(
      (s) => s.includes(id) ? s.filter((x) => x !== id) : s.length < 10 ? [...s, id] : s
    );
  }
  const isEdit = !!initial;
  const canCreate = selected.length >= 3;
  const draft = {
    id: initial ? initial.id : `custom-${Date.now()}`,
    name: name.trim() || t("bld.draft.name"),
    tagline: t("bld.draft.tagline"),
    rounds,
    exercises: selected
  };
  const preset = levelPreset(profile);
  const kcal = canCreate ? Math.round(
    estimateProgramKcal(draft, profile.weight, !!profile.skipWarmup, preset.work, preset.rest)
  ) : 0;
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
          style: inputStyle
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 16 }, children: [
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
            children: t("bld.rounds")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8 }, children: [1, 2, 3].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setRounds(r),
            style: {
              flex: 1,
              padding: "10px 0",
              borderRadius: 10,
              cursor: "pointer",
              textAlign: "center",
              background: rounds === r ? BLAZE : INK_2,
              border: `1px solid ${rounds === r ? BLAZE : OLIVE}`
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "o40-display", style: { color: PAPER, fontSize: 18 }, children: r })
          },
          r
        )) })
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
            margin: "18px 0 8px"
          },
          children: t("bld.exercises", { sel: selected.length })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8, marginBottom: 10 }, children: [
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
      )) }),
      selected.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            marginBottom: 12,
            background: INK_2,
            border: `1px solid ${BLAZE}`,
            borderRadius: 10,
            padding: 10
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "o40-mono",
                style: { color: KHAKI, fontSize: 10, letterSpacing: "0.06em", marginBottom: 6 },
                children: "Ordine selezionati · trascina su/giù"
              }
            ),
            selected.map((sid, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 0",
                  borderBottom: idx < selected.length - 1 ? `1px solid ${OLIVE_DARK}` : "none"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "o40-mono", style: { color: STEEL, fontSize: 10 }, children: [
                    idx + 1,
                    "."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { flex: 1, color: PAPER, fontSize: 12 }, children: EXERCISES[sid] ? EXERCISES[sid].name.it : sid }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      disabled: idx === 0,
                      onClick: () => setSelected((s) => {
                        const a = [...s];
                        [a[idx - 1], a[idx]] = [a[idx], a[idx - 1]];
                        return a;
                      }),
                      style: {
                        background: "transparent",
                        border: `1px solid ${OLIVE}`,
                        borderRadius: 6,
                        padding: "2px 6px",
                        color: PAPER,
                        opacity: idx === 0 ? 0.3 : 1,
                        cursor: idx === 0 ? "default" : "pointer"
                      },
                      children: "↑"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      disabled: idx === selected.length - 1,
                      onClick: () => setSelected((s) => {
                        const a = [...s];
                        [a[idx], a[idx + 1]] = [a[idx + 1], a[idx]];
                        return a;
                      }),
                      style: {
                        background: "transparent",
                        border: `1px solid ${OLIVE}`,
                        borderRadius: 6,
                        padding: "2px 6px",
                        color: PAPER,
                        opacity: idx === selected.length - 1 ? 0.3 : 1,
                        cursor: idx === selected.length - 1 ? "default" : "pointer"
                      },
                      children: "↓"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => setSelected((s) => s.filter((x) => x !== sid)),
                      style: {
                        background: "transparent",
                        border: "none",
                        color: STEEL,
                        cursor: "pointer",
                        padding: 4
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 })
                    }
                  )
                ]
              },
              sid
            ))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: visibleIds.map((id) => {
        const ex = EXERCISES[id];
        const on = selected.includes(id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => toggleEx(id),
            style: {
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: on ? OLIVE_DARK : INK_2,
              border: `1px solid ${on ? BLAZE : OLIVE}`,
              borderRadius: 10,
              padding: 10,
              cursor: "pointer",
              textAlign: "left"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 36, height: 36, flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseFigure, { pose: ex.pose, color: on ? BLAZE : STEEL }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: PAPER, fontSize: 13.5, fontWeight: 600 }, children: tr(ex.name, lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11 }, children: tr(ex.repGuide, lang) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    border: `1px solid ${on ? BLAZE : OLIVE}`,
                    background: on ? BLAZE : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  },
                  children: on && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 13, color: PAPER })
                }
              )
            ]
          },
          id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: 16, borderTop: `1px solid ${OLIVE_DARK}` }, children: canCreate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            gap: 14,
            marginBottom: 10,
            color: STEEL,
            fontSize: 12.5,
            justifyContent: "center"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("bld.min", { m: mins }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("bld.kcal", { k: kcal }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => isEdit ? onUpdate(draft) : onCreate(draft), style: primaryBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 18 }),
        " ",
        isEdit ? "AGGIORNA" : t("bld.create.go")
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 13, textAlign: "center" }, children: t("bld.hint") }) })
  ] });
}
export {
  BuilderScreen as default
};
