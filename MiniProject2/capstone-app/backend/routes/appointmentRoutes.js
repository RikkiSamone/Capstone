// routes/appointments.js
const express = require('express');
const Appointment = require('../models/appointments');
const router = express.Router();

// Create an appointment
router.post('/book', async (req, res) => {
  try {
    const newAppointment = new Appointment({
      userId: req.body.userId, // Get userId from the logged-in user (e.g., JWT)
      coach: req.body.coach,
      date: req.body.date,
      time: req.body.time
    });
    
    await newAppointment.save();
    res.status(201).send(newAppointment);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Fetch all appointments for a user
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.body.userId }); // Assuming you're using JWT auth to get user info
    res.status(200).send(appointments);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;