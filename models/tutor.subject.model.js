const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorSubjectSchema = new Schema({
    value: { 
        type: String,
        required: true,
        unique: true,
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question',
    }],
});

module.exports = mongoose.model('TutorSubject', TutorSubjectSchema, 'tutor-subjects');