const DonationRequest = require('../models/DonationRequest');
const User = require('../models/User');

const DonationRequest = require('../models/DonationRequest');
const User = require('../models/User');
const VolunteerAssignmentLog = require('../models/VolunteerAssignmentLog');

const DonationRequest = require('../models/DonationRequest');
const User = require('../models/User');
const HungerSpot = require('../models/HungerSpot');
const VolunteerAssignmentLog = require('../models/VolunteerAssignmentLog');
const { getETA } = require('../utils/openRouteService');

// @desc    Create a new donation request
// @route   POST /api/donations
// @access  Private (Donor)
exports.createDonation = async (req, res) => {
  try {
    const {
      foodDescription,
      quantity,
      type,
      pickupAddress,
      location,
      preferredPickupTime,
      expiryTime,
      images,
    } = req.body;

    if (!location || !location.coordinates || location.coordinates.length !== 2) {
      return res.status(400).json({ message: 'Invalid location data' });
    }

    const donorLocation = {
      lat: location.coordinates[1],
      lng: location.coordinates[0],
    };

    const hungerSpots = await HungerSpot.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [donorLocation.lng, donorLocation.lat] },
          $maxDistance: 10000, // 10km
        },
      },
    });

    const volunteers = await User.find({
      role: 'volunteer',
      isVerified: true,
      available: true,
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [donorLocation.lng, donorLocation.lat] },
          $maxDistance: 8000, // 8km
        },
      },
    });

    let eligibleMatches = [];

    for (const spot of hungerSpots) {
      for (const vol of volunteers) {
        const volunteerLocation = {
          lat: vol.location.coordinates[1],
          lng: vol.location.coordinates[0],
        };
        const spotLocation = {
          lat: spot.location.coordinates[1],
          lng: spot.location.coordinates[0],
        };

        const timeToPickup = await getETA(volunteerLocation, donorLocation);
        const timeToDeliver = await getETA(donorLocation, spotLocation);
        const totalTime = timeToPickup + timeToDeliver + 5; // 5 min buffer

        if (totalTime <= 45) {
          eligibleMatches.push({
            volunteer: vol,
            hungerSpot: spot,
            totalTime: totalTime,
            capacity: spot.capacity,
          });
        }
      }
    }

    // Sort eligible matches: primary by totalTime (ascending), secondary by hungerSpot capacity (descending)
    eligibleMatches.sort((a, b) => {
      if (a.totalTime !== b.totalTime) {
        return a.totalTime - b.totalTime;
      }
      return b.capacity - a.capacity;
    });

    const bestMatch = eligibleMatches.length > 0 ? eligibleMatches[0] : null;

    const donation = new DonationRequest({
      donorId: req.user._id,
      foodDescription,
      quantity,
      type,
      pickupAddress,
      location,
      preferredPickupTime,
      expiryTime,
      images,
      status: 'pending',
    });

    if (bestMatch) {
      donation.assignedVolunteer = bestMatch.volunteer._id;
      donation.deliveredTo = bestMatch.hungerSpot._id;
      donation.status = 'accepted';

      const assignment = new VolunteerAssignmentLog({
        volunteerId: bestMatch.volunteer._id,
        donationId: donation._id,
        statusTimeline: { acceptedAt: new Date() },
      });
      await assignment.save();
    }

    const createdDonation = await donation.save();
    res.status(201).json(createdDonation);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getMyDonations = async (req, res) => {
  try {
    const donations = await DonationRequest.find({ donorId: req.user._id });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.cancelDonation = async (req, res) => {
  try {
    const donation = await DonationRequest.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.donorId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    donation.status = 'cancelled';
    await donation.save();

    res.json({ message: 'Donation cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getDonationById = async (req, res) => {
  try {
    const donation = await DonationRequest.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};