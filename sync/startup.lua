local function getRunningPath()
    local runningProgram = shell.getRunningProgram()
    local programName = fs.getName(runningProgram)
    return runningProgram:sub(1, #runningProgram - #programName)
end

shell.run(getRunningPath() .. "sync")