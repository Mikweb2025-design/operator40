const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-DWWxuyiL.js","./index-C3oc4Xr9.js","./icons-CiBW7QCm.js","./charts-Dc_aK1Sx.js"])))=>i.map(i=>d[i]);
import { ar as registerPlugin, _ as __vitePreload } from "./index-C3oc4Xr9.js";
import "./icons-CiBW7QCm.js";
import "./charts-Dc_aK1Sx.js";
const Motion = registerPlugin("Motion", {
  android: () => __vitePreload(() => import("./web-DWWxuyiL.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb()),
  ios: () => __vitePreload(() => import("./web-DWWxuyiL.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb()),
  web: () => __vitePreload(() => import("./web-DWWxuyiL.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url).then((m) => new m.MotionWeb())
});
export {
  Motion
};
