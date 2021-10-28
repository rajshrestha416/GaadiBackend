const express = require("express")
const router = express.Router()
const decorationController = require("../Controllers/decoration")
const upload = require("../Middlewares/upload")

router.get("/",decorationController.showDecorations)
router.get("/:_id",decorationController.showDecoration)
router.post("/",upload.fields([{name:"image",maxCount:8}]),decorationController.addDecoration)
router.put("/:_id",upload.fields([{name:"image",maxCount:8}]),decorationController.updateDecoration)
router.delete("/:_id",decorationController.deleteDecoration)

module.exports = router