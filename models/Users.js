const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = new mongoose.Schema({
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type:String, required : true},
    emailPay : {type:String, default : ""},
    role : {type: mongoose.Schema.Types.ObjectId, ref:"Role"}
});

userModel.pre("save", async function(){
    this.email = this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userModel);