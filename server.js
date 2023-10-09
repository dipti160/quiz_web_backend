const express = require("express");
const app = express();
const cors = require("cors");

const { db } = require("./database");
const routes = require("./routes");

app.use(cors());

app.use(express.json());

app.use("/", routes);

var server = app.listen(5000, async function () {
  var host = server.address().address;
  var port = server.address().port;
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  console.log("Example app listening at http://%s:%s", host, port);
});
