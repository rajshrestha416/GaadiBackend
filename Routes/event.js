const express = require("express")
const router = express.Router()
const eventController = require("../Controllers/event")
const upload = require("../Middlewares/upload")

router.get("/",eventController.showEvents)
router.get("/:_id",eventController.showEvent)
router.post("/",upload.fields([{name:"image",maxCount:8}]),eventController.addEvent)
router.put("/:_id",upload.fields([{name:"image",maxCount:8}]),eventController.updateEvent)
router.delete("/:_id",eventController.deleteEvent)

module.exports = router