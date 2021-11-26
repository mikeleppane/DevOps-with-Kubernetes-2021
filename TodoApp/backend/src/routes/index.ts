import express from "express";
import { connectToDatabase } from "../database/db";

const indexRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
indexRouter.get("/", (_req, res) => {
  return res.status(200).send("<h1>Hi There!</h1>");
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
indexRouter.get("/healthz", async (_req, res) => {
  const status = await connectToDatabase();
  if (status.ok) {
    return res.status(200).send("database up");
  }
  return res.status(500).json({ error: "cannot connect to database" });
});

export default indexRouter;
