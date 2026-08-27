import { j as jsxRuntimeExports, O as OLIVE, b as INK_2, I as INK, K as KHAKI, P as PAPER, S as STEEL } from "./index-BCD1AlRp.js";
import "./icons-BHJLJdva.js";
function DogTag({ label, value, sub }) {
  const numeric = typeof value === "number";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "o40-card",
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
          "div",
          {
            style: {
              position: "absolute",
              top: 9,
              left: -5,
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
            style: { color: KHAKI, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" },
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 26, lineHeight: 1.1 }, children: numeric ? value : value }),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 11 }, children: sub })
      ]
    }
  );
}
export {
  DogTag as D
};
