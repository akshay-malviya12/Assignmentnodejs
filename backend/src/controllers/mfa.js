const express = require("express");
const router = express.Router();
const db = require("../models/db");
const { generateRandomcodeforotp } = require("../controllers/generateRandom");
const { sendEmailForVerify } = require("../controllers/nodemailer");

//multi factor authentication.
router.post("/", async (req, res) => {
  
  const { email } = req.body;
  //Genarate random code
  const code = generateRandomcodeforotp();
  //Set expiration time for the code(for example 5 minutes from now).
  const expirationTime = new Date(); // + 60000;
  expirationTime.setMinutes(expirationTime.getMinutes() + 15);

  //send email for user verification.
  try {
    await sendEmailForVerify(email, code);
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({ message: "Email not sent at this time." });
  }
  const insertQuery =
    "INSERT INTO OTPVarifications (email, verificationcode, expirationtime) VALUES (?, ?, ?)";
  db.run(insertQuery, [email, code, expirationTime], (err) => {
    if (err) {
      console.log("error", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    // res.status(200).json({ message: "OTP verification code sent successfully" });
    console.log("OTP verification code Add successfully");
    res.status(200).json({ message: "Email sent successfully" });
  });
});

module.exports = router;
