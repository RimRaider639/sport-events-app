const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
require("dotenv").config();
const User = require("../models/user.model");

const userRouter = require("express").Router();

userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const match = bcrypt.compareSync(password, user.password);
      if (match) {
        const token = jwt.sign({ id: user._id }, process.env.KEY);
        res.send({
          message: "User successfully logged in",
          token,
        });
        return;
      }
      res.status(401).send({ message: "Incorrect Password" });
    } else {
      res.status(401).send({ message: "Username is not registered" });
    }
    return;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      req.status(409).send({ message: "Username already has an account" });
      return;
    }
    const hash = bcrypt.hashSync(password);
    const newUser = new User({ username, password: hash });
    await newUser.save();
    res.send({ message: "User successfully registered" });
    return;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = userRouter;
