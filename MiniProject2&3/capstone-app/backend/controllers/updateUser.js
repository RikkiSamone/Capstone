const User = require('../models/users');


const updateUser =  async (req, res) => {
  const { email, firstName, lastName, password, role } = req.body;

  try {
    // Validate that email is provided
    if (!email) {
      return res.status(400).json({ error: 'Email is required to update user' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the fields if they are provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (password) {
      // Hash the new password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (role) user.role = role;

    // Save the updated user data
    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = updateUser;