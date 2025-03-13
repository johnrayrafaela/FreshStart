const express = require("express");
const {
  addCleaningService,
  getAllCleaningServices,
  getCleaningService,
  updateCleaningService,
  deleteCleaningService,
} = require("../controllers/cleaningServiceController");

const router = express.Router();

router.post("/add", addCleaningService);
router.get("/", getAllCleaningServices);
router.get("/:id", getCleaningService);
router.put("/:id", updateCleaningService);
router.delete("/:id", deleteCleaningService);

module.exports = router;
