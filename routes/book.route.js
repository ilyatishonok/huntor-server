const express = require('express');
const passport = require('passport');
const bookingController = require('../controllers/booking.controller');

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), bookingController.createBooking);
router.get('/my', passport.authenticate('jwt', { session: false }), bookingController.getMyBookingsByDay);
//router.get('/', passport.authenticate('jwt', { session: false }), bookingController.getMyBookings);
//router.get('/:id', passport.authenticate('jwt', { session: false }), bookingController.getTutorBookings);

module.exports = router;
