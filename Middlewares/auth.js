const jsw = require("jsonwebtoken");
const User = require("../Models/user");

module.exports.verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = jsw.verify(token, process.env.MY_SECRET_KEY);
        await User.query().where("id", user.ak)
            .then((userData) => {
                console.log(userData)
                req.user = userData;
            })
            .catch(err =>
                res.status(401).json({
                    success: false,
                    message: "Unauthorized user"
                }));
        next();
    }
    catch (e) {
        res.status(401).json({
            success: false,
            error: e
        });
    }
};

// module.exports.verifyAdmin = (req, res, next) => {
//     console.log(req.user)
//     if (!req.user) {
//         return res.status(401).json({
//             status: false,
//             message: "Unauthorised"
//         });
//     }
//     else if (req.user.role !== "Admin") {
//         return res.status(401).json({
//             status: false,
//             message: "Unauthorised"
//         });
//     }
//     next();
// };
