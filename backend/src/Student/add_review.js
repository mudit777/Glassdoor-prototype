var kafka = require('../../kafka/client');

exports.addReview = (req, res) => {
    console.log("!!!!!!!!!!!!!!!!!!HERE!!!!!!!!!!!!")
    kafka.make_request("add_review", req.body, (err, result) => {
        console.log("Inside Adding Review")
        console.log(req.body)
        if(err){
            
        }
        else{
            console.log("Inside else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            res.end("Review Added")
        }
    }) 
}