const Appointment = require('../../models/appointments');

// Get all unbooked appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: null }) // Fetch only unbooked slots
            .populate('coachId', 'firstName lastName') // Populate coach's name
            .exec();
        
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Get appointments by user ID
const getAppointmentsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const appointments = await Appointment.find({ userId }).populate('userId', 'firstName lastName');
    
        // If no appointments found, send an appropriate message
        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this user.' });
        }

        // Return the appointments
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Get appointments by coach ID
const getAppointmentsByCoach = async (req, res) => {
    try {
        const { coach } = req.params;
        const appointments = await Appointment.find({ coachId: coach }).populate('userId', 'firstName lastName');

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
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
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

module.exports = {
    getAllAppointments,
    getAppointmentsByUser,
    getAppointmentsByCoach,
    getAppointmentsByDate
};