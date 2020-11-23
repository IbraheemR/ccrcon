PORT="8002"

fs.delete("synced")
for file in string.gmatch(http.get("http://localhost:" .. PORT).readAll(), "%S+") do 
    io.output("/synced/" .. file)
    local text = http.get("http://localhost:".. PORT .."/" .. file).readAll()
    io.write(text)
    io.close()
end
