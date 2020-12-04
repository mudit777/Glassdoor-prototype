const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const client = require('../../../redis_config');
const get = util.promisify(client.get).bind(client);
const set = util.promisify(client.set).bind(client);

const handle_request = async (message, callback) => {
    let response = {}
    try {
        let q1 = `select c.company_name,avg(r.review_rating) as ans from glassdoor.reviews r, glassdoor.companies c where c.company_id=r.company_id group by r.company_id order by avg(r.review_rating) desc limit 5 ;`;

        let rows = await query(q1)
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