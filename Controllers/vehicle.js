const Vehicle = require("../Models/vehicle");
const Specification = require("../Models/c_specifiation");
const { getVehicle } = require("../Models/c_specifiation");
const { json } = require("express");

class VehicleController {
    async addVehicle(req, res) {
        let features = [];
        // let image = ["img1"];
        let image = req.files.image.map(v => {
            return v.path;
        });

        let feature_image = req.files.features;
        req.body.features.map((v, k) => {
            features.push(`{${v}:${feature_image[k].path}}`);
        });
        console.log(features);
        let data = {
            title: req.body.title,
            model: req.body.model,
            make: req.body.make,
            price: req.body.price,
            color: req.body.color == undefined ? [] : req.body.color,
            image,
            location: req.body.location == undefined ? [] : req.body.location,
            features,
            contacts: req.body.contact,
            user_id: req.body.user_id
        };
        console.log(req.body.specification);
        try {
            const result = await Vehicle.query().insert(data);

            if (result) {
                let specifications = req.body.specification;
                for (let i = 0; i < specifications.length; i++) {
                    let spec = JSON.parse(specifications[i]);
                    console.log("KEY :: ",spec.key);
                    let specification = [];

                    spec.key.map((j, i) => {
                        specification.push(`${j}`);
                    });

                    let data = {
                        title: spec.title,
                        specs: specification,
                        vehicle_id: result.id
                    };
                    console.log(data);

                    try {
                        const result = await Specification.query().insert(data);
                    }
                    catch (err) {
                        return res.status(401).json({
                            success: false,
                            message: "Unable to add the Specification",
                            error: err
                        });
                    }
                }
                return res.status(200).json({
                    success: true,
                    message: "Vehicle and Specification Added"
                });
            }
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({
                success: false,
                message: "Failed to add the Vehicle",
                error: err
            });
        }

    }

    async showVehicle(req, res) {
        let id = req.params._id;
        console.log(id);
        try {
            const vehicle = await Vehicle.query().withGraphFetched("user").findById(id);
            const specifications = await Specification.query().select("*").where("vehicle_id", id);
            const result = {
                id: vehicle.id,
                title: vehicle.title,
                model: vehicle.model,
                make: vehicle.make,
                location: vehicle.location,
                contact: vehicle.contacts,
                features: vehicle.features.map(v => {
                    return JSON.parse(v);
                }),
                user: `${vehicle.user.firstname} ${vehicle.user.lastname}`,
                user: vehicle.user,
                specifications: specifications.map(v => {
                    let specs = v.specs.map(s => {
                        return JSON.parse(s);
                    });
                    return {
                        title: v.title,
                        specs: specs
                    };
                }),
            };
            return res.status(200).json({
                success: true,
                message: "Vehicle Details of VehicleID: " + req.params._id,
                result: result
            });
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve Vehicle of ID: " + req.params._id,
                error: err
            });
        }
    }

    async showVehicles(req, res) {
        try {
            const result = await Vehicle.query().withGraphFetched("user");

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

    async updateVehicle(req, res) {
        let data = req.body;
        let id = req.params._id;
        try {
            const result = await Vehicle.query().findById(id).patch(data);

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
            const result = await Vehicle.query().deleteById(id);

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



    // async addSpecification(spec, vehicle_id) {
    //     console.log(vehicle_id, spec);
    //     let specification = [];

    //     spec.key.map((v, k) => {
    //         specification.push(`${v.key}:${v.value[k]}`);
    //     });

    //     let data = {
    //         title: spec.title,
    //         specs: specification,
    //         vehicle_id
    //     };
    //     try {
    //         const result = await Specification.query().insert(data);
    //         if (!result) {
    //             return res.status(400).json({
    //                 success: false,
    //                 message: "Unable to add the Specification",
    //             });
    //         }
    //     }
    //     catch (err) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "Unable to add the Specification",
    //             error: err
    //         });
    //     }

    // }

    // async showSpecifications(req, res) {
    //     try {
    //         const result = await Specification.query().select("*");

    //         if (result) {
    //             res.status(200).json({
    //                 success: true,
    //                 message: "Availabe Specifications",
    //                 result: result
    //             });
    //         }
    //         else {
    //             res.status(400).json({
    //                 success: false,
    //                 message: "Failed to retrieve the Specifications",
    //             });
    //         }
    //     }
    //     catch (err) {
    //         res.status(400).json({
    //             success: false,
    //             message: "Failed to retrieve the Specifications",
    //             error: err
    //         });
    //     }
    // }

    // async showSpecification(req, res) {
    //     try {
    //         const result = await Specification.query().select("*").findById(req.params._id);

    //         if (result) {
    //             res.status(200).json({
    //                 success: true,
    //                 message: "Specification Details of SpecificationID: " + req.params._id,
    //                 result: result
    //             });
    //         }
    //         else {
    //             res.status(400).json({
    //                 success: false,
    //                 message: "Failed to retrieve Specification of ID: " + req.params._id,
    //             });
    //         }
    //     }
    //     catch (err) {
    //         res.status(400).json({
    //             success: false,
    //             message: "Failed to retrieve Specification of ID: " + req.params._id,
    //             error: err
    //         });
    //     }
    // }

    // async updateSpecification(req, res) {
    //     let specification = [];

    //     req.body.key.map((v, k) => {
    //         specification.push(`${v}:${req.body.value[k]}`);
    //     });

    //     let data = {
    //         title: req.body.name,
    //         specification,
    //         vehicle_id: req.body.vehicle_id
    //     };
    //     let id = req.params._id;
    //     try {
    //         const result = await Specification.query().findById(id).patch(data);

    //         if (result) {
    //             res.status(200).json({
    //                 success: true,
    //                 message: `Updated the Specification Details of Specification_id ${id}`
    //             });
    //         }
    //         else {
    //             res.status(400).json({
    //                 success: false,
    //                 message: `Failed to Update the Specification`,
    //             });
    //         }
    //     }
    //     catch (err) {
    //         res.status(400).json({
    //             success: false,
    //             message: "Failed to Update the Specification",
    //             error: err
    //         });
    //     }
    // }

    // async deleteSpecification(req, res) {
    //     let id = req.params._id;
    //     try {
    //         const result = await Specification.query().deleteById(id);

    //         if (result) {
    //             res.status(200).json({
    //                 success: true,
    //                 message: "Deleted the Specification."
    //             });
    //         }
    //         else {
    //             res.status(400).json({
    //                 success: false,
    //                 message: "Failed to delete the Specification",
    //             });
    //         }
    //     }
    //     catch (err) {
    //         res.status(400).json({
    //             success: false,
    //             message: "Failed to delete the Specification",
    //             error: err
    //         });
    //     }
    // }
}

module.exports = new VehicleController;