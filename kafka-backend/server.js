var connection =  new require('./kafka/Connection');
var database = require('./database')
//topics files
// var register_company = require('./services/company/register_company');
// var login = require('./services/Login/login');
// var get_company_reviews_service = require('./services/Reviews/get_company_reviews_service');
var upload_company_photos_service = require('./services/Photos/upload_company_photos_service');
var get_company_photos_service = require('./services/Photos/get_company_photos_service');
var upload_company_photos_by_user_service = require('./services/Photos/upload_company_photos_by_user_service');

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
// handleTopicRequest("register_company", register_company);
// handleTopicRequest("login", login);
// handleTopicRequest("get_company_reviews", get_company_reviews_service);
handleTopicRequest("upload_company_photos", upload_company_photos_service);
handleTopicRequest("get_company_photos", get_company_photos_service);
handleTopicRequest("upload_company_photos_by_user", upload_company_photos_by_user_service);