const Specification = require("../Models/c_specifiation");

// class SpecificationController {
//     async addSpecification(req, res) {
//         let specification = []
        
//         req.body.key.map((v,k)=>{
//             specification.push(`${v}:${req.body.value[k]}`)
//         })
        
//         let data = {
//             title: req.body.name,
//             specification,
//             vehicle_id: req.body.vehicle_id
//         };
//         try {
//             const result = await Specification.query().insert(data);

//             if (result) {
//                 res.status(200).json({
//                     success: true,
//                     message: "Specification Added",
//                     result: result
//                 });
//             }
//             else {
//                 res.status(400).json({
//                     success: false,
//                     message: "Something Went wrong",
//                 });
//             }
//         }
//         catch (err) {
//             res.status(400).json({
//                 success: false,
//                 message: "Failed to add the Specification",
//                 error: err
//             });
//         }

//     }

//     async showSpecifications(req, res) {
//         try {
//             const result = await Specification.query().select("*");

//             if (result) {
//                 res.status(200).json({
//                     success: true,
//                     message: "Availabe Specifications",
//                     result: result
//                 });
//             }
//             else {
//                 res.status(400).json({
//                     success: false,
//                     message: "Failed to retrieve the Specifications",
//                 });
//             }
//         }
//         catch (err) {
//             res.status(400).json({
//                 success: false,
//                 message: "Failed to retrieve the Specifications",
//                 error: err
//             });
//         }
//     }

//     async showSpecification(req, res) {
//         try {
//             const result = await Specification.query().select("*").findById(req.params._id) 

//             if (result) {
//                 res.status(200).json({
//                     success: true,
//                     message: "Specification Details of SpecificationID: " + req.params._id,
//                     result: result
//                 });
//             }
//             else {
//                 res.status(400).json({
//                     success: false,
//                     message: "Failed to retrieve Specification of ID: " + req.params._id,
//                 });
//             }
//         }
//         catch (err) {
//             res.status(400).json({
//                 success: false,
//                 message: "Failed to retrieve Specification of ID: " + req.params._id,
//                 error: err
//             });
//         }
//     }

//     async updateSpecification(req, res) {
//         let specification = []
        
//         req.body.key.map((v,k)=>{
//             specification.push(`${v}:${req.body.value[k]}`)
//         })
        
//         let data = {
//             title: req.body.name,
//             specification,
//             vehicle_id: req.body.vehicle_id
//         };
//         let id = req.params._id;
//         try {
//             const result = await Specification.query().findById(id).patch(data)

//             if (result) {
//                 res.status(200).json({
//                     success: true,
//                     message: `Updated the Specification Details of Specification_id ${id}`
//                 });
//             }
//             else {
//                 res.status(400).json({
//                     success: false,
//                     message: `Failed to Update the Specification`,
//                 });
//             }
//         }
//         catch (err) {
//             res.status(400).json({
//                 success: false,
//                 message: "Failed to Update the Specification",
//                 error: err
//             });
//         }
//     }

//     async deleteSpecification(req, res) {
//         let id = req.params._id;
//         try {
//             const result = await Specification.query().deleteById(id)

//             if (result) {
//                 res.status(200).json({
//                     success: true,
//                     message: "Deleted the Specification."
//                 });
//             }
//             else {
//                 res.status(400).json({
//                     success: false,
//                     message: "Failed to delete the Specification",
//                 });
//             }
//         }
//         catch (err) {
//             res.status(400).json({
//                 success: false,
//                 message: "Failed to delete the Specification",
//                 error: err
//             });
//         }
//     }
// }

// module.exports = new SpecificationController;