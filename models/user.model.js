const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    wallet: {
        type: Schema.Types.ObjectId,
        ref: 'Wallet',
    },
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking',
    }],
    tutoring: {
        type: Schema.Types.ObjectId,
        ref: 'Tutoring',
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;