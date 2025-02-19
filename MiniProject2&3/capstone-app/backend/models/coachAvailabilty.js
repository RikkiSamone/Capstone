const mongoose = require("mongoose");

const CoachAvailabilitySchema = new mongoose.Schema({
  coachId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  timeSlots: [
    {
      start: { type: String, required: true }, // Format: HH:mm
      end: { type: String, required: true },
      isBooked: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("CoachAvailability", CoachAvailabilitySchema);
