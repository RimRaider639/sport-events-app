const mg = require("mongoose");

const userSchema = mg.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mg.model("user", userSchema);

module.exports = User;
