const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/db");
const router = express.Router();

//EndPoint for creating a new user
router.post("/register", (req, res) => {
  const { name, email, password, type } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);
  console.log(name, email, password, type, hashPassword);

  const token = jwt.sign(
    { id: name.length, email: email, role: type },
    "secretkey",
    {
      expiresIn: "1h",
    },
  );

  const query = "SELECt * FROM users WHERE email = ?";
  db.get(query, [email], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (row) {
        res.status(400).json({ error: "user already exists" });
      } else {
        const query =
          "INSERT INTO users (name, email, password,type,token) VALUES (?, ?, ?,?,?)";
        db.run(query, [name, email, hashPassword, type, token], (err) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.status(201).json({ message: "user signup successfully" });
          }
        });
      }
    }
  });
});
module.exports = router;
