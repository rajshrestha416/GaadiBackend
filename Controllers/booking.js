const Booking = require("../Models/booking");

class BookingController {
    async addBooking(req, res) {
        let data = {
            sender: req.body.sender,
            receiver: req.body.receiver,
            vehicle_id: req.body.vehicle_id,
            user_id: req.body.user_id
        };
        try {
            const result = await Booking.query().insert(data);

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Booking Added",
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Something Went wrong",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to add Booking",
                error: err
            });
        }
    }

    async showBookings(req, res) {
        try {
            const result = await Booking.query().select("*");

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Availabe Bookings",
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to retrieve Bookings",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve Bookings",
                error: err
            });
        }
    }

    async deleteBooking(req, res) {
        let id = req.params._id;
        try {
            const result = await Booking.query().deleteById(id);

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Deleted the Booking."
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to delete the Booking",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to delete the Booking",
                error: err
            });
        }
    }

    async showByUser(req, res) {
        let user = req.params._id;
        let incoming, outgoing = [];
        try {
            incoming = await Booking.query()
                .eager("sender", "receiver", "vehicle")
                .select("*").where("receiver", user);

            outgoing = await Booking.query()
                .eager("sender", "receiver", "vehicle")
                .select("*").where("sender", user);

            res.status(200).json({
                success: true,
                message: "Availabe Bookings",
                result: {
                    incoming, outgoing
                }
            });
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve Bookings",
                error: err
            });
        }

    }
}

module.exports = new BookingController;