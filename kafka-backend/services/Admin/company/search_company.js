const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const handle_request = async (message, callback) => {
    let response = {};
    try {
        let the_query = `SELECT
                            company_id,
                            company_name,
<<<<<<< HEAD
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
=======
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
                        FROM companies WHERE company_name LIKE "%${message.searchTerm}%"`;
        let rows = await query(the_query);
        response.code = 200;
        response.data = rows;
        callback(null, response);
    } catch (e) {
        response.code = 500;
        response.data = e;
        callback(null, response);
    }
}
exports.handle_request = handle_request;

