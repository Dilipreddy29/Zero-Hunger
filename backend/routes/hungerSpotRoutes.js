const express = require('express');
const router = express.Router();
const {
  getHungerSpots,
  getNearbyHungerSpots,
  createHungerSpot,
} = require('../controllers/hungerSpotController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getHungerSpots)
  .post(protect, createHungerSpot); // ✅ Fix: add `protect` before `admin`

router.route('/nearby')
  .get(getNearbyHungerSpots);

module.exports = router;
