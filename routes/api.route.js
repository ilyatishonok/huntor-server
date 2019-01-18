const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const courseRoute = require('./course.route');

const router = express.Router();

router.use('/user', userRoute);
router.use('/', authRoute);
router.use('/courses', courseRoute)

module.exports = router;