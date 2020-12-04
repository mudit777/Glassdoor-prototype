const date = require('date-and-time');
const bcrypt = require('bcrypt');
var kafka = require('../../kafka/client');
exports.get_review_counts = (req, res) => {
    kafka.make_request("get_review_counts", req.params, (err, result) => {
        // req params
        // query_date: YYYY-MM-DD
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
            res.end(result.data);
        }
    })
}

exports.get_most_reviewed_companies = (req, res) => {
    kafka.make_request("get_most_reviewed_companies", req.body, (err, result) => {
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
            res.end(result.data);
        }
    })
}

exports.get_most_rated_companies = (req, res) => {
    console.log("Get most rated companies")
    kafka.make_request("get_most_rated_companies", req.body, (err, result) => {
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
            res.end(result.data)
        }
    })
}

exports.get_top_ceos = (req, res) => {
    console.log("Get top ceos")
    kafka.make_request("get_top_ceos", req.body, (err, result) => {
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
            res.end(result.data)
        }
    })
}

exports.get_top_students = (req, res) => {
    console.log("Get most rated students")
    kafka.make_request("get_top_students", req.body, (err, result) => {
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
            res.end(result.data)
        }
    })
}

exports.get_most_viewed_companies = (req, res) => {
    kafka.make_request("get_most_viewed_companies", req.body, (err, result) => {
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
            res.end(result.data);
        }
    })
}