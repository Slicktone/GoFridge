// Add myFridge Items to this route
var db = require("../models");
// Routes
module.exports = function(app) {
	// created route to render index.handlebars file
	app.get("/", function(req, res) {
		res.render("index");
	});
	// GET route for all the items in myFridge
	app.get("/myFridge", function(req, res) {
		// var query = {};
		// if (req.query.user_id) {
		// 	query.userId = req.query.user_id;
		// }
		db.myFridges.findAll({
			// where: query,
			// include: [db.user]
		}).then(function(data) {
			// var hbsObject = {
			// 	myFridges: data
			// };
			// console.log(hbsObject);
			// res.render("myFridge", hbsObject);
            console.log(data);
			res.json(data);
		});
	});
	// POST route for adding an item to myFridge
	app.post("/myFridge/add", function(req, res) {
		console.log("Hi Omar");
        console.log(req.body);
        db.myFridges.create(
            req.body
        // {
		// 	category: req.body.category,
		// 	name: req.body.name,
		// 	price: req.body.price,
		// 	refill: req.body.refill
		// }
        // ).then(function() {
		// 	res.redirect("/myFridge");
		).then(function(dbFridge) {
            console.log(dbFridge);
            res.json(dbFridge);
        }).catch(function(error){
           
            console.log('omar hello there my friend')
            console.log(error);
           
        });;
	});
	// PUT route for updating myFridge item refill date
	app.put("/myFridge/update/:id", function(req, res) {
		var condition = "id = " + req.params.id;
		console.log("condition", condition);
		db.myFridges.update({
			refill: req.body.refill
		}, {
			where: {
				id: condition
			}
		}).then(function() {
			res.redirect("/myFridge");
		});
	});
	// DELETE route for deleting items from myFridge
	app.delete("/myFridge/update/:id", function(req, res) {
		db.myFridges.destroy({
			where: {
				id: req.params.id
			}
		}).then(function() {
			res.redirect("/myFridge");
		});
	});
};