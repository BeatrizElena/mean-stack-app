// Manage Connections Using Mongoose 
var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanhotel'; // define database URL

mongoose.connect(dburl);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
//Look for events in the main Node process
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected through app termination (SIGINT)");
        process.exit(0);
    });
});
 
process.on('SIGTERM', function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected through app termination (SIGTERM)");
        process.exit(0);
    });
});

process.once('SIGUSR2', function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected through app termination (SIGTUSR2)");
        process.kill(process.pid, 'SIGUSR2');
    });
});
// Bring in SCHEMAS and MODELS
require('./hotels.model.js');
require('./users.model');