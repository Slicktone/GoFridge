// Detail routes to User management
var db = require("../models/users.js");
var passport = require("passport");

// Routes
module.exports = function(app) {
	// route to render userForm.handlebars file
	app.get("/userForm", function(req, res) {
		res.render("userForm");
	});
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

// Passport Authentication

	//Signing Up
	app.get("/userForm", function(req, res){
		res.render("/userForm")
	})

	// Logging in
	app.get("/login", function(req, res){
		res.render("member")
	})

	// Signing out of any session
	app.get("/signout", function(req, res){
		req.session.destroy()
		res.redirect("/");
	})
// Login Auth Strategy
	app.post("/login", passport.authenticate("local", {
		failureRedirect: "/login",
		successRedirect: "/member"
	}))
// Signup Creating Strategy
	app.post("/userForm/add", function(req, res, next){
		db.User.findOne({
			where: {
				username: req.body.email
			}
		}).then(function(user){
			if(!user){
				db.User.create({
					username: req.body.email,
					password: bcrypt.hashSync(req.body.password)
				}).then(function(user){
					passport.authenticate("local",{
						successRedirect: "/member",
						failureRedirect: "/userForm"
					})(req, res, next) // Passing the cb asynchronously 
				})
			} else {
				res.send("This user exists");
			}
		})
	})
// Middleware to check for every route
// Check if the user is logged in and use a local variable in views(handlebars variable)
app.use(function(req, res, callback){
	// Passports req.user stores user when authenticated
	// Alternative to res.render
	if(req.user){
		res.locals.currentUser = req.user.username
	}
	callback();
})







	// Creating a user
	// app.post("/userForm/add", function(req, res) {
	// 	console.log(req.body);
	// 	db.users.create(req.body
	// 		// {
	// 		//     name: req.body.name,
	// 		//     email: req.body.email,
	// 		//     password: req.body.password,
	// 		//     budget: req.body.budget
	// 		// }
	// 	).then(function() {
	// 		res.redirect("/member");
	// 	}).catch(function(error) {
	// 		console.log(error);
	// 	});
	// });
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
		// Deleting a user
	// app.delete("/userForm/:id", function(req, res) {
	// 	db.users.destroy({
	// 		where: {
	// 			id: req.params.id
	// 		}
	// 	}).then(function() {
	// 		res.render("index");
	// 	});
	// });
};