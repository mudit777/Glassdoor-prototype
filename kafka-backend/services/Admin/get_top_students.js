const conn = require('../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const handle_request = async (message, callback) => {
    let response = {}
    try {
        let the_query = `SELECT 
                            s.student_id, s.student_first_name, s.student_last_name, COUNT(s.student_id) as num_of_approved_reviews
                        FROM students s, reviews r
                        WHERE s.student_id = r.student_id AND r.review_status = "Approved"
                        GROUP BY student_id
                        ORDER BY num_of_approved_reviews DESC
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