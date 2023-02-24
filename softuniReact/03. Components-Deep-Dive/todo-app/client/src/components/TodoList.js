import { useEffect, useState } from 'react';
import { TodoItem } from './TodoItem';
export const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/todos')
            .then(res => res.json())
            .then(result => {
                setTodos(Object.values(result));
            })
    }, []);

    const todoClickHandler = (todo) => {
        // instead of only setting changes on component -> setTodos(oldTodos => oldTodos.map(todo => todo._id == modifiedTodo._id ? modifiedTodo : todo)); 
        // update on DB and reflect these changes on app based on the response to this updated DB via put
        fetch(`http://localhost:3030/jsonstore/todos/${todo._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({...todo,  isCompleted: !todo.isCompleted })
        })
            .then(res => res.json())
            .then(modifiedTodo => {
                setTodos(oldTodos => oldTodos.map(todo => todo._id == modifiedTodo._id ? modifiedTodo : todo)); 
            })
            // filter wont do because it updates the specfic todo but not all of the others
            // .then(modifiedTodo => {
            //     setTodos(oldTodos => oldTodos.filter(todo => todo._id == modifiedTodo._id)); 
            // })
    };
    // put request updates one of todo objects with opposite isCompleted property
    // we use updater function to have access to old state values and .map() to update only a specific one
    // we determine the specific todo entity by comparing the id of the modified with the id of the unmodified
    // todos that dont match id with modified todo are just different todos so we set once again the old value
    // the one todo that matches id with modified todo is the updated so we set the new value

    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="table-header-task">Task</th>
                    <th className="table-header-status">Status</th>
                    <th className="table-header-action">Action</th>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo => <TodoItem key={todo._id} {...todo} onClick={todoClickHandler} />)}
                {/* pass on Handling function to child that when clicked updates the parent */}
            </tbody>
        </table>
    );
}