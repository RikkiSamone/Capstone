import React, { useState } from 'react';

function BookingForm({ onBook }) {
  const [coach, setCoach] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = { id: Date.now(), coach, date, time };
    onBook(newAppointment);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Book an Appointment</h3>
      
      <label>
        Coach:
        <input type="text" value={coach} onChange={(e) => setCoach(e.target.value)} required />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        Time:
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </label>
      
      <button type="submit">Book Appointment</button>
    </form>
  );
}

export default BookingForm;