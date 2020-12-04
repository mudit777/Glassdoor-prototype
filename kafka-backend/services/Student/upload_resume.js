var files = require('../../Models/filesModel');

function handle_request(message, callback)
{
    files.findOne({student_id : message.student_id}, (err, result) => {
        console.log("~~~~~~~~~~~~~result~~~~~~~~~~~~~~`", result);
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
            callback(null, response);
        }
        if(result === null)
        {
            console.log("`~~~~~~~~~~~~~~~~ Creating~~~~~~~~~~~~~~~~");
            var file = {};
            file[message.fileName.split('.')[0]] = message.location;
            var arr = [];
            arr.push(file);
            var myJson = {
                student_id : message.student_id,
                resumes: arr,
                cover_letters: []
            }
            console.log("`~~~~~~~~~~~~~~~~ Creating~~~~~~~~~~~~~~~~", myJson);
            files.create(myJson, (err, result) => {
                if(err)
                {
                    console.log("`~~~~~~~~~~~~~~~~ Creating error ~~~~~~~~~~~~~~~~", err);
                    response.code = 500;
                    response.data = err;
                    callback(null, response);
                }
                else
                {
                    console.log("`~~~~~~~~~~~~~~~~ Created~~~~~~~~~~~~~~~~");
                    response.code = 200;
                    response.data = arr;
                    callback(null, response);
                }
            })

        }
        else
        {
            console.log("`~~~~~~~~~~~~~~~~ Updating~~~~~~~~~~~~~~~~");
            var file = {};
            file[message.fileName.split('.')[0]] = message.location;
            var arr = result.resumes;
            arr.push(file);
            console.log("`~~~~~~~~~~~~~~~~ Updating input~~~~~~~~~~~~~~~~", arr);
            files.updateOne({student_id : message.student_id}, {$set : {resumes : arr}}, (err, result) => {
                if(err)
                {
                    console.log("`~~~~~~~~~~~~~~~~ Updating error ~~~~~~~~~~~~~~~~", err);
                    response.code = 500;
                    response.data = err;
                    callback(null, response);
                }
                else
                {
                    console.log("`~~~~~~~~~~~~~~~~ Updated~~~~~~~~~~~~~~~~");
                    response.code = 200;
                    response.data = arr;
                    callback(null, response);
                }
            })
        }
    }) 
}

exports.handle_request = handle_request;