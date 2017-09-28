var express = require('express');
var app = express(); //initializes express to bring it into the application
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes'); // require the routes folder

app.set('port', 3000); // sets the port

// Using middleware code to console.log a log of when any resource gets requested. Where the code is placed is IMPORTANT!
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, 'public'))); //this replaces 4-5 lines of code needed w/ app.get()
// for bodyParser, we'll choose urlencoded bc that's how the html form is sent. Other options are raw or json but we don't need those now.
// within the urlencoded method, we need to specify an extended option, which is set as an object and 
// we're choosing to set it to false. False gives us strings and arrays in our form body.
// Setting it to true can give us access to other data types but we don't need that now.
app.use(bodyParser.urlencoded({ extended : false}));
app.use('/api', routes); //tell express to use the routes folder, from the api folder

var server = app.listen(app.get('port'), function(){
    var port = server.address().port; //extracts the port # from the server object
    console.log("Magic happens on port " + port);
}); 










//app.get gets the port we set to listen for requests by using the listen method. The 2nd argument, a fx,
// is for the callback. It will call the console.log statement.

// up to app.listen method, express doesn't know what to do with our request so when we run the app, it just hangs there.
// In the browser, we get a 404 message.