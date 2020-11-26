var connection =  new require('./kafka/Connection');
var database = require('./database')
//topics files
var admin_api = require('./services/Admin');
var register_company = require('./services/company/register_company');
var login = require('./services/Login/login');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
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
handleTopicRequest("get_undecided_reviews", admin_api.get_undecided_reviews);
handleTopicRequest("approve_review", admin_api.approve_review);
handleTopicRequest("reject_review", admin_api.reject_review);
handleTopicRequest("register_company", register_company);
handleTopicRequest("login", login);
