const photoModel = require('../../Models/photos');

function handle_request(message, callback){
  console.log("Inside kafka backend upload photo with msg = ")
  console.log(message)
  var count = 0;

  for(let i=0;i<message.paths.length;i++){
    let photo_details = {
      photo_status: "Approved",
      photo_owner_role: "Company",
      photo_owner_id: 1,
      photo_path: message.paths[i],
      photo_owner_name: "Amazon"
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