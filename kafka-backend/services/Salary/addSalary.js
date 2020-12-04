var salaries = require('../../Models/salaries')

function handle_request(msg, callback){
      console.log(msg)
      console.log("Add salary")
  
      salaries.create(msg, function(err,result, fields){
          if(err){
            var response={
                code:500,
                data:'error'
            }
          }
          else{
            var response={
                code:200,
                data:result[0]
            }
          }
          console.log(result[0])
          callback(null, response)
          console.log("After Callback!")
      })
  }
  
  exports.handle_request = handle_request;