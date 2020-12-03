const applicationModel = require("../../Models/applicationModel");


function handle_request(msg, callback){
      console.log(msg)
      console.log("updating statusssssssssssssssss!")
  
      var newvalues = {
                    $set: { application_status: msg.application_status } 
                }
            applicationModel.updateOne({_id:msg.application_id}, newvalues, function(err, results){
                    if(err) throw err;
                    var response_message = "Application Status Updated"
            
                    var pkg = {
                        code:200,
                        response_message: response_message
                    }
            
                    callback(null, pkg)
             
               })
  }
  
  exports.handle_request = handle_request;