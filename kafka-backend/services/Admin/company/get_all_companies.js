const conn = require('../../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const client = require('../../../redis_config');
const get = util.promisify(client.get).bind(client);
const set = util.promisify(client.set).bind(client);

const handle_request = async (message, callback) => {
<<<<<<< HEAD
=======
    console.log('```````````````````````````````````````````````````````````')
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
    let response = {};
    try {
        let the_query = `SELECT
                            company_id,
                            company_name
<<<<<<< HEAD
                        FROM companies`;
=======
                        FROM glassdoor.companies`;
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740

        let redis_result = await get('get_all_companies')
        
        if(redis_result == null){
            let rows = await query(the_query);
            console.log("SQL result")            
            set('get_all_companies', JSON.stringify(rows));            
            response.code = 200;
            response.data = JSON.stringify(rows);
            callback(null, response)
        }
        else{
            console.log("Fetching from redis");
            console.log(redis_result)
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