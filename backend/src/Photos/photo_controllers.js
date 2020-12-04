const multer = require('multer');
const multerS3 = require('multer-s3');
var AWS = require('aws-sdk');
var path = require('path');
const { type } = require('os');
var awsCredFile = path.join(__dirname, './../../', 'configuration.json');
AWS.config.loadFromPath(awsCredFile);
var kafka = require('../../kafka/client');

let imageName = "";
var s3 = new AWS.S3();
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'glassdoorcmpe273',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname,
      });
    },
    acl : 'public-read',
    key: function (req, file, cb) {
      // console.log(file);
      var name = Math.random() + '_' + file.originalname
      imageName = `https://s3.us-west-1.amazonaws.com/glassdoorcmpe273/${name}`
      cb(null, name); //use Date.now() for unique file keys
    }
  })
})

const singleUpload = upload.array('image', 10);

exports.uploadImageCompany = (req, res) => {
  console.log("Upload image..")

  singleUpload(req, res, (err) => {
    if(err){
      console.log(err);
      throw err;
    }
    else{
      var paths= []
      console.log("Files")
      console.log(req.files)
      for(let i=0;i<req.files.length;i++){
        paths.push(req.files[i].location)
      }

<<<<<<< HEAD
      kafka.make_request('upload_company_photos',{paths}, function(err,results){
=======
      kafka.make_request('upload_company_photos',{paths,company_id:req.body.company_id,company_name:req.body.name}, function(err,results){
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
        console.log('in result');
        console.log(JSON.stringify(results));
        console.log("Code : ",results.code)
        console.log("Message : ",results.message)
        if (err){
          console.log("Inside err");
          res.json({
            status:"error",
            msg:"System Error, Try Again."
          })
        }else{
          res.status(results.code,{
            'Content-Type' : 'application/json'
          });
          res.end(results.message);
        }
      });
    }
  })
}

exports.getCompanyPhotos = (req, res) => {
  kafka.make_request("get_company_photos", req.params, (err, results) => {
    if(err){
      res.writeHead(500,{
        'Content-Type' : 'text/plain'
      })
      res.end("Some error occured");
    }
    else{
      res.status(results.code,{
        'Content-Type' : 'application/json'
      });
      if(typeof(results.message) === "object"){
        res.end(JSON.stringify(results.message));
      }
      else{
        res.end(results.message);
      }      
    }
  })
}

exports.uploadImageByUserForCompany = (req, res) => {
  console.log("Upload image by user for company..")

  singleUpload(req, res, (err) => {
    if(err){
      console.log(err);
      throw err;
    }
    else{
      var paths= []
      console.log("Files")
      console.log(req.files)
      for(let i=0;i<req.files.length;i++){
        paths.push(req.files[i].location)
      }

<<<<<<< HEAD
      kafka.make_request('upload_company_photos_by_user',{paths}, function(err,results){
=======
      kafka.make_request('upload_company_photos_by_user',{paths,student_id:req.body.student_id,company_id:req.body.company_id}, function(err,results){
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
        console.log('in result');
        console.log(JSON.stringify(results));
        console.log("Code : ",results.code)
        console.log("Message : ",results.message)
        if (err){
          console.log("Inside err");
          res.json({
            status:"error",
            msg:"System Error, Try Again."
          })
        }else{
          res.status(results.code,{
            'Content-Type' : 'application/json'
          });
          res.end(results.message);
        }
      });
    }
  })
}