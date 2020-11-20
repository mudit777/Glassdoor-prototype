var jobPreferences = require('../../Models/jobPreferences');

function handle_request(message, callback)
{
    jobPreferences.findOne({student_id : message.student_id}, (err, result) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else if(result !== null)
        {
            response.code = 200;
            response.data = result
        }
        else
        {
            response.code = 204;
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;