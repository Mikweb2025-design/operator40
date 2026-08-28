const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-B2hZXeSA.js","./index-CmwjKwc-.js","./icons-BHJLJdva.js","./charts-DKCmdoT_.js"])))=>i.map(i=>d[i]);
import { aq as registerPlugin, _ as __vitePreload } from "./index-CmwjKwc-.js";
import "./icons-BHJLJdva.js";
import "./charts-DKCmdoT_.js";
const Motion = registerPlugin("Motion", {
  android: () => __vitePreload(() => import("./web-B2hZXeSA.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb()),
  ios: () => __vitePreload(() => import("./web-B2hZXeSA.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb()),
  web: () => __vitePreload(() => import("./web-B2hZXeSA.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb())
});
export {
  Motion
};
