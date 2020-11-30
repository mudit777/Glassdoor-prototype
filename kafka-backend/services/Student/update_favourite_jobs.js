var favourites = require('../../Models/favouriteJobs');


function handle_request(message, callback)
{
    favourites.findOne({student_id : message.student_id}, (err, result) => {
        response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
            callback(null, response);
        }
        if(result === null)
        {
            var arr = [];
            arr.push(message.job_id);
            var json = {
                student_id : message.student_id,
                jobs : arr
            }
            favourites.create(json, (err, result) => {
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                    callback(null, response);
                }
                else
                {
                    response.code = 200;
                    callback(null, response);
                }
            })
        }
        else{
            var arr = result.jobs;
            if(arr.includes(message.job_id))
            {
                let index = arr.indexOf(message.job_id);
                arr.splice(index, 1);
            }
            else{
                arr.push(message.job_id);
            }
            favourites.updateOne({student_id : message.student_id}, {$set : {
                jobs : arr
            }}, (err, result) => {
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                    callback(null, response);
                }
                else
                {
                    response.code = 200;
                    callback(null, response);
                }
            })
        }
    })
}
exports.handle_request = handle_request;