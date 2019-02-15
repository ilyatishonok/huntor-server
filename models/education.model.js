const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Education', EducationSchema);