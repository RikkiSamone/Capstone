'use strict';
const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const uri = process.env.DB_URI || "mongodb://localhost/appointments";
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`MongoDB connected at ${uri}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

// Export the function
module.exports = dbConnect;