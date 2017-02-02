// Detail routes to User management
var db = require("../models");
var passport = require("passport");


// Routes
// module.exports = function (app) {
//     // created route to render index.handlebars file
//     app.get("/userForm", function (req, res) {
//         res.render("userForm");
//     });

//     // Show the signed in user details
//     app.get("/userForm/:id", function (req, res) {
//         db.users.findOne({
//             where: {
//                 id: req.params.id
//             },
//             include: [db.myFridges]
//         }).then(function(data) {
//             res.json(data);
//         });
//     });




// // Login Auth with Passport
//     app.post('/login',
//     passport.authenticate('local', {
//         successRedirect: "/",
//         failureRedirect: "/users/login",
//         // Optional Failure include for Flash if using
//         failureFlash: true
//     }),
//     function(req, res) {
//         // If this function gets called, authentication was successful.
//         // `req.user` contains the authenticated user.
//         res.redirect("/" + req.user.username);
//     });


// // Sign Up Auth with Passport
//     app.post('/userForm',
//     passport.authenticate('local', {
//         successRedirect: "/",
//         failureRedirect: "/users/login",
//         // Optional Failure include for Flash if using
//         // failureFlash: true
//     }),
//     function(req, res) {
//         // If this function gets called, authentication was successful.
//         // `req.user` contains the authenticated user.
//         res.redirect("/" + req.user.username);
//     });



//     // Updating a user
//     app.put("/userForm/update/:id", function(req, res) {
//         var condition = "id = " + req.params.id;
// 		console.log("condition", condition);
// 		db.users.update({
// 			password: req.body.password
// 		}, {
// 			where: {
// 				id: condition
// 			}
// 		}).then(function() {
// 			res.redirect("/userForm");
// 		});
//     })
//     // Deleting a user
//     app.delete("/userForm/:id", function(req, res) {
//         db.users.destroy({
//             where: {
//                 id: req.params.id
//             }
//         }).then(function() {
//             res.render("index");
//         });
//     });
// };



module.exports = function(app, passport) {

    app.get('/',
      function(req, res) {
        res.render('index', { user: req.user });
      });

    app.get('/login',
      function(req, res){
        res.render('member');
      });

    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/login' }),
        function(req, res) {
          // console.log(req.user);
          res.render('hometest', { user: req.user });
        });

      app.get('/member',
          function(req, res) {
            res.render('member', { user: req.user });
          });


    app.get('/logout',
      function(req, res){
        req.logout();
        res.redirect('/');
      });

      app.get("/userForm", function(req, res) {
        res.render("userForm");
      });

      app.post("/userForm", function(req, res) {
          db.User.create({
            email: req.body.username,
            password: req.body.password
          }).then(function(){

            res.redirect('/');
          });
        });
  }