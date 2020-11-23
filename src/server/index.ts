import WebSocket from "ws";

const wss = new WebSocket.Server({ port: Number(process.env.SERVER_PORT) || 8001 });

wss.on("connection", (ws) => {
  ws.send("epicmsg!turtle.refuel()");
  ws.send("epicmsg2!turtle");
  ws.send("epicmsg3!");

  ws.on("message", (message) => {
    console.log("received: %s", message);
  });
});
