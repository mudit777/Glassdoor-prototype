const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const handle_request = async (message, callback) => {
    let response = {};
    try {
        let the_query = `SELECT 
                            r.review_id, r.review_desc, r.review_headline, r.review_pros, r.review_cons, r.review_desc, r.review_rating, 
                            s.student_first_name, s.student_last_name, c.company_name
                        FROM reviews r, students s, companies c
                        WHERE r.student_id = s.student_id and r.company_id = c.company_id
                        and review_status="Undecided"`;
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