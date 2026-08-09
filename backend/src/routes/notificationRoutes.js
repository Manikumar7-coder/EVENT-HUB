const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json([
    { id: 1, text: 'Booking successful', type: 'success' },
    { id: 2, text: 'Payment successful', type: 'success' },
    { id: 3, text: 'Event reminder tomorrow', type: 'info' }
  ]);
});

module.exports = router;
