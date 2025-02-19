const express = require('express');
const User = require('../models/users'); // Import the User model
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating tokens

const router = express.Router();

// Create a new user
router.post('/create-account', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  console.log('POST /create-account route was hit'); // Log when the route is accessed
  console.log('Request body:', req.body); // Log the data sent in the request
  
  if (!firstName || !lastName || !email || !password || !role) {
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

module.exports = router;