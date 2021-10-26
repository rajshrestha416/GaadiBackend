const {Router} = require('express')
const router = Router()
const JobController = require("../Controllers/jobController")

router.post("/",JobController.addJob)
router.get("/",JobController.showJobs)
router.get("/:_id",JobController.showJob)
router.put("/:_id",JobController.updateJob)
router.delete("/:_id",JobController.deleteJob)

module.exports = router