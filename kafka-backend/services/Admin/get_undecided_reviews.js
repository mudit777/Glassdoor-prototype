const date = require('date-and-time');
const bcrypt = require('bcrypt');
var connection = require('../../mysql_database');
var mysql = require('mysql')

function handle_request(message, callback){
    var query = `SELECT 
                    r.review_id, r.review_desc, r.review_headline, r.review_pros, r.review_cons, r.review_desc, r.review_rating, 
                    s.student_first_name, s.student_last_name, c.company_name
                FROM reviews r, students s, companies c
                WHERE r.student_id = s.student_id and r.company_id = c.company_id
                and review_status="Undecided"`;
    connection.query(query, (err, reviews) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
            callback(null, response);
        }
        else if(reviews.length >= 0)
        {
            response.code = 200;
            response.data = reviews;
            callback(null, response);
        }
    })
}
exports.handle_request = handle_request;