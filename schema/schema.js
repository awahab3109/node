const mongoose = require("mongoose");

    const userSchema = mongoose.Schema({
        name:String,
        username:String,
        email:String,
        password:String,
        roles:[String]
    })

const user=mongoose.model("user",userSchema);

module.exports=user;

