var connection =  new require('./kafka/Connection');
var database = require('./database')
//topics files
var register_company = require('./services/company/register_company');
var update_company_details = require('./services/company/update_company');
var login = require('./services/Login/login');
var add_reply = require('./services/company/add_reply')
var save_company_review = require('./services/company/save_company_review')
var get_all_companies = require('./services/Student/get_all_companies');
var register_student = require('./services/Student/register_student');
var get_student_details = require('./services/Student/get_student_details');
var get_all_industries = require('./services/Student/get_all_industry_types');
var update_student_details = require('./services/Student/update_student_details');
var get_student_job_preferences = require("./services/Student/get_job_preferences");
var get_company_details = require('./services/company/get_company_details');
var search_companies = require('./services/Student/search_companies');
var addSalary = require('./services/Salary/addSalary');
var add_review = require('./services/Student/add_review')
var get_positive_review = require('./services/Student/get_positive_review')
var get_negative_review = require('./services/Student/get_negative_review')
var add_helpful = require('./services/Student/add_helpful')
var get_all_jobs = require('./services/Student/get_all_jobs');
var update_favourite_jobs = require('./services/Student/update_favourite_jobs');
var get_favourite_jobs = require('./services/Student/get_favourite_jobs');
var upload_resume = require('./services/Student/upload_resume');
var get_student_files = require('./services/Student/get_student_files');
var upload_cover_letter = require('./services/Student/upload_cover_letter');
var apply_to_job = require('./services/Student/apply_to_job');
var add_interview = require('./services/Student/add_interview');
var get_company_interview = require('./services/Student/get_company_interview');
var get_student_applications = require('./services/Student/get_student_applications');
var withdraw_applications = require('./services/Student/withdraw_application');
var get_company_jobs = require('./services/company/get_company_jobs');
var filter_jobs_via_salary = require('./services/Student/sort_jobs_via_salary');
var filter_jobs_via_job_type = require('./services/Student/filter_jobs_via_job_type');
var set_primary_resume = require('./services/Student/set_primary_resume');
var search_jobs = require('./services/Student/search_jobs');
var search_interviews = require('./services/Student/search_company_intervies');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("register_company", register_company);
handleTopicRequest("update_company_details", update_company_details);
handleTopicRequest("login", login);
handleTopicRequest("add_reply", add_reply);
handleTopicRequest("save_company_review", save_company_review);
handleTopicRequest("get_all_companies", get_all_companies);
handleTopicRequest("register_student", register_student);
handleTopicRequest("get_student_details", get_student_details);
handleTopicRequest("get_all_industries", get_all_industries);
handleTopicRequest("update_student_details", update_student_details);
handleTopicRequest("get_student_job_preferences", get_student_job_preferences);
handleTopicRequest("get_company_details", get_company_details);
handleTopicRequest("search_companies", search_companies);
handleTopicRequest("addSalary", addSalary);
handleTopicRequest("add_review", add_review);
handleTopicRequest("get_positive_review", get_positive_review);
handleTopicRequest("get_negative_review", get_negative_review);
handleTopicRequest("add_helpful", add_helpful);
handleTopicRequest("get_all_jobs", get_all_jobs);
handleTopicRequest("update_favourite_jobs", update_favourite_jobs);
handleTopicRequest("get_favourite_jobs", get_favourite_jobs);
handleTopicRequest("upload_resume", upload_resume);
handleTopicRequest("get_student_files", get_student_files);
handleTopicRequest("upload_cover_letter", upload_cover_letter);
handleTopicRequest("apply_to_job", apply_to_job);
handleTopicRequest("get_company_jobs", get_company_jobs);
handleTopicRequest("filter_jobs_via_salary", filter_jobs_via_salary);
handleTopicRequest("filter_jobs_via_job_type", filter_jobs_via_job_type);   
handleTopicRequest("set_primary_resume", set_primary_resume);
handleTopicRequest("search_jobs", search_jobs);
handleTopicRequest("add_interview", add_interview);
handleTopicRequest("get_company_interview", get_company_interview);
handleTopicRequest("get_student_applications", get_student_applications);
handleTopicRequest("withdraw_applications", withdraw_applications);
handleTopicRequest("get_company_jobs", get_company_jobs);
handleTopicRequest("search_interviews", search_interviews)
