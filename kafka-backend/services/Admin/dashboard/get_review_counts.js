const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const client = require('../../../redis_config');
const get = util.promisify(client.get).bind(client);
const set = util.promisify(client.set).bind(client);

const handle_request = async (message, callback) => {
    let response = {};
    try {
        let the_query = `select count(*) as c,cast(review_date as DATE) as d from glassdoor.reviews group by cast(review_date as DATE) order by d desc limit 5`;
        
        let ans = await query(the_query);

        response.code = 200;
        response.data = ans;
        callback(null, response);

        
    } catch (e) {
        response.code = 500;
        response.data = e;
        callback(null, response);
    }
}
exports.handle_request = handle_request;