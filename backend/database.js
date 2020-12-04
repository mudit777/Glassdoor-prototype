var mysql = require('mysql')
let connection = mysql.createConnection({
<<<<<<< HEAD
=======
    // host: 'yelp-rds.cmvrgbslqsml.us-west-1.rds.amazonaws.com',
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
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