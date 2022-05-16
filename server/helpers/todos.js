// The helper file stores functions that we use elsewhere in the app to make the app more modular

const db = require("../models");


// Index Function
exports.getTodos = (req, res) => {
    //.find() is a mongoose function
    console.log("createTodo triggered");
    db.Todo.find()
    .then((todos) => {
        res.json(todos);
    })
    .catch((err) => {
        res.send(err)
    })
}

// Create Function
exports.createTodo = (req, res) => {
    console.log("createTodo triggered");
    db.Todo.create(req.body)
    .then((newTodo) => {
        //status 201 means something was created
        res.status(201).json(newTodo);
    })
    .catch((err) => {
        res.send(err);
    })
}


// Show Function
exports.showTodo = (req, res) => {
    db.Todo.findById(req.params.todoId)
    .then((foundTodo) => {
        res.json(foundTodo)
    })
    .catch((err) => {
        res.send(err);
    })
}

// Update Function
exports.updateTodo = (req, res) => {
    // The last arg (new:true) tells mongodb to return the updated record rather than the old one
    db.Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true } )
    .then( (todo ) => {
        res.json(todo)
    })
    .catch( (err) => {
        res.send(err)
    })
}

// Delete Function
exports.deleteTodo = (req, res) => {
    db.Todo.remove({ _id: req.params.todoId } )
    .then( () => {
        res.json({ message: "We deleted it!" })
    })
    .catch( (err) => {
        res.send(err)
    })
}

module.exports = exports;
