var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var passport = require("passport"),
  LocalStrategy = require('passport-local').Strategy;
var session = require("express-session");
var path = require('path');


var PORT = process.env.PORT || 8080;

var app = express();


// Requiring our models for syncing
var db = require("./models");


  passport.serializeUser(function(users, cb) {
    console.log("serialized: " + users.id);
    cb(null, users.id);
  });

  passport.deserializeUser(function(id, cb) {
    db.Users.findOne({
      where: {
        'id': id
      }
    }, function (err, users) {
      if (err) { return cb(err); }
      console.log("deserialize: " + users);
      cb(null, users);
    });
  });


// Passport Local Strategy
passport.use("local", new LocalStrategy({
  usernameField: 'email'
  },
  function(email, password, done) {
    db.Users.findOne({ where: {email: email}}).then(function(users) {
      if (!users) {
        return done(null, false);
      } else if (password != users.password) {
        return done(null, false);
      } else {
        return done(null, users);
      }
    }).catch(function(err){
      return done(err);
    });
}))

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Passport session initialization
app.use(passport.initialize())
app.use(passport.session())

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import controllers and give the server access to them.
require("./routes/fridge-api-routes.js")(app);
require("./routes/user-api-routes.js")(app, passport);



// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});