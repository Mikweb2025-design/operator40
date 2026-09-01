import { aq as WebPlugin } from "./index-DDPOFJ5q.js";
import "./icons-Cu976FrU.js";
import "./charts-Cp2TOHCu.js";
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
