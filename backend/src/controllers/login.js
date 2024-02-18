const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchma = require("../models/db");
const userSchema = require("../models/usercurds");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password, verificationcode } = req.body;
  const user = await userSchema.getUserByEmailId(email);
  console.log("user", user);
  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
    });
  } else {
    //check if the user is verification code is correct.
    if (user.verificationcode !== verificationcode) {
      return res.status(401).json({ message: "Invalid verification code" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    } else {
      const token = jwt.sign(
        { id: user.name.length, email: user.email, role: user.type },
        "secretkey",
        {
          expiresIn: "1h",
        },
      );

      userSchema.updateUser(email, token);
      res.status(200).json({ message: "User logged in successfully", token });
    }
  }
});

module.exports = router;
