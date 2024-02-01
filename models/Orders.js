const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  idWallet: { type: String, required: true },
  typeWallet : {type : String, required : true},
  paypalEmail : {type : String, required : true},
  amount : {type : Number, required : true},
  image : {type : String, required : true},
  status : {type : String, default : "Pending"},
  author : {type : mongoose.Schema.Types.ObjectId, ref : "User"}
});

module.exports = mongoose.model("Order", OrdersSchema);
