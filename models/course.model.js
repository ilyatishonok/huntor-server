const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

let CourseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tutor: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
        required: true,
    },
});

CourseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Course', CourseSchema);