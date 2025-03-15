// models/appointments.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Link to user
  coachId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, //Link to Coach role
  coachName: { type: String, required: true},
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;