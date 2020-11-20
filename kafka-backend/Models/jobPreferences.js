const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prefrenceSchema = new Schema({
    student_id: {type: String, required: true},
    job_search_status: {type: String},
    preferred_industries: {type: Array},
    job_titles: [String],
    target_salary: Number,
    open_to_relocation: Boolean
},
{
    versionKey: false
});

const prefrenceModel = mongoose.model('jobPreferences', prefrenceSchema);
module.exports = prefrenceModel;