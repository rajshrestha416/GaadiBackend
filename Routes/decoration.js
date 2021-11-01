const express = require("express")
const router = express.Router()
const decorationController = require("../Controllers/decoration")
const upload = require("../Middlewares/upload")
const auth = require("../Middlewares/auth")

router.get("/", auth.verifyUser, decorationController.showDecorations)
router.get("/:_id", auth.verifyUser, decorationController.showDecoration)
router.post("/",auth.verifyUser, upload.fields([{name:"image",maxCount:8}]),decorationController.addDecoration)
router.put("/:_id",auth.verifyUser, upload.fields([{name:"image",maxCount:8}]),decorationController.updateDecoration)
router.delete("/:_id",auth.verifyUser, decorationController.deleteDecoration)

module.exports = router