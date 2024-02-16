var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const userController = require("../controllers/user");
const auth = require("../libs/auth_user");

const signupCheck = [
  check("name", "Name field is required").notEmpty(),
  check("email", "Please enter valid email").isEmail().notEmpty(),
  check("password", "Please enter password of minimum 8 characters")
    .notEmpty()
    .isLength({ min: 8 }),
  check("phoneNumber")
    .notEmpty()
    .isLength({ min: 10 })
    .isMobilePhone("en-IN")
    .withMessage("Please enter a valid phone number"),
];
const loginCheck = [
  check("email", "Please enter valid email").isEmail().notEmpty(),
  check("password", "Please enter password of minimum 8 characters")
    .notEmpty()
    .isLength({ min: 8 }),
];
const updatePassCheck = [
  check("password", "Please enter password of minimum 8 characters")
    .notEmpty()
    .isLength({ min: 8 }),
];
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/signup", signupCheck, function (req, res) {
  userController.signupFunc(req, res);
});
router.post("/login", loginCheck, (req, res) => {
  userController.loginFunc(req, res);
});
router.post("/verify", (req, res) => {
  userController.verifyFunc(req, res);
});
router.post("/verifyotp", (req, res) => {
  userController.verifyOTPFunc(req, res);
});
router.get("/getuser", auth, (req, res) => {
  userController.getUserInfoFunc(req, res);
});
router.post("/updateInfo", auth, (req, res) => {
  userController.updateUserInfoFunc(req, res);
});
router.post("/updatePass", updatePassCheck, (req, res) => {
  userController.updatePasswordFunc(req, res);
});
module.exports = router;
