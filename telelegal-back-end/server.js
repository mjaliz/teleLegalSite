// This is where we crate express and socketio server

const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");

const app = express();
app.use(cors()); // This will open our API to ANY domain
app.use(express.static(__dirname + "/public"));
app.use(express.json()); // This will allow us to parse json in the body with the body parser

const key = fs.readFileSync("./certs/cert.key");
const cert = fs.readFileSync("./certs/cert.crt");

const expressServer = https.createServer({ key, cert }, app);
const io = socketio(expressServer, {
  cors: ["https://localhost:3000"],
});
expressServer.listen(9000);
module.exports = { io, expressServer, app };
