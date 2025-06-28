const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getCurrentUser
} = require('../controllers/authController');

router.post('/register', registerUser);

router.get('/verify-email/:token', verifyEmail);

router.post('/login', loginUser);

router.get('/logout', logoutUser);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/'); 
  }
);

module.exports = router;
