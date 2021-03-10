import Step from "./types/Step";

export default class GetGSPStep extends Step<[number, number, number] | []> {
    async run() {
        let gps = await this.turtle.gpsLocate()
        return gps;
    }
}