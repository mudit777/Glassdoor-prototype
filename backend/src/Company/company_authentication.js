const date = require('date-and-time');
const bcrypt = require('bcrypt');
var kafka = require('../../kafka/client');
exports.register_company = (req, res) => {
    kafka.make_request("register_company", req.body, (err, result) => {
        if(result.code === 500)
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
            res.end("User exists")
        }
        else if(result.code === 200)
        {
            res.writeHead(200, {
                "Content-Type" : "text/plain"
            })
            res.end("User Registered")
        }
    })
}