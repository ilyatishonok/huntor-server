const express = require('express');
const passport = require("passport");
const subjectController = require('../controllers/subject.controller');
const tutorController = require('../controllers/tutor.controller');

const router = express.Router();

//router.post('/tutor', tutorController.createTutorSubject);
//router.get('/tutors', tutorController.getTutors);
router.get('/', subjectController.getSubjects);
router.post('/', passport.authenticate('jwt', { session: false }), subjectController.createSubject);

module.exports = router;