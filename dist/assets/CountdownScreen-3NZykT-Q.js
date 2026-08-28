import { p as playBeep, j as jsxRuntimeExports, K as KHAKI, t as tr, B as BLAZE, S as STEEL } from "./index-BskgbwhP.js";
import { r as reactExports } from "./icons-DnFQGhVC.js";
import "./charts-BWCYe6zh.js";
function CountdownScreen({ program, onDone, lang, t }) {
  const [n, setN] = reactExports.useState(3);
  reactExports.useEffect(() => {
    if (n <= 0) {
      onDone();
      return;
    }
    playBeep(n === 1 ? 880 : 550, 0.15);
    const t2 = setTimeout(() => setN((v) => v - 1), 800);
    return () => clearTimeout(t2);
  }, [n]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-mono", style: { color: KHAKI, fontSize: 13, letterSpacing: "0.15em" }, children: tr(program.name, lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "o40-display", style: { color: BLAZE, fontSize: 110, lineHeight: 1 }, children: n > 0 ? n : t("countdown.go") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: STEEL, fontSize: 13 }, children: t("countdown.getReady") })
      ]
    }
  );
}
export {
  CountdownScreen as default
};
