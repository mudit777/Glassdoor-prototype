const photoModel = require('../../Models/photos');
const conn = require('../../mysql_database');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);


const handle_request = async (message, callback)=>{
  console.log("Inside kafka backend upload photo with msg = ")
  console.log(message)
  let the_query = "Select student_first_name,student_last_name from glassdoor.students where student_id= "+ message.student_id +";";
  let rows = await query(the_query)
  var count = 0;
  for(let i=0;i<message.paths.length;i++){
    let photo_details = {
      photo_owner_role: "User",
      photo_owner_id: message.student_id,
      photo_path: message.paths[i],
      photo_owner_name: rows[0].student_first_name + " " + rows[0].student_last_name,
      photo_uploaded_for: message.company_id
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