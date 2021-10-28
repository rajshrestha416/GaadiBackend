const {Router} = require('express')
const router = Router()
const TrainingController = require("../Controllers/training")
const upload = require("../Middlewares/upload")

router.post("/",upload.fields([{name:"image",maxCount:8}]),TrainingController.addTraining)
router.get("/",TrainingController.showTrainings)
router.get("/:_id",TrainingController.showTraining)
router.put("/:_id",upload.fields([{name:"image",maxCount:8}]),TrainingController.updateTraining)
router.delete("/:_id",TrainingController.deleteTraining)

module.exports = router