const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const handle_request = async (message, callback) => {
    let response = {};
    try {
        let the_query = `SELECT r.review_id, r.review_desc, r.review_headline, r.review_pros, r.review_cons, r.review_desc, r.review_rating
                        FROM reviews r, companies c
                        WHERE r.company_id = c.company_id AND c.company_id = ${message.company_id}
                        AND (r.review_status = "Approved" OR r.review_status = "Unapproved")`;
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

