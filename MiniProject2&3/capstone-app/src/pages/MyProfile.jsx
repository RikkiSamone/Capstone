// ProfilePage.jsx (or MyProfile.jsx)
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Card, CardContent, Avatar, Typography, Button, Box, CircularProgress 
} from "@mui/material";

const MyProfilePage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        setError("Failed to load profile.");
        console.error(err);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

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
        {/* Profile Picture */}
        <Avatar 
          src={profile.profilePic ? `http://localhost:5001/${profile.profilePic}` : "https://via.placeholder.com/150"}
          alt="Profile"
          sx={{ width: 120, height: 120, margin: "auto", mb: 2 }}
        />

        <CardContent>
          {/* Name & Email */}
          <Typography variant="h5" fontWeight="bold">
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {profile.email}
          </Typography>

          {/* Bio */}
          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight="bold">Bio</Typography>
            <Typography variant="body2" color="textSecondary">
              {profile.bio || "No bio available."}
            </Typography>
          </Box>

          {/* Grade & Academic Goals */}
          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight="bold">Grade</Typography>
            <Typography variant="body2" color="textSecondary">
              {profile.grade || "Not specified"}
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight="bold">Academic Goals</Typography>
            <Typography variant="body2" color="textSecondary">
              {profile.academicGoals || "Not specified"}
            </Typography>
          </Box>

          {/* Edit Profile Button */}
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 3 }} 
            onClick={() => navigate("/update-profile")}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyProfilePage;