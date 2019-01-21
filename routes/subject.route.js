const express = require('express');
const passport = require("passport");
const subjectController = require('../controllers/subject.controller');

const router = express.Router();

router.get('/', subjectController.getSubjects);
router.post('/', passport.authenticate('jwt', { session: false }), subjectController.createSubject);


module.exports = router;