const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const client = require('../../../redis_config');
const get = util.promisify(client.get).bind(client);
const set = util.promisify(client.set).bind(client);

const handle_request = async (message, callback) => {
    let response = {};
    try {
        let the_query = `SELECT r.review_id, r.review_desc, r.review_headline, r.review_pros, r.review_cons, r.review_desc, r.review_rating
                        FROM reviews r, companies c
                        WHERE r.company_id = c.company_id AND c.company_id = ${message.company_id}
                        AND (r.review_status = "Approved" OR r.review_status = "Unapproved")`;

        let redis_result = await get('get_company_reviews_'+message.company_id);
        
        if(redis_result == null){
            let rows = await query(the_query);
            console.log("SQL result")
            set('get_company_reviews_'+message.company_id, JSON.stringify(rows));
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

