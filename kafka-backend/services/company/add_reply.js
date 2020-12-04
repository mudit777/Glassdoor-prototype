var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    var user = "UPDATE reviews SET review_reply = '"+message.reply+"' WHERE review_id = '"+message.review_id+"'";
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

