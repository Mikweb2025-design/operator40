import { aq as WebPlugin } from "./index-8atOh5Yh.js";
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
