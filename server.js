var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var path = require('path');
// var User = require("./models/users")(db)

var PORT = process.env.PORT || 8080;

var app = express();

// Requiring our models for syncing
var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("express-session")({secret: "keyboard cat", resave: false, saveUninitialized: false}));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Import controllers and give the server access to them.
require("./routes/fridge-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);

// ****************** Passport stuff here *****************************

// Checking for authentication
passport.use(new LocalStrategy(function(username, password, callback){
  // Finding someone in the database with same username
  db.users.findOne({where: {username: username}}).then(function(user, err){
    if(err){
      return callback(err)
    }
    if(!user){
      return callback(null, false)
    }
    // if hashed password is not the same, return send them back
    if(!bcrypt.compareSync(password, user.password)){
      return callback(null, false)
    }
    return callback(null, user)
  })
}))

passport.serializeUser(function(user, callback){
  // referring to the user id
  callback(null, user.id)
})

passport.deserializeUser(function(id, callback){
  // findinf the user by id and prepping for logging out
  db.findById(id).then(function(user){
    callback(null, user)
  })
})


app.use(passport.initialize())
app.use(passport.session())

// ***************************************************


// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});