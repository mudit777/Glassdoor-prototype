var kafka = require('../../kafka/client');

exports.addHelpfulReview = (req, res) => {
    kafka.make_request("add_helpful", req.body, (err, result) => {
        console.log("Inside Adding Helpful Review")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            res.end("Added Helpful Review!")
        }
    }) 
}