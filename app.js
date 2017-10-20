// code in this file relates to the nodejS part of the code. 
// This code goes out to the DB and handles the various http requests.

require('./api/data/db.js'); //as soon as app starts, connect to DB (through mongoose connection).
var express = require('express');
var app = express(); //initializes express to bring it into the application
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes'); // require the routes folder

app.set('port', 3000); // sets the port

// add middleware code to console.log every request. Where the code is placed is IMPORTANT!
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

// set static directories before defining routes, so that browser can access files in 'public' and 'node_modules' folders.
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// enable parsing of posted forms.
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

// add routing
app.use('/api', routes); //tell express to use the routes folder, from the api folder

// listen for requests
var server = app.listen(app.get('port'), function(){
    var port = server.address().port; //extracts the port # from the server object
    console.log("Magic happens on port " + port);
}); 










//app.get gets the port we set to listen for requests by using the listen method. The 2nd argument, a fx,
// is for the callback. It will call the console.log statement.

// up to app.listen method, express doesn't know what to do with our request so when we run the app, it just hangs there.
// In the browser, we get a 404 message.