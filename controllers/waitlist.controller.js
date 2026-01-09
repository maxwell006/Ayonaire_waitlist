const Waitlist = require('../models/waitlist.model');

exports.addToWaitlist = async (req, res) => {
  try {
    const { fullName, email, skillInterested } = req.body;

    const waitlistEntry = new Waitlist({ fullName, email, skillInterested });
    await waitlistEntry.save();

    res.status(201).json(waitlistEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWaitlist = async (req, res) => {
  try {
    const waitlist = await Waitlist.find().populate('skillInterested');
    res.json(waitlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
