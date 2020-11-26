const date = require('date-and-time');
const bcrypt = require('bcrypt');
var kafka = require('../../kafka/client');

exports.get_undecided_reviews = (req, res) => {
    kafka.make_request("get_undecided_reviews", req.body, (err, result) => {
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 200)
        {
            res.writeHead(200, {
                "Content-Type" : "application/json"
            })
            console.log(result.data);
            res.end(JSON.stringify(result.data))
        }
    })
}

exports.approve_review = (req, res) => {
    kafka.make_request("approve_review", req.body, (err, result) => {
        // req.body format
        // review_id 
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 200)
        {
            res.writeHead(200, {
                "Content-Type" : "text/plain"
            })
            res.end("Approving Review Succesful!")
        }
    })
}

exports.reject_review = (req, res) => {
    kafka.make_request("reject_review", req.body, (err, result) => {
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 200)
        {
            res.writeHead(200, {
                "Content-Type" : "text/plain"
            })
            res.end("Rejecting Review Successfuly!")
        }
    })
}