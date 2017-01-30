// Detail routes to User management
var db = require("../models");
// Routes
module.exports = function (app) {
    // created route to render index.handlebars file
    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/userForm", function (req, res) {
        res.render("userForm");
    });

    // Creating a user
    app.post("/userForm", function (req, res) {

    })
    // Updating a user
    app.put("/userForm/", function(req, res) {
        
    })
    // Deleting a user
    app.delete("/userForm/:id", function(req, res) {
        db.user.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });
}