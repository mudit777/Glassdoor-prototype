const photoModel = require('../../Models/photos');

function handle_request(message, callback){
  console.log("Inside kafka backend upload photo with msg = ")
  console.log(message)
  var count = 0;

  for(let i=0;i<message.paths.length;i++){
    let photo_details = {
      photo_status: "Approved",
      photo_owner_role: "Company",
<<<<<<< HEAD
      photo_owner_id: 1,
      photo_path: message.paths[i],
      photo_owner_name: "Amazon"
=======
      photo_owner_id: message.company_id,
      photo_path: message.paths[i],
      photo_owner_name: message.company_name
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