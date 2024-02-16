const mongoose = require("mongoose");
const UserModel = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://e7.pngegg.com/pngimages/442/17/png-clipart-computer-icons-user-profile-male-user-heroes-head-thumbnail.png",
  },
  password: {
    type: String,
  },
  savedProperties: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Property",
  },
  otp: {
    type: Number,
  },
});
const User = mongoose.model("User", UserModel);
module.exports = User;
