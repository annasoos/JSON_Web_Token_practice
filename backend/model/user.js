const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  userID: String,
  password: String,
  token: String
});

module.exports = mongoose.model("user", userSchema);


// az alap temaplate-et bizotsítja a regisztrációkor létrejövő new User objektumhoz