const WorkShop = require("../Models/workshop");

class WorkShopController {
    async addWorkShop(req, res) {
        // console.log(req.files)
        let features=[]
        let image = req.files.image.map(v=>{
            return v.path
        })
        let feature_image = req.files.feature
        req.body.features.map((v,k)=>{
            features.push(`${v}:${feature_image[k].path}`)
        })
        let data = {
            title: req.body.title,
            price: req.body.price,
            make: req.body.make,
            model: req.body.model,
            contacts: req.body.contact,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            image: image,
            features: features,
            user_id: req.body.user_id
        };
        try {
            const result = await WorkShop.query().insert(data);

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "WorkShop Added",
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
                message: "Failed to add the WorkShop",
                error: err
            });
        }
    }

    async showWorkShops(req, res) {
        try {
            const result = await WorkShop.query().select("*");
            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Availabe WorkShops",
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to retrieve the WorkShops",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve the WorkShops",
                error: err
            });
        }
    }

    async showWorkShop(req, res) {
        try {
            const result = await WorkShop.query().select("*").findById(req.params._id) 

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "WorkShop Details of WorkShopID: " + req.params._id,
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to retrieve WorkShop of ID: " + req.params._id,
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve WorkShop of ID: " + req.params._id,
                error: err
            });
        }
    }

    async updateWorkShop(req, res) {
        let image = req.file.path
        let feature = req.body.feature
        let features = [`${feature}:${image}`]
        // console.log
        let data = {
            title: req.body.title,
            price: req.body.price,
            make: req.body.make,
            model: req.body.model,
            contacts: req.body.contact,
            location: req.body.location,
            features,
            user_id: req.body.user_id
        };
        let id = req.params._id;
        try {
            const result = await WorkShop.query().findById(id).patch(data)

            if (result) {
                res.status(200).json({
                    success: true,
                    message: `Updated the WorkShop Details of WorkShop_id ${id}`
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: `Failed to Update the WorkShop`,
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to Update the WorkShop",
                error: err
            });
        }
    }

    async deleteWorkShop(req, res) {
        let id = req.params._id;
        try {
            const result = await WorkShop.query().deleteById(id)

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Deleted the WorkShop."
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to delete the WorkShop",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to delete the WorkShop",
                error: err
            });
        }
    }
}

module.exports = new WorkShopController;