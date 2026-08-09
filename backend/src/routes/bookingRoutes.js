const express = require('express');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { eventId, quantity } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const bookingId = `book_${Date.now()}`;
    const booking = await Booking.create({
      user: req.user._id,
      event: eventId,
      quantity,
      totalAmount: event.price * quantity,
      bookingId,
      qrData: `${bookingId}|${req.user.name}|${event.title}|${quantity}`
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
