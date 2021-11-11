const { Router } = require('express');
const router = Router();
const authController = require("../Controllers/auth");
const validator = require("../Helpers/Validator/auth");
const {check} = require("express-validator");

router.post("/verifyOTP", authController.register);
router.post("/login", authController.verifyUser);
router.post("/sendOTP" , authController.sendOTP);


module.exports = router;