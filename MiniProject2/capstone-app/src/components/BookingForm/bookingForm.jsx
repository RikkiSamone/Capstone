import React, { useState } from "react";
import { useParams } from "react-router-dom";

const BookAppointmentForm = () => {
  const { coachName } = useParams(); // Extract coachName from the URL
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    appointmentDate: "",
    coach: coachName || "", // Auto-populate the coach field with the URL parameter
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to the server)
    console.log("Form Submitted", formData);
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