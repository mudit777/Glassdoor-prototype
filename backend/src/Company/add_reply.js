var kafka = require('../../kafka/client');

exports.addReply = (req, res) => {
    console.log("Adding Reply!!!!!!!!!!!")
    kafka.make_request("add_reply", req.body, (err, result) => {
        
        console.log("Inside Add Reply")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            res.end("Reply Added")
        }
        console.log("+!!!!!!!!!!!!!!!!!!!!!!!+",result)
    }) 
}