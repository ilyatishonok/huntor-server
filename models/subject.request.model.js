const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectRequestSchema = new Schema({
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        default: 'pending',
    },
});

module.exports = mongoose.model(
    'SubjectRequestRequest',
    SubjectRequestSchema,
    'subject-requests'
);