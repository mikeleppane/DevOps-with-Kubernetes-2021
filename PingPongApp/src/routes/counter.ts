import express from "express";
import { increaseCounter } from "../utils/requestCounter";

const counterRouter = express.Router();

counterRouter.get("/", (_req, res) => {
  return res.status(200).send(increaseCounter());
});

export default counterRouter;
