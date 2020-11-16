const kafka = require('../../kafka/client')

exports.getEmployerDetails = (req,res) => {
    kafka.make_request('get_employer_details', req.body, function(err, results){
        console.log("In Employer Details!")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside Else")
            res.writeHead(200,{
                'Content-Type': "application/json"
            })
            console.log(results)
            res.end(JSON.stringify(results))
        }
    })
}