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
		// var query = {};
		// console.log("this is query"+query);
		// if (req.query.users_id) {
		// 	query.userId = req.query.users_id;
		// }
		console.log("the email"+req);
			db.myFridges.findAll({
			// where: {
			// 	email: req.body.email
			// },
			// include: [db.users]
		}).then(function(data) {
			var hbsObject = {
				myFridges: data
			};
			console.log(hbsObject);
			res.render("member", hbsObject);
		});
	});


	
	// app.post("/member", function(req, res) {
		
	// 	console.log("DDDDDDD");
	// 	console.log(req.body);
	// 	console.log("DDDDDDD");
	// 	db.users.findOne({
	// 		where: {
	// 			email: req.body.email
	// 		},
	// 		include: [db.myFridges]
	// 	}).then(function(data) {
	// 		console.log("this is the real data "+data);
	// 		console.log("this is data.myFridge "+data.myFridges);
			
	// 		if (data === null) {
	// 		res.render("index");}
	// 		var hbsObject = {
	// 			myFridges: data.myFridges
	// 		};
	// 		console.log("this is "+hbsObject);
	// 		res.render("member", hbsObject);
			
	// 	}).catch(function(error) {
	// 			console.log(error);
	// 		});

			
	// 	// 	if (data !== null) {
	// 	// 	var hbsObject = {
	// 	// 		myFridges: data.myFridges
	// 	// 	};
	// 	// 	console.log("this is "+hbsObject);
	// 	// 	res.render("member", hbsObject);
	// 	// 	}
	// 	// 	res.render("index");
	// 	// }).catch(function(error) {
	// 	// 		console.log(error);
	// 	// 	});
			
		
	
	// });
	// POST route for adding an item to myFridge
	app.post("/member/add", function(req, res) {
		console.log("this is the email " + req.body.email);
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
	// PUT route for updating myFridge item refill date
	app.put("/member/update/:id", function(req, res) {
		var condition = "id = " + req.params.id;
		console.log("condition", condition);
		db.myFridges.update({
			refill: req.body.refill
		}, {
			where: {
				id: condition
			}
		}).then(function() {
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