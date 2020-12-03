var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    var query = "SELECT * from glassdoor.reviews where review_helpful = (SELECT MAX(review_helpful) FROM glassdoor.reviews where review_rating = (SELECT MAX(review_rating) from glassdoor.reviews)) and company_id = "+ message.company_id +" ;"
    connection.query(query, (err, result) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else if(result.length > 0)
        {
            response.code = 200;
            response.data = result;
        }
        else
        {
            response.code = 204;
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;