import { aq as WebPlugin } from "./index-6jiNVdOG.js";
import "./icons-CYijDH-L.js";
import "./charts-CgofXTP-.js";
class MotionWeb extends WebPlugin {
  constructor() {
    super();
    this.registerWindowListener("devicemotion", "accel");
    this.registerWindowListener("deviceorientation", "orientation");
  }
}
export {
  MotionWeb
};
