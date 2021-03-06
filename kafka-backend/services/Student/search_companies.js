var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    var query = "SELECT * FROM companies WHERE lower(REPLACE(company_name, ' ', '')) LIKE lower(REPLACE('%"+ message.searchValue+"%', ' ', ''))"
    connection.query(query, (err, result) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else
        {
            response.code = 200;
            response.data = result
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;