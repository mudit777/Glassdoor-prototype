const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    student_id: {type: String, required: true},
    student_first_name: {type: String, required: true},
    student_last_name: {type: String, required: true},
    student_email: {type: String, required: true},
    student_password: {type: String, required: true},
    student_preferred_industry: String,
    student_relocation: {type: Boolean, default: true},
    student_target_salary: Number,
    student_job_search_status: {type: String, enum: ["Not Looking", "Casually Looking", "Actively Looking"]},
    student_race: String,
    student_gender: {type: Boolean, default: true}, // true to man
    student_disability: {type: Boolean, default: false}, // true to disabled
    student_veteran: {type: Boolean, default: false}, // true to yes
    student_total_reviews_count: {type: Number, default: 0},
},
{
    versionKey: false
});

const studentModel = mongoose.model('students', studentSchema);
module.exports = studentModel;