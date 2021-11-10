import express from "express";
import { generateLog } from "../utils/logGenerator";

const statusRouter = express.Router();

statusRouter.get("/", (_req, res) => {
  generateLog()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: e.message });
    });
});

export default statusRouter;
