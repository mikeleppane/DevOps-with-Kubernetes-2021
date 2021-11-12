import express from "express";
import { getPingPongs } from "../utils/requestCounter";

const pingpongRouter = express.Router();

pingpongRouter.get("/", (_req, res) => {
  const data = "Ping / Pong: " + getPingPongs() + "\n";
  res.status(200).send(data);
});

export default pingpongRouter;
