const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-CNUtqWbL.js","./index-DbOkD-eS.js","./icons-CYijDH-L.js","./charts-CgofXTP-.js"])))=>i.map(i=>d[i]);
import { ar as registerPlugin, _ as __vitePreload } from "./index-DbOkD-eS.js";
import "./icons-CYijDH-L.js";
import "./charts-CgofXTP-.js";
const Motion = registerPlugin("Motion", {
  android: () => __vitePreload(() => import("./web-CNUtqWbL.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb()),
  ios: () => __vitePreload(() => import("./web-CNUtqWbL.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb()),
  web: () => __vitePreload(() => import("./web-CNUtqWbL.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb())
});
export {
  Motion
};
