import { ap as WebPlugin } from "./index-F2ITDERy.js";
import "./icons-BHJLJdva.js";
import "./charts-DKCmdoT_.js";
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
