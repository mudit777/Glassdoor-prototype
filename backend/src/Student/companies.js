var kafka = require('../../kafka/client');

exports.getAllCompanies = (req, res) => {
    kafka.make_request("get_all_companies", req.body, (err, result) => {
        if(err)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 204)
        {
            res.writeHead(204, {
                "Content-Type" : "text/plain"
            })
            res.end("No companies found")
        }
        else if(result.code === 200)
        {
            res.writeHead(200,{
                'Content-Type' : 'applicaton/json'
            })
            res.end(result.data);
        }
    })
}