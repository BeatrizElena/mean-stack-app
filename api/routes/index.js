var express = require('express');
var router = express.Router(); //instantiate the router part of express. No need to instantiate all of Express.
// define route, then define method(s) with the fx we want to run. Everything can be daisy-chained.
var ctrHotels = require('../controllers/hotels.controllers.js');

router
    .route('/hotels')
    .get(ctrHotels.hotelsGetAll); //Mapping controller to route: in the hotels.controllers.js, run the hotelsGetAll controller
//test in the browser before going any further: localhost:3000/api/hotels (be sure to start the app again)
router
    .route('/hotels/:hotelId') //gets to a specific hotel, identified by its hotelId property
    .get(ctrHotels.hotelsGetOne);    // method now will be to get just one hotel

router
    .route('/hotels/new')
    .post(ctrHotels.hotelsAddOne); //hotelsAddOne is the controller created in hotels.controllers.js

module.exports = router; // export the router we instantiated