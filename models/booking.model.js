const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    tutor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    tutorTime: [{
        type: Date,
    }],
    message: {
        type: String,
    },
    price: {
        type: Number,
    },
    debt: {
        type: Number,
    },
    status: {
        type: String,
        default: 'pending-tutor',
    },
    lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
    },
});

BookingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Booking', BookingSchema);