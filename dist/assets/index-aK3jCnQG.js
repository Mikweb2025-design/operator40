const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-iakvIZuY.js","./index-Cyfaa6hN.js","./icons-CLcWqI5o.js","./charts-BIux2oEU.js"])))=>i.map(i=>d[i]);
import { ar as registerPlugin, _ as __vitePreload } from "./index-Cyfaa6hN.js";
import "./icons-CLcWqI5o.js";
import "./charts-BIux2oEU.js";
const Motion = registerPlugin("Motion", {
  android: () => __vitePreload(() => import("./web-iakvIZuY.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb()),
  ios: () => __vitePreload(() => import("./web-iakvIZuY.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb()),
  web: () => __vitePreload(() => import("./web-iakvIZuY.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb())
});
export {
  Motion
};
