const Parts = require("../Models/parts");

class PartsController {
    async addParts(req, res) {
        console.log(req.files);
        console.log(req.body);
        let image = req.files.image.map(v => {
            return v.path;
        });

        let data = {
            title: req.body.title,
            price: req.body.price,
            // description: req.body.description,
            make: req.body.make,
            model: req.body.model,
            contacts: typeof(req.body.contact) == "string" ? JSON.parse(req.body.contact) : req.body.contact,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            // location: req.body.location == undefined ? [] : JSON.parse(req.body.location),
            specification: typeof(req.body.specification) == "string" ? JSON.parse(req.body.specification) : req.body.specification,
            image,
            user_id: req.body.user_id
        };
        console.log(data);
        try {
            const result = await Parts.query().insert(data);

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Parts Added",
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
                message: "Failed to add Parts",
                error: err
            });
        }

    }

    async showAllParts(req, res) {
        try {
            const result = await Parts.query().withGraphFetched("user").select("*").orderBy("id", "desc");;
            result.map(v => {
                v.specification = v.specification.map(spec => {
                    return JSON.parse(spec);
                });
            });
            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Availabe Parts",
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to retrieve Parts",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve Parts",
                error: err
            });
        }
    }

    async showParts(req, res) {

        try {
            const result = await Parts.query().select("*").withGraphFetched("user").findById(req.params._id);
            result.specification = result.specification.map(v => {
                return JSON.parse(v);
            });
            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Parts Details of" + req.params._id,
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to retrieve Parts of " + req.params._id,
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve Parts of " + req.params._id,
                error: err
            });
        }
    }

    async updateParts(req, res) {
        let data = req.body;
        let id = req.params._id;
        try {
            const result = await Parts.query().findById(id).patch(data);

            if (result) {
                res.status(200).json({
                    success: true,
                    message: `Updated the Parts Details of Parts_id ${id}`
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: `Failed to Update the Parts`,
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to Update the Parts",
                error: err
            });
        }
    }

    async deleteParts(req, res) {
        let id = req.params._id;
        try {
            const result = await Parts.query().deleteById(id);

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Deleted the Parts."
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to delete the Parts",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to delete the Parts",
                error: err
            });
        }
    }

    async searchParts(req, res) {
        const searchObj = req.params.searchObj;
        try {
            let results = await Parts.query().select("*")
                .withGraphFetched("user")
                .where('title', 'ilike', `%${searchObj}%`)
                .orWhere('model', 'ilike', `%${searchObj}%`)
                .orWhere('make', 'ilike', `%${searchObj}%`)
                // .orWhere('description', 'ilike', `%${searchObj}%`)
                .orderBy("id", "desc");

            if (results) {
                results.map(result => {
                    result.specification = result.specification.map(v => {
                        return JSON.parse(v);
                    });
                    console.log(result.specification);
                });
                res.status(200).json({
                    success: true,
                    message: "Parts found",
                    result: results
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: "No parts found"
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to find " + searchObj,
                error: err
            });
        }
    }

}

module.exports = new PartsController;