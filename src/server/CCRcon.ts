import { createNanoEvents, Emitter } from "nanoevents";
import WebSocket from "ws";

interface CCRconServerEvents {
  clientConnect: (turtle: CCRconHandler) => void;
}

export default class CCRconServer {
  server: WebSocket.Server;
  emitter: Emitter<CCRconServerEvents>;

  constructor(private port: number) {
    this.server = new WebSocket.Server({ port });
    this.emitter = createNanoEvents<CCRconServerEvents>();

    this.server.on("connection", (socket: WebSocket) => {
      let turtleHandler = new CCRconHandler(socket);
      socket.on("message", (data) =>
        turtleHandler.handleMessage(data as string)
      );

      turtleHandler.on("ready", () =>
        this.emitter.emit("clientConnect", turtleHandler)
      );
    });
  }

  on<E extends keyof CCRconServerEvents>(
    event: E,
    callback: CCRconServerEvents[E]
  ) {
    return this.emitter.on(event, callback);
  }
}

interface CCRconHandlerEvents {
  ready: () => void;
  close: () => void;
}
export class CCRconHandler {
  name: string;

  private emitter: Emitter<CCRconHandlerEvents>;

  private ready: boolean;
  private waitingOn: Command | null;

  private outboundCommandQueue: Command[];

  constructor(private socket: WebSocket) {
    this.ready = false;
    this.waitingOn = null;
    this.emitter = createNanoEvents();

    this.outboundCommandQueue = [];

    this.socket.on("close", () => this.emitter.emit("close"));
  }

  on<E extends keyof CCRconHandlerEvents>(
    event: E,
    callback: CCRconHandlerEvents[E]
  ) {
    return this.emitter.on(event, callback);
  }

  /**
   * Close this handler and it's socket.
   */
  close() {
    this.socket.close();
  }

  /**
   * Use `CCRconHandler.$` as a shorthand.
   *
   * Enqueues a command to be sent to the client.
   *
   * @param command The lua code to execute. This functions in almost an identical way to the lua REPL in CC:T - note that print() will only write to the in-game terminal.
   *
   * @returns a Promise which will resolve with the return values of the lua code provided
   *
   * See the code in src/client/main.lua for exact implementation
   */
  dispatchCommand(command: string): Promise<any[]> {
    return new Promise((res, rej) => {
      let id = Date.now().toString();
      this.outboundCommandQueue.push({
        id,
        data: command,
        res,
        rej,
      });
      this.tryShiftQueue();
    });
  }

  /**
   * @alias dispatchCommand
   */
  $(command: string): Promise<any[]> {
    return this.dispatchCommand(command);
  }

  private tryShiftQueue() {
    if (!this.waitingOn && this.outboundCommandQueue.length > 0) {
      let nextCommand = this.outboundCommandQueue.shift();
      this.sendCommandMessage(nextCommand);
      this.waitingOn = nextCommand;
    }
  }

  private sendCommandMessage(command: Command) {
    let message = `${command.id}!${command.data}`;
    this.socket.send(message);
  }

  handleMessage(message: string) {
    let { id, opcode, data } =
      message.match(/^(?<id>[A-Za-z0-9]*)(?<opcode>[\@\#])(?<data>.*)$/i)
        ?.groups ?? {};

    if (!(id && opcode && data))
      throw `Could not pass returned data: ${message}`;

    switch (opcode) {
      case "@":
        if (!this.ready) {
          this.ready = true;
          this.name = data;
          this.emitter.emit("ready");
        }
        break;
      case "#":
        this.handleInstructionReturn(id, JSON.parse(data), message);
        break;
    }
  }

  private handleInstructionReturn(
    id: string,
    data: any[],
    originalMessage: string
  ) {
    if (this.waitingOn.id == id) {
      let [ok, ...returns] = data;

      if (!ok) {
        this.waitingOn.rej(
          `Receieved error from turtle ${this.name}: ${originalMessage}`
        );
      } else {
        this.waitingOn.res(returns);
      }

      this.waitingOn = null;
    } else {
      throw `Recieved unexpected response from turtle ${this.name}: ${originalMessage}`;
    }
    this.tryShiftQueue();
  }
}

type Command = {
  id: string;
  data: string;
  res: (returns: any[]) => void;
  rej: (reason?: any) => void;
};
