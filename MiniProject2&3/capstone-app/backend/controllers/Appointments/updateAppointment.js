const Appointment = require('../../models/appointments');

// Update an appointment (reschedule)
const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, time } = req.body;

        const updatedAppointment = await Appointment.findByIdAndUpdate(id, { date, time }, { new: true });

        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment updated successfully', appointment: updatedAppointment });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

module.exports = updateAppointment;