const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("connect to socket");

  socket.on("chat", (msg) => {
    socket.to(msg.sendId).emit("message", msg.sendMsg, msg.sendId);
    console.log(msg.sendMsg, msg.sendId);
  });

  socket.on("disconnect", () => {
    console.log("disconnected...");
  });
});

const port = 8080;
server.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("app running on port 8080");
  }
});
