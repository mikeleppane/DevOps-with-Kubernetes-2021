import express from "express";
import { Todo } from "../database/models/todo";

const todoRouter = express.Router();

const isTodoTextValid = (text: string) => {
  return text.length < 141;
};

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
    if (!isTodoTextValid(body.text)) {
      console.log("Given todo text is too long. The limit is 140 characters.");
      return res.status(400).json({ error: "Too many characters in todo" });
    }
    const todo = { text: body.text, done: false };
    try {
      const createdTodo = await Todo.create(todo);
      console.log(
        `Todo created successfully: ${JSON.stringify(createdTodo.toJSON())}`
      );
      return res.status(200).json(createdTodo);
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
