local SERVER = require("config").SERVER
local NAME = require("config").NAME

-- c2s: id@name
-- s2c: id!actionString
-- c2s: id#resultArray -- Uses pcall result
-- c2s: id* -- Notify server of error in message passing (syntax, execution error come in pcall result)
-- where id is A-z0-9. id should be set by the sender and copied into responses, to allow messages to be paired
-- due to limitations in how lua is executed (mainly having multiple threads is not possible), the server must wait for confirmation that an instruction has finished (#*) before sending the next one, else it has no guarantee that the instruction will be called.

socket = http.websocket(SERVER)
socket.send("hello@" ..  NAME)

-- REPL

while (true) do 
    message = socket.receive()

    if (message) then 
        id, command = string.match(message, "(%w+)!(.*)")

        if (command) then
            local func = load(command);
            local result = pcall(func)
            socket.send(id .. "#" .. textutils.serializeJSON(result))
        elseif (id) then
            socket.send(id .. "*")
        end
    end
end