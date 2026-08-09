const express = require('express');
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name email').sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const payload = { ...req.body, organizer: req.user._id };
    const event = await Event.create(payload);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
