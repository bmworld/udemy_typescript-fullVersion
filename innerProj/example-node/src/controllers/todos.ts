import { RequestHandler, Request, Response, NextFunction} from 'express';

import { Todo } from '../models/todos';

const TODOS:Todo[] = [];


// # Og Ver.
// export const createTodo = (req:Request, res: Response, next: NextFunction)=>{}

// # short Ver,
export const  createTodo:RequestHandler = (req,res, next)=>{
  const text = (req.body as {text:string}).text; // ! type casting 방법 > request body에 접근하기 전에 이 오브젝트가 문자일 것으로 typescasting한다.
  // console.log(req.body)
  const newTodo = new Todo(Math.floor(Math.random()*100).toString() , text );
  
  TODOS.push(newTodo);
  console.log('newTodo: ',newTodo);
  
  res.status(201).json({message:'Created the Todo!', createdTodo: newTodo});
  // status 201: 리소스가 성공적으로 만들어졌단 의미.
}


// # CREATE
export const getTodos: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.json({todos:TODOS});
}


// # UPDATE
export const updateTodos: RequestHandler<{id: string}> = (req: Request, res: Response, next: NextFunction) => {
  const todoId = req.params.id; // routes에서 request URL의 :id <-
  const updatedText = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex((todo)=>todo.id === todoId);
  if(todoIndex <  0 ){
    throw new Error ("Could not find todo!");
  }
  
  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);
  res.json({message:"Updated Todo!", updatedTodo: TODOS[todoIndex]});
}


// # DELETE
export const deleteTodo: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const todoId = req.params.id; // routes에서 request URL의 :id <-
  const todoIndex = TODOS.findIndex((todo)=>todo.id === todoId);
  if(todoIndex <  0 ){
    throw new Error ("Could not find todo ~~~!");
  }
  
  TODOS.splice(todoIndex, 1);
  
  
  res.json({message:`${todoId} Todo is deleted !`, updatedTodo: TODOS[todoIndex]});
}


