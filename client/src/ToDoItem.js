import React from 'react';


// This is a Stateless Functional Component

const TodoItem = ({name, completed, onToggle, onDelete}) => (
    <li className="task">
        <p 
            style={{
                textDecoration: completed? 'line-through': "none"
            }}
            onClick={onToggle}
        >
            {name}
            <span onClick={onDelete}> X </span>
        </p>
        
    </li>
)

export default TodoItem;


