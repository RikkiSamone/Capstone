// src/pages/CreateAccount.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
 



const CreateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client"); // Default to "client"
  const [message, setMessage] = useState("");
  const [redirecting, setRedirecting] = useState(false); //Redirect to login page message
 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Form..."); //debugging
    try {
      const response = await axios.post("http://localhost:5001/api/users/create-account", {
        firstName,
        lastName,
        email,
        password,
        role, // Include the role
      });

      console.log("Account Created:", response.data);

      //Clear the form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("")
      setRole("client");

      //console.log("First Name:", firstName);
      //console.log("Last Name:", lastName);
      //console.log("Email:", email);
      //console.log("Password:", password);
      //console.log("Role:", role);
      
     
      
      // Handle response after successful account creation
    setMessage("Account created successfully!");
      setRedirecting(true); // Show redirect message
      console.log("Account created:", response.data);
    
    //Navigate Logic
    setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
        console.error("Error creating account:", error.response?.data || error.message);
        setMessage("Error creating account. Please try again.");
        setRedirecting(false); // Prevent redirect if there's an error
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
      
      {message && <p style={{ color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
      {redirecting && <p style={{ color: "blue" }}>Redirecting to login page...</p>}
    </form>

 
  );
  
};

export default CreateAccount;
