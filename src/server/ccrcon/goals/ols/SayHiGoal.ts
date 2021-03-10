import SayHiTask from "./SayHiTask";
import Goal from "./types/Goal";
import Task from "./types/Task";

export default class SayHiGoal extends Goal {
    tasks: SayHiTask[];
    constructor(private num = 1) {
        super();
        this.tasks = [];
        for (let i = 0; i < num; i++) {
            this.tasks.push(new SayHiTask())
        }
    }

    getNextTask(): Task {
    }


    get done() {
        return true;
    }
}