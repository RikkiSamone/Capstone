const express = require("express");
const { 
  createAvailability, 
  AllAvailableSlots, 
  getAvailableSlots 
} = require("../controllers/CoachAvailability/Availability");
const authenticateJWT = require('../middleware/auth');
const router = express.Router();

// Route to get all coach availability slots
router.get('/all', AllAvailableSlots); 

// Route to create availability for coaches
router.post("/create", authenticateJWT, createAvailability);

// Route to get available slots for a specific coach on a specific day
router.get("/:coachId/:date", authenticateJWT, getAvailableSlots);

module.exports = router;
