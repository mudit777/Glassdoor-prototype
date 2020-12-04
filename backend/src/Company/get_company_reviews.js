var kafka = require('../../kafka/client');

exports.getCompanyReviews = (req, res) => {
    console.log('heloooooooooooooooooooooooooooo')
    kafka.make_request("get_individual_company_reviews", req.body, (err, result) => {
        console.log(result)
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
            console.log(result.data,'9999999999999999999999999999')
            res.end(result.data);
        }     
    })
}