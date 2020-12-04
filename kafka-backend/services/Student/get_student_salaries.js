const { parse } = require("path");
const salaries = require("../../Models/salaries");

function handle_request(msg, callback){
      console.log(msg,typeof(msg.student_id))
      console.log("Getting Student Salary!")
  
      salaries.find({student_id : parseInt(msg.student_id)}, function(err,result, fields){
        //   if(err) throw err;
        //     console.log(result)
        //   callback(null, result)
        //   console.log("After Callback!")
        var response = {};

           if(err)
            {
                response.code = 500;
                response.data = err
            }
            else 
            {
                console.log(result,'``````````````````````````````````````````````')

                response.code = 200;
                response.data = result
            }
            callback(null, response);
        })
  }
  
  exports.handle_request = handle_request;