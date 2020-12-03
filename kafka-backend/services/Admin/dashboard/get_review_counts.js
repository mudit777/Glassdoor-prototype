const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const handle_request = async (message, callback) => {
    let response = {};
    try {
        let the_query = `SELECT COUNT(review_id) as the_number_of_reviews FROM reviews
                            WHERE review_date BETWEEN '${message.query_date} 00:00:00' AND '${message.query_date} 23:59:59';`;
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