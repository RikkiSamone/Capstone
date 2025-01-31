// UserProfile.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

const UserProfile = () => {
  const { user } = useContext(UserContext); // Get the current user info from context
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchAppointments = async () => {
        try {
          const response = await axios.get('http://localhost:5001/api/appointments/appointments', {
            headers: {
              Authorization: `Bearer ${user.token}`, // Send the JWT token to fetch the user's appointments
            },
          });

          setAppointments(response.data); // Store the fetched appointments in state
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };

      fetchAppointments(); // Fetch appointments when the component mounts
    }
  }, [user]);

  return (
    <div>
      <h1>Your Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            <p>Coach: {appointment.coach}</p>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;