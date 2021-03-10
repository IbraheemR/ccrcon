import TurtleProxy from "../../../TurtleProxy";
import Task from "./Task";

export default class TurtleTaskManager {
    public assignedTask: Task;

    constructor(public turtleProxy: TurtleProxy) {
    }
}