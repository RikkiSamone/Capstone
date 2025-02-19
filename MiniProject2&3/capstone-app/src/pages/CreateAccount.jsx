// src/pages/CreateAccount.jsx
import React, { useState } from "react";
import axios from "axios";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client"); // Default to "client"

  const handleSubmit = async (e) => {
    e.preventDefault();
 console.log("Form submitted");
    try {
      const response = await axios.post("http://localhost:5001/api/users/create-account", {
        firstName,
        lastName,
        email,
        password,
        role, // Include the role
      });

      // Handle response after successful account creation
      console.log("Account created:", response.data);
    } catch (error) {
      if (error.response) {
    console.error("Error response:", error.response);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error:", error.message);
  }
}
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      >
        <option value="client">Client</option>
        <option value="coach">Coach</option>
      </select>
      <button type="submit">Create Account</button>
    </form>
  );
};

export default CreateAccount;
