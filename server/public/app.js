
const axios = require('axios').default;


const getApi = axios.get("/api/todos"),
      todoInput = document.querySelector('#todoInput'),
      ul = document.querySelector('ul');

// Middlewware function that handles deleting a todo from the DB
function deleteTodo(todo) {
    const id = todo._id;
    axios.delete(`/api/todos/${id}`)
        .then((res) => {
            console.log(res.data.message);
        })
        .catch((err) => {
            console.log(err);
        });
}

// Middlewware function that handles updating a todo from the DB
function updateTodo(todo) {
    const id = todo._id;
    function update(id, obj) {
        axios.put(`/api/todos/${id}`, obj)
            .then((res) => {
                console.log("todo updated");
            })
            .catch((err) => {
                console.log(err);
            });
    }
    if (todo.completed) {
        const changeToFalse = {completed: false}
        update(id, changeToFalse)
    } else {
        const changeToTrue = {completed: true}
        update(id, changeToTrue)
    }
}
// Middleware function that adds a todo to the <ul> 
function addTodo(todo) {
    const li = document.createElement('li');
    li.innerHTML = `${todo.name}<span class="btn">x</span>`
    li.classList.add("task");
    if(todo.completed) {
        li.classList.add("done");
    }
    li.addEventListener('click', function(e)  {
        if(e.target.classList[0] === 'btn') {
            ul.removeChild(this);
            deleteTodo(todo)
        } else {
            this.classList.toggle('done')
            updateTodo(todo)
        }
    })
    ul.appendChild(li);
}

//Middleware function that adds todos from the DB to the page through the initial get request
function addTodos(todos) {
    todos.data.forEach((todos) => {
        addTodo(todos)
    });
}

// Middleware function that creates a todo from the input vales fron the todoInput event listener
function createTodo() {
    const userInput = todoInput.value;
    //Send request to create a new todo
    axios.post("/api/todos", {name: userInput})
        .then( (newTodo) => {
            addTodo(newTodo.data);
            todoInput.value = '';
        })
        .catch((err) => {
            console.log(err);
        })
}

// Event listener that listens out for the enter press on the <input>
todoInput.addEventListener('keypress', (event) => {
    console.log("hit todo input")
    if(event.which === 13 ) {
        createTodo();
    }
})

// Get request that gets data from the DB
getApi.then((res) => {
    addTodos(res)
})
  .catch((err) => {
    console.log(err);
});







