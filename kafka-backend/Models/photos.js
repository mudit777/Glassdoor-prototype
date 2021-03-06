const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    photo_path: {type: String, required: true}, // URL from S3
    photo_status: {type: String, required: true, enum: ["Unapproved", "Approved", "Undecided"], default: "Undecided"},
    photo_owner_role: {type: String, required: true, enum: ["User", "Company"]},
    photo_owner_id: {type: String, required: true}, // userID or companyID from MySQL
    photo_owner_name: {type: String, required: true}
    // If "User", concat first and last name with space
    // If "Company", just company name
},
{
    versionKey: false
});

const photoModel = mongoose.model('photos', photoSchema);
module.exports = photoModel;
