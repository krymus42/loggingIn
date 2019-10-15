const mongoose = require("mongoose");
var exports = module.exports;


const userSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  login: { type:String,unique:true},
  password: String
});


module.exports = mongoose.model("User",userSchema);
