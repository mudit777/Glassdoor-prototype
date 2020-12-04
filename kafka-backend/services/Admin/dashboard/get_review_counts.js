const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const client = require('../../../redis_config');
const get = util.promisify(client.get).bind(client);
const set = util.promisify(client.set).bind(client);

const handle_request = async (message, callback) => {
    let response = {};
    try {
        let the_query = `SELECT COUNT(review_id) as the_number_of_reviews FROM reviews
                            WHERE review_date BETWEEN '${message.query_date} 00:00:00' AND '${message.query_date} 23:59:59';`;
        
        let redis_key = "get_review_counts_" + message.query_date;
        let redis_result = await get(redis_key);

        if (redis_result == null) {
            console.log("SQL result");
            let rows = await query(the_query);
            let stringed_rows = JSON.stringify(rows);
            set(redis_key, stringed_rows);
            response.code = 200;
            response.data = stringed_rows;
            callback(null, response);
        } else {
            console.log("Redis result");
            response.code = 200;
            response.data = redis_result;
            callback(null, response);
        }

        
    } catch (e) {
        response.code = 500;
        response.data = e;
        callback(null, response);
    }
}
exports.handle_request = handle_request;