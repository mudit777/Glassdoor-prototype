const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteJobScehma = new Schema({
    student_id: {type: String, required: true},
    jobs: {type: Array},
},
{
    versionKey: false
});

const favouriteJobsModel = mongoose.model('favouriteJobs', favoriteJobScehma);
module.exports = favouriteJobsModel;