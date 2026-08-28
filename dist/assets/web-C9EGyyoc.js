import { aq as WebPlugin } from "./index-D3Kh0jMn.js";
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
