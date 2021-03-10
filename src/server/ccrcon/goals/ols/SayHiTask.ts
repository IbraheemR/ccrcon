import Task from "./types/Task";
import TurtleTaskManager from "./types/TurtleTaskManager";

export default class SayHiTask implements Task {
    done: boolean;
    turtle: TurtleTaskManager;

    async start() {
        let tp = this.turtle.turtleProxy;

        await tp.$(`print("hi") os.sleep(1)`)

        this.done = true
    }
}