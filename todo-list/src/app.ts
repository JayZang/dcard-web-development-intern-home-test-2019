import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

/**
 * Mongoose 設置與連線
 */
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017")
  .catch(err => console.log(err.toString()));

/**
 * Express Configuration
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Todo Router
 */
import * as todoController from "./controllers/todo";

app.get("/", todoController.getTodo);
app.post("/", todoController.newTodo);

export default app;