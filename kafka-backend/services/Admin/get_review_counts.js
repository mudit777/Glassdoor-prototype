const date = require('date-and-time');
const bcrypt = require('bcrypt');
var connection = require('../../mysql_database');
var mysql = require('mysql')

function handle_request(message, callback){
    console.log(message);
    var query = `SELECT COUNT(review_id) as the_number_of_reviews FROM reviews
                    WHERE review_date BETWEEN '${message.query_date} 00:00:00' AND '${message.query_date} 23:59:59';`;
    connection.query(query, (err, count) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
            callback(null, response);
        }
        response.code = 200;
        response.data = count;
        callback(null, response);
    })
}
exports.handle_request = handle_request;