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
}, {
    discriminatorKey: 'role',
});

const StudentSchema = new Schema({
}, {
    discriminatorKey: 'role',
});

const TutorSchema = new Schema({
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'TutorSubject',
    }],
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Questions',
    }],
    isVerified: {
        type: Boolean,
        default: 0,
    },
    isVisible: {
        type: Boolean,
        default: 0,
    }
}, {
    discriminatorKey: 'role',
});

const User = mongoose.model('User', UserSchema);

exports.User = User;
exports.Student = User.discriminator('Student', StudentSchema, 'student');
exports.Tutor = User.discriminator('Tutor', TutorSchema, 'tutor');