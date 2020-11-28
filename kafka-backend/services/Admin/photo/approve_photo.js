const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
var photos = require('../../../Models/photos');

async function handle_request(message, callback){
    let response = {}
    try {
        let the_photo = await photos.findById(message._id);
        if (the_photo.photo_status !== "Undecided") {
            console.log("here");
            response.code = 405;
            response.data = "You can't approve a photo that is not `Undecided`"
            callback(null, response);
            return
        }
        the_photo.photo_status = "Approved";
        await the_photo.save();
        response.code = 200;
        callback(null, response);
    } catch (e) {
        response.code = 500;
        response.data = e;
        callback(null, response);
    }
}
exports.handle_request = handle_request;