const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('User', userSchema);
