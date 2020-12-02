var interviews = require('../../Models/interviewModel');

function handle_request(message, callback)
{
    response = {};
    interviews.create(message, (err, result) => {
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