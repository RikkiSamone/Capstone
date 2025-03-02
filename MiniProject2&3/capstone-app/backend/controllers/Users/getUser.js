const User = require('../../models/users');


const searchUser = async (req, res) => {
  try {
    const { email } = req.params; // Get email from query parameters
         console.log('Email received:', email);
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user); // Send the user data
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = searchUser;