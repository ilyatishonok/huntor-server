const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    booking: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    mark: {
        type: Number,
    },
});

module.exports = mongoose.model('Lesson', LessonSchema);