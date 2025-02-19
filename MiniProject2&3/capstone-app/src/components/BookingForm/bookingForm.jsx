import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext"; // Assuming you have a UserContext to store the user info

const BookAppointmentForm = () => {
  const { user } = useContext(UserContext); // Get user info from context (includes the JWT token)
  const [formData, setFormData] = useState({
    coach: "", // Assuming the coach is pre-filled
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the appointment request to the backend
      const response = await axios.post(
        "http://localhost:5001/api/appointments/book", // Update URL accordingly
        {
          coach: formData.coach,
          date: formData.date,
          time: formData.time,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Send the JWT token in the Authorization header
          },
        }
      );

      console.log("Appointment booked:", response.data);
      // Handle success (e.g., show confirmation or redirect user)
    } catch (error) {
      console.error("Error booking appointment:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center">Book an Appointment</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="appointmentDate" className="form-label">
            Appointment Date
          </label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            className="form-control"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="coach" className="form-label">
            Coach
          </label>
          <input
            type="text"
            id="coach"
            name="coach"
            className="form-control"
            value={formData.coach}
            onChange={handleChange}
            readOnly // Make the coach field read-only
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookAppointmentForm;