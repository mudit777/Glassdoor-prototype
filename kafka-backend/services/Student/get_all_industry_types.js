var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    var query = "SELECT toi_type FROM type_of_industries";
    connection.query(query, (err, industries) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else
        {
            response.code = 200;
            response.data = industries;
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;