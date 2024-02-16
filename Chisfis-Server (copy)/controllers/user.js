const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const { validationResult } = require("express-validator");

const signupFunc = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(200).json({
        error: true,
        result: result.errors[0],
      });
    }
    const { name, email, password, dateOfBirth, phoneNumber } = req.body;

    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      return res
        .status(200)
        .json({ message: "Email already present!", error: true });
    }
    const hashedPass = await bcrypt.hash(password, 10); //hashed here

    const newUser = new userModel({
      name,
      email,
      password: hashedPass,
      dateOfBirth,
      phoneNumber,
    });
    const userSave = await newUser.save();

    if (userSave) {
      res
        .status(200)
        .json({ message: "user created successfully!", error: false });
    } else {
      res.status(200).json({ message: "no data is submitted!", error: true });
    }
  } catch (err) {
    res.status(200).json({
      message: err.message || "something went wrong in creating user account",
      error: true,
    });
  }
};

const loginFunc = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const { email, password } = req.body;
    const dbUser = await userModel.findOne({ email });
    if (!dbUser) {
      return res.status(200).json({ message: "email not found", error: true });
    }
    const passwordMatch = await bcrypt.compare(password, dbUser.password); //unhashed and compared

    if (!passwordMatch) {
      return res
        .status(200)
        .json({ message: "password is incorrect", error: true });
    }
    const token = jwt.sign({ UserId: dbUser._id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .json({ message: "login successful", error: false, dbUser, token });
  } catch (err) {
    res
      .status(200)
      .json({ message: err.message || "Something went wrong", error: true });
  }
};

const verifyFunc = async (req, res) => {
  // const twilio = require("twilio");

  // const accountSid = "ACca2adb0f3564c4eff00c99203bd8ce79";
  // const authToken = "f412b7fc21b7ca46fde1c1a4583271b7";
  // const twilioPhone = '+18324974153';

  // const client = twilio(accountSid, authToken);

  try {
    const { email } = req.body;
    const dbUser = await userModel.findOne({ email });

    if (!dbUser) {
      return res.status(200).json({ message: "email not found", error: true });
    }
    if (dbUser) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      dbUser.otp = otp;
      await dbUser.save();

      console.log("Generated OTP:", otp);
      // return res
      //   .status(200)
      //   .json({ message: "otp sent to mail ID", error: false });

      // Send OTP via SMS using Twilio
      // const message = await client.messages.create({
      //   body: `hello how r u ${otp}`,
      //   from: twilioPhone,
      //   to: '+918169301845', // Replace with the user's actual phone number
      // });

      // console.log('Twilio response:', message);

      return res
        .status(200)
        .json({ message: "OTP sent to the phone number", error: false });
    }
  } catch (err) {
    res.status(200).json({
      message: err.message || "Something went wrong in forget password",
      error: true,
    });
  }
};
const verifyOTPFunc = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const dbUser = await userModel.findOne({ email: email });
    if (!dbUser) {
      return res.status(200).json({ message: "Invalid OTP!", error: true });
    }
    if (Number(dbUser.otp) === Number(otp)) {
      const token = jwt.sign({ UserId: dbUser._id }, process.env.SECRET, {
        expiresIn: "7d",
      });
      return res
        .status(200)
        .json({ message: "otp verified!", error: false, token });
    } else {
      return res
        .status(200)
        .json({ message: "otp does not match!", error: true });
    }
  } catch (err) {
    res.status(200).json({
      message: err.message || "Something went wrong in otp login",
      error: true,
    });
  }
};

const getUserInfoFunc = async (req, res) => {
  try {
    const userdata = await userModel.findOne({
      _id: req.decodedToken.UserId,
    });
    res
      .status(200)
      .json({ message: "user data getuserinfo:", userdata, error: false });
  } catch (err) {
    res.status(200).json({
      message: err.message || "something went wrong in getting userinfo",
      error: true,
    });
  }
};

const updateUserInfoFunc = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, email, dateOfBirth, phoneNumber, image } = req.body;
    const emailExists = await userModel.findOne({ email, _id: { $ne: id } });
    if (emailExists) {
      return res
        .status(200)
        .json({ message: "Email already present!", error: true });
    }
    const updateOne = await userModel.findByIdAndUpdate(
      id,
      { name, email, dateOfBirth, phoneNumber, image },
      { new: true }
    );
    res.status(200).json({ message: "updated successfully!", error: false });
  } catch (err) {
    res.status(200).json({
      message: err.message || "something went wrong in updating user",
      error: true,
    });
  }
};

const updatePasswordFunc = async (req, res) => {
  try {
    const { id } = req.query;
    const { password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10); //hashed here
    const updatePassword = await userModel.findByIdAndUpdate(id, {
      password: hashedPass,
    });
    res
      .status(200)
      .json({ message: "password changed successfully", error: false });
  } catch (err) {
    res.status(200).json({
      message: err.message || "something went wrong in change password",
      error: true,
    });
  }
};

// const addFavouritesFunc = async (req, res) => {

// };

module.exports = {
  signupFunc,
  loginFunc,
  verifyFunc,
  verifyOTPFunc,
  getUserInfoFunc,
  updateUserInfoFunc,
  updatePasswordFunc,

  // addFavouritesFunc,
};
