const express = require('express');
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/simulate', authMiddleware, async (req, res) => {
  try {
    const { bookingId, success } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.paymentStatus = success ? 'success' : 'failed';
    booking.status = success ? 'confirmed' : 'cancelled';
    await booking.save();

    const payment = await Payment.create({
      booking: booking._id,
      user: req.user._id,
      amount: booking.totalAmount,
      paymentId: success ? `pay_EVT${Date.now()}` : `pay_failed_${Date.now()}`,
      orderId: success ? `order_${Date.now()}` : `order_failed_${Date.now()}`,
      status: success ? 'success' : 'failed'
    });

    res.json({ payment, booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
