'use strict';
var passport = require('../node_modules/passport');
var JwtStrategy = require('../node_modules/passport-jwt').Strategy;
var ExtractJwt = require('../node_modules/passport-jwt').ExtractJwt;
var config = require('./config');
var connection = require('../database');
// Setup work and export for the JWT passport strategy
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.secret
};
passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
    console.log("jwtPayload is --------------------------- ", jwt_payload);
    var query = ""
    if(jwt_payload.source === "company")
    {
        query = "SELECT company_id FROM companies WHERE company_id = '"+ jwt_payload.id +"'";
        connection.query(query, (err, result) => {
            if(err)
                return callback(err, false);
            if(result.length > 0)
            {
                return callback(null, true);
            }
            else
            {
                return callback(null, false);
            }
        })
    }
    else if (jwt_payload.source === "student")
    {
        query = "SELECT student_id FROM students WHERE student_id = '"+ jwt_payload.id +"'";
        connection.query(query, (err, result) => {
            if(err)
                return callback(err, false);
            if(result.length > 0)
            {
                return callback(null, true);
            }
            else
            {
                return callback(null, false);
            }
        })
    }
    else if(jwt_payload.source === "admin")
    {
        if(jwt_payload.id === "admin@gmail.com")
        {
            return callback(null, true);
        }
        else
        {
            return callback(null, false)
        }
    }
    
}));

module.exports = passport;
