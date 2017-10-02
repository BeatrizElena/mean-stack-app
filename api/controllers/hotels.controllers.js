var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId; //needed to search for one hotel in .hotelsGetOne controller
var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
    var db = dbconn.get(); //db connection
    var collection = db.collection('hotels'); //work with hotels collection of the db we're connected to.

    var offset = 0; // Initialize the offset and count variables:
    var count = 5;
    
    // check to see if query and query.offset are properties of the query string. (and query/query.count next)
    // if so, return the requested query.offset. It will be returned as a string, thus parseInt fx is used.
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    collection
        .find()
        .skip(offset) //skip forward the value of offset above
        .limit(count) // limit the number of documents returned to the value of count above
        .toArray(function(err, docs) {
            console.log("Found hotels", docs);
            res
                .status(200)
                .json(docs);
        });
};

module.exports.hotelsGetOne = function(req, res) {
    var db = dbconn.get();
    var collection = db.collection('hotels');

    var hotelId = req.params.hotelId;    
    console.log("GET the hotelId", hotelId);

    collection
        .findOne({
            _id : ObjectId(hotelId) // ObjectId is the helper function form the mongodb driver. 
        }, function(err, doc) { //the empty query object {} will return all objects, .findOne() will return just 1
            res
                .status(200)
                .json( doc );
        });
    
};

module.exports.hotelsAddOne = function(req, res) {
    var db = dbconn.get();
    var collection = db.collection('hotels');
    console.log("POST new hotel");
    console.log(req.body); //req.body is where the body parts and middleware we've applied will put all the data it passes
    res
        .status(200)
        .json(req.body);
};