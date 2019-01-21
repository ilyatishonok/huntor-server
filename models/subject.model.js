const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SubjectSchema = new Schema({
    title: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Subject', SubjectSchema);