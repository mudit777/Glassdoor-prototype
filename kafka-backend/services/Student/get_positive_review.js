var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    console.log('xxxxxxxxxxxxxxxxxxxxxx')
    var query = "SELECT * from glassdoor.reviews where review_helpful = (SELECT MAX(review_helpful) FROM glassdoor.reviews where review_rating = (SELECT MAX(review_rating) from glassdoor.reviews where company_id="+ message.company_id +") and company_id="+ message.company_id +") and company_id = "+ message.company_id +" and review_rating= (Select MAX(review_rating) from glassdoor.reviews where company_id="+ message.company_id +") Limit 1 ;"
    console.log(query)
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
        console.log(response.data)
        callback(null, response);
    })
}
exports.handle_request = handle_request;