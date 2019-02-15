const express = require('express');
const passport = require('passport');
const userController = require('../controllers/user.controller');

const router = express.Router();

//router.post('/create', userController.createUser);
router.get('/', passport.authenticate('jwt', { session: false }), userController.getUserInfo);
router.get('/validate/email', userController.validateEmail);
router.get('/validate/username', userController.validateUsername);

module.exports = router;