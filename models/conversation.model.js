const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    open: [{
        type: String,
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
    }],
});

module.exports = mongoose.model('Chat', ChatSchema);