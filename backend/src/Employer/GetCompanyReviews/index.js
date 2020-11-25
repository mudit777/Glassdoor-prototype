import connection from '../../../database'

app.post("/getCompanyReviews", (req,res) =>{
    console.log("GATHERING ALL DATA!")
    console.log(req.boy)
    var user= "SELECT * from reviews WHERE company_id = 10";
    connection.query(user,(err,result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result))
        }
    })
})