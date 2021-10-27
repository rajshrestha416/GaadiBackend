// const Job = require("../Models/job");

// class JobController {
//     async addJob(req, res) {
//         let data = {
//             job_name: req.body.name,
//             description: req.body.description,
//             salary: req.body.salary,
//             time: req.body.time,
//             submission_deadline: req.body.submission_deadline,
//             user_id: req.body.user_id
//         };
//         try {
//             const result = await Job.query().insert(data);

//             if (result) {
//                 res.status(200).json({
//                     success: true,
//                     message: "Job Added",
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
//                 message: "Failed to add job",
//                 error: err
//             });
//         }

//     }

//     async showJobs(req, res) {
//         try {
//             const result = await Job.query().select("*");

//             if (result) {
//                 res.status(200).json({
//                     success: true,
//                     message: "Availabe jobs",
//                     result: result
//                 });
//             }
//             else {
//                 res.status(400).json({
//                     success: false,
//                     message: "Failed to retrieve jobs",
//                 });
//             }
//         }
//         catch (err) {
//             res.status(400).json({
//                 success: false,
//                 message: "Failed to retrieve jobs",
//                 error: err
//             });
//         }
//     }

//     async showJob(req, res) {
//         try {
//             const result = await Job.query().select("*").findById(req.params._id) 

//             if (result) {
//                 res.status(200).json({
//                     success: true,
//                     message: "Job Details of" + req.params._id,
//                     result: result
//                 });
//             }
//             else {
//                 res.status(400).json({
//                     success: false,
//                     message: "Failed to retrieve job of " + req.params._id,
//                 });
//             }
//         }
//         catch (err) {
//             res.status(400).json({
//                 success: false,
//                 message: "Failed to retrieve job of " + req.params._id,
//                 error: err
//             });
//         }
//     }

//     async updateJob(req, res) {
//         let data = req.body;
//         let id = req.params._id;
//         try {
//             const result = await Job.query().findById(id).patch(data)

//             if (result) {
//                 res.status(200).json({
//                     success: true,
//                     message: `Updated the Job Details of Job_id ${id}`
//                 });
//             }
//             else {
//                 res.status(400).json({
//                     success: false,
//                     message: `Failed to Update the Job`,
//                 });
//             }
//         }
//         catch (err) {
//             res.status(400).json({
//                 success: false,
//                 message: "Failed to Update the job",
//                 error: err
//             });
//         }
//     }

//     async deleteJob(req, res) {
//         let id = req.params._id;
//         try {
//             const result = await Job.query().deleteById(id)

//             if (result) {
//                 res.status(200).json({
//                     success: true,
//                     message: "Deleted the job."
//                 });
//             }
//             else {
//                 res.status(400).json({
//                     success: false,
//                     message: "Failed to delete the job",
//                 });
//             }
//         }
//         catch (err) {
//             res.status(400).json({
//                 success: false,
//                 message: "Failed to delete the job",
//                 error: err
//             });
//         }
//     }
// }

// module.exports = new JobController;