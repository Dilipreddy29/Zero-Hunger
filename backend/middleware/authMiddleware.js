const mongoose = require('mongoose');
// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // or Admin if you're using that
exports.protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Handle fixed admin token
      if (decoded.id === 'admin-fixed-id') {
        req.user = { _id: new mongoose.Types.ObjectId('60c72b2f9b1e8b001c8e4d7a'), role: 'admin' }; // dummy admin user
      } else {
        req.user = await User.findById(decoded.id).select('-password');
      }

      console.log('User authenticated:', req.user);
      next();
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};


exports.admin = (req, res, next) => {
  console.log('Checking admin access for user:', req.user);
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only' });
  }
};
