const multer = require('multer');
const multerS3 = require('multer-s3');
var AWS = require('aws-sdk');
var path = require('path');
const { type } = require('os');
var awsCredFile = path.join(__dirname, './../../', 'configuration.json');
AWS.config.loadFromPath(awsCredFile);
var kafka = require('../../kafka/client');


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

exports.uploadResume = (req, res) => {
    console.log("Hiiiii");
    console.log(req.file);
    let resumeName = "";
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
                resumeName = `https://s3.us-west-1.amazonaws.com/glassdoorcmpe273/${name}`
                cb(null, name); //use Date.now() for unique file keys
            }
        })
    })
    const singleUpload = upload.single('file');
    singleUpload(req, res, (err) => {
        if(err)
        {
            console.log(err);
        }
        else{
            var myJson = {
                student_id : req.body.student_id,
                location : resumeName,
                fileName : req.file.originalname
            }
            console.log(myJson);
            kafka.make_request("upload_resume", myJson, (err, result) => {
                if(err)
                {
                    console.log(err);
                }
                else if(result.code === 500)
                {
                    console.log(result.data);
                }
                else if(result.code === 200)
                {
                    res.writeHead(200, {
                        "Content-Type" : "application/json"
                    })
                    myJson["resumes"] = result.data;
                    res.end(JSON.stringify(myJson));
                }
            })
        }
    })
}

exports.uploadCoverLetter = (req, res) => {
    console.log("Hiiiii");
    console.log(req.file);
    let resumeName = "";
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
                coverLetterName = `https://s3.us-west-1.amazonaws.com/glassdoorcmpe273/${name}`
                cb(null, name); //use Date.now() for unique file keys
            }
        })
    })
    const singleUpload = upload.single('file');
    singleUpload(req, res, (err) => {
        if(err)
        {
            console.log(err);
        }
        else{
            var myJson = {
                student_id : req.body.student_id,
                location : coverLetterName,
                fileName : req.file.originalname
            }
            console.log(myJson);
            kafka.make_request("upload_cover_letter", myJson, (err, result) => {
                if(err)
                {
                    console.log(err);
                }
                else if(result.code === 500)
                {
                    console.log(result.data);
                }
                else if(result.code === 200)
                {
                    res.writeHead(200, {
                        "Content-Type" : "application/json"
                    })
                    myJson["coverLetters"] = result.data;
                    res.end(JSON.stringify(myJson));
                }
            })
        }
    })
}