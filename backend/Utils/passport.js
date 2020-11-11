'use strict';
var passport = require('../node_modules/passport');
var JwtStrategy = require('../node_modules/passport-jwt').Strategy;
var ExtractJwt = require('../node_modules/passport-jwt').ExtractJwt;
var Customers = require('../Models/userModel');
var Restraurants = require('../Models/restraurantModel');
var config = require('./config');
// Setup work and export for the JWT passport strategy
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.secret
};
passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
    console.log("jwtPayload is --------------------------- ", jwt_payload);
    if(jwt_payload.source === "customer")
    {
        Customers.findOne({ _id: jwt_payload._id }, function (err, user) {
            if (err) {
                return callback(err, false);
            }
            if (user) {
                console.log("user in passport is ---------------", user);
                delete user.password;
                return callback(null, true);
            } else {
                return callback(null, false);
            }
        });
    }
    else{
        Restraurants.findOne({ _id: jwt_payload._id }, function (err, restraurant) {
            if (err) {
                return callback(err, false);
            }
            if (restraurant) {
                console.log("user in passport is ---------------", restraurant);
                delete restraurant.password;
                return callback(null, true);
            } else {
                return callback(null, false);
            }
        });
    }
    
}));

module.exports = passport;
