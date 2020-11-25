//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var path = require('path');
const date = require('date-and-time');
const mongoConnection = require('./config')
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
let connection = require("./database")
app.set('view engine', 'ejs');
var kafka = require('./kafka/client')
// var mongoose = require('mongoose')
module.exports = app
//use cors to allow cross origin resource sharing
app.use(express.static('public'))
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
const { getEmployerDetails } = require('./src/Employer/GetEmployerDetails')

app.use(bodyParser.json());
const fs = require('fs')
const multer = require("multer");
const DIR = './public/profile_images';
const { response } = require('express');
const e = require('express');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Math.random() + '-' + fileName)
        //  uuidv4() +
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
const dish_DIR = './public/restrau_dish_images'
const dish_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dish_DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Math.random() + '-' + fileName)
        //  uuidv4() + 
    }
});

var dish_upload = multer({
    storage: dish_storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.post("/getEmployerDetails", getEmployerDetails)

app.post("/getCompanyReviews", (req,res) =>{
    console.log("GATHERING ALL DATA!")
    console.log(req.boy)
    var user= "SELECT * from reviews WHERE company_id = 10";
    connection.query(user,(err,result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result))
        }
    })
})

// app.post("/saveCompanyReview", (req,res) =>{
//     console.log("Saving company review!")
//     console.log(req.body)
//     var user = "UPDATE reviews SET review_marked_by_company = '0' WHERE review_id = '"+req.body.review_id+"'";
//     connection.query(user,(err,result) =>{
//         console.log(result)
//         if(err) throw err;
//         if(result.length)
//         {
//             console.log(result)
//             res.writeHead(200,{
//                 'Content-Type' : "application/json"        
//             })
//             res.end(JSON.stringify(result))
//         }
//     })
// })

// app.post("/addReply", (req,res) =>{
//     console.log("Adding Reply to review!")
//     console.log(req.body)
//     var user = "UPDATE reviews SET review_reply = '"+req.body.reply+"' WHERE review_id = '"+req.body.review_id+"'";
//     connection.query(user,(err,result) =>{
//         console.log(result)
//         if(err) throw err;
//         if(result.length > 0)
//         {
//             console.log(result)
//             res.writeHead(200,{
//                 'Content-Type' : "application/json"        
//             })
//             res.end("Comment Replied")
//         }
//     })
// })

app.post("/postJob", (req,res) =>{
    console.log("Posting New Job!")
    console.log(req.body)
    var user = "INSERT INTO jobs (job_title, job_desc, job_res, job_qual, job_city, job_state, job_zip, job_street_address, job_industry, job_company_name, job_country, job_is_remote, job_expected_salary, company_id) VALUES ?";
    var values = [[req.body.job_title,req.body.job_desc, req.body.job_roles, req.body.job_qual, req.body.city, req.body.state, req.body.zipcode, req.body.street_address, req.body.industry_type, req.body.company_name, req.body.country, req.body.remote_inperson, req.body.salary, req.body.company_id]];
    connection.query(user,[values], function (err, result, fields) {
        if(err) throw err;
        console.log(result)
        if (err) {
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
        }else{
        console.log("no error")
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end("Job Added!")
    }
    });
})


  
var company_authentication_router = require('./src/Company/company_authentication');
var loginRouter = require("./src/Login/login");
var addReplyRoute = require('./src/Company/add_reply');
var saveCompanyReviewRoute = require('./src/Company/save_company_review')

app.post("/registerCompany", company_authentication_router.register_company);
app.post("/login", loginRouter.login);
app.post("/addReply", addReplyRoute.addReply);
app.post("/saveCompanyReview", saveCompanyReviewRoute.saveCompanyReview);










app.listen(8080)
console.log("Server Listening on port 8080");








