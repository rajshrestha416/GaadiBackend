const { Router } = require('express');
const router = Router();
const VehicleController = require("../Controllers/vehicle");
const upload = require("../Middlewares/upload")
const auth = require("../Middlewares/auth")

router.post("/", auth.verifyUser, upload.fields([
    { name: "image", maxCount: 8 },
    { name: "features", maxCount: 8 }
]), VehicleController.addVehicle);
router.get("/", auth.verifyUser, VehicleController.showVehicles);
router.get("/:_id", auth.verifyUser, VehicleController.showVehicle);
router.get("/search/:searchObj", auth.verifyUser, VehicleController.showVehicle);
router.put("/:_id", auth.verifyUser, upload.fields([
    { name: "image", maxCount: 8 },
    { name: "features", maxCount: 8 }
]), VehicleController.updateVehicle);
router.delete("/:_id", auth.verifyUser, VehicleController.deleteVehicle);

module.exports = router;