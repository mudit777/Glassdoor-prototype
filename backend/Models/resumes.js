const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
    student_id: {type: String, required: true},
    path: {type: String, required: true}
},
{
    versionKey: false
});

const resumeModel = mongoose.model('resumes', resumeSchema);
module.exports = resumeModel;