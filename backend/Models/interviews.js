const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
    student_id: {type: String, required: true},
    job_id: {type: String, required: true},
    interview_questions: {type: [String], required: true},
    interview_answers: {type: [String], required: true},
    interview_difficulty: {type: String, required:true, enum: ["Easy", "Average", "Difficult"]},
    interview_overall_exp: {type: String, required: true, enum: ['Positive', 'Negative', 'Neutral']},
    interview_offer: {type: String, enum: ["Rejected", "Accepted"]},
},
{
    versionKey: false
});

const interviewModel = mongoose.model('interviews', applicaitonSchema);
module.exports = interviewModel;