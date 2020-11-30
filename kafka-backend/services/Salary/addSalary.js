var salaries = require('../../Models/salaries')

function handle_request(msg, callback){
      console.log(msg)
      console.log("Add salary")
  
      salaries.insertMany(msg, function(err,result, fields){
          if(err) throw err;
          console.log(result[0])
          callback(null, result[0])
          console.log("After Callback!")
      })
  }
  
  exports.handle_request = handle_request;