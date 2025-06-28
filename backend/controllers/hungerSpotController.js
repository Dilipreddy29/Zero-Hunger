const HungerSpot = require('../models/HungerSpot');
const Admin = require('../models/Admin');


exports.getHungerSpots = async (req, res) => {
  try {
    const spots = await HungerSpot.find({});
    res.json(spots);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getNearbyHungerSpots = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const spots = await HungerSpot.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 5000, // 5km
        },
      },
    });
    res.json(spots);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new hunger spot
// @route   POST /api/hunger-spots
// @access  Private (Admin)
exports.createHungerSpot = async (req, res) => {
  try {
    const {
      name,
      category,
      contactPerson,
      phone,
      address,
      location,
      capacity,
    } = req.body;

    const spot = new HungerSpot({
      name,
      category,
      contactPerson,
      phone,
      address,
      location,
      capacity,
      createdBy: req.user._id, // Assuming admin user is available in req.user
    });

    const createdSpot = await spot.save();
    res.status(201).json(createdSpot);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};