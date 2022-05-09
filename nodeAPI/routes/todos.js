// Routes file tells the apps what to do with incoming requests with the help of the functions from the helpers file

const express = require("express"),
      //express.Router() allows us to break out the routes into modules
      router = express.Router(),
      // importing our db model. Automatically imports index.js
      db = require("../models"),
      helpers = require("../helpers/todos");


// Index and Create Route
router.route("/")
    .get(helpers.getTodos)
    .post(helpers.createTodo)

// Show, Update & Delete Route
router.route("/:todoId")
    .get(helpers.showTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo)

module.exports = router;