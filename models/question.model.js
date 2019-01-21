const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    tutorSubject: {
        type: Schema.Types.ObjectId,
        ref: 'TutorSubject',
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Question', QuestionSchema, 'questions');