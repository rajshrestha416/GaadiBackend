const Booking = require("../Models/booking");
// const PartsBooking = require("../Models/partsBooking");

class BookingController {
    async addBooking(req, res) {
        let data = {
            // sender_id: req.body.sender_id,
            // receiver_id: req.body.receiver_id,
            // status: req.body.status,
            // parts_id: req.body.parts_id
            sender: req.body.sender,
            receiver: req.body.receiver,
            status: req.body.status,
            vehicle_id: req.body.vehicle_id
        };
        try {
            console.log(data)
            // const result = await PartsBooking.query().insert(data);
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
<<<<<<< HEAD
            console.log(err);
=======
            console.log(err)
            res.status(400).json({
                success: false,
                message: "Failed to add Booking",
                error: err
            });
        }
    }

    async updateBooking(req, res) {
        let _id = req.params._id
        let data = {
            status: req.body.status,
        };
        try {
            const result = await Booking.query().findById(_id).patch(data);

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
>>>>>>> 3717371d1cdde8860cd0460da2a457afe7d86232
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