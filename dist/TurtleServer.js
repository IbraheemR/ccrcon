"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoevents_1 = require("nanoevents");
const ws_1 = __importDefault(require("ws"));
class TurtleServer {
    constructor(port) {
        this.port = port;
        this.server = new ws_1.default.Server({ port });
        this.emitter = nanoevents_1.createNanoEvents();
        this.server.on("connection", (socket) => {
            let turtleHandler = new TurtleHandler(socket);
            socket.on("message", turtleHandler.handleMessage);
            this.emitter.emit("clientConnect", turtleHandler);
        });
    }
    on(event, callback) {
        return this.emitter.on(event, callback);
    }
}
exports.default = TurtleServer;
class TurtleHandler {
    constructor(socket) {
        this.socket = socket;
        this.ready = false;
        this.waiting = false;
        this.emitter = nanoevents_1.createNanoEvents();
        this.commandQueue = [];
    }
    on(event, callback) {
        return this.emitter.on(event, callback);
    }
    handleInstructionReturn(id, data, originalMessage) {
        let command = this.commandQueue.find((command) => command.id === id);
        if (command) {
            let [error, ...returns] = data;
            command.callback({ id, error, returns });
        }
        else {
            throw new Error(`Recieved unknown response from turtle ${this.name}: ${originalMessage}`);
        }
        this.tryShiftQueue();
    }
    dispatchCommand(command) {
        return new Promise((res) => {
            let id = Date.now().toString();
            this.commandQueue.push({
                id,
                data: command,
                callback: res,
            });
            this.tryShiftQueue();
        });
    }
    tryShiftQueue() {
        if (!this.waiting && this.commandQueue.length > 0) {
            this.waiting = true;
            let nextCommand = this.commandQueue.shift();
            this.sendCommandMessage(nextCommand);
        }
    }
    sendCommandMessage(command) {
        let message = `${command.id}!${command.data}`;
        this.socket.send(message);
    }
    handleMessage(message) {
        var _a, _b;
        let { id, opcode, data } = (_b = (_a = message.match(/^(?<id>[A-Za-z0-9])(?<opcode>[\@\#])(?<data>.*)$/i)) === null || _a === void 0 ? void 0 : _a.groups) !== null && _b !== void 0 ? _b : {};
        if (!(id && opcode && data))
            throw new Error(`Could not pass returned data: ${message}`);
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
}
//# sourceMappingURL=TurtleServer.js.map