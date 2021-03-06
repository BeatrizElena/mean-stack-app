var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.register = function(req, res) {
    console.log('registering user');

    var username = req.body.username;
    var name = req.body.name || null; //in our schema, "name" is not required. If not provided, return "null".
    var password = req.body.password;

    // Create user in our DB
    User.create({
        username: username,
        name: name,
        // password: password, // initially unscrypted for testing
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) 
    }, function(err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            console.log('user created', user);
            res.status(201).json(user);
        }
    })
};

module.exports.login = function(req, res) {
    console.log('logging in user');
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({
        username: username
    }).exec(function(err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            // user.password is the encrypted property of the user
            if (bcrypt.compareSync(password, user.password)) {
                console.log('User found', user);
                //jwt.sign()'s 3 parameters: payload, secret, and the optional expiresIn which says the token is valid for 1 hr.
                var token = jwt.sign({ username: user.username }, 's3cr3t', { expiresIn: 3600 });
                res.status(200).json({success: true, token: token});
            } else {
                res.status(401).json('Unauthorized');
            }
            
        }
    });
};

module.exports.authenticate = function(req, res, next) {
    var headerExists = req.headers.authorization;
    if (headerExists) {
        var token = req.headers.authorization.split(' ')[1]; 
        jwt.verify(token, 's3cr3t', function(error, decoded) {
            if (error) {
                console.log(error);
                res.status(401).json('Unauthorized');
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else {
        res.status(403).json('No token provided');
    }
};