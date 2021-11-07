const { check } = require('express-validator');
const User = require("../../Models/user");

exports.registerValidator = () => {
    [
        check('firstname', "First Name is required!!").not().isEmpty(),
        check('lastname', "Last Name is required!!").not().isEmpty(),
        check('email', "Enter a valid email!!").isEmail().normalizeEmail()
            .custom(async (email) => {
                const existingUser = await User.query().where("email", email);
                if (existingUser) {
                    throw new Error('Email already in use');
                }
            }),
        check('contact', "Contact is required!!").not().isEmpty(),
        check('password', "Password must be atleast of 8 character").not().isEmpty().isLength({ min: 8 }),
        check('otp', "otp is required!!").not().isEmpty(),
        check('hash', "hash is required!!").not().isEmpty()
    ];
};


// exports.otpValidator = 
//     [
//         check('email', "Enter a valid email!!").isEmpty().isEmail().normalizeEmail()
//         .custom(async (email) => {
//             const existingUser = await User.query().where("email", email);
//             if (existingUser) {
//                 throw new Error('Email already in use');
//             }
//         })
//     ]