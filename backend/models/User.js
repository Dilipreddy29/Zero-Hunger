const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  role: { type: String, enum: ['donor', 'volunteer', 'admin'], required: true },
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
