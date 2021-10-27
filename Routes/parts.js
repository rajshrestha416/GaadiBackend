const {Router} = require('express')
const router = Router()
const PartController = require("../Controllers/parts")

router.post("/",PartController.addParts)
router.get("/",PartController.showAllParts)
router.get("/:_id",PartController.showParts)
router.put("/:_id",PartController.updateParts)
router.delete("/:_id",PartController.deleteParts)

module.exports = router