const date = require('date-and-time');
const bcrypt = require('bcrypt');
var connection = require('../../mysql_database');
var mysql = require('mysql')

function handle_request(message, callback){
    var query = `SELECT r.review_id, r.review_desc, r.review_headline, r.review_pros, r.review_cons, r.review_desc, r.review_rating
                FROM reviews r, companies c
                WHERE r.company_id = c.company_id AND c.company_id = ${message.company_id}
                AND (r.review_status = "Approved" OR r.review_status = "Unapproved")`;
    connection.query(query, (err, companies) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
            callback(null, response);
        }
        else if(companies.length >= 0)
        {
            response.code = 200;
            response.data = companies;
            callback(null, response);
        }
    })
}
exports.handle_request = handle_request;

