require("dotenv").config();

const fs = require("fs");
const express = require("express");
const app = express();

var walk = function (dir, r = true) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = dir + "/" + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file, false));
    } else {
      /* Is a file */
      results.push(file);
    }
  });
  return results;
};

app.get("/", (req, res) => {
  let dirs = walk(process.env.TURTLE_SYNC_FOLDER).map((a, b) =>
    a.replace(`${process.env.TURTLE_SYNC_FOLDER}/`, "")
  );
  dirs = dirs.join("\n");
  res.send(dirs);
});

app.use(express.static(process.env.TURTLE_SYNC_FOLDER));

app.listen(process.env.TURTLE_SYNC_PORT, () =>
  console.log("sync app listening on port 8080!")
);
