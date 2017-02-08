// Add myFridge Items to this route
var db = require("../models");
// Routes
module.exports = function(app) {
	// route to render index.handlebars files
	app.get("/", function(req, res) {
		res.render("index");
	});

	// GET route for all the items in myFridge
	app.get("/member", function(req, res) {
			db.myFridges.findAll({
		}).then(function(data) {
			var hbsObject = {
				myFridges: data
			};
			res.render("member", hbsObject);
		});
	});

	// POST route for adding an item to myFridge
	app.post("/member/add", function(req, res) {
		db.users.findOne({
			where: {
				email: req.body.email
			}
		}).then(function(data) {
			if (data) {
			
			db.myFridges.create({				
				category: req.body.category,
				name: req.body.name,
				price: req.body.price,
				refill: req.body.refill,
				userId: data.id
			}).then(function() {
				res.redirect("member");
			}).catch(function(error) {
				console.log(error);
			});
			}
				res.redirect("/member");
		});
	});
	// DELETE route for deleting items from myFridge
	app.delete("/member/delete/:id", function(req, res) {
		db.myFridges.destroy({
			where: {
				id: req.params.id
			}
		}).then(function() {
			res.redirect("/member");
		});
	});
};