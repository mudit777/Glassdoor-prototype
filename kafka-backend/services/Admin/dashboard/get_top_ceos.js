const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const handle_request = async (message, callback) => {
    let response = {}
    try {
        let the_query = `SELECT
                            company_id, company_ceo_first_name, company_ceo_last_name, company_avg_ceo_approval_rating, company_profile_photo
                            FROM companies
                            ORDER BY company_avg_ceo_approval_rating DESC
                            LIMIT 5;`

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