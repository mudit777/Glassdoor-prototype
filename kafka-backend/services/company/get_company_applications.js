var applications = require('../../Models/applicationModel');
var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    var response = {};
    applications.find({company_id : message.company_id}, (err, result) => {
        if(err)
        {
            response.code = 500;
            response.data = err;
            callback(null, response);
        }
        else
        {
            
            response.code = 200;
            response.data = result;
            callback(null, response);
        }
    })    
}
exports.handle_request = handle_request;
