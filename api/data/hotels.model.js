// Export the data model
var mongoose = require('mongoose');
//DEFINE a NEW mongoose schema just for path with subdocuments 
// (e.g. reviews and its subdocuments; rooms and its subdocuments). 
// This schema will be part of the main schema by just adding reviews : [reviewSchema]
var reviewSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    }, //Validation: name must be filled out or db won't let you save.
    rating : {
        type : Number,
        min : 0,
        max : 5,
        required : true
    }, //Validation: rating must be filled out or db won't let you save.
    review : {
        type : String,
        required: true
    }, //Validation: review must be filled out or db won't let you save.
    createdOn : {
        type : Date,
        default : Date.now
    }
}); 
var roomSchema = new mongoose.Schema({
    type : String,
    number : Number,
    description : String,
    photos : [String],
    price : Number
});
//DEFINE NEW mongoose schema (main schema). A JSON object is passed into the schema method. We take the path : Data Type data from our JSON file.
// Ex: name:String where name defines a path (i.e. field) in the DB and String specifies that the data type inside that field shoild be a string.
var hotelSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    }, //Validation: name must be filled out or db won't let you save.
    stars : {
        type : Number,
        min : 0,
        max : 5,
        default : 0 //if error message is given when using default, simple put the word default inside quotation marks.
    },
    services : [String], //the 'services' path in our JSON consists of an array of strings.
    description : String,
    photos : [String],
    currency : String,
    reviews : [reviewSchema], //reviewSchema created above
    rooms : [roomSchema], // roomSchema created above
    location : {
        address : String,
        coordinates : {
            type : [Number], //always stored in order: 1st number is longitude (east/west) and the 2nd is latitude (north/south)
            index : '2dsphere' //2-d coordinates on a sphere
        }
    } // for geo-location. To use it in a search API, we need to tell mongodb to create an INDEX of the DATA (2dsphere). 
}); 
// So far we have only defined a schema, we must next compile it into a model because the app can't use a schema directly, it
// needs to use a model. A model is a compiled version of a schema. All data interactions in Mongoose need to go though a model.
// To compile a model from a schema, call the .model() method and pass it 
// 1) the name of the model we'll use, 2) the name of the schema, and 3) the name of the collection in the DB we're using.
mongoose.model('Hotel', hotelSchema, 'hotels');
// Next thing to do is tell the application about this model, which we do in the connection file (db.js) by requiring it
// with the code require('./hotels.model.js');