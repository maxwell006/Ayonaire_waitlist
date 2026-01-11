const Waitlist = require("../models/waitlist.model");
const sendWaitlistEmail = require("../utils/sendWaitlistEmail");

exports.addToWaitlist = async (req, res) => {
  try {
    const { fullName, email, skillInterested } = req.body;

    if (!email || !fullName) {
      return res.status(400).json({ message: "Full name and email are required" });
    }

    const exists = await Waitlist.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already on waitlist" });
    }

    const waitlistEntry = await Waitlist.create({
      fullName,
      email,
      skillInterested,
    });

    // SEND EMAIL
    await sendWaitlistEmail({ email, fullName });

    res.status(201).json(waitlistEntry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getWaitlist = async (req, res) => {
  try {
    const waitlist = await Waitlist.find().populate("skillInterested");
    res.json(waitlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
