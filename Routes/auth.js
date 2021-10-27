const {Router} = require('express')
const router = Router()
const authController = require("../Controllers/auth")

router.post("/register",authController.register)
router.post("/login",authController.verifyUser)
router.post("/sendOTP",authController.sendOTP)


module.exports = router