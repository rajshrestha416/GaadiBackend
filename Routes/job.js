const {Router} = require('express')
const router = Router()
const JobController = require("../Controllers/job")
const upload = require("../Middlewares/upload")

router.post("/",upload.fields([{name:"image",maxCount:8}]),JobController.addJob)
router.get("/",JobController.showJobs)
router.get("/:_id",JobController.showJob)
router.put("/:_id",upload.fields([{name:"image",maxCount:8}]),JobController.updateJob)
router.delete("/:_id",JobController.deleteJob)

module.exports = router