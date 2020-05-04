const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  let user = await User.findOne({ emailAddress: req.body.emailAddress });
  if (!user) {
    res.status(401).json({ message: "User not found" });
  } else if (bcrypt.compareSync(req.body.password, user.password)) {
    res.status(200).json(user);
  } else {
    res.status(403).json({ message: "Invalid Credentials" });
  }
});
module.exports = loginRouter;
