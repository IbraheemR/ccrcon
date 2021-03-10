import { config } from "dotenv";
config();

import CCRconServer from "./ccrcon/CCRcon";
import GetGSPStep from "./ccrcon/goals/GetGPSStep";
import SayHiStep from "./ccrcon/goals/SayHiStep";
import TurtleProxy from "./ccrcon/TurtleProxy";

let ts = new CCRconServer(Number(process.env.CCRCON_PORT) || 8001);

console.log(`CCRCON Server up on port ${process.env.CCRCON_PORT}`)

ts.on("clientConnect", async (client) => {
  let turtle = new TurtleProxy(client);
  try {

    await new SayHiStep(turtle).run();
    console.log(await new GetGSPStep(turtle).run());


  } catch (error) {
    console.error(error);
  }
});