var kafka = require('../../kafka/client');

exports.withdrawApplications = (req, res) => {
    kafka.make_request("withdraw_applications", req.body, (err, result) => {
        console.log("Withdrawing Application!")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            res.end("Withdrawing Application!")
        }
    }) 
}