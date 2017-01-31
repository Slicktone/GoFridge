// Add myFridge Items to this route
var db = require("../models");
// Routes
module.exports = function (app) {
    // created route to render index.handlebars file
    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/userForm", function (req, res) {
        res.render("userForm");
    })
};