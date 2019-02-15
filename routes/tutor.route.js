const express = require('express');
const passport = require("passport");
const tutorController = require('../controllers/tutor.controller');

const router = express.Router();

router.get('/', tutorController.getTutors);
router.get('/:id', tutorController.getTutor);

module.exports = router;