var connection = require('../../mysql_database');

function handle_request(message, callback)
{
    var user = "INSERT INTO jobs (job_title, job_desc, job_res, job_qual, job_city, job_state, job_zip, job_street_address, job_industry, job_company_name, job_country, job_is_remote, job_expected_salary, company_id) VALUES ?";
    var values = [[message.job_title,message.job_desc, message.job_roles, message.job_qual, message.city, message.state, message.zipcode, message.street_address, message.industry_type, message.company_name, message.country, message.remote_inperson, message.salary, message.company_id]];
    connection.query(user, [values], (err,result) =>{
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

