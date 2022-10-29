import React, {useEffect, useRef} from 'react';
import './NewTodo.css';


type NewTotoProps ={
  onAddTodo : (todoText: string)=> void;
}



const NewTodo: React.FC<NewTotoProps> = (props)=>{
  useEffect(()=>{
  
  },[])
  const inputRef = useRef<HTMLInputElement>(null);
  
  const todoSubmitHandler = (event: React.FormEvent)=>{
    event.preventDefault();
    if(!inputRef.current) return;
    const enteredText = inputRef.current!.value;
    props.onAddTodo(enteredText);
  };
  
  
  return <form onSubmit={todoSubmitHandler}>
    <div className={'form-control'}>
      <label htmlFor="todo-text">Todo Text</label>
      <input ref={inputRef} type="text" id="todo-text" placeholder="Todo Text" />
    </div>
    <button type="submit">Add Todo</button>
  </form>;
}

export default NewTodo;