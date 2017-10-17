var express = require('express');
var router = express.Router(); //instantiate the router part of express. No need to instantiate all of Express.
// define route, then define method(s) with the fx we want to run. Everything can be daisy-chained.
var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

// hotel routes
router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll) //Mapping controller to route: in the hotels.controllers.js, run the hotelsGetAll controller
    .post(ctrlHotels.hotelsAddOne);
//test in the browser before going any further: localhost:3000/api/hotels (be sure to start the app again)
router
    .route('/hotels/:hotelId') //gets to a specific hotel, identified by its hotelId property
    .get(ctrlHotels.hotelsGetOne)   // method now will be to get just one hotel
    .put(ctrlHotels.hotelsUpdateOne) //goes to a document getting updated
    .delete(ctrlHotels.hotelsDeleteOne);

// review routes
router
    .route('/hotels/:hotelId/reviews') // route to get to a single hotel, which is api/hotels/<_id>/reviews
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlReviews.reviewsAddOne); 
router
    .route('/hotels/:hotelId/reviews/:reviewId') // route to get to a single review, which is api/hotels/<_id>/reviews/<review id>
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne); 

module.exports = router; // export the routers we instantiated

// Initially, we had this route when working with the native driver. With Mongoose, it's no longer needed.
// The .post method can be daisy-chained to the 1st route above.
// router
//     .route('/hotels/new')
//     .post(ctrlHotels.hotelsAddOne); //hotelsAddOne is the controller created in hotels.controllers.js