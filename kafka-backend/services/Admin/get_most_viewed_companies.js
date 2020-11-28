// const date = require('date-and-time');
// const bcrypt = require('bcrypt');
// var connection = require('../../mysql_database');
// var mysql = require('mysql')

// function handle_request(message, callback){
//     console.log(message);
//     var query = `SELECT c.company_id, c.company_name, COUNT(r.review_id) as the_count FROM reviews r, companies c
//                     WHERE r.company_id = c.company_id
//                     GROUP BY c.company_id
//                     ORDER BY the_count DESC
//                     LIMIT 5;`;
//     connection.query(query, (err, count) => {
//         var response = {};
//         if(err)
//         {
//             response.code = 500;
//             response.data = err;
//             callback(null, response);
//         }
//         response.code = 200;
//         response.data = count;
//         callback(null, response);
//     })
// }
// exports.handle_request = handle_request;