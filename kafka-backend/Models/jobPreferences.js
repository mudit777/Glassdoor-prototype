const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prefrenceSchema = new Schema({
    student_id: {type: String, required: true},
<<<<<<< HEAD
    job_search_status: {type: String, enum: ['Not Looking', 'Casually Looking', 'Actively Looking']},
    preferred_industries: {type: [String]},
    // preferred_industries: {type: [String], enum: ["Agriculture", "Food / beverage", "Textile / leather", "IT / Tech", "Construction", "Trade", "Accommodation", "Finance", "Public Administration", "Other Services"]},
    // preferred_industries: [{type: String, enum: ["Agriculture", "Food / beverage", "Textile / leather", "IT / Tech", "Construction", "Trade", "Accommodation", "Finance", "Public Administration", "Other Services"]}],
=======
    job_search_status: {type: String},
    preferred_industries: {type: Array},
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
    job_titles: [String],
    target_salary: Number,
    open_to_relocation: Boolean
},
{
    versionKey: false
});

const prefrenceModel = mongoose.model('jobPreferences', prefrenceSchema);
module.exports = prefrenceModel;