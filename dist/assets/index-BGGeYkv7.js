const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-BokT4fNp.js","./index-Dk3L8kk3.js","./icons-DnFQGhVC.js","./charts-BWCYe6zh.js"])))=>i.map(i=>d[i]);
import { aq as registerPlugin, _ as __vitePreload } from "./index-Dk3L8kk3.js";
import "./icons-DnFQGhVC.js";
import "./charts-BWCYe6zh.js";
const Motion = registerPlugin("Motion", {
  android: () => __vitePreload(() => import("./web-BokT4fNp.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb()),
  ios: () => __vitePreload(() => import("./web-BokT4fNp.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb()),
  web: () => __vitePreload(() => import("./web-BokT4fNp.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb())
});
export {
  Motion
};
