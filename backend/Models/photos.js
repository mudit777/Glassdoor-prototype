const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    mysql_id: {type: String, required: true},
    path: {type: String, required: true},
    role: {type: String, required: true, enum: ["User", "Company"]},
},
{
    versionKey: false
});

const photoModel = mongoose.model('photos', photoSchema);
module.exports = photoModel;