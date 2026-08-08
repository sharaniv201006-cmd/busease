const express = require('express');
const {
  createBooking,
  getStudentBookings,
  cancelBooking,
} = require('../controllers/bookingController');

const router = express.Router();

router.post('/bookings', createBooking);
router.get('/bookings/student/:studentId', getStudentBookings);
router.delete('/bookings/:id', cancelBooking);

module.exports = router;
