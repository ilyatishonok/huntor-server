const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {type: String, required: true, max: 100, unique: true, },
    name: {type: String, required: true},
    passwordHash: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    birthday: {type: String, required: true},
    middlename: {type: String, require: true},
});

module.exports = mongoose.model('User', UserSchema);