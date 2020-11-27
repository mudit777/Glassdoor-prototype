const date = require('date-and-time');
const bcrypt = require('bcrypt');
var kafka = require('../../kafka/client');
exports.get_all_companies = (req, res) => {
    kafka.make_request("get_all_companies", req.body, (err, result) => {
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

exports.search_company = (req, res) => {
    kafka.make_request("search_company", req.params, (err, result) => {
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
                "Content-Type" : "application/json"
            })
            res.end(JSON.stringify(result.data))
        }
    })
}

exports.get_company_reviews = (req, res) => {
    kafka.make_request("get_company_reviews", req.params, (err, result) => {
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

exports.get_company_stats = (req, res) => {
    kafka.make_request("get_company_stats", req.params, (err, result) => {
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