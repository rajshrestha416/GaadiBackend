const {Router} = require('express')
const router = Router()
const PartController = require("../Controllers/parts")
const upload = require("../Middlewares/upload")

router.post("/",upload.fields([{name:"image",maxCount:8}]),PartController.addParts)
router.get("/",PartController.showAllParts)
router.get("/:_id",PartController.showParts)
router.put("/:_id",upload.fields([{name:"image",maxCount:8}]),PartController.updateParts)
router.delete("/:_id",PartController.deleteParts)

module.exports = router