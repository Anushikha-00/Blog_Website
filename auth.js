const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const secrets =  require("../../secrets");
const secrets = process.env || require("../../secrets");
const mailSender = require("../../utilities/mailSender");

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, username, confirmPassword } = req.body;
    if (!email || !password || !username || !confirmPassword) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }
    const user = await User.findOne({ username, email });
    if (user) return res.status(409).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const hashConfirmPassword = await bcrypt.hash(confirmPassword, salt);

    if (hashPassword !== hashConfirmPassword)
      return res.status(401).json({ msg: "Passwords do not match" });
    const newUser = new User({
      email,
      password: hashPassword,
      confirmPassword: hashConfirmPassword,
      username,
    });
    console.log(newUser);
    await newUser.save();
    res.status(201).json({
      newUser,
      msg: "User created",
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (username && password) {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid password" });
      }
      // Create and assign a token
      const token = jwt.sign(
        {
          data: user["_id"],
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        },
        secrets.JWTSECRET
      );
      res.cookie("jwt", token);
      user.password = undefined;
      user.confirmPassword = undefined;
      res.status(200).json({
        user,
        msg: "User logged in",
      });
    } else {
      res.status(400).json({ msg: "Please enter username and password" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.log(err);
  }
});

// Forgot Password
router.patch("/forgotPassword", async (req, res) => {
  try {
    let { email } = req.body;
    //    mail
    // by default -> FindAndUpdate -> not updated send document,
    // new =true -> you will get updated doc
    // email -> do we have a user -> no user
    // update
    let user = await User.findOne({ email });
    if (user) {
      let otp = otpGenerator();
      let afterFiveMin = Date.now() + 5 * 60 * 1000;
      await mailSender(email, otp);
      user.otp = otp;
      user.otpExpiry = afterFiveMin;
      await user.save();
      res.status(204).json({
        user,
        message: "Otp sent to your mail",
      });
    } else {
      res.status(404).json({
        message: "user with this email not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Reset Password
router.patch("/resetPassword", async (req, res) => {
  try {
    let { otp, password, confirmPassword, email } = req.body;
    // search -> get the user
    let user = await User.findOne({ email: email });

    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    let hashConfirmPassword = await bcrypt.hash(confirmPassword, salt);

    let currentTime = Date.now();
    if (currentTime > user.otpExpiry) {
      user.otp = undefined;
      user.otpExpiry = undefined;
      // delete user.otp;
      // delete user.otpExpiry;
      await user.save();
      res.status(400).json({
        result: "Otp Expired",
      });
    } else {
      if (user.otp != otp) {
        res.status(404).json({
          result: "wrong otp",
        });
      } else {
        user = await User.findOne({ otp, email });
        user.otp = undefined;
        user.otpExpiry = undefined;
        user.password = hashPassword;
        user.confirmPassword = hashConfirmPassword;
        // delete user.otp;
        // delete user.otpExpiry;
        await user.save();
        res.status(201).json({
          user: user,
          message: "User password reset",
        });
      }
    }
    // key delete -> get the document obj -> modify that object by removing useless keys
    // save to save this doc in db
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

function otpGenerator() {
  return Math.floor(100000 + Math.random() * 900000);
}

module.exports = router;
