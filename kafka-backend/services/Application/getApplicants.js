const applicationModel = require("../../Models/applicationModel");


function handle_request(msg, callback){
      console.log(msg)
      console.log("Getting applicants!")
  
      applicationModel.find({job_id : msg.job_id,application_status : {$nin:['Withdrawn']}}, function(err,result, fields){
          if(err) throw err;
          console.log(result)
          var response = {
                code:200,
                data:result
          }
          callback(null, response)
          console.log("After Callback!")
      })
  }
  
  exports.handle_request = handle_request;