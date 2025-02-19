const express = require('express');
const User = require('../models/users'); // Import the User model
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating tokens

const router = express.Router();

// Create a new user
router.post('/create-account', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;;
  console.log('POST /create-account route was hit'); // Log when the route is accessed
  console.log('Request body:', req.body); // Log the data sent in the request
  
  if (!firstName || !lastName|| !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create the user with hashed password
    const newUser = new User({ firstName, lastName, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'Account created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a default user only if it doesn't exist
(async () => {
  try {
    const existingUser = await User.findOne({ email: 'default@example.com' });
    if (!existingUser) {
      const defaultUser = new User({
        name: 'Default User',
        email: 'admin@email.com',
        password: 'password123',
      });
      await defaultUser.save();
      console.log('Default user created:', defaultUser);
    }
  } catch (err) {
    console.error('Error creating default user:', err);
  }
})();

// User login route (corrected version)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a token (optional)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

    // Send user info and token back to the client
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;