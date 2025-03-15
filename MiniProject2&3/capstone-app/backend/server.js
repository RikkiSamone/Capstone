const express = require("express");
const cors = require('cors');
const dbConnect = require('./dbConnect');// Import database connection (to ensure it initializes)
const path = require('path');
require("dotenv").config();
const appointmentRoutes = require('./routes/appointmentRoutes'); // Import the routes file
const userRoutes = require('./routes/userRoutes'); // Import User Routes
const coachAvailabiltyRoutes = require('./routes/coachAvailabilityRoutes'); //Import Coach Availbility Routes
const profileRoutes = require('./routes/profileRoutes.js');
const youtubeRoutes = require('./routes/youtubeRoutes.js');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',  // Allow your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Use the routes from routes.js
app.use('/api', appointmentRoutes); // This applies all routes defined in appointmentRoutes.js
app.use('/api/users', userRoutes); // This applies all routes defined in userRoutes.js
app.use('/api', coachAvailabiltyRoutes); //Applies all routes defined in CoachAvailbilityRoures.js
app.use('/api/profile', profileRoutes); //Applies all routes defined in ProfileRoutes

//Access Uploaded Profile Pictures
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

//Youtube(API) Resource Page
app.use('/api/youtube', youtubeRoutes);

// Initialize the database connection
dbConnect();

// Get the port from environment variables or default to 5001
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




