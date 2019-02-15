const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const tutorRoute = require('./tutor.route');
const bookRoute = require('./book.route');
const calendarRoute = require('./calendar.route');
const subjectRoute = require('./subject.route');
const educationRoute = require('./education.route');

const router = express.Router();

router.use('/', authRoute);
router.use('/user', userRoute);
router.use('/tutors', tutorRoute);
router.use('/subjects', subjectRoute);
router.use('/book', bookRoute);
router.use('/calendar', calendarRoute);
router.use('/educations', educationRoute);

module.exports = router;