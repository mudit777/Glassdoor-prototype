const connection =  new require('./kafka/Connection');
const database = require('./database')
//topics files
const admin_service = require('./services/Admin');
const register_company = require('./services/company/register_company');
const login = require('./services/Login/login');

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

handleTopicRequest("register_company", register_company);
handleTopicRequest("login", login);
