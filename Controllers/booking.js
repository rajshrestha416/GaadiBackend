const Booking = require("../Models/booking");
// const PartsBooking = require("../Models/partsBooking");

class BookingController {
    async addBooking(req, res) {
        let data = {
            sender_id: req.body.sender_id,
            receiver_id: req.body.receiver_id,
            status: req.body.status,
            vehicle_id: req.body.vehicle_id
        };
        try {
            console.log(data);
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
            console.log(err);
            res.status(400).json({
                success: false,
                message: "Failed to add Booking",
                error: err
            });
        }
    }


    async updateBooking(req, res) {
        let _id = req.params._id;
        let data = {
            status: req.body.status,
        };
        
        try {
            const result = await Booking.query().findById(_id).patch(data);

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Update Success",
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
            const result = await Booking.query()
                .withGraphFetched("[sender,receiver,vehicle]")
                .select("status","id");

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
            console.log(err);
            res.status(400).json({
                success: false,
                message: "Failed to retrieve Bookings",
                error: err
            });
        }
    }


    async showBooking(req, res) {
        try {
            const result = await Booking.query().findById(req.params._id)
                .withGraphFetched("[sender,receiver,vehicle]")
                .select("status","id");

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
            console.log(err);
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
        console.log(user);
        let incoming, outgoing = [];
        try {
            incoming = await Booking.query()
                .withGraphFetched("[sender,receiver,vehicle]")
                .select("*").where("receiver_id", user);

            outgoing = await Booking.query()
                .withGraphFetched("[sender,receiver,vehicle]")
                .select("*").where("sender_id", user);

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