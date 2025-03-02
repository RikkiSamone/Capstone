require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  console.log('Login attempt triggered');
  console.log('Request body:', req.body);
    const { email, password } = req.body;
  console.log('Login attempt for:', email);
  console.log('Login attempt for:', password);
    

    if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

    try {
      //Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });
        console.log('User found:', user);

      //Compares passwords
      const password = 'logintest1';
      const hash = '$2a$10$IEGTcKNf8XPjQfuhapjn2ep4TUTKQ1KyiFw9i9flQxkbiFQj9.q6u'; // The stored hash   
        console.log('Attempting to compare passwords...');
        console.log('Password provided:', password);
        console.log('Stored hash:', user.password);
        console.log('Password provided length:', password.length);
        console.log('Stored hash length:', user.password.length);
                     
      const isMatch = await bcrypt.compare(password.trim(), hash.trim());
      console.log('Trimmed password:', password.trim());
      console.log('Stored hash:', user.password.trim());
      console.log(typeof password, password);
      console.log(typeof user.password, user.password);
      
        console.log('Password match result:', isMatch);
    if (!isMatch) return res.status(400).json({ error: 'Password and/or email do not match.' });
      
        
    //Creates token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token, user });
        //res.json({ message: "Login successful", user });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;