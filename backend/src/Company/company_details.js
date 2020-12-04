var kafka = require('../../kafka/client');

exports.getCompanyDetails = (req, res) => {
    kafka.make_request("get_company_details", req.body, (err, result) => {
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }   
        else if(result.code === 200)
        {
            console.log(result.data)
            res.writeHead(200,{
                'Content-Type' : 'applicaton/json'
            })
            res.end(result.data);
        }     
    })
}
exports.updateCompanyDetails = (req, res) => {
    kafka.make_request("update_company_details", req.body, (err, result) => {
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
            res.end("Company updated")
        }
    })
}
exports.addCount = (req, res) => {
    kafka.make_request("addCount", req.body, (err, result) => {
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
            res.end("Company updated")
        }
    })
}