const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    photo_path: {type: String, required: true}, // URL from S3
    photo_status: {type: String, required: true, enum: ["Unapproved", "Approved", "Undecided"], default: "Undecided"},
    photo_owner_role: {type: String, required: true, enum: ["User", "Company"]},
    photo_owner_id: {type: String, required: true}, // userID or companyID from MySQL
<<<<<<< HEAD
    photo_owner_name: {type: String, required: true},
    photo_uploaded_for:{type: String, required: true, default:"self"}
=======
    photo_owner_name: {type: String, required: true}
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
    // If "User", concat first and last name with space
    // If "Company", just company name
},
{
    versionKey: false
});

const photoModel = mongoose.model('photos', photoSchema);
<<<<<<< HEAD
module.exports = photoModel;
=======
module.exports = photoModel;
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
