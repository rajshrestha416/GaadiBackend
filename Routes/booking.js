const express = require("express")
const router = express.Router()
const bookingController = require("../Controllers/booking")

router.get("/",bookingController.showBookings)
router.post("/",bookingController.addBooking)
router.get("/:_id",bookingController.showByUser)
router.delete("/:_id",bookingController.deleteBooking)

module.exports = router