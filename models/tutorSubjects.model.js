const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorSubjectSchema = new Schema({
    subject: { 
        type: Schema.Types.ObjectId,
        ref: 'Subject',
    },
    price: {
        type: Number,
        default: 0,
    },
    allowed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('TutorSubject', TutorSubjectSchema, 'tutor-subject');