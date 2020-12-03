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

app.post("/getCompanyReviews", (req,res) =>{
    console.log("GATHERING ALL DATA!")
    console.log(req.boy)
    var user= "SELECT * from reviews WHERE company_id = 1";
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
app.post("/getStudentReviews", (req,res) =>{
    console.log("GATHERING ALL DATA!")
    console.log(req.boy)
    var user= "SELECT * from reviews WHERE student_id = "+ req.body.student_id +"";
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
app.post("/getJob", (req,res) =>{
    console.log("Get jobs!")
    console.log(req.body)
    var user = "SELECT * FROM glassdoor.jobs where company_id="+ req.body.company_id +";";
    connection.query(user, function (err, result, fields) {
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
        res.end(JSON.stringify(result))
    }
    });
})


  
var company_authentication_router = require('./src/Company/company_authentication');
var student_authentication_router = require('./src/Student/student_authentication');
var addSalary = require('./src/Salary/addSalary');
var student_companies_router = require('./src/Student/companies');
var loginRouter = require("./src/Login/login");
var addReplyRoute = require('./src/Company/add_reply');
var saveCompanyReviewRoute = require('./src/Company/save_company_review')
var addReviewRoute = require('./src/Student/add_review')
var getPositiveReviewRoute = require('./src/Student/get_positive_review')
var getNegativeReviewRoute = require('./src/Student/get_negative_review')
var addHelpfulRoute = require('./src/Student/add_helpful')
var studentJobsRouter = require('./src/Student/jobs');
var studentApplicationsRouter = require('./src/Student/application');
var addInterviewRouter = require('./src/Student/add_interview');
var getCompanyInterviewRouter = require('./src/Student/get_company_interview')
var getStudentApplicationsRouter = require('./src/Student/get_student_applications')
var withdrawApplicationRouter = require('./src/Student/withdraw_application')
var companyJobsRouter = require('./src/Company/jobs');
var filterRouter = require('./src/Student/filter');

app.post("/registerCompany", company_authentication_router.register_company);
app.post("/login", loginRouter.login);
app.post("/addReply", addReplyRoute.addReply);
app.post("/saveCompanyReview", saveCompanyReviewRoute.saveCompanyReview);
app.post("/addReview", addReviewRoute.addReview);
app.post("/getPositiveReview", getPositiveReviewRoute.getPositiveReview);
app.post("/getNegativeReview", getNegativeReviewRoute.getNegativeReview);
app.post("/addHelpful", addHelpfulRoute.addHelpfulReview)
app.post("/salaryFilter", filterRouter.filterSalaryJobs);
app.post("/jobTypeFilter", filterRouter.filterJobType);
app.post("/addHelpful", addHelpfulRoute.addHelpfulReview);
app.post("/addInterview", addInterviewRouter.addInterview);
app.post("/getCompanyInterview", getCompanyInterviewRouter.getCompanyInterviews)
app.post("/getStudentApplications", getStudentApplicationsRouter.getStudentApplications)
app.post("/withdrawApplication", withdrawApplicationRouter.withdrawApplications)





var uploadsRouter = require('./src/uploads/uploads');
var studentDetailsRouter = require('./src/Student/student_details');
var industriesRouter = require('./src/Student/get_all_industries');
var companyDetailsRouter = require('./src/Company/company_details');
var searchRouter = require('./src/Student/search');


app.post("/setPrimaryResume", studentDetailsRouter.setPrimaryResume)
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
app.post("/addSalary", addSalary.addSalary);
app.post("/getCompanySalary", addSalary.getCompanySalary);

app.post("/getAllJobs", requireAuth, studentJobsRouter.get_all_jobs);
app.post("/updateJobFavourites", requireAuth, studentJobsRouter.updateFavouriteJobs);
app.post("/getFavouriteJobs", requireAuth, studentJobsRouter.getFavouriteJobs);
app.post("/uplaodResume", requireAuth, uploadsRouter.uploadResume);
app.post("/getStudentFiles", requireAuth, studentDetailsRouter.getStudentFiles);
app.post("/uploadCoverLetters", requireAuth, uploadsRouter.uploadCoverLetter);
app.post("/applyToJob", requireAuth, studentApplicationsRouter.applyToAJob);
app.post("/getCompanyJobs", requireAuth, companyJobsRouter.getCompanyJobs);
app.post("/getApplicants",companyJobsRouter.getApplicants);
app.post("/updateStatus",companyJobsRouter.updateStatus);
app.post("/searchJobs", searchRouter.searchJobs);

app.listen(8080)
console.log("Server Listening on port 8080");