const Appointment = require('../../models/appointments');

// Create an appointment
const createAppointment = async (req, res) => {
    try {
        const { coach, date, time } = req.body;
        const userId = req.user.id; // Extract userId from the authenticated token

        if (!coach || !date || !time) {
            return res.status(400).json({ error: 'Coach, date, and time are required' });
        }

        const newAppointment = new Appointment({ userId, coach, date, time });
        await newAppointment.save();

        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

module.exports = createAppointment;