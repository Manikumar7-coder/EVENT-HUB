const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/events', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const events = await Event.find().populate('organizer', 'name');
  res.json(events);
});

router.put('/events/:id/approve', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const event = await Event.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
  res.json(event);
});

router.get('/users', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const users = await User.find().select('-password');
  res.json(users);
});

module.exports = router;
