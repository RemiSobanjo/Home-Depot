const express = require("express");
const router = express.Router();
const {authValidation, otpValidation} = require("../validations/userValidation.js")

const usersController = require("../controllers/users.js");



router.post("/otp", otpValidation, usersController.getOTP);
router.post("/otp/resend", otpValidation, usersController.resendOTP);
router.put("/otp/validate", otpValidation, usersController.validateOTP);

router.post("/signup", authValidation, usersController.signUp);
router.post("/signin", authValidation, usersController.signIn);

module.exports = router