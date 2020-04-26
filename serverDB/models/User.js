const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: String,
  email: String,
  firstname: String,
  adress: String,
  bestscore: Number,
  mode: String,
  ip: String,
});
module.exports = mongoose.model("User", UserSchema);
