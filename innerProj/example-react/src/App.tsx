import {Router, BrowserRouter } from "react-router-dom";


import React, { useState } from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./model/todo.model";


const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoAddHandler = (text: string) => {
    const nextState = {
      id: Math.random().toString(),
      text: text,
    };
    setTodos((prevState) => [...prevState, nextState]);
  };
  
  const todoDeleteHandler = (todoId: string) => {
    setTodos((prevTodo)=>{
      return prevTodo.filter(todo=>todo.id !== todoId);
    });
  }
  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler}/>
    </div>
  );
};

export default App;
