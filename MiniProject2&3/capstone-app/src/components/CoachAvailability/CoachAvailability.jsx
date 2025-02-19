import { useState } from "react";
import PropTypes from "prop-types";

const CoachAvailabilityForm = ({ coachId }) => {
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([{ start: "", end: "" }]);

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index][field] = value;
    setTimeSlots(updatedSlots);
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { start: "", end: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/coachAvailability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coachId, date, timeSlots }),
    });

    if (response.ok) {
      alert("Availability added successfully!");
      setDate("");
      setTimeSlots([{ start: "", end: "" }]);
    } else {
      alert("Error adding availability.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Availability</h3>
      <label>
        Select Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>

      {timeSlots.map((slot, index) => (
        <div key={index}>
          <label>Start Time:</label>
          <input type="time" value={slot.start} onChange={(e) => handleSlotChange(index, "start", e.target.value)} required />

          <label>End Time:</label>
          <input type="time" value={slot.end} onChange={(e) => handleSlotChange(index, "end", e.target.value)} required />
        </div>
      ))}

      <button type="button" onClick={addTimeSlot}>+ Add Time Slot</button>
      <button type="submit">Submit Availability</button>
    </form>
  );
};

CoachAvailabilityForm.PropTypes = {
    coachId: PropTypes.string.isRequired
};

export default CoachAvailabilityForm;
