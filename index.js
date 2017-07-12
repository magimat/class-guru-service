var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
const MongoClient = require('mongodb').MongoClient


var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
jwtOptions.secretOrKey = 'secret';
jwtOptions.audience = 'class-guru'
jwtOptions.issuer = 'magimat.ca'
jwtOptions.algorithms = ["HS256"]


var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  console.log('payload received', jwt_payload);
  done(null, jwt_payload.user);
});

passport.use(strategy);
var app = express();
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())




var db

MongoClient.connect('mongodb://magi:enirak@ds133922.mlab.com:33922/class-guru', (err, database) => {
  if (err) return console.log(err)
  db = database

  app.listen(3000, () => {
    console.log('listening on 3000')
  })

  require('./routes.js')(app, db);

})


