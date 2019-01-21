const express = require('express');
const passport = require("passport");
const educationController = require('../controllers/education.controller');

const router = express.Router();

router.get('/', educationController.getEducations);
router.post('/', passport.authenticate('jwt', { session: false }), educationController.createEducation);

module.exports = router;