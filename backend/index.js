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
var passport = require('./Utils/passport');
let connection = require("./database")
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
app.set('view engine', 'ejs');
var kafka = require('./kafka/client')
const { Buffer } = require('buffer');
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


  
var company_authentication_router = require('./src/Company/company_authentication');
var student_authentication_router = require('./src/Student/student_authentication');
var student_companies_router = require('./src/Student/companies');
var loginRouter = require("./src/Login/login");
var uploadsRouter = require("./src/uploads/upload_photo");
var studentDetailsRouter = require('./src/Student/student_details');
var industriesRouter = require('./src/Student/get_all_industries');
var companyDetailsRouter = require('./src/Company/company_details');
var searchRouter = require('./src/Student/search');



app.post("/registerCompany", company_authentication_router.register_company);
app.post("/updateCompanyDetails", requireAuth, companyDetailsRouter.updateCompanyDetails);
app.post("/registerStudent", student_authentication_router.register_student);
app.post("/login", loginRouter.login);
app.get("/getAllCompanies", requireAuth, student_companies_router.getAllCompanies);
app.post("/uploadImage", requireAuth, uploadsRouter.uploadImage);
app.post("/getStudentDetails", requireAuth, studentDetailsRouter.getStudentDetails);
app.get("/getAllIndustries", requireAuth, industriesRouter.getAllIndustries);
app.post("/updateStudentDetails", requireAuth, studentDetailsRouter.updateStudentDetails);
app.post("/getStudentJobPreferences", requireAuth, studentDetailsRouter.getStudentJobPreferences);
app.post("/getCompanyDetails", requireAuth, companyDetailsRouter.getCompanyDetails);
app.post("/searchCompanies", requireAuth, searchRouter.searchCompanies);

app.listen(8080)
console.log("Server Listening on port 8080");








