import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Box, Grid, TextField, Avatar } from "@mui/material";

const HomePage = () => {
    return (
        <Container>
            <Box 
                textAlign="center" 
                my={4} 
                sx={{ paddingLeft: "250px" }} // Added padding for the left nav bar
            >
                <Typography variant="h1" gutterBottom>
                    Academic Allies
                </Typography>
                <Typography variant="h5" paragraph>
                    At Academic Allies, we’re more than just coaches — we’re your partners in progress and your allies in achievement.
                </Typography>
                <Typography variant="h6" paragraph>
                    Our mission is to empower students from 9th grade through college with the tools, strategies, and confidence to conquer academic challenges and achieve lasting success.
                </Typography>
                <Box>
                    <Button variant="contained" component={Link} to="/login" sx={{ mx: 1 }}>
                        Login
                    </Button>
                    <Button variant="outlined" component={Link} to="/create-account" sx={{ mx: 1 }}>
                        Create An Account
                    </Button>
                </Box>
            </Box>

        <Box my={4} sx={{ paddingLeft: "250px" }} textAlign="center">
                <Typography variant="h4" textAlign="center" gutterBottom>
                    What is Academic Success Coaching?
                </Typography>
                <Typography variant="body1" paragraph>
                    Academic Success Coaching is a personalized, student-centered service designed to help learners develop the skills, strategies, and mindset needed to achieve their academic goals.
                </Typography>

                <Grid container spacing={2} justifyContent="center">
                    {["Time Management", "Goal Setting", "Study Techniques", "Motivation & Accountability", "Stress Management"].map(
                        (item) => (
                            <Grid item key={item} xs={12} sm={6} md={4}>
                                <Avatar
                                    sx={{
                                        bgcolor: "primary.main",
                                        width: 60,
                                        height: 60,
                                        margin: "auto",
                                        mb: 2,
                                    }}
                                    >
                            {/*<img
                                        src="path/to/your/image.jpg" 
                                        alt={item}
                                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                                      />*/}
                                    <Typography variant="h6" color="white">
                                        {item[0]}
                                    </Typography>
                                </Avatar>
                                <Typography variant="h6">{item}</Typography>
                            </Grid>
                        )
                    )}
                </Grid>

                <Box textAlign="center" mt={3}>
                    <Button variant="contained" component={Link} to="/coaches" sx={{ mx: 1 }}>
                        Meet Our Coaches
                    </Button>
                    <Button
                        variant="contained"
                        href="https://www.instagram.com/rikkisamone" // Replace with your Instagram URL
                        target="_blank" // This will open the link in a new tab
                        rel="noopener noreferrer" // Security feature for opening external links in a new tab
                        sx={{ mx: 1 }}
                      >
                        Follow Us!
                      </Button>
                </Box>
            </Box>

            {/* Footer */}
            <Box mt={6} py={3} sx={{ paddingLeft: "250px" }} bgcolor="grey.200" textAlign="center">
                <Typography variant="h6">Subscribe to our newsletter</Typography>
                <TextField label="Email address" variant="outlined" sx={{ mt: 1, mb: 1, width: "300px" }} />
                <Button variant="contained">Subscribe</Button>
                <Typography variant="body2" mt={3}>
                    © 2024-2025 Academic Allies, Inc. All rights reserved.
                </Typography>
            </Box>
        </Container>
    );
};

export default HomePage;