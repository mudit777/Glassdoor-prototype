var connection = require('../../mysql_database');
var mysql = require('mysql')

function handle_request(message, callback)
{
      var company_id = message.company_id;
      delete message.company_id;
      var query = "UPDATE companies SET" + mysql.escape(message) + "WHERE company_id = '"+ company_id +"'";
      connection.query(query, (err, result) => {
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