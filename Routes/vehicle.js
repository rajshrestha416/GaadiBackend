const { Router } = require('express');
const router = Router();
const VehicleController = require("../Controllers/vehicle");
const upload = require("../Middlewares/upload")

router.post("/", upload.fields([
    { name: "image", maxCount: 8 },
    { name: "features", maxCount: 8 }
]), VehicleController.addVehicle);
router.get("/", VehicleController.showVehicles);
router.get("/:_id", VehicleController.showVehicle);
router.put("/:_id", upload.fields([
    { name: "image", maxCount: 8 },
    { name: "features", maxCount: 8 }
]), VehicleController.updateVehicle);
router.delete("/:_id", VehicleController.deleteVehicle);

module.exports = router;