const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
<<<<<<< HEAD
    photo_path: {type: String, required: true}, // URL from S3
=======
    photo_path: {type: String, required: true},
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
    photo_status: {type: String, required: true, enum: ["Unapproved", "Approved", "Undecided"], default: "Undecided"},
    photo_owner_role: {type: String, required: true, enum: ["User", "Company"]},
    photo_owner_id: {type: String, required: true}, // userID or companyID from MySQL
},
{
    versionKey: false
});

const photoModel = mongoose.model('photos', photoSchema);
module.exports = photoModel;
