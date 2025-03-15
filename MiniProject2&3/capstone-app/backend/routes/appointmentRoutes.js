// routes/appointmentsRoute.js
const express = require('express');
const { createAppointment, getAvailableSlotsByDate } = require('../controllers/Appointments/createAppointment');
const { getAllAppointments,
        getAppointmentsByCoach,
        getAppointmentsByUser,
        getAppointmentsByDate } = require('../controllers/Appointments/getAppointment') 
const updateAppointment = require('../controllers/Appointments/updateAppointment');
const cancelAppointment = require('../controllers/Appointments/cancelAppointment');
const authenticateJWT = require('../middleware/auth'); // Import the auth middleware

const router = express.Router();

router.post('/book', authenticateJWT, createAppointment); //Protected for logged in users can only create appointments
router.get('/all-appointments', authenticateJWT, getAllAppointments);
router.get('/available-slots', getAvailableSlotsByDate); // Get available slots by date
router.get('/user/:userId', authenticateJWT, getAppointmentsByUser); 
router.get('/coach/:coach', authenticateJWT, getAppointmentsByCoach);
router.get('/date/:date', authenticateJWT, getAppointmentsByDate);
router.put('/update/:id', authenticateJWT, updateAppointment);
router.delete('/cancel/:id', authenticateJWT, cancelAppointment);



module.exports = router;