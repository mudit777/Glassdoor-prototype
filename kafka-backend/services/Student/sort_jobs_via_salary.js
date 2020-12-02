var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    console.log("~~~~~~~~~~~~~ temp is ~~~~~~~~~~~`", message);
    var temp = message.salary.split('-');
    var lower = temp[0];
    var upper = temp[1];
    var query = "SELECT * FROM jobs WHERE job_expected_salary >= '"+ lower +"' AND job_expected_salary < '"+ upper +"'";
    if(temp[1] === '')
    {
        query = "SELECT * FROM jobs WHERE job_expected_salary >= '"+ lower +"'";
    }
    connection.query(query, (err, jobs) => {
        var response = {}
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else 
        {
            response.code = 200;
            response.data = jobs;
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;