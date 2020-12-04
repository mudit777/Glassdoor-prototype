;var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    var query = "SELECT * FROM jobs WHERE lower(REPLACE(job_title, ' ', '')) LIKE lower(REPLACE('%"+ message.searchValue+"%', ' ', ''))";
    var locationQuery = "";
    if(message.location.length !== "")
    {
        locationQuery = "AND (lower(REPLACE(job_city, ' ', '')) LIKE lower(REPLACE('%"+ message.location+"%', ' ', '')) OR lower(REPLACE(job_zip, ' ', '')) LIKE lower(REPLACE('%"+ message.location+"%', ' ', '')))";
    }
    query = query + locationQuery;
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
            console.log("~!~~!~!!~!~!~!~!~!~!~!~!~", response)
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;