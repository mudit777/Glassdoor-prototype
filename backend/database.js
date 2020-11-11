var mysql = require('mysql')
let connection = mysql.createConnection({
    // host: 'yelp-rds.cmvrgbslqsml.us-west-1.rds.amazonaws.com',
    host : 'localhost',
    port : "3306",
    user: 'root',
    password: 'halamadrid',
    database: 'Yelp'
});
connection.connect(function(err) {
    if (err) {
      return console.error('db error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

module.exports = connection
  