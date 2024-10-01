const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.use(express.static("public"));



io.on("connection" , (socket)=>{
    console.log("connect to socket");

    socket.on("register" , (user)=>
    {
        console.log(user);
        console.log(user.id);

        users[user.id];
        console.log(users);
        
    })


    socket.on("chat",(msg)=>
    {
        io.emit("message",msg);
        console.log({msg});
    })

    socket.on("disconnect" , ()=>
    {
        console.log("disconnected...");
    })
    
})



const port = 8080
server.listen(port , (err)=>
{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("app running on port 8080");
    }
})