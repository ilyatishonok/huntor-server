const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/create', userController.createUser);
router.get('/:id', userController.getUser);
router.get('/validate/email', userController.validateEmail);
router.get('/validate/username', userController.validateUsername);

module.exports = router;