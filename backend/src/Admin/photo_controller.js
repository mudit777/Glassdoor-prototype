var kafka = require('../../kafka/client');
exports.get_undecided_photos = (req, res) => {
    kafka.make_request("get_undecided_photos", req.body, (err, result) => {
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
            res.end(JSON.stringify(result.data))
        }
    })
}

exports.approve_photo = (req, res) => {
    console.log("Approve this photo")
    console.log(req.body)
    kafka.make_request("approve_photo", req.body, (err, result) => {
        // req.body format
        // _id (from Mongo Atlas)
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if (result.code === 405) {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end(result.data); // You can't approve a photo that is not `Undecided`
        }
        else if(result.code === 200)
        {
            res.writeHead(200, {
                "Content-Type" : "text/plain"
            })
            res.end("Approving Photo Succesful!")
        }
    })
}

exports.reject_photo = (req, res) => {
    console.log("Reject this photo")
    kafka.make_request("reject_photo", req.body, (err, result) => {
        // req.body format
        // _id (from Mongo Atlas)
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if (result.code === 405) {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end(result.data); // You can't reject a photo that is not `Undecided`
        }
        else if(result.code === 200)
        {
            res.writeHead(200, {
                "Content-Type" : "text/plain"
            })
            res.end("Rejecting Photo Successfuly!")
        }
    })
}