import React, {Component} from 'react';
import TodoItem from './ToDoItem';
import TodoForm from './ToDoForm';
import * as apiCalls from './api';
// * means everything so import everything from ./api



class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos: []
        }
        this.addTodo = this.addTodo.bind(this);
    }

    

    componentDidMount(){
        this.loadTodos()
    }

    async loadTodos() {
        let todos = await apiCalls.getTodos();
        this.setState({todos});
    }

    async addTodo(val){
        let newTodo = await apiCalls.createTodo(val)
        this.setState({todos: [...this.state.todos, newTodo]});
    }

    async deleteTodo(id){
        await apiCalls.deleteTodo(id);
        const todos = this.state.todos.filter(todo => todo._id !== id)
        this.setState({todos: todos});

    }

    async toggleTodo(todo) {
        let updatedTodo = await apiCalls.toggleTodo(todo);
        const todos = this.state.todos.map(t => 
            (t._id === updatedTodo._id)
            ? {...t, completed: !t.completed} 
            : t   
        )
        this.setState({todos: todos});
    }
    
    render(){
        const todos = this.state.todos.map((t) => (
            <TodoItem
                key={t._id}
                {...t} 
                onDelete={this.deleteTodo.bind(this, t._id)}
                onToggle={this.toggleTodo.bind(this, t)}
            />
        ));


        return (
            <div className="header">
                <h1>todo<span>list</span></h1>
                <h2>A simple todo list app built with node & React</h2>
                    <TodoForm addTodo={this.addTodo}/>
                    <ul className="list">
                        {todos}
                    </ul>
            </div>
        )
    }
}

export default TodoList;

// Event listener that listens out for the enter press on the <input>
// todoInput.addEventListener('keypress', (event) => {
//     console.log("hit todo input")
//     if(event.which === 13 ) {
//         createTodo();
//     }
// })








// to clear input
