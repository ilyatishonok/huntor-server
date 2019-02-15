const express = require('express');
const passport = require('passport');
const calendarController = require('../controllers/calendar.controller');

const router = express.Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), calendarController.getVisibleEvents);

module.exports = router;
