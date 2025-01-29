'use strict';
const Mongoose = require('mongoose');

const uri = process.env.DB_URI ||
    "mongodb://localhost/appointments";

Mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB connected at ${uri}`))
  .catch(error => console.log('MongoDB connection error: ' + error.message));
// Get the default connection
const db = Mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));


exports.Mongoose = Mongoose;