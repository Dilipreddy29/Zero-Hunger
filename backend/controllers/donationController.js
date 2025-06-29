const DonationRequest = require('../models/DonationRequest');
const User = require('../models/User');
const VolunteerAssignmentLog = require('../models/VolunteerAssignmentLog');

// @desc    Create a new donation request (NO AUTH)
// @route   POST /api/donations
exports.createDonation = async (req, res) => {
  try {
    const {
      foodDescription,
      quantity,
      type,
      pickupAddress,
      donorName,
      donorPhone,
      location,
      preferredPickupTime,
      expiryTime,
      images,
    } = req.body;

    // ✅ Validate location format
    if (!location?.coordinates || location.coordinates.length !== 2) {
      return res.status(400).json({ message: 'Invalid location data' });
    }

    // ✅ Find any available volunteer
    const availableVolunteer = await User.findOne({
      role: 'volunteer',
      isVerified: true,
      available: true,
    });

    // ✅ Create donation request
    const donation = new DonationRequest({
      donorName,
      donorPhone,
      foodDescription,
      quantity,
      type,
      pickupAddress,
      location,
      preferredPickupTime,
      expiryTime,
      images,
      status: availableVolunteer ? 'accepted' : 'pending',
      assignedVolunteer: availableVolunteer?._id || null,
    });

    const savedDonation = await donation.save();

    // ✅ Mark volunteer unavailable and log assignment
    if (availableVolunteer) {
      availableVolunteer.available = false;
      await availableVolunteer.save();

      const assignment = new VolunteerAssignmentLog({
        volunteerId: availableVolunteer._id,
        donationId: savedDonation._id,
        statusTimeline: { acceptedAt: new Date() },
      });

      await assignment.save();
    }

    // ✅ Send response
    res.status(201).json({
      message: availableVolunteer
        ? 'Donation created and volunteer assigned.'
        : 'Donation created. No volunteer available now.',
      status: donation.status,
      volunteer: availableVolunteer
        ? {
            name: availableVolunteer.name,
            phone: availableVolunteer.phone,
          }
        : null,
    });
  } catch (error) {
    console.error('Error creating donation:', error);
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