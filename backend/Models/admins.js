const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({ // TBD
    admin_email: String,
    admin_password: String,
    admin_credential: String
},
{
    versionKey: false
});

const adminModel = mongoose.model('admins', adminSchema);
module.exports = adminModel;