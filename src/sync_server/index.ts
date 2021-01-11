import { config } from "dotenv";
config()

import fs from "fs";
import express from "express"
import interceptor from "express-interceptor"

import walk from "./walk";



const app = express();

app.get("/", (req, res) => {
    let dirs = walk(process.env.SYNC_FOLDER).map(name =>
        name.replace(`${process.env.SYNC_FOLDER}/`, "")
    );

    let dir_string = dirs.join("\n");
    res.send(dir_string);
});

app.get("/", (req, res) => {
    let dirs = walk(process.env.SYNC_FOLDER).map(name =>
        name.replace(`${process.env.SYNC_FOLDER}/`, "")
    );
    let dir_string = dirs.join("\n");
    res.send(dir_string);
});

// Hacky interceptor to substitute %PORT% for env var
app.use(interceptor((req, res) => ({
    isInterceptable: () => true,
    intercept(body: string, send) {
        send(
            body
                .replace(/\%SYNC_URL\%/g, `http://${process.env.SYNC_HOST}:${process.env.SYNC_PORT}`)
                .replace(/\%CCRCON_URL\%/g, `ws://${process.env.CCRCON_HOST}:${process.env.CCRCON_PORT}`)
        )

    }
})))

app.use(express.static(process.env.SYNC_FOLDER))



app.listen(process.env.SYNC_PORT, () =>
    console.log(`sync server listening on port ${process.env.SYNC_PORT}!`)
);
