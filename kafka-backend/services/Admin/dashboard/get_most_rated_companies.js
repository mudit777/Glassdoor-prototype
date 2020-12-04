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
        let avg_overall_rating_query = `SELECT company_id, company_name, company_avg_overall_rating as the_rating FROM companies
                                          ORDER BY company_avg_overall_rating DESC LIMIT 5;`;

        let redis_result = await get('get_most_rated_companies');

        if(redis_result == null){
            let first_result = await query(avg_overall_rating_query);
            response.code = 200;
            response.data = {
                avg_overall_rating: first_result,
            }
            callback(null, response);            
            set('get_most_rated_companies', JSON.stringify(first_result));
            response.code = 200;
            response.data = JSON.stringify(first_result);
            callback(null, response)
        }
        else{
            console.log("Fetching from redis");
            response.code = 200;
            response.data = redis_result;
            callback(null, response)
        }        
=======
        let q1 = `select c.company_name,avg(r.review_rating) as ans from glassdoor.reviews r, glassdoor.companies c where c.company_id=r.company_id group by r.company_id order by avg(r.review_rating) desc limit 5 ;`;

        let rows = await query(q1)
        response.code = 200;
        response.data = rows;
        callback(null, response);

>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
    } catch (e) {
        response.code = 500;
        response.data = e;
        callback(null, response);
    }
}
exports.handle_request = handle_request;