const {Router} = require('express')
const router = Router()
const PartController = require("../Controllers/parts")
const upload = require("../Middlewares/upload")
const auth = require("../Middlewares/auth")

router.post("/", auth.verifyUser, upload.fields([{name:"image",maxCount:8}]),PartController.addParts)
router.get("/", auth.verifyUser, PartController.showAllParts)
router.get("/:_id", auth.verifyUser, PartController.showParts)
router.get("/search/:searchObj", auth.verifyUser, PartController.searchParts)
router.put("/:_id", auth.verifyUser, upload.fields([{name:"image",maxCount:8}]),PartController.updateParts)
router.delete("/:_id", auth.verifyUser, PartController.deleteParts)
 
module.exports = router