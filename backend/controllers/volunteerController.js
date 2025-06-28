const DonationRequest = require('../models/DonationRequest');
const VolunteerAssignmentLog = require('../models/VolunteerAssignmentLog');


exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await DonationRequest.find({ assignedVolunteer: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.acceptPickup = async (req, res) => {
  try {
    const donation = await DonationRequest.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.status !== 'pending') {
      return res.status(400).json({ message: 'Donation not available for pickup' });
    }

    donation.assignedVolunteer = req.user._id;
    donation.status = 'accepted';

    const assignment = new VolunteerAssignmentLog({
      volunteerId: req.user._id,
      donationId: donation._id,
      statusTimeline: { acceptedAt: new Date() },
    });

    await donation.save();
    await assignment.save();

    res.json({ message: 'Donation accepted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.markAsPickedUp = async (req, res) => {
  try {
    const donation = await DonationRequest.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.assignedVolunteer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    donation.status = 'picked';
    await donation.save();

    await VolunteerAssignmentLog.findOneAndUpdate(
      { donationId: donation._id },
      { 'statusTimeline.pickedUpAt': new Date() }
    );

    res.json({ message: 'Donation marked as picked up' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.markAsDelivered = async (req, res) => {
  try {
    const donation = await DonationRequest.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.assignedVolunteer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    donation.status = 'delivered';
    await donation.save();

    await VolunteerAssignmentLog.findOneAndUpdate(
      { donationId: donation._id },
      { 'statusTimeline.deliveredAt': new Date() }
    );

    res.json({ message: 'Donation marked as delivered' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};