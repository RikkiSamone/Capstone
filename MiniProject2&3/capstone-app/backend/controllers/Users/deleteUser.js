const User = require('../../models/users');

// Delete a user by Email
  const deleteUser = async (req, res) => {
  try {
    // Extract email from the query string
    const { email } = req.params; // Use req.query to get the email from the URL query parameters

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ error: 'Email is required to delete' });
    }

    console.log('Email to Delete:', email); // This should log the email passed from the client

    // Find and delete the user by email
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: err.message });
  }
  };

module.exports = deleteUser;