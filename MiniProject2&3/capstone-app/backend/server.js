const express = require('express');
const cors = require('cors');
const dbConnect = require('./dbConnect'); // Import database connection (to ensure it initializes)
const appointmentRoutes = require('./routes/appointmentRoutes'); // Import the routes file
const userRoutes = require('./routes/userRoutes'); // Import User Routes
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Use the routes from routes.js
app.use('/api', appointmentRoutes); // This applies all routes defined in appointmentRoutes.js
app.use('/api/users', userRoutes); // This applies all routes defined in userRoutes.js
app.use('/api/auth', authRoutes); //Login

// Initialize the database connection
dbConnect();

// Get the port from environment variables or default to 5001
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




