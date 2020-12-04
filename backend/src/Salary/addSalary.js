var kafka = require('../../kafka/client');

exports.addSalary = (req, res) => {
    kafka.make_request("addSalary", req.body, (err, result) => {
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }   
        else if(result.code === 200)
        {
            res.writeHead(200,{
                'Content-Type' : 'applicaton/json'
            })
            res.end(JSON.stringify(result.data));
        }     
    })
}
exports.getCompanySalary = (req, res) => {
    kafka.make_request("getCompanySalary", req.body, (err, result) => {
        if(err) throw err;
        else{
            console.log("Inside Else")
            res.writeHead(200,{
                'Content-Type': "application/json"
            })
            console.log(result)
            res.end(JSON.stringify(result.data))
        }    
    })
}
