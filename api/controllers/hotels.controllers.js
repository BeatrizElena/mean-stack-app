var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
    console.log("GET the hotels");
    console.log(req.query);
    
    var offset = 0; // Then, we initialize the offset and count variables:
    var count = 5;
    
    // check to see if query and query.offset are properties of the query string.
    // if so, return the requested query.offset. It will be returned as a string, thus parseInt fx is used.
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    // check to see if query and query.count are properties of the query string.
    // if so, return the requested query.count. It will be returned as a string, thus parseInt fx is used.
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    var returnData = hotelData.slice(offset, offset+count); //we're slicing the hotel-data.json data array. offset is the starting point, offset+count is the ending point.

    res
        .status(200)
        .json( returnData ); //instead of returning all the hotelData, just return the sliced data.
};

module.exports.hotelsGetOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var thisHotel = hotelData[hotelId]; //gets ids from each hotel object in hotel-data.json. 1st object = id #1, and so on. REMEMBER, index starts at 0 for 1st hotel.
    console.log("GET the hotelId", hotelId);
    res
        .status(200)
        .json( thisHotel );
};

module.exports.hotelsAddOne = function(req, res) {
    console.log("POST new hotel");
    console.log(req.body); //req.body is where the body parts and middleware we've applied will put all the data it passes
    res
        .status(200)
        .json(req.body);
};