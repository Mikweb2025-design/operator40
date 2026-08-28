import { aq as WebPlugin } from "./index-DwxarVpo.js";
import "./icons-DnFQGhVC.js";
import "./charts-BWCYe6zh.js";
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
