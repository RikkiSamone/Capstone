const mongoose = require('mongoose');
const Appointment = require('../../models/appointments');
const CoachAvailability = require('../../models/coachAvailability');
const User = require('../../models/users');

// Create an appointment
const createAppointment = async (req, res) => {
  console.log('Booking request received:', req.body);

  try {
    const userId = req.user.id; // Extract user ID from auth middleware
    const { coachId, date, time } = req.body;
    console.log("Booking appointment for Coach ID:", coachId);

    // Fetch coach's name
    const coach = await User.findById(coachId);
    if (!coach) {
      return res.status(400).json({ message: "Coach not found." });
    }

    // Validate the coachId format
    if (!mongoose.Types.ObjectId.isValid(coachId)) {
      return res.status(400).json({ message: "Invalid coachId format" });
    }

    // Check availability
    const availability = await CoachAvailability.findOne({ coachId, date, available: true });
    if (!availability) {
      return res.status(400).json({ message: "Slot is not available." });
    }

    // Book the appointment
    const newAppointment = new Appointment({ userId, coachId, coachName: coach.firstName, date, time });
    await newAppointment.save();

    // Mark the slot as unavailable
    availability.available = false;
    await availability.save();

    // Send the newly created appointment back in the response
    res.status(200).json({ message: "Appointment booked successfully.", appointment: newAppointment });

  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Error booking appointment", error });
  }
};

// Fetch available slots for a specific date
const getAvailableSlotsByDate = async (req, res) => {
  try {
    const { date } = req.query; // Get the date from the query parameter

    if (!date) {
      return res.status(400).json({ message: "Date parameter is required" });
    }

    // Format the date to ensure consistency (e.g., YYYY-MM-DD)
    const formattedDate = new Date(date).toISOString().split('T')[0];

    // Fetch available slots from the CoachAvailability model
    const availableSlots = await CoachAvailability.find({
      date: formattedDate,
      available: true, // Ensure that only available slots are returned
    }).populate('coachId', 'firstName lastName'); // Populate coach's name

    if (availableSlots.length === 0) {
      return res.status(404).json({ message: "No available slots for this date." });
    }

    // Return the available slots
    res.status(200).json(availableSlots);
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
  
  
module.exports = { createAppointment, getAvailableSlotsByDate }