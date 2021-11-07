const { Router } = require('express');
const router = Router();
const authController = require("../Controllers/auth");
const validator = require("../Helpers/Validator/auth");
const {check} = require("express-validator");

router.post("/register", validator.registerValidator, authController.register);
router.post("/login", authController.verifyUser);
router.post("/sendOTP", [
    check('email', "Enter a valid email!!").isEmpty().isEmail().normalizeEmail()
        .custom(async (email) => {
            const existingUser = await User.query().where("email", email);
            if (existingUser) {
                throw new Error('Email already in use');
            }
        })
], authController.sendOTP);


module.exports = router;