var applications = require('../../Models/applicationModel');
var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    var response = {};
    var job_title = [];
    var answer = [];
    applications.find({student_id : message.student_id}, (err, result) => {
        if(err)
        {
            response.code = 500;
            response.data = err;
            callback(null, response);
        }
        else
        {
            if(result.length > 0){
                result.map( i => {
                    let query = "SELECT job_title FROM jobs where job_id = '"+ i.job_id +"'"
                    connection.query(query, (err, job) => {
                        // console.log(job[0])
                        let temp = {
                            _id: i._id,
                            student_id: i.student_id,
                            job_id: i.student_id,
                            resume: i.resume,
                            cover_letter: i.cover_letter,
                            application_status: i.application_status,
                            job_title: job[0].job_title
                        };
                        console.log("TEMP IS: ", temp);
                        answer.push(temp);
                        if(answer.length === result.length){
                            response.code = 200;
                            response.data = answer;
                            console.log("RESPONSE IS:", response)
                            callback(null, response);
                        }
                    })
                })
            }
            
            // response.job_title = job_title
        }
    })    
}
exports.handle_request = handle_request;

// for( let i = 0; i < result.length; i++ ){
    //     console.log(result[i].job_id)
    //     let temp = result[i];
    //     var query = "SELECT job_title FROM jobs where job_id = '"+ result[i].job_id +"'"
    //     connection.query(query, (err, companies) => {
    //         console.log("Companies are:", companies[0].job_title)
    //         job_title.push(companies[0].job_title);
    //         temp["job_title"] = companies[0].job_title;
    //         answer.push(temp)   
    //     })
    //     if(result.length === i+1)
    //     {
    //         console.log("INSIDE ELSE:", answer)
    //         response.code = 200;
    //         response.data = answer;
    //         callback(null, response);
    //     }
    // }