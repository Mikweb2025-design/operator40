const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-CosHSVRO.js","./index-DnzZm8wt.js","./icons-Cu976FrU.js","./charts-Cp2TOHCu.js"])))=>i.map(i=>d[i]);
import { ar as registerPlugin, _ as __vitePreload } from "./index-DnzZm8wt.js";
import "./icons-Cu976FrU.js";
import "./charts-Cp2TOHCu.js";
const Motion = registerPlugin("Motion", {
  android: () => __vitePreload(() => import("./web-CosHSVRO.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb()),
  ios: () => __vitePreload(() => import("./web-CosHSVRO.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb()),
  web: () => __vitePreload(() => import("./web-CosHSVRO.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb())
});
export {
  Motion
};
