const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const handle_request = async (message, callback) => {
    let response = {};
    try {
        let the_query = `UPDATE reviews SET review_status="Approved" WHERE review_id=${message.review_id}`;
        await query(the_query);
        response.code = 200;
        callback(null, response);
    } catch (e) {
        response.code = 500;
        response.data = e;
        callback(null, response);
    }
}
exports.handle_request = handle_request;