const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = {
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm Password is required"],
    validate: {
      validator: function () {
        return this.password === this.confirmPassword;
      },
      message: "Passwords do not match",
    },
  },
  // profilePic: {
  //   name: String,
  //   desc: String,
  //   img: {
  //     data: Buffer,
  //     contentType: String,
  //   },
  // },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  profilePic: {
    type: String,
    default: "",
  },
};

module.exports = mongoose.model("myUser", UserSchema);
