import { eventWrapper } from '@testing-library/user-event/dist/utils';
import React, {Component} from 'react';

class TodoForm extends Component {
    constructor(props){
        super(props);
        this.state = {inputValue: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }
    handleChange(e) {
        this.setState({
            inputValue: e.target.value
        });
    }
    handleSubmit() {
        this.props.addTodo(this.state.inputValue)
        this.setState({inputValue:""});
    }
    
    keyPress(event) {
        console.log("hit todo input")

        if(event.which === 13 ) {
            console.log("hit enter");
            this.handleSubmit();
        }
    }
    componentDidMount() {
        const todoInput = document.querySelector('#todoInput');
        todoInput.addEventListener('keypress', this.keyPress );
    
    }

    render() {

        return (
            <div className="form">
                <input 
                    id="todoInput"
                    type="text" 
                    placeholder="Insert your task here..."
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                />
                <button
                    onClick={this.handleSubmit}
                >Add Todo</button>
            </div>
        )
    }
}

export default TodoForm;

