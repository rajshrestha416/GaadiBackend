const {Router} = require('express')
const router = Router()
const WorkShopController = require("../Controllers/workshop")
const upload = require("../Middlewares/upload")
const auth = require("../Middlewares/auth")

router.post("/", auth.verifyUser, upload.fields([
    {name:"image",maxCount:8},
    {name:"features",maxCount:8}
]), WorkShopController.addWorkShop)
router.get("/", auth.verifyUser, WorkShopController.showWorkShops)
router.get("/:_id", auth.verifyUser, WorkShopController.showWorkShop)
router.put("/:_id", auth.verifyUser, WorkShopController.updateWorkShop)
router.delete("/:_id", auth.verifyUser, WorkShopController.deleteWorkShop)

module.exports = router