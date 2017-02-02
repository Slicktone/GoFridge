// var LocalStrategy = require("passport-local").Strategy;
// var passport = require("passport");
// var Users = require("../models/users.js");
// var db = require("../models");



// console.log(new Users);

// // passport session setup

//     // serializing the user for the session
// passport.serializeUser(function(user, done) {
//     done(null, users.id);
// });




// // deserializing the user
// passport.deserializeUser(function(id, callback) {
//     db.users.findOne({
//         where: {
//             id: id
//         }
//     }).then(function() {
//         res.redirect("/login");
//     })
// });



// // Enabling a user to Login Strategy

// // passport.use("local-login", new LocalStrategy({
// //     usernameField: "email",
// //     passwordField: "password",
// //     passReqToCallback: true
// // }, function(req, email, password, done){
// //     console.log(req);
// //     console.log(email);
// //     db.User.findOne({
// //         where: {
// //             email: email
// //         }
// //     }).then(function(err, user) {
// //             if (err)
// //             return done(err)
// //             if(!user)
// //             return done(null, false)
// //             // req.flash("loginMessage", "No user found.")
// //             return done(null, User)
// //         }
// //     })

// // passport.use("local-login", new LocalStrategy({

// //     usernameField: "email", 
// //     passwordField: "password", 
// //     passReqToCallback: true    
// // }, function(req, username, password, done) {
// //       console.log(req);
// //       console.log(email);
// //     db.User.findOne({ 
// //         where: {
// //             email: email
// //     }).then(function(err, user) {
// //       if (err) { return done(err); }
// //       if (!user) {
// //         return done(null, false, { message: 'Incorrect username.' });
// //       }
// //       if (!user.validPassword(password)) {
// //         return done(null, false, { message: 'Incorrect password.' });
// //       }
// //       return done(null, user);
// //     });
// //   }
// // ));


// // User Creating an Account Strategy
// passport.use(new LocalStrategy({
//     usernameField: "email",
//     passwordField: "password",
//     passReqToCallback: true
// },
// function(req, email, password, done) {
//     // finding a user whose email is the same as the form email
//     // also checking to see if user login exists
    
//     console.log(email);
//     db.User.findOne({
//         where: {
//             email: email,
//             password: password
//         }
//     }).then(function(err, user) {
//         if(err) 
//             return done(err)
//         if(user) 
//             return done(null, false /*'That email is taken.'---- flash message maybe?*/)
//     });
//         // creating the user and continuing to the redirect
//     db.User.create({
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         password: req.body.password

//     }).then(function() {
//             if (err)
//                 return done(err)
//          return done(null, User, null)
//     })
// }))

