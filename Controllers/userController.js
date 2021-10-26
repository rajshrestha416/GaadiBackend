const User = require("../Models/user")

class UserController {
    
    async retrieveUser(req,res){
        try {
            const result = await User.query().findById(req.params._id)

            if (result) {
                res.status(200).json({
                    success: true,
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to retrieve user",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve user",
                error: err
            });
        }
    }


    async retrieveAllUser(req,res){
        try {
            const result = await User.query().select("*");

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Availabe Users",
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to retrieve User",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to retrieve Users",
                error: err
            });
        }
    }

    async updateUser(req,res){
        let data = req.body
        try {
            const result = await User.query().findById(req.params._id).patch(data)

            if (result) {
                res.status(200).json({
                    success: true,
                    message: "User detail updated",
                    result: result
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Failed to update user",
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Failed to update user",
                error: err
            });
        }
   }
   
//    async deactivateUser(req,res){

//    }
}

module.exports = new UserController