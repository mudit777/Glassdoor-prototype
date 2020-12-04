const photoModel = require('../../Models/photos');
<<<<<<< HEAD

function handle_request(message, callback){
  console.log("Inside kafka backend upload photo with msg = ")
  console.log(message)
=======
const conn = require('../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);


const handle_request = async (message, callback)=>{
  console.log("Inside kafka backend upload photo with msg = ")
  console.log(message)
  let the_query = "Select student_first_name,student_last_name from glassdoor.students where student_id= "+ message.student_id +";";
  let rows = await query(the_query)
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
  var count = 0;
  for(let i=0;i<message.paths.length;i++){
    let photo_details = {
      photo_owner_role: "User",
<<<<<<< HEAD
      photo_owner_id: 1,
      photo_path: message.paths[i],
      photo_owner_name: "Udit Marolia",
      photo_uploaded_for: 1
=======
      photo_owner_id: message.student_id,
      photo_path: message.paths[i],
      photo_owner_name: rows[0].student_first_name + " " + rows[0].student_last_name,
      photo_uploaded_for: message.company_id
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
    }  
  
    let new_photo = photoModel(photo_details)
    new_photo.save().then(result => {
      count++;
      console.log("Photo added", result);

      if(count == message.paths.length){
        callback(null, {code:200,message:"Photos Added"})
      }      
    }).catch(err => {
      console.log("Error occured, photo not added", err)
      callback(null, {code:500,message:"Some error occured, try again"})
    })
  }
}
exports.handle_request = handle_request;