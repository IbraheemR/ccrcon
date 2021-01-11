import { config } from "dotenv";
config();

import CCRconServer from "./CCRcon";
import TurtleProxy from "./TurtleProxy";

let ts = new CCRconServer(Number(process.env.CCRCON_PORT) || 8001);

console.log("CCRCON Server up!")

ts.on("clientConnect", async (client) => {
  // let turtle = new TurtleProxy(client);
  try {
    await client.$("print(\"cool\")")

    // await turtle.suckUp(1);
    // await turtle.refuel();
    // await turtle.dropUp();

    // await client.$("repeat until turtle.forward()");

    // await client.$("repeat until turtle.forward()");
    // await client.$(
    //   "while turtle.getItemCount(1) < 1 do turtle.suckDown(1) end"
    // );
    // await turtle.equipLeft();

    // await client.$("repeat until turtle.forward()");
    // await client.$(
    //   "while turtle.getItemCount(1) < 1 do turtle.suckDown(1) end"
    // );
    // await turtle.equipRight();

    // for (let i = 0; i < 10; i++) await turtle.forward();
  } catch (error) {
    console.error(error);
  }
});
