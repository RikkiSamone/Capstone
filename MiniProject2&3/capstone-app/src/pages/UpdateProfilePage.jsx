import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth-context"; 
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, token, logout } = useAuth();
  const [bio, setBio] = useState(user?.bio || "");
  const [grade, setGrade] = useState(user?.grade || "");
  const [academicGoals, setAcademicGoals] = useState(user?.academicGoals || "");
  const [profilePic, setProfilePic] = useState(null); // For the file upload
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [user, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file); // Set the profilePic state with the file
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("bio", bio);
  formData.append("grade", grade);
  formData.append("academicGoals", academicGoals);
  if (profilePic) {
    formData.append("profilePic", profilePic);
  }

  try {
    const response = await fetch("http://localhost:5001/api/profile/profile", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`, // Send token for authentication
      },
      body: formData, // Send the form data with the profile info
    });

    if (response.ok) {
      const updatedProfile = await response.json();
      console.log("Profile updated successfully:", updatedProfile); // More specific success log
      navigate("/profile"); // Optionally redirect to profile page
    } else {
      const errorData = await response.json();
      setError(errorData.message || "An error occurred while updating the profile.");
      console.error("Error response:", errorData);
    }
  } catch (err) {
    setError("An error occurred while updating the profile.");
    console.error("Error updating profile:", err);
  }
};

  return (
    <div>
      <h1>Edit Profile Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Grade:</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Academic Goals:</label>
          <input
            type="text"
            value={academicGoals}
            onChange={(e) => setAcademicGoals(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ProfilePage;