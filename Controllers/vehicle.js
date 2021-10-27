const Vehicle = require("../Models/vehicle");

class VehicleController {
    async addVehicle(req, res) {
        let data = {
            name: req.body.name,
            model_number: req.body.model_number,
            price: req.body.price,
            color: req.body.color,
            user_id: req.body.user_id
        };
        try {
            const result = await Vehicle.query().insert(data);

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Vehicle Added",
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
                message: "Failed to add the Vehicle",
                error: err
            });
        }

    }

    async showVehicles(req, res) {
        try {
            const result = await Vehicle.query().select("*");

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Availabe Vehicles",
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to retrieve the Vehicles",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve the Vehicles",
                error: err
            });
        }
    }

    async showVehicle(req, res) {
        try {
            const result = await Vehicle.query().select("*").findById(req.params._id) 

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Vehicle Details of VehicleID: " + req.params._id,
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to retrieve Vehicle of ID: " + req.params._id,
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve Vehicle of ID: " + req.params._id,
                error: err
            });
        }
    }

    async updateVehicle(req, res) {
        let data = req.body;
        let id = req.params._id;
        try {
            const result = await Vehicle.query().findById(id).patch(data)

            if (result) {
                res.status(200).json({
                    success: true,
                    message: `Updated the Vehicle Details of Vehicle_id ${id}`
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: `Failed to Update the Vehicle`,
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to Update the Vehicle",
                error: err
            });
        }
    }

    async deleteVehicle(req, res) {
        let id = req.params._id;
        try {
            const result = await Vehicle.query().deleteById(id)

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Deleted the Vehicle."
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to delete the Vehicle",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to delete the Vehicle",
                error: err
            });
        }
    }
}

module.exports = new VehicleController;