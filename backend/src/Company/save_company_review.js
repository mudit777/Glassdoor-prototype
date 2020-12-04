var kafka = require('../../kafka/client');

exports.saveCompanyReview = (req, res) => {
    kafka.make_request("save_company_review", req.body, (err, result) => {
        console.log("Inside Saving Company Review")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            res.end("Review Saved!")
        }
    }) 
}