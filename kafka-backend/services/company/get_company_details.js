var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    var query = "SELECT * FROM companies WHERE company_id = '"+ message.company_id +"'";
    connection.query(query, (err, company) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else 
        {
            response.code = 200;
            response.data = company[0];
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;