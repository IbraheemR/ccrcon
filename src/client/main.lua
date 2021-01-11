local SERVER = require("config").SERVER

socket = http.websocket(SERVER)

if not socket then 
    print("Cannot connect to " .. SERVER)
    return 0;
else
    print("Connected to " .. SERVER) 
end

-- REPL

while (true) do 
    message = socket.receive()

    if (message) then 
        print("socket> " .. message)
        
        local func = load(message, "socketInput");
        local funcExpression = load("return " .. message, "socketInput");

        if (funcExpression) then
            func = funcExpression
        end

        local result = {pcall(func)}
        socket.send(textutils.serializeJSON(result))
        if (not result[1]) then -- Error!
            term.setTextColour(colors.orange)
            print(result[2])
            term.setTextColour(colors.white)
        end
    end
end