const date = require('date-and-time');
const bcrypt = require('bcrypt');
var connection = require('../../mysql_database');
var mysql = require('mysql')

function handle_request(message, callback){
    console.log("@@@@@@@@@@@@@@", message);
    var query = `UPDATE reviews SET review_status="Unapproved" WHERE review_id=${message.review_id}`;
    connection.query(query, (err, result) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else
        {
            response.code = 200;
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;