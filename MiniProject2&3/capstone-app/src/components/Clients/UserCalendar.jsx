import React, { useState, useEffect } from "react";
import axios from "axios";

const UserCalendar = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/availability/available/coachId_here");
        setAvailableSlots(response.data);
      } catch (error) {
        console.error("Error fetching available slots", error);
      }
    };

    fetchAvailableSlots();
  }, []);

  const handleBookAppointment = async (slot) => {
    try {
      await axios.post("http://localhost:5001/api/availability/book", {
        userId: "userId_here", // Replace with actual user ID
        coachId: slot.coachId,
        date: slot.date,
      });
      alert("Appointment booked!");
      setAvailableSlots((prev) =>
        prev.filter((s) => s._id !== slot._id) // Remove the booked slot from available slots
      );
    } catch (error) {
      alert("Failed to book appointment.");
    }
  };

  return (
    <div>
      <h1>Available Slots</h1>
      <ul>
        {availableSlots.map((slot) => (
          <li key={slot._id}>
            {new Date(slot.date).toLocaleString()} 
            <button onClick={() => handleBookAppointment(slot)}>Book Appointment</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCalendar;