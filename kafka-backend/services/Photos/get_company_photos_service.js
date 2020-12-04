const photoModel = require('../../Models/photos');

function handle_request(message, callback){
  console.log("Inside kafka backend get_company_photos with msg = ")
  console.log(message)

  photoModel.find(
    {
      $or: [
        {
          $and:[{photo_uploaded_for:message.company_id}, {photo_status:"Approved"}]
        },
        {
          $and:[{photo_owner_id:message.company_id}, {photo_owner_role:"Company"}]
        }
      ]      
    },
    function(err, result){
      if(err){
        console.log("Error occured", err)
        callback(null, {code:500,message:"Some error occured, try again"})
      }
      else{
        console.log(result)
        callback(null, {code:200,message:result})
      }
  })
}
exports.handle_request = handle_request;