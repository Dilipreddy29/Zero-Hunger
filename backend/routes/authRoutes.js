const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerVolunteer, loginUser } = require('../controllers/authController');

router.post('/register', registerVolunteer);

router.post('/login', loginUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/'); 
  }
);

module.exports = router;
