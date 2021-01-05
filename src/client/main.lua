local SERVER = require("config").SERVER
local NAME = require("config").NAME

-- c2s: id@name
-- s2c: id!actionString
-- c2s: id#resultArray -- Uses pcall result
-- where id is `A-z0-9`. id should be set by the sender and copied into responses, to allow messages to be paired
-- due to limitations in how lua is executed (mainly having multiple threads is not possible), the server must wait for confirmation that an instruction has finished (#*) before sending the next one, else it has no guarantee that the instruction will be called.

socket = http.websocket(SERVER)
socket.send("hello@" ..  NAME)

-- REPL

while (true) do 
    message = socket.receive()

    if (message) then 
        id, command = string.match(message, "(%w+)!(.*)")

        if (id and command) then
            print("socket> " .. command)
            local func = load(command, "socketInput");
            local funcExpression = load("return " .. command, "socketInput");

            if (funcExpression) then
                func = funcExpression
            end

            local result = {pcall(func)}
            socket.send(id .. "#" .. textutils.serializeJSON(result))
            if (not result[1]) then -- Error!
                term.setTextColour(colors.orange)
                print(result[2])
                term.setTextColour(colors.white)
            end
        end
    end
end