const date = require('date-and-time');
const bcrypt = require('bcrypt');
var connection = require('../../mysql_database');
var mysql = require('mysql')

function handle_request(message, callback){
    var query = `SELECT 
                    review_id, review_desc, review_headline, review_pros, review_cons, review_desc, review_rating, 
                    student_first_name, student_last_name, company_name
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