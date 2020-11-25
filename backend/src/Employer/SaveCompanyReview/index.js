const kafka = require('../../../kafka/client')

exports.saveCompanyReview = (req,res) => {
    console.log("Saving company review!")
    console.log(req.body)
    var user = "UPDATE reviews SET review_marked_by_company = '0' WHERE review_id = '"+req.body.review_id+"'";
    connection.query(user,(err,result) =>{
        if(err) throw err;
        if(result.length)
        {
            console.log(result)
            res.writeHead(200,{
                'Content-Type' : "application/json"        
            })
            res.end(JSON.stringify(result))
        }
    })
}