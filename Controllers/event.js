const Job = require("../Models/event");

class EventController {
    async addEvent(req, res) {
        let data = {
            event_name: req.body.name,
            event_date: req.body.description,
            location: req.body.salary,
            user_id: req.body.user_id
        };
        try {
            const result = await Job.query().insert(data);

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

    async showJobs(req, res) {
        try {
            const result = await Job.query().select("*");

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

    async showJob(req, res) {
        try {
            const result = await Job.query().select("*").findById(req.params._id) 

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

    async updateJob(req, res) {
        let data = req.body;
        let id = req.params._id;
        try {
            const result = await Job.query().findById(id).patch(data)

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

    async deleteJob(req, res) {
        let id = req.params._id;
        try {
            const result = await Job.query().deleteById(id)

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