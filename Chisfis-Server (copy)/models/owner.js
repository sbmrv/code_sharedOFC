const mongoose = require("mongoose");
const OwnerModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://cdn2.vectorstock.com/i/1000x1000/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg",
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
  },
});
const Owner = mongoose.model("Owner", OwnerModel);
module.exports = Owner;
