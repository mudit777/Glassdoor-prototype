const date = require('date-and-time');
const bcrypt = require('bcrypt');
var connection = require('../../mysql_database');
var mysql = require('mysql')

function handle_request(message, callback){
    var query = `SELECT
                    company_id,
                    company_name,
                    company_email,
                    company_city,
                    company_state,
                    company_industry,
                    company_website,
                    company_size,
                    company_type,
                    company_revenue,
                    company_headquarter,
                    company_YOF,
                    company_desc,
                    company_mission,
                    company_ceo_first_name,
                    company_ceo_last_name,
                    company_total_reviews_count,
                    company_avg_overall_rating,
                    company_avg_rec_to_friend_rating,
                    company_avg_ceo_approval_rating,
                    company_first_name, -- first name of person that made the company
                    company_last_name,
                    creater_job_title,
                    company_profile_photo
                FROM companies`;
    connection.query(query, (err, companies) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
            callback(null, response);
        }
        else if(companies.length >= 0)
        {
            response.code = 200;
            response.data = companies;
            callback(null, response);
        }
    })
}
exports.handle_request = handle_request;

