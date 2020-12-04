var kafka = require('../../kafka/client');
exports.get_all_companies = (req, res) => {
<<<<<<< HEAD
    kafka.make_request("get_all_companies", req.body, (err, result) => {
=======
    kafka.make_request("get_all_companies_admin", req.body, (err, result) => {
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
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

exports.search_company = (req, res) => {
    kafka.make_request("search_company", req.body, (err, result) => {
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
<<<<<<< HEAD
            res.end(result.data);
=======
            res.end(JSON.stringify(result.data));
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
        }
    })
}

exports.get_company_reviews = (req, res) => {
    console.log("Get company reviews new")
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
            res.end(result.data)
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
<<<<<<< HEAD
            res.end(result.data);
=======
            res.end( result.data);
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
        }
    })
}