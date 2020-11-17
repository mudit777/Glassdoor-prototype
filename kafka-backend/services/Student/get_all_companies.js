var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    var query = "SELECT * FROM companies"
    connection.query(query, (err, companies) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else if(companies.length > 0)
        {
            response.code = 200;
            response.data = companies;
        }
        else
        {
            response.code = 204;
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;