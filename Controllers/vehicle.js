const Vehicle = require("../Models/vehicle");
const Specification = require("../Models/c_specifiation");

class VehicleController {
    async addVehicle(req, res) {
        let features = [];
        let image = req.files.image.map(v => {
            return v.path;
        });

        let feature_image = req.files.features;
        let _features = typeof(req.body.features) == "string" ? JSON.parse(req.body.features) : req.body.features;
        _features.map((v, k) => {
            let key = ( typeof(v)=="string" ? v : JSON.stringify(v))
            features.push(`{${key}:${JSON.stringify(feature_image[k].path)}}`);
        });
        
        let data = {
            title: req.body.title,
            model: req.body.model,
            make: req.body.make,
            price: req.body.price,
            color: req.body.color == undefined ? [] : req.body.color,
            image,
            location: req.body.location == undefined ? [] : typeof(req.body.location) == "string" ? JSON.parse(req.body.location) : req.body.location,
            features,
            contacts: req.body.contacts == undefined ? [] : typeof(req.body.contact) == "string" ? JSON.parse(req.body.contact) : req.body.contact,
            user_id: req.body.user_id
        };

        try {
            const result = await Vehicle.query().insert(data);
            const vehicle = JSON.parse(JSON.stringify(result));
            vehicle.features = vehicle.features.map(v=>{
                return JSON.parse(v)
            })
            console.log(vehicle.features)
            var specs = []

            if (result) {
                var specifications 
                try{
                    specifications = JSON.parse(req.body.specification);
                }catch(e){
                    specifications = req.body.specification;
                }

                for (let i = 0; i < specifications.length; i++) {
                    try{
                        var spec = JSON.parse(specifications[i]);
                    }catch(e){
                        var spec = specifications[i];
                    }

                    let specification = [];
                    var _key = typeof(spec.key) == "string" ? JSON.parse(spec.key) : spec.key
                    _key.map((j, i) => {
                        specification.push(`${JSON.stringify(j)}`);
                    });

                    let data = {
                        title: spec.title,
                        specs: specification,
                        vehicle_id: result.id
                    };

                    try {
                        let result = await Specification.query().insert(data);
                        
                        let d = {
                            id: result.id,
                            title: result.title,
                            key: result.specs.map(v=>{return JSON.parse(v)})
                        }
                        specs.push(d)
                    }
                    catch (err) {
                        return res.status(400).json({
                            success: false,
                            message: "Unable to add the Specification",
                            error: err
                        });
                    }
                }
                vehicle.specifications = specs

                return res.status(200).json({
                    success: true,
                    message: "Vehicle and Specification Added",
                    result: vehicle
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
        try {
            const vehicle = await Vehicle.query().withGraphFetched("user").findById(id);
            const specifications = await Specification.query().select("*").where("vehicle_id", id);
            const specs = specifications.map(v => {
                let specs = v.specs.map(s => {
                    console.log(JSON.parse(s));
                    return JSON.parse(s);
                });
                return {
                    title: v.title,
                    key: specs
                };
            });
            const features = vehicle.features.map(v => {
                return JSON.parse(v);
            });
            const result = {
                id: vehicle.id,
                title: vehicle.title,
                model: vehicle.model,
                make: vehicle.make,
                price: vehicle.price,
                location: vehicle.location,
                contact: vehicle.contacts,
                image: vehicle.image,
                features: features,
                user: `${vehicle.user.firstname} ${vehicle.user.lastname}`,
                user: vehicle.user,
                specification: JSON.parse(JSON.stringify(specs)),
            };
            console.log(result);
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
            result.map(v=>{
                v.features = v.features.map(v2=>{
                    console.log(v2)
                    return JSON.parse(v2)
                })
                return
            })

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
        console.log(id);
        try {
            await Specification.query().delete().where("vehicle_id", id)
                .then(async (result) => {
                    console.log(result);
                    if (result > 0) {
                        await Vehicle.query().deleteById(id).then(() => {
                            if (result > 0) {
                                    return res.status(200).json({
                                        success: true,
                                        message: "Deleted the Vehicle."
                                    });
                            }
                            else {
                                return res.status(200).json({
                                    success: false,
                                    message: "failed to delete the Vehicle."
                                });
                            }
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: false,
                            message: "failed to delete the Vehicle."
                        });
                    }

                });
        }
        catch (err) {
            return res.status(400).json({
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
    //         const result = await Specification.query().where("vehicle_id":id);

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