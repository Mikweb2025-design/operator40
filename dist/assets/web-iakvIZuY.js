import { aq as WebPlugin } from "./index-Cyfaa6hN.js";
import "./icons-CLcWqI5o.js";
import "./charts-BIux2oEU.js";
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
