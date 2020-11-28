const conn = require('../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const handle_request = async (message, callback) => {
    let response = {}
    try {
        let avg_overall_rating_query = `SELECT company_id, company_name, company_avg_overall_rating as the_rating FROM companies
                                          ORDER BY company_avg_overall_rating DESC LIMIT 5;`;
        let avg_rec_to_friend_rating_query = `SELECT company_id, company_name, company_avg_rec_to_friend_rating as the_rating FROM companies
                                                ORDER BY company_avg_rec_to_friend_rating DESC LIMIT 5;`;
        let avg_ceo_approval_rating_query = `SELECT company_id, company_name, company_avg_ceo_approval_rating as the_rating FROM companies
                                                ORDER BY company_avg_ceo_approval_rating DESC LIMIT 5;`;

        let first_result = await query(avg_overall_rating_query);
        let second_result = await query(avg_rec_to_friend_rating_query);
        let third_result = await query(avg_ceo_approval_rating_query);

        response.code = 200;
        response.data = {
            avg_overall_rating: first_result,
            avg_rec_to_friend_rating: second_result,
            avg_ceo_approval_rating: third_result
        }
        callback(null, response);
    } catch (e) {
        response.code = 500;
        response.data = e;
        callback(null, response);
    }
}
exports.handle_request = handle_request;