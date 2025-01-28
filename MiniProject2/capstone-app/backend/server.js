const express = require('express');
const dbConnect = require('./dbConnect'); // Import database connection (to ensure it initializes)
const appointmentRoutes = require('./routes/appointmentRoutes'); // Import the routes file
const userRoutes = require('./routes/userRoutes'); //Import User Routes


const app = express();
// Middleware to parse JSON
app.use(express.json());

// Use the routes from routes.js
app.use('/api', appointmentRoutes); // This applies all routes defined in routes.js
app.use('/api', userRoutes);

// Start the server
app.listen(5001, () => {
  console.log('Server is running on port 5001');
});

//Default User
const User = require('./models/users'); // Import User model

(async () => {
  const existingUser = await User.findOne({ email: 'default@example.com' });
  if (!existingUser) {
    const defaultUser = new User({
    name: 'Default User',
    email: 'admin@email.com',
    username: 'admin',
    password: 'password123',
    });
    await defaultUser.save();
    console.log('Default user created:', defaultUser);
  }
})();