const Event = require("../Models/event");

class EventController {
    async addEvent(req, res) {
        let data = {
            event_name: req.body.event_name,
            event_date: req.body.event_date,
            location: req.body.location,
            user_id: req.body.user_id
        };
        try {
            const result = await Event.query().insert(data);

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Event Added",
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
                message: "Failed to add the Event",
                error: err
            });
        }

    }

    async showEvents(req, res) {
        try {
            const result = await Event.query().select("*");

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Availabe Events",
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to retrieve the Events",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve the Events",
                error: err
            });
        }
    }

    async showEvent(req, res) {
        try {
            const result = await Event.query().select("*").findById(req.params._id) 

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Event Details of EventID: " + req.params._id,
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to retrieve Event of ID: " + req.params._id,
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve Event of ID: " + req.params._id,
                error: err
            });
        }
    }

    async updateEvent(req, res) {
        let data = req.body;
        let id = req.params._id;
        try {
            const result = await Event.query().findById(id).patch(data)

            if (result) {
                res.status(200).json({
                    success: true,
                    message: `Updated the Event Details of Event_id ${id}`
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: `Failed to Update the Event`,
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to Update the Event",
                error: err
            });
        }
    }

    async deleteEvent(req, res) {
        let id = req.params._id;
        try {
            const result = await Event.query().deleteById(id)

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Deleted the Event."
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to delete the Event",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to delete the Event",
                error: err
            });
        }
    }
}

module.exports = new EventController;