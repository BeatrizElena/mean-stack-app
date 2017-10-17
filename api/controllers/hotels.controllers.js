// 3 lines below no longer needed now that we're using Mongoose
// var dbconn = require('../data/dbconnection.js');
// var ObjectId = require('mongodb').ObjectId; //needed to search for one hotel in .hotelsGetOne controller
// var hotelData = require('../data/hotel-data.json');

// We now need this to get Mongoose into our controller file and to get a reference to our model:
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    if (isNaN(lng) || isNaN(lat)) {
        res
          .status(400)
          .json({
            "message" : "If supplied in querystring, lng and lat must both be numbers"
          });
        return;
      }

    // A geoJSON point
    var point = {
    type : "Point",
    coordinates : [lng, lat]
    };
    // specify options to make the query run more efficiently
    var geoOptions = {
        spherical : true,
        maxDistance : 2000, //in meters
        num : 5 //max number of hotels returned by query
    };
    // Use built-in method to run location search, using parameters def'd above and a callback function
    // The callback function returns a "return" array
    Hotel
        .geoNear(point, geoOptions, function(err, results, stats) {
            console.log('Geo results', results);
            console.log('Geo stats', stats);
            if (err) {
            console.log("Error finding hotels");
            res
                .status(500)
                .json(err);
            } else {
            res
                .status(200)
                .json(results);
            }
        });
};

module.exports.hotelsGetAll = function(req, res) {
    console.log('GET the hotels');
    console.log(req.query);
    // Next two lines not needed bc we're no longer using the native driver for MongoDB
    // var db = dbconn.get(); //db connection
    // var collection = db.collection('hotels'); //work with hotels collection of the db we're connected to.

    var offset = 0; // Initialize the offset and count variables:
    var count = 5;
    var maxCount = 50;
    // check to see if query and query.lat/query.lng are properties of the query string (i.e. user is searching hotel by location)
    // if so, run the runGeoQuery fx above this controller.
    if (req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req, res);
        return;
    }

    // check to see if query and query.offset are properties of the query string. (and query/query.count next)
    // if so, return the requested query.offset. It will be returned as a string, thus parseInt fx is used.
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    // Error trapping if "offset" or "count" are not suplied as numbers
    if (isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message" : "If supplied in querystring, count and offset should be numbers"
            });
        return;
    } 
    // Error trapping if count exceeds our maxCount variable
    if (count > maxCount) {
        res
            .status(400)
            .json({
                "message" : "Count limit of " + maxCount + " exceeded"
            });
            return;
    }

    // We can daisy-chain functions to our Mongoose's model, just like we did to the collection commented out below.
    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, hotels) {
            console.log(err);
            console.log(hotels);
            if (err) {
                console.log("Error finding hotels");
                res
                    .status(500)
                    .json(err)
            } else {
                console.log("Found hotels", hotels.length);
                res
                    .json(hotels);
            }           
        });
};
    // collection and its daisy-chained functions below is what the native driver needed. Mongoose works differently as seen by the code above.
    // collection
    //     .find()
    //     .skip(offset) //skip forward the value of offset above
    //     .limit(count) // limit the number of documents returned to the value of count above
    //     .toArray(function(err, docs) {
    //         console.log("Found hotels", docs);
    //         res
    //             .status(200)
    //             .json(docs);
    //     });
module.exports.hotelsGetOne = function(req, res) {
    var id = req.params.hotelId;    
    console.log("GET the hotelId", id);

    Hotel
        .findById(id)
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                console.log("HotelId not found in database ", id);
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found " + id
                    };
            }
            res
                .status(response.status)
                .json(response.message);         
        });
};
// this code was refactored above:
// .exec(function(err, doc) {
//     if (err) {
//         console.log("Error finding hotel");
//         res
//             .status(500)
//             .json(err)
//     } else if (!doc) {
//         res
//             .status(404)
//             .json({
//                 "message" : "Hotel ID not found"
//             });
//     } else {
//         res
//         .status(200)
//         .json( doc);
//     }           
// });
// Function _splitArray will take either the semicolon-separated input for services and photos and split it or, if left empty,
// it will create an empty array.
var _splitArray = function(input) {
    var output;
    if (input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    }
    return output;
};

module.exports.hotelsAddOne = function(req, res) {
    console.log("POST new hotel");
    // as always, start with the model. Daisy-chain methods to it
    Hotel
        .create({
            name : req.body.name,
            description : req.body.description,
            stars : parseInt(req.body.stars, 10),
            services: _splitArray(req.body.services),
            photos : _splitArray(req.body.photos),
            currency : req.body.currency,
            location : {
                address : req.body.address,
                coordinates : [
                    parseFloat(req.body.lng), 
                    parseFloat(req.body.lat)]
            }
        }, function(err, hotel) {
            if (err) {
                console.log("Error creating hotel");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("Hotel created!", hotel);
                res
                    .status(201)
                    .json(hotel);
            }
        });    
    };

module.exports.hotelsUpdateOne = function(req, res) {
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);

    Hotel
        .findById(hotelId)
        .select("-reviews -rooms")
        .exec(function(err, hotel) {
            var response = {
                status : 200,
                message : hotel
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!hotel) {
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found " + hotelId
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                hotel.name = req.body.name;
                hotel.description = req.body.description;
                hotel.stars = parseInt(req.body.stars, 10);
                hotel.services = _splitArray(req.body.services);
                hotel.photos = _splitArray(req.body.photos);
                hotel.currency = req.body.currency;
                hotel.location = {
                    address : req.body.address,
                    coordinates : [
                        parseFloat(req.body.lng),
                        parseFloat(req.body.lat)
                    ]
                };

                hotel.save(function(err, hotelUpdated) {
                    if(err){
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json(); //send back an empty response
                    }
                });
            }
        });
        
};

module.exports.hotelsDeleteOne = function(req, res) {
    var hotelId = req.params.hotelId;

    Hotel
        .findByIdAndRemove(hotelId)
        .exec(function(err, hotel) {
            if(err){
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Hotel deleted, id: ", hotelId);
                res
                    .status(204)
                    .json();
            }
        });
};



    // This code for the .hotelsAddOne controller was needed when we were using the native driver. We don't needed with Mongoose.
    // var db = dbconn.get();
    // var collection = db.collection('hotels');
    // var newHotel;

    // console.log("POST new hotel");
    
    // if (req.body && req.body.name && req.body.stars) {
    //     newHotel = req.body;
    //     newHotel.stars = parseInt(req.body.stars, 10);
    //     collection.insertOne(newHotel, function(err, response) {
    //         console.log(response); 
    //         console.log(response.ops);
    //         res
    //             .status(201) //201 is the status code when a new resource is created
    //             .json(response.ops);
    //     });
        
    // } else {
    //     console.log("Data missing from body");
    //     res
    //         .status(400)
    //         .json({message : "Required data missing from body"});
    // }