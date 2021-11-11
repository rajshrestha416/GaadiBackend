const express = require("express")
const router = express.Router()
const bookingController = require("../Controllers/booking")
const auth = require("../Middlewares/auth")

router.post("/", auth.verifyUser, bookingController.addBooking)
router.get("/", auth.verifyUser, bookingController.showBookings)
router.get("/:_id", auth.verifyUser, bookingController.showBooking)
router.get("/byUser/:_id", auth.verifyUser, bookingController.showByUser)
router.put("/:_id", auth.verifyUser, bookingController.updateBooking)
router.delete("/:_id", auth.verifyUser, bookingController.deleteBooking)

module.exports = router