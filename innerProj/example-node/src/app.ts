// const express = require('express');
import express , { Request, Response, NextFunction}from 'express';// # @types/express 를 설치할 경우, typescript에서 express를 import 할 수 있다.
import {json} from 'body-parser'; //

import todoRoutes from './routes/todos';

const app = express ();


// # body-parser 적용
app.use(json());
/*
  ! 제3자 패키지에서 들어오는 Reqeust들을 전부 parsing하는 middleware
   Request에서 찾은 JSON DATA를 추출하고, Request Object Body를 그 JSON DATA로 채운다.
 */


app.use("/todos", todoRoutes);


// # Handling Error Function
app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
  res.status(500).json ({message: err.message});
})




const port = 3000;
app.listen (port);

