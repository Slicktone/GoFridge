// Detail routes to User management
var db = require("../models");
var passport = require("passport");

// Routes
module.exports = function(app) {
	// route to render userForm.handlebars file
	app.get("/userForm", function(req, res) {
		res.render("userForm");
	});
	
	// Creating a user
	app.post("/userForm/add", function(req, res) {
		console.log(req.body);
		db.users.create(req.body).then(function() {
			res.redirect("/member");
		}).catch(function(error) {
			console.log(error);
		});
	}); 
};