const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const client = require('../../../redis_config');
const get = util.promisify(client.get).bind(client);
const set = util.promisify(client.set).bind(client);

const handle_request = async (message, callback) => {
    let response = {}
    try {
<<<<<<< HEAD
        let the_query = `SELECT
                            company_id, company_name, company_ceo_first_name, company_ceo_last_name, company_avg_ceo_approval_rating, company_profile_photo
                            FROM companies
                            ORDER BY company_avg_ceo_approval_rating DESC
                            LIMIT 10;`

        let redis_result = await get('get_top_ceos');

        if(redis_result == null){
            let rows = await query(the_query);
            console.log("SQL result")
            set('get_top_ceos', JSON.stringify(rows));
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
=======
        let the_query = `SELECT c.company_ceo_first_name,c.company_ceo_last_name,count(r.company_id) as rating FROM glassdoor.reviews r,glassdoor.companies c where c.company_id=r.company_id and r.ceo_approval=1 group by r.company_id order by count(r.company_id) desc limit 10;`
        let ans = await query(the_query)
        response.code = 200;
        response.data = ans;
        callback(null, response);
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
    } catch (e) {
        response.code = 500;
        response.data = e;
        callback(null, response);
    }
}
exports.handle_request = handle_request;