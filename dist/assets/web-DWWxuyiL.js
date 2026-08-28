import { aq as WebPlugin } from "./index-C3oc4Xr9.js";
import "./icons-CiBW7QCm.js";
import "./charts-Dc_aK1Sx.js";
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
