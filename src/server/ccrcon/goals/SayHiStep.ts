import Step from "./types/Step";

export default class SayHiStep extends Step {
    async run() {
        await this.turtle.$(`print("hi")`);
    }
}