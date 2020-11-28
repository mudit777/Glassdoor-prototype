const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const handle_request = async (message, callback) => {
    let response = {};
    try {
        let the_query = `SELECT c.company_id, c.company_name, COUNT(r.review_id) as the_count FROM reviews r, companies c
                            WHERE r.company_id = c.company_id
                            GROUP BY c.company_id
                            ORDER BY the_count DESC
                            LIMIT 5;`;
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