import React from 'react';

function AppointmentList({ appointments }) {
  return (
    <div className="appointments">
      {appointments.length === 0 ? (
        <p>You have no upcoming appointments.</p>
      ) : (
        <ul>
          {appointments.map(appointment => (
            <li key={appointment.id}>
              <strong>Coach:</strong> {appointment.coach} | 
              <strong> Date:</strong> {appointment.date} | 
              <strong> Time:</strong> {appointment.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AppointmentList;