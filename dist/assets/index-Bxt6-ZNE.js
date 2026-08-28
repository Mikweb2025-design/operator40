const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-C9EGyyoc.js","./index-D3Kh0jMn.js","./icons-CYijDH-L.js","./charts-CgofXTP-.js"])))=>i.map(i=>d[i]);
import { ar as registerPlugin, _ as __vitePreload } from "./index-D3Kh0jMn.js";
import "./icons-CYijDH-L.js";
import "./charts-CgofXTP-.js";
const Motion = registerPlugin("Motion", {
  android: () => __vitePreload(() => import("./web-C9EGyyoc.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb()),
  ios: () => __vitePreload(() => import("./web-C9EGyyoc.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb()),
  web: () => __vitePreload(() => import("./web-C9EGyyoc.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb())
});
export {
  Motion
};
