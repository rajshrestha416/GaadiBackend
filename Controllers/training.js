const Training = require("../Models/training");

class TrainingController {
    async addTraining(req, res) {
        let data = {
            name: req.body.name,
            time_period: req.body.time_period,
            training_type: req.body.training_type,
            user_id: req.body.user_id
        };
        try {
            const result = await Training.query().insert(data);

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Training Added",
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
                message: "Failed to add the Training",
                error: err
            });
        }

    }

    async showTrainings(req, res) {
        try {
            const result = await Training.query().select("*");

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Availabe Trainings",
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to retrieve the Trainings",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve the Trainings",
                error: err
            });
        }
    }

    async showTraining(req, res) {
        try {
            const result = await Training.query().select("*").findById(req.params._id) 

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Training Details of TrainingID: " + req.params._id,
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to retrieve Training of ID: " + req.params._id,
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve Training of ID: " + req.params._id,
                error: err
            });
        }
    }

    async updateTraining(req, res) {
        let data = req.body;
        let id = req.params._id;
        try {
            const result = await Training.query().findById(id).patch(data)

            if (result) {
                res.status(200).json({
                    success: true,
                    message: `Updated the Training Details of Training_id ${id}`
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: `Failed to Update the Training`,
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to Update the Training",
                error: err
            });
        }
    }

    async deleteTraining(req, res) {
        let id = req.params._id;
        try {
            const result = await Training.query().deleteById(id)

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Deleted the Training."
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to delete the Training",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to delete the Training",
                error: err
            });
        }
    }
}

module.exports = new TrainingController;