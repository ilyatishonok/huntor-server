const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const subjectRoute = require('./subject.route');
const educationRoute = require('./education.route');

const router = express.Router();

router.use('/user', userRoute);
router.use('/', authRoute);
router.use('/subjects', subjectRoute);
router.use('/educations', educationRoute);

module.exports = router;