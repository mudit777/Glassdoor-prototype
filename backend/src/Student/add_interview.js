var kafka = require('../../kafka/client');

exports.addInterview = (req, res) => {
    kafka.make_request("add_interview", req.body, (err, result) => {
        
        console.log("Inside Adding Interview")
        console.log(req.body)
        if(err){
            
        }
        else{
            console.log("Inside else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            res.end("Interview Added")
        }
    }) 
}