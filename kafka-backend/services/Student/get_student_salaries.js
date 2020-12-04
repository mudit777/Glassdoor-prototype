const salaries = require("../../Models/salaries");

function handle_request(msg, callback){
      console.log(msg)
      console.log("Getting Student Salary!")
  
      salaries.find({student_id : msg.student_id}, function(err,result, fields){
          if(err) throw err;
          console.log(result)
          callback(null, result)
          console.log("After Callback!")
      })
  }
  
  exports.handle_request = handle_request;