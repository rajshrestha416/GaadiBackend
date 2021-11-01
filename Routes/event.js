const express = require("express")
const router = express.Router()
const eventController = require("../Controllers/event")
const upload = require("../Middlewares/upload")
const auth = require("../Middlewares/auth")

router.get("/", auth.verifyUser, eventController.showEvents)
router.get("/:_id",auth.verifyUser, eventController.showEvent)
router.post("/",auth.verifyUser, upload.fields([{name:"image",maxCount:8}]),eventController.addEvent)
router.put("/:_id",auth.verifyUser, upload.fields([{name:"image",maxCount:8}]),eventController.updateEvent)
router.delete("/:_id", auth.verifyUser, eventController.deleteEvent)

module.exports = router