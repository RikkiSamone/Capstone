import React, { useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";  // Calendar styles
import { Box, Button, Typography, TextField } from '@mui/material';

const CoachAvailabilityForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [newTimeSlot, setNewTimeSlot] = useState("");

  // Update selected date from calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Add new time slot
  const handleAddTimeSlot = () => {
    if (newTimeSlot && !timeSlots.includes(newTimeSlot)) {
      setTimeSlots([...timeSlots, newTimeSlot]);
      setNewTimeSlot(""); // Clear input field after adding
    } else {
      alert("Please enter a valid time or avoid duplicates.");
    }
  };

  // Submit availability to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (timeSlots.length === 0) {
      alert("Please add at least one time slot.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/availability/create", {
        coachId: "coachId_here",  // Replace with actual coach ID
        date: selectedDate,
        timeSlots,
      });
      alert("Availability created!");
      setTimeSlots([]); // Reset time slots after successful submission
    } catch (error) {
      alert("Failed to create availability.");
    }
  };

  return (
    <Box sx={{ margin: "0 20px", maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Set Your Availability
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Typography variant="body1">Select Date</Typography>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
          />

          <TextField
            label="Enter Time Slot (e.g., 10:00 AM)"
            type="text"
            value={newTimeSlot}
            onChange={(e) => setNewTimeSlot(e.target.value)}
            fullWidth
          />
          <Button onClick={handleAddTimeSlot} variant="outlined">
            Add Time Slot
          </Button>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body1">Time Slots:</Typography>
            <ul>
              {timeSlots.map((slot, index) => (
                <li key={index}>{slot}</li>
              ))}
            </ul>
          </Box>

          <Button type="submit" variant="contained" fullWidth>
            Submit Availability
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CoachAvailabilityForm;