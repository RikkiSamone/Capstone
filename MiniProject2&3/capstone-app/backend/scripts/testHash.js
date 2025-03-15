// testHash.js
const bcrypt = require('bcryptjs');

const testPassword = 'testthousand';  // The password you want to test

// Simulate creating a salt and hashing the password
async function testSaltAndHash() {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    console.log('Generated salt:', salt);  // Log the salt for testing

    // Hash the password with the generated salt
    const hash = await bcrypt.hash(testPassword, salt);
    console.log('Generated hash:', hash);  // Log the generated hash

    // Check the salt length
    console.log('Salt length:', salt.length);  // Should be 29 characters for bcrypt's default salt

    // Compare the hashed password with the original password (simulating login)
    const isMatch = await bcrypt.compare(testPassword, hash);
    console.log('Password match result:', isMatch);  // Should return true if everything works correctly
  } catch (err) {
    console.error('Error in hashing process:', err);
  }
}

testSaltAndHash();