var applications = require('../../Models/applicationModel');

function handle_request(message, callback)
{
    applications.findOneAndUpdate({_id : message._id}, {application_status:"Withdrawn"},  (err, result) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else
        {
            response.code = 200;
            response.data = result;
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;