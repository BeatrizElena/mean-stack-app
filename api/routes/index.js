var express = require('express');
var router = express.Router(); //instantiate the router part of express. No need to instantiate all of Express.
// define route, then define method(s) with the fx we want to run.
var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

// hotel routes
router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll) //Mapping controller to route: in the hotels.controllers.js, run the hotelsGetAll controller
    .post(ctrlHotels.hotelsAddOne);
//test in the browser before going any further: localhost:3000/api/hotels (be sure to start the app again)

//route to get to a specific hotel, identified by its hotelId property
router
    .route('/hotels/:hotelId') 
    .get(ctrlHotels.hotelsGetOne)   // method now will be to get just one hotel
    .put(ctrlHotels.hotelsUpdateOne) //goes to a document getting updated
    .delete(ctrlHotels.hotelsDeleteOne);

// review route for a single hotel at the URL api/hotels/<_id>/reviews
router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlUsers.authenticate, ctrlReviews.reviewsAddOne); 

// route to get to a single review at the URL api/hotels/<_id>/reviews/<review id>
router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne); 

// Authentication routes
router
    .route('/users/register')
    .post(ctrlUsers.register);

router
    .route('/users/login')
    .post(ctrlUsers.login);


module.exports = router; // export the routers we instantiated
