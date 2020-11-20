const date = require('date-and-time');
const bcrypt = require('bcrypt');
var connection = require('../../mysql_database');
var mysql = require('mysql')

function handle_request(message, callback){
    console.log('register student')
    var query = "SELECT * FROM students WHERE student_email = '"+ message.student_email +"';";
    connection.query(query, (err, student) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.date = err;
            callback(null, response);
        }
        else if(student.length > 0)
        {
            response.code = 299;
            callback(null, response);
        }
        else
        {
            bcrypt.hash(message.student_password, 10, (err, hash) => {
                if(err)
                {
                    response.code = 500;
                    response.date = err;
                    callback(null, response);
                }
                else
                {
                    message.student_password = hash;
                    var insertQuery = "INSERT INTO students SET " + mysql.escape(message); 
                    connection.query(insertQuery, (err, result) => {
                        if(err)
                        {
                            response.code = 500;
                            response.date = err;
                            callback(null, response);
                        }
                        else
                        {
                            response.code = 200;
                            callback(null, response);
                        }
                    })
                }
            });
 
        }

    })
}
exports.handle_request = handle_request;