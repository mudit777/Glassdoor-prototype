var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    var query = "SELECT * FROM students WHERE student_id = '"+ message.student_id +"'";
    connection.query(query, (err, student) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else 
        {
            response.code = 200;
            response.data = student[0];
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;