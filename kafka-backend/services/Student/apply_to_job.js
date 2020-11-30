
var applications = require('../../Models/applicationModel');


function handle_request(message, callback)
{
    applications.findOne({student_id: message.student_id, job_id : message.job_id}, (err, result) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
            callback(null, response);
        }
        if(result !== null)
        {
            response.code = 299;
            callback(null, response);
        }
        else
        {
            applications.create(message, (err, result) => {
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
    })
   
}
exports.handle_request = handle_request;