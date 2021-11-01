const {Router} = require('express')
const router = Router()
const userController = require("../Controllers/user")
const auth = require("../Middlewares/auth")

router.get("/", userController.retrieveAllUser)
router.get("/:_id",userController.retrieveUser)
router.put("/:_id", auth.verifyUser, userController.updateUser)

module.exports = router