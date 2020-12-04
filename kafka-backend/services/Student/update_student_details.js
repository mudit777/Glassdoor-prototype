var connection = require('../../mysql_database');
var jobPreferences = require('../../Models/jobPreferences');
var mysql = require('mysql')

function handle_request(message, callback)
{
    var studentId = message.student.student_id;
    delete message.student.student_id;
    // let gender = 1?message.student.gender==='Male':0
    console.log(message,'[[[[[[[[[]]]]]]]]]]]]]')
    var query = "UPDATE glassdoor.students SET "+ " " + mysql.escape(message.student) + " " + " WHERE student_id = '"+ studentId +"'";
    connection.query(query, (err, result) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
            callback(null, response);
        }
        else
        {
            jobPreferences.findOne({student_id : studentId}, (err, jobPreference) => {
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                    callback(null, response);
                }
                else if(jobPreference === null)
                {
                    jobPreferences.create(message.jobPreference, (err, result) => {
                        if(err)
                        {
                            response.code = 500;
                            response.data = err;
                            callback(null, response);
                        }
                        else
                        {
                            response.code = 200;
                            callback(null, response);
                        }
                    })
                }
                else
                {
                    jobPreferences.updateOne({student_id : studentId}, {$set : {
                        job_search_status : message.jobPreference.job_search_status,
                        preferred_industries : message.jobPreference.preferred_industries,
                        job_titles : message.jobPreference.job_titles,
                        target_salary : message.jobPreference.target_salary,
                        open_to_relocation : message.jobPreference.open_to_relocation
                    }}, (err, results) => {
                        if(err)
                        {
                            response.code = 500;
                            response.data = err;
                            callback(null, response);
                        }
                        else
                        {
                            response.code = 200;
                            callback(null, response);
                        }
                    })
                }
            })
        }
    })
}
exports.handle_request = handle_request;