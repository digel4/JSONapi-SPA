const mongoose = require('mongoose');

// this sets mongoose so we get back debug data when something goes wrong
mongoose.set('debug', true);

//This is connecting to whatever database instance we're using for the app.

console.log("attempting to connect to DB")
mongoose.connect("mongodb+srv://admin:hello@cluster0.e4jqp.mongodb.net/to-do-app?retryWrites=true&w=majority", { useNewUrlParser: true }).then(() => {
	console.log("connected to DB");
}).catch(err => {
	console.log('ERROR triggered:', err.message)
});

// we do this so we have access to promises rather than using a external promise library
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");