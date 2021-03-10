import TurtleTaskManager from "./TurtleTaskManager";

export default abstract class Task {
    turtle: TurtleTaskManager;

    done: boolean = false;

    abstract start(): Promise<void>;
}