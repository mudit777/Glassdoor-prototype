var connection = require('../../database');
var mysql = require('mysql');

exports.getAllCompaniesAdmin = (req, res) => {
  console.log("Get me a list");

  let q1 = "SELECT company_id, company_name from `glassdoor`.`companies`";

  connection.query(q1, (err, result) => {
    if(err){
      throw err;
    }
    res.writeHead(200,{
      'Content-Type' : 'application/json'
    })
    res.end(JSON.stringify(result));
  })
};

exports.searchCompany = (req, res) => {
  console.log("Please search this company for me: ");
  console.log(req.body)

  let q1 = "SELECT company_id, company_name from `glassdoor`.`companies` where company_name LIKE '%"+req.body.term+"%'";

  console.log("Query = ")
  console.log(q1)
  connection.query(q1, (err, result) => {
    if(err){
      throw err;
    }
    res.writeHead(200,{
      'Content-Type' : 'application/json'
    })
    res.end(JSON.stringify(result));
  })
};