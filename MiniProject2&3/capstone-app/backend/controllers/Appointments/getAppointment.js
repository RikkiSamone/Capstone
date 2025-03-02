const Appointment = require('../../models/appointments');


// Get all appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('userId', 'firstName lastName email');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Get appointments by user ID
const getAppointmentsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const appointments = await Appointment.find({ userId }).populate('userId', 'firstName lastName email');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Get appointments by coach name
const getAppointmentsByCoach = async (req, res) => {
    try {
        const { coach } = req.params;
        const appointments = await Appointment.find({ coach });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Get appointments by date
const getAppointmentsByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const formattedDate = new Date(date);

        if (isNaN(formattedDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
        }

        const appointments = await Appointment.find({ date: formattedDate }).populate('userId', 'firstName lastName email');

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

module.exports = {
    getAllAppointments,
    getAppointmentsByUser,
    getAppointmentsByCoach,
    getAppointmentsByDate
};