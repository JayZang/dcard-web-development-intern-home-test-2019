import {Request, Response} from "express";
import { Todo, TodoModel } from "../models/todos";

export const getTodo = async (req: Request, res: Response) => {
  const todo = await Todo.find();
  // console.log(todo.ip);
  res.send(todo);
}

export const newTodo = (req: Request, res: Response) => {
  const todo = new Todo({
    content: '123',
    isDone: false
  });

  todo.save();
}