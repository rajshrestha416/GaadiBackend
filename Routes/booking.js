const express = require("express")
const router = express.Router()
const bookingController = require("../Controllers/booking")
const auth = require("../Middlewares/auth")

router.get("/", auth.verifyUser, bookingController.showBookings)
router.post("/", auth.verifyUser, bookingController.addBooking)
router.get("/:_id", auth.verifyUser, bookingController.showByUser)
router.delete("/:_id", auth.verifyUser, bookingController.deleteBooking)

module.exports = router