const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const protect = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authorized, no token' });
};

const admin = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const admin = await Admin.findById(req.user._id);
    if (admin) {
      return next();
    }
  }
  res.status(401).json({ message: 'Not authorized as an admin' });
};

module.exports = { protect, admin };
