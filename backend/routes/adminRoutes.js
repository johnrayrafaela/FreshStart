const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminMiddleware");
const CleaningService = require("../models/CleaningService");

// Create a new cleaning service (Only admin can access)
router.post("/add-service", adminAuth, async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newService = new CleaningService({ name, description, price });
    await newService.save();
    res.status(201).json({ message: "Service added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding service", error });
  }
});

// Get all cleaning services
router.get("/services", async (req, res) => {
  try {
    const services = await CleaningService.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
});

// Delete a cleaning service (Only admin can access)
router.delete("/delete-service/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await CleaningService.findByIdAndDelete(id);
    res.status(200).json({ message: "Service deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error });
  }
});

module.exports = router;
