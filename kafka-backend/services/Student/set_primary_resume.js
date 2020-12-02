var files = require('../../Models/filesModel');

function handle_request(message, callback)
{
    files.updateOne({student_id : message.student_id}, {$set : {
        primary_resume : message.primary_resume
    }}, (err, result) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else
        {
            response.code = 200;
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;