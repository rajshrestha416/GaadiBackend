const {Router} = require('express')
const router = Router()
const userController = require("../Controllers/userController")

router.get("/",userController.retrieveAllUser)
router.get("/:_id",userController.retrieveUser)
router.put("/:_id",userController.updateUser)

module.exports = router