import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar'; // Importing react-calendar
import 'react-calendar/dist/Calendar.css'; // Importing styles for the calendar
import { Box, Button, Grid, Typography, Card, CardContent, CardActions } from '@mui/material';
import { format } from 'date-fns';

function BookingPage() {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Track selected date for the calendar
  const navigate = useNavigate();

  // Fetch available slots when the page loads or when the selected date changes
  useEffect(() => {
    console.log("Fetching available slots...");
    const fetchAvailableSlots = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Formats to YYYY-MM-DD
        console.log("Formatted Date before request:", formattedDate);

        const response = await fetch(`http://localhost:5001/api/available-slots?date=${formattedDate}`);
        if (!response.ok) {
          throw new Error(`Error fetching available slots: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Available Slots:", data);
        setAvailableSlots(data);
      } catch (error) {
        console.error("Error fetching available slots:", error);
      }
    };

    fetchAvailableSlots();
  }, [selectedDate]); // Trigger when the selected date changes

  // Handle appointment booking
  const handleBookAppointment = async () => {
  if (!selectedSlot) {
    alert('Please select a slot to book.');
    return;
  }

  console.log("Selected Slot:", selectedSlot);

  const coachId = selectedSlot.coachId?._id;
  if (!coachId) {
    console.error("Invalid coachId detected:", selectedSlot.coachId);
    alert("Invalid coach selection. Please try again.");
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    alert('No token found. Please log in again.');
    return;
  }

  try {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const userId = tokenPayload?.userId || tokenPayload?.id;

    if (!userId) {
      throw new Error("User ID not found in token.");
    }

    const requestBody = {
      userId,
      coachId,
      date: selectedDate.toISOString().split('T')[0], // Ensure correct date format
      time: selectedSlot.time || "Missing Time"
    };

    const response = await fetch('http://localhost:5001/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error Response:", errorData);
      throw new Error(errorData.message || `Error booking appointment: ${response.status}`);
    }

    const data = await response.json();
    console.log('Booking Successful:', data);
    alert(data.message || 'Appointment booked successfully!');

    // Update the appointments state with the new appointment
    setAppointments((prevAppointments) => [
      ...prevAppointments,
      data.appointment, // Add the newly created appointment
    ]);
    
    navigate('/mydashboard');
  } catch (error) {
    console.error('Error booking appointment:', error);
    alert(error.message || 'An error occurred while booking your appointment.');
  }
};

  return (
    <Box sx={{ display: "flex", height: "100vh", marginLeft: "150px", padding: 3 }}>
      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Book an Appointment
        </Typography>

        <Grid container spacing={3} sx={{ marginLeft: "10px" }}>
          {/* Calendar Section */}
          <Grid item med={12} sm={8} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Select a Date</Typography>
                <Calendar
                  onChange={(date) => {
                    setSelectedDate(date);
                    console.log("Selected date:", date);
                  }}
                  value={selectedDate}
                  tileClassName={({ date }) => {
                    if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
                      return "highlight-today";
                    }
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Available Slots */}
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Available Slots on {selectedDate.toLocaleDateString()}</Typography>
                {availableSlots.length === 0 ? (
                  <Typography>No available slots for this date.</Typography>
                ) : (
                  <ul>
                    {availableSlots.map((slot) => (
                      <li key={slot._id}>
                        <Button
                          fullWidth
                          variant={selectedSlot?._id === slot._id ? 'contained' : 'outlined'}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {slot.coachId?.firstName || "Unknown Coach"} - {new Date(slot.date).toLocaleString()} - {slot.time}
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Selected Slot Confirmation */}
          {selectedSlot && (
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">You’ve selected:</Typography>
                  <Typography variant="body2">
                    {selectedSlot.coachId.firstName} on {new Date(selectedSlot.date).toLocaleString()} at {selectedSlot.time || "No time available"}
                  </Typography>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleBookAppointment}
                    >
                      Book Appointment
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

        <Button onClick={() => navigate('/mydashboard')} sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Box>
    </Box>
  );
}

export default BookingPage;