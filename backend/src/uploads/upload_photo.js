const multer = require('multer');
const multerS3 = require('multer-s3');
var AWS = require('aws-sdk');
var path = require('path');
const { type } = require('os');
var awsCredFile = path.join(__dirname, './../../', 'configuration.json');
AWS.config.loadFromPath(awsCredFile);



exports.uploadImage = (req, res) => {
    console.log(req.file);
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
                console.log(file);
                var name = Math.random() + '_' + file.originalname
                imageName = `https://s3.us-west-1.amazonaws.com/glassdoorcmpe273/${name}`
                cb(null, name); //use Date.now() for unique file keys
            }
        })
    })
    const singleUpload = upload.single('image');
    singleUpload(req, res, (err) => {
        if(err)
        {
            console.log(err);
        }
        else{
            res.writeHead(200, {
                "Content-Type" : "application/json"
            })
            var myJson = {
                image : imageName
            }
            console.log(myJson);
            res.end(JSON.stringify(myJson));
        }
    })
}