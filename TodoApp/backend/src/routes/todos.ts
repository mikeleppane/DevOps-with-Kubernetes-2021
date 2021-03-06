import express from "express";
import { Todo } from "../database/models/todo";
import { NatsPublisher } from "../services/nats";

const todoRouter = express.Router();
const natsPublisher = new NatsPublisher();

const isTodoTextValid = (text: string) => {
  return text.length < 141;
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
todoRouter.get("/", async (_req, res) => {
  const todos = await Todo.findAll();
  console.log(todos.map((t) => JSON.stringify(t.toJSON(), null, 4)));
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
        `Todo created successfully:\n ${JSON.stringify(
          createdTodo.toJSON(),
          null,
          4
        )}`
      );
      natsPublisher.publish(
        "TODO",
        `Todo created successfully:\n ${JSON.stringify(
          createdTodo.toJSON(),
          null,
          4
        )}`
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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
todoRouter.delete("/:id", async (req, res) => {
  try {
    const todoToBeDeleted = await Todo.findByPk(req.params.id);
    if (todoToBeDeleted) {
      await todoToBeDeleted.destroy();
      console.log(
        `Todo deleted successfully: ${JSON.stringify(
          todoToBeDeleted.toJSON(),
          null,
          4
        )}`
      );
      return res.status(204).end();
    } else {
      return res.status(401).json({ error: "Invalid id" });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(401).json({ error: `Invalid id: ${error.message}` });
    }
    console.error(error);
    return res.status(401).json({ error: `Unknown error occurred: ${error}` });
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
todoRouter.put("/:id", async (req, res) => {
  try {
    const todoToBeUpdated = await Todo.findByPk(req.params.id);
    if (todoToBeUpdated) {
      const body = req.body as { text: string; done: boolean };
      if (!body.text && !body.done) {
        return res.status(400).json({
          error: "text and done fields are missing",
        });
      }
      if (body.text) {
        todoToBeUpdated.text = body.text;
      }
      if (body.done) {
        todoToBeUpdated.done = body.done;
      }
      await todoToBeUpdated.save();
      console.log(
        `Todo updated successfully:\n ${JSON.stringify(
          todoToBeUpdated.toJSON(),
          null,
          4
        )}`
      );
      natsPublisher.publish(
        "TODO",
        `Todo updated successfully:\n ${JSON.stringify(
          todoToBeUpdated.toJSON(),
          null,
          4
        )}`
      );
      return res.status(201).end();
    } else {
      return res.status(401).json({ error: "Invalid id" });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(401).json({ error: `${error.message}` });
    }
    console.error(error);
    return res.status(401).json({ error: `Unknown error occurred: ${error}` });
  }
});

export default todoRouter;
