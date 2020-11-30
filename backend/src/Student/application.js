var kafka = require('../../kafka/client');

exports.applyToAJob = (req, res) => {
    kafka.make_request("apply_to_job", req.body, (err, result) => {
        if(err)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 299)
        {
            res.writeHead(299, {
                "Content-Type" : "text/plain"
            })
            res.end("Already Applied")
        }
        else if(result.code === 200)
        {
            res.writeHead(200, {
                "Content-Type" : "text/plain"
            })
            res.end("Applied to a job")
        }
    })
}