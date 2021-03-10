import TurtleProxy from "../../TurtleProxy";

export default abstract class Step<T = void> {
    constructor(protected turtle: TurtleProxy) {

    }

    abstract run(): Promise<T>
}