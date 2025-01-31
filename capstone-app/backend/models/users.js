const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  username: { type: String, required: false },
  password: { type: String, required: true }, // Ideally hashed
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);