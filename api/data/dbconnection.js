// No longer using this file as we're now connecting through Mongoose and the file db.js

var MongoClient = require('mongodb').MongoClient; // install native mongodb driver
var dburl = 'mongodb://localhost:27017/meanhotel'; //connection string through mongodb default port

var _connection = null;

var open = function(){     // set_connection
    MongoClient.connect(dburl, function(err, db) {
        if (err) {
            console.log("DB connection failed");
            return;
        }
        _connection = db;
        console.log("DB connection open", db) // confirms the connection is made with this msg to the console
    });
};

var get = function() {
    return _connection;
};

module.exports = {
    open : open,
    get : get
};