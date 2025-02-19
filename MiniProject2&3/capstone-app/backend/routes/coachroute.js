const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Your user model file

const router = express.Router();

// Coach login route
router.post('/coach/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if the coach exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Check if the user is a coach (role: 'coach')
    if (user.role !== 'coach') {
      return res.status(403).json({ message: 'Not authorized as coach' });
    }

    // 3. Compare password with hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 4. Create JWT token
    const token = jwt.sign(
      { coachId: user._id, email: user.email }, // Payload contains coach info
      process.env.JWT_SECRET, // Secret key (store in .env file)
      { expiresIn: '1h' } // Expiration time for the token
    );

    // 5. Send the token and coachId in response
    res.status(200).json({ token, coachId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
