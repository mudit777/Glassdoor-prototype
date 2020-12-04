var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    var user = "UPDATE glassdoor.companies SET company_views = company_views+1 where company_id = "+ message.company_id +" ";
    connection.query(user,(err,result) =>{
        console.log(result)
        var response = {};
        if(err){
            response.code = 500;
            response.data = err;
            callback(null, response)
        }
        else
        {
            response.code = 200;
            console.log("=============", response)
            callback(null, 200);
        }
    })
}
exports.handle_request =  handle_request;

