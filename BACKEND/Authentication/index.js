const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const server = express();


async function mongooseConnection()
{
    try {
        await  mongoose.connect("mongodb+srv://gadearjun24:qwerty123456@cluster0.efkaxtv.mongodb.net/Authentication");       
    } catch (err) {
        console.log({"errmessage" : err});
    }
}
// mongooseConnection();




server.listen(8080 , (err)=>
{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("server running on port 8080");
    }
})