var connection = require('../../mysql_database');
const client = require('../../redis_config');

function handle_request(message, callback){
  console.log("Inside kafka backend get_company_reviews with msg = ")
  console.log(message)

  client.get("company_"+message.company_id, function(err, reply){
    if(err){
      console.log("Redis error")
      console.log(err)
      callback(null, {code:500, message:"Server error"})
    }
    else if(reply != null ){
      console.log("Fetching from redis")
      // console.log("Fetching data from redis")
      callback(null, {code:200, message:reply})
    }
    else{
      var q1 = "SELECT * FROM reviews WHERE company_id = "+message.company_id;
      connection.query(q1, (err, result) => {
        if(err){
          console.log("SQL error")
          console.log(err)
          callback(null, {code:500, message:"Server error"})
        }
        else{
          console.log("Fetching data from mysql")
          // console.log("Result = ")
          // console.log(result)
          client.set("company_"+message.company_id, JSON.stringify(result))
          callback(null, {code:200, message:result})
        }
      })
    }
  })  
}
exports.handle_request = handle_request;