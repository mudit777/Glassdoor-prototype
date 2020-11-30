const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    student_id: {type: String, required: true},
    job_id: {type: String, required: true},
    resume: {type: String, required: true},
    cover_letter: {type: String, required: true},
    application_status: {type: String, required: true, enum: ['Submitted', 'Withdraw', 'Reviewed', 'Initial Screening', 'Interviewing', 'Hired']}
},
{
    versionKey: false
});

const applicationModel = mongoose.model('applications', applicationSchema);
module.exports = applicationModel;