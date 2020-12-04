var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    var query = "SELECT * FROM reviews";
    connection.query(query, (err, reviews) => {
        var response = {}
        if(err)
        {
            response.code = 500;
            response.data = errl
        }
        else
        {
            response.code = 200;
            response.data = reviews;
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;