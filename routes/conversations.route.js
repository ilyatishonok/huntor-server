const express = require('express');
const passport = require("passport");
const conversationController = require('../controllers/conversation.controller');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), conversationController.getOpenConversations);

module.exports = router;