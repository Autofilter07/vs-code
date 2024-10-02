const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

var allUsersID = new Set();
var userMap = {};
var msgMap = {};

io.on("connection", (socket) => {
  console.log("connect to socket");
  // for user count =>
  // const userCount = io.engine.clientCounts;

  // for all users id =>
  allUsersID.add(socket.id);
  io.broadcast.emit("users", Array.from(allUsersID));

  // map user with socket id=>
  socket.on("register", (userId) => {
    userMap[userId] = socket.id;
    console.log(userId, userMap[userId], "  <=register");
    if (msgMap[userId]) {
      msgMap[userId].map((ele)=>
      {
        io.to(socket.id).emit("message",ele);
      })
      console.log(msgMap[userId]);
    }
  });

  

  socket.on("chat", (msg) => {
    const reciepandId = userMap[msg.sendId];
    if (reciepandId) {
      console.log(msg.sendId, reciepandId, "  <=send");
      io.to(reciepandId).emit("message", msg);
    } else {
      if(!msgMap[msg.sendId])
      {
        msgMap[msg.sendId]=[];
      }
      msgMap[msg.sendId].push(msg);

      // handleOflineUser(msg);
      // console.log("not found");
    }
  });

  // disconnect =>
  socket.on("disconnect", () => {
    allUsersID.delete(socket.id);
    for (const userId in userMap) {
      if (userMap[userId] == socket.id) {
        delete userMap[userId];
        break;
      }
    }
    io.broadcast.emit("users", Array.from(allUsersID));
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
