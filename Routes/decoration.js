const express = require("express")
const router = express.Router()
const decorationController = require("../Controllers/decoration")

router.get("/",decorationController.showDecorations)
router.get("/:_id",decorationController.showDecoration)
router.post("/",decorationController.addDecoration)
router.put("/:_id",decorationController.updateDecoration)
router.delete("/:_id",decorationController.deleteDecoration)

module.exports = router