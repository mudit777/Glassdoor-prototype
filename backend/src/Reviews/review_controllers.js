var connection = require('../../database')
const txtgen = require('txtgen');
const mysql = require('mysql');
const kafka = require('../../kafka/client');

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
  kafka.make_request("get_company_reviews", req.params, (err, results) => {
    if(err){
      res.writeHead(500,{
        'Content-Type' : 'text/plain'
      })
      res.end("Some error occured");
    }
    else{
      res.status(results.code,{
        'Content-Type' : 'application/json'
      });
      // console.log("Type = "+typeof(results.message))
      if(typeof(results.message) === "object"){
        // console.log("Stringify")
        res.end(JSON.stringify(results.message));
      }
      else{
        // console.log("No strngify")
        res.end(results.message);
      }      
    }
  })
}

exports.getCompanyReviewsAdmin = (req, res) => {
  console.log("Get me reviews for company_id: ")
  console.log(req.params);

  let q1 = "SELECT * from `glassdoor`.`reviews` WHERE company_id="+mysql.escape(req.params.company_id);

  connection.query(q1, (err, results) => {
    if(err){
      throw err;
    }
    else{
      console.log("Ok, no error")
      res.status(200,{
        'Content-Type' : 'application/json'
      });
      res.end(JSON.stringify(results));
    }
  });  

}