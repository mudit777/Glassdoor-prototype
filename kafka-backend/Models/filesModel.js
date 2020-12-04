const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filesSchema = new Schema({
    student_id: {type: String, required: true},
    primary_resume: {type: String, required: false},
    resumes: {type: Array},
    cover_letters: {type: Array},
},
{
    versionKey: false
});

const filesModel = mongoose.model('files', filesSchema);
module.exports = filesModel;