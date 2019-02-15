const Chat = require('../models/conversation.model');

exports.getOpenConversations = async (req, res, next) => {
    try {
        const openConversations = await Chat.find({
            users: { $in: [req.user.id] },
            open: { $in: [req.user.id] },
        }).populate({
            path: 'users',
        });

        res.status(200).json({
            openConversations,
        });
    } catch(err) {
        next(err);
    }
}