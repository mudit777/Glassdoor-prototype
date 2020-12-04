var kafka = require('../../kafka/client');

exports.getStudentSalaries = (req, res) => {
    console.log('#######################888888888#####################')

    kafka.make_request("get_student_salaries", req.body, (err, result) => {
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }   
        else if(result.code === 200)
        {
            console.log(result.data,'``````````````````````````````````````````````')
            res.writeHead(200,{
                'Content-Type' : 'applicaton/json'
            })
            res.end(JSON.stringify(result.data));
        }     
    })
}