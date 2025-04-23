import React, { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const TodoList = ({ todos, title }) => {
  const { user } = useParams();
  const [struckIndices, setStruckIndices] = useState(Array(todos.length).fill(false));
  const navigate = useNavigate();

  const handleDelete = (index) => {
    axios.delete("http://localhost:4000/deletetodo", {
      data: {
        _id: user,
        todoItem: todos[index]
      }
    })
    .then(() => {
      navigate(0);
    })
    .catch((error) => {
      console.error('Error deleting todo:', error);
    });
  };

  const toggleRadioButton = (index) => {
    const updated = [...struckIndices];
    updated[index] = !updated[index];
    setStruckIndices(updated);
  };

  return (
    <div className='todo-list justify-self-right'>
      <h1 className="todo-title">{title}</h1>
      <Link to={`/${user}/create`} className="new-todo-btn">New Todo</Link>
      {todos.length === 0 ? (
        <div>No todos</div>
      ) : (
        todos.map((todo, index) => (
          <div className="todo-grid" key={index}>
            <input
              type='checkbox'
              name='donetoggle'
              className='grid-box checkbox'
              onChange={() => toggleRadioButton(index)}
            />
            <h3 className={`todo-text ${struckIndices[index] ? "struck" : ""}`}>{todo}</h3>
            <div className='buttons'>
              <button className='todo-btn delete-btn' onClick={() => handleDelete(index)}>Delete</button>
              <Link className='todo-btn edit-btn' to={`/${user}/edit/${index}`}>Edit</Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
