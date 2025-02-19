import React, { useState, useEffect } from 'react';
import AppointmentList from './appointments';
import BookingForm from './bookingform'

function DashboardPage() {
  const [appointments, setAppointments] = useState([
   /* { id: 1, coach: 'John Doe', date: '2025-02-01', time: '10:00 AM' },
    { id: 2, coach: 'Jane Smith', date: '2025-02-05', time: '1:00 PM' }*/
  ]);
    const [filter, setFilter] = useState('all');
 /* const [showBookingForm, setShowBookingForm] = useState(false);*/

//Load appointments
   useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);
  }, []);

  // Save appointments to localStorage whenever the appointments list changes
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Function to handle new appointment booking
  const handleBookAppointment = (newAppointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
  };

  // Function to filter appointments based on the selected filter
  const filterAppointments = (appointments) => {
    const now = new Date();
    
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      
      if (filter === 'upcoming') {
        return appointmentDate > now; // Show upcoming appointments
      } else if (filter === 'previous') {
        return appointmentDate < now; // Show previous appointments
      } else {
        return true; // Show all appointments
      }
    });
  };

  // Get the filtered list of appointments
  const filteredAppointments = filterAppointments(appointments);

  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard</h1>
          <BookingForm onBook={handleBookAppointment} />
          
  <div>
        <label htmlFor="appointment-filter">Filter Appointments: </label>
        <select
          id="appointment-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)} // Update filter when changed
        >
          <option value="all">All Appointments</option>
          <option value="upcoming">Upcoming Appointments</option>
          <option value="previous">Previous Appointments</option>
        </select>
      </div>

      <h3>Your Appointments</h3>
      {filteredAppointments.length === 0 ? (
        <p>You have no appointments to display.</p>
      ) : (
        <ul>
          {filteredAppointments.map((appointment) => (
            <li key={appointment.id}>
              <strong>{appointment.coach}</strong>
              <br />
              {appointment.date} at {appointment.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
      
      /*<button onClick={() => setShowBookingForm(true)}>Book New Appointment</button>

      {showBookingForm && <BookingForm onBook={handleBookAppointment} />}
    </div>
  );
}*/

export default DashboardPage;