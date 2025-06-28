const express = require('express');
const router = express.Router();
const { registerVolunteer, loginUser } = require('../controllers/authController');

router.post('/register/volunteer', registerVolunteer); 
router.post('/login', loginUser); 

module.exports = router;
