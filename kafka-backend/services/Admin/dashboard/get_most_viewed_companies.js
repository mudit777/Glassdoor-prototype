const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const client = require('../../../redis_config');
const get = util.promisify(client.get).bind(client);
const set = util.promisify(client.set).bind(client);

const handle_request = async (message, callback) => {
    let response = {};
    try {
<<<<<<< HEAD
        let the_query = `SELECT
                            company_id,
                            company_name,
                            company_views
                        FROM companies
                        ORDER BY company_views DESC
                        LIMIT 10;`;
=======
        let the_query = `select company_name,company_views from glassdoor.companies order by company_views desc limit 10`;
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
        let redis_key = "get_most_viewed_companies";
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