URL="%SYNC_URL%" -- Substitute with sync server. Is auto changed based on env var if served from sync server

print("Syncing from ".. URL)

for file in string.gmatch(http.get(URL).readAll(), "%S+") do 
    io.output("/" .. file)
    local text = http.get(URL .."/" .. file).readAll()
    io.write(text)
    io.close()
end