const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Ideally hashed
  role: { type: String, enum: ["client", "coach"], required: true, default: "client"}, //distinguishes user/client from coach/admin
  createdAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model('User', userSchema);