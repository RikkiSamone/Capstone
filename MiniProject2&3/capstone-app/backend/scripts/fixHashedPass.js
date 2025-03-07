const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/users'); // Assuming the path to your User model
const dbConnect = require('../dbConnect');

// Function to fix passwords
const fixPasswordHashes = async () => {
  try {
    const users = await User.find(); // Fetch all users
      for (let user of users) {
          // Ensure that all required fields are present
          if (!user.firstName || !user.lastName) {
              console.warn(`Skipping user ${user.email} due to missing required fields.`);
              continue; // Skip users with missing required fields
          }
          
          // Only update the password if it hasn't been hashed already
          if (!user.password.startsWith('$2a$')) {  // bcrypt hashes start with $2a$ or $2b$
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(user.password, salt);

              // Update the user with the newly hashed password
              user.password = hashedPassword;
              // Validate and save the user document with the updated password
              
              try{
                    await user.validate(); // Manually trigger validation
            
                    await user.save();
                    console.log(`Updated password for ${user.email}`);
                } catch (validationError) {
                    console.error(`Error validating user ${user.email}: ${validationError.message}`);
                }
            }
            }
            console.log('Password hashes fixed!');
        } catch (error) {
            console.error('Error fixing password hashes:', error);
        } finally {
            mongoose.connection.close();
        }
};

// Connect to MongoDB using dbConnect and fix passwords
dbConnect()
  .then(() => fixPasswordHashes())
  .catch((err) => console.error('Error connecting to MongoDB:', err));