const express = require('express');
const Review = require('../models/Review');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:eventId', async (req, res) => {
  try {
    const reviews = await Review.find({ event: req.params.eventId }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:eventId', authMiddleware, async (req, res) => {
  try {
    const review = await Review.create({ event: req.params.eventId, user: req.user._id, ...req.body });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
