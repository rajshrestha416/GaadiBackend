const {Router} = require('express')
const router = Router()
const WorkShopController = require("../Controllers/workshop")
const upload = require("../Middlewares/upload")

router.post("/", upload.fields([
    {name:"image",maxCount:8},
    {name:"features",maxCount:8}
]), WorkShopController.addWorkShop)
router.get("/",WorkShopController.showWorkShops)
router.get("/:_id",WorkShopController.showWorkShop)
router.put("/:_id",WorkShopController.updateWorkShop)
router.delete("/:_id",WorkShopController.deleteWorkShop)

module.exports = router