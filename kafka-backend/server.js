const connection =  new require('./kafka/Connection');
const database = require('./database')
//topics files
const admin_service = require('./services/Admin');
<<<<<<< HEAD
const register_company = require('./services/company/register_company');
const login = require('./services/Login/login');
=======
// var register_company = require('./services/company/register_company');
// var login = require('./services/Login/login');
// var get_company_reviews_service = require('./services/Reviews/get_company_reviews_service');
var upload_company_photos_service = require('./services/Photos/upload_company_photos_service');
var get_company_photos_service = require('./services/Photos/get_company_photos_service');
var upload_company_photos_by_user_service = require('./services/Photos/upload_company_photos_by_user_service');
>>>>>>> 67c9588e4ab5307bd1ff3983e610a3e4c5250d5b

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log(`Consumer for "${topic_name}" has started!`);
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        console.log("Data = ", data);
        
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
<<<<<<< HEAD
=======
// handleTopicRequest("register_company", register_company);
// handleTopicRequest("login", login);
// handleTopicRequest("get_company_reviews", get_company_reviews_service);
handleTopicRequest("upload_company_photos", upload_company_photos_service);
handleTopicRequest("get_company_photos", get_company_photos_service);
handleTopicRequest("upload_company_photos_by_user", upload_company_photos_by_user_service);

//JAE's services

>>>>>>> 67c9588e4ab5307bd1ff3983e610a3e4c5250d5b
handleTopicRequest("get_undecided_reviews", admin_service.get_undecided_reviews);
handleTopicRequest("approve_review", admin_service.approve_review);
handleTopicRequest("reject_review", admin_service.reject_review);
handleTopicRequest("get_undecided_photos", admin_service.get_undecided_photos);
handleTopicRequest("approve_photo", admin_service.approve_photo);
handleTopicRequest("reject_photo", admin_service.reject_photo);
handleTopicRequest("get_all_companies", admin_service.get_all_companies);
handleTopicRequest("search_company", admin_service.search_company);
handleTopicRequest("get_company_reviews", admin_service.get_company_reviews);
handleTopicRequest("get_company_stats", admin_service.get_company_stats);
handleTopicRequest("get_review_counts", admin_service.get_review_counts);
handleTopicRequest("get_most_reviewed_companies", admin_service.get_most_reviewed_companies);
handleTopicRequest("get_most_rated_companies", admin_service.get_most_rated_companies);
handleTopicRequest("get_top_ceos", admin_service.get_top_ceos);
handleTopicRequest("get_top_students", admin_service.get_top_students);
<<<<<<< HEAD
handleTopicRequest("get_most_viewed_companies", admin_service.get_most_viewed_companies);

handleTopicRequest("register_company", register_company);
handleTopicRequest("login", login);
=======
// handleTopicRequest("get_most_viewed_companies", admin_service.get_most_viewed_companies);
>>>>>>> 67c9588e4ab5307bd1ff3983e610a3e4c5250d5b
