// routes/appointmentsRoute.js
const express = require('express');
const Appointment = require('../models/appointments');
const authenticateJWT = require('../middleware/auth'); // Import the auth middleware
const router = express.Router();

// Create an appointment
router.post('/book', authenticateJWT, async (req, res) => {
  try {
    const newAppointment = new Appointment({
      userId: req.user.id, // Assuming you're using JWT for authentication
      coach: req.body.coach,
      date: req.body.date,
      time: req.body.time
    });

    // Save the appointment
    const savedAppointment = await newAppointment.save(); // Now this is valid because the function is async
    res.status(201).send(savedAppointment); // Send back the created appointment
  } catch (err) {
    console.error("Error saving appointment:", err);
    res.status(500).send({ error: "Failed to save appointment." });
  }
});
    
// Fetch all appointments for the authenticated user
router.get('/appointments', authenticateJWT, async (req, res) => {
  try {
    // Fetch appointments for the logged-in user (using the userId from the JWT)
    const appointments = await Appointment.find({ userId: req.user.id }); 
    res.status(200).send(appointments); // Return the user's appointments
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).send({ error: "Failed to fetch appointments." });
  }
});

module.exports = router;