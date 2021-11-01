const {Router} = require('express')
const router = Router()
const JobController = require("../Controllers/job")
const upload = require("../Middlewares/upload")
const auth = require("../Middlewares/auth")

router.post("/", auth.verifyUser, upload.fields([{name:"image",maxCount:8}]),JobController.addJob)
router.get("/", auth.verifyUser, auth.verifyUser,JobController.showJobs)
router.get("/:_id", auth.verifyUser, JobController.showJob)
router.put("/:_id", auth.verifyUser, upload.fields([{name:"image",maxCount:8}]),JobController.updateJob)
router.delete("/:_id", auth.verifyUser, JobController.deleteJob)

module.exports = router