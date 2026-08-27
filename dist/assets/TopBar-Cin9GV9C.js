import { u as useT, j as jsxRuntimeExports, R as btnIcon, P as PAPER } from "./index-BgW1cw35.js";
import { m as ChevronLeft } from "./icons-BHJLJdva.js";
function TopBar({ title, onBack, right }) {
  const { t } = useT();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "o40-topbar-glass", style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "max(14px, env(safe-area-inset-top, 0px)) 16px",
    position: "sticky",
    top: 0,
    zIndex: 5
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 32 }, children: onBack && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onBack, "aria-label": t("app.back"), style: btnIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 20, color: PAPER }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: PAPER, fontSize: 22 }, children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { minWidth: 32, display: "flex", justifyContent: "flex-end" }, children: right })
  ] });
}
export {
  TopBar as T
};
