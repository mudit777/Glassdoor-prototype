var redis = require('redis');
<<<<<<< HEAD
var client = redis.createClient(6379, 'localhost', {no_ready_check: true});
=======
var client = redis.createClient(6379, '34.219.193.230', {no_ready_check: true});
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740

//maxmemory: 1000mb and maxmemory-policy: allkeys-lfu
client.auth('password', function (err) {
    if (err){
      throw err;
    }
});

client.on('error', function (err) {
    console.log('Error ' + err);
}); 

client.on('connect', function() {
    console.log('Connected to Redis');
});

module.exports = client;