import { B as BLAZE, j as jsxRuntimeExports, K as KHAKI } from "./index-DnzZm8wt.js";
import "./icons-Cu976FrU.js";
const limb = { stroke: "currentColor", strokeWidth: 7, strokeLinecap: "round" };
const body = { stroke: "currentColor", strokeWidth: 16, strokeLinecap: "round" };
const floorLine = (x1, y, x2) => /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1, y1: y, x2, y2: y, stroke: KHAKI, strokeWidth: "2", opacity: "0.4" });
const dot = (cx, cy, r = 4) => /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx, cy, r, fill: "currentColor" });
const head = (cx, cy, r = 11) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "circle",
  {
    cx,
    cy,
    r,
    fill: "currentColor",
    fillOpacity: "0.3",
    stroke: "currentColor",
    strokeWidth: "5"
  }
);
const groundShadow = (cx, y) => /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx, cy: y, rx: "24", ry: "4", fill: KHAKI, opacity: "0.22" });
function ExerciseFigure({ pose, color = BLAZE, size = "100%" }) {
  const wrap = (viewBox, children) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox,
      width: size,
      height: size,
      className: `o40-figure pose-${pose}`,
      style: { color, overflow: "visible" },
      children
    }
  );
  switch (pose) {
    case "squat":
      return wrap(
        "0 0 100 140",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(8, 134, 92),
          groundShadow(50, 133),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(50, 20),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "torso", x1: "50", y1: "30", x2: "50", y2: "80", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armL", x1: "50", y1: "40", x2: "30", y2: "56", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armR", x1: "50", y1: "40", x2: "70", y2: "56", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { id: "legL", points: "50,80 33,101 33,123", fill: "none", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { id: "legR", points: "50,80 67,101 67,123", fill: "none", ...limb }),
            dot(50, 40, 4.5),
            dot(50, 80, 4.5),
            dot(30, 56),
            dot(70, 56),
            dot(33, 123),
            dot(67, 123)
          ] })
        ] })
      );
    case "lunge":
      return wrap(
        "0 0 100 140",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(8, 134, 92),
          groundShadow(52, 133),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(52, 20),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "torso", x1: "52", y1: "30", x2: "50", y2: "78", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armL", x1: "52", y1: "40", x2: "32", y2: "58", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armR", x1: "52", y1: "40", x2: "72", y2: "58", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { id: "legL", points: "50,78 38,102 44,130", fill: "none", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { id: "legR", points: "50,78 66,96 74,130", fill: "none", ...limb }),
            dot(52, 40, 4.5),
            dot(50, 78, 4.5),
            dot(32, 58),
            dot(72, 58),
            dot(44, 130),
            dot(74, 130)
          ] })
        ] })
      );
    case "jack":
      return wrap(
        "0 0 100 140",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(8, 134, 92),
          groundShadow(50, 133),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(50, 20),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "torso", x1: "50", y1: "30", x2: "50", y2: "82", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armL", x1: "50", y1: "40", x2: "28", y2: "62", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armR", x1: "50", y1: "40", x2: "72", y2: "62", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legL", x1: "50", y1: "82", x2: "34", y2: "125", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legR", x1: "50", y1: "82", x2: "66", y2: "125", ...limb }),
            dot(50, 40, 4.5),
            dot(50, 82, 4.5),
            dot(28, 62),
            dot(72, 62),
            dot(34, 125),
            dot(66, 125)
          ] })
        ] })
      );
    case "highknees":
      return wrap(
        "0 0 100 140",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(8, 134, 92),
          groundShadow(50, 133),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(50, 20),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "torso", x1: "50", y1: "30", x2: "50", y2: "82", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armL", x1: "50", y1: "40", x2: "28", y2: "62", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armR", x1: "50", y1: "40", x2: "72", y2: "62", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legL", x1: "50", y1: "82", x2: "34", y2: "125", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legR", x1: "50", y1: "82", x2: "66", y2: "125", ...limb }),
            dot(50, 40, 4.5),
            dot(50, 82, 4.5),
            dot(28, 62),
            dot(72, 62),
            dot(34, 125),
            dot(66, 125)
          ] })
        ] })
      );
    case "plank":
      return wrap(
        "0 0 160 100",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(10, 88, 150),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(136, 42, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "torso", x1: "128", y1: "45", x2: "58", y2: "52", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "124", y1: "47", x2: "120", y2: "86", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "51", x2: "24", y2: "86", ...limb }),
            dot(124, 47, 4.5),
            dot(60, 51, 4.5),
            dot(120, 86),
            dot(24, 86)
          ] })
        ] })
      );
    case "pushup":
      return wrap(
        "0 0 160 100",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(10, 88, 150),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "upper", children: [
              head(136, 42, 9),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "128", y1: "45", x2: "60", y2: "51", ...body }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "124", y1: "47", x2: "120", y2: "86", ...limb }),
              dot(124, 47, 4.5),
              dot(120, 86)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "51", x2: "24", y2: "86", ...limb }),
            dot(60, 51, 4.5),
            dot(24, 86)
          ] })
        ] })
      );
    case "mountainclimber":
      return wrap(
        "0 0 160 100",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(10, 88, 150),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(136, 42, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "128", y1: "45", x2: "60", y2: "51", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "124", y1: "47", x2: "120", y2: "86", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legR", x1: "60", y1: "51", x2: "26", y2: "84", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legL", x1: "60", y1: "51", x2: "22", y2: "88", ...limb }),
            dot(124, 47, 4.5),
            dot(60, 51, 4.5),
            dot(120, 86),
            dot(26, 84),
            dot(22, 88)
          ] })
        ] })
      );
    case "superman":
      return wrap(
        "0 0 160 90",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(10, 74, 150),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(132, 62, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "124", y1: "63", x2: "60", y2: "63", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armR", x1: "120", y1: "63", x2: "146", y2: "57", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legR", x1: "60", y1: "63", x2: "26", y2: "57", ...limb }),
            dot(120, 63, 4.5),
            dot(60, 63, 4.5),
            dot(146, 57),
            dot(26, 57)
          ] })
        ] })
      );
    case "bridge":
      return wrap(
        "0 0 160 100",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(10, 90, 150),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(34, 82, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "42", y1: "82", x2: "62", y2: "82", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "34", y1: "82", x2: "30", y2: "65", ...limb }),
            dot(30, 65, 4.5),
            dot(62, 82, 4.5),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "hipgroup", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "62", y1: "82", x2: "88", y2: "82", ...body }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "88", y1: "82", x2: "102", y2: "66", ...limb }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "102", y1: "66", x2: "102", y2: "90", ...limb }),
              dot(88, 82, 4.5),
              dot(102, 90)
            ] })
          ] })
        ] })
      );
    case "bicyclecrunch":
      return wrap(
        "0 0 160 100",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(10, 90, 150),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(30, 82, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "upperTwist", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "38", y1: "82", x2: "72", y2: "82", ...body }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "55", y1: "82", x2: "80", y2: "66", ...limb }),
              dot(38, 82, 4.5),
              dot(80, 66)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "legL", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "82", y1: "82", x2: "100", y2: "60", ...limb }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "100", y1: "60", x2: "118", y2: "72", ...limb }),
              dot(118, 72)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "legR", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "82", y1: "82", x2: "104", y2: "68", ...limb }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "104", y1: "68", x2: "128", y2: "56", ...limb }),
              dot(128, 56)
            ] }),
            dot(82, 82, 4.5)
          ] })
        ] })
      );
    case "russiantwist":
      return wrap(
        "0 0 120 120",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(8, 108, 112),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "upperTwist", children: [
              head(60, 44, 9),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "53", x2: "60", y2: "90", ...body }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "60", x2: "90", y2: "66", ...limb }),
              dot(60, 60, 4.5),
              dot(90, 66)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "60,90 78,84 74,100", fill: "none", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "60,90 68,80 60,98", fill: "none", ...limb }),
            dot(60, 90, 4.5),
            dot(74, 100),
            dot(60, 98)
          ] })
        ] })
      );
    case "wallsit":
      return wrap(
        "0 0 100 140",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(20, 134, 92),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "16", y1: "8", x2: "16", y2: "134", stroke: KHAKI, strokeWidth: "3", opacity: "0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "18", x2: "16", y2: "10", stroke: KHAKI, strokeWidth: "2", opacity: "0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "38", x2: "16", y2: "30", stroke: KHAKI, strokeWidth: "2", opacity: "0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "58", x2: "16", y2: "50", stroke: KHAKI, strokeWidth: "2", opacity: "0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(24, 20, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "24", y1: "29", x2: "24", y2: "80", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "24", y1: "42", x2: "42", y2: "58", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "24,80 54,80 54,132", fill: "none", ...limb }),
            dot(24, 42, 4.5),
            dot(24, 80, 4.5),
            dot(42, 58),
            dot(54, 132)
          ] })
        ] })
      );
    case "burpee":
      return wrap(
        "0 0 100 140",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(8, 134, 92),
          groundShadow(50, 133),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(50, 20),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "30", x2: "50", y2: "80", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "40", x2: "30", y2: "56", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "40", x2: "70", y2: "56", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "80", x2: "34", y2: "123", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "80", x2: "66", y2: "123", ...limb }),
            dot(50, 40, 4.5),
            dot(50, 80, 4.5),
            dot(30, 56),
            dot(70, 56),
            dot(34, 123),
            dot(66, 123)
          ] })
        ] })
      );
    case "crunch":
      return wrap(
        "0 0 160 100",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(10, 92, 150),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "crunchUpper", children: [
              head(26, 74, 9),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "34", y1: "80", x2: "66", y2: "78", ...body }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "48", y1: "81", x2: "74", y2: "64", ...limb }),
              dot(34, 80, 4.5),
              dot(66, 78, 4.5),
              dot(74, 64)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "66,78 90,62 102,74", fill: "none", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "66,78 94,64 110,72", fill: "none", ...limb }),
            dot(90, 62, 4.5),
            dot(102, 74),
            dot(94, 64, 4.5),
            dot(110, 72)
          ] })
        ] })
      );
    case "sideplank":
      return wrap(
        "0 0 160 100",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(10, 88, 150),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(132, 40, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "124", y1: "42", x2: "46", y2: "70", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "68", x2: "28", y2: "84", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "118", y1: "45", x2: "96", y2: "52", ...limb }),
            dot(124, 42, 4.5),
            dot(46, 70, 4.5),
            dot(28, 84),
            dot(96, 52)
          ] })
        ] })
      );
    case "legraise":
      return wrap(
        "0 0 160 100",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(10, 90, 150),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(18, 78, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "26", y1: "82", x2: "66", y2: "82", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "38", y1: "82", x2: "34", y2: "88", ...limb }),
            dot(26, 82, 4.5),
            dot(66, 82, 4.5),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "legGroup", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "66", y1: "82", x2: "82", y2: "46", ...limb }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "82", y1: "46", x2: "82", y2: "30", ...limb }),
              dot(82, 46, 4.5),
              dot(82, 30)
            ] })
          ] })
        ] })
      );
    case "flutterkick":
      return wrap(
        "0 0 160 100",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(10, 90, 150),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(18, 78, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "26", y1: "82", x2: "66", y2: "82", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "38", y1: "82", x2: "34", y2: "88", ...limb }),
            dot(26, 82, 4.5),
            dot(66, 82, 4.5),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "legGroup", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "66", y1: "82", x2: "90", y2: "66", ...limb }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "90", y1: "66", x2: "106", y2: "62", ...limb }),
              dot(90, 66, 4.5),
              dot(106, 62)
            ] })
          ] })
        ] })
      );
    case "deadbug":
      return wrap(
        "0 0 160 100",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(10, 90, 150),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(18, 78, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "26", y1: "82", x2: "70", y2: "82", ...body }),
            dot(26, 82, 4.5),
            dot(70, 82, 4.5),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "dbArmL", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "40", y1: "82", x2: "54", y2: "60", ...limb }),
              dot(54, 60)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "dbArmR", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "58", y1: "82", x2: "76", y2: "92", ...limb }),
              dot(76, 92)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "dbLegL", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "70", y1: "82", x2: "98", y2: "88", ...limb }),
              dot(98, 88)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "dbLegR", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "70", y1: "82", x2: "88", y2: "58", ...limb }),
              dot(88, 58)
            ] })
          ] })
        ] })
      );
    case "vup":
      return wrap(
        "0 0 120 120",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(8, 108, 112),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(60, 30, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "39", x2: "60", y2: "78", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "52", x2: "36", y2: "64", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "60", y1: "52", x2: "84", y2: "64", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "60,78 52,96 44,106", fill: "none", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "60,78 68,96 76,106", fill: "none", ...limb }),
            dot(60, 52, 4.5),
            dot(60, 78, 4.5),
            dot(36, 64),
            dot(84, 64),
            dot(44, 106),
            dot(76, 106)
          ] })
        ] })
      );
    case "plankjack":
      return wrap(
        "0 0 160 100",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(10, 88, 150),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(136, 42, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "128", y1: "45", x2: "60", y2: "51", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "124", y1: "47", x2: "120", y2: "86", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legR", x1: "62", y1: "51", x2: "28", y2: "86", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legL", x1: "60", y1: "51", x2: "44", y2: "86", ...limb }),
            dot(124, 47, 4.5),
            dot(60, 51, 4.5),
            dot(120, 86),
            dot(28, 86),
            dot(44, 86)
          ] })
        ] })
      );
    case "skater":
      return wrap(
        "0 0 100 140",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(8, 134, 92),
          groundShadow(50, 133),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(50, 20),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "30", x2: "50", y2: "80", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armL", x1: "50", y1: "40", x2: "30", y2: "56", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "armR", x1: "50", y1: "40", x2: "70", y2: "56", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legL", x1: "50", y1: "80", x2: "34", y2: "125", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { id: "legR", x1: "50", y1: "80", x2: "66", y2: "125", ...limb }),
            dot(50, 40, 4.5),
            dot(50, 80, 4.5),
            dot(30, 56),
            dot(70, 56),
            dot(34, 125),
            dot(66, 125)
          ] })
        ] })
      );
    case "heeltap":
      return wrap(
        "0 0 160 100",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(10, 92, 150),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(24, 78, 9),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "32", y1: "82", x2: "76", y2: "82", ...body }),
            dot(32, 82, 4.5),
            dot(76, 82, 4.5),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "76,82 92,66 108,74", fill: "none", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "76,82 96,70 112,76", fill: "none", ...limb }),
            dot(92, 66, 4.5),
            dot(108, 74),
            dot(96, 70, 4.5),
            dot(112, 76),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "htL", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "40", y1: "82", x2: "56", y2: "80", ...limb }),
              dot(56, 80)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "htR", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "54", y1: "82", x2: "70", y2: "80", ...limb }),
              dot(70, 80)
            ] })
          ] })
        ] })
      );
    default:
      return wrap(
        "0 0 100 140",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          floorLine(8, 134, 92),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { id: "figure", children: [
            head(50, 20),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "30", x2: "50", y2: "80", ...body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "40", x2: "30", y2: "56", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "40", x2: "70", y2: "56", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "80", x2: "34", y2: "123", ...limb }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "80", x2: "66", y2: "123", ...limb })
          ] })
        ] })
      );
  }
}
export {
  ExerciseFigure as E
};
