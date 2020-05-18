const mongoose = require("mongoose");

var prediction= mongoose.Schema({
    userIp:String,
    path:String
});

module.exports=mongoose.model("Predict",prediction);