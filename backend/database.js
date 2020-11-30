var mysql = require('mysql')
let connection = mysql.createConnection({
    // host: 'yelp-rds.cmvrgbslqsml.us-west-1.rds.amazonaws.com',
    host : '35.230.18.97',
    port : "3306",
    user: 'root',
    password: 'ugt4vwLxkbf5BKOG',
    database: 'glassdoor'
});
connection.connect(function(err) {
    if (err) {
      return console.error('db error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

module.exports = connection
  