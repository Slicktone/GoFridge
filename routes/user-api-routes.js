// Detail routes to User management
var db = require("../models");
var passport = require("passport");


// Routes
module.exports = function(app, passport) {

    // app.get('/',
    //   function(req, res) {
    //     res.render('index', 
		// 			{ 
		// 				user: req.users 
		// 			});
    //   });

      // app.get('/member',
      //     function(req, res) {
      //       res.render('member', { users: req.users });
      //     });




      // app.get("/userForm", function(req, res) {
      //   res.render("userForm");
      // });

      // app.post("/userForm/add", function(req, res) {
      //     db.users.create({
      //       email: req.body.email,
      //       password: req.body.password
      //     }).then(function(){
      //       res.redirect('member');
      //     });
      //   });
  // }

// module.exports = function(app) {
	// route to render userForm.handlebars file
	app.get("/userForm", function(req, res) {
		res.render("userForm");
	});

// Passport Login sequence

	app.post('/login',
		passport.authenticate('local', {
			failureRedirect: 'login' 
		}),
		function(req, res) {
			console.log(req.users);
			res.render('/login', 
				{ 
					users: req.users
				});
		});

    // app.get('/login',
    //   function(req, res){
    //     res.render('member');
		// 		// Note: passport.authenticate() middleware invokes req.login() automatically. This function is 
		// 		// primarily used when users sign up, during which req.login() 
		// 		// can be invoked to automatically log in the newly registered user.
		// 	req.login(users, function(err) {
		// 	if (err) { return next(err); }
		// 	return res.redirect('/users/' + req.users.email);
		// });
      // });



	// Existing user login
	// app.post("/login", function(req, res) {
	// 	console.log(req.body);
	// 	res.redirect("/member");
	// });
	// Show the signed in user details
	app.get("/userForm/:id", function(req, res) {
		db.users.findOne({
			where: {
				id: req.params.id
			},
			include: [db.myFridges]
		}).then(function(data) {
			res.json(data);
		});
	});
	// Creating a user
	app.post("/userForm/add", function(req, res) {
		console.log(req.body);
		db.users.create(req.body
			// {
			//     name: req.body.name,
			//     email: req.body.email,
			//     password: req.body.password,
			//     budget: req.body.budget
			// }
		).then(function() {
			res.redirect("/member");
		}).catch(function(error) {
			console.log(error);
		});
	});
	// Updating a user
	app.put("/userForm/update/:id", function(req, res) {
			var condition = "id = " + req.params.id;
			console.log("condition", condition);
			db.users.update({
				password: req.body.password
			}, {
				where: {
					id: condition
				}
			}).then(function() {
				res.redirect("/member");
			});
		})



// Passport logout

	app.get('/logout',
		function(req, res){
			req.logout();
			res.redirect('/');
	});





		// Deleting a user
	app.delete("/userForm/:id", function(req, res) {
		db.users.destroy({
			where: {
				id: req.params.id
			}
		}).then(function() {
			res.render("index");
		});
	});
};

