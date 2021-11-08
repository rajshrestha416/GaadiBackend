const Decoration = require("../Models/decoration");

class DecorationController {
    async addDecoration(req, res) {
        let image = req.files.image.map(v=>{
            return v.path
        })
        let data = {
            title: req.body.title,
            price: req.body.price,
            make: req.body.make,
            model: req.body.model,
            image: image,
            contacts: req.body.contact,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            user_id: req.body.user_id
        };
        try {
            const result = await Decoration.query().insert(data);

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Decoration Added",
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
                message: "Failed to add Decoration",
                error: err
            });
        }
    }

    async showDecorations(req, res) {
        try {
            const result = await Decoration.query().select("*");

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Availabe Decorations",
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to retrieve Decorations",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve Decorations",
                error: err
            });
        }
    }

    async showDecoration(req, res) {
        try {
            const result = await Decoration.query().select("*").findById(req.params._id) 

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Decoration Details of ID: " + req.params._id,
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to retrieve Decoration of ID: " + req.params._id,
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve Decoration of ID: " + req.params._id,
                error: err
            });
        }
    }

    async updateDecoration(req, res) {
        let image = req.files.image.map(v=>{
            return v.path
        })
        let data = {
            title: req.body.title,
            price: req.body.price,
            make: req.body.make,
            model: req.body.model,
            image: image,
            contacts: req.body.contact,
            location: req.body.location
        };
        let id = req.params._id;
        try {
            const logg = Decoration.query().select("*").findById(req.params._id)
            console.log(logg)
            const result = await Decoration.query().findById(id).patch(data)

            if (result) {
                res.status(200).json({
                    success: true,
                    message: `Updated the Decoration Details of ID: ${id}`
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: `Failed to Update the Decoration`,
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to Update the Decoration",
                error: err
            });
        }
    }

    async deleteDecoration(req, res) {
        let id = req.params._id;
        try {
            const result = await Decoration.query().deleteById(id)

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Deleted the Decoration."
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to delete the Decoration",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to delete the Decoration",
                error: err
            });
        }
    }
}

module.exports = new DecorationController;