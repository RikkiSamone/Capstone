const express = require('express');
const User = require('../models/users'); // Import the User model
const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create the user
    const newUser = new User({ name, email, username, password });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;