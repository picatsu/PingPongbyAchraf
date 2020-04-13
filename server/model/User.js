const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  email: String,
  firstname: String,
  adress: String,
  bestscore: Number,
});
module.exports = mongoose.model("User", UserSchema);
