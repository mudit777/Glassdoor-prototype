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
// module.exports = app
//use cors to allow cross origin resource sharing
app.use(express.static('public'))
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
const { getEmployerDetails } = require('./src/Employer/GetEmployerDetails')

app.use(bodyParser.json());
const fs = require('fs')
const multer = require("multer");
const DIR = './public/profile_images';
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
var getCompanyReviewsRouter = require('./src/Company/get_company_reviews')
var postJobRouter = require('./src/Company/post_job');
var getJobRouter = require('./src/Student/get_job');

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
app.post("/getCompanyReviews", getCompanyReviewsRouter.getCompanyReviews)
app.post("/postJob", postJobRouter.postJob)
app.post("/getJob", getJobRouter.getJob)




var get_company_applications_router = require('./src/Company/get_company_applications');

var uploadsRouter = require('./src/uploads/uploads');
var studentDetailsRouter = require('./src/Student/student_details');
var industriesRouter = require('./src/Student/get_all_industries');
var companyDetailsRouter = require('./src/Company/company_details');
var get_company_applications_router = require('./src/Company/get_company_applications');
var searchRouter = require('./src/Student/search');
var collectionRouter = require('./src/Student/collection');
var getStudentReviewsRouter = require('./src/Student/get_student_reviews');
var getStudentInterviewsRouter = require('./src/Student/get_student_interviews');
var getStudentSalairesRouter = require('./src/Student/get_student_salaries');

var photo_controllers = require('./src/Photos/photo_controllers');//done

app.post("/getCompanyApplications", get_company_applications_router.get_company_applications);

app.get("/getCompanyPhotos/:company_id", photo_controllers.getCompanyPhotos); //done
app.post("/uploadImageCompany", photo_controllers.uploadImageCompany);//done
app.post("/uploadImageByUserForCompany", photo_controllers.uploadImageByUserForCompany);//done


app.post("/getAllReviews", collectionRouter.allReviews);
app.post("/getAllInterviews", collectionRouter.allInterviews);
app.post("/getAllSalaries", collectionRouter.allSalaries);
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
app.post("/addCount", companyDetailsRouter.addCount);

app.post("/getCompanyApplications", get_company_applications_router.get_company_applications);

app.post("/searchCompanies", requireAuth, searchRouter.searchCompanies);
app.post("/addSalary", addSalary.addSalary);
app.post("/getCompanySalary", addSalary.getCompanySalary);
app.post("/getStudentReviews", getStudentReviewsRouter.getStudentReviews);
app.post("/getStudentSalaries", getStudentSalairesRouter.getStudentSalaries);
app.post("/getStudentInterviews", getStudentInterviewsRouter.getStudentInterviews);

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
app.post("/searchInterviews", searchRouter.searchInterviews);
app.post("/searchSalaries", searchRouter.searchSalaries);


//done



//imports
const admin_review_router = require('./src/Admin/review_controller');
const admin_photo_router = require('./src/Admin/photo_controller');
const admin_company_router = require('./src/Admin/company_controller');
const admin_dashboard_router = require('./src/Admin/dashboard_controller');


app.post("/searchCompany", admin_company_router.search_company);
app.post("/approvePhoto", admin_photo_router.approve_photo);
app.post("/rejectPhoto", admin_photo_router.reject_photo);
app.post("/approveReview", admin_review_router.approve_review);
app.post("/rejectReview", admin_review_router.reject_review);
//get paths
// app.get("/getCompanyPhotos/:company_id", photo_controllers.getCompanyPhotos); //done
app.get("/getUndecidedReviews", admin_review_router.get_undecided_reviews); //done
app.get("/getUndecidedPhotos", admin_photo_router.get_undecided_photos); //done
app.get("/getAllCompaniesAdmin", admin_company_router.get_all_companies); //done
app.get("/getCompanyReviews/:company_id", admin_company_router.get_company_reviews); //done
app.get("/getCompanyStats/:company_id", admin_company_router.get_company_stats); 
app.get("/getReviewCounts", admin_dashboard_router.get_review_counts);
app.get("/getMostReviewedCompanies", admin_dashboard_router.get_most_reviewed_companies);
app.get("/getMostRatedCompanies", admin_dashboard_router.get_most_rated_companies);
app.get("/getTopCEOs", admin_dashboard_router.get_top_ceos);
app.get("/getTopStudents", admin_dashboard_router.get_top_students);
app.get("/getMostViewedCompanies", admin_dashboard_router.get_most_viewed_companies);

app.listen(8080)
console.log("Server Listening on port 8080");

module.exports = app;