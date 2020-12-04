const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const client = require('../../../redis_config');
const get = util.promisify(client.get).bind(client);
const set = util.promisify(client.set).bind(client);

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

        let redis_result = await get('get_top_students');

        if(redis_result == null){
            let rows = await query(the_query);
            console.log("SQL result")
            set('get_top_students', JSON.stringify(rows));
            response.code = 200;
            response.data = JSON.stringify(rows);
            callback(null, response)
        }
        else{
            console.log("Fetching from redis");
            response.code = 200;
            response.data = redis_result;
            callback(null, response)
        }
    } catch (e) {
        response.code = 500;
        response.data = e;
        callback(null, response);
    }
}
exports.handle_request = handle_request;