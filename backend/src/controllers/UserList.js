const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchma = require("../models/db");
const userSchema = require("../models/usercurds");
const router = express.Router();
const {
  authorizeUser,
  authenticateUser,
} = require("../middleware/authmiddleware");

router.get(
  "/getSingleUser",
  authenticateUser,
  authorizeUser(["user"]),
  async (req, res) => {
    try {
      console.log("user", req.query.userId);
      const userId = req.query.userId;
      const userData = await userSchema.getUserById(userId);
      if (!userData) {
        return res.status(400).json({ message: "User does not exist" });
      }
      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error getting user" });
    }
  },
);

router.get(
  "/getAllUserList",
  authenticateUser,
  authorizeUser(["admin"]),
  async (req, res) => {
    try {
      const allUserData = await userSchema.getAllUsers();
      if (!allUserData) {
        return res.status(400).json({ message: "User does not exist" });
      }
      res.status(200).json({ message: "User List", allUserData });
    } catch (error) {}
  },
);

module.exports = router;
