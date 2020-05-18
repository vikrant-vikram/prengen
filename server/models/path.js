const mongoose = require("mongoose");

var path= mongoose.Schema({
    userIp:String,
    path:String
});

module.exports=mongoose.model("path",path);