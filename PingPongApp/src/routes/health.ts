import express from "express";
import { connectToDatabase } from "../utils/db";

const healthRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
healthRouter.get("/", (_req, res) => {
  res.status(200).send("ok");
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
healthRouter.get("/healthz", async (_req, res) => {
  const status = await connectToDatabase();
  if (status.ok) {
    return res.status(200).send("database up");
  }
  return res.status(500).json({ error: "cannot connect to database" });
});

export default healthRouter;
