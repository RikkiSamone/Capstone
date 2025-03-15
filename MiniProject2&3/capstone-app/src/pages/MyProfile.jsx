// ProfilePage.jsx (or MyProfile.jsx)
// ProfilePage.jsx or MyProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth-context";  // Assuming you have this context for auth
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography, Card, CardContent, Avatar, Button } from "@mui/material";

const MyProfilePage = () => {
  const { token } = useAuth();  // Assuming you are storing token in context or localStorage
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch the profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");  // Get token from localStorage (ensure it's saved correctly)
      if (!token) {
        console.error("No token found, redirect to login");
        return;  // If no token, stop execution
      }

      const response = await axios.get("http://localhost:5001/api/profile/myprofile", {
        headers: {
          Authorization: `Bearer ${token}`,  // Sending the token in the Authorization header
        },
      });

      setProfile(response.data);  // Save the profile data to state
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile data");
    }
  };

  // The useEffect hook triggers the fetchProfile function when the component mounts
  useEffect(() => {
    if (token) {
      fetchProfile();  // Call fetchProfile when the token is available
    }
  }, [token]);  // This effect will run whenever the token changes

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  if (!profile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5" p={2}>
      <Card sx={{ width: 400, textAlign: "center", p: 3, boxShadow: 3 }}>
        <Avatar
          src={profile.profilePic ? `http://localhost:5001/${profile.profilePic}` : "https://via.placeholder.com/150"}
          alt="Profile"
          sx={{ width: 120, height: 120, margin: "auto", mb: 2 }}
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold">{profile.firstName} {profile.lastName}</Typography>
          <Typography variant="body2" color="textSecondary">{profile.email}</Typography>

          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight="bold">Bio</Typography>
            <Typography variant="body2" color="textSecondary">{profile.bio || "No bio available."}</Typography>
          </Box>

          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight="bold">Grade</Typography>
            <Typography variant="body2" color="textSecondary">{profile.grade || "Not specified"}</Typography>
          </Box>

          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight="bold">Academic Goals</Typography>
            <Typography variant="body2" color="textSecondary">{profile.academicGoals || "Not specified"}</Typography>
          </Box>

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={() => navigate("/update-profile")}>
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyProfilePage;