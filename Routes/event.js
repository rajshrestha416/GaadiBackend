const express = require("express")
const router = express.Router()
const eventController = require("../Controllers/event")

router.get("/",eventController.showEvents)
router.get("/:_id",eventController.showEvent)
router.post("/",eventController.addEvent)
router.put("/:_id",eventController.updateEvent)
router.delete("/:_id",eventController.deleteEvent)

module.exports = router