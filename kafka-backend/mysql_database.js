var mysql = require('mysql')

let connection = mysql.createPool({
  host : '35.197.63.173',
  port : "3306",
  user: 'root',
  password: 'admin',
  database: 'glassdoor'
});

connection.getConnection(function(err) {
  if (err) {
    return console.error('db error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

module.exports = connection
  