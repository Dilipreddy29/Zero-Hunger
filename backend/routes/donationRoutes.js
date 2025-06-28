const express = require('express');
const router = express.Router();
const {
  createDonation,
  getMyDonations,
  cancelDonation,
  getDonationById,
} = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createDonation);
router.route('/my').get(protect, getMyDonations);
router.route('/:id/cancel').post(protect, cancelDonation);
router.route('/:id').get(protect, getDonationById);

module.exports = router;