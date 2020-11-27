const date = require('date-and-time');
const bcrypt = require('bcrypt');
var connection = require('../../mysql_database');
var mysql = require('mysql')
var photos = require('../../Models/photos');

async function handle_request(message, callback){
    let response = {}
    try {
        let undecided_photos = await photos.find({ photo_status: "Undecided"});
        response.code = 200;
        response.data = undecided_photos;
        callback(null, response);
    } catch (e) {
        response.code = 500;
        response.data = e;
    }
}
exports.handle_request = handle_request;