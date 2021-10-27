const {Router} = require('express')
const router = Router()
const VehicleController = require("../Controllers/vehicle")

router.post("/",VehicleController.addVehicle)
router.get("/",VehicleController.showVehicles)
router.get("/:_id",VehicleController.showVehicle)
router.put("/:_id",VehicleController.updateVehicle)
router.delete("/:_id",VehicleController.deleteVehicle)

module.exports = router