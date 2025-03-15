import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom"; // For redirecting if not authenticated
import { useAuth } from "../../context/auth-context"; // Use the auth context
import useAppointments from "../../hooks/useAppointments"; // Custom hook for appointments
import VideoChat from "../MeetingRoom/Video"; // VideoChat component
import { Box, Card, CardContent, CardActions, Button, Grid, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Link } from "react-router-dom"; // For internal navigation

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  
  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const { appointments, loading, error } = useAppointments(user?.id);

  const [filter, setFilter] = useState("all");

  const filterAppointments = (appointments) => {
    const now = new Date();
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);

      if (filter === "upcoming") {
        return appointmentDate > now;
      } else if (filter === "previous") {
        return appointmentDate < now;
      } else {
        return true; // 'all' filter shows everything
      }
    });
  };

  const filteredAppointments = filterAppointments(appointments);

  if (loading) {
    return <div>Loading your appointments...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Let's check for the first upcoming appointment and pass it to the VideoChat component
  const upcomingAppointment = filteredAppointments.find(
    (appointment) => new Date(appointment.date) > new Date()
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", marginLeft: "250px" }}>
      {/* Main Content Area with 250px left margin */}
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Your Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Filter Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Your Appointments</Typography>
                <FormControl fullWidth>
                  <InputLabel htmlFor="appointment-filter">Filter Appointments</InputLabel>
                  <Select
                    id="appointment-filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    label="Filter Appointments"
                  >
                    <MenuItem value="all">All Appointments</MenuItem>
                    <MenuItem value="upcoming">Upcoming Appointments</MenuItem>
                    <MenuItem value="previous">Previous Appointments</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>

          {/* Appointments List */}
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Appointments</Typography>
                {filteredAppointments.length === 0 ? (
                  <Typography>No appointments scheduled.</Typography>
                ) : (
                  <ul>
                    {filteredAppointments.map((appointment) => (
                      <li key={appointment.id}>
                        <strong>{appointment.coachName}</strong>
                        <br />
                        {new Date(appointment.date).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  component={Link}
                  to="/book"
                >
                  Book an Appointment
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Past Recorded Sessions */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Past Recorded Sessions</Typography>
                <Typography variant="body2">View your past recorded video sessions here.</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Coming Soon
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Notes */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Your Notes</Typography>
                <Typography variant="body2">Access your personal notes and session summaries here.</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Coming Soon
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Resource Page Link */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Resources</Typography>
                <Typography variant="body2">Go to the Resource page for additional materials and support.</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" component={Link} to="/resources">
                  Visit Resources
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Video Chat (if upcoming appointment) */}
          {upcomingAppointment && (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Join Your Appointment</Typography>
                  <VideoChat meetingRoom={upcomingAppointment.roomName} />
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardPage;