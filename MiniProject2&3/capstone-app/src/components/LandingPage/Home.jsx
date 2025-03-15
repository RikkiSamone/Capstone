import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Box, Grid, TextField } from "@mui/material";

const HomePage = () => {
    return (
        <Container>
      <Box textAlign="center" my={4}>
        <Typography variant="h2" gutterBottom>
          Academic Allies
        </Typography>
        <Typography variant="h5" paragraph>
          At Academic Allies, we’re more than just coaches — we’re your partners in progress and your allies in achievement.
        </Typography>
        <Typography variant="h6" paragraph>
          Our mission is to empower students from 9th grade through college with the tools, strategies, and confidence to conquer academic challenges and achieve lasting success.
        </Typography>
        <Button variant="contained" component={Link} to="/login" sx={{ mx: 1 }}>
          Login
        </Button>
        <Button variant="outlined" component={Link} to="/create-account" sx={{ mx: 1 }}>
          Create An Account
        </Button>
      </Box>

      <Box my={4}>
        <Typography variant="h3" textAlign="center">
          What is Academic Success Coaching?
        </Typography>
        <Typography variant="body1" paragraph>
          Academic Success Coaching is a personalized, student-centered service designed to help learners develop the skills, strategies, and mindset needed to achieve their academic goals.
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {["Time Management", "Goal Setting", "Study Techniques", "Motivation & Accountability", "Stress Management"].map(
            (item) => (
              <Grid item key={item}>
                <Typography variant="h6">{item}</Typography>
              </Grid>
            )
          )}
        </Grid>

        <Box textAlign="center" mt={3}>
          <Button variant="contained" component={Link} to="/coaches" sx={{ mx: 1 }}>
            Meet Our Coaches
          </Button>
          <Button variant="contained" component={Link} to="/book-appointment" sx={{ mx: 1 }}>
            Book An Appointment
          </Button>
        </Box>
      </Box>

      {/* Footer */}
      <Box mt={5} py={3} bgcolor="grey.200" textAlign="center">
        <Typography variant="h6">Subscribe to our newsletter</Typography>
        <TextField label="Email address" variant="outlined" sx={{ mt: 1, mb: 2, width: "300px" }} />
        <Button variant="contained">Subscribe</Button>
        <Typography variant="body2" mt={3}>
          © 2024 Academic Allies, Inc. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;