var files = require('../../Models/filesModel');

function handle_request(message, callback)
{
    files.findOne({student_id : message.student_id}, (err, result) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
            callback(null, response);
        }
        if(result === null)
        {
            var file = {};
            file[message.fileName.split('.')[0]] = message.location;
            var arr = [];
            arr.push(file);
            var myJson = {
                student_id : message.student_id,
                resumes: [],
                cover_letters: arr
            }
            files.create(myJson, (err, result) => {
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                    callback(null, response);
                }
                else
                {
                    response.code = 200;
                    response.data = arr;
                    callback(null, response);
                }
            })

        }
        else
        {
            var file = {};
            file[message.fileName.split('.')[0]] = message.location;
            var arr = result.cover_letters;
            arr.push(file);
            console.log("~~~~~~~~~~~~ Updating ~~~~~~~~~~~~~~~~~~", arr);
            files.updateOne({student_id : message.student_id}, {$set : {cover_letters : arr}}, (err, result) => {
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                    callback(null, response);
                }
                else
                {
                    response.code = 200;
                    response.data = arr;
                    callback(null, response);
                }
            })
        }
    }) 
}

exports.handle_request = handle_request;