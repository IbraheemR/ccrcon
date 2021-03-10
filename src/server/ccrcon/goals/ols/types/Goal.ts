import Task from "./Task";
import TurtleTaskManager from "./TurtleTaskManager";

export default abstract class Goal {

    abstract done: boolean;

    assignTurtle(turtle: TurtleTaskManager): boolean {
        let task = this.getNextTask();
        if (task) {
            turtle.assignedTask = task;
            task.turtle = turtle;

            task.start();
            return true;
        }

        return false;
    }

    abstract getNextTask(): Task | null;
}