import express from "express";
import { Todo } from "../database/models/todo";

const todoRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
todoRouter.get("/", async (_req, res) => {
  const todos = await Todo.findAll();
  console.log(todos.map((t) => JSON.stringify(t.toJSON())));
  return res.status(200).json(todos);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
todoRouter.post("/", async (req, res) => {
  const body = req.body as { text: string; done: boolean };
  if (body.text) {
    const todo = { text: body.text, done: false };
    try {
      const createdTodo = await Todo.create(todo);
      console.log(
        `Todo created successfully: ${JSON.stringify(createdTodo.toJSON())}`
      );
      return res.status(200).json(todo);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        return res.status(400).json({ error });
      }
    }
  }
  return res.status(400).json({
    error: "TODO text is missing",
  });
});

export default todoRouter;