var connection = require('../../mysql_database');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const client = require('../../redis_config');
const get = util.promisify(client.get).bind(client);
const set = util.promisify(client.set).bind(client);

const handle_request = async (message, callback) => 
{
    console.log('xxxxxxNegative Reviewxxxxxxxxxxx')
    let response = {};
    try {
        let the_query = "SELECT * from glassdoor.reviews where review_helpful = (SELECT MAX(review_helpful) FROM glassdoor.reviews where review_rating = (SELECT MIN(review_rating) from glassdoor.reviews where company_id="+ message.company_id +") and company_id="+ message.company_id +") and company_id = "+ message.company_id +" and review_rating= (Select MIN(review_rating) from glassdoor.reviews where company_id="+ message.company_id +") Limit 1 ;"

        console.log(the_query);
        let redis_result = await get('get_negative_review_'+message.company_id);
        
        if(redis_result == null){
            let rows = await query(the_query);
            console.log("SQL result")
            console.log(rows);
            if(rows.length > 0)
            {
                response.code = 200;
                response.data = JSON.stringify(rows);
                set('get_negative_review_'+message.company_id, JSON.stringify(rows));
            }
            else
            {
                response.code = 204;
            }
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