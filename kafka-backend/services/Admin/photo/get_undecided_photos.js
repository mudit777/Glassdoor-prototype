const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
var photos = require('../../../Models/photos');

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