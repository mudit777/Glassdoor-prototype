var connection = require('../../mysql_database');
const bcrypt = require('bcrypt');

function handle_request(message, callback)
{
    var query = "";
    var response = {};
    if(message.type === "Admin")
    {
        if(message.password === "admin" && message.email === "admin@gmail.com")
        {
            response.code = 200;
            response.data = {
                email : "admin@gmail.com"
            }
        }
        else
        {
            response.code = 500;
            response.data = err;
        }
        callback(null, response);
    }
    else
    {
        switch(message.type)
        {
            case "student":
                query = "SELECT * FROM students WHERE student_email = '"+ message.email +"'";
                break;
            
            case "company":
                query = "SELECT * FROM companies WHERE company_email = '"+ message.email +"'";
                break;
        }
        connection.query(query, (err, result) => {
            
            if(err)
            {
                response.code = 500;
                response.data = err;
                callback(null, response)
            }
            else if(result.length === 0)
            {
                response.code = 207
                callback(null, response)
            }
            else
            {
                bcrypt.compare(message.password, result[0].password, (err, isPasswordTrue) => {
                    if(err)
                    {
                        response.code = 500;
                        response.data = err;
                        callback(null, response)
                    }
                    else
                    {
                        if(isPasswordTrue)
                        {
                            console.log()
                            delete result[0].password;
                            response.code = 200;
                            response.data = result[0];
                            callback(null, response);
                        }
                        else
                        {
                            response.code = 209
                            callback(null, response)
                        }
                    }
                })
            }
        })
    }
    
}
exports.handle_request =  handle_request;