const express = require("express");
const router = express.Router();
const CoachAvailability = require("../models/coachAvailabilty");

// Save availability
router.post("/", async (req, res) => {
  const { coachId, date, timeSlots } = req.body;

  try {
    let availability = await CoachAvailability.findOne({ coachId, date });

    if (availability) {
      // Update existing availability
      availability.timeSlots = [...availability.timeSlots, ...timeSlots];
      await availability.save();
    } else {
      // Create new availability
      availability = new CoachAvailability({ coachId, date, timeSlots });
      await availability.save();
    }

    res.status(201).json({ message: "Availability saved" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
