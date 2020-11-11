const mongoose = require('mongoose');
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};
var connectionString =  "mongodb+srv://admin:admin@glassdoor.cz7kw.mongodb.net/glassdoor_proto?retryWrites=true&w=majority"
let mongoConnection = mongoose.connect(connectionString, options).then(() => {
    console.log("Mongo connected")
})
module.exports = mongoConnection;