var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    console.log(message);
    var user = "INSERT INTO reviews (review_headline, review_desc, review_rating, review_pros, review_cons, review_status, review_helpful, review_marked_by_company, company_id, student_id) VALUES ?";
    var values = [[message.review_headline,message.review_description, message.rating, message.review_pros, message.review_cons, message.employment_status, message.review_helpful, message.review_marked_by_company, message.company_id, message.student_id]];
    connection.query(user,[values], function (err, result, fields) {
        console.log(result)
        var response = {};
        if(err){
            console.log(err)
            response.code = 500;
            response.data = err;
            callback(null, response)
        }
        else
        {
            response.code = 200;
            console.log("=============", response)
            callback(null, 200);
        }
    })
}
exports.handle_request =  handle_request;

