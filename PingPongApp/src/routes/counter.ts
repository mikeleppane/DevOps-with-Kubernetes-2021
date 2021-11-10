import express from "express";
import { saveRequestsToFile } from "../utils/saveRequestsToFile";
import { increaseCounter } from "../utils/requestCounter";

const counterRouter = express.Router();

counterRouter.get("/", (_req, res) => {
  saveRequestsToFile(increaseCounter())
    .then(() => {
      res.status(200).send("ok");
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: e.message });
    });
});

export default counterRouter;
