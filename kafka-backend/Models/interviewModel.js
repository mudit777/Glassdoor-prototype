const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
    student_id: {type: String, required: true},
    company_id: {type: String, required: true},
    process_rating: {type: String, required: true},
    job_title: {type: String, required: true},
    description: {type: String, required: true},
    interview_difficulty : {type: String, required: true},
    got_offer: {type: String, required: true},
    questions_answers: {type: Array}
},
{
    versionKey: false
});

const interviewModel = mongoose.model('interviews', interviewSchema);
module.exports = interviewModel;