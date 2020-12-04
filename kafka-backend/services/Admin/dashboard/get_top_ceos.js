const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const client = require('../../../redis_config');
const get = util.promisify(client.get).bind(client);
const set = util.promisify(client.set).bind(client);

const handle_request = async (message, callback) => {
    let response = {}
    try {
        let the_query = `SELECT c.company_ceo_first_name,c.company_ceo_last_name,count(r.company_id) as rating FROM glassdoor.reviews r,glassdoor.companies c where c.company_id=r.company_id and r.ceo_approval=1 group by r.company_id order by count(r.company_id) desc limit 10;`
        let ans = await query(the_query)
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