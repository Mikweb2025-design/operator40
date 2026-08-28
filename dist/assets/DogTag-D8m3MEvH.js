import { j as jsxRuntimeExports, O as OLIVE, b as INK_2, I as INK, B as BLAZE, K as KHAKI, S as STEEL } from "./index-Cx06DqRp.js";
import "./icons-DnFQGhVC.js";
function DogTag({ label, value, sub, accent = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "o40-card o40-card-face",
      style: {
        background: `linear-gradient(160deg, ${INK_2}, ${INK})`,
        border: `1px solid ${OLIVE}`,
        borderRadius: 14,
        padding: "12px 13px",
        position: "relative",
        flex: 1,
        minWidth: 0,
        boxShadow: "0 4px 14px rgba(0,0,0,0.35)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "o40-card-accent",
            style: { background: accent ? BLAZE : KHAKI, opacity: accent ? 1 : 0.55 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 9,
              left: 8,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: INK,
              border: `2px solid ${KHAKI}`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "o40-mono",
            style: { color: accent ? BLAZE : KHAKI, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" },
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `o40-display ${accent ? "o40-num-glow on" : "o40-num-glow"}`,
            style: { fontSize: 26, lineHeight: 1.1 },
            children: value
          }
        ),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11 }, children: sub })
      ]
    }
  );
}
export {
  DogTag as D
};
