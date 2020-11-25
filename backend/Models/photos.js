const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    mysql_id: {type: String, required: true}, // userID or companyID from MySQL
    photo_paths: {type: [String], required: true}, // Paths to the files
    photo_approved_images: [String], 
    photo_unapproved_images: [String],
    owner_role: {type: String, required: true, enum: ["User", "Company"]},
},
{
    versionKey: false
});

const photoModel = mongoose.model('photos', photoSchema);
module.exports = photoModel;