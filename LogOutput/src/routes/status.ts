import express from "express";
import { getLatestLog } from "../utils/logGenerator";

const statusRouter = express.Router();

statusRouter.get("/", (_req, res) => {
  return res.status(200).send(getLatestLog());
});

export default statusRouter;
