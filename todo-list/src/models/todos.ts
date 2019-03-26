import mongoose from "mongoose";

export type TodoModel = mongoose.Document & {
  content: String;
  isDone: Boolean;
};

const todoSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  content: String,
  isDone: Boolean
}, {
  timestamps: true
});

export const Todo = mongoose.model("Todos", todoSchema);