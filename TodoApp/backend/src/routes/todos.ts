import express from "express";

const todoRouter = express.Router();

const todos = [
  { id: 1, text: "TODO1" },
  { id: 2, text: "TODO2" },
];

// eslint-disable-next-line @typescript-eslint/no-misused-promises
todoRouter.get("/", (_req, res) => {
  return res.status(200).json(todos);
});

todoRouter.post("/", (req, res) => {
  const body = req.body as { text: string };
  if (body.text) {
    const todo = { id: todos.length + 1, text: body.text };
    todos.push(todo);
    return res.status(200).json(todo);
  }
  return res.status(400).json({
    error: "TODO text is missing",
  });
});

export default todoRouter;
