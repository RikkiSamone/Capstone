const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  coachId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },  // Add time field
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Availability', availabilitySchema);
