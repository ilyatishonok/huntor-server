const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutoringSchema = new Schema({
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'TutorSubject',
    }],
    subjectRequests: [{
        type: Schema.Types.ObjectId,
        ref: 'TutorSubjectRequest',
    }],
    education: {
        type: String,
        required: true,
    },
    completedLessons: {
        type: String,
        default: 0,
    },
});

module.exports = mongoose.model('Tutoring', TutoringSchema, 'tutorings');