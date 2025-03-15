const mongoose = require('mongoose');
const Availability = require("../../models/coachAvailability");

exports.createAvailability = async (req, res) => {
  
  try {
    const { coachId, date, time } = req.body;

    // Validate input
    if (!coachId || !date || !time) {
      return res.status(400).json({ message: "Coach ID, date, and time are required." });
    }

    // Convert coachId to ObjectId using the 'new' keyword
    const coachObjectId = new mongoose.Types.ObjectId(coachId); // Use 'new' here

    // Create a new availability record
    const newAvailability = new Availability({
      coachId: coachObjectId,
      date,
      time,
      available: true, // Ensure availability is explicitly set
    });

    await newAvailability.save();
    res.status(201).json({ message: "Availability created successfully!", availability: newAvailability });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Error creating availability", error: error.message });
  }
};

/// Get all available slots, grouped by date
exports.AllAvailableSlots = async (req, res) => {
  try {
    const availableSlots = await Availability.find({ available: true })
      .populate('coachId', 'firstName') // Populate coach name
      .exec();

    // Group slots by date
    const groupedSlots = availableSlots.reduce((acc, slot) => {
      const date = new Date(slot.date).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push({
        coachName: slot.coachId.firstName,
        time: slot.time,
        coachId: slot.coachId._id,
      });
      return acc;
    }, {});

    res.status(200).json(groupedSlots); // Return available slots grouped by date
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({ message: "Error fetching available slots", error: error.message });
  }
};

// Get available slots for a specific coach on a specific day
exports.getAvailableSlots = async (req, res) => {
  const { coachId, date } = req.params;
  // Log the received date for debugging
  console.log("Received date from frontend:", date);

  // Ensure the date is in the correct format (YYYY-MM-DD)
  console.log("Received date from frontend:", date);
      if (isNaN(new Date(date).getTime())) {
        console.error("Invalid date received:", date);
        return res.status(400).json({ message: "Invalid date" });
      }
  const formattedDate = new Date(date).toISOString().split('T')[0];
  console.log("Formatted date for query:", formattedDate);  // Log the formatted date


  try {
    const availableSlots = await Availability.find({ 
      coachId: new mongoose.Schema.Types.ObjectId(coachId), 
      date: formattedDate, // Use the formatted date here
      available: true 
    });

    if (!availableSlots.length) {
      return res.status(404).json({ message: "No available slots found for this coach on this date." });
    }

    res.status(200).json(availableSlots); // Return available slots for the coach on the selected date
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({ message: "Error fetching available slots", error: error.message });
  }
};