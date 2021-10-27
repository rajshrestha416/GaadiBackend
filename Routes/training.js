const {Router} = require('express')
const router = Router()
const TrainingController = require("../Controllers/training")

router.post("/",TrainingController.addTraining)
router.get("/",TrainingController.showTrainings)
router.get("/:_id",TrainingController.showTraining)
router.put("/:_id",TrainingController.updateTraining)
router.delete("/:_id",TrainingController.deleteTraining)

module.exports = router