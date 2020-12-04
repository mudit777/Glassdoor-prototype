var kafka = require('../../kafka/client');

exports.postJob = (req, res) => {
    console.log("Adding job!")
    kafka.make_request("post_job", req.body, (err, result) => {
        
        console.log("Inside Post Job")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            res.end("Job Posted")
        }
    }) 
}