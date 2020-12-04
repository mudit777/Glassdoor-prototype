const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const handle_request = async (message, callback) => {
    let response = {};
    try {
        let the_query = `SELECT
                            company_id,
                            company_name,
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

