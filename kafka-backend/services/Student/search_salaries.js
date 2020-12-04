var connection = require('../../mysql_database');
var salaries = require('../../Models/salaries');

function handle_request(message, callback)
{
    var query = "SELECT company_id FROM companies WHERE lower(REPLACE(company_name, ' ', '')) LIKE lower(REPLACE('%"+ message.searchValue+"%', ' ', ''))"
    connection.query(query, (err, company) => {
        var response = {}
        if(err)
        {
            response.code = 500;
            response.code = err;
            callback(null, response)
        }
        else
        {
            console.log("`~~~~~~~~~~~~~~~~~", company)
            salaries.find({company_id : company[0].company_id}, (err, interviews) => {
                if(err)
                {
                    response.code = 500;
                    response.code = err;
                    callback(null, response)
                }
                else
                {
                    response.code = 200;
                    response.data = interviews;
                    callback(null, response)
                }
            })
        }
        
    })
}
exports.handle_request = handle_request;