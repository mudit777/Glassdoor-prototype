var connection = require('../../database')
const txtgen = require('txtgen');
const mysql = require('mysql');
const client = require('../../redis_config');

var between = (min, max) => {
  return Math.floor(
    Math.random() * (max-min+1)+min
  )
}

exports.add10kreviews = (req, res) => {
  console.log("Hola, I'll enter 10k reviews")
  
  for(let i=1;i<100;i++){
    let review = {
      'review_headline': txtgen.sentence(),
      'review_desc': txtgen.sentence(),
      'review_rating': between(1,5),
      'review_pros': txtgen.sentence(),
      'review_cons': txtgen.sentence(),
      'review_helpful':1,
      'review_status': 'Approved',
      'review_marked_by_company':1,
      'company_id': between(1, 10),
      'student_id':between(6, 16)
    }

    console.log(review)

    var insertQuery = "INSERT INTO reviews SET " + mysql.escape(review); 
    connection.query(insertQuery, (err, result) => {
      if(err)
      {
        throw err;
      }
      else
      {
        console.log("Done "+i)
      }
    })
  }
};

exports.getCompanyReviews = (req, res) => {

  client.get("company_"+req.params.company_id, function(err, reply){
    if(err){
      console.log("Redis error")
      console.log(err)
      res.writeHead(500,{
        'Content-Type' : 'text/plain'
      })
      res.end("Some error occured");
    }
    else if(reply != null ){
      // console.log("Fetching data from redis")
      res.writeHead(200,{
        'Content-Type' : 'applicaton/json'
      })
      res.end(reply);
    }
    else{
      var q1 = "SELECT * FROM reviews WHERE company_id = "+req.params.company_id;
      connection.query(q1, (err, result) => {
        if(err){
          throw err;
        }
        else{
          console.log("Fetching data from mysql")
          // console.log("Result = ")
          // console.log(result)
          client.set("company_"+req.params.company_id, JSON.stringify(result))
          res.writeHead(200,{
            'Content-Type' : 'applicaton/json'
          })
          res.end(JSON.stringify(result));
        }
      })
    }
  })  
}