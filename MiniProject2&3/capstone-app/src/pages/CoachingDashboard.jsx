import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const CoachDashboardComingSoon = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleUpdateAvailability = () => {
    // Navigate to the coach availability form
    navigate('/coach-availability');
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexDirection="column"
      p={3}
      sx={{ paddingLeft: '240px' }} // Adjust padding to match your sidebar width (240px for a typical sidebar)
    >
      <Typography variant="h3" gutterBottom align="center">
        Coach Dashboard
      </Typography>
      <Typography variant="h5" gutterBottom align="center">
        This feature is coming soon!
      </Typography>
      
      {/* Dashboard Grid */}
      <Grid container spacing={3} justifyContent="center">
        {/* User Appointments Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Appointments
              </Typography>
              <Paper elevation={3} sx={{ p: 2, height: 150 }}>
                <Typography variant="body1">You have no upcoming appointments.</Typography>
                <Typography variant="body2" color="textSecondary">
                  (Placeholder for appointments data)
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* Update Availability Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Update Availability
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleUpdateAvailability} // Call the function on button click
              >
                Update Availability
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Session Notes Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Session Notes
              </Typography>
              <Paper elevation={3} sx={{ p: 2, height: 150 }}>
                <Typography variant="body1">You haven't logged any session notes yet.</Typography>
                <Typography variant="body2" color="textSecondary">
                  (Placeholder for session notes)
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats Card - Sessions and Unique Users */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Sessions
              </Typography>
              <Paper elevation={3} sx={{ p: 2, height: 150 }}>
                <Typography variant="body1">Total Sessions: 0</Typography>
                <Typography variant="body1">Unique Users: 0</Typography>
                <Typography variant="body2" color="textSecondary">
                  (Placeholder for stats in the last month)
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CoachDashboardComingSoon;