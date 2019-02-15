const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    created: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Message', MessageSchema);