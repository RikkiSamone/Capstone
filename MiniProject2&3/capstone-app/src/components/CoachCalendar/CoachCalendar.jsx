import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar"; 
import "react-calendar/dist/Calendar.css";

const CoachCalendar = ({ coachId }) => {
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      const response = await fetch(`/api/coachAvailability/${coachId}?startDate=2025-02-01&endDate=2025-02-28`);
      const data = await response.json();
      setAvailability(data);
    };

    fetchAvailability();
  }, [coachId]);

  // Function to handle date click
  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const availableDay = availability.find((slot) => slot.date === formattedDate);

    if (availableDay) {
      setSelectedDate(formattedDate);
      setTimeSlots(availableDay.timeSlots.filter(slot => !slot.isBooked)); // Show only unbooked slots
    } else {
      setSelectedDate(formattedDate);
      setTimeSlots([]); // No available slots
    }
  };

  return (
    <div>
      <Calendar onClickDay={handleDateClick} />
      
      {selectedDate && (
        <div>
          <h3>Available Slots on {selectedDate}</h3>
          {timeSlots.length > 0 ? (
            <ul>
              {timeSlots.map((slot, index) => (
                <li key={index}>{slot.start} - {slot.end}</li>
              ))}
            </ul>
          ) : (
            <p>No available slots.</p>
          )}
        </div>
      )}
    </div>
  );
};

CoachCalendar.propTypes = {
    coachId: PropTypes.string.isRequired
};

export default CoachCalendar;
