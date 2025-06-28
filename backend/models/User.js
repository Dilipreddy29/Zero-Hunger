const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  passwordHash: {
    type: String,
    default: null
  },
  googleId: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['donor', 'volunteer', 'admin', 'staff'],
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },
  available: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true 
=======
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  role: { type: String, enum: ['donor', 'volunteer', 'admin'], required: true },
  isVerified: { type: Boolean, default: false }
>>>>>>> b3fdeae6dd8b5f7794fa00ec3dbef15dcf2fc7e2
});

module.exports = mongoose.model('User', userSchema);
